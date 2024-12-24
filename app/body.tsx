import {
    Link,
    Scripts,
    ScrollRestoration,
    useLocation,
} from '@remix-run/react';
import { ServiceIcon } from './components/ServiceIcon';
import { services } from './services';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from './state/darkMode.state';

export function Body({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const service = services.find((s) => s.href === location.pathname);
    const { isDarkMode, toggle } = useDarkMode();
    return (
        <body>
            <nav className="p-2 bg-stone-200 dark:bg-stone-800 flex flex-col gap-4 py-4 border-b border-stone-800 dark:border-stone-200">
                <div className="flex flex-row justify-between gap-4 container mx-auto">
                    <Link to="/" className="text-2xl font-bold">
                        utils.InTheField.me
                    </Link>
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-4">
                            <a
                                className="text-sm hover:text-primary-900 dark:hover:text-primary-200"
                                href="https://buymeacoffee.com/bartinthefield"
                            >
                                Buy me a coffee
                            </a>
                            <a
                                className="text-sm hover:text-primary-900 dark:hover:text-primary-200"
                                href="https://github.com/bartinthefield/utils.inthefield.me"
                            >
                                GitHub
                            </a>

                            <button onClick={toggle}>
                                {isDarkMode ? <FaMoon /> : <FaSun />}
                            </button>
                        </div>
                    </div>
                </div>

                {service && (
                    <div className="container mx-auto flex flex-row gap-4 items-center">
                        <ServiceIcon
                            icon={service.icon}
                            category={service.category}
                        />
                        <h1 className="text-xl font-bold">{service?.text}</h1>
                    </div>
                )}
            </nav>
            {children}
            <ScrollRestoration />
            <Scripts />
        </body>
    );
}
