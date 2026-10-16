'use client';

import type {
    Season,
    ShelfNote,
} from '@/domains/shelf-notes/types/shelfNote.types';
import {
    SEASONS,
    seasonOf,
    SHELF_NOTE_MAX_LENGTH,
} from '@/domains/shelf-notes/utils/validateShelfNote';
import { todayKst } from '@/domains/shelf-notes/utils/formatShelfDate';
import { cn } from '@/shared/utils/cn';
import { Bookmark, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface BookmarkFormProps {
    entryId: string;
    savedNote: ShelfNote | null; // 이미 꽂아 둔 책갈피가 있으면 채워서 보여줘요
}

// 책갈피 꽂기 = 한 줄 메모 저장 (POST /api/v1/shelf-notes)
export default function BookmarkForm({
    entryId,
    savedNote,
}: BookmarkFormProps) {
    const [content, setContent] = useState(savedNote?.content ?? '');
    const [readAt, setReadAt] = useState(savedNote?.read_at ?? todayKst());
    const [season, setSeason] = useState<Season>(
        savedNote?.season ?? seasonOf(readAt),
    );
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>(
        savedNote ? 'saved' : 'idle',
    );
    const [error, setError] = useState<string | null>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const length = [...content].length;

    const submit = async () => {
        setStatus('saving');
        setError(null);
        const res = await fetch('/api/v1/shelf-notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                entry_id: entryId,
                content,
                read_at: readAt,
                season,
            }),
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? '저장하지 못했어요. 다시 시도해 주세요.');
            setStatus('idle');
            return;
        }
        setStatus('saved');
    };

    const changed = (fn: () => void) => {
        fn();
        if (status === 'saved') setStatus('idle');
    };

    return (
        <section className="bg-ub-card relative mt-8 rounded-[20px] px-6 pt-10 pb-8 md:px-8">
            {/* 빨간 책갈피 리본 */}
            <span
                aria-hidden="true"
                className="absolute -top-2 left-8 h-[46px] w-[22px] bg-[#c4573d] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
            />
            <div className="pl-10">
                <h2 className="font-ub-serif text-[20px]">책갈피 꽂기</h2>
                <p className="text-ub-sub mt-1.5 text-[13px]">
                    다 읽고 나서, 기억하고 싶은 한 줄을 남겨주세요. 나만 볼 수
                    있어요.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    void submit();
                }}
            >
                <label className="border-ub-olive-dark mt-6 flex h-[68px] items-center gap-3 rounded-xl border bg-[#fffdf8] px-5">
                    <span className="sr-only">한 줄 메모</span>
                    <input
                        value={content}
                        onChange={(e) =>
                            changed(() => setContent(e.target.value))
                        }
                        maxLength={SHELF_NOTE_MAX_LENGTH}
                        placeholder="기억하고 싶은 한 줄"
                        className="font-ub-serif placeholder:text-ub-muted min-w-0 flex-1 bg-transparent text-[19px] outline-none"
                    />
                    <span className="text-ub-muted shrink-0 text-[12px]">
                        {length} / {SHELF_NOTE_MAX_LENGTH}
                    </span>
                </label>

                <div className="mt-4 flex items-center gap-2">
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                        {/* 읽은 날짜 (누르면 달력이 열려요) */}
                        <button
                            type="button"
                            onClick={() => dateRef.current?.showPicker()}
                            className="border-ub-border text-ub-sub relative inline-flex h-[30px] items-center gap-1.5 rounded-full border px-2.5 text-[12.5px]"
                        >
                            <CalendarDays
                                className="size-3.5"
                                strokeWidth={1.6}
                            />
                            {readAt.replaceAll('-', '.')} 읽음
                            <input
                                ref={dateRef}
                                type="date"
                                value={readAt}
                                max={todayKst()}
                                onChange={(e) =>
                                    e.target.value &&
                                    changed(() => {
                                        setReadAt(e.target.value);
                                        setSeason(seasonOf(e.target.value));
                                    })
                                }
                                tabIndex={-1}
                                aria-label="읽은 날짜"
                                className="pointer-events-none absolute inset-0 opacity-0"
                            />
                        </button>

                        {SEASONS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                aria-pressed={s === season}
                                onClick={() => changed(() => setSeason(s))}
                                className={cn(
                                    'h-[30px] rounded-full border px-2.5 text-[12.5px] transition-colors',
                                    s === season
                                        ? 'border-ub-ink bg-ub-ink font-bold text-white'
                                        : 'border-ub-border text-ub-sub hover:border-ub-olive',
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={status !== 'idle' || content.trim() === ''}
                        className="bg-ub-ink inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-bold text-white transition-opacity disabled:opacity-40"
                    >
                        <Bookmark className="size-4" strokeWidth={1.8} />
                        {status === 'saving' ? '꽂는 중…' : '서가에 꽂기'}
                    </button>
                </div>

                <div aria-live="polite" className="min-h-0">
                    {error && (
                        <p className="mt-3 text-[13px] text-[#c4573d]">
                            {error}
                        </p>
                    )}
                    {status === 'saved' && (
                        <p className="text-ub-olive mt-3 text-[13px]">
                            서가에 꽂았어요.{' '}
                            <Link
                                href="/mypage/archive"
                                className="font-bold underline underline-offset-4"
                            >
                                나의 서가에서 보기 →
                            </Link>
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
