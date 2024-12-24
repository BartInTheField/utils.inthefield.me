import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { services } from '../services';
import { ServiceIcon } from '~/components/ServiceIcon';

export const meta: MetaFunction = () => {
    return [
        { title: 'utils.InTheField.me' },
        {
            name: 'description',
            content: 'Client side ran development utilities ',
        },
    ];
};

export default function Index() {
    return (
        <div className="flex mt-16 items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <nav className="flex flex-col items-center justify-center gap-4 border border-stone-800 p-6 dark:border-stone-200">
                    <p className="leading-6">Utilities:</p>
                    <ul>
                        {services.map(({ href, text, icon, category }) => (
                            <li key={href}>
                                <Link
                                    className="group flex items-center gap-3 self-stretch p-3 leading-norma hover:underline "
                                    to={href}
                                >
                                    <ServiceIcon
                                        icon={icon}
                                        category={category}
                                    />
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
