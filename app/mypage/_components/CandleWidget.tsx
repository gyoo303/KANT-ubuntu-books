import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import type { Candle, TimelineState } from '../_data';
import StatusBadge from './StatusBadge';
import WindowScene from './WindowScene';

const DOT_STYLE: Record<TimelineState, string> = {
    done: 'bg-[#cfc1aa]',
    current: 'bg-[#e8a93c] shadow-[0_0_0_5px_#fbebc8]',
    upcoming: 'border border-[#d0c2ab] bg-[#f6f1e7]',
};

// 발송 완료(15)에서는 현재 단계 점이 우체통과 같은 붉은색
const DOT_CURRENT_SHIPPED = 'bg-[#c2553a] shadow-[0_0_0_5px_#f5ded6]';

const LABEL_STYLE: Record<TimelineState, string> = {
    done: 'text-ink-sub',
    current: 'text-ink font-medium',
    upcoming: 'text-ink-muted',
};

interface CandleWidgetProps {
    candle: Candle;
    letter: { month: string; title: string; shipmentId: string };
}

export default function CandleWidget({ candle, letter }: CandleWidgetProps) {
    const shipped = candle.status === 'shipped';

    return (
        <section
            aria-label="창가의 촛불 위젯"
            className="mt-[39px] flex overflow-hidden rounded-[16px] border border-[#e4d9c8]"
        >
            {/* 좌: 창가 일러스트 */}
            <div className="relative w-[400px] shrink-0 bg-[#e5d9c4]">
                <WindowScene
                    status={candle.status}
                    shipmentId={letter.shipmentId}
                />
            </div>

            {/* 우: 상태 안내 */}
            <div className="flex-1 bg-[#fffcf7] px-12 pt-12 pb-[47px]">
                <div className="flex">
                    <StatusBadge status={candle.status}>
                        {candle.badge}
                    </StatusBadge>
                </div>

                <p className="mt-5 text-2xl leading-10 font-medium">
                    {candle.headline[0]}
                    <br />
                    {candle.headline[1]}
                </p>

                {/* 진행 타임라인 */}
                <ol className="relative mt-9 border-b border-[#e4d9c8]">
                    <span
                        aria-hidden
                        className="absolute top-0 bottom-0 left-[7px] w-px bg-[#cfc1aa]"
                    />
                    {candle.steps.map((step) => (
                        <li
                            key={step.label}
                            className="relative h-16 pl-8 last:h-11"
                        >
                            <span
                                aria-hidden
                                className={cn(
                                    'absolute top-1 left-0 size-4 rounded-full',
                                    shipped && step.state === 'current'
                                        ? DOT_CURRENT_SHIPPED
                                        : DOT_STYLE[step.state],
                                )}
                            />
                            <p
                                className={cn(
                                    'text-sm leading-5',
                                    LABEL_STYLE[step.state],
                                )}
                            >
                                {step.label}
                            </p>
                            {step.time && (
                                <p className="text-ink-muted mt-1 text-xs leading-[18px]">
                                    {step.time}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>

                <p className="text-ink-sub pt-[23px] text-[13px] leading-5">
                    {letter.month} 편지 · “{letter.title}”{' '}
                    <Link
                        href="/mypage/mailbox"
                        className="text-olive decoration-olive whitespace-nowrap underline underline-offset-4"
                    >
                        내 편지 다시 읽기
                    </Link>
                </p>
            </div>
        </section>
    );
}
