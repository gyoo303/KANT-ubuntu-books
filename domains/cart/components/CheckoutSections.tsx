'use client';

/**
 * [배송지 + 결제 수단 영역] (시안 06 아래쪽)
 * 회원이 "구매 계속하기"를 누르면 CartView가 이 영역을 펼친다.
 * - 배송지: "기본 배송지"(읽기 전용) / "새 배송지"(직접 입력) 탭
 * - 결제 수단: 카드 / 카카오페이 / 네이버페이 / 가상계좌 중 하나 선택
 *
 * 결제 수단은 결제하기 버튼(CartView)에서도 써야 해서 상태를 부모(CartView)가 갖고,
 * 이 컴포넌트는 payment(현재 값)와 onPaymentChange(바꾸는 함수)를 받아서 쓴다.
 * TODO: 입력한 배송지는 아직 주문에 저장하지 않는다 (주문 저장 기능이 생기면 연결)
 */

import {
    PaymentMethod,
    ShippingAddress,
} from '@/domains/cart/types/cart.types';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';

// 결제 수단 버튼 목록 (value는 requestTossPayment에서 토스 결제 방식으로 바뀐다)
const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
    { value: 'card', label: '신용·체크카드' },
    { value: 'kakaopay', label: '카카오페이' },
    { value: 'naverpay', label: '네이버페이' },
    { value: 'virtual_account', label: '가상계좌' },
];

// "새 배송지" 탭의 빈 입력값
const EMPTY_ADDRESS: ShippingAddress = {
    recipient: '',
    phone: '',
    address: '',
};

export default function CheckoutSections({
    defaultAddress,
    payment,
    onPaymentChange: setPayment,
}: {
    defaultAddress: ShippingAddress; // 기본 배송지
    payment: PaymentMethod; // 현재 선택된 결제 수단
    onPaymentChange: (method: PaymentMethod) => void; // 결제 수단 변경
}) {
    const [useDefault, setUseDefault] = useState(true); // true: 기본 배송지 탭, false: 새 배송지 탭
    const [newAddress, setNewAddress] = useState(EMPTY_ADDRESS); // 새 배송지 입력값

    // 지금 화면에 보여줄 주소 (탭에 따라 기본 배송지 또는 새로 입력한 값)
    const address = useDefault ? defaultAddress : newAddress;
    // 새 배송지 입력칸 하나를 바꾼다
    const updateAddress = (changes: Partial<ShippingAddress>) =>
        setNewAddress((prev) => ({ ...prev, ...changes }));

    return (
        <div className="mt-10 space-y-6">
            {/* ── 배송지 ── */}
            <section className="border-line bg-card rounded-2xl border p-8 md:p-10">
                <h2 className="text-2xl font-medium">배송지</h2>
                <p className="text-ink-2 mt-2 text-sm">
                    기본 배송지를 불러오거나 새로 입력할 수 있어요.
                </p>

                {/* 탭 버튼: 선택된 탭은 검은 배경 */}
                <div className="mt-6 flex gap-2">
                    {[
                        { label: '기본 배송지', value: true },
                        { label: '새 배송지', value: false },
                    ].map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            onClick={() => setUseDefault(tab.value)}
                            className={cn(
                                'rounded-full border px-4 py-2 text-sm',
                                useDefault === tab.value
                                    ? 'border-ink bg-ink text-white'
                                    : 'border-ink-2/30',
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 입력칸: 기본 배송지 탭에서는 읽기 전용(readOnly) */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Field
                        label="받는 분"
                        value={address.recipient}
                        readOnly={useDefault}
                        onChange={(recipient) => updateAddress({ recipient })}
                    />
                    <Field
                        label="연락처"
                        value={address.phone}
                        readOnly={useDefault}
                        onChange={(phone) => updateAddress({ phone })}
                    />
                    <div className="md:col-span-2">
                        <Field
                            label="주소"
                            value={address.address}
                            readOnly={useDefault}
                            onChange={(value) =>
                                updateAddress({ address: value })
                            }
                        />
                    </div>
                </div>
            </section>

            {/* ── 결제 수단 ── */}
            <section className="border-line bg-card rounded-2xl border p-8 md:p-10">
                <h2 className="text-2xl font-medium">결제 수단</h2>
                <p className="text-ink-2 mt-2 text-sm">
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
    onChange,
}: {
    label: string;
    value: string;
    readOnly: boolean;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block text-sm">
            <span>{label}</span>
            <input
                value={value}
                readOnly={readOnly}
                onChange={(e) => onChange(e.target.value)}
                className="border-ink-2/30 bg-card read-only:bg-paper mt-2 h-12 w-full rounded-lg border px-4 text-base"
            />
        </label>
    );
}
