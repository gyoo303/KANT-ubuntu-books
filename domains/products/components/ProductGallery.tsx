'use client';

import BookCover from '@/domains/products/components/BookCover';
import type { Product } from '@/domains/products/types/product.types';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';

const THUMB_COUNT = 4; // TODO: 상세 이미지가 생기면 이미지 배열 길이로 교체

export default function ProductGallery({ product }: { product: Product }) {
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <div className="bg-paper-2 grid aspect-[454/530] place-items-center rounded-xl">
                <BookCover product={product} size="lg" className="w-[61%]" />
            </div>
            <div className="mt-3 flex gap-2">
                {Array.from({ length: THUMB_COUNT }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setSelected(i)}
                        aria-label={`이미지 ${i + 1}`}
                        aria-pressed={selected === i}
                        className={cn(
                            'bg-paper-2 h-[62px] w-[62px] rounded-lg border transition-colors',
                            selected === i
                                ? 'border-olive border-2'
                                : 'border-line',
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
