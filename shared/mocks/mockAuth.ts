/**
 * [테스트용 가짜 로그인 상태]
 * 실제 로그인 기능(다른 담당)이 생기기 전까지, 회원/비회원 흐름을 테스트하기 위한 임시 코드.
 * - 헤더의 MockLoginButton을 누르면 setMockLoggedIn()으로 상태가 바뀐다.
 * - 장바구니(CartView) 등은 useMockLoggedIn()으로 현재 상태를 읽는다.
 * - localStorage에 저장하므로 새로고침해도 유지된다.
 *
 * TODO: 로그인 기능(다른 담당)이 붙으면 이 파일을 실제 인증 상태로 교체
 */
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'mock_logged_in'; // localStorage에 저장하는 이름
const CHANGE_EVENT = 'mock-auth-change'; // 같은 탭 안에서 "상태 바뀜"을 알리는 이벤트 이름

// 상태가 바뀌면 callback을 불러 달라고 등록한다 (useSyncExternalStore가 사용)
// - CHANGE_EVENT: 같은 탭에서 버튼을 눌렀을 때
// - storage: 다른 탭에서 localStorage가 바뀌었을 때
function subscribe(callback: () => void) {
    window.addEventListener(CHANGE_EVENT, callback);
    window.addEventListener('storage', callback);
    // 컴포넌트가 사라질 때 등록을 해제한다
    return () => {
        window.removeEventListener(CHANGE_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

// 현재 로그인 상태(true/false)를 읽는 React 훅.
// 상태가 바뀌면 이 훅을 쓰는 컴포넌트(헤더 버튼, 장바구니)가 자동으로 다시 그려진다.
export function useMockLoggedIn() {
    return useSyncExternalStore(
        subscribe,
        () => localStorage.getItem(STORAGE_KEY) === 'true', // 브라우저: localStorage 값
        () => false, // 서버에서 그릴 때: localStorage가 없으므로 비로그인으로 간주
    );
}

// 로그인 상태를 바꾸고, 같은 탭의 화면들에 알린다
export function setMockLoggedIn(loggedIn: boolean) {
    localStorage.setItem(STORAGE_KEY, String(loggedIn));
    window.dispatchEvent(new Event(CHANGE_EVENT));
}
