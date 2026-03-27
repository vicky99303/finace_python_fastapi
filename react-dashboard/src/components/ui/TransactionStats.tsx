interface Props {
    income: number;
    expenses: number;
    total: number;
}

export default function TransactionStats({ income, expenses, total }: Props) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Total Transactions</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-900">{total}</h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Total Income</p>
                <h3 className="mt-3 text-3xl font-bold text-green-600">
                    +${income.toLocaleString()}
                </h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Total Expenses</p>
                <h3 className="mt-3 text-3xl font-bold text-red-600">
                    -${expenses.toLocaleString()}
                </h3>
            </div>
        </section>
    );
}