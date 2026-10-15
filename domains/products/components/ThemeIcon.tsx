import type { ThemeIcon as ThemeIconName } from '@/domains/products/types/product.types';
import { Leaf, MapPin, Soup, Sprout, type LucideProps } from 'lucide-react';

const ICONS = {
    sprout: Sprout,
    soup: Soup,
    leaf: Leaf,
    'map-pin': MapPin,
} satisfies Record<ThemeIconName, unknown>;

export default function ThemeIcon({
    name,
    ...props
}: { name: ThemeIconName } & LucideProps) {
    const Icon = ICONS[name];
    return <Icon aria-hidden="true" {...props} />;
}
