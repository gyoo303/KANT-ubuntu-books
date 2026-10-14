import {
    FaqItem,
    SubscriptionFlowItem,
    SubscriptionPlan,
} from '@/domains/subscription/types/subscription.types';

// 구독 플랜 Mock Data
export const MOCK_PLANS: SubscriptionPlan[] = [
    {
        code: 'MONTHLY_SINGLE_TEA',
        name: '한 권과 차 한 잔',
        description: '처음 편지를 띄우는 분께 권해요.',
        price: 24000,
        book_count: 1,
        goods_label: '차',
        features: [
            '책방지기가 고른 책 1권 (블라인드)',
            '어은동 로컬 티 1종',
            '책방지기의 답장 편지 + 손글씨 엽서',
            '나의 서가 아카이브',
        ],
        is_popular: true,
    },
    {
        code: 'MONTHLY_DOUBLE',
        name: '두 권과 다과',
        description: '서로 다른 결의 두 권을 함께 받아요.',
        price: 42000,
        book_count: 2,
        goods_label: '다과',
        features: [
            '책방지기가 고른 책 2권 (블라인드)',
            '어은동 로컬 다과 세트',
            '책방지기의 답장 편지 + 손글씨 엽서',
            '나의 서가 아카이브',
        ],
    },
];

// 한 달 구독 흐름 Mock Data
export const MOCK_SUBSCRIPTION_FLOW: SubscriptionFlowItem[] = [
    {
        period: '매월 1-10일',
        title: '편지 쓰기',
        description:
            '이번 달의 마음을 편지로 띄워요. 쓰지 않으면 지난 편지를 바탕으로 골라요.',
    },
    {
        period: '11-20일',
        title: '창가에 불이 켜져요',
        description:
            '책방지기가 편지를 열고 서가를 거니는 동안, 마이페이지 창가에 촛불이 켜져요.',
    },
    {
        period: '21-25일',
        title: '서점 문을 나서요',
        description:
            '상자가 발송되면 우체통에 불이 들어오고, 힌트 한 문장이 먼저 도착해요.',
    },
    {
        period: '도착 후',
        title: '봉인을 풀어요',
        description:
            '상자 속 카드의 6자리 코드를 입력하면 답장 전문과 책 정보가 열려요.',
    },
];

// 구독 FAQ Mock Data
export const MOCK_SUBSCRIPTION_FAQ: FaqItem[] = [
    {
        question: '이미 읽은 책이 오면 어떡하나요?',
        answer: '편지에 최근 읽은 책을 적어주시면 피해서 골라요. 그래도 겹쳤다면 서신함으로 알려주세요. 다음 상자에 다른 책을 함께 넣어드릴게요.',
    },
    {
        question: '배송 조회는 어디서 하나요?',
        answer: '마이페이지의 주문·배송 내역에서 확인할 수 있어요. 발송되면 알림도 함께 보내드려요.',
    },
    {
        question: '한 달 쉬어갈 수 있나요?',
        answer: '구독 관리에서 다음 달 결제 전까지 "쉬어가기"를 누르면 한 달 건너뛸 수 있어요.',
    },
    {
        question: '선물로 보낼 수 있나요?',
        answer: '배송지 입력 단계에서 받는 분의 주소를 적어주시면 선물로 보낼 수 있어요.',
    },
];

// 편지 쓰기 - 계절과 마음 날씨 태그
export const MOCK_MOOD_TAGS: string[] = [
    '#비오는날',
    '#조용한휴식',
    '#늦가을',
    '#설렘',
    '#위로가필요해',
    '#새로운시작',
    '#그리움',
    '#혼자있고싶은',
];
