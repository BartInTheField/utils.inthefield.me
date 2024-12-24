import {
    FaBoxOpen,
    FaBraille,
    FaRegImages,
    FaVectorSquare,
} from 'react-icons/fa';

export const categories = [
    {
        key: 'image',
        color: 'bg-red-500',
    },
    {
        key: 'encoding',
        color: 'bg-purple-500',
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
    {
        key: 'jwt-decode',
        href: '/utils/jwt-decode',
        text: 'JWT Decode',
        category: 'encoding',
        icon: FaBoxOpen,
    },
    {
        key: 'base64',
        href: '/utils/base64',
        text: 'Base64 Encode/Decode',
        category: 'encoding',
        icon: FaBraille,
    },
];
