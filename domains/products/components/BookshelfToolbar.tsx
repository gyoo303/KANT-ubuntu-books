'use client';

import type {
    ProductListQuery,
    ProductSort,
} from '@/domains/products/types/product.types';
import {
    buildBookshelfHref,
    PRODUCT_SORT_OPTIONS,
} from '@/domains/products/utils/bookshelfQuery';
import { Menu } from '@base-ui/react/menu';
import { Switch } from '@base-ui/react/switch';
import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    Check,
    ChevronDown,
    Sprout,
    Type,
    type LucideIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

interface BookshelfToolbarProps {
    query: ProductListQuery;
    totalCount: number;
}

// 정렬 항목 옆에 붙는 동그란 아이콘
const SORT_ICONS: Record<ProductSort, LucideIcon> = {
    recommended: Sprout,
    price_asc: ArrowUpNarrowWide,
    price_desc: ArrowDownWideNarrow,
    title: Type,
};

// 품절 제외(스위치) / 정렬(카드형 메뉴) — 바꾸면 URL 쿼리를 갱신하고 1페이지로 돌아가요.
export default function BookshelfToolbar({
    query,
    totalCount,
}: BookshelfToolbarProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    // 서버에서 새 목록이 올 때까지 기다리지 않고 스위치·정렬 값을 바로 바꿔 보여줘요.
    const [optimistic, setOptimistic] = useOptimistic(query);

    const update = (next: Partial<ProductListQuery>) =>
        startTransition(() => {
            setOptimistic({ ...optimistic, ...next });
            router.push(buildBookshelfHref({ ...query, ...next, page: 1 }), {
                scroll: false,
            });
        });

    const current =
        PRODUCT_SORT_OPTIONS.find((o) => o.value === optimistic.sort) ??
        PRODUCT_SORT_OPTIONS[0];

    return (
        <div className="border-line mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
            <p className="text-ink-2 text-[14px]">
                <span className="text-ink mr-0.5 font-serif text-[22px]">
                    {totalCount}
                </span>
                권의 책
            </p>

            <div className="flex items-center gap-5">
                {/* 품절 제외 스위치 */}
                <label className="text-ink-2 inline-flex cursor-pointer items-center gap-2.5 text-[13.5px] select-none">
                    <Switch.Root
                        checked={optimistic.hideSoldOut}
                        onCheckedChange={(checked) =>
                            update({ hideSoldOut: checked })
                        }
                        className="bg-line data-checked:bg-olive focus-visible:ring-olive/40 relative inline-flex h-[22px] w-[38px] shrink-0 rounded-full transition-colors outline-none focus-visible:ring-3"
                    >
                        <Switch.Thumb className="absolute top-[3px] left-[3px] size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform data-checked:translate-x-4" />
                    </Switch.Root>
                    품절 제외
                </label>

                {/* 정렬 메뉴 */}
                <Menu.Root modal={false}>
                    <Menu.Trigger className="border-ink bg-card text-ink focus-visible:ring-olive/40 group inline-flex h-10 items-center gap-2.5 rounded-full border pr-4 pl-[18px] text-[14px] font-medium outline-none focus-visible:ring-3">
                        <span className="text-muted-foreground text-[12px] font-normal">
                            정렬
                        </span>
                        {current.label}
                        <ChevronDown
                            aria-hidden="true"
                            className="size-3.5 transition-transform group-data-popup-open:rotate-180"
                        />
                    </Menu.Trigger>

                    <Menu.Portal>
                        <Menu.Positioner
                            align="end"
                            sideOffset={8}
                            className="z-50 outline-none"
                        >
                            <Menu.Popup className="border-line bg-card data-starting-style:-translate-y-1 data-ending-style:-translate-y-1 data-starting-style:opacity-0 data-ending-style:opacity-0 w-[300px] origin-(--transform-origin) rounded-[18px] border p-2 shadow-[0_18px_40px_rgba(60,40,20,0.16)] transition-[opacity,translate] duration-150 outline-none">
                                <Menu.RadioGroup
                                    value={optimistic.sort}
                                    onValueChange={(value) =>
                                        update({ sort: value as ProductSort })
                                    }
                                >
                                    {PRODUCT_SORT_OPTIONS.map((o, i) => {
                                        const Icon = SORT_ICONS[o.value];
                                        return (
                                            <div key={o.value}>
                                                {i === 1 && (
                                                    <div className="bg-line mx-2.5 my-1 h-px" />
                                                )}
                                                <Menu.RadioItem
                                                    value={o.value}
                                                    closeOnClick
                                                    className="group/item data-highlighted:bg-paper data-checked:bg-olive-soft flex cursor-pointer items-start gap-3 rounded-xl px-3 py-[11px] outline-none select-none"
                                                >
                                                    <span className="bg-paper-2 text-ink-2 group-data-checked/item:bg-olive grid size-[30px] shrink-0 place-items-center rounded-full group-data-checked/item:text-white">
                                                        <Icon
                                                            className="size-3.5"
                                                            strokeWidth={1.7}
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="group-data-checked/item:text-olive block text-[14px] font-semibold">
                                                            {o.label}
                                                        </span>
                                                        <span className="text-muted-foreground block text-[12px]">
                                                            {o.hint}
                                                        </span>
                                                    </span>
                                                    <Menu.RadioItemIndicator className="text-olive self-center">
                                                        <Check
                                                            className="size-4"
                                                            strokeWidth={2.2}
                                                            aria-hidden="true"
                                                        />
                                                    </Menu.RadioItemIndicator>
                                                </Menu.RadioItem>
                                            </div>
                                        );
                                    })}
                                </Menu.RadioGroup>
                            </Menu.Popup>
                        </Menu.Positioner>
                    </Menu.Portal>
                </Menu.Root>
            </div>
        </div>
    );
}
