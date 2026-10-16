export type Season = '봄' | '여름' | '가을' | '겨울';

// 서가 카드 오른쪽 위의 작은 아이콘 (책의 분위기)
export type ShelfMood = 'moon' | 'sun' | 'sprout';

// 구독으로 받은 책 (테마 서가의 상품과는 따로 관리돼요)
export interface ShelfBook {
    title: string;
    author: string;
    publisher: string;
    published_year: number;
    cover_color: string;
    cover_lines: string[]; // 표지에 줄을 나눠 쓸 제목
    cover_image_url: string | null;
}

// 나의 서가의 한 칸 = 한 달에 받은 책 한 권
export interface ShelfEntry {
    id: string; // 예: shelf-2026-10
    user_id: string;
    month: string; // YYYY-MM
    book: ShelfBook;
    teaser: string; // 카드에 보이는 한 줄 소개
    mood: ShelfMood;
    sealed: boolean; // 아직 6자리 코드로 봉인을 풀지 않은 책
    shipped_at: string; // YYYY-MM-DD
    unlocked_at: string | null; // 봉인을 푼 날 (YYYY-MM-DD)
}

// 한 줄 메모 (= 책갈피). 책 한 권(entry)에 하나씩 남겨요.
export interface ShelfNote {
    id: string;
    user_id: string;
    entry_id: string;
    content: string; // 최대 100자
    read_at: string; // 다 읽은 날 (YYYY-MM-DD)
    season: Season;
    created_at: string;
}

// POST /api/v1/shelf-notes 로 보내는 값
export interface ShelfNoteInput {
    entry_id: string;
    content: string;
    read_at: string;
    season: Season;
}

// 이달의 언박싱 화면에 필요한 내용
export interface UnboxingDetail {
    entry_id: string;
    month_label: string; // 예: 10월
    unlocked_at: string; // 2026-10-27T21:12
    book: ShelfBook;
    curator_reason: string;
    pairing: { title: string; body: string };
    letter: { from: string; title: string; body: string; sign: string };
    postcard: { lines: string[]; sign: string };
}

export interface MypageUser {
    id: string;
    name: string;
    season_count: number; // 함께한 계절(번째)
    plan: { name: string; next_billing_at: string };
}
