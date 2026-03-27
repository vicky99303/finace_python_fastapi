import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import ReportsTrendChart from "../components/charts/ReportsTrendChart";
import CategoryReportChart from "../components/charts/CategoryReportChart";
import ReportsListCard from "../components/ui/ReportsListCard";
import {
    categoryReportData,
    reportFiles,
    reportOverviewCards,
    reportTrendData,
} from "../data/mockData";

export default function Reports() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Reports"
                description="Analyze financial performance and export your summaries."
                actionLabel="Export Report"
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {reportOverviewCards.map((item) => (
                    <StatCard key={item.title} item={item} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <ReportsTrendChart data={reportTrendData} />
                </div>

                <div>
                    <CategoryReportChart data={categoryReportData} />
                </div>
            </section>

            <section>
                <ReportsListCard reports={reportFiles} />
            </section>
        </div>
    );
}