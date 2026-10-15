/**
 * ⚠️ [임시 저장소] 결제 화면의 "내 연락처"와 "기본 배송지" - 브라우저 LocalStorage
 *
 * TODO(db): DB가 정해지면 이 파일을 지우고 아래처럼 바꾼다.
 * - 내 연락처   → DB User.phone (회원 본인 연락처, 다음 결제 때 미리 채우는 용도)
 * - 기본 배송지 → 회원 배송지 정보(DB)
 * - 주문마다 받은 배송지 연락처 → Order/Subscription.shippingAddress.receiverPhone (주문 저장 시 서버에서 기록)
 *
 * LocalStorage의 한계 (임시로만 써야 하는 이유)
 * - 이 브라우저에만 저장된다. 다른 기기·다른 브라우저에서는 보이지 않고, 서버도 읽을 수 없다.
 * - 사용자가 사이트 데이터를 지우거나 시크릿 창을 닫으면 사라진다.
 * - 같은 브라우저를 쓰는 다른 사람이 볼 수 있다. 그래서 회원 id별로 키를 나눠 저장한다.
 * - 저장 공간이 꽉 찼거나 막혀 있으면 오류가 나므로 모든 읽기·쓰기를 try/catch로 감싼다.
 *
 * 저장 키: ubuntu-books:user:<회원 id>:phone / ubuntu-books:user:<회원 id>:default-address
 * (회원 id는 지금은 네이버 사용자 고유번호, DB를 켜면 DB User.id로 바뀐다)
 */
import { ShippingAddress } from '@/domains/cart/types/cart.types';
import { isShippingAddressValid } from '@/domains/checkout/utils/validateShippingAddress';
import { isValidPhoneNumber } from '@/shared/utils/phone';

/** 같은 탭에서 저장했을 때 화면에 알리는 이벤트 이름 (다른 탭은 'storage' 이벤트로 알 수 있음) */
export const CHECKOUT_STORAGE_EVENT = 'ubuntu-books:checkout-storage';

export function myPhoneKey(userId: string) {
    return `ubuntu-books:user:${userId}:phone`;
}

export function defaultAddressKey(userId: string) {
    return `ubuntu-books:user:${userId}:default-address`;
}

/** LocalStorage 값을 읽는다. 없거나 읽을 수 없으면 null */
export function readStorage(key: string): string | null {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key: string, value: string) {
    try {
        window.localStorage.setItem(key, value);
        window.dispatchEvent(new Event(CHECKOUT_STORAGE_EVENT));
    } catch {
        // 저장 실패(용량 초과·차단)는 결제를 막을 이유가 아니므로 조용히 넘어간다
    }
}

/** 저장된 기본 배송지 문자열(JSON)을 객체로 바꾼다. 형식이 깨졌으면 null */
export function parseStoredAddress(raw: string | null): ShippingAddress | null {
    if (!raw) return null;
    try {
        const value: unknown = JSON.parse(raw);
        return isShippingAddressValid(value as Partial<ShippingAddress>)
            ? (value as ShippingAddress)
            : null;
    } catch {
        return null;
    }
}

/** TODO(db): User.phone 업데이트로 교체 */
export function saveMyPhone(userId: string, phone: string) {
    if (!isValidPhoneNumber(phone)) return;
    writeStorage(myPhoneKey(userId), phone);
}

/** TODO(db): 회원 기본 배송지 저장으로 교체 */
export function saveDefaultAddress(userId: string, address: ShippingAddress) {
    if (!isShippingAddressValid(address)) return;
    writeStorage(defaultAddressKey(userId), JSON.stringify(address));
}
