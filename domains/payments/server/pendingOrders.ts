/**
 * [결제 대기 주문 임시 저장소] - 서버에서만 실행
 * 결제창을 열기 전에 서버가 계산한 "주문번호 → 결제 금액"을 기억해 둔다.
 * 결제 승인 단계(confirmTossPayment)에서 이 금액과 결제창에서 돌아온 금액을 비교한다.
 *
 * ⚠️ 서버 메모리(Map)에 저장하므로 서버를 재시작하면 모두 사라진다.
 * TODO: DB가 정해지면 주문 테이블로 교체
 */
// 이 파일을 실수로 브라우저 코드에서 import하면 빌드 에러가 나도록 막는다
import 'server-only';

// globalThis에 두는 이유: 개발 중 코드를 고치면(HMR) 모듈이 다시 실행되는데,
// 그때 Map이 새로 만들어져 저장해 둔 주문이 사라지지 않도록 하기 위해서
const globalStore = globalThis as unknown as {
    pendingOrders?: Map<string, number>;
};
// 이미 만들어 둔 Map이 있으면 재사용, 없으면 새로 만든다 (??=)
const pendingOrders = (globalStore.pendingOrders ??= new Map());

// 주문 저장 (결제 준비 API에서 호출)
export function savePendingOrder(orderId: string, amount: number) {
    pendingOrders.set(orderId, amount);
}

// 주문 금액 조회 (없으면 undefined)
export function getPendingAmount(orderId: string): number | undefined {
    return pendingOrders.get(orderId);
}

// 주문 삭제 (승인이 끝난 주문은 다시 승인되지 않도록 지운다)
export function removePendingOrder(orderId: string) {
    pendingOrders.delete(orderId);
}
