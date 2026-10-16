// 스타일 가이드(/styleguide) 페이지 데이터
// 색값은 app/globals.css 의 @theme 와 같아야 합니다. 색을 바꾸면 두 곳을 함께 고쳐 주세요.

export interface ColorToken {
    name: string;
    // Tailwind 클래스에 쓰는 이름 (bg-paper, text-ink-2 …)
    token: string;
    hex: string;
}

export const COLOR_ROWS: ColorToken[][] = [
    [
        { name: 'Paper', token: 'paper', hex: '#F7F2E8' },
        { name: 'Paper 2', token: 'paper-2', hex: '#EFE6D6' },
        { name: 'Card', token: 'card', hex: '#FFFCF7' },
        { name: 'Letter', token: 'letter', hex: '#FCF5EA' },
        { name: 'Line', token: 'line', hex: '#E4DAC9' },
        { name: 'Ink', token: 'ink', hex: '#2A241F' },
        { name: 'Ink 2', token: 'ink-2', hex: '#5D5349' },
        { name: 'Muted', token: 'muted-foreground', hex: '#958A7E' },
    ],
    [
        { name: 'Olive (Accent)', token: 'olive', hex: '#656839' },
        { name: 'Olive soft', token: 'olive-soft', hex: '#E9EAD6' },
        { name: 'Candle', token: 'candle', hex: '#E8AA3B' },
        { name: 'Candle soft', token: 'candle-soft', hex: '#FCEBC8' },
        { name: 'Post', token: 'post', hex: '#C2543A' },
        { name: 'Sage', token: 'sage', hex: '#6E8068' },
        { name: 'Night', token: 'night', hex: '#2F2B35' },
        { name: 'Clay', token: 'clay', hex: '#9A5B3C' },
    ],
];

export interface TypeSpec {
    label: string;
    spec: string;
    // globals.css 의 typo-* 유틸리티
    className: string;
    sample: string;
}

export const TYPE_SCALE: TypeSpec[] = [
    {
        label: 'Display',
        spec: 'RIDIBatang · 55/1.3',
        className: 'typo-display',
        sample: '편지를 보내주세요',
    },
    {
        label: 'H1',
        spec: 'RIDIBatang · 42',
        className: 'typo-h1',
        sample: '한 달에 한 번',
    },
    {
        label: 'H2',
        spec: 'RIDIBatang · 32–36',
        className: 'typo-h2',
        sample: '느리게 도착하는 책',
    },
    {
        label: 'H3',
        spec: 'RIDIBatang · 20–22',
        className: 'typo-h3',
        sample: '이달의 책',
    },
    {
        label: 'Letter body',
        spec: 'RIDIBatang · 17/40 (줄노트)',
        className: 'typo-letter',
        sample: '보내주신 편지를 비 오는 저녁에 읽었어요.',
    },
    {
        label: 'Body',
        spec: 'Noto Sans KR 400 · 15/1.7',
        className: 'typo-body',
        sample: '상자 속 카드의 6자리 코드를 입력하면 답장 전문과 책 정보가 열려요.',
    },
    {
        label: 'Caption',
        spec: 'Noto Sans KR 400 · 13 / 12',
        className: 'typo-caption',
        sample: '다음 결제 2026.11.05',
    },
    {
        label: 'Eyebrow',
        spec: 'Noto Sans KR 500 · 13 · +0.1em',
        className: 'typo-eyebrow',
        sample: 'Slow by design',
    },
    {
        label: 'Handwriting',
        spec: 'Nanum Pen Script · 25',
        className: 'typo-hand',
        sample: '우산은 잠시 접어두고 천천히 걸어요.',
    },
];

export interface StatusSample {
    variant: 'neutral' | 'candle' | 'post' | 'sage' | 'night';
    label: string;
}

// LetterDeskStatus 예시 — 실제 상태값과 톤 연결은 각 기능(domains)에서 정합니다.
export const STATUS_SAMPLES: StatusSample[] = [
    { variant: 'neutral', label: 'UNREAD · 편지 접수 완료' },
    { variant: 'candle', label: 'CURATING · 책을 고르는 중' },
    { variant: 'post', label: 'SHIPPED · 발송 완료' },
    { variant: 'sage', label: '봉인 해제 · 구독 중' },
    { variant: 'night', label: 'PAUSED · 쉬어가는 중' },
];

export interface Breakpoint {
    title: string;
    lines: string[];
    // 아직 구현하지 않은 기준
    todo?: boolean;
}

export const BREAKPOINTS: Breakpoint[] = [
    {
        title: 'Mobile · 360–767px (기본)',
        todo: true,
        lines: [
            '1열 스택 · 좌우 여백 20px',
            '상단: 로고 + 장바구니 + 햄버거',
            '하단 플로팅 탭바 (홈 · 서가 · 구독 · 장바구니 · 마이)',
            '마이페이지 메뉴는 가로 탭',
        ],
    },
    {
        title: 'Tablet · md 768–1023px',
        todo: true,
        lines: [
            '도서 목록 2열 그리드',
            '상단 메뉴 노출, 탭바 숨김',
            '마이페이지 메뉴는 가로 탭',
            '장바구니 · 주문 요약 아래로',
        ],
    },
    {
        title: 'Desktop · lg 1024px 이상',
        lines: [
            '최대 너비 1120px 중앙 정렬 (max-w-page)',
            '도서 목록 3열 · 마이페이지 좌측 메뉴',
            '호버 효과 · 관리자 화면은 PC 전용',
        ],
    },
];
