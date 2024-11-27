import { FaRegImages, FaVectorSquare } from 'react-icons/fa';

export const categories = [
    {
        key: 'image',
        color: 'bg-red-500',
    },
];

export const services = [
    {
        key: 'web-image-converter',
        href: '/utils/web-image-converter',
        text: 'Web Image Converter',
        category: 'image',
        icon: FaRegImages,
    },
    {
        key: 'svg-to-png',
        href: '/utils/svg-to-png',
        text: 'SVG to PNG',
        category: 'image',
        icon: FaVectorSquare,
    },
];
