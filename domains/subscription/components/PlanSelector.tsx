'use client';

import {
    PlanCode,
    SubscriptionPlan,
} from '@/domains/subscription/types/subscription.types';
import { buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/formatPrice';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

interface PlanSelectorProps {
    plans: SubscriptionPlan[];
}

// 플랜 카드 선택 + 선택한 상자 요약 바
export default function PlanSelector({ plans }: PlanSelectorProps) {
    const [selectedCode, setSelectedCode] = useState<PlanCode>(plans[0].code);
    const selectedPlan =
        plans.find((plan) => plan.code === selectedCode) ?? plans[0];

    return (
        <div className="space-y-6">
            <div
                role="radiogroup"
                aria-label="구독 플랜"
                className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
            >
                {plans.map((plan) => {
                    const isSelected = plan.code === selectedCode;

                    return (
                        <button
                            key={plan.code}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={plan.name}
                            onClick={() => setSelectedCode(plan.code)}
                            className={cn(
                                'bg-card relative rounded-2xl border p-6 text-left transition-colors md:p-8',
                                isSelected
                                    ? 'border-primary ring-primary ring-1'
                                    : 'border-border hover:border-muted-foreground',
                            )}
                        >
                            {plan.is_popular && (
                                <span className="border-border bg-background absolute -top-3 left-6 rounded-full border px-3 py-0.5 text-xs font-medium">
                                    가장 많이 받아보는 상자
                                </span>
                            )}

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-muted-foreground text-xs tracking-wider">
                                        {plan.code}
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold md:text-2xl">
                                        {plan.name}
                                    </h3>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {plan.description}
                                    </p>
                                </div>
                                {/* 라디오 표시 */}
                                <span
                                    aria-hidden
                                    className={cn(
                                        'mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border',
                                        isSelected
                                            ? 'border-primary'
                                            : 'border-border',
                                    )}
                                >
                                    {isSelected && (
                                        <span className="bg-primary size-2.5 rounded-full" />
                                    )}
                                </span>
                            </div>

                            {/* 책 표지 + 굿즈 자리 (디자인 확정 후 이미지로 교체) */}
                            <div className="mt-6 flex items-end gap-2">
                                {Array.from({ length: plan.book_count }).map(
                                    (_, i) => (
                                        <div
                                            key={i}
                                            className="bg-muted h-20 w-14 rounded-sm"
                                        />
                                    ),
                                )}
                                <div className="border-border bg-muted/50 text-muted-foreground flex h-14 w-12 items-center justify-center rounded-md border text-[10px]">
                                    {plan.goods_label}
                                </div>
                            </div>

                            <p className="mt-6">
                                <span className="text-3xl font-bold">
                                    {formatPrice(plan.price)}
                                </span>
                                <span className="text-muted-foreground ml-2 text-sm">
                                    / 월 · 배송비 포함
                                </span>
                            </p>

                            <ul className="border-border mt-6 space-y-2 border-t pt-6 text-sm">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >
                                        <FiCheck className="text-muted-foreground size-4 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    );
                })}
            </div>

            {/* 선택한 상자 요약 바 */}
            <div className="bg-foreground text-background flex flex-col gap-4 rounded-2xl px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-xs opacity-70">선택한 상자</span>
                    <strong className="text-lg">{selectedPlan.name}</strong>
                    <span className="text-xs opacity-70">
                        매월 5일 결제 · 첫 상자 이번 달 말 발송
                    </span>
                </div>
                {/* TODO: 10번(배송·결제) 페이지가 생기면 /subscription/checkout 으로 변경 */}
                <Link
                    href="/subscription/letter"
                    className={cn(
                        buttonVariants({ variant: 'secondary', size: 'lg' }),
                        'h-11 rounded-full px-6',
                    )}
                >
                    배송지 입력하기
                    <FiArrowRight />
                </Link>
            </div>
        </div>
    );
}
