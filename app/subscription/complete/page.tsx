import SubmittedLetterSummary from '@/domains/letters/components/SubmittedLetterSummary';
import SubscriptionStepper from '@/domains/subscription/components/SubscriptionStepper';
import { buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { FiMail } from 'react-icons/fi';

export const metadata: Metadata = {
    title: '편지 전송 완료 | 우분투북스',
};

// 12 편지 전송 완료
export default function LetterCompletePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6 md:py-20">
            <SubscriptionStepper currentStep={4} />

            {/* 우체통 일러스트 자리 (디자인 확정 후 이미지로 교체) */}
            <div
                aria-hidden
                className="bg-muted mx-auto mt-12 flex size-40 items-center justify-center rounded-t-full md:mt-16 md:size-48"
            >
                <FiMail className="text-muted-foreground size-12" />
            </div>

            <h1 className="mt-10 text-2xl font-bold md:text-4xl">
                편지가 우체통에 들어갔어요
            </h1>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
                대전 어은동 서점에 편지가 닿았습니다.
                <br />
                책방지기가 편지를 열면 마이페이지 창가에 촛불이 켜질 거예요.
            </p>

            {/* searchParams를 읽는 부분은 Suspense로 감싸야 함 (cacheComponents) */}
            <div className="mt-8">
                <Suspense fallback={null}>
                    <SubmittedLetterSummary searchParams={searchParams} />
                </Suspense>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                {/* TODO: 마이페이지(13, 16번)가 생기면 경로 확인 */}
                <Link
                    href="/mypage"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        'h-12 rounded-full px-7 text-base',
                    )}
                >
                    나의 창가 보러 가기
                </Link>
                <Link
                    href="/mypage/mailbox"
                    className={cn(
                        buttonVariants({ variant: 'outline', size: 'lg' }),
                        'h-12 rounded-full px-7 text-base',
                    )}
                >
                    보낸 편지 다시 읽기
                </Link>
            </div>
        </div>
    );
}
