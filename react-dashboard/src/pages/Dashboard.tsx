import StatCard from "../components/ui/StatCard";
import RecentTransactionsTable from "../components/ui/RecentTransactionsTable";
import BudgetProgressCard from "../components/ui/BudgetProgressCard";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import {
    budgetItems,
    expenseBreakdown,
    monthlyOverview,
    recentTransactions,
    summaryCards,
} from "../data/mockData";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((item) => (
                    <StatCard key={item.title} item={item} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <IncomeExpenseChart data={monthlyOverview} />
                </div>

                <div>
                    <ExpensePieChart data={expenseBreakdown} />
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RecentTransactionsTable transactions={recentTransactions} />
                </div>

                <div>
                    <BudgetProgressCard budgets={budgetItems} />
                </div>
            </section>
        </div>
    );
}