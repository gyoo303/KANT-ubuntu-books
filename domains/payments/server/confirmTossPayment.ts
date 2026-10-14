/**
 * [결제 승인] - 서버에서만 실행
 * 결제창에서 인증이 끝나도 아직 돈이 나간 게 아니다.
 * 서버가 토스 "결제 승인 API"를 호출해야 결제가 최종 완료된다. (인증 후 10분 안에 호출해야 함)
 *
 * 순서
 * 1) 주문번호로 저장해 둔 금액을 찾고, 결제창에서 돌아온 금액과 같은지 확인 (금액 조작 방지)
 * 2) 시크릿 키로 토스 승인 API 호출
 * 3) 성공하면 저장해 둔 주문을 지우고 결과를 돌려준다
 *
 * 결제 성공 페이지(app/cart/success/page.tsx)에서 호출한다.
 */
// 시크릿 키를 쓰는 파일이라 브라우저 코드에서 import하면 빌드 에러가 나도록 막는다
import 'server-only';

import {
    getPendingAmount,
    removePendingOrder,
} from '@/domains/payments/server/pendingOrders';

// 승인 결과: 성공(ok: true)이면 주문 정보, 실패(ok: false)면 에러 코드와 메시지
export type ConfirmResult =
    | { ok: true; orderId: string; amount: number; method: string }
    | { ok: false; code: string; message: string };

// 토스페이먼츠 결제 승인. 시크릿 키를 쓰므로 반드시 서버에서만 호출한다.
export async function confirmTossPayment(
    paymentKey: string, // 토스가 발급한 결제 키
    orderId: string, // 우리가 만든 주문번호
    amount: number, // 결제창에서 돌아온 금액
): Promise<ConfirmResult> {
    // 1) 결제창에서 돌아온 금액이 결제 요청 전에 서버가 계산한 금액과 같은지 확인한다.
    const expected = getPendingAmount(orderId);
    if (expected === undefined) {
        // 없는 주문이거나, 이미 승인했거나, 서버 재시작으로 기록이 사라진 경우
        return {
            ok: false,
            code: 'ORDER_NOT_FOUND',
            message: '주문 정보를 찾을 수 없어요.',
        };
    }
    if (expected !== amount) {
        // 주소창의 amount를 바꾸는 등 금액이 조작된 경우 → 승인하지 않는다
        return {
            ok: false,
            code: 'AMOUNT_MISMATCH',
            message: '결제 금액이 주문 금액과 달라요.',
        };
    }

    // 시크릿 키: 절대 브라우저에 노출되면 안 되는 키 (.env.local, NEXT_PUBLIC_ 없음)
    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
        return {
            ok: false,
            code: 'MISSING_SECRET_KEY',
            message: '.env.local에 TOSS_SECRET_KEY가 없어요.',
        };
    }

    // 2) 토스 결제 승인 API 호출
    //    인증 헤더: "시크릿키:" 를 base64로 인코딩해서 Basic 인증으로 보낸다 (토스 규칙)
    const response = await fetch(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentKey, orderId, amount }),
        },
    );
    const data = await response.json();

    // 토스가 거절한 경우 (예: 결제 시간 만료, 이미 처리된 결제 등) → 토스의 에러 코드/메시지 그대로 전달
    if (!response.ok) {
        return { ok: false, code: data.code, message: data.message };
    }

    // 3) 승인 성공: 같은 주문이 다시 승인되지 않도록 저장소에서 지운다
    removePendingOrder(orderId);
    return {
        ok: true,
        orderId: data.orderId,
        amount: data.totalAmount, // 실제 결제된 금액
        method: data.method, // 결제 수단 (예: 카드, 간편결제)
    };
}
