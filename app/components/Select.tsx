import React from 'react';

export const Select: React.FC<{
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}> = ({value, onChange, options}) => {
    return (
        <select
            className="border border-gray-300 p-2 rounded-md"
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