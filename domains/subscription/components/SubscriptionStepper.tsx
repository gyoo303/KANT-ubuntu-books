import { SubscriptionStep } from '@/domains/subscription/types/subscription.types';
import { cn } from '@/shared/utils/cn';
import { Fragment } from 'react';
import { FiCheck } from 'react-icons/fi';

const STEPS: { step: SubscriptionStep; label: string }[] = [
    { step: 1, label: '플랜 고르기' },
    { step: 2, label: '배송·결제' },
    { step: 3, label: '편지 쓰기' },
    { step: 4, label: '우체통에 넣기' },
];

interface SubscriptionStepperProps {
    currentStep: SubscriptionStep;
}

// 구독 진행 단계 표시 (09 구독 안내, 11 편지 쓰기, 12 전송 완료에서 공통 사용)
export default function SubscriptionStepper({
    currentStep,
}: SubscriptionStepperProps) {
    return (
        <ol className="flex items-center justify-center gap-2 md:gap-3">
            {STEPS.map(({ step, label }, index) => {
                const isDone = step < currentStep;
                const isCurrent = step === currentStep;

                return (
                    <Fragment key={step}>
                        {index > 0 && (
                            <li
                                aria-hidden
                                className="bg-border hidden h-px w-8 md:block lg:w-12"
                            />
                        )}
                        <li
                            aria-current={isCurrent ? 'step' : undefined}
                            className="flex items-center gap-1.5 md:gap-2"
                        >
                            <span
                                className={cn(
                                    'flex size-6 shrink-0 items-center justify-center rounded-full border text-xs',
                                    isCurrent &&
                                        'border-primary bg-primary text-primary-foreground font-bold',
                                    isDone &&
                                        'bg-muted text-foreground border-transparent',
                                    !isCurrent &&
                                        !isDone &&
                                        'border-border text-muted-foreground',
                                )}
                            >
                                {isDone ? <FiCheck className="size-3" /> : step}
                            </span>
                            <span
                                className={cn(
                                    'text-xs md:text-sm',
                                    isCurrent
                                        ? 'text-foreground font-bold'
                                        : 'text-muted-foreground hidden sm:inline',
                                )}
                            >
                                {label}
                            </span>
                        </li>
                    </Fragment>
                );
            })}
        </ol>
    );
}
