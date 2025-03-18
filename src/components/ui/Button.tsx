import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-xl font-medium transition-all cursor-pointer',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
          'border border-gray-400 text-gray-800 dark:text-gray-100 hover:bg-gray-100 hover:dark:text-gray-800': variant === 'outline',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': isLoading || props.disabled,
        },
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : icon}
      {children}
    </button>
  );
}
