import { useEffect, useRef, useState } from "react";
import StatCard from "../components/ui/StatCard";
import RecentTransactionsTable from "../components/ui/RecentTransactionsTable";
import BudgetProgressCard from "../components/ui/BudgetProgressCard";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import { getDashboardData } from "../services/dashboardService";
import type { SummaryCard, Transaction } from "../types/finance";

interface MonthlyOverviewItem {
    month: string;
    income: number;
    expenses: number;
}

interface ExpenseBreakdownItem {
    name: string;
    value: number;
}

function mapSummaryCards(data: {
    total_balance?: number;
    total_income?: number;
    total_expense?: number;
}): SummaryCard[] {
    const totalBalance = data.total_balance ?? 0;
    const totalIncome = data.total_income ?? 0;
    const totalExpense = data.total_expense ?? 0;
    const savings = totalIncome - totalExpense;

    return [
        {
            title: "Total Balance",
            value: totalBalance,
            change: 0,
            subtitle: "Current available balance",
        },
        {
            title: "Income",
            value: totalIncome,
            change: 0,
            subtitle: "Total recorded income",
        },
        {
            title: "Expenses",
            value: totalExpense,
            change: 0,
            subtitle: "Total recorded expenses",
        },
        {
            title: "Savings",
            value: savings,
            change: 0,
            subtitle: "Income minus expenses",
        },
    ];
}

function mapTransactions(items: Array<{
    id: number;
    description?: string | null;
    category_id?: number | null;
    amount: number;
    type: string;
    date?: string | null;
}>): Transaction[] {
    return items.map((item) => ({
        id: item.id,
        title: item.description || "Transaction",
        category: item.category_id ? `Category #${item.category_id}` : "Uncategorized",
        amount: item.amount,
        type: item.type === "deposit" ? "income" : "expense",
        date: item.date ? item.date.split("T")[0] : "-",
        status: "completed",
    }));
}

export default function Dashboard() {
    const hasFetched = useRef(false);

    const [summaryCards, setSummaryCards] = useState<SummaryCard[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [budgetItems] = useState([]);
    const [monthlyOverview, setMonthlyOverview] = useState<MonthlyOverviewItem[]>([]);
    const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdownItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getDashboardData();

                setSummaryCards(mapSummaryCards(data));
                setRecentTransactions(mapTransactions(data.transactions ?? []));
                setMonthlyOverview([]);
                setExpenseBreakdown([]);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="min-w-0 space-y-6">
            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                    Loading dashboard...
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
                        {summaryCards.map((item) => (
                            <StatCard key={item.title} item={item} />
                        ))}
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            {monthlyOverview.length > 0 ? (
                                <IncomeExpenseChart data={monthlyOverview} />
                            ) : (
                                <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold text-slate-900">Income vs Expenses</h3>
                                        <p className="text-sm text-slate-500">Monthly overview data is not available yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            {expenseBreakdown.length > 0 ? (
                                <ExpensePieChart data={expenseBreakdown} />
                            ) : (
                                <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold text-slate-900">Expense Breakdown</h3>
                                        <p className="text-sm text-slate-500">Expense category data is not available yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <RecentTransactionsTable transactions={recentTransactions} />
                        </div>

                        <div>
                            {budgetItems.length > 0 ? (
                                <BudgetProgressCard budgets={budgetItems} />
                            ) : (
                                <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900">Budget Progress</h3>
                                        <p className="text-sm text-slate-500">Budget data is not available yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}