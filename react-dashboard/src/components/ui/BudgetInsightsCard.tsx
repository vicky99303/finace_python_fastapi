import type { BudgetItem } from "../../types/finance";

interface Props {
    items: BudgetItem[];
}

export default function BudgetInsightsCard({ items }: Props) {
    const overLimit = items.filter((item) => item.spent > item.limit);
    const highest = [...items].sort((a, b) => b.spent - a.spent)[0];
    const remaining = items.reduce((sum, item) => sum + (item.limit - item.spent), 0);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Budget Insights</h3>
            <p className="mt-1 text-sm text-slate-500">
                Quick view of key budget observations
            </p>

            <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Top spending category</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                        {highest?.category ?? "-"}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Over limit categories</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                        {overLimit.length}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Remaining budget</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                        ${remaining.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}