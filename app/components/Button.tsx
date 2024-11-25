import React from 'react';

const Button: React.FC<{
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    label?: string;
    children?: React.ReactNode
}> = ({
          onClick,
          type = 'button',
          label,
          children
      }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            {children}
        </button>
    );
}

export default Button;