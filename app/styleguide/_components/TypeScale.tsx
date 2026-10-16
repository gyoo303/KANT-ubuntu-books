import { TYPE_SCALE } from '../_data';

export default function TypeScale() {
    return (
        <dl>
            {TYPE_SCALE.map((type) => (
                <div
                    key={type.label}
                    className="border-line grid grid-cols-[180px_1fr] items-center gap-6 border-b py-5"
                >
                    <dt className="text-muted-foreground text-[11px] leading-relaxed">
                        {type.label}
                        <br />
                        {type.spec}
                        <br />
                        <code className="text-olive">{type.className}</code>
                    </dt>
                    <dd className={type.className}>{type.sample}</dd>
                </div>
            ))}
        </dl>
    );
}
