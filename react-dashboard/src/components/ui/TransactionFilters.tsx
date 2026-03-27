import { Search } from "lucide-react";

interface Props {
    search: string;
    selectedType: "all" | "income" | "expense";
    onSearchChange: (value: string) => void;
    onTypeChange: (value: "all" | "income" | "expense") => void;
}

export default function TransactionFilters({
    search,
    selectedType,
    onSearchChange,
    onTypeChange,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {["all", "income", "expense"].map((type) => {
                        const active = selectedType === type;

                        return (
                            <button
                                key={type}
                                onClick={() =>
                                    onTypeChange(type as "all" | "income" | "expense")
                                }
                                className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${active
                                    ? "bg-slate-900 text-white"
                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}