import {
    getCurrentUser,
    getShelfEntries,
    getShelfNotes,
} from '@/domains/shelf-notes/api/shelfNoteApi';
import ArchiveView from '@/domains/shelf-notes/components/ArchiveView';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: '나의 서가 | 우분투북스',
};

// [INT-04] 나의 서가 아카이브 (개인 한 줄 소감)
export default function ArchivePage() {
    return (
        <>
            <h1 className="font-serif text-[30px] md:text-[34px]">
                나의 서가
            </h1>
            {/* 저장한 메모가 매번 반영되도록 요청 시점에 읽어요 */}
            <Suspense fallback={<ArchiveSkeleton />}>
                <ArchiveContent />
            </Suspense>
        </>
    );
}

async function ArchiveContent() {
    const user = await getCurrentUser();
    const [entries, notes] = await Promise.all([
        getShelfEntries(user.id),
        getShelfNotes(user.id),
    ]);
    // 받은 책이 있는 연도 + 구독을 시작하기 전 해(시안: 2026, 2025)
    const latest = Number(entries[0]?.month.slice(0, 4) ?? 2026);
    const years = [latest, latest - 1];

    return <ArchiveView entries={entries} notes={notes} years={years} />;
}

function ArchiveSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse">
            <div className="bg-paper-2 mt-4 h-5 w-2/3 rounded" />
            <div className="mt-9 grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="bg-paper-2 h-[108px] rounded-xl" />
                ))}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="bg-paper-2 h-[530px] rounded-2xl" />
                ))}
            </div>
        </div>
    );
}
