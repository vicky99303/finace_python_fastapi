import { Download, FileText } from "lucide-react";
import type { ReportFileItem } from "../../types/finance";

interface Props {
    reports: ReportFileItem[];
}

function getTypeBadge(type: ReportFileItem["type"]) {
    switch (type) {
        case "PDF":
            return "bg-red-100 text-red-700";
        case "CSV":
            return "bg-green-100 text-green-700";
        case "XLSX":
            return "bg-emerald-100 text-emerald-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

function getStatusBadge(status: ReportFileItem["status"]) {
    switch (status) {
        case "ready":
            return "bg-blue-100 text-blue-700";
        case "processing":
            return "bg-amber-100 text-amber-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function ReportsListCard({ reports }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Generated Reports
                    </h3>
                    <p className="text-sm text-slate-500">
                        Recently created exports and summaries
                    </p>
                </div>

                <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
                    >
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-100 p-3">
                                <FileText size={18} className="text-slate-700" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {report.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Created on {report.createdAt}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeBadge(
                                            report.type
                                        )}`}
                                    >
                                        {report.type}
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                                            report.status
                                        )}`}
                                    >
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={report.status !== "ready"}
                        >
                            <Download size={16} />
                            Download
                        </button>
                    </div>
                ))}

                {reports.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-500">
                        No reports available.
                    </div>
                )}
            </div>
        </div>
    );
}