import {
    getCurrentUser,
    getShelfEntry,
    getShelfNotes,
    saveShelfNote,
} from '@/domains/shelf-notes/api/shelfNoteApi';
import { validateShelfNoteInput } from '@/domains/shelf-notes/utils/validateShelfNote';

// [INT-04] 나의 서가 한 줄 메모 API (회원 전용)
// GET  /api/v1/shelf-notes  → 내 한 줄 메모 목록
// POST /api/v1/shelf-notes  → 한 줄 메모 저장 (같은 책이면 고쳐 쓰기)
//      body: { entry_id, content(1~100자), read_at(YYYY-MM-DD), season(봄|여름|가을|겨울) }

export async function GET() {
    // TODO: 로그인 연결 후 비로그인이면 401
    const user = await getCurrentUser();
    const notes = await getShelfNotes(user.id);
    return Response.json({ notes });
}

export async function POST(request: Request) {
    const user = await getCurrentUser();

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: 'JSON 형식으로 보내 주세요.' },
            { status: 400 },
        );
    }

    const result = validateShelfNoteInput(body);
    if (!result.ok) {
        return Response.json({ error: result.error }, { status: 400 });
    }

    const entry = await getShelfEntry(result.value.entry_id);
    if (!entry || entry.user_id !== user.id) {
        return Response.json(
            { error: '내 서가에 없는 책이에요.' },
            { status: 404 },
        );
    }

    const { note, created } = await saveShelfNote(user.id, result.value);
    return Response.json({ note }, { status: created ? 201 : 200 });
}
