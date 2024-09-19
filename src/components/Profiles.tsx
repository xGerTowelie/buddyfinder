import React from 'react';
import { Badge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileProps {
    imageUrl: string;
    showSupportBadge?: boolean;
    variant: 'default' | 'neon' | 'glitch' | 'ripple' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const AnimatedProfile: React.FC<ProfileProps> = ({
    imageUrl,
    showSupportBadge = false,
    variant = 'default',
    size = 'md'
}) => {

    const sizeStyles = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-14 h-14',
    };

    const badgeSize = (sizeStyle) => {
        switch (sizeStyle) {
            case 'sm': return 'w-2 h-2'
            case 'md': return 'w-3 h-3'
            case 'lg': return 'w-4 h-4'
        }
    }

    const badgePadding = (sizeStyle) => {
        switch (sizeStyle) {
            case 'sm': return 'p-[2px]'
            case 'md': return 'p-[2px]'
            case 'lg': return 'p-[3px]'
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
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-5px, 5px); }
      40% { transform: translate(-5px, -5px); }
      60% { transform: translate(5px, 5px); }
      80% { transform: translate(5px, -5px); }
      100% { transform: translate(0); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(155, 155, 155, 0.7); }
      100% { box-shadow: 0 0 0 10px rgba(155, 155, 155, 0); }
    }
    @keyframes shine {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes outline {
      0%, 100% { outline-offset: 0px; }
      50% { outline-offset: 5px; }
    }
  `;

    const variantStyles = {
        default: `
      ${baseStyles}
      border-4 border-blue-500
      animate-[rotate_10s_linear_infinite]
    `,
        neon: `
      ${baseStyles}
      border-4 border-green-400
      shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80]
      animate-[pulse_2s_ease-in-out_infinite]
    `,
        glitch: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:bg-red-500 before:mix-blend-screen before:opacity-50
      animate-[glitch_500ms_steps(2)_infinite]
    `,
        ripple: `
      ${baseStyles}
      animate-[ripple_1.5s_ease-out_infinite]
    `,
        outline: `
      ${baseStyles}
      outline outline-4 outline-blue-500
      animate-[outline_2s_ease-in-out_infinite]
    `
    };

    return (
        <div className="relative inline-block">
            <div className={variantStyles[variant]}>
                <style>{keyframes}</style>
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            {showSupportBadge && (
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <div className={cn("bg-yellow-400 rounded-full", badgePadding(size))}>
                        <Badge className={badgeSize(size)} />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileExamples: React.FC = () => {
    const variants: ProfileProps['variant'][] = [
        'default', 'neon', 'glitch', 'ripple', 'outline'
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
                            imageUrl="https://avatars.githubusercontent.com/u/124599?v=4"
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
