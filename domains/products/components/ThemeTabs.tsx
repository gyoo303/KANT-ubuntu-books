import ThemeIcon from '@/domains/products/components/ThemeIcon';
import type { Theme } from '@/domains/products/types/product.types';
import { cn } from '@/shared/utils/cn';

interface ThemeTabsProps {
    themes: Theme[];
    activeThemeId: string; // 선택된 것처럼 보일 탭
}

// 테마 탭 (표시 전용) — 디자인대로 탭은 보여주지만, 눌러도 다른 테마로 이동하지 않아요.
export default function ThemeTabs({ themes, activeThemeId }: ThemeTabsProps) {
    const tabs = [{ id: 'all', name: '전체', icon: null }, ...themes];

    return (
        <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => {
                const active = tab.id === activeThemeId;
                return (
                    <span
                        key={tab.id}
                        aria-current={active ? 'true' : undefined}
                        className={cn(
                            'inline-flex cursor-default items-center gap-1.5 rounded-full border px-4 py-2 text-xs select-none',
                            active
                                ? 'border-ub-olive bg-ub-olive font-bold text-white'
                                : 'border-ub-border text-ub-sub',
                        )}
                    >
                        {tab.icon && (
                            <ThemeIcon name={tab.icon} className="h-3 w-3" />
                        )}
                        {tab.name}
                    </span>
                );
            })}
        </div>
    );
}
