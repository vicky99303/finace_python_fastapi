import { Building2, CreditCard, Wallet } from "lucide-react";
import type { AccountItem } from "../../types/finance";

interface Props {
    accounts: AccountItem[];
}

function getAccountIcon(type: AccountItem["type"]) {
    switch (type) {
        case "bank":
            return Building2;
        case "wallet":
            return Wallet;
        case "credit":
            return CreditCard;
        default:
            return Building2;
    }
}

function getTypeBadge(type: AccountItem["type"]) {
    switch (type) {
        case "bank":
            return "bg-blue-100 text-blue-700";
        case "wallet":
            return "bg-green-100 text-green-700";
        case "credit":
            return "bg-amber-100 text-amber-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function AccountsListCard({ accounts }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Accounts</h3>
                    <p className="text-sm text-slate-500">
                        Linked balances and account status
                    </p>
                </div>

                <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {accounts.map((account) => {
                    const Icon = getAccountIcon(account.type);

                    return (
                        <div
                            key={account.id}
                            className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-3">
                                    <Icon size={18} className="text-slate-700" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {account.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {account.accountNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getTypeBadge(
                                        account.type
                                    )}`}
                                >
                                    {account.type}
                                </span>
                                <p className="text-sm font-bold text-slate-900">
                                    ${account.balance.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {accounts.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-500">
                        No accounts available.
                    </div>
                )}
            </div>
        </div>
    );
}