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

// 카드 전체 클릭 → 도서 상세(/bookshelf/[id])
// 제목 링크의 ::after 가 카드 전체를 덮고, 장바구니/재입고 버튼만 z-10 으로 그 위에 올라와 있어요.
export default function ProductCard({ product, themeLabel }: ProductCardProps) {
    const soldOut = product.stock === 0;

    return (
        <article
            className={cn(
                'group relative rounded-xl',
                'has-[a:focus-visible]:outline-olive has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-[6px]',
            )}
        >
            <div className="bg-paper-2 group-hover:bg-line relative grid place-items-center rounded-xl py-8 transition-colors">
                <BookCover
                    product={product}
                    className={cn(
                        'w-[57%] transition-transform duration-300 group-hover:-translate-y-1',
                        soldOut && 'opacity-75',
                    )}
                />
                {soldOut && (
                    <span className="bg-letter text-ink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[12px]">
                        일시 품절
                    </span>
                )}
            </div>

            <p className="text-ink-2 mt-7 text-[12px]">{themeLabel}</p>
            <h3 className="mt-1 text-[18px] font-bold">
                <Link
                    href={`/bookshelf/${product.id}`}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                    {product.title}
                </Link>
            </h3>
            <p className="text-muted-foreground mt-0.5 text-[13px]">
                {product.author} · {product.publisher}
            </p>
            <p className="text-ink-2 mt-4 hidden text-[14px] md:block">
                “{product.one_line}”
            </p>

            <div className="mt-5 flex items-center justify-between">
                <span
                    className={cn(
                        'text-[16px] font-bold',
                        soldOut && 'text-muted-foreground font-normal',
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
