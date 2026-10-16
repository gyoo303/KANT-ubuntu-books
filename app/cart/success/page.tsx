/**
 * [결제 성공 페이지] 주소: /cart/success?paymentKey=…&orderId=…&amount=…
 * 토스 결제창에서 인증이 끝나면 토스가 이 주소로 보내 준다.
 * 이 페이지는 서버에서 실행되며, 들어오자마자 결제 승인(confirmTossPayment)을 요청하고
 * 그 결과(완료/실패)를 보여준다.
 *
 * Suspense를 쓰는 이유
 * - 이 프로젝트는 next.config.ts에서 cacheComponents: true를 쓴다.
 * - 이 설정에서는 요청마다 결과가 달라지는 작업(토스 API 호출, searchParams 읽기)을
 *   <Suspense>로 감싸야 한다. 안 그러면 "Blocking Route" 에러가 난다.
 * - 감싼 덕분에 승인을 기다리는 동안 "결제를 확인하고 있어요..."가 먼저 보인다.
 *
 * 참고: 새로고침하면 이미 승인된 주문이라 ORDER_NOT_FOUND가 보인다. (결제가 두 번 되지는 않음)
 */
import { confirmTossPayment } from '@/domains/payments/server/confirmTossPayment';
import { formatPrice } from '@/shared/utils/formatPrice';
import Link from 'next/link';
import { Suspense } from 'react';

// 주소의 ?뒤 값들 (Next 16에서는 Promise로 들어온다)
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// 토스 결제창에서 인증 성공 후 돌아오는 페이지: 서버에서 바로 결제 승인을 요청한다.
// cacheComponents 사용 중이라 요청마다 달라지는 승인 결과는 Suspense 안에서 스트리밍한다.
export default function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <div className="bg-paper text-ink">
            <div className="mx-auto max-w-[560px] px-4 py-24 text-center">
                {/* 승인 결과가 나올 때까지 fallback 문구를 먼저 보여준다 */}
                <Suspense
                    fallback={
                        <p className="text-ink-2">결제를 확인하고 있어요...</p>
                    }
                >
                    <PaymentResult searchParams={searchParams} />
                </Suspense>
                <Link
                    href="/cart"
                    className="bg-olive mt-10 inline-block rounded-full px-8 py-4 font-semibold text-white"
                >
                    장바구니로 돌아가기
                </Link>
            </div>
        </div>
    );
}

// 주소에서 결제 정보를 꺼내 승인을 요청하고, 결과에 맞는 문구를 그린다
async function PaymentResult({ searchParams }: { searchParams: SearchParams }) {
    const { paymentKey, orderId, amount } = await searchParams;
    // 세 값이 모두 있어야 승인 요청, 하나라도 없으면 잘못된 접근으로 처리
    const result =
        typeof paymentKey === 'string' &&
        typeof orderId === 'string' &&
        typeof amount === 'string'
            ? await confirmTossPayment(paymentKey, orderId, Number(amount))
            : {
                  ok: false as const,
                  code: 'INVALID_REQUEST',
                  message: '결제 정보가 올바르지 않아요.',
              };

    return result.ok ? (
        // 승인 성공
        <>
            <h1 className="text-3xl font-medium">결제 완료</h1>
            <p className="text-ink-2 mt-4">
                {formatPrice(result.amount)} 결제가 완료됐어요.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
                주문번호 {result.orderId} · {result.method}
            </p>
        </>
    ) : (
        // 승인 실패: 이유(message)와 에러 코드(code)를 보여준다
        <>
            <h1 className="text-3xl font-medium">결제를 완료하지 못했어요</h1>
            <p className="text-ink-2 mt-4">{result.message}</p>
            <p className="text-muted-foreground mt-2 text-sm">{result.code}</p>
        </>
    );
}
