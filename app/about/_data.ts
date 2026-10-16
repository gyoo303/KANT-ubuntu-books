// 브랜드 스토리(/about) 페이지 콘텐츠
// 문구·데이터 수정은 이 파일에서만 하면 됩니다.
import type { LucideIcon } from 'lucide-react';
import { MapPin, Soup, Sprout, TreeDeciduous } from 'lucide-react';

export type GalleryArea = 'main' | 'shelf' | 'garden' | 'talk';

export interface GalleryItem {
    id: GalleryArea;
    src: string;
    alt: string;
    // 칸 비율에 맞춰 잘릴 때 보여줄 중심 위치 (CSS object-position)
    position?: string;
}

export interface Theme {
    no: string;
    tag: string;
    icon: LucideIcon;
    title: string;
    desc: string;
}

// 이미지 파일: public/images/about/
export const GALLERY: GalleryItem[] = [
    {
        id: 'main',
        src: '/images/about/storefront.webp',
        alt: '초록 간판의 우분투북스 서점 외관과 활짝 열린 문',
    },
    {
        id: 'shelf',
        src: '/images/about/bookshelf.webp',
        alt: '나무 서가 앞에서 책을 읽는 책방지기',
    },
    {
        id: 'garden',
        src: '/images/about/readers.webp',
        alt: '‘네가 있어 내가 있다’ 책으로 얼굴을 가린 독자들',
        position: 'center 30%',
    },
    {
        id: 'talk',
        src: '/images/about/table.webp',
        alt: '나무 테이블 위에 놓인 ‘네가 있어 내가 있다’ 책과 소품들',
        position: 'center 65%',
    },
];

export const THEMES: Theme[] = [
    {
        no: '01',
        tag: '자연',
        icon: TreeDeciduous,
        title: '자연과 함께 머물기',
        desc: '숲과 바다, 계절의 변화를 천천히 바라보는 책. 바쁜 하루 사이에 숨 쉴 틈을 내어주는 문장들.',
    },
    {
        no: '02',
        tag: '생태',
        icon: Sprout,
        title: '도심 속 텃밭과 흙',
        desc: '베란다 화분 하나에서 시작하는 생태 이야기. 흙을 만지는 삶과 지구를 돌보는 일.',
    },
    {
        no: '03',
        tag: '건강한 식문화',
        icon: Soup,
        title: '치유의 식탁',
        desc: '제철 재료, 느린 요리, 함께 먹는 밥. 몸과 마음을 함께 돌보는 식탁에 관한 책.',
    },
    {
        no: '04',
        tag: '지역 로컬',
        icon: MapPin,
        title: '지역과 연대',
        desc: '대전과 작은 동네들, 로컬 생산자와 이웃의 이야기. 곁에 있는 사람들을 다시 보게 하는 책.',
    },
];
