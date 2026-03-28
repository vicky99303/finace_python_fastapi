import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import TransactionStats from "../components/ui/TransactionStats";
import TransactionFilters from "../components/ui/TransactionFilters";
import TransactionsTable from "../components/ui/TransactionsTable";
import type { Transaction } from "../types/finance";
import { getTransactions } from "../services/transactionService";

export default function Transactions() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getTransactions();
                setTransactions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            const matchesSearch =
                tx.title.toLowerCase().includes(search.toLowerCase()) ||
                tx.category.toLowerCase().includes(search.toLowerCase());

            const matchesType = selectedType === "all" ? true : tx.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [transactions, search, selectedType]);

    const incomeTotal = filteredTransactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

    const expenseTotal = filteredTransactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="min-w-0 space-y-6">
            <PageHeader
                title="Transactions"
                description="Track and manage all your income and expense records."
                actionLabel="Add Transaction"
            />

            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                    Loading transactions...
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <TransactionStats
                        total={filteredTransactions.length}
                        income={incomeTotal}
                        expenses={expenseTotal}
                    />

                    <TransactionFilters
                        search={search}
                        selectedType={selectedType}
                        onSearchChange={setSearch}
                        onTypeChange={setSelectedType}
                    />

                    <TransactionsTable transactions={filteredTransactions} />
                </>
            )}
        </div>
    );
}