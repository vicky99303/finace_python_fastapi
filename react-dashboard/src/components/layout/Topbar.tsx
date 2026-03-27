import { Bell, Search, UserCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles: Record<string, { title: string; subtitle: string }> = {
    "/": {
        title: "Overview",
        subtitle: "Welcome back, here is your financial summary",
    },
    "/transactions": {
        title: "Transactions",
        subtitle: "Review and manage all transaction activity",
    },
    "/budgets": {
        title: "Budgets",
        subtitle: "Track spending performance against budget limits",
    },
    "/accounts": {
        title: "Accounts",
        subtitle: "Monitor balances across banks, wallets, and cards",
    },
    "/reports": {
        title: "Reports",
        subtitle: "Analyze trends and export financial summaries",
    },
    "/settings": {
        title: "Settings",
        subtitle: "Manage account, preferences, and security",
    },
};

export default function Topbar() {
    const location = useLocation();
    const current = titles[location.pathname] ?? titles["/"];

    return (
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 md:px-6">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">{current.title}</h2>
                <p className="text-sm text-slate-500">{current.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                </div>

                <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
                    <Bell size={18} className="text-slate-600" />
                </button>

                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50">
                    <UserCircle2 size={20} className="text-slate-700" />
                    <span className="hidden text-sm font-medium text-slate-700 md:inline">
                        Abdul Waqar
                    </span>
                </button>
            </div>
        </header>
    );
}