import type { Product } from '@/domains/products/types/product.types';
import { cn } from '@/shared/utils/cn';
import Image from 'next/image';

interface BookCoverProps {
    product: Pick<
        Product,
        'title' | 'author' | 'cover_color' | 'cover_image_url' | 'cover_lines'
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
                'relative aspect-[2/3] overflow-hidden rounded-[2px_8px_8px_2px] text-white shadow-[0_10px_22px_rgba(60,40,20,0.18)]',
                "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-[3.5%] before:bg-black/20 before:content-['']",
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
                                'absolute top-[8%] right-[12%] left-[12%] leading-snug font-bold break-keep',
                                size === 'lg'
                                    ? 'text-2xl md:text-[26px]'
                                    : 'text-[15px] md:text-[18px]',
                            )}
                        >
                            {(product.cover_lines ?? [product.title]).map(
                                (line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ),
                            )}
                        </p>
                        <p className="absolute bottom-[9%] left-[12%] text-[13px] opacity-85">
                            {product.author}
                            {size === 'lg' && ' 지음'}
                        </p>
                    </>
                )
            )}
        </div>
    );
}
