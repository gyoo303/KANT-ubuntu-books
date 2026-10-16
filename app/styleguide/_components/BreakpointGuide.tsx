import { Badge } from '@/shared/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { BREAKPOINTS } from '../_data';

export default function BreakpointGuide() {
    return (
        <div className="grid grid-cols-3 gap-5">
            {BREAKPOINTS.map((bp) => (
                <Card key={bp.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-sans text-xs">
                            {bp.title}
                            {bp.todo && <Badge variant="candle">TODO</Badge>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-ink-2 flex flex-col gap-2 text-xs">
                            {bp.lines.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
