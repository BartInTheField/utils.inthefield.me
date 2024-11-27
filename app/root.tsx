import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from '@remix-run/react';

import './tailwind.css';
import { services } from './services';
import { ServiceIcon } from './components/ServiceIcon';

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const service = services.find((s) => s.href === location.pathname);

    return (
        <html lang="en">
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
            <body>
                <nav className="p-2 bg-gray-100 dark:bg-gray-800 flex flex-col gap-4">
                    <div className="flex flex-row justify-between gap-4 container mx-auto">
                        <Link to="/" className="text-2xl font-bold">
                            utils.InTheField.me
                        </Link>
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-4">
                                <a
                                    className="text-sm"
                                    href="https://buymeacoffee.com/bartinthefield"
                                >
                                    Buy me a coffee
                                </a>
                                <a
                                    className="text-sm"
                                    href="https://github.com/bartinthefield/utils.inthefield.me"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    {service && (
                        <div className="container mx-auto flex flex-row gap-4 items-center">
                            <ServiceIcon
                                icon={service.icon}
                                category={service.category}
                            />
                            <h1 className="text-xl font-bold">
                                {service?.text}
                            </h1>
                        </div>
                    )}
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
