import { IconType } from 'react-icons';
import { categories } from '~/services';

export function ServiceIcon({
    icon,
    category,
    xl = false,
}: {
    icon: IconType;
    category: string;
    xl?: boolean;
}) {
    return (
        <div
            className={`text-white flex items-center justify-center ${
                categories.find((c) => c.key === category)?.color
            } ${xl ? 'w-16 h-16' : 'w-10 h-10'}`}
        >
            {icon({ className: xl ? 'w-8 h-8' : 'w-6 h-6' })}
        </div>
    );
}
