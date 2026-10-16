import type { ThemeIcon as ThemeIconName } from '@/domains/products/types/product.types';
import { MapPin, type LucideProps } from 'lucide-react';

// 시안 아이콘에 맞춘 연꽃(텃밭과 흙)
function Lotus(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 4C10 6.5 9.8 10.5 12 14C14.2 10.5 14 6.5 12 4Z" />
            <path d="M4 8C4 12.5 7.5 16 12 16C16.5 16 20 12.5 20 8C17 8.5 14.5 10.5 12 14C9.5 10.5 7 8.5 4 8Z" />
        </svg>
    );
}

// 시안 아이콘에 맞춘 그릇(치유의 식탁)
function Bowl(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M4 8h16l-3.2 7.4a1.8 1.8 0 0 1-1.6 1.1H8.8a1.8 1.8 0 0 1-1.6-1.1L4 8Z" />
        </svg>
    );
}

// 시안 아이콘에 맞춘 나무 두 그루(자연과 함께 머물기)
function Trees(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* 살짝 울퉁불퉁한 나뭇잎 테두리 */}
            <path d="M8 3.4A2 2 0 0 1 11 4.7A2.3 2.3 0 0 1 12.5 8A2.4 2.4 0 0 1 12 11.8A2.1 2.1 0 0 1 9.6 14.3A2 2 0 0 1 6.4 14.3A2.1 2.1 0 0 1 4 11.8A2.4 2.4 0 0 1 3.5 8A2.3 2.3 0 0 1 5 4.7A2 2 0 0 1 8 3.4Z" />
            <path d="M8 21V8" />
            <path d="M8 13l-2-2" />
            <path d="M8 11l2-2" />
            <path d="M13.5 4.5l3 4h-1.5l3 4h-1.5l4.5 5H13" />
            <path d="M15.5 17.5V21" />
        </svg>
    );
}

const ICONS = {
    sprout: Lotus,
    soup: Bowl,
    leaf: Trees,
    'map-pin': MapPin,
} satisfies Record<ThemeIconName, unknown>;

export default function ThemeIcon({
    name,
    ...props
}: { name: ThemeIconName } & LucideProps) {
    const Icon = ICONS[name];
    return <Icon aria-hidden="true" {...props} />;
}
