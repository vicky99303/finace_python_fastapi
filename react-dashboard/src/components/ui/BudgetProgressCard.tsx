import type { BudgetItem } from "../../types/finance";

interface Props {
    budgets: BudgetItem[];
}

export default function BudgetProgressCard({ budgets }: Props) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Budget Progress</h3>
                <p className="text-sm text-slate-500">
                    Track monthly spending against limits
                </p>
            </div>

            <div className="space-y-5">
                {budgets.map((budget) => {
                    const percentage = Math.min((budget.spent / budget.limit) * 100, 100);

                    return (
                        <div key={budget.id}>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    {budget.category}
                                </span>
                                <span className="text-sm text-slate-500">
                                    ${budget.spent} / ${budget.limit}
                                </span>
                            </div>

                            <div className="h-3 w-full rounded-full bg-slate-100">
                                <div
                                    className="h-3 rounded-full bg-slate-900"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}