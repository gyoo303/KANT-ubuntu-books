import {
    MOCK_MYPAGE_USER,
    MOCK_SHELF_ENTRIES,
    MOCK_SHELF_NOTES,
    MOCK_UNBOXING,
} from '@/domains/shelf-notes/mocks/shelfMock';
import type {
    MypageUser,
    ShelfEntry,
    ShelfNote,
    ShelfNoteInput,
    UnboxingDetail,
} from '@/domains/shelf-notes/types/shelfNote.types';
import { connection } from 'next/server';

// 나의 서가 / 한 줄 메모 데이터 접근 함수 (서버 전용)
// 지금은 서버 메모리에 저장해서, 개발 서버를 다시 켜면 처음 4개로 돌아가요.
// DB(Prisma)가 생기면 이 파일 안쪽만 DB 조회·저장으로 바꾸면 됩니다.

// 개발 중 파일이 다시 불러와져도 저장한 메모가 남도록 globalThis 에 보관
const store = globalThis as typeof globalThis & {
    __ubShelfNotes?: ShelfNote[];
};
store.__ubShelfNotes ??= [...MOCK_SHELF_NOTES];
const notes = () => store.__ubShelfNotes!;

// TODO: 로그인 연결 후 세션의 사용자로 교체
export async function getCurrentUser(): Promise<MypageUser> {
    return MOCK_MYPAGE_USER;
}

export async function getShelfEntries(userId: string): Promise<ShelfEntry[]> {
    await connection(); // 매 요청마다 최신 메모를 읽도록 (미리 만들어 두지 않음)
    return MOCK_SHELF_ENTRIES.filter((e) => e.user_id === userId).sort((a, b) =>
        b.month.localeCompare(a.month),
    );
}

export async function getShelfEntry(
    entryId: string,
): Promise<ShelfEntry | null> {
    return MOCK_SHELF_ENTRIES.find((e) => e.id === entryId) ?? null;
}

export async function getShelfNotes(userId: string): Promise<ShelfNote[]> {
    await connection();
    return notes().filter((n) => n.user_id === userId);
}

export async function getShelfNote(
    userId: string,
    entryId: string,
): Promise<ShelfNote | null> {
    await connection();
    return (
        notes().find((n) => n.user_id === userId && n.entry_id === entryId) ??
        null
    );
}

// 책 한 권에 메모는 하나: 이미 있으면 고쳐 쓰고, 없으면 새로 만들어요.
export async function saveShelfNote(
    userId: string,
    input: ShelfNoteInput,
): Promise<{ note: ShelfNote; created: boolean }> {
    const list = notes();
    const index = list.findIndex(
        (n) => n.user_id === userId && n.entry_id === input.entry_id,
    );
    const note: ShelfNote = {
        id: index >= 0 ? list[index].id : `note-${crypto.randomUUID()}`,
        user_id: userId,
        ...input,
        created_at: new Date().toISOString(),
    };
    if (index >= 0) list[index] = note;
    else list.push(note);
    return { note, created: index < 0 };
}

export async function getUnboxing(): Promise<UnboxingDetail> {
    return MOCK_UNBOXING;
}
