'use client';

/**
 * [장바구니 화면] (시안 05, 06)
 * 왼쪽: 상품 목록(체크, 수량 −/+, 삭제, 전체 선택, 선택 삭제)
 * 오른쪽: 주문 금액 카드
 *
 * 버튼 흐름
 * - "구매 계속하기" → 비회원이면 /login 으로 이동, 회원이면 배송지/결제 수단을 펼친다.
 * - "N원 결제하기" → 토스 결제창을 연다. (결제 동의 체크해야 활성화)
 *
 * 'use client'(맨 위): 클릭·상태 변경이 필요한 화면이라 브라우저에서 동작하는 컴포넌트로 만든다.
 */

import CheckoutSections from '@/domains/cart/components/CheckoutSections';
import {
    CartItem,
    PaymentMethod,
    ShippingAddress,
} from '@/domains/cart/types/cart.types';
import {
    calculateCart,
    FREE_SHIPPING_THRESHOLD,
} from '@/domains/cart/utils/calculateCart';
import { requestTossPayment } from '@/domains/payments/client/requestTossPayment';
import { useMockLoggedIn } from '@/shared/mocks/mockAuth';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/formatPrice';
import { AlertCircle, Minus, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartView({
    initialItems,
    defaultAddress,
}: {
    initialItems: CartItem[]; // 처음 보여줄 장바구니 상품 (지금은 더미데이터)
    defaultAddress: ShippingAddress; // 기본 배송지 (지금은 더미데이터)
}) {
    const router = useRouter(); // 페이지 이동용
    const isLoggedIn = useMockLoggedIn(); // 헤더의 테스트용 로그인 버튼 상태

    // ── 화면 상태 ──
    const [items, setItems] = useState(initialItems); // 장바구니 상품 목록
    const [checkoutRequested, setCheckoutRequested] = useState(false); // "구매 계속하기"를 눌렀는지
    const [agreed, setAgreed] = useState(false); // 결제 동의 체크 여부
    const [payment, setPayment] = useState<PaymentMethod>('card'); // 선택한 결제 수단
    const [paying, setPaying] = useState(false); // 결제창 여는 중 (버튼 연타 방지)

    // 상품 목록이 바뀔 때마다 금액을 다시 계산 (화면 다시 그릴 때마다 실행됨)
    const summary = calculateCart(items);
    // 결제 단계 중에 로그아웃하면 다시 구매 계속하기 상태로 돌아간다.
    const checkingOut = checkoutRequested && isLoggedIn;

    // "구매 계속하기" 버튼
    const continuePurchase = () => {
        if (!isLoggedIn) {
            // TODO: 로그인 페이지는 다른 담당이라 아직 없음 (현재 404)
            router.push('/login');
            return;
        }
        setCheckoutRequested(true); // 배송지/결제 수단 영역을 펼친다
    };

    // "N원 결제하기" 버튼: 토스 결제창을 연다 (자세한 흐름은 requestTossPayment.ts)
    const pay = async () => {
        setPaying(true);
        try {
            await requestTossPayment(items, payment);
        } catch (error) {
            // 결제창을 닫은 경우 등은 failUrl로 이동하므로 여기서는 결제창을 열기 전 오류만 처리
            alert(error instanceof Error ? error.message : String(error));
        } finally {
            setPaying(false);
        }
    };

    // ── 전체 선택 관련 계산 ──
    const selectable = items.filter((item) => !item.sold_out); // 선택 가능한 상품 (품절 제외)
    const selectedCount = selectable.filter((item) => item.selected).length; // 선택된 개수
    const allSelected =
        selectable.length > 0 && selectedCount === selectable.length; // 전부 선택됐는지

    // 상품 하나의 값(선택 여부, 수량 등)을 바꾼다
    const updateItem = (id: string, changes: Partial<CartItem>) =>
        setItems((prev) =>
            prev.map((item) =>
                item.product_id === id ? { ...item, ...changes } : item,
            ),
        );

    // 상품 하나를 장바구니에서 뺀다 (× 버튼)
    const removeItem = (id: string) =>
        setItems((prev) => prev.filter((item) => item.product_id !== id));

    // 전체 선택 체크박스: 품절이 아닌 상품을 모두 선택/해제
    const toggleAll = () =>
        setItems((prev) =>
            prev.map((item) =>
                item.sold_out ? item : { ...item, selected: !allSelected },
            ),
        );

    // "선택 삭제": 체크된 상품을 모두 뺀다
    const removeSelected = () =>
        setItems((prev) => prev.filter((item) => !item.selected));

    return (
        <div className="bg-paper text-ink">
            <div className="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
                <p className="text-ink-2 text-sm tracking-wide">/cart</p>
                <h1 className="mt-2 text-4xl font-medium">장바구니</h1>

                {/* 넓은 화면(lg 이상)에서는 왼쪽 목록 + 오른쪽 400px 금액 카드 2단 배치 */}
                <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px]">
                    {/* 상품 목록 */}
                    <section>
                        {items.length === 0 ? (
                            <p className="border-ink text-muted-foreground border-t py-20 text-center">
                                장바구니가 비어 있어요.
                            </p>
                        ) : (
                            <ul className="border-ink border-t">
                                {/* 상품마다 한 줄(CartRow)씩 그린다 */}
                                {items.map((item) => (
                                    <CartRow
                                        key={item.product_id}
                                        item={item}
                                        onToggle={() =>
                                            updateItem(item.product_id, {
                                                selected: !item.selected,
                                            })
                                        }
                                        onQuantity={(quantity) =>
                                            updateItem(item.product_id, {
                                                quantity,
                                            })
                                        }
                                        onRemove={() =>
                                            removeItem(item.product_id)
                                        }
                                    />
                                ))}
                            </ul>
                        )}

                        {/* 전체 선택 (선택 수/전체 수) + 선택 삭제 */}
                        <div className="flex items-center justify-between py-4 text-sm">
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleAll}
                                    disabled={selectable.length === 0}
                                    className="accent-olive size-5"
                                />
                                전체 선택 ({selectedCount}/{items.length})
                            </label>
                            <button
                                type="button"
                                onClick={removeSelected}
                                className="hover:underline"
                            >
                                선택 삭제
                            </button>
                        </div>

                        {/* 회원이 "구매 계속하기"를 누른 뒤에만 배송지/결제 수단을 보여준다 */}
                        {checkingOut && (
                            <CheckoutSections
                                defaultAddress={defaultAddress}
                                payment={payment}
                                onPaymentChange={setPayment}
                            />
                        )}
                    </section>

                    {/* 주문 금액 카드 (lg 이상에서는 스크롤해도 화면에 붙어 따라온다: sticky) */}
                    <aside className="border-line bg-card h-fit rounded-2xl border p-8 lg:sticky lg:top-24">
                        <h2 className="text-xl font-medium">주문 금액</h2>
                        <dl className="mt-6 space-y-4 text-sm">
                            {/* 상품 N종 (N권) / 상품 금액 */}
                            <div className="flex justify-between">
                                <dt className="text-ink-2">
                                    상품 {summary.kind_count}종 (
                                    {summary.total_quantity}권)
                                </dt>
                                <dd>{formatPrice(summary.product_total)}</dd>
                            </div>
                            {/* 배송비: 0원이면 "무료 (30,000원 이상)" 표시 */}
                            <div className="flex justify-between">
                                <dt className="text-ink-2">배송비</dt>
                                <dd>
                                    {summary.shipping_fee === 0 ? (
                                        <>
                                            무료{' '}
                                            <span className="text-ink-2">
                                                (
                                                {formatPrice(
                                                    FREE_SHIPPING_THRESHOLD,
                                                )}{' '}
                                                이상)
                                            </span>
                                        </>
                                    ) : (
                                        formatPrice(summary.shipping_fee)
                                    )}
                                </dd>
                            </div>
                        </dl>
                        {/* 최종 결제 금액 */}
                        <div className="border-line mt-6 flex items-center justify-between border-t pt-6">
                            <span className="text-sm">결제 금액</span>
                            <strong className="text-2xl font-medium">
                                {formatPrice(summary.payment_total)}
                            </strong>
                        </div>

                        {checkingOut ? (
                            // 결제 단계: 동의 체크 + 결제하기 버튼
                            <>
                                <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={() => setAgreed(!agreed)}
                                        className="accent-olive size-5"
                                    />
                                    주문 내용 확인 및 결제 동의
                                </label>
                                {/* 동의 안 함 / 결제창 여는 중 / 주문할 상품 없음 → 비활성화 */}
                                <button
                                    type="button"
                                    onClick={pay}
                                    disabled={
                                        !agreed ||
                                        paying ||
                                        summary.kind_count === 0
                                    }
                                    className="bg-olive mt-4 h-14 w-full rounded-full font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                                >
                                    {formatPrice(summary.payment_total)}{' '}
                                    결제하기
                                </button>
                            </>
                        ) : (
                            // 처음 상태: 구매 계속하기 버튼 (주문할 상품이 없으면 비활성화)
                            <button
                                type="button"
                                onClick={continuePurchase}
                                disabled={summary.kind_count === 0}
                                className="bg-olive mt-8 h-14 w-full rounded-full font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                            >
                                구매 계속하기
                            </button>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}

/**
 * 장바구니 상품 한 줄
 * 체크박스 | 표지 | 제목·저자·출판사·테마 | 수량 −/+ | 금액 | ×
 * 품절 상품은 흐리게(opacity-50) 표시하고, 수량 대신 "재입고 알림 받기"를 보여준다.
 * 실제 값 변경은 부모(CartView)가 넘겨준 onToggle/onQuantity/onRemove가 처리한다.
 */
function CartRow({
    item,
    onToggle,
    onQuantity,
    onRemove,
}: {
    item: CartItem;
    onToggle: () => void; // 체크박스 클릭
    onQuantity: (quantity: number) => void; // 수량 변경
    onRemove: () => void; // × 클릭
}) {
    return (
        <li
            className={cn(
                'border-line flex items-center gap-4 border-b py-6 md:gap-6',
                item.sold_out && 'opacity-50',
            )}
        >
            {/* 선택 체크박스 (품절이면 선택 불가) */}
            <input
                type="checkbox"
                checked={item.selected && !item.sold_out}
                onChange={onToggle}
                disabled={item.sold_out}
                aria-label={`${item.title} 선택`}
                className="accent-olive size-5 shrink-0"
            />
            {/* 표지: 이미지가 아직 없어서 색 블록으로 대신한다 */}
            <div
                className="h-32 w-22 shrink-0 rounded-md shadow-md"
                style={{ backgroundColor: item.cover_color }}
            />
            {/* 책 정보 + 품절 배지 */}
            <div className="min-w-0 flex-1">
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                    {item.author} · {item.publisher} · {item.theme}
                </p>
                {item.sold_out && (
                    <p className="bg-post/10 text-post mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                        <AlertCircle className="size-3" />
                        품절되어 주문할 수 없어요
                    </p>
                )}
            </div>

            {item.sold_out ? (
                // 품절: 수량 조절 대신 재입고 알림 문구 (기능은 아직 없음)
                <span className="text-muted-foreground w-36 text-center text-sm">
                    재입고 알림 받기
                </span>
            ) : (
                // 수량 −/+ (최소 1권, 1권일 때 − 버튼 비활성화)
                <div className="border-ink-2/30 flex h-11 w-36 items-center justify-between rounded-full border px-4">
                    <button
                        type="button"
                        onClick={() => onQuantity(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="수량 줄이기"
                        className="disabled:opacity-30"
                    >
                        <Minus className="size-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        type="button"
                        onClick={() => onQuantity(item.quantity + 1)}
                        aria-label="수량 늘리기"
                    >
                        <Plus className="size-4" />
                    </button>
                </div>
            )}

            {/* 이 상품의 금액 (가격 × 수량) */}
            <span className="w-24 text-right font-medium">
                {formatPrice(item.price * item.quantity)}
            </span>
            {/* 삭제 버튼 */}
            <button
                type="button"
                onClick={onRemove}
                aria-label={`${item.title} 삭제`}
                className="text-muted-foreground hover:text-ink"
            >
                <X className="size-4" />
            </button>
        </li>
    );
}
