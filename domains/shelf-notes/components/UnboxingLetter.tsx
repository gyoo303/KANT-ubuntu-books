import type { UnboxingDetail } from '@/domains/shelf-notes/types/shelfNote.types';

// 책방지기의 편지 (줄 노트 위에 쓴 느낌)
export default function UnboxingLetter({
    letter,
}: {
    letter: UnboxingDetail['letter'];
}) {
    return (
        <article className="border-ub-line font-ub-serif rounded-[14px] border bg-[#fdf8ef] bg-[radial-gradient(#efe3cf_1px,transparent_1px)] bg-[length:6px_6px] px-7 py-10 shadow-[0_10px_24px_rgba(80,60,30,0.08)] md:px-[52px] md:py-[56px]">
            <p className="text-ub-olive text-[13.5px]">From. {letter.from}</p>
            <h2 className="mt-3 text-[24px] md:text-[28px]">{letter.title}</h2>
            {/* 글자 아래마다 줄을 그어 편지지처럼 */}
            <p className="mt-6 bg-[linear-gradient(transparent_39px,#e6dccb_39px)] bg-[length:100%_40px] text-[16px] leading-[40px] md:text-[16.5px]">
                {letter.body}
            </p>
            <p className="text-ub-sub mt-6 text-right text-[15px]">
                — {letter.sign}
            </p>
        </article>
    );
}
