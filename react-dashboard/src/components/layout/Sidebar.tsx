import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    Wallet,
    Landmark,
    BarChart3,
    Settings,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Budgets", path: "/budgets", icon: Wallet },
    { name: "Accounts", path: "/accounts", icon: Landmark },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <>
            <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h1 className="text-2xl font-bold text-slate-900">FinTrack</h1>
                    <p className="mt-1 text-sm text-slate-500">Finance Dashboard</p>
                </div>

                <nav className="flex-1 space-y-2 px-4 py-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-2 py-2 md:hidden">
                <nav className="grid grid-cols-6 gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] font-medium ${isActive ? "bg-slate-900 text-white" : "text-slate-600"
                                    }`}
                            >
                                <Icon size={16} />
                                <span className="mt-1 truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}