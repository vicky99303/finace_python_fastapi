import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import AccountBalanceChart from "../components/charts/AccountBalanceChart";
import AccountsListCard from "../components/ui/AccountsListCard";
import AccountActivityCard from "../components/ui/AccountActivityCard";
import {
    accountActivities,
    accountBalanceHistory,
    accountOverviewCards,
    accountsList,
} from "../data/mockData";

export default function Accounts() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Accounts"
                description="Monitor balances, wallets, cards, and recent account movement."
                actionLabel="Transfer Money"
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {accountOverviewCards.map((item) => (
                    <StatCard key={item.title} item={item} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <AccountBalanceChart data={accountBalanceHistory} />
                </div>

                <div>
                    <AccountsListCard accounts={accountsList} />
                </div>
            </section>

            <section>
                <AccountActivityCard activities={accountActivities} />
            </section>
        </div>
    );
}