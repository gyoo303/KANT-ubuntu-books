import type { ProductListQuery } from '@/domains/products/types/product.types';
import { buildBookshelfHref } from '@/domains/products/utils/bookshelfQuery';
import { cn } from '@/shared/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BookshelfPaginationProps {
    query: ProductListQuery;
    totalPages: number;
}

const itemClass = 'grid h-6 min-w-6 place-items-center rounded-md text-ub-sub';

export default function BookshelfPagination({
    query,
    totalPages,
}: BookshelfPaginationProps) {
    const { page } = query;
    const href = (p: number) => buildBookshelfHref({ ...query, page: p });

    const renderArrow = (to: number, label: string, icon: React.ReactNode) =>
        to < 1 || to > totalPages ? (
            <span aria-hidden="true" className={cn(itemClass, 'opacity-30')}>
                {icon}
            </span>
        ) : (
            <Link
                href={href(to)}
                aria-label={label}
                className={cn(itemClass, 'hover:bg-ub-card')}
            >
                {icon}
            </Link>
        );

    return (
        <nav
            aria-label="페이지"
            className="mt-14 flex justify-center gap-1.5 text-xs"
        >
            {renderArrow(
                page - 1,
                '이전 페이지',
                <ChevronLeft className="h-3.5 w-3.5" />,
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                    key={p}
                    href={href(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={cn(
                        itemClass,
                        p === page
                            ? 'bg-ub-ink text-white'
                            : 'hover:bg-ub-card',
                    )}
                >
                    {p}
                </Link>
            ))}
            {renderArrow(
                page + 1,
                '다음 페이지',
                <ChevronRight className="h-3.5 w-3.5" />,
            )}
        </nav>
    );
}
