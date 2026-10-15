/**
 * POST /api/v1/orders — 주문 생성 (회원 전용, 명세서 6.2)
 *
 * [페이지와 API의 접근 제어가 다른 이유]
 * 페이지는 proxy에서 로그인 화면으로 리다이렉트하지만,
 * API는 fetch로 호출되므로 리다이렉트 대신 401(인증 필요) 상태 코드를 돌려주고
 * 화면 쪽에서 상황에 맞게 로그인 페이지로 보낸다.
 * proxy.ts의 matcher에서 /api를 제외했으므로 API마다 이렇게 직접 확인해야 한다.
 *
 * auth()는 요청 쿠키의 JWT를 복호화해 세션을 돌려준다. 로그인하지 않았으면 null.
 */
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST() {
    const session = await auth();
    if (!session?.user?.id) {
        // 프론트는 401을 받으면 /auth/signin?callbackUrl=/cart 로 이동시킨다
        return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    // TODO(cart-merge): 로그인 시 비회원 장바구니(localStorage)를 회원 장바구니로 합치기
    // TODO: 주문서 생성 및 토스 결제 승인 로직
    //       주문자는 session.user.id(DB User.id)로 연결한다. 예: prisma.order.create({ data: { userId: session.user.id, ... } })
    return NextResponse.json({ ok: true });
}
