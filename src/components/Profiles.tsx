import React from 'react';
import { Badge } from 'lucide-react';

// Define the props for our component
interface ProfileProps {
    imageUrl: string;
    showSupportBadge?: boolean;
    variant: 'default' | 'bordered' | 'gradient' | 'neon' | 'glitch';
    size?: 'sm' | 'md' | 'lg';
}

const AnimatedProfile: React.FC<ProfileProps> = ({
    imageUrl,
    showSupportBadge = false,
    variant = 'default',
    size = 'md'
}) => {
    // Size styles
    const sizeStyles = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32'
    };

    // Base styles for the profile picture
    const baseStyles = `
    relative rounded-full overflow-hidden
    ${sizeStyles[size]}
  `;

    // Animation keyframes
    const keyframes = `
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes glitch {
      0% { clip-path: inset(0 0 0 0); }
      20% { clip-path: inset(20% 0 0 0); }
      40% { clip-path: inset(40% 0 0 0); }
      60% { clip-path: inset(60% 0 0 0); }
      80% { clip-path: inset(80% 0 0 0); }
      100% { clip-path: inset(100% 0 0 0); }
    }
  `;

    // Variant-specific styles
    const variantStyles = {
        default: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:border-4 before:border-blue-500 before:rounded-full
      before:animate-[rotate_10s_linear_infinite]
    `,
        bordered: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:border-4 before:border-double before:border-purple-500 before:rounded-full
      before:animate-[rotate_8s_ease-in-out_infinite]
    `,
        gradient: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-yellow-500
      before:rounded-full before:animate-[rotate_12s_ease_infinite]
    `,
        neon: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:border-4 before:border-green-400 before:rounded-full
      before:shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80]
      before:animate-[pulse_2s_ease-in-out_infinite]
    `,
        glitch: `
      ${baseStyles}
      before:content-[''] before:absolute before:inset-0
      before:border-4 before:border-red-500 before:rounded-full
      before:animate-[glitch_500ms_steps(20)_infinite]
    `
    };

    return (
        <div className="relative">
            <div className={variantStyles[variant]}>
                <style>{keyframes}</style>
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            {showSupportBadge && (
                <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1">
                    <Badge size={20} />
                </div>
            )}
        </div>
    );
};

// Example usage with different variants
const ProfileExamples: React.FC = () => {
    const variants: ProfileProps['variant'][] = ['default', 'bordered', 'gradient', 'neon', 'glitch'];
    const sizes: ProfileProps['size'][] = ['sm', 'md', 'lg'];

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {variants.map((variant) => (
                <div key={variant} className="flex flex-col items-center gap-2">
                    <h3 className="text-lg font-semibold">{variant}</h3>
                    <div className="flex gap-2">
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
                </div>
            ))}
        </div>
    );
};

export default ProfileExamples;
