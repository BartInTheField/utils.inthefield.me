import React from 'react';
import { cn } from '~/utils/cn';

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = '', ...props }: TextareaProps) {
    return (
        <textarea
            className={cn(
                'w-full h-96 p-4 font-mono text-sm border-stone-800 dark:border-stone-200 bg-stone-300 dark:bg-stone-900',
                className,
            )}
            {...props}
        />
    );
}
