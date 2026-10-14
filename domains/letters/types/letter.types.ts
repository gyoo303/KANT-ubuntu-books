// 편지 쓰기 폼에서 입력하는 값
export interface LetterDraft {
    title: string;
    content: string;
    mood_tags: string[];
}

// 우체통에 넣은(제출된) 편지
export interface SubmittedLetter extends LetterDraft {
    id: string;
    box_month: string; // 이 편지에 답장으로 오는 상자 (예: '10월호')
    submitted_at: string;
}
