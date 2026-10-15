// 메인(홈) 화면 전용 Mock Data

export interface HomeStat {
    value: string;
    label: string;
}

export interface HomeStep {
    title: string;
    description: string;
}

export interface ThemeShelf {
    id: string;
    name: string;
    description: string;
    book_count: number;
}

export interface SeasonalBook {
    id: string;
    title: string;
    author: string;
    publisher: string;
    summary: string;
}

export const MOCK_HOME_STATS: HomeStat[] = [
    { value: '월 1회', label: '책방지기의 답장' },
    { value: '1-2권', label: '제목을 가린 책' },
    { value: '어은동', label: '로컬 차와 다과' },
];

// SLOW BY DESIGN - 느리게 도착하는 책 4단계
export const MOCK_HOME_STEPS: HomeStep[] = [
    {
        title: '편지 쓰기',
        description:
            '요즘의 마음, 계절, 피하고 싶은 이야기를 편지에 적어 우체통에 넣어요.',
    },
    {
        title: '창가에 불이 켜지면',
        description:
            '책방지기가 편지를 여는 순간, 마이페이지 속 서점 창가에 촛불이 켜져요.',
    },
    {
        title: '상자를 열기',
        description:
            '제목은 상자 속 카드의 코드로 열려요. 그 전엔 힌트 한 문장만 알려드려요.',
    },
    {
        title: '나의 서가에 꽂기',
        description:
            '읽고 난 뒤 한 줄을 남기면, 계절마다 나만의 서가가 차곡차곡 쌓여요.',
    },
];

export const MOCK_THEME_SHELVES: ThemeShelf[] = [
    {
        id: 'city-forest',
        name: '도심 속 텃밭과 숲',
        description: '베란다 화분부터 마을 텃밭까지',
        book_count: 24,
    },
    {
        id: 'healing-table',
        name: '치유의 식탁',
        description: '제철 재료와 느리게 차린 한 끼',
        book_count: 31,
    },
    {
        id: 'with-nature',
        name: '자연과 함께 머물기',
        description: '숲, 바다, 계절을 걷는 문장들',
        book_count: 28,
    },
    {
        id: 'local-solidarity',
        name: '지역과 연대',
        description: '대전과 작은 동네들의 이야기',
        book_count: 19,
    },
];

export const MOCK_SEASONAL_BOOKS: SeasonalBook[] = [
    {
        id: 'book-1',
        title: '가을 산책자의 노트',
        author: '○○○',
        publisher: '○○출판',
        summary: '걷는 속도로 읽히는 에세이.',
    },
    {
        id: 'book-2',
        title: '밤에 쓰는 시',
        author: '○○○',
        publisher: '○○출판',
        summary: '불 끄기 전 한 편씩.',
    },
    {
        id: 'book-3',
        title: '작은 부엌의 계절',
        author: '○○○',
        publisher: '○○출판',
        summary: '제철 재료로 느린 저녁.',
    },
    {
        id: 'book-4',
        title: '골목의 오래된 책방',
        author: '○○○',
        publisher: '○○출판',
        summary: '책방지기들의 이야기.',
    },
];
