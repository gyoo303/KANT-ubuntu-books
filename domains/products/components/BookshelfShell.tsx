// 테마 서가 화면 공통: 바탕색 + 가운데 정렬 (글꼴은 app/layout.tsx 의 팀 공통 글꼴 사용)
export default function BookshelfShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-paper text-ink pb-20">
            <div className="max-w-page mx-auto px-4 md:px-6">{children}</div>
        </div>
    );
}
