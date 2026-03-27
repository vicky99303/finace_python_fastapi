import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../../types/finance";

interface Props {
    transactions: Transaction[];
}

function getStatusClasses(status: Transaction["status"]) {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";
        case "pending":
            return "bg-amber-100 text-amber-700";
        case "failed":
            return "bg-red-100 text-red-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function TransactionsTable({ transactions }: Props) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">All Transactions</h3>
                <p className="text-sm text-slate-500">{transactions.length} records</p>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-left">
                            <th className="py-3 text-sm font-semibold text-slate-500">Title</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Category</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Type</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Date</th>
                            <th className="py-3 text-sm font-semibold text-slate-500">Status</th>
                            <th className="py-3 text-sm font-semibold text-slate-500 text-right">
                                Amount
                            </th>
                            <th className="py-3 text-sm font-semibold text-slate-500 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-slate-100">
                                <td className="py-4 text-sm font-medium text-slate-900">{tx.title}</td>
                                <td className="py-4 text-sm text-slate-600">{tx.category}</td>
                                <td className="py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${tx.type === "income"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="py-4 text-sm text-slate-600">{tx.date}</td>
                                <td className="py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                            tx.status
                                        )}`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                                <td
                                    className={`py-4 text-right text-sm font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
                                            <Eye size={16} />
                                        </button>
                                        <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-10 text-center text-sm text-slate-500">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}