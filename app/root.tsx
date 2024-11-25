import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import './tailwind.css';


export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script
                defer
                data-site-id="utils.inthefield.me"
                src="https://assets.onedollarstats.com/tracker.js">
            </script>
            <Meta />
            <Links />
        </head>
        <body>
        <nav className="p-2 bg-gray-100 dark:bg-gray-800 ">
            <div className="flex flex-row justify-between gap-4 container mx-auto">
                <Link to="/">Home</Link>
                <div className="flex gap-4">
                    <a className="" href="https://buymeacoffee.com/bartinthefield">Buy me a coffee</a>
                    <a className="" href="https://github.com/bartinthefield/utils.inthefield.me">GitHub</a>
                </div>
            </div>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
