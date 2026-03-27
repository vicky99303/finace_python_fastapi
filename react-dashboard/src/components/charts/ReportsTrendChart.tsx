import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import type { ReportTrendItem } from "../../types/finance";

interface Props {
    data: ReportTrendItem[];
}

export default function ReportsTrendChart({ data }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                    Financial Trends
                </h3>
                <p className="text-sm text-slate-500">
                    Income, expenses, and savings performance over time
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="expenses" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="savings" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}