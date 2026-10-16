import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

// 스타일 가이드 Button: 모든 버튼은 알약형(rounded-full)
const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                // 올리브 채움: 주요 행동 (편지로 구독하기)
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                // 잉크 채움: 강조 행동 (봉인 풀기)
                ink: 'bg-ink text-card hover:bg-ink/85',
                // 테두리: 보조 행동 (돌아가기)
                outline:
                    'border-line bg-card text-ink hover:border-ink-2/50 aria-expanded:border-ink-2/50',
                // 연한 배경: 작은 버튼
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-line aria-expanded:bg-line',
                // 텍스트만: 고스트
                ghost: 'font-medium text-ink-2 hover:bg-muted hover:text-ink aria-expanded:bg-muted aria-expanded:text-ink',
                destructive:
                    'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
                link: 'font-medium text-primary underline-offset-4 hover:underline',
            },
            size: {
                default:
                    'h-10 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
                xs: "h-7 gap-1 px-3 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1 px-4 text-xs has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
                lg: 'h-12 gap-2 px-7 text-[15px] has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6',
                icon: 'size-10',
                'icon-xs': "size-7 [&_svg:not([class*='size-'])]:size-3",
                'icon-sm': 'size-8',
                'icon-lg': 'size-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
