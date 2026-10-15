import { FaqItem } from '@/domains/subscription/types/subscription.types';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface SubscriptionFaqProps {
    items: FaqItem[];
}

// <details> 태그로 열고 닫는 FAQ (자바스크립트 없이 동작)
export default function SubscriptionFaq({ items }: SubscriptionFaqProps) {
    return (
        <div className="border-border border-t">
            {items.map((item, index) => (
                <details
                    key={item.question}
                    open={index === 0}
                    className="group border-border border-b"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <FiPlus className="text-muted-foreground size-4 shrink-0 group-open:hidden" />
                        <FiMinus className="text-muted-foreground hidden size-4 shrink-0 group-open:block" />
                    </summary>
                    <p className="text-muted-foreground max-w-2xl pb-5 text-sm leading-relaxed">
                        {item.answer}
                    </p>
                </details>
            ))}
        </div>
    );
}
