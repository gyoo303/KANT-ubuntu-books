import { cn } from '@/shared/utils/cn';
import Image from 'next/image';
import { GALLERY, type GalleryArea } from '../_data';

// 모바일: 대표 사진 1단 → 작은 사진 2장 → 와이드 1장
// sm 이상: 왼쪽 대표 사진(2행) + 오른쪽 작은 사진 2장 / 와이드 1장
const AREA_CLASS: Record<GalleryArea, string> = {
    main: 'col-span-2 sm:col-span-1 sm:row-span-2',
    shelf: '',
    garden: '',
    talk: 'col-span-2',
};

// 칸 너비 기준 반응형 이미지 크기 (컨테이너 최대 992px)
const AREA_SIZES: Record<GalleryArea, string> = {
    main: '(min-width: 640px) 50vw, 100vw',
    shelf: '(min-width: 640px) 25vw, 50vw',
    garden: '(min-width: 640px) 25vw, 50vw',
    talk: '(min-width: 640px) 50vw, 100vw',
};

export default function AboutGallery() {
    return (
        <section aria-label="책방 사진">
            <div className="max-w-page mx-auto w-full px-6">
                <div className="grid grid-cols-2 grid-rows-[220px_130px_130px] gap-2.5 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-[170px_170px]">
                    {GALLERY.map((item) => (
                        <figure
                            key={item.id}
                            className={cn(
                                'bg-stripes relative overflow-hidden rounded-md border border-[#e3d8c4]',
                                AREA_CLASS[item.id],
                            )}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes={AREA_SIZES[item.id]}
                                preload={item.id === 'main'}
                                className="object-cover"
                                style={{ objectPosition: item.position }}
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
