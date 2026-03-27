export type TransactionType = "income" | "expense";

export interface SummaryCard {
    title: string;
    value: number;
    change: number;
    subtitle?: string;
}

export interface Transaction {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
    status: "completed" | "pending" | "failed";
}

export interface BudgetItem {
    id: number;
    category: string;
    spent: number;
    limit: number;
}

export interface BudgetMonthlyData {
    month: string;
    budget: number;
    actual: number;
}

export interface AccountItem {
    id: number;
    name: string;
    type: "bank" | "wallet" | "credit";
    balance: number;
    accountNumber: string;
    status: "active" | "inactive";
}

export interface AccountBalanceHistory {
    month: string;
    balance: number;
}

export interface AccountActivity {
    id: number;
    title: string;
    account: string;
    amount: number;
    type: "credit" | "debit";
    date: string;
}

export interface ReportTrendItem {
    month: string;
    income: number;
    expenses: number;
    savings: number;
}

export interface CategoryReportItem {
    category: string;
    amount: number;
}

export interface ReportFileItem {
    id: number;
    title: string;
    type: "PDF" | "CSV" | "XLSX";
    createdAt: string;
    status: "ready" | "processing";
}

export interface SettingsProfile {
    fullName: string;
    email: string;
    currency: string;
    timezone: string;
}

export interface SettingsPreference {
    emailAlerts: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    darkMode: boolean;
}