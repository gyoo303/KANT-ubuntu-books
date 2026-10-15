import { BoardSetting } from '@/domains/boards/types/board.types';
import { Category } from '@/domains/categories/types/category.types';
import { FileInfo } from '@/domains/files/types/file.types';
import { Product, Theme } from '@/domains/products/types/product.types';

// 중첩 카테고리 트리 Mock Data
export const MOCK_CATEGORIES: Category[] = [
    {
        id: 'cat-fashion',
        parent_id: null,
        name: '패션의류',
        depth: 1,
        sort_order: 1,
        children: [
            {
                id: 'cat-fashion-top',
                parent_id: 'cat-fashion',
                name: '상의',
                depth: 2,
                sort_order: 1,
                children: [
                    {
                        id: 'cat-fashion-top-tshirt',
                        parent_id: 'cat-fashion-top',
                        name: '티셔츠',
                        depth: 3,
                        sort_order: 1,
                    },
                    {
                        id: 'cat-fashion-top-shirt',
                        parent_id: 'cat-fashion-top',
                        name: '셔츠/블라우스',
                        depth: 3,
                        sort_order: 2,
                    },
                ],
            },
            {
                id: 'cat-fashion-bottom',
                parent_id: 'cat-fashion',
                name: '하의',
                depth: 2,
                sort_order: 2,
                children: [
                    {
                        id: 'cat-fashion-bottom-denim',
                        parent_id: 'cat-fashion-bottom',
                        name: '데님팬츠',
                        depth: 3,
                        sort_order: 1,
                    },
                    {
                        id: 'cat-fashion-bottom-slacks',
                        parent_id: 'cat-fashion-bottom',
                        name: '슬랙스',
                        depth: 3,
                        sort_order: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 'cat-digital',
        parent_id: null,
        name: '디지털/가전',
        depth: 1,
        sort_order: 2,
        children: [
            {
                id: 'cat-digital-pc',
                parent_id: 'cat-digital',
                name: '노트북/PC',
                depth: 2,
                sort_order: 1,
            },
            {
                id: 'cat-digital-acc',
                parent_id: 'cat-digital',
                name: '모바일 주변기기',
                depth: 2,
                sort_order: 2,
            },
        ],
    },
    {
        id: 'cat-living',
        parent_id: null,
        name: '홈/리빙',
        depth: 1,
        sort_order: 3,
        children: [
            {
                id: 'cat-living-furniture',
                parent_id: 'cat-living',
                name: '가구/인테리어',
                depth: 2,
                sort_order: 1,
            },
        ],
    },
];

// 게시판 설정 Mock Data
export const MOCK_BOARDS: BoardSetting[] = [
    {
        id: 'notice',
        name: '공지사항',
        description: '쇼핑몰 공지 및 이벤트 안내',
        write_role: 'admin',
        created_at: '2026-10-13T00:00:00Z',
    },
    {
        id: 'qna',
        name: '상품 Q&A',
        description: '상품 및 배송 관련 질문 게시판',
        write_role: 'user',
        created_at: '2026-10-13T00:00:00Z',
    },
    {
        id: 'review',
        name: '구매 후기',
        description: '실제 구매 고객 리뷰 게시판',
        write_role: 'user',
        created_at: '2026-10-13T00:00:00Z',
    },
];

// 범용 파일 메타데이터 Mock Data
export const MOCK_FILES: FileInfo[] = [
    {
        id: 1,
        gid: 'product-mock-1',
        location: 'product_main',
        original_name: 'sample_product.jpg',
        content_type: 'image/jpeg',
        extension: 'jpg',
        file_size: 102400,
        done: true,
        seq: 0,
        created_at: '2026-10-13T00:00:00Z',
        url: '/files/1',
    },
];

// ─────────────────────────────────────────────
// 우분투북스 테마 서가 / 도서 Mock Data
// 백엔드 상품 목록·상세 API가 나오면 domains/products/api/productApi.ts 에서 교체
// ─────────────────────────────────────────────
export const MOCK_THEMES: Theme[] = [
    {
        id: 'garden',
        name: '도심 속 텃밭과 흙',
        short_name: '텃밭과 흙',
        description:
            '베란다 화분 하나, 동네 공동 텃밭 한 고랑에서 시작하는 이야기예요. 흙을 만지면 시간이 느리게 흐른다는 걸 알려주는 책들을 모았습니다.',
        icon: 'sprout',
        sort_order: 1,
    },
    {
        id: 'table',
        name: '치유의 식탁',
        short_name: '치유의 식탁',
        description:
            '천천히 차려 먹는 한 끼가 하루를 다독여 주는 순간들. 부엌과 식탁에서 건져 올린 책들이에요.',
        icon: 'soup',
        sort_order: 2,
    },
    {
        id: 'nature',
        name: '자연과 함께 머물기',
        short_name: '자연과 머물기',
        description:
            '숲길, 바닷가, 동네 뒷산. 멀리 가지 않아도 자연 곁에 머무는 법을 알려주는 책들입니다.',
        icon: 'leaf',
        sort_order: 3,
    },
    {
        id: 'local',
        name: '지역과 연대',
        short_name: '지역과 연대',
        description:
            '골목의 가게, 마을의 사람들, 함께 사는 법을 고민하는 이웃들의 이야기를 모았어요.',
        icon: 'map-pin',
        sort_order: 4,
    },
];

// 목록에 필요한 값만 적고, 상세 값은 아래 makeProduct 에서 기본값으로 채웁니다.
type ProductSeed = Pick<
    Product,
    | 'id'
    | 'theme_id'
    | 'title'
    | 'price'
    | 'stock'
    | 'one_line'
    | 'cover_color'
    | 'sort_order'
> &
    Partial<Product>;

function makeProduct(seed: ProductSeed): Product {
    return {
        author: '○○○',
        publisher: '○○출판',
        curator_note: `${seed.one_line} 책방지기가 직접 읽고 고른 이유가 들어갈 자리예요.`,
        pairing_note: null,
        publisher_intro: '(출판사 제공 소개글이 들어갈 자리)',
        published_at: '2025-03-10',
        page_count: 216,
        size: '130×200mm',
        isbn: '979-11-00000-00-0',
        cover_image_url: null,
        ...seed,
    };
}

export const MOCK_PRODUCTS: Product[] = (
    [
        // 도심 속 텃밭과 흙
        {
            id: 'b001',
            theme_id: 'garden',
            title: '베란다 정원 일기',
            price: 16800,
            stock: 4,
            sort_order: 1,
            cover_color: '#4b5a50',
            one_line: '화분 세 개로 시작해도 충분하다는 걸 알려준 책.',
            curator_note:
                '화분 세 개로 시작해도 충분하다는 걸 알려준 책이에요. 거창한 정원이 아니어도, 아침마다 잎을 들여다보는 시간이 하루를 얼마나 바꾸는지 조용히 보여줘요. 흙을 처음 만져보는 분께 가장 먼저 건네고 싶은 책입니다.',
            pairing_note:
                '어은동 로컬 허브티와 함께 읽으면, 베란다에 작은 허브 화분을 하나 들이고 싶어질 거예요.',
            publisher_intro:
                '도시의 좁은 베란다에서 일 년 동안 채소와 허브를 기르며 기록한 정원 일기. 씨앗을 고르는 법부터 흙을 섞는 법, 계절마다 달라지는 볕을 읽는 법까지, 처음 식물을 기르는 사람을 위한 다정한 안내서이자 느린 삶에 대한 에세이다. (출판사 제공 소개글이 들어갈 자리)',
            published_at: '2025-04-20',
            page_count: 232,
        },
        {
            id: 'b002',
            theme_id: 'garden',
            title: '흙의 시간',
            price: 18000,
            stock: 6,
            sort_order: 2,
            cover_color: '#a87a4c',
            one_line: '지렁이 이야기에 이렇게 마음이 놓일 줄이야.',
        },
        {
            id: 'b003',
            theme_id: 'garden',
            title: '마을 텃밭 사계',
            price: 15000,
            stock: 0,
            sort_order: 3,
            cover_color: '#b3bcb0',
            one_line: '이웃과 같이 심고 같이 거두는 일 년.',
        },
        {
            id: 'b004',
            theme_id: 'garden',
            title: '씨앗 도서관',
            price: 19500,
            stock: 3,
            sort_order: 4,
            cover_color: '#b28b6e',
            one_line: '토종 씨앗을 빌려주고 돌려받는 사람들.',
        },
        {
            id: 'b005',
            theme_id: 'garden',
            title: '작은 땅의 야생',
            price: 17000,
            stock: 5,
            sort_order: 5,
            cover_color: '#8a4a2c',
            one_line: '잡초라 부르던 것들의 이름을 알게 됐어요.',
        },
        {
            id: 'b006',
            theme_id: 'garden',
            title: '퇴비 만드는 법',
            price: 14000,
            stock: 8,
            sort_order: 6,
            cover_color: '#9c6a5c',
            one_line: '부엌과 텃밭이 이어지는 순환의 책.',
        },
        {
            id: 'b007',
            theme_id: 'garden',
            title: '도시 농부 일기',
            price: 16000,
            stock: 2,
            sort_order: 7,
            cover_color: '#3d4966',
            one_line: '출근 전 한 시간, 텃밭에서 보내는 사람.',
        },
        {
            id: 'b008',
            theme_id: 'garden',
            title: '흙 묻은 손',
            price: 13500,
            stock: 7,
            sort_order: 8,
            cover_color: '#6b6284',
            one_line: '짧은 시와 사진으로 엮은 텃밭의 계절.',
        },
        {
            id: 'b009',
            theme_id: 'garden',
            title: '옥상 꿀벌 학교',
            price: 17800,
            stock: 4,
            sort_order: 9,
            cover_color: '#9a685a',
            one_line: '도시 한가운데서 벌을 치는 이웃들.',
        },
        {
            id: 'b010',
            theme_id: 'garden',
            title: '빗물 정원',
            price: 15500,
            stock: 3,
            sort_order: 10,
            cover_color: '#5d7a74',
            one_line: '비 오는 날이 기다려지는 작은 정원 설계.',
        },
        {
            id: 'b011',
            theme_id: 'garden',
            title: '허브 한 줌',
            price: 12800,
            stock: 0,
            sort_order: 11,
            cover_color: '#7f8a55',
            one_line: '창가에서 키워 찻잔으로 옮기는 허브들.',
        },
        {
            id: 'b012',
            theme_id: 'garden',
            title: '뿌리의 말',
            price: 18500,
            stock: 5,
            sort_order: 12,
            cover_color: '#6e5440',
            one_line: '보이지 않는 곳에서 일하는 것들에 대하여.',
        },
        // 치유의 식탁
        {
            id: 'b101',
            theme_id: 'table',
            title: '느린 아침상',
            price: 16500,
            stock: 5,
            sort_order: 1,
            cover_color: '#c08a5a',
            one_line: '밥 짓는 냄새로 하루를 여는 법.',
        },
        {
            id: 'b102',
            theme_id: 'table',
            title: '제철 한 그릇',
            price: 18800,
            stock: 2,
            sort_order: 2,
            cover_color: '#7a5b3e',
            one_line: '계절이 바뀔 때마다 다시 펼치게 되는 책.',
        },
        {
            id: 'b103',
            theme_id: 'table',
            title: '엄마의 국자',
            price: 14500,
            stock: 0,
            sort_order: 3,
            cover_color: '#a45b4b',
            one_line: '레시피보다 기억이 먼저 떠오르는 요리책.',
        },
        {
            id: 'b104',
            theme_id: 'table',
            title: '혼자 먹는 저녁',
            price: 15000,
            stock: 6,
            sort_order: 4,
            cover_color: '#4e5b6e',
            one_line: '나를 위해 차리는 밥상의 다정함.',
        },
        // 자연과 함께 머물기
        {
            id: 'b201',
            theme_id: 'nature',
            title: '뒷산 산책자',
            price: 15800,
            stock: 4,
            sort_order: 1,
            cover_color: '#55704f',
            one_line: '매일 같은 길인데 매일 다른 숲.',
        },
        {
            id: 'b202',
            theme_id: 'nature',
            title: '새를 기다리는 일',
            price: 17500,
            stock: 3,
            sort_order: 2,
            cover_color: '#8a9a8c',
            one_line: '창밖을 오래 보는 사람이 되었어요.',
        },
        {
            id: 'b203',
            theme_id: 'nature',
            title: '바다 곁의 일 년',
            price: 19000,
            stock: 1,
            sort_order: 3,
            cover_color: '#3f6a80',
            one_line: '파도 소리를 받아 적은 열두 달.',
        },
        // 지역과 연대
        {
            id: 'b301',
            theme_id: 'local',
            title: '골목의 가게들',
            price: 16000,
            stock: 5,
            sort_order: 1,
            cover_color: '#8c5e48',
            one_line: '오래된 간판 뒤에 사는 사람들.',
        },
        {
            id: 'b302',
            theme_id: 'local',
            title: '함께 사는 동네',
            price: 17200,
            stock: 0,
            sort_order: 2,
            cover_color: '#5c5a7a',
            one_line: '이웃이라는 말을 다시 배우는 책.',
        },
        {
            id: 'b303',
            theme_id: 'local',
            title: '마을 부엌',
            price: 14800,
            stock: 4,
            sort_order: 3,
            cover_color: '#a07850',
            one_line: '같이 만들고 나눠 먹는 공동 부엌 이야기.',
        },
    ] satisfies ProductSeed[]
).map(makeProduct);
