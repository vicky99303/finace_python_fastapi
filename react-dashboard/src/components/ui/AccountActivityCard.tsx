import type { AccountActivity } from "../../types/finance";

interface Props {
    activities: AccountActivity[];
}

export default function AccountActivityCard({ activities }: Props) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Recent Account Activity
                </h3>
                <p className="text-sm text-slate-500">
                    Latest credits and debits across your accounts
                </p>
            </div>

            <div className="space-y-4">
                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                    >
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">
                                {item.account} • {item.date}
                            </p>
                        </div>

                        <p
                            className={`text-sm font-semibold ${item.type === "credit" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {item.type === "credit" ? "+" : "-"}${item.amount.toLocaleString()}
                        </p>
                    </div>
                ))}

                {activities.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-500">
                        No account activity found.
                    </div>
                )}
            </div>
        </div>
    );
}