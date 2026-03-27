import type { Transaction } from "../../types/finance";

interface Props {
    transactions: Transaction[];
}

export default function RecentTransactionsTable({ transactions }: Props) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                    Recent Transactions
                </h3>
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-left">
                            <th className="py-3 text-sm font-semibold text-slate-500">Title</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Category</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Date</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Status</th>
                            <th className="py-3 text-sm font-semibold text-slate-500 text-right">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-slate-100">
                                <td className="py-4 text-sm font-medium text-slate-900">{tx.title}</td>
                                <td className="py-4 text-sm text-slate-600">{tx.category}</td>
                                <td className="py-4 text-sm text-slate-600">{tx.date}</td>
                                <td className="py-4">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                        {tx.status}
                                    </span>
                                </td>
                                <td
                                    className={`py-4 text-sm font-semibold text-right ${tx.type === "income" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}