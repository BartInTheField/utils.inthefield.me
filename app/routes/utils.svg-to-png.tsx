import type { MetaFunction } from '@remix-run/node';
import React, { useState } from 'react';
import Button from '~/components/Button';
import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { services } from '~/services';

const service = services.find((s) => s.key === 'svg-to-png')!;

export const meta: MetaFunction = () => {
    return [
        { title: service.text },
        {
            name: 'description',
            content: 'Convert SVG files to PNG format with custom dimensions',
        },
        { name: 'key', content: service.key },
    ];
};

export default function Index() {
    const [file, setFile] = useState<File | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [originalDimensions, setOriginalDimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);

            // Read SVG dimensions
            const reader = new FileReader();
            reader.onload = (event) => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(
                    event.target?.result as string,
                    'image/svg+xml',
                );
                const svgElement = svgDoc.documentElement;
                const viewBox =
                    svgElement.getAttribute('viewBox')?.split(' ') || [];
                const width = parseFloat(
                    svgElement.getAttribute('width') || viewBox[2] || '0',
                );
                const height = parseFloat(
                    svgElement.getAttribute('height') || viewBox[3] || '0',
                );

                setOriginalDimensions({ width, height });
                setWidth(width);
                setHeight(height);
            };
            reader.readAsText(file);
        }
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseFloat(e.target.value);
        if (originalDimensions && !isNaN(newWidth)) {
            const ratio = originalDimensions.height / originalDimensions.width;
            setWidth(newWidth);
            setHeight(newWidth * ratio);
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseFloat(e.target.value);
        if (originalDimensions && !isNaN(newHeight)) {
            const ratio = originalDimensions.width / originalDimensions.height;
            setHeight(newHeight);
            setWidth(newHeight * ratio);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/png');

                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'converted.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex mt-16 items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8"
            >
                <FileInput
                    onChange={handleFileChange}
                    accept=".svg"
                    preview={file}
                />

                <div className="flex flex-col gap-4 w-full">
                    <Input
                        id="width"
                        type="number"
                        value={Math.round(width)}
                        onChange={handleWidthChange}
                        label="Width:"
                    />

                    <Input
                        id="height"
                        type="number"
                        value={Math.round(height)}
                        onChange={handleHeightChange}
                        label="Height:"
                    />
                </div>

                <Button type="submit">Convert and Download</Button>
            </form>
        </div>
    );
}
