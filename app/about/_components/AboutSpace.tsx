import { SHOP_INFO } from '@/shared/constants/shop';
import SectionHeading from './SectionHeading';

const INFO_ROWS = [
    { label: '주소', value: SHOP_INFO.address },
    { label: '영업시간', value: SHOP_INFO.hours },
    {
        label: '문의',
        value: `${SHOP_INFO.phone} · 카카오톡 채널 ${SHOP_INFO.kakao}`,
    },
];

export default function AboutSpace() {
    return (
        <section className="pt-20 pb-16 sm:pt-30 sm:pb-24">
            <div className="max-w-page mx-auto grid w-full grid-cols-1 gap-7 px-6 md:grid-cols-2 md:gap-12">
                <div>
                    <SectionHeading eyebrow="THE SPACE">
                        대전 어은동,
                        <br />
                        골목 끝 작은 책방
                    </SectionHeading>
                </div>

                <div className="text-ink-2 text-xs leading-[1.95]">
                    <p>
                        대학가와 오래된 주택이 섞인 어은동 골목에 작은 책방을
                        열었어요. 커다란 창 앞에 앉아 책을 고르고, 저녁이면
                        창가에 불을 켭니다.
                    </p>
                    <p className="mt-3">
                        빠르게 많이 파는 곳보다, 한 사람에게 오래 남는 책을
                        건네는 곳이고 싶어요. 그래서 온라인에서도 편지를 받고,
                        천천히 읽고, 책으로 답장하는 방식을 택했습니다.
                    </p>

                    <dl className="border-line mt-7 border-t">
                        {INFO_ROWS.map((row) => (
                            <div
                                key={row.label}
                                className="border-line grid grid-cols-[64px_1fr] border-b py-[9px] text-[11px]"
                            >
                                <dt className="text-muted">{row.label}</dt>
                                <dd className="text-ink">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
