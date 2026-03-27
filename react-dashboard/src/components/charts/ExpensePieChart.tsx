import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface Props {
    data: {
        name: string;
        value: number;
    }[];
}

const COLORS = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

export default function ExpensePieChart({ data }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                    Expense Breakdown
                </h3>
                <p className="text-sm text-slate-500">
                    Spending distribution by category
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-slate-600">
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}