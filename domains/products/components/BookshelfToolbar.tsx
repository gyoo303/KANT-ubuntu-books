'use client';

import type {
    ProductListQuery,
    ProductSort,
} from '@/domains/products/types/product.types';
import {
    buildBookshelfHref,
    PRODUCT_SORT_OPTIONS,
} from '@/domains/products/utils/bookshelfQuery';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

interface BookshelfToolbarProps {
    query: ProductListQuery;
    totalCount: number;
}

// 품절 제외 / 정렬 — 바꾸면 URL 쿼리를 갱신하고 1페이지로 돌아가요.
export default function BookshelfToolbar({
    query,
    totalCount,
}: BookshelfToolbarProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    // 서버에서 새 목록이 올 때까지 기다리지 않고 체크박스·정렬 값을 바로 바꿔 보여줘요.
    const [optimistic, setOptimistic] = useOptimistic(query);

    const update = (next: Partial<ProductListQuery>) =>
        startTransition(() => {
            setOptimistic({ ...optimistic, ...next });
            router.push(buildBookshelfHref({ ...query, ...next, page: 1 }), {
                scroll: false,
            });
        });

    return (
        <div className="text-ink-2 mb-7 flex items-center justify-between text-[14px]">
            <span>{totalCount}권</span>
            <div className="flex items-center gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        checked={optimistic.hideSoldOut}
                        onChange={(e) =>
                            update({ hideSoldOut: e.target.checked })
                        }
                        className="accent-olive size-[18px]"
                    />
                    품절 제외
                </label>
                <div className="relative">
                    <select
                        aria-label="정렬"
                        value={optimistic.sort}
                        onChange={(e) =>
                            update({ sort: e.target.value as ProductSort })
                        }
                        className="text-ink cursor-pointer appearance-none bg-transparent pr-5 outline-none"
                    >
                        {PRODUCT_SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        aria-hidden="true"
                        className="text-ink pointer-events-none absolute top-1/2 right-0 size-3.5 -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    );
}
