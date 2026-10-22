import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildBookshelfHref, parseBookshelfQuery } from './bookshelfQuery';

describe('테마 서가 주소 ↔ 조회 조건', () => {
    it('theme 이 없으면 기본 서가(garden)로 읽어야 한다', () => {
        assert.strictEqual(parseBookshelfQuery({}).themeId, 'garden');
    });

    it('theme 을 읽고, 이상한 값은 기본 서가로 바꿔야 한다', () => {
        assert.strictEqual(parseBookshelfQuery({ theme: 'table' }).themeId, 'table');
        assert.strictEqual(parseBookshelfQuery({ theme: '<script>' }).themeId, 'garden');
    });

    it('기본값은 주소에서 빼고, 다른 테마는 ?theme= 로 남겨야 한다', () => {
        assert.strictEqual(buildBookshelfHref({}), '/bookshelf');
        assert.strictEqual(buildBookshelfHref({ themeId: 'all' }), '/bookshelf?theme=all');
        assert.strictEqual(
            buildBookshelfHref({ themeId: 'table', sort: 'price_asc', page: 2 }),
            '/bookshelf?theme=table&page=2&sort=price_asc',
        );
    });
});
