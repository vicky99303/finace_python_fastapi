import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import BudgetListCard from "../components/ui/BudgetListCard";
import BudgetInsightsCard from "../components/ui/BudgetInsightsCard";
import BudgetComparisonChart from "../components/charts/BudgetComparisonChart";
import { getBudgetData } from "../services/budgetService";
import type { BudgetItem, BudgetMonthlyData, SummaryCard } from "../types/finance";

function mapBudgetOverviewCards(data: {
    total_budget?: number;
    total_spent?: number;
    remaining?: number;
    over_limit_categories?: number;
}): SummaryCard[] {
    return [
        {
            title: "Total Budget",
            value: data.total_budget ?? 0,
            change: 0,
            subtitle: "Planned this period",
        },
        {
            title: "Total Spent",
            value: data.total_spent ?? 0,
            change: 0,
            subtitle: "Used so far",
        },
        {
            title: "Remaining",
            value: data.remaining ?? 0,
            change: 0,
            subtitle: "Available balance",
        },
        {
            title: "Over Limit Categories",
            value: data.over_limit_categories ?? 0,
            change: 0,
            subtitle: "Needs attention",
        },
    ];
}

function mapBudgetItems(
    items: Array<{
        id: number;
        category_id?: number | null;
        category_name?: string | null;
        amount: number;
        spent?: number;
    }>
): BudgetItem[] {
    return items.map((item) => ({
        id: item.id,
        category: item.category_name || (item.category_id ? `Category #${item.category_id}` : "Uncategorized"),
        spent: item.spent ?? 0,
        limit: item.amount ?? 0,
    }));
}

export default function Budgets() {
    const hasFetched = useRef(false);

    const [budgetOverviewCards, setBudgetOverviewCards] = useState<SummaryCard[]>([]);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [budgetMonthlyData, setBudgetMonthlyData] = useState<BudgetMonthlyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchBudgets = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBudgetData();

                setBudgetOverviewCards(mapBudgetOverviewCards(data));
                setBudgetItems(mapBudgetItems(data.budgets ?? []));
                setBudgetMonthlyData(data.monthly_data ?? []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    return (
        <div className="min-w-0 space-y-6">
            <PageHeader
                title="Budgets"
                description="Set category limits and monitor spending performance."
                actionLabel="Add Budget"
            />

            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                    Loading budgets...
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {budgetOverviewCards.map((item) => (
                            <StatCard key={item.title} item={item} />
                        ))}
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            {budgetMonthlyData.length > 0 ? (
                                <BudgetComparisonChart data={budgetMonthlyData} />
                            ) : (
                                <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold text-slate-900">Budget vs Actual</h3>
                                        <p className="text-sm text-slate-500">Monthly budget chart data is not available yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <BudgetInsightsCard items={budgetItems} />
                        </div>
                    </section>

                    <section>
                        <BudgetListCard items={budgetItems} />
                    </section>
                </>
            )}
        </div>
    );
}