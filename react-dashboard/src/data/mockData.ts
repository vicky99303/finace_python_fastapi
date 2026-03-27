import type {
    AccountActivity,
    AccountBalanceHistory,
    AccountItem,
    BudgetItem,
    BudgetMonthlyData,
    CategoryReportItem,
    ReportFileItem,
    ReportTrendItem,
    SettingsPreference,
    SettingsProfile,
    SummaryCard,
    Transaction,
} from "../types/finance";

export const summaryCards: SummaryCard[] = [
    {
        title: "Total Balance",
        value: 24500,
        change: 12.5,
        subtitle: "Compared to last month",
    },
    {
        title: "Income",
        value: 8200,
        change: 8.1,
        subtitle: "Monthly earnings",
    },
    {
        title: "Expenses",
        value: 4100,
        change: -3.2,
        subtitle: "Monthly spending",
    },
    {
        title: "Savings",
        value: 12100,
        change: 6.4,
        subtitle: "Current saved amount",
    },
];

export const recentTransactions: Transaction[] = [
    {
        id: 1,
        title: "Salary",
        category: "Income",
        amount: 3000,
        type: "income",
        date: "2026-03-25",
        status: "completed",
    },
    {
        id: 2,
        title: "Groceries",
        category: "Food",
        amount: 120,
        type: "expense",
        date: "2026-03-24",
        status: "completed",
    },
    {
        id: 3,
        title: "Netflix Subscription",
        category: "Entertainment",
        amount: 18,
        type: "expense",
        date: "2026-03-23",
        status: "pending",
    },
    {
        id: 4,
        title: "Freelance Payment",
        category: "Work",
        amount: 950,
        type: "income",
        date: "2026-03-22",
        status: "completed",
    },
];

export const allTransactions: Transaction[] = [
    ...recentTransactions,
    {
        id: 5,
        title: "Electricity Bill",
        category: "Bills",
        amount: 140,
        type: "expense",
        date: "2026-03-21",
        status: "completed",
    },
    {
        id: 6,
        title: "Fuel",
        category: "Transport",
        amount: 90,
        type: "expense",
        date: "2026-03-20",
        status: "completed",
    },
    {
        id: 7,
        title: "Stock Dividend",
        category: "Investment",
        amount: 210,
        type: "income",
        date: "2026-03-19",
        status: "completed",
    },
    {
        id: 8,
        title: "Gym Membership",
        category: "Health",
        amount: 45,
        type: "expense",
        date: "2026-03-18",
        status: "pending",
    },
    {
        id: 9,
        title: "Client Project",
        category: "Work",
        amount: 1800,
        type: "income",
        date: "2026-03-17",
        status: "completed",
    },
    {
        id: 10,
        title: "Shopping Mall",
        category: "Shopping",
        amount: 320,
        type: "expense",
        date: "2026-03-16",
        status: "failed",
    },
];

export const monthlyOverview = [
    { month: "Jan", income: 3200, expenses: 2100 },
    { month: "Feb", income: 4100, expenses: 2600 },
    { month: "Mar", income: 3800, expenses: 2400 },
    { month: "Apr", income: 4600, expenses: 3000 },
    { month: "May", income: 5200, expenses: 3400 },
    { month: "Jun", income: 4800, expenses: 3100 },
];

export const expenseBreakdown = [
    { name: "Food", value: 420 },
    { name: "Transport", value: 180 },
    { name: "Shopping", value: 500 },
    { name: "Bills", value: 260 },
    { name: "Entertainment", value: 210 },
];

export const budgetItems: BudgetItem[] = [
    { id: 1, category: "Food", spent: 420, limit: 600 },
    { id: 2, category: "Transport", spent: 180, limit: 300 },
    { id: 3, category: "Entertainment", spent: 210, limit: 250 },
    { id: 4, category: "Shopping", spent: 500, limit: 700 },
    { id: 5, category: "Bills", spent: 260, limit: 350 },
];

export const budgetOverviewCards: SummaryCard[] = [
    {
        title: "Total Budget",
        value: 2200,
        change: 5.4,
        subtitle: "Planned this month",
    },
    {
        title: "Total Spent",
        value: 1570,
        change: -2.1,
        subtitle: "Used so far",
    },
    {
        title: "Remaining",
        value: 630,
        change: 4.8,
        subtitle: "Available balance",
    },
    {
        title: "Over Limit Categories",
        value: 1,
        change: -1.5,
        subtitle: "Needs attention",
    },
];

export const budgetMonthlyData: BudgetMonthlyData[] = [
    { month: "Jan", budget: 1800, actual: 1650 },
    { month: "Feb", budget: 1900, actual: 1750 },
    { month: "Mar", budget: 2000, actual: 1890 },
    { month: "Apr", budget: 2100, actual: 1980 },
    { month: "May", budget: 2200, actual: 2140 },
    { month: "Jun", budget: 2200, actual: 2260 },
];

export const accountOverviewCards: SummaryCard[] = [
    {
        title: "Total Balance",
        value: 32450,
        change: 7.2,
        subtitle: "Across all accounts",
    },
    {
        title: "Bank Accounts",
        value: 3,
        change: 2.1,
        subtitle: "Connected institutions",
    },
    {
        title: "Wallet Balance",
        value: 1850,
        change: 4.5,
        subtitle: "Digital wallet funds",
    },
    {
        title: "Credit Used",
        value: 2400,
        change: -1.8,
        subtitle: "Outstanding credit usage",
    },
];

export const accountsList: AccountItem[] = [
    {
        id: 1,
        name: "HBL Main Account",
        type: "bank",
        balance: 12450,
        accountNumber: "**** 4582",
        status: "active",
    },
    {
        id: 2,
        name: "Meezan Savings",
        type: "bank",
        balance: 9800,
        accountNumber: "**** 1127",
        status: "active",
    },
    {
        id: 3,
        name: "JazzCash Wallet",
        type: "wallet",
        balance: 1850,
        accountNumber: "**** 7788",
        status: "active",
    },
    {
        id: 4,
        name: "Visa Credit Card",
        type: "credit",
        balance: 8350,
        accountNumber: "**** 9021",
        status: "active",
    },
];

export const accountBalanceHistory: AccountBalanceHistory[] = [
    { month: "Jan", balance: 22000 },
    { month: "Feb", balance: 24500 },
    { month: "Mar", balance: 23800 },
    { month: "Apr", balance: 26700 },
    { month: "May", balance: 28900 },
    { month: "Jun", balance: 32450 },
];

export const accountActivities: AccountActivity[] = [
    {
        id: 1,
        title: "Salary Deposit",
        account: "HBL Main Account",
        amount: 3000,
        type: "credit",
        date: "2026-03-25",
    },
    {
        id: 2,
        title: "ATM Cash Withdrawal",
        account: "Meezan Savings",
        amount: 250,
        type: "debit",
        date: "2026-03-24",
    },
    {
        id: 3,
        title: "Wallet Top Up",
        account: "JazzCash Wallet",
        amount: 120,
        type: "credit",
        date: "2026-03-23",
    },
    {
        id: 4,
        title: "Online Purchase",
        account: "Visa Credit Card",
        amount: 90,
        type: "debit",
        date: "2026-03-22",
    },
];


export const reportOverviewCards: SummaryCard[] = [
    {
        title: "Net Savings",
        value: 14800,
        change: 9.2,
        subtitle: "Compared to last quarter",
    },
    {
        title: "Avg Monthly Income",
        value: 4700,
        change: 6.1,
        subtitle: "Last 6 months",
    },
    {
        title: "Avg Monthly Expenses",
        value: 3005,
        change: -2.8,
        subtitle: "Last 6 months",
    },
    {
        title: "Generated Reports",
        value: 24,
        change: 3.4,
        subtitle: "This year",
    },
];

export const reportTrendData: ReportTrendItem[] = [
    { month: "Jan", income: 3200, expenses: 2100, savings: 1100 },
    { month: "Feb", income: 4100, expenses: 2600, savings: 1500 },
    { month: "Mar", income: 3800, expenses: 2400, savings: 1400 },
    { month: "Apr", income: 4600, expenses: 3000, savings: 1600 },
    { month: "May", income: 5200, expenses: 3400, savings: 1800 },
    { month: "Jun", income: 4800, expenses: 3100, savings: 1700 },
];

export const categoryReportData: CategoryReportItem[] = [
    { category: "Food", amount: 420 },
    { category: "Transport", amount: 180 },
    { category: "Shopping", amount: 500 },
    { category: "Bills", amount: 260 },
    { category: "Entertainment", amount: 210 },
    { category: "Health", amount: 140 },
];

export const reportFiles: ReportFileItem[] = [
    {
        id: 1,
        title: "Monthly Financial Summary - March 2026",
        type: "PDF",
        createdAt: "2026-03-26",
        status: "ready",
    },
    {
        id: 2,
        title: "Expense Breakdown - Q1 2026",
        type: "CSV",
        createdAt: "2026-03-20",
        status: "ready",
    },
    {
        id: 3,
        title: "Savings Performance Report",
        type: "XLSX",
        createdAt: "2026-03-15",
        status: "processing",
    },
];

export const settingsProfile: SettingsProfile = {
    fullName: "Abdul Waqar",
    email: "abdulwaqar@example.com",
    currency: "USD",
    timezone: "Asia/Karachi",
};

export const settingsPreferences: SettingsPreference = {
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    darkMode: false,
};