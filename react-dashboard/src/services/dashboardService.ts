import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/auth";
import type { BudgetItem, SummaryCard, Transaction } from "../types/finance";

export interface MonthlyOverviewItem {
    month: string;
    income: number;
    expenses: number;
}

export interface ExpenseBreakdownItem {
    name: string;
    value: number;
}

export interface DashboardResponse {
    summary_cards: SummaryCard[];
    recent_transactions: Transaction[];
    monthly_overview: MonthlyOverviewItem[];
    expense_breakdown: ExpenseBreakdownItem[];
    budget_items: BudgetItem[];
}

export async function getDashboardData(): Promise<DashboardResponse> {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/dashboard/summary`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return response.json();
}