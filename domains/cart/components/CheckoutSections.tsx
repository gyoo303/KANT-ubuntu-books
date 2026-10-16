'use client';

/**
 * [배송지 + 결제 수단 영역] (시안 06 아래쪽)
 * 회원이 "구매 계속하기"를 누르면 CartView가 이 영역을 펼친다.
 * - 배송지: "기본 배송지"(읽기 전용) / "새 배송지"(직접 입력) 탭
 * - 결제 수단: 카드 / 카카오페이 / 네이버페이 / 가상계좌 중 하나 선택
 *
 * 휴대폰 번호는 가입 때 받지 않고 여기서 "배송지 연락처"(receiverPhone)로 받는다.
 * - 새 배송지의 연락처 칸은 "내 연락처"(User.phone)가 있으면 미리 채워진다.
 * - "이 번호를 내 연락처로 저장"을 고르면 다음 결제 때 자동으로 채워진다.
 * - 기본 배송지는 지난번에 새 배송지로 주문한 주소다.
 * ⚠️ TODO(db): 내 연락처·기본 배송지는 지금 브라우저 LocalStorage에 임시 저장한다 (useCheckoutContact 참고).
 *
 * 배송지·결제 수단 상태는 결제하기 버튼(CartView)에서도 써야 해서 부모(CartView)가 갖고,
 * 이 컴포넌트는 그 값과 바꾸는 함수를 받아서 화면만 그린다.
 */

import { PaymentMethod } from '@/domains/cart/types/cart.types';
import type {
    AddressTab,
    CheckoutContact,
} from '@/domains/checkout/hooks/useCheckoutContact';
import { cn } from '@/shared/utils/cn';
import { formatPhoneNumber } from '@/shared/utils/phone';

// 결제 수단 버튼 목록 (value는 requestTossPayment에서 토스 결제 방식으로 바뀐다)
const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
    { value: 'card', label: '신용·체크카드' },
    { value: 'kakaopay', label: '카카오페이' },
    { value: 'naverpay', label: '네이버페이' },
    { value: 'virtual_account', label: '가상계좌' },
];

const ADDRESS_TABS: { label: string; value: AddressTab }[] = [
    { label: '기본 배송지', value: 'default' },
    { label: '새 배송지', value: 'new' },
];

export default function CheckoutSections({
    contact,
    payment,
    onPaymentChange: setPayment,
}: {
    contact: CheckoutContact; // 배송지 상태 (useCheckoutContact)
    payment: PaymentMethod; // 현재 선택된 결제 수단
    onPaymentChange: (method: PaymentMethod) => void; // 결제 수단 변경
}) {
    const { tab, setTab, savedDefault, address, errors } = contact;
    const readOnly = tab === 'default';

    return (
        <div className="mt-10 space-y-6">
            {/* ── 배송지 ── */}
            <section className="rounded-2xl border border-line bg-card p-8 md:p-10">
                <h2 className="text-2xl font-medium">배송지</h2>
                <p className="mt-2 text-sm text-ink-2">
                    상자를 받으실 분의 정보를 확인해 주세요. 연락처는 배송
                    안내에만 써요.
                </p>

                {/* 탭 버튼: 선택된 탭은 검은 배경. 저장된 기본 배송지가 없으면 기본 배송지 탭은 비활성 */}
                <div className="mt-6 flex gap-2">
                    {ADDRESS_TABS.map((item) => {
                        const disabled =
                            item.value === 'default' && !savedDefault;
                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setTab(item.value)}
                                disabled={disabled}
                                aria-pressed={tab === item.value}
                                className={cn(
                                    'rounded-full border px-4 py-2 text-sm disabled:opacity-40',
                                    tab === item.value
                                        ? 'border-ink bg-ink text-white'
                                        : 'border-ink-2/30',
                                )}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
                {!savedDefault && (
                    <p className="mt-3 text-xs text-muted-foreground">
                        저장된 기본 배송지가 없어요. 새 배송지로 주문하면 다음에
                        불러올 수 있어요.
                    </p>
                )}

                {/* 입력칸: 기본 배송지 탭에서는 읽기 전용(readOnly) */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Field
                        label="받는 분"
                        value={address.recipient}
                        readOnly={readOnly}
                        error={
                            !readOnly && address.recipient !== ''
                                ? errors.recipient
                                : undefined
                        }
                        onChange={(recipient) =>
                            contact.updateNewAddress({ recipient })
                        }
                    />
                    <div>
                        <Field
                            label="연락처"
                            value={address.phone}
                            readOnly={readOnly}
                            inputMode="tel"
                            placeholder="010-0000-0000"
                            // 다 입력하기 전에는 오류를 보여주지 않는다 (입력 중 빨간 글씨 방지)
                            error={
                                !readOnly && address.phone.length >= 12
                                    ? errors.phone
                                    : undefined
                            }
                            onChange={(phone) =>
                                contact.updateNewAddress({
                                    phone: formatPhoneNumber(phone),
                                })
                            }
                        />
                        {!readOnly && (
                            <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-ink-2">
                                <input
                                    type="checkbox"
                                    checked={contact.saveAsMyPhone}
                                    onChange={(e) =>
                                        contact.setSaveAsMyPhone(
                                            e.target.checked,
                                        )
                                    }
                                    className="size-4 accent-olive"
                                />
                                이 번호를 내 연락처로 저장
                            </label>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <Field
                            label="주소"
                            value={address.address}
                            readOnly={readOnly}
                            onChange={(value) =>
                                contact.updateNewAddress({ address: value })
                            }
                        />
                    </div>
                </div>
            </section>

            {/* ── 결제 수단 ── */}
            <section className="rounded-2xl border border-line bg-card p-8 md:p-10">
                <h2 className="text-2xl font-medium">결제 수단</h2>
                <p className="mt-2 text-sm text-ink-2">
                    토스페이먼츠로 안전하게 결제돼요.
                </p>
                {/* 선택된 버튼은 초록 테두리 + 굵은 글씨 */}
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {PAYMENT_METHODS.map((method) => (
                        <button
                            key={method.value}
                            type="button"
                            aria-pressed={payment === method.value}
                            onClick={() => setPayment(method.value)}
                            className={cn(
                                'h-16 rounded-lg border text-sm',
                                payment === method.value
                                    ? 'border-olive border-2 font-semibold'
                                    : 'border-ink-2/30',
                            )}
                        >
                            {method.label}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}

// 라벨 + 입력칸 한 묶음 (읽기 전용이면 배경색이 살짝 어두워진다)
function Field({
    label,
    value,
    readOnly,
    error,
    inputMode,
    placeholder,
    onChange,
}: {
    label: string;
    value: string;
    readOnly: boolean;
    error?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    placeholder?: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block text-sm">
            <span>{label}</span>
            <input
                value={value}
                readOnly={readOnly}
                inputMode={inputMode}
                placeholder={placeholder}
                aria-invalid={error ? true : undefined}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-ink-2/30 bg-card read-only:bg-paper px-4 text-base aria-invalid:border-post"
            />
            {error && (
                <span className="mt-1.5 block text-xs text-post">
                    {error}
                </span>
            )}
        </label>
    );
}
