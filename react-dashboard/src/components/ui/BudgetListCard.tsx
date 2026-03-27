import type { BudgetItem } from "../../types/finance";

interface Props {
  items: BudgetItem[];
}

function getProgressColor(spent: number, limit: number) {
  const percent = (spent / limit) * 100;

  if (percent >= 100) return "bg-red-500";
  if (percent >= 80) return "bg-amber-500";
  return "bg-slate-900";
}

export default function BudgetListCard({ items }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Category Budgets
          </h3>
          <p className="text-sm text-slate-500">
            Spending progress for each category
          </p>
        </div>

        <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
          Manage
        </button>
      </div>

      {/* Budget List */}
      <div className="space-y-5">
        {items.map((item) => {
          const percent = Math.min((item.spent / item.limit) * 100, 100);

          return (
            <div key={item.id}>
              {/* Top Row */}
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.category}
                  </p>
                  <p className="text-xs text-slate-500">
                    ${item.spent.toLocaleString()} spent of $
                    {item.limit.toLocaleString()}
                  </p>
                </div>

                <span className="text-sm font-medium text-slate-600">
                  {percent.toFixed(0)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 w-full rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full transition-all ${getProgressColor(
                    item.spent,
                    item.limit
                  )}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-500">
            No budget categories available.
          </div>
        )}
      </div>
    </div>
  );
}