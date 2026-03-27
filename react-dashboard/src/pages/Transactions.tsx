import { useMemo, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import TransactionStats from "../components/ui/TransactionStats";
import TransactionFilters from "../components/ui/TransactionFilters";
import TransactionsTable from "../components/ui/TransactionsTable";
import { allTransactions } from "../data/mockData";

export default function Transactions() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");

    const filteredTransactions = useMemo(() => {
        return allTransactions.filter((tx) => {
            const matchesSearch =
                tx.title.toLowerCase().includes(search.toLowerCase()) ||
                tx.category.toLowerCase().includes(search.toLowerCase());

            const matchesType = selectedType === "all" ? true : tx.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [search, selectedType]);

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
        </div>
    );
}