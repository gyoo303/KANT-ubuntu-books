'use client';

/**
 * 결제 화면의 배송지(받는 분·연락처·주소) 상태를 관리하는 훅
 *
 * [User.phone과 receiverPhone의 역할 구분]
 * - receiverPhone(배송지 연락처): 이번 주문·구독의 상자를 받을 사람의 연락처. 주문마다 따로 저장한다.
 *   받는 분이 본인이 아닐 수 있으므로(선물 등) 회원 연락처와 분리한다.
 * - User.phone(내 연락처): 회원 본인 연락처. "새 배송지"의 연락처 칸을 미리 채우는 용도로만 쓴다.
 *   사용자가 "이 번호를 내 연락처로 저장"을 고르면 저장된다. (내 연락처가 없으면 기본으로 체크)
 *
 * ⚠️ TODO(db): "내 연락처"와 "기본 배송지"는 지금 브라우저 LocalStorage에 임시 저장한다
 *    (domains/checkout/storage/checkoutStorage.ts). DB를 켜면 회원 정보 API로 교체한다.
 *
 * LocalStorage 값은 useSyncExternalStore로 읽는다.
 * 서버에서 그릴 때는 LocalStorage가 없으므로 null로 보고, 브라우저에서 실제 값을 읽는다.
 * 저장하면 이벤트로 알려서 화면이 자동으로 다시 그려진다.
 */
import { ShippingAddress } from '@/domains/cart/types/cart.types';
import {
    CHECKOUT_STORAGE_EVENT,
    defaultAddressKey,
    myPhoneKey,
    parseStoredAddress,
    readStorage,
    saveDefaultAddress,
    saveMyPhone,
} from '@/domains/checkout/storage/checkoutStorage';
import {
    isShippingAddressValid,
    validateShippingAddress,
} from '@/domains/checkout/utils/validateShippingAddress';
import { useMemo, useState, useSyncExternalStore } from 'react';

export type AddressTab = 'default' | 'new';

// 새 배송지 입력값. phone이 null이면 "아직 손대지 않음" → 내 연락처로 미리 채워 보여준다.
interface AddressDraft {
    recipient: string;
    phone: string | null;
    address: string;
}

const EMPTY_DRAFT: AddressDraft = { recipient: '', phone: null, address: '' };

function subscribe(callback: () => void) {
    window.addEventListener(CHECKOUT_STORAGE_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(CHECKOUT_STORAGE_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

function useStoredValue(key: string | null) {
    return useSyncExternalStore(
        subscribe,
        () => (key ? readStorage(key) : null),
        () => null,
    );
}

export function useCheckoutContact(userId: string | undefined) {
    // TODO(db): User.phone / 회원 기본 배송지 조회로 교체
    const myPhone = useStoredValue(userId ? myPhoneKey(userId) : null);
    const defaultRaw = useStoredValue(
        userId ? defaultAddressKey(userId) : null,
    );
    const savedDefault = useMemo(
        () => parseStoredAddress(defaultRaw),
        [defaultRaw],
    );

    // 고른 탭. null이면 자동: 저장된 기본 배송지가 있으면 '기본 배송지', 없으면 '새 배송지'
    const [selectedTab, setSelectedTab] = useState<AddressTab | null>(null);
    const tab: AddressTab = selectedTab ?? (savedDefault ? 'default' : 'new');

    const [draft, setDraft] = useState<AddressDraft>(EMPTY_DRAFT);
    const newAddress: ShippingAddress = {
        recipient: draft.recipient,
        phone: draft.phone ?? myPhone ?? '',
        address: draft.address,
    };

    // "이 번호를 내 연락처로 저장" 체크. null이면 자동: 내 연락처가 없을 때만 체크
    const [saveAsMyPhoneChoice, setSaveAsMyPhone] = useState<boolean | null>(
        null,
    );
    const saveAsMyPhone = saveAsMyPhoneChoice ?? !myPhone;

    // 지금 결제에 쓸 배송지
    const address: ShippingAddress =
        tab === 'default' && savedDefault ? savedDefault : newAddress;
    const errors = validateShippingAddress(address);
    const isValid = isShippingAddressValid(address);

    const updateNewAddress = (changes: Partial<ShippingAddress>) =>
        setDraft((prev) => ({ ...prev, ...changes }));

    /**
     * 결제창을 열기 직전에 호출한다.
     * 새 배송지로 주문하면 다음 결제 때 쓰도록 기본 배송지로 기억하고,
     * 체크했으면 연락처를 내 연락처(User.phone)로 저장한다.
     * TODO(db): 이 저장은 서버에서 주문 저장과 함께 처리하도록 옮긴다.
     */
    const rememberForNextOrder = () => {
        if (!userId || !isValid || tab !== 'new') return;
        saveDefaultAddress(userId, address);
        if (saveAsMyPhone) saveMyPhone(userId, address.phone);
    };

    return {
        tab,
        setTab: setSelectedTab,
        savedDefault,
        newAddress,
        updateNewAddress,
        address,
        errors,
        isValid,
        myPhone,
        saveAsMyPhone,
        setSaveAsMyPhone,
        rememberForNextOrder,
    };
}

export type CheckoutContact = ReturnType<typeof useCheckoutContact>;
