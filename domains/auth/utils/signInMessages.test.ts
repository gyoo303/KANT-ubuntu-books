import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getSignInErrorMessage, getSignInNotice } from './signInMessages';

describe('getSignInNotice 유틸리티 함수 테스트', () => {
    it('장바구니에서 왔으면 주문 안내를 보여줘야 한다 (상대경로·절대 URL 모두)', () => {
        const expected = '주문하려면 로그인이 필요해요.';
        assert.strictEqual(getSignInNotice('/cart')?.title, expected);
        assert.strictEqual(
            getSignInNotice('http://localhost:3000/cart?step=pay')?.title,
            expected,
        );
    });

    it('경로마다 알맞은 안내를 보여줘야 한다', () => {
        assert.strictEqual(
            getSignInNotice('/subscription/letter')?.title,
            '편지를 쓰려면 로그인이 필요해요.',
        );
        assert.strictEqual(
            getSignInNotice('http://localhost:3000/mypage/orders')?.title,
            '나의 창가를 보려면 로그인이 필요해요.',
        );
        assert.strictEqual(
            getSignInNotice('/admin/mailbox')?.title,
            '점주 작업실은 로그인이 필요해요.',
        );
        assert.strictEqual(
            getSignInNotice('/bookshelf/1')?.title,
            '로그인이 필요한 페이지예요.',
        );
    });

    it('돌아갈 곳이 없거나 홈이면 안내를 보여주지 않아야 한다', () => {
        assert.strictEqual(getSignInNotice(undefined), null);
        assert.strictEqual(getSignInNotice(''), null);
        assert.strictEqual(getSignInNotice('/'), null);
        assert.strictEqual(getSignInNotice('http://localhost:3000/'), null);
        assert.strictEqual(getSignInNotice('not a url'), null);
    });
});

describe('getSignInErrorMessage 유틸리티 함수 테스트', () => {
    it('오류 코드가 없으면 null을 돌려줘야 한다', () => {
        assert.strictEqual(getSignInErrorMessage(undefined), null);
        assert.strictEqual(getSignInErrorMessage(''), null);
    });

    it('알려진 코드는 전용 문구, 모르는 코드는 기본 문구를 돌려줘야 한다', () => {
        assert.match(getSignInErrorMessage('AccessDenied')!, /취소/);
        assert.match(getSignInErrorMessage('OAuthAccountNotLinked')!, /이미/);
        assert.match(getSignInErrorMessage('Configuration')!, /설정/);
        assert.strictEqual(
            getSignInErrorMessage('SomethingElse'),
            '로그인 중 문제가 생겼어요. 다시 시도해 주세요.',
        );
    });
});
