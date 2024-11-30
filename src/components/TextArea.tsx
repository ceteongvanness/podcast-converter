import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:text-gray-500 ${className}`}
      {...props}
    />
  );
}