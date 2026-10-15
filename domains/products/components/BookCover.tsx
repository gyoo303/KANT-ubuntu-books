import type { Product } from '@/domains/products/types/product.types';
import { cn } from '@/shared/utils/cn';
import Image from 'next/image';

interface BookCoverProps {
    product: Pick<
        Product,
        'title' | 'author' | 'cover_color' | 'cover_image_url'
    >;
    size?: 'sm' | 'md' | 'lg'; // sm: 같은 서가의 책(글자 없음), md: 목록 카드, lg: 상세
    className?: string;
}

// 실제 표지 이미지가 없으면 색 블록 + 제목으로 표지를 대신 그립니다.
export default function BookCover({
    product,
    size = 'md',
    className,
}: BookCoverProps) {
    return (
        <div
            className={cn(
                'relative aspect-[2/3] overflow-hidden rounded-[3px_6px_6px_3px] text-white shadow-[0_10px_22px_rgba(60,40,20,0.18)]',
                "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-[5%] before:bg-black/20 before:content-['']",
                className,
            )}
            style={{ backgroundColor: product.cover_color }}
        >
            {product.cover_image_url ? (
                <Image
                    src={product.cover_image_url}
                    alt={`${product.title} 표지`}
                    fill
                    sizes="(min-width: 768px) 300px, 50vw"
                    className="object-cover"
                />
            ) : (
                size !== 'sm' && (
                    <>
                        <p
                            className={cn(
                                'font-ub-serif absolute top-[12%] right-[14%] left-[14%] leading-snug font-semibold break-keep',
                                size === 'lg'
                                    ? 'text-2xl md:text-[26px]'
                                    : 'text-sm md:text-[15px]',
                            )}
                        >
                            {product.title}
                        </p>
                        <p className="absolute bottom-[7%] left-[14%] text-[11px] opacity-85">
                            {product.author}
                            {size === 'lg' && ' 지음'}
                        </p>
                    </>
                )
            )}
        </div>
    );
}
