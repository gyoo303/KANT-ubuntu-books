import LetterForm from '@/domains/letters/components/LetterForm';
import SubscriptionStepper from '@/domains/subscription/components/SubscriptionStepper';
import { MOCK_MOOD_TAGS } from '@/shared/mocks/subscription.mock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '편지 쓰기 | 우분투북스',
};

// 11 편지 쓰기
export default function LetterWritePage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
            <section className="text-center">
                <h1 className="text-2xl font-bold md:text-4xl">
                    어은동 책방지기에게
                </h1>
                <p className="text-muted-foreground mt-4 text-sm">
                    요즘의 마음을 편하게 적어주세요. 잘 쓰지 않아도 괜찮아요.
                </p>
                <div className="mt-8">
                    <SubscriptionStepper currentStep={3} />
                </div>
            </section>

            <section className="mt-12">
                <LetterForm moodTags={MOCK_MOOD_TAGS} />
            </section>
        </div>
    );
}
