/**
 * 배송지 입력 검증 (결제 화면과 결제 준비 API가 같은 규칙을 쓴다)
 *
 * 화면에서 검증해도 요청은 조작될 수 있으므로 서버(/api/payments/ready)에서도 이 함수로 다시 검사한다.
 * ShippingAddress.phone이 DB 스키마의 shippingAddress.receiverPhone(받는 분 연락처)에 해당한다.
 */
import { ShippingAddress } from '@/domains/cart/types/cart.types';
import { isValidPhoneNumber } from '@/shared/utils/phone';

export type ShippingAddressErrors = Partial<
    Record<keyof ShippingAddress, string>
>;

export function validateShippingAddress(
    address: Partial<ShippingAddress> | null | undefined,
): ShippingAddressErrors {
    const errors: ShippingAddressErrors = {};
    // 서버에서는 조작된 요청이 올 수 있으므로 문자열인지부터 확인한다
    if (!isFilled(address?.recipient)) {
        errors.recipient = '받는 분 이름을 입력해 주세요.';
    }
    if (
        typeof address?.phone !== 'string' ||
        !isValidPhoneNumber(address.phone)
    ) {
        errors.phone = '연락처를 010-0000-0000 형식으로 입력해 주세요.';
    }
    if (!isFilled(address?.address)) {
        errors.address = '주소를 입력해 주세요.';
    }
    return errors;
}

function isFilled(value: unknown): boolean {
    return typeof value === 'string' && value.trim() !== '';
}

export function isShippingAddressValid(
    address: Partial<ShippingAddress> | null | undefined,
): address is ShippingAddress {
    return Object.keys(validateShippingAddress(address)).length === 0;
}
