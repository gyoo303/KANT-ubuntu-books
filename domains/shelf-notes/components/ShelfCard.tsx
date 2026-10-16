import BookCover from '@/domains/products/components/BookCover';
import AddShelfNote from '@/domains/shelf-notes/components/AddShelfNote';
import type {
    ShelfEntry,
    ShelfMood,
    ShelfNote,
} from '@/domains/shelf-notes/types/shelfNote.types';
import {
    toMonthDay,
    toMonthLabel,
} from '@/domains/shelf-notes/utils/formatShelfDate';
import { Bookmark, Ellipsis, Moon, Sprout, Sun } from 'lucide-react';
import Link from 'next/link';

const MOOD_ICON: Record<ShelfMood, typeof Moon> = {
    moon: Moon,
    sun: Sun,
    sprout: Sprout,
};

interface ShelfCardProps {
    entry: ShelfEntry;
    note: ShelfNote | null;
}

// 나의 서가의 한 칸: 봉인 중 / 메모 있음 / 메모 없음(+ 한 줄 남기기)
export default function ShelfCard({ entry, note }: ShelfCardProps) {
    const sealed = entry.sealed && !note; // 메모가 생겼다면 이미 열어 본 책
    const MoodIcon = MOOD_ICON[entry.mood];

    return (
        <article className="border-ub-line flex flex-col rounded-2xl border bg-[#fdfaf4] p-5">
            {/* 월 + 상태 */}
            <div className="flex h-[26px] items-center justify-between">
                <span className="text-[14px] font-bold">
                    {toMonthLabel(entry.month)}
                </span>
                {sealed ? (
                    <span className="flex h-[26px] items-center gap-1.5 rounded-full bg-[#f2ded6] px-2.5 text-[12px] text-[#9c3f27]">
                        <span className="size-1.5 rounded-full bg-[#c2553a]" />
                        봉인 중
                    </span>
                ) : (
                    <MoodIcon
                        className="text-ub-muted size-3.5"
                        strokeWidth={1.6}
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* 표지 */}
            <div className="bg-ub-card relative mt-4 grid aspect-[217/230] justify-items-center overflow-hidden rounded-xl pt-4">
                {sealed ? (
                    <>
                        <div className="aspect-[2/3] w-[63%] rounded-[2px_8px_8px_2px] bg-[#536456] shadow-[inset_-34px_0_30px_-14px_rgba(184,174,152,0.95),inset_0_-34px_30px_-14px_rgba(184,174,152,0.95)]" />
                        <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-[#d27e64] bg-[#c2553a] text-[20px] text-white shadow-[0_6px_16px_rgba(80,30,20,0.28)]">
                            우
                        </span>
                    </>
                ) : (
                    <BookCover product={entry.book} className="w-[63%]" />
                )}
            </div>

            {/* 책 정보 */}
            {sealed ? (
                <>
                    <h3 className="mt-5 text-[18px] font-bold">
                        아직 열지 않은 책
                    </h3>
                    <p className="text-ub-muted mt-1 text-[12.5px]">
                        상자가 도착하면 코드를 입력해 주세요
                    </p>
                </>
            ) : (
                <>
                    <h3 className="mt-5 text-[18px] font-bold">
                        {entry.book.title}
                    </h3>
                    <p className="text-ub-muted mt-1 text-[12.5px]">
                        {entry.book.author} · {entry.book.publisher}
                    </p>
                </>
            )}
            <p className="border-ub-border text-ub-sub font-ub-serif mt-4 border-l-2 pl-3.5 text-[14px] leading-[24px]">
                {sealed ? `“${entry.teaser}”` : entry.teaser}
            </p>

            {/* 한 줄 메모 */}
            {!sealed && (
                <div className="mt-4">
                    {note ? (
                        <p className="font-ub-serif flex gap-2.5 rounded-[10px] bg-[#f4ddd6] px-4 py-3 text-[15px] leading-[24px] text-[#7a3a2c]">
                            <Bookmark
                                className="mt-1 size-[15px] shrink-0"
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                            {note.content}
                        </p>
                    ) : (
                        <AddShelfNote entryId={entry.id} />
                    )}
                </div>
            )}

            {/* 아래 줄 */}
            <div className="text-ub-muted mt-auto flex items-center justify-between pt-6 text-[12.5px]">
                {sealed ? (
                    <>
                        <span>{toMonthDay(entry.shipped_at)} 발송</span>
                        {/* 6자리 코드 입력은 블라인드 북(INT-03) 작업 */}
                        <Link
                            href="/mypage/unboxing"
                            className="text-ub-ink text-[13px] underline underline-offset-4"
                        >
                            봉인 풀기
                        </Link>
                    </>
                ) : (
                    <>
                        <span>
                            {note
                                ? `${toMonthDay(note.read_at)} 읽음 · ${note.season}`
                                : `${toMonthDay(entry.unlocked_at ?? entry.shipped_at)} 해제`}
                        </span>
                        {/* TODO: 메모 고치기·지우기 메뉴 */}
                        <button
                            type="button"
                            aria-label={`${entry.book.title} 더보기`}
                            className="hover:text-ub-ink"
                        >
                            <Ellipsis className="size-4" />
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
