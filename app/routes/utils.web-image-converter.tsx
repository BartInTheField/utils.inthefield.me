import type { MetaFunction } from '@remix-run/node';
import React, { useState } from 'react';
import Button from '~/components/Button';
import { Select } from '~/components/Select';
import { services } from '~/services';

const service = services.find((s) => s.key === 'web-image-converter')!;

export const meta: MetaFunction = () => {
    return [
        { title: service.text },
        {
            name: 'description',
            content: 'Converts images to other formats suited for the web',
        },
        { name: 'key', content: service.key },
    ];
};

const formatOptions = [
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WEBP' },
    { value: 'bmp', label: 'BMP' },
    { value: 'png', label: 'PNG' },
];

const resizeOptions = [
    { value: '1', label: '1x' },
    { value: '0.75', label: '0.75x' },
    { value: '0.5', label: '0.5x' },
    { value: '0.25', label: '0.25x' },
];

export default function Index() {
    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState<string>('jpeg');
    const [resize, setResize] = useState<string>('1');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(e.target.value);
    };

    const handleResizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setResize(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const multiplier = parseFloat(resize);
                canvas.width = img.width * multiplier;
                canvas.height = img.height * multiplier;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL(`image/${format}`);

                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `converted.${format}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };
            if (event.target?.result) {
                img.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8"
            >
                {file && (
                    <div className="border-4 border-gray-300 p-2">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="max-w-xs max-h-xs"
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Select
                    value={format}
                    onChange={handleFormatChange}
                    options={formatOptions}
                />

                <div className="flex items-center gap-2">
                    <Select
                        value={resize}
                        onChange={handleResizeChange}
                        options={resizeOptions}
                    />
                    <label>Resize Image</label>
                </div>

                <Button type="submit">Convert and Download</Button>
            </form>
        </div>
    );
}
