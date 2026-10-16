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
    //
    // TODO: 주문서 생성 및 토스 결제 승인 로직
    //   ※ 현재 장바구니 결제는 POST /api/payments/ready(결제 준비)가 이 역할을 대신하고 있다.
    //     엔드포인트를 이쪽으로 합칠지 장바구니 담당과 정한다.
    //   1) 요청 본문의 배송지를 검증한다. 휴대폰 번호는 가입 때 받지 않고 주문/구독 결제 화면에서 받는다.
    //      shippingAddress = { receiverName, receiverPhone, zipCode, address1, address2 }
    //      → validateShippingAddress()(domains/checkout/utils)와 같은 규칙으로 receiverPhone 형식을 확인하고, 틀리면 400
    //   2) 주문자는 session.user.id로 연결한다. (지금은 "naver:<네이버 사용자 고유번호>", TODO(db): DB User.id)
    //      TODO(db): prisma.order.create({ data: { userId: session.user.id, shippingAddress, ... } })
    //   3) receiverPhone은 주문마다 저장한다. 받는 분이 본인이 아닐 수 있어서 User.phone과 분리한다.
    //      요청에 saveAsMyPhone: true가 있으면 User.phone도 갱신한다. (다음 결제 때 연락처 칸을 미리 채우는 용도)
    //      TODO(db): 지금은 결제 화면에서 LocalStorage에 임시 저장한다 (domains/checkout/storage/checkoutStorage.ts)
    return NextResponse.json({ ok: true });
}
