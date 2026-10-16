'use client';

import {
    seasonOf,
    SHELF_NOTE_MAX_LENGTH,
} from '@/domains/shelf-notes/utils/validateShelfNote';
import { todayKst } from '@/domains/shelf-notes/utils/formatShelfDate';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

// 나의 서가 카드의 "+ 한 줄 남기기" → 그 자리에서 바로 적고 저장
export default function AddShelfNote({ entryId }: { entryId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    const save = async () => {
        setError(null);
        const readAt = todayKst();
        const res = await fetch('/api/v1/shelf-notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entry_id: entryId,
                content,
                read_at: readAt,
                season: seasonOf(readAt),
            }),
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? '저장하지 못했어요. 다시 시도해 주세요.');
            return;
        }
        startTransition(() => router.refresh()); // 서버에서 카드 다시 그리기
    };

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="border-line text-muted-foreground hover:border-olive hover:text-ink-2 flex h-[47px] w-full items-center gap-2 rounded-[10px] border border-dashed px-4 text-[14px] transition-colors"
            >
                <Plus className="size-4" strokeWidth={1.6} />한 줄 남기기
            </button>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void save();
            }}
            className="border-olive rounded-[10px] border bg-card p-3"
        >
            <input
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={SHELF_NOTE_MAX_LENGTH}
                placeholder="기억하고 싶은 한 줄"
                aria-label="한 줄 메모"
                className="font-serif w-full bg-transparent text-[15px] outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[11px]">
                    {[...content].length} / {SHELF_NOTE_MAX_LENGTH}
                </span>
                <div className="flex gap-1.5">
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                            setContent('');
                            setError(null);
                        }}
                        className="text-ink-2 rounded-full px-3 py-1 text-[12px]"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={pending || content.trim() === ''}
                        className="bg-ink rounded-full px-3 py-1 text-[12px] font-bold text-white disabled:opacity-40"
                    >
                        꽂기
                    </button>
                </div>
            </div>
            {error && (
                <p role="alert" className="mt-1.5 text-[12px] text-post">
                    {error}
                </p>
            )}
        </form>
    );
}
