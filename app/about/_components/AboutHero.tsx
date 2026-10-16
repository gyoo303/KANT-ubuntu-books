export default function AboutHero() {
    return (
        <section className="pt-18 pb-16 text-center">
            <div className="max-w-page mx-auto w-full px-6">
                <p className="typo-eyebrow text-olive">BRAND STORY · /about</p>
                <h1 className="typo-display mt-3.5">
                    네가 있어
                    <br />
                    내가 있다
                </h1>
                <p className="text-muted-foreground mt-[18px] text-[11px] tracking-[0.06em]">
                    UBUNTU · Umuntu ngumuntu ngabantu
                </p>
                <p className="text-ink-2 mt-[30px] text-[13px] leading-[1.85]">
                    남아프리카의 오래된 말, 우분투. 사람은 다른 사람을 통해
                    비로소 사람이 된다는 뜻이에요.
                    <br className="max-sm:hidden" />책 한 권이 한 사람에게 닿는
                    일도 그렇다고 믿어서, 이 이름을 골랐습니다.
                </p>
            </div>
        </section>
    );
}
