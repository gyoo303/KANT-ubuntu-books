import { COLOR_ROWS } from '../_data';

export default function ColorPalette() {
    return (
        <div className="flex flex-col gap-6">
            {COLOR_ROWS.map((row, i) => (
                <ul key={i} className="grid grid-cols-8 gap-3">
                    {row.map((color) => (
                        <li key={color.token}>
                            <div
                                className="border-line h-16 rounded-lg border"
                                style={{
                                    backgroundColor: `var(--color-${color.token})`,
                                }}
                            />
                            <p className="mt-2 text-xs font-medium">
                                {color.name}
                            </p>
                            <p className="text-muted-foreground text-[11px]">
                                {color.hex} · {color.token}
                            </p>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}
