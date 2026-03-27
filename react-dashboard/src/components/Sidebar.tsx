import { Home, BarChart, Wallet, Settings } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-64 bg-white shadow-lg p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-indigo-600 mb-10">
                Finance
            </h1>

            <nav className="flex flex-col gap-3">
                {[
                    { name: "Dashboard", icon: Home },
                    { name: "Transactions", icon: Wallet },
                    { name: "Reports", icon: BarChart },
                    { name: "Settings", icon: Settings },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 cursor-pointer transition"
                        >
                            <Icon size={18} />
                            {item.name}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto text-sm text-gray-400">
                © 2026 Finance
            </div>
        </div>
    );
};

export default Sidebar;