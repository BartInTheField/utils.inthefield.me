import React from 'react';

const Button: React.FC<{
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    label?: string;
    children?: React.ReactNode;
}> = ({ onClick, type = 'button', children }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-primary-800 dark:bg-primary-200 hover:bg-primary-900 dark:hover:bg-primary-300 text-stone-200 dark:text-stone-800 font-bold py-2 px-4"
        >
            {children}
        </button>
    );
};

export default Button;
