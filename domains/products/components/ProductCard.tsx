import AddToCartButton from '@/domains/products/components/AddToCartButton';
import BookCover from '@/domains/products/components/BookCover';
import RestockAlertButton from '@/domains/products/components/RestockAlertButton';
import type { Product } from '@/domains/products/types/product.types';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/formatPrice';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    themeLabel: string;
}

// 카드 전체 클릭 → 도서 상세(/[id])
// 제목 링크의 ::after 가 카드 전체를 덮고, 장바구니/재입고 버튼만 z-10 으로 그 위에 올라와 있어요.
export default function ProductCard({ product, themeLabel }: ProductCardProps) {
    const soldOut = product.stock === 0;

    return (
        <article
            className={cn(
                'group relative rounded-lg',
                'has-[a:focus-visible]:outline-ub-olive has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-[6px]',
            )}
        >
            <div className="bg-ub-card group-hover:bg-ub-card-hover relative grid place-items-center rounded-lg py-[22px] transition-colors">
                <BookCover
                    product={product}
                    className={cn(
                        'w-[57%] transition-transform duration-300 group-hover:-translate-y-1',
                        soldOut && 'opacity-75',
                    )}
                />
                {soldOut && (
                    <span className="bg-ub-cream text-ub-ink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 text-[10px]">
                        일시 품절
                    </span>
                )}
            </div>

            <p className="text-ub-sub mt-4 text-[10px]">{themeLabel}</p>
            <h3 className="mt-0.5 text-sm font-bold">
                <Link
                    href={`/${product.id}`}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                    {product.title}
                </Link>
            </h3>
            <p className="text-ub-muted text-[11px]">
                {product.author} · {product.publisher}
            </p>
            <p className="text-ub-sub mt-2.5 mb-3.5 hidden text-xs md:block">
                “{product.one_line}”
            </p>

            <div className="mt-3 flex items-center justify-between md:mt-0">
                <span
                    className={cn(
                        'text-[13px] font-bold',
                        soldOut && 'text-ub-muted font-normal',
                    )}
                >
                    {formatPrice(product.price)}
                </span>
                <div className="relative z-10">
                    {soldOut ? (
                        <RestockAlertButton productId={product.id} />
                    ) : (
                        <AddToCartButton
                            productId={product.id}
                            title={product.title}
                        />
                    )}
                </div>
            </div>
        </article>
    );
}
