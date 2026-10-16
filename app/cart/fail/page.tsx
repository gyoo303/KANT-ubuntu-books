/**
 * [결제 실패 페이지] 주소: /cart/fail?code=…&message=…
 * 토스 결제창에서 결제가 실패하거나 구매자가 창을 닫으면(취소) 토스가 이 주소로 보내 준다.
 * - code가 PAY_PROCESS_CANCELED → 구매자가 취소한 것 → "결제를 취소했어요"
 * - 그 외 → "결제에 실패했어요" + 이유와 에러 코드
 *
 * Suspense를 쓰는 이유는 success/page.tsx와 같다. (cacheComponents 설정)
 */
import Link from 'next/link';
import { Suspense } from 'react';

// 주소의 ?뒤 값들 (Next 16에서는 Promise로 들어온다)
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// 토스 결제창에서 실패하거나 구매자가 취소하면 돌아오는 페이지
// cacheComponents 사용 중이라 요청마다 달라지는 searchParams는 Suspense 안에서 읽는다.
export default function PaymentFailPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <div className="bg-paper text-ink">
            <div className="mx-auto max-w-[560px] px-4 py-24 text-center">
                <Suspense fallback={null}>
                    <FailReason searchParams={searchParams} />
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

// 주소에서 에러 코드와 메시지를 꺼내 실패 이유를 그린다
async function FailReason({ searchParams }: { searchParams: SearchParams }) {
    const { code, message } = await searchParams;
    const canceled = code === 'PAY_PROCESS_CANCELED'; // 구매자가 결제창을 닫음

    return (
        <>
            <h1 className="text-3xl font-medium">
                {canceled ? '결제를 취소했어요' : '결제에 실패했어요'}
            </h1>
            {/* 취소가 아닌 진짜 실패일 때만 이유와 코드를 보여준다 */}
            {!canceled && (
                <>
                    <p className="text-ink-2 mt-4">{message}</p>
                    <p className="text-muted-foreground mt-2 text-sm">{code}</p>
                </>
            )}
        </>
    );
}
