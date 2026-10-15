import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// API는 proxy matcher에서 빠져 있으므로 여기서 직접 막는다.
// 프론트는 401을 받으면 /auth/signin?callbackUrl=/cart 로 이동시킨다.
export async function POST() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    // TODO(cart-merge): 로그인 시 비회원 장바구니(localStorage)를 회원 장바구니로 합치기
    // TODO: 주문서 생성 및 토스 결제 승인 로직
    return NextResponse.json({ ok: true });
}
