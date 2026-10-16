'use client';

import { cn } from '@/shared/utils/cn';
import { Check, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AddToCartButtonProps {
    productId: string;
    title: string;
    quantity?: number;
    variant?: 'icon' | 'full'; // icon: 목록 카드의 동그란 버튼, full: 상세의 큰 버튼
    className?: string;
}

export default function AddToCartButton({
    productId,
    title,
    quantity = 1,
    variant = 'icon',
    className,
}: AddToCartButtonProps) {
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!added) return;
        const timer = setTimeout(() => setAdded(false), 1500);
        return () => clearTimeout(timer);
    }, [added]);

    const handleClick = () => {
        // TODO: 장바구니 담당 작업(Zustand 스토어 / POST /api/v1/cart)과 연결
        console.info('[cart] add', { productId, quantity });
        setAdded(true);
    };

    const Icon = added ? Check : ShoppingBag;

    if (variant === 'full') {
        return (
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    'border-line bg-paper hover:border-olive inline-flex h-12 items-center justify-center gap-1.5 rounded-full border text-sm font-bold transition-colors',
                    className,
                )}
            >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {added ? `${quantity}권 담았어요` : '장바구니 담기'}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={
                added ? `${title} 장바구니에 담김` : `${title} 장바구니 담기`
            }
            className={cn(
                'border-line bg-paper hover:border-olive hover:bg-olive grid size-[38px] place-items-center rounded-full border transition-colors hover:text-white',
                added && 'border-olive bg-olive text-white',
                className,
            )}
        >
            <Icon className="size-4" aria-hidden="true" />
        </button>
    );
}
