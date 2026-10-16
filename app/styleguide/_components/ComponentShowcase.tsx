import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Chip } from '@/shared/components/ui/chip';
import { Input } from '@/shared/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Mail, Plus } from 'lucide-react';
import { STATUS_SAMPLES } from '../_data';

export default function ComponentShowcase() {
    return (
        <div className="grid grid-cols-3 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Button</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-2">
                    <Button>편지로 구독하기</Button>
                    <Button variant="ink">봉인 풀기</Button>
                    <Button variant="outline">돌아가기</Button>
                    <Button variant="secondary" size="sm">
                        작은 버튼
                    </Button>
                    <Button variant="ghost" size="sm">
                        고스트
                    </Button>
                    <Button size="lg">
                        <Mail data-icon="inline-start" />
                        우체통에 편지 넣기
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Status badge · LetterDeskStatus</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-2">
                    {STATUS_SAMPLES.map((status) => (
                        <Badge
                            key={status.variant}
                            variant={status.variant}
                            dot
                        >
                            {status.label}
                        </Badge>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mood tag chip</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                        <Chip defaultPressed>#비오는날</Chip>
                        <Chip>#늦가을</Chip>
                        <Button variant="outline" size="xs">
                            <Plus data-icon="inline-start" />
                            직접 쓰기
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Chip size="sm" defaultPressed>
                            가을
                        </Chip>
                        <Chip size="sm">겨울</Chip>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Input
                        placeholder="기본 · 플레이스홀더"
                        aria-label="기본"
                    />
                    <Input
                        defaultValue="포커스 상태"
                        aria-label="포커스 상태"
                        className="border-ring ring-ring/15 ring-3"
                    />
                    <div>
                        <Input
                            defaultValue="잘못된 코드"
                            aria-label="잘못된 코드"
                            aria-invalid
                            aria-describedby="styleguide-input-error"
                        />
                        <p
                            id="styleguide-input-error"
                            className="text-destructive mt-1.5 text-[11px]"
                        >
                            코드가 맞지 않아요. 카드를 다시 확인해 주세요.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Control</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-xs">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5">
                            <Checkbox defaultChecked />
                            체크
                        </label>
                        <label className="flex items-center gap-1.5">
                            <Checkbox />
                            미체크
                        </label>
                    </div>
                    <RadioGroup
                        defaultValue="monthly"
                        aria-label="구독 주기"
                        className="flex gap-4"
                    >
                        <label className="flex items-center gap-1.5">
                            <RadioGroupItem value="monthly" />
                            매달
                        </label>
                        <label className="flex items-center gap-1.5">
                            <RadioGroupItem value="season" />
                            계절마다
                        </label>
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card size="sm" className="bg-paper-2 self-start ring-0">
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                    6자리 해제 코드 입력 · 블라인드 책 표지 · 창가의 촛불 위젯은
                    각 기능 담당 영역에서 만듭니다.
                </CardContent>
            </Card>
        </div>
    );
}
