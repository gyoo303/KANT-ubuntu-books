import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

/*
 * 스타일 가이드 Status badge
 * 색 톤(neutral·candle·post·sage·night)만 제공한다. "어떤 상태에 어떤 톤"인지는
 * 각 기능(domains)에서 정한다. 예) UNREAD → neutral, CURATING → candle, SHIPPED → post,
 * 봉인 해제 → sage, PAUSED → night
 */
const badgeVariants = cva(
    'group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 text-[11px] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
                secondary:
                    'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
                destructive:
                    'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20',
                outline:
                    'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
                ghost: 'hover:bg-muted hover:text-muted-foreground',
                link: 'text-primary underline-offset-4 hover:underline',

                // 상태 톤
                neutral: 'bg-secondary text-ink-2',
                candle: 'bg-candle-soft text-[color-mix(in_oklab,var(--color-candle)_55%,var(--color-ink))]',
                post: 'bg-post/12 text-post',
                sage: 'bg-sage/15 text-[color-mix(in_oklab,var(--color-sage)_75%,var(--color-ink))]',
                night: 'bg-night/8 text-night',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type BadgeProps = useRender.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
        // 글자 앞에 상태 점(•)을 붙인다
        dot?: boolean;
    };

function Badge({
    className,
    variant = 'default',
    dot = false,
    render,
    children,
    ...props
}: BadgeProps) {
    return useRender({
        defaultTagName: 'span',
        props: mergeProps<'span'>(
            {
                className: cn(badgeVariants({ variant }), className),
                children: (
                    <>
                        {dot && (
                            <span
                                data-slot="badge-dot"
                                aria-hidden
                                className="size-1.5 shrink-0 rounded-full bg-current"
                            />
                        )}
                        {children}
                    </>
                ),
            },
            props,
        ),
        render,
        state: {
            slot: 'badge',
            variant,
        },
    });
}

export { Badge, badgeVariants };
