import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full py-4 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}