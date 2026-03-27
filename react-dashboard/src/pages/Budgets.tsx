import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import BudgetListCard from "../components/ui/BudgetListCard.tsx";
import BudgetInsightsCard from "../components/ui/BudgetInsightsCard";
import BudgetComparisonChart from "../components/charts/BudgetComparisonChart";
import {
    budgetItems,
    budgetMonthlyData,
    budgetOverviewCards,
} from "../data/mockData";

export default function Budgets() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Budgets"
                description="Set category limits and monitor spending performance."
                actionLabel="Add Budget"
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {budgetOverviewCards.map((item) => (
                    <StatCard key={item.title} item={item} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <BudgetComparisonChart data={budgetMonthlyData} />
                </div>

                <div>
                    <BudgetInsightsCard items={budgetItems} />
                </div>
            </section>

            <section>
                <BudgetListCard items={budgetItems} />
            </section>
        </div>
    );
}