import { Links, Meta, Outlet } from '@remix-run/react';

import { Body } from './body';
import './tailwind.css';
import { useDarkMode } from './state/darkMode.state';

export function Layout({ children }: { children: React.ReactNode }) {
    const { isDarkMode } = useDarkMode();

    return (
        <html lang="en" className={isDarkMode ? 'dark' : ''}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script
                    defer
                    data-site-id="utils.inthefield.me"
                    src="https://assets.onedollarstats.com/tracker.js"
                ></script>
                <Meta />
                <Links />
            </head>

            <Body>{children}</Body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
