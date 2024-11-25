import type {MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "utils.InTheField.me"},
        {name: "description", content: "Client side ran development utilities "},
    ];
};

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <nav
                    className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                    <p className="leading-6 text-gray-700 dark:text-gray-200">
                        Utilities:
                    </p>
                    <ul>
                        {resources.map(({href, text}) => (
                            <li key={href}>
                                <Link
                                    className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                    to={href}
                                >
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

const resources = [
    {
        href: "/utils/web-image-converter",
        text: "Web Image Converter",
    }
];
