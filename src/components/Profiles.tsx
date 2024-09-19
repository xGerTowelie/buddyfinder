import React from 'react';
import { Badge } from 'lucide-react';

// Define the props for our component
interface ProfileProps {
    imageUrl: string;
    showSupportBadge?: boolean;
    variant: 'default' | 'bordered' | 'gradient' | 'neon' | 'glitch';
    size?: number;
}

const AnimatedProfile: React.FC<ProfileProps> = ({ imageUrl, showSupportBadge = false, variant = 'default', size = 6 }) => {
    // Base styles for the profile picture
    const baseStyles = `
    relative rounded-full overflow-hidden
    w-20 h-20
  `;

    // Animation keyframes
    const rotateAnimation = `
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

    // Variant-specific styles
    const variantStyles = {
        default: `
      ${baseStyles}
      border-4 border-blue-500
      animate-[rotate_10s_linear_infinite]
    `,
        bordered: `
      ${baseStyles}
      border-4 border-double border-purple-500
      animate-[rotate_8s_ease-in-out_infinite]
    `,
        gradient: `
      ${baseStyles}
      border-4 border-transparent
      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
      animate-[rotate_12s_ease_infinite]
    `,
        neon: `
      ${baseStyles}
      border-4 border-green-400
      shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80,0_0_30px_#4ade80]
      animate-[rotate_6s_linear_infinite]
    `,
        glitch: `
      ${baseStyles}
      border-4 border-red-500
      animate-[rotate_5s_steps(20)_infinite]
    `
    };

    return (
        <div className="relative">
            <div className={variantStyles[variant]}>
                <style>{rotateAnimation}</style>
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {showSupportBadge && (
                <div className="z-50 absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1">
                    <Badge size="20" />
                </div>
            )}
        </div>

    );
};

// Example usage with different variants
const ProfileExamples: React.FC = () => {
    const variants: ProfileProps['variant'][] = ['default', 'bordered', 'gradient', 'neon', 'glitch'];

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {variants.map((variant) => (
                <AnimatedProfile
                    key={variant}
                    imageUrl="https://avatars.githubusercontent.com/u/124599?v=4"
                    showSupportBadge={true}
                    size={20}
                    variant={variant}
                />
            ))}
        </div>
    );
};

export default ProfileExamples;
