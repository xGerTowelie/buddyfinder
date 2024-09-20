import React, { useState } from 'react';
import { Badge, BadgeCheck, Heart, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

    const keyframes = `
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(155, 155, 155, 0.7); }
      100% { box-shadow: 0 0 0 10px rgba(155, 155, 155, 0); }
    }
    @keyframes outline {
      0%, 100% { outline-offset: 0px; }
      50% { outline-offset: 5px; }
    }
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    @keyframes pixelate {
      0%, 100% { filter: url(#pixelate-0); }
      50% { filter: url(#pixelate-10); }
    }
    @keyframes liquid {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes flip {
      0% { transform: perspective(400px) rotateY(0); }
      100% { transform: perspective(400px) rotateY(360deg); }
    }
    @keyframes morph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
      75% { border-radius: 40% 60% 70% 30% / 60% 30% 70% 40%; }
    }
    @keyframes hologram {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(0, 255, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }
    }
    @keyframes glare {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes sketch {
      0% { filter: url(#sketch-0); }
      100% { filter: url(#sketch-1); }
    }
  `;

    const variantStyles = {
        default: `
      ${baseStyles}
    `,
        neon: `
      ${baseStyles}
      border-4 border-green-400
      shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80]
      animate-[pulse_2s_ease-in-out_infinite]
    `,
        ripple: `
      ${baseStyles}
      animate-[ripple_1.5s_ease-out_infinite]
    `,
        outline: `
      ${baseStyles}
      outline outline-4 outline-blue-500
      animate-[outline_2s_ease-in-out_infinite]
    `,
        rainbow: `
      ${baseStyles}
      border-4 border-white
      animate-[rainbow_3s_linear_infinite]
    `,
        pixelate: `
      ${baseStyles}
      animate-[pixelate_2s_ease-in-out_infinite]
    `,
        liquid: `
      ${baseStyles}
      border-4 border-blue-500
      animate-[liquid_5s_ease-in-out_infinite]
    `,
        bounce: `
      ${baseStyles}
      border-4 border-yellow-500
      animate-[bounce_1s_ease-in-out_infinite]
    `,
        flip: `
      ${baseStyles}
      border-4 border-purple-500
      animate-[flip_2s_ease-in-out_infinite]
    `,
        morph: `
      ${baseStyles}
      border-4 border-pink-500
      animate-[morph_8s_ease-in-out_infinite]
    `,
        hologram: `
      ${baseStyles}
      border-4 border-cyan-400
      animate-[hologram_1.5s_ease-in-out_infinite]
    `,
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
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle error (e.g., show an error message to the user)
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={variantStyles[variant]}>
                        <style>{keyframes}</style>
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
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Profile Picture</DialogTitle>
                </DialogHeader>
                <Input type="file" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                <Button onClick={() => setIsDialogOpen(false)} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Cancel'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const ProfileExamples: React.FC = () => {

    const variants: ProfileProps['variant'][] = [
        'default', 'neon', 'ripple', 'outline', 'flip', 'morph', 'liquid', 'bounce', 'rainbow', 'pixelate', 'hologram'
    ];

    const sizes: ProfileProps['size'][] = ['sm', 'md', 'lg'];

    return (
        <div className="flex flex-wrap gap-8 p-4">
            {variants.map((variant) => (
                <div key={variant} className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-semibold capitalize">{variant}</h3>
                    {sizes.map((size) => (
                        <AnimatedProfile
                            key={`${variant}-${size}`}
                            imageUrl="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D"
                            showSupportBadge={true}
                            size={size}
                            variant={variant}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProfileExamples;
