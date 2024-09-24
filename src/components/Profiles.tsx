'use client'
import React, { useState, useRef } from 'react';
import { BadgeCheck, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ProfileProps {
    imageUrl: string;
    showSupportBadge?: boolean;
    variant?: 'default' | 'neon' | 'ripple' | 'outline' | 'rainbow' | 'pixelate' | 'liquid' | 'bounce' | 'flip' | 'morph' | 'hologram';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onImageUpload: (url: string) => void;
}

export const AnimatedProfile: React.FC<ProfileProps> = ({
    imageUrl,
    showSupportBadge = false,
    variant = 'default',
    size = 'md',
    onImageUpload
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const sizeStyles = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-14 h-14',
        xl: 'w-24 h-24',
    };

    const badgeSize = (sizeStyle) => {
        switch (sizeStyle) {
            case 'sm': return 'w-2 h-2'
            case 'md': return 'w-3 h-3'
            case 'lg': return 'w-4 h-4'
            case 'xl': return 'w-6 h-6'
        }
    }

    const badgePadding = (sizeStyle) => {
        switch (sizeStyle) {
            case 'sm': return 'p-[2px]'
            case 'md': return 'p-[2px]'
            case 'lg': return 'p-[3px]'
            case 'xl': return 'p-[4px]'
        }
    }

    const baseStyles = `
    relative rounded-full overflow-hidden
    ${sizeStyles[size]}
  `;

    const variantStyles = {
        default: `${baseStyles}`,
        neon: `${baseStyles} border-4 border-green-400 shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80] animate-[pulse_2s_ease-in-out_infinite]`,
        ripple: `${baseStyles} animate-[ripple_1.5s_ease-out_infinite]`,
        outline: `${baseStyles} outline outline-4 outline-blue-500 animate-[outline_2s_ease-in-out_infinite]`,
        rainbow: `${baseStyles} border-4 border-white animate-[rainbow_3s_linear_infinite]`,
        pixelate: `${baseStyles} animate-[pixelate_2s_ease-in-out_infinite]`,
        liquid: `${baseStyles} border-4 border-blue-500 animate-[liquid_5s_ease-in-out_infinite]`,
        bounce: `${baseStyles} border-4 border-yellow-500 animate-[bounce_1s_ease-in-out_infinite]`,
        flip: `${baseStyles} border-4 border-purple-500 animate-[flip_2s_ease-in-out_infinite]`,
        morph: `${baseStyles} border-4 border-pink-500 animate-[morph_8s_ease-in-out_infinite]`,
        hologram: `${baseStyles} border-4 border-cyan-400 animate-[hologram_1.5s_ease-in-out_infinite]`,
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                onImageUpload(data.url);
                setIsDialogOpen(false);
                toast({
                    title: "Profile picture updated",
                    description: "Your profile picture has been successfully updated.",
                });
            } catch (error) {
                console.error('Error uploading image:', error);
                toast({
                    title: "Upload failed",
                    description: "There was an error uploading your profile picture. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div
                className="relative inline-block cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={triggerFileInput}
            >
                <div className={variantStyles[variant]}>
                    <img src={imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <Edit className="text-white" />
                        </div>
                    )}
                </div>
                {showSupportBadge && (
                    <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                        <div className={cn("bg-cyan-400 rounded-full border-[1px] border-neutral-600/30", badgePadding(size))}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <BadgeCheck className={badgeSize(size)} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Website Supporter</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            {isUploading && (
                <Dialog open={isUploading} onOpenChange={setIsUploading}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Uploading Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};
