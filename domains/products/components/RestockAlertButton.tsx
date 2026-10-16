'use client';

import { cn } from '@/shared/utils/cn';
import { useState } from 'react';

interface RestockAlertButtonProps {
    productId: string;
    variant?: 'chip' | 'full';
    className?: string;
}

export default function RestockAlertButton({
    productId,
    variant = 'chip',
    className,
}: RestockAlertButtonProps) {
    const [requested, setRequested] = useState(false);

    const handleClick = () => {
        // TODO: 재입고 알림 API 연결
        console.info('[restock] request', { productId });
        setRequested(true);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={requested}
            className={cn(
                variant === 'chip'
                    ? 'bg-paper-2 text-ink-2 rounded-full px-3 py-1 text-[12px] hover:bg-line'
                    : 'border-line bg-paper hover:border-olive h-12 rounded-full border text-sm font-bold',
                'transition-colors disabled:cursor-default disabled:opacity-70',
                className,
            )}
        >
            {requested
                ? '재입고되면 알려드릴게요'
                : variant === 'chip'
                  ? '재입고 알림'
                  : '재입고 알림 받기'}
        </button>
    );
}
