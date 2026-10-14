'use client';

import {
    LETTER_CONTENT_MAX_LENGTH,
    LETTER_CONTENT_MIN_LENGTH,
    LETTER_TITLE_MAX_LENGTH,
    validateLetter,
} from '@/domains/letters/utils/validateLetter';
import { buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/navigation';
import { FormEvent, KeyboardEvent, useState } from 'react';
import { FiMail, FiPlus } from 'react-icons/fi';

interface LetterFormProps {
    moodTags: string[];
}

// 11 편지 쓰기 폼: 제목, 본문, 마음 날씨 태그
export default function LetterForm({ moodTags }: LetterFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagOptions, setTagOptions] = useState(moodTags);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [customTag, setCustomTag] = useState('');
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const contentLength = content.trim().length;

    function toggleTag(tag: string) {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    }

    // "직접 쓰기"로 태그 추가 (Enter)
    function handleCustomTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
        e.preventDefault();

        const word = customTag.trim().replace(/^#/, '');
        if (word) {
            const tag = `#${word}`;
            if (!tagOptions.includes(tag)) setTagOptions([...tagOptions, tag]);
            if (!selectedTags.includes(tag))
                setSelectedTags([...selectedTags, tag]);
        }
        setCustomTag('');
        setIsAddingTag(false);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const draft = { title, content, mood_tags: selectedTags };
        const validationErrors = validateLetter(draft);
        setErrors(validationErrors);
        if (validationErrors.length > 0) return;

        // TODO: 편지 제출 API가 생기면 여기서 저장하고, 응답의 편지 id로 이동
        const params = new URLSearchParams({
            title: title.trim(),
            at: new Date().toISOString(),
        });
        router.push(`/subscription/complete?${params.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* 편지지 */}
            <div className="border-border bg-card relative rounded-2xl border p-6 shadow-sm md:p-12">
                {/* 우표 자리 */}
                <div
                    aria-hidden
                    className="border-border text-muted-foreground absolute top-6 right-6 hidden size-16 rotate-3 items-center justify-center rounded-sm border-2 border-dashed text-[10px] md:flex"
                >
                    어은동
                </div>

                <p className="text-muted-foreground text-sm">
                    To. 우분투북스 책방지기님
                </p>

                <label htmlFor="letter-title" className="sr-only">
                    편지 제목
                </label>
                <input
                    id="letter-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={LETTER_TITLE_MAX_LENGTH}
                    placeholder="편지 제목을 적어주세요"
                    className="border-border placeholder:text-muted-foreground/60 mt-4 w-full border-b bg-transparent pb-4 text-xl font-bold outline-none md:w-[85%] md:text-2xl"
                />

                <label htmlFor="letter-content" className="sr-only">
                    편지 본문
                </label>
                {/* 줄 노트 배경: 40px 마다 한 줄 */}
                <textarea
                    id="letter-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={LETTER_CONTENT_MAX_LENGTH}
                    rows={10}
                    placeholder="요즘의 마음, 최근 읽은 책, 피하고 싶은 이야기를 편하게 적어주세요."
                    className="placeholder:text-muted-foreground/60 mt-2 w-full resize-none bg-transparent bg-[repeating-linear-gradient(transparent,transparent_39px,var(--color-border)_39px,var(--color-border)_40px)] text-base leading-10 outline-none"
                />

                <p
                    className={cn(
                        'mt-2 text-right text-xs',
                        contentLength < LETTER_CONTENT_MIN_LENGTH
                            ? 'text-muted-foreground'
                            : 'text-foreground',
                    )}
                >
                    <strong>{contentLength}</strong> /{' '}
                    {LETTER_CONTENT_MAX_LENGTH}자 · 최소{' '}
                    {LETTER_CONTENT_MIN_LENGTH}자
                </p>

                {/* 계절과 마음 날씨 태그 */}
                <fieldset className="mt-8">
                    <div className="flex items-baseline justify-between">
                        <legend className="text-sm font-medium">
                            계절과 마음 날씨
                        </legend>
                        <span className="text-muted-foreground text-xs">
                            여러 개 골라도 좋아요
                        </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tagOptions.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => toggleTag(tag)}
                                    className={cn(
                                        'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                                        isSelected
                                            ? 'border-primary bg-primary text-primary-foreground font-semibold'
                                            : 'border-border hover:bg-muted',
                                    )}
                                >
                                    {tag}
                                </button>
                            );
                        })}

                        {isAddingTag ? (
                            <input
                                autoFocus
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                onKeyDown={handleCustomTagKeyDown}
                                onBlur={() => setIsAddingTag(false)}
                                placeholder="입력 후 Enter"
                                className="border-border w-32 rounded-full border border-dashed px-3.5 py-1.5 text-sm outline-none"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsAddingTag(true)}
                                className="border-border text-muted-foreground hover:bg-muted flex items-center gap-1 rounded-full border border-dashed px-3.5 py-1.5 text-sm"
                            >
                                <FiPlus className="size-3.5" />
                                직접 쓰기
                            </button>
                        )}
                    </div>
                </fieldset>
            </div>

            {/* 에러 메시지 */}
            {errors.length > 0 && (
                <ul
                    role="alert"
                    className="text-destructive mt-4 space-y-1 text-sm"
                >
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        'h-12 rounded-full px-7 text-base',
                    )}
                >
                    <FiMail />
                    우체통에 편지 넣기
                </button>
            </div>
        </form>
    );
}
