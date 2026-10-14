export type PlanCode = 'MONTHLY_SINGLE_TEA' | 'MONTHLY_DOUBLE';

export interface SubscriptionPlan {
    code: PlanCode;
    name: string;
    description: string;
    price: number; // 월 결제 금액 (배송비 포함)
    book_count: number;
    goods_label: string; // 함께 받는 굿즈 (차, 다과 등)
    features: string[];
    is_popular?: boolean;
}

// 구독 진행 단계: 1 플랜 고르기 → 2 배송·결제 → 3 편지 쓰기 → 4 우체통에 넣기
export type SubscriptionStep = 1 | 2 | 3 | 4;

export interface SubscriptionFlowItem {
    period: string;
    title: string;
    description: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}
