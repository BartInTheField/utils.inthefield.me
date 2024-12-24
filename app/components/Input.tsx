import React from 'react';

interface InputProps {
    id: string;
    type?: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({
    id,
    type = 'text',
    value,
    onChange,
    label,
    className = '',
}) => {
    return (
        <div className="flex items-center gap-2">
            {label && (
                <label htmlFor={id} className="w-20">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`border border-stone-800 dark:border-stone-200 bg-stone-300 dark:bg-stone-900 p-2 w-full ${className}`}
            />
        </div>
    );
};
