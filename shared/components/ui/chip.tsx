'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

/*
 * 스타일 가이드 Mood tag chip
 * 누를 때마다 선택/해제되는 알약형 버튼. 선택 상태는 pressed / defaultPressed 로 넘긴다.
 * 예) <Chip pressed={selected} onPressedChange={setSelected}>#비오는날</Chip>
 * "+ 직접 쓰기" 처럼 토글이 아닌 추가 버튼은 Button(variant="outline", size="xs")을 쓴다.
 */
const chipVariants = cva(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full border whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border-line bg-card text-ink-2 hover:border-ink-2/40 hover:text-ink data-pressed:border-ink data-pressed:bg-ink data-pressed:text-card',
    {
        variants: {
            size: {
                default: 'h-8 px-3.5 text-xs font-medium',
                sm: 'h-7 px-3 text-[11px] font-medium',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
);

function Chip({
    className,
    size = 'default',
    ...props
}: TogglePrimitive.Props & VariantProps<typeof chipVariants>) {
    return (
        <TogglePrimitive
            data-slot="chip"
            className={cn(chipVariants({ size }), className)}
            {...props}
        />
    );
}

export { Chip, chipVariants };
