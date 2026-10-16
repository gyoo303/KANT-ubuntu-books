'use client';

/**
 * 소셜 로그인 버튼 (form 안에서 submit 버튼으로 쓴다)
 * useFormStatus로 "이동 중" 상태를 읽어, 네이버 로그인 화면으로 넘어가는 동안
 * 버튼을 비활성화하고 문구를 바꾼다. (연타로 요청이 여러 번 가는 것을 막는다)
 */
import { cn } from '@/shared/utils/cn';
import { useFormStatus } from 'react-dom';

export default function SocialSubmitButton({
    className,
    icon,
    label,
}: {
    className: string;
    icon: React.ReactNode;
    label: string;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className={cn(
                'flex h-14 w-full items-center justify-center gap-2.5 rounded-[10px] text-[15px] font-bold transition-opacity hover:opacity-90 disabled:opacity-60',
                className,
            )}
        >
            {icon}
            {pending ? '이동하고 있어요…' : label}
        </button>
    );
}
