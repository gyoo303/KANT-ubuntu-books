'use client';

import ShelfCard from '@/domains/shelf-notes/components/ShelfCard';
import type {
    ShelfEntry,
    ShelfNote,
} from '@/domains/shelf-notes/types/shelfNote.types';
import { cn } from '@/shared/utils/cn';
import { Lock } from 'lucide-react';
import { useState } from 'react';

interface ArchiveViewProps {
    entries: ShelfEntry[]; // 최신 달이 먼저
    notes: ShelfNote[];
    years: number[]; // 탭에 보여줄 연도 (예: [2026, 2025])
}

// 나의 서가: 연도 탭 · 통계 · 월별 카드
export default function ArchiveView({
    entries,
    notes,
    years,
}: ArchiveViewProps) {
    const [year, setYear] = useState(years[0]);

    const yearEntries = entries.filter((e) => e.month.startsWith(`${year}-`));
    const noteOf = (entryId: string) =>
        notes.find((n) => n.entry_id === entryId) ?? null;
    const noteCount = yearEntries.filter((e) => noteOf(e.id)).length;

    const stats = [
        { label: '함께한 계절', value: `${yearEntries.length}개월` },
        { label: '받은 책', value: `${yearEntries.length}권` },
        { label: '남긴 한 줄', value: `${noteCount}개` },
    ];

    return (
        <>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-ink-2 text-[15px]">
                    받은 책과 책방지기의 쪽지, 내가 남긴 한 줄이 계절마다
                    쌓여요.
                </p>
                <div className="flex gap-2" role="tablist" aria-label="연도">
                    {years.map((y) => (
                        <button
                            key={y}
                            type="button"
                            role="tab"
                            aria-selected={y === year}
                            onClick={() => setYear(y)}
                            className={cn(
                                'h-[30px] rounded-full border px-3.5 text-[12.5px] transition-colors',
                                y === year
                                    ? 'border-ink bg-ink font-bold text-white'
                                    : 'border-line text-ink-2 hover:border-olive',
                            )}
                        >
                            {y}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="bg-paper-2 rounded-xl px-4 py-5 md:px-6 md:py-[26px]"
                    >
                        <p className="text-ink-2 text-[13px]">{s.label}</p>
                        <p className="mt-2 text-[22px] md:text-[28px]">
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {yearEntries.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {yearEntries.map((entry) => (
                        <ShelfCard
                            key={entry.id}
                            entry={entry}
                            note={noteOf(entry.id)}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-ink-2 border-line mt-10 rounded-2xl border border-dashed py-20 text-center text-[14px]">
                    {year}년에 받은 책이 아직 없어요.
                </p>
            )}

            <p className="text-muted-foreground mt-9 flex items-center gap-2 text-[13px]">
                <Lock className="size-3.5" strokeWidth={1.6} />
                나의 서가는 나만 볼 수 있는 기록이에요.
            </p>
        </>
    );
}
