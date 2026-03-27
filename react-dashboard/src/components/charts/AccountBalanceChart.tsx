import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import type { AccountBalanceHistory } from "../../types/finance";

interface Props {
    data: AccountBalanceHistory[];
}

export default function AccountBalanceChart({ data }: Props) {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">
                    Account Balance Trend
                </h3>
                <p className="text-sm text-slate-500">
                    Balance movement across recent months
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="balance" strokeWidth={3} fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}