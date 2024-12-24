import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
            },
            fontFamily: {
                sans: [
                    'Geist Mono',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
            },
        },
    },
    plugins: [],
} satisfies Config;
