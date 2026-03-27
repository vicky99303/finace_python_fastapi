import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome back 👋
                        </h1>
                        <p className="text-gray-500">
                            Here’s your financial overview
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card
                            title="Total Balance"
                            amount="$5,200"
                            icon={Wallet}
                            bg="bg-indigo-500"
                        />
                        <Card
                            title="Income"
                            amount="$2,100"
                            icon={TrendingUp}
                            bg="bg-green-500"
                        />
                        <Card
                            title="Expense"
                            amount="$1,300"
                            icon={TrendingDown}
                            bg="bg-red-500"
                        />
                    </div>

                    {/* Chart Section */}
                    <div className="mt-8 bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Monthly Report
                        </h2>

                        <div className="h-48 flex items-center justify-center text-gray-400">
                            📊 Chart coming next...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;