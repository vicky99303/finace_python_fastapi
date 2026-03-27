import type { SummaryCard } from "../../types/finance";

interface Props {
    item: SummaryCard;
}

export default function StatCard({ item }: Props) {
    const isPositive = item.change >= 0;

    return (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">{item.title}</p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        ${item.value.toLocaleString()}
                    </h3>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isPositive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {isPositive ? "+" : ""}
                    {item.change}%
                </span>
            </div>

            {item.subtitle && (
                <p className="mt-3 text-sm text-slate-500">{item.subtitle}</p>
            )}
        </div>
    );
}