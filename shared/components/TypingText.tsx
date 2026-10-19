import {
    TYPE_IN,
    typeInStyle,
    type TypeInValues,
} from '@/shared/constants/motion';
import { Children, type ReactNode } from 'react';

interface TypingTextProps extends TypeInValues {
    children: ReactNode;
}

// 문장을 글자 단위로 나눠 TYPE_IN 효과로 한 글자씩 나타나게 한다
// - 글자 자리는 처음부터 잡혀 있어(투명) 타이핑 중에도 줄바꿈·레이아웃이 흔들리지 않는다.
// - <br> 같은 요소는 그대로 두고, 앞뒤 문자열의 글자 순서는 이어서 센다.
// - 스크린리더에는 글자로 쪼개지 않은 원문을 읽어 준다.
// 요소가 처음 그려질 때 재생된다. 스크롤해야 보이는 위치라면 PlayOnView 로 감싼다.
export default function TypingText({ children, ...values }: TypingTextProps) {
    let index = 0;
    const typed = Children.map(children, (child) => {
        if (typeof child !== 'string' && typeof child !== 'number') {
            return child;
        }
        return Array.from(String(child)).map((char) => {
            const i = index++;
            return (
                <span
                    key={i}
                    className={TYPE_IN}
                    style={typeInStyle(values, i)}
                >
                    {char}
                </span>
            );
        });
    });

    return (
        <>
            <span className="sr-only">{children}</span>
            <span aria-hidden>{typed}</span>
        </>
    );
}
