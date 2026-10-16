'use client';

import type { UnboxingDetail } from '@/domains/shelf-notes/types/shelfNote.types';
import { cn } from '@/shared/utils/cn';
import { X, ZoomIn } from 'lucide-react';
import { useEffect, useState } from 'react';

function Postcard({
    postcard,
    large = false,
}: {
    postcard: UnboxingDetail['postcard'];
    large?: boolean;
}) {
    return (
        <div
            className={cn(
                'relative rounded-[4px] bg-card font-hand text-[#2f3a55] shadow-[0_8px_22px_rgba(80,60,30,0.16)]',
                large
                    ? 'w-[min(90vw,640px)] px-12 py-12 text-[38px] leading-[64px]'
                    : 'w-full max-w-[346px] -rotate-2 px-7 pt-7 pb-6 text-[21px] leading-[34px]',
            )}
        >
            {/* 우표 자리 */}
            <span
                className={cn(
                    'absolute border border-dashed border-[#d9c7b0] bg-[#f3e6d6]',
                    large
                        ? 'top-8 right-8 h-[100px] w-[82px]'
                        : 'top-4 right-5 h-[54px] w-[44px]',
                )}
            />
            {postcard.lines.map((line) => (
                <p key={line}>{line}</p>
            ))}
            <p className={cn('text-right', large ? 'mt-10' : 'mt-6')}>
                — {postcard.sign}
            </p>
        </div>
    );
}

// 손글씨 엽서 + "크게 보기"
export default function UnboxingPostcard({
    postcard,
}: {
    postcard: UnboxingDetail['postcard'];
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) =>
            e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Postcard postcard={postcard} />

            <div>
                <p className="text-[16px] font-bold">손글씨 엽서</p>
                <p className="text-ink-2 mt-2 max-w-[150px] text-[13px] leading-[22px]">
                    상자 속 엽서를 스캔해 함께 보관해요.
                </p>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="border-line hover:border-olive mt-4 inline-flex h-[34px] items-center gap-1.5 rounded-full border px-4 text-[13px] font-bold transition-colors"
                >
                    <ZoomIn className="size-4" strokeWidth={1.8} />
                    크게 보기
                </button>
            </div>

            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="손글씨 엽서 크게 보기"
                    className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative"
                    >
                        <Postcard postcard={postcard} large />
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="닫기"
                            className="bg-ink absolute -top-4 -right-4 grid size-9 place-items-center rounded-full text-white"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
