import ThemeIcon from '@/domains/products/components/ThemeIcon';
import type {
    ProductListQuery,
    Theme,
} from '@/domains/products/types/product.types';
import {
    ALL_THEME_ID,
    buildBookshelfHref,
} from '@/domains/products/utils/bookshelfQuery';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';

interface ThemeTabsProps {
    themes: Theme[];
    query: ProductListQuery; // 지금 고른 테마·정렬·품절 제외
}

// 테마 탭 — 누르면 ?theme= 가 바뀌고 1페이지로 돌아가요. (정렬·품절 제외는 그대로 유지)
export default function ThemeTabs({ themes, query }: ThemeTabsProps) {
    const tabs = [{ id: ALL_THEME_ID, name: '전체', icon: null }, ...themes];

    return (
        <nav aria-label="테마 서가" className="mt-8 flex flex-wrap gap-2.5">
            {tabs.map((tab) => {
                const active = tab.id === query.themeId;
                return (
                    <Link
                        key={tab.id}
                        href={buildBookshelfHref({
                            ...query,
                            themeId: tab.id,
                            page: 1,
                        })}
                        scroll={false}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'focus-visible:ring-olive/40 inline-flex h-[46px] items-center gap-2 rounded-full border px-[22px] text-[15px] transition-colors outline-none select-none focus-visible:ring-3',
                            active
                                ? 'border-olive bg-olive font-bold text-white'
                                : 'border-line text-ink-2 hover:border-olive hover:text-ink',
                        )}
                    >
                        {tab.icon && (
                            <ThemeIcon name={tab.icon} className="size-4" />
                        )}
                        {tab.name}
                    </Link>
                );
            })}
        </nav>
    );
}
