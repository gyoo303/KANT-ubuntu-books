interface SubmittedLetterSummaryProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function formatSubmittedAt(date: Date): string {
    return new Intl.DateTimeFormat('ko-KR', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Seoul',
    }).format(date);
}

// 12 전송 완료 - 접수 정보 (지금은 URL의 ?title=&at= 값을 보여줌)
// TODO: 편지 제출 API가 생기면 ?id= 로 받아서 DB에서 편지를 조회
export default async function SubmittedLetterSummary({
    searchParams,
}: SubmittedLetterSummaryProps) {
    const { title, at } = await searchParams;
    if (typeof title !== 'string' || typeof at !== 'string') return null;

    const submittedAt = new Date(at);
    if (Number.isNaN(submittedAt.getTime())) return null;

    const boxMonth = `${submittedAt.getMonth() + 1}월호`;

    return (
        <dl className="bg-muted mx-auto flex max-w-xl flex-col gap-2 rounded-2xl px-6 py-4 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:rounded-full">
            <div className="flex gap-1.5">
                <dt className="text-muted-foreground">접수</dt>
                <dd className="font-medium">
                    {formatSubmittedAt(submittedAt)}
                </dd>
            </div>
            <div className="flex gap-1.5">
                <dt className="text-muted-foreground">보낸 편지</dt>
                <dd className="font-bold">“{title}”</dd>
            </div>
            <div className="flex gap-1.5">
                <dt className="text-muted-foreground">상자</dt>
                <dd className="font-medium">{boxMonth}</dd>
            </div>
        </dl>
    );
}
