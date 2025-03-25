
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const { theme, accentColor } = useTheme();
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Dynamic accent color mapping
  const accentMapping = {
    purple: {
      bg: 'bg-purple hover:bg-purple-dark',
      border: 'border-purple/50',
      ring: 'focus:ring-purple',
      shadow: 'shadow-purple/20'
    },
    blue: {
      bg: 'bg-blue-500 hover:bg-blue-600',
      border: 'border-blue-500/50',
      ring: 'focus:ring-blue-500',
      shadow: 'shadow-blue-500/20'
    },
    green: {
      bg: 'bg-emerald-500 hover:bg-emerald-600',
      border: 'border-emerald-500/50',
      ring: 'focus:ring-emerald-500',
      shadow: 'shadow-emerald-500/20'
    },
    red: {
      bg: 'bg-red-500 hover:bg-red-600',
      border: 'border-red-500/50',
      ring: 'focus:ring-red-500',
      shadow: 'shadow-red-500/20'
    },
    yellow: {
      bg: 'bg-amber-500 hover:bg-amber-600',
      border: 'border-amber-500/50',
      ring: 'focus:ring-amber-500',
      shadow: 'shadow-amber-500/20'
    }
  };
  
  const currentAccent = accentMapping[accentColor];
  
  const themeClasses = theme === 'dark' 
    ? 'text-white' 
    : 'text-gray-800';
  
  const variants = {
    primary: `${currentAccent.bg} ${themeClasses} shadow-lg ${currentAccent.shadow}`,
    secondary: `${theme === 'dark' ? 'bg-dark-lighter' : 'bg-gray-200'} border ${currentAccent.border} text-${theme === 'dark' ? 'white' : 'gray-800'} hover:${theme === 'dark' ? 'bg-dark-light' : 'bg-gray-300'}`,
    ghost: `bg-transparent text-${theme === 'dark' ? 'white' : 'gray-800'} hover:${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`,
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const loadingClasses = isLoading
    ? 'relative text-transparent transition-none hover:text-transparent'
    : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loadingClasses,
        "shine-effect",
        className
      )}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;
