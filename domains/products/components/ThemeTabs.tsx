import ThemeIcon from '@/domains/products/components/ThemeIcon';
import type { Theme } from '@/domains/products/types/product.types';
import { buildBookshelfHref } from '@/domains/products/utils/bookshelfQuery';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';

interface ThemeTabsProps {
    themes: Theme[];
    activeThemeId: string | null; // null = 전체
}

// 탭 필터: 탭을 누르면 ?theme= 값만 바뀌고, 정렬·품절 제외는 초기화돼요.
export default function ThemeTabs({ themes, activeThemeId }: ThemeTabsProps) {
    const tabs = [{ id: null, name: '전체', icon: null }, ...themes];

    return (
        <nav aria-label="테마 서가" className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => {
                const active = tab.id === activeThemeId;
                return (
                    <Link
                        key={tab.id ?? 'all'}
                        href={buildBookshelfHref({ themeId: tab.id })}
                        scroll={false}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs transition-colors',
                            active
                                ? 'border-ub-olive bg-ub-olive font-bold text-white'
                                : 'border-ub-border text-ub-sub hover:border-ub-olive hover:text-ub-ink',
                        )}
                    >
                        {tab.icon && (
                            <ThemeIcon name={tab.icon} className="h-3 w-3" />
                        )}
                        {tab.name}
                    </Link>
                );
            })}
        </nav>
    );
}
