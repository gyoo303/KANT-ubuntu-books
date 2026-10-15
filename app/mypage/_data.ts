// [INT-01] 창가의 촛불 — 화면 13·14·15 목업 데이터
// 촛불 상태 조회 API 연동 전까지 이 파일의 값으로 화면을 그립니다.

// 촛불 위젯 3가지 상태: 13 편지 접수 완료 / 14 책을 고르는 중 / 15 발송 완료
export type CandleStatus = 'received' | 'reading' | 'shipped';
export type TimelineState = 'done' | 'current' | 'upcoming';
export type LetterKind = 'sent' | 'reply';
export type LetterStatus = 'received' | 'reading' | 'unsealed' | 'shipped';

export const CANDLE_STATUSES: CandleStatus[] = [
    'received',
    'reading',
    'shipped',
];

export interface Reader {
    initial: string;
    name: string;
    season: number;
}

export interface Plan {
    name: string;
    nextBilling: string;
}

export interface TimelineStep {
    label: string;
    time?: string;
    state: TimelineState;
}

export interface Candle {
    status: CandleStatus;
    badge: string;
    headline: string[];
    steps: TimelineStep[];
}

export interface MonthlyBook {
    issue: string;
    // 책이 도착하기 전 (13·14)
    title: string;
    desc: string;
    // 발송 후 봉인된 책 (15)
    hint: string[];
}

export interface RecentLetter {
    id: number;
    month: string;
    kind: LetterKind;
    title: string;
    date: string;
    status: LetterStatus;
}

export const READER: Reader = { initial: '윤', name: '윤슬', season: 6 };

export const PLAN: Plan = {
    name: '한 권과 차 한 잔',
    nextBilling: '2026.11.05',
};

export const CURRENT_LETTER = {
    month: '10월',
    title: '요즘은 비 오는 날이 좋아요',
    // 우체통 점등 애니메이션 '1회' 재생 여부를 기억할 때 쓰는 발송 단위 키
    shipmentId: '2026-10',
};

export const CANDLES: Record<CandleStatus, Candle> = {
    received: {
        status: 'received',
        badge: '편지 접수 완료',
        headline: [
            '대전 어은동 서점에 편지가 닿았습니다.',
            '책방지기가 곧 편지를 열어볼 거예요.',
        ],
        steps: [
            {
                label: '편지가 서점에 닿음',
                time: '10.03 오후 9:42',
                state: 'done',
            },
            {
                label: '책방지기가 편지를 열기를 기다리는 중',
                state: 'current',
            },
            {
                label: '서점 문을 나섬',
                state: 'upcoming',
            },
        ],
    },
    reading: {
        status: 'reading',
        badge: '책방지기가 책을 고르는 중',
        headline: [
            '오늘 밤, 책방지기가 서가를 천천히 거닐며',
            '독자님의 편지에 어울리는 책을 고르고 있습니다.',
        ],
        steps: [
            {
                label: '편지가 서점에 닿음',
                time: '10.03 오후 9:42',
                state: 'done',
            },
            {
                label: '책방지기가 편지를 열었어요',
                time: '10.12 오후 8:15',
                state: 'current',
            },
            {
                label: '서점 문을 나섬',
                state: 'upcoming',
            },
        ],
    },
    shipped: {
        status: 'shipped',
        badge: '발송 완료',
        headline: [
            '책이 서점 문을 나섰습니다.',
            '며칠 뒤 우체통을 가만히 살펴주세요.',
        ],
        steps: [
            {
                label: '편지가 서점에 닿음',
                time: '10.03 오후 9:42',
                state: 'done',
            },
            {
                label: '책방지기가 편지를 열었어요',
                time: '10.12 오후 8:15',
                state: 'done',
            },
            {
                label: '서점 문을 나섬',
                time: '10.22 오후 2:30',
                state: 'current',
            },
        ],
    },
};

export const MONTHLY_BOOK: Record<CandleStatus, MonthlyBook> = {
    received: {
        issue: '10월호 · 한 권과 차 한 잔',
        title: '편지가 열리기를 기다리고 있어요',
        desc: '상자가 서점 문을 나서면, 책 제목 대신 힌트 한 문장이 먼저 도착해요.',
        hint: [],
    },
    reading: {
        issue: '10월호 · 한 권과 차 한 잔',
        title: '책방지기가 아직 책을 고르고 있어요',
        desc: '상자가 서점 문을 나서면, 책 제목 대신 힌트 한 문장이 먼저 도착해요.',
        hint: [],
    },
    shipped: {
        issue: '10월호 · 한 권과 차 한 잔',
        title: '',
        desc: '',
        hint: [
            '비 냄새가 나는 문장들 사이에서,',
            '잠시 우산을 접어두시길 바라며.',
        ],
    },
};

// 이번 달 편지(첫 줄)의 상태는 촛불 상태를 따라갑니다
const CURRENT_LETTER_STATUS: Record<CandleStatus, LetterStatus> = {
    received: 'received',
    reading: 'reading',
    shipped: 'shipped',
};

const PAST_LETTERS: RecentLetter[] = [
    {
        id: 2,
        month: '9월',
        kind: 'reply',
        title: '잠 못 드는 밤을 위한 세 페이지',
        date: '2026.09.24',
        status: 'unsealed',
    },
    {
        id: 3,
        month: '9월',
        kind: 'sent',
        title: '요즘 잠이 오지 않아요',
        date: '2026.09.04',
        status: 'shipped',
    },
    {
        id: 4,
        month: '8월',
        kind: 'reply',
        title: '여름을 잘 보내는 법에 대하여',
        date: '2026.08.23',
        status: 'unsealed',
    },
];

export function getRecentLetters(status: CandleStatus): RecentLetter[] {
    return [
        {
            id: 1,
            month: CURRENT_LETTER.month,
            kind: 'sent',
            title: CURRENT_LETTER.title,
            date: '2026.10.03',
            status: CURRENT_LETTER_STATUS[status],
        },
        ...PAST_LETTERS,
    ];
}
