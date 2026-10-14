import PlanSelector from '@/domains/subscription/components/PlanSelector';
import SubscriptionFaq from '@/domains/subscription/components/SubscriptionFaq';
import SubscriptionStepper from '@/domains/subscription/components/SubscriptionStepper';
import {
    MOCK_PLANS,
    MOCK_SUBSCRIPTION_FAQ,
    MOCK_SUBSCRIPTION_FLOW,
} from '@/shared/mocks/subscription.mock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '정기구독 | 우분투북스',
};

// 09 구독 안내 · 플랜 선택
export default function SubscriptionPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
            {/* 페이지 제목 */}
            <section className="text-center">
                <p className="text-muted-foreground text-sm">정기구독</p>
                <h1 className="mt-3 text-2xl font-bold md:text-4xl">
                    한 달에 한 번, 편지와 책이 오가는 일
                </h1>
                <p className="text-muted-foreground mt-4 text-sm">
                    어떤 상자를 받아보실지 골라주세요. 언제든 쉬어가거나
                    마무리할 수 있어요.
                </p>
                <div className="mt-8">
                    <SubscriptionStepper currentStep={1} />
                </div>
            </section>

            {/* 플랜 선택 */}
            <section className="mt-12">
                <PlanSelector plans={MOCK_PLANS} />
            </section>

            {/* 한 달 흐름 */}
            <section className="mt-20 md:mt-28">
                <p className="text-muted-foreground text-xs font-semibold tracking-widest">
                    ONE MONTH
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    구독은 이렇게 흘러갑니다
                </h2>
                <ol className="border-foreground mt-8 grid grid-cols-1 gap-8 border-t-2 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                    {MOCK_SUBSCRIPTION_FLOW.map((item) => (
                        <li key={item.title}>
                            <p className="text-muted-foreground text-xs">
                                {item.period}
                            </p>
                            <h3 className="mt-2 font-bold">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* FAQ */}
            <section className="mt-20 md:mt-28">
                <p className="text-muted-foreground text-xs font-semibold tracking-widest">
                    FAQ
                </p>
                <h2 className="mt-2 mb-8 text-2xl font-bold md:text-3xl">
                    자주 묻는 이야기
                </h2>
                <SubscriptionFaq items={MOCK_SUBSCRIPTION_FAQ} />
            </section>
        </div>
    );
}
