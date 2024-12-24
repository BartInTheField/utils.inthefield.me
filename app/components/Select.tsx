import React from 'react';

export const Select: React.FC<{
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => {
    return (
        <select
            className="border border-stone-800 dark:border-stone-200 bg-stone-300 dark:bg-stone-900 p-2"
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
