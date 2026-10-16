import BookCover from '@/domains/products/components/BookCover';
import {
    getCurrentUser,
    getShelfNote,
    getUnboxing,
} from '@/domains/shelf-notes/api/shelfNoteApi';
import BookmarkForm from '@/domains/shelf-notes/components/BookmarkForm';
import UnboxingLetter from '@/domains/shelf-notes/components/UnboxingLetter';
import UnboxingPostcard from '@/domains/shelf-notes/components/UnboxingPostcard';
import { Leaf, LockOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: '이달의 언박싱 | 우분투북스',
};

// 2026-10-27T21:12:00+09:00 → 2026.10.27 오후 9:12
function formatUnlockedAt(iso: string) {
    const [date, time] = iso.split('T');
    const [h, m] = time.split(':').map(Number);
    const ampm = h < 12 ? '오전' : '오후';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${date.replaceAll('-', '.')} ${ampm} ${hour12}:${String(m).padStart(2, '0')}`;
}

// [INT-03] 이달의 언박싱 — 봉인을 푼 뒤 보이는 책·편지·엽서, 그리고 책갈피(한 줄 메모)
export default async function UnboxingPage() {
    const unboxing = await getUnboxing();
    const { book } = unboxing;

    return (
        <>
            <h1 className="font-ub-serif text-[30px] md:text-[34px]">
                {unboxing.month_label}의 답장
            </h1>
            <p className="text-ub-sub mt-3 text-[15px]">
                상자를 열어주셔서 고마워요. 이제 모든 이야기를 들려드릴게요.
            </p>

            <p className="text-ub-sub mt-10 flex h-[55px] items-center gap-3 rounded-[10px] bg-[#e1e7dd] px-8 text-[14px]">
                <LockOpen className="size-[18px]" strokeWidth={1.6} />
                봉인이 풀렸어요 · {formatUnlockedAt(unboxing.unlocked_at)}
            </p>

            <div className="mt-9 grid gap-10 lg:grid-cols-[260px_1fr]">
                {/* 왼쪽: 책 */}
                <div>
                    <BookCover
                        product={book}
                        size="lg"
                        className="mx-auto w-full max-w-[260px]"
                    />
                    <h2 className="font-ub-serif mt-8 text-[26px]">
                        {book.title}
                    </h2>
                    <p className="text-ub-muted mt-1.5 text-[14px]">
                        {book.author} 지음 · {book.publisher} ·{' '}
                        {book.published_year}
                    </p>
                    <div className="border-ub-line my-6 border-t" />
                    <p className="text-ub-olive text-[13px] font-bold">
                        책방지기가 고른 이유
                    </p>
                    <p className="text-ub-sub mt-3 text-[14px] leading-[26px]">
                        {unboxing.curator_reason}
                    </p>
                    <div className="mt-9 rounded-2xl bg-[#e1e7dd] px-[22px] py-6">
                        <p className="font-ub-serif flex items-center gap-1.5 text-[16px]">
                            <Leaf className="size-4" strokeWidth={1.6} />
                            {unboxing.pairing.title}
                        </p>
                        <p className="text-ub-sub mt-2.5 text-[13.5px] leading-[24px]">
                            {unboxing.pairing.body}
                        </p>
                    </div>
                </div>

                {/* 오른쪽: 편지 · 엽서 · 책갈피 */}
                <div className="min-w-0">
                    <UnboxingLetter letter={unboxing.letter} />
                    <div className="mt-8">
                        <UnboxingPostcard postcard={unboxing.postcard} />
                    </div>
                    {/* 이미 남긴 메모가 있는지는 요청 시점에 읽어요 */}
                    <Suspense
                        fallback={
                            <div className="bg-ub-card mt-8 h-[257px] animate-pulse rounded-[20px]" />
                        }
                    >
                        <BookmarkSection entryId={unboxing.entry_id} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

async function BookmarkSection({ entryId }: { entryId: string }) {
    const user = await getCurrentUser();
    const savedNote = await getShelfNote(user.id, entryId);
    return <BookmarkForm entryId={entryId} savedNote={savedNote} />;
}
