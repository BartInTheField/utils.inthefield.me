import React from 'react';

interface FileInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    className?: string;
    preview?: File | null;
}

export const FileInput: React.FC<FileInputProps> = ({
    onChange,
    accept = 'image/*',
    className = '',
    preview,
}) => {
    return (
        <div className="flex flex-col items-center gap-4">
            {preview && (
                <div className="border-4 border-gray-300 p-2 w-full h-full">
                    <img
                        src={URL.createObjectURL(preview)}
                        alt="Preview"
                        className="max-w-xl max-h-xl"
                        onLoad={(e) => {
                            // Clean up the object URL after image loads
                            URL.revokeObjectURL(
                                (e.target as HTMLImageElement).src,
                            );
                        }}
                    />
                </div>
            )}
            <label className={`cursor-pointer ${className}`}>
                <div className="flex items-center justify-center px-4 py-2 border border-stone-800 dark:border-stone-200 bg-stone-300 dark:bg-stone-900 hover:bg-stone-400 dark:hover:bg-stone-800 transition-colors rounded">
                    Choose File
                </div>
                <input
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
            </label>
        </div>
    );
};
