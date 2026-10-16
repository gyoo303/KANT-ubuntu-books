import type {
    MypageUser,
    ShelfEntry,
    ShelfNote,
    UnboxingDetail,
} from '@/domains/shelf-notes/types/shelfNote.types';

// ─────────────────────────────────────────────
// 마이페이지(이달의 언박싱 · 나의 서가) Mock Data
// 로그인·DB가 붙으면 domains/shelf-notes/api/shelfNoteApi.ts 에서 교체
// ─────────────────────────────────────────────

// TODO: 로그인 담당 작업(NextAuth)과 연결 전까지 쓰는 가짜 로그인 사용자
export const MOCK_MYPAGE_USER: MypageUser = {
    id: 'user-yunseul',
    name: '윤슬',
    season_count: 6,
    plan: { name: '한 권과 차 한 잔', next_billing_at: '2026-11-05' },
};

const author = '○○○';
const publisher = '○○출판';

export const MOCK_SHELF_ENTRIES: ShelfEntry[] = [
    {
        id: 'shelf-2026-10',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-10',
        book: {
            title: '빗소리 산책',
            author,
            publisher,
            published_year: 2025,
            cover_color: '#557060',
            cover_lines: ['빗소리', '산책'],
            cover_image_url: null,
        },
        teaser: '비 냄새가 나는 문장들 사이에서, 잠시 우산을 접어두시길.',
        mood: 'moon',
        sealed: true,
        shipped_at: '2026-10-22',
        unlocked_at: null,
    },
    {
        id: 'shelf-2026-09',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-09',
        book: {
            title: '밤의 도서관',
            author,
            publisher,
            published_year: 2024,
            cover_color: '#3d4966',
            cover_lines: ['밤의', '도서관'],
            cover_image_url: null,
        },
        teaser: '잠 못 드는 밤에는 세 페이지만 읽어요.',
        mood: 'moon',
        sealed: false,
        shipped_at: '2026-09-17',
        unlocked_at: '2026-09-20',
    },
    {
        id: 'shelf-2026-08',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-08',
        book: {
            title: '여름 끝의 시',
            author,
            publisher,
            published_year: 2023,
            cover_color: '#a87a4c',
            cover_lines: ['여름 끝의', '시'],
            cover_image_url: null,
        },
        teaser: '계절을 보내는 데에도 연습이 필요하니까요.',
        mood: 'sun',
        sealed: false,
        shipped_at: '2026-08-20',
        unlocked_at: '2026-08-23',
    },
    {
        id: 'shelf-2026-07',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-07',
        book: {
            title: '느린 부엌',
            author,
            publisher,
            published_year: 2024,
            cover_color: '#8a4a2c',
            cover_lines: ['느린', '부엌'],
            cover_image_url: null,
        },
        teaser: '첫 편지에 대한 답장으로, 저녁을 천천히.',
        mood: 'sun',
        sealed: false,
        shipped_at: '2026-07-16',
        unlocked_at: '2026-07-19',
    },
    {
        id: 'shelf-2026-06',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-06',
        book: {
            title: '초여름 편지',
            author,
            publisher,
            published_year: 2022,
            cover_color: '#6b6284',
            cover_lines: ['초여름', '편지'],
            cover_image_url: null,
        },
        teaser: '답장을 기다리는 마음에 대한 책이에요.',
        mood: 'sprout',
        sealed: false,
        shipped_at: '2026-06-18',
        unlocked_at: '2026-06-21',
    },
    {
        id: 'shelf-2026-05',
        user_id: MOCK_MYPAGE_USER.id,
        month: '2026-05',
        book: {
            title: '골목 정원',
            author,
            publisher,
            published_year: 2023,
            cover_color: '#4b5a50',
            cover_lines: ['골목', '정원'],
            cover_image_url: null,
        },
        teaser: '처음 오신 분께 드리는 작은 정원.',
        mood: 'sprout',
        sealed: false,
        shipped_at: '2026-05-20',
        unlocked_at: '2026-05-23',
    },
];

// 처음부터 남겨져 있던 한 줄 메모 4개 (나의 서가 시안 기준)
export const MOCK_SHELF_NOTES: ShelfNote[] = [
    {
        id: 'note-2026-09',
        user_id: MOCK_MYPAGE_USER.id,
        entry_id: 'shelf-2026-09',
        content: '“불을 끄면 문장이 커진다.”',
        read_at: '2026-09-30',
        season: '가을',
        created_at: '2026-09-30T22:10:00+09:00',
    },
    {
        id: 'note-2026-07',
        user_id: MOCK_MYPAGE_USER.id,
        entry_id: 'shelf-2026-07',
        content: '첫 상자를 열던 날의 설렘.',
        read_at: '2026-07-28',
        season: '여름',
        created_at: '2026-07-28T21:00:00+09:00',
    },
    {
        id: 'note-2026-06',
        user_id: MOCK_MYPAGE_USER.id,
        entry_id: 'shelf-2026-06',
        content: '기다리는 것도 읽는 일.',
        read_at: '2026-06-29',
        season: '여름',
        created_at: '2026-06-29T20:30:00+09:00',
    },
    {
        id: 'note-2026-05',
        user_id: MOCK_MYPAGE_USER.id,
        entry_id: 'shelf-2026-05',
        content: '어은동을 걸어보고 싶어졌다.',
        read_at: '2026-05-30',
        season: '봄',
        created_at: '2026-05-30T19:40:00+09:00',
    },
];

// 이달의 언박싱 (10월 상자)
export const MOCK_UNBOXING: UnboxingDetail = {
    entry_id: 'shelf-2026-10',
    month_label: '10월',
    unlocked_at: '2026-10-27T21:12:00+09:00',
    book: MOCK_SHELF_ENTRIES[0].book,
    curator_reason:
        '비 오는 날이 좋다는 문장에서 이 책이 먼저 떠올랐어요. 짧은 글들이라 버스 몇 정거장 사이에 한 편씩 읽기 좋고, 서두르지 않는 문장이 지친 마음을 가만히 쉬게 해줄 거예요.',
    pairing: {
        title: '어은동 보리차와 유자 양갱',
        body: '어은동 골목 찻집에서 볶은 보리차예요. 뜨거운 물에 3분 우린 뒤, 첫 장을 펼쳐보세요.',
    },
    letter: {
        from: '어은동 책방지기',
        title: '비 오는 날을 좋아하는 윤슬 님께',
        body: "보내주신 편지를 비 오는 저녁에 읽었어요. 창밖에서 빗소리가 들려서인지, 윤슬 님이 말한 '마음이 놓이는 느낌'을 조금 알 것 같았습니다. 요즘 많이 지치셨다고 했지요. 그래서 이번에는 크게 애쓰지 않아도 읽히는 책을 골랐어요. 한 편이 두세 쪽이라, 정류장 몇 개 사이에 하나씩 꺼내 읽기 좋을 거예요. 이별과 투병 이야기는 넣지 않았어요. 다음 달에도 편지 기다리고 있을게요.",
        sign: '10월, 어은동 서가에서',
    },
    postcard: {
        lines: ['윤슬 님,', '우산은 잠시 접어두고', '천천히 걸어요.'],
        sign: '책방지기',
    },
};
