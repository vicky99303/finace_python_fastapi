import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/auth";

export interface BudgetApiItem {
    id: number;
    category_id?: number | null;
    category_name?: string | null;
    amount: number;
    spent?: number;
    month?: number;
    year?: number;
}

export interface BudgetSummaryResponse {
    total_budget?: number;
    total_spent?: number;
    remaining?: number;
    over_limit_categories?: number;
    budgets?: BudgetApiItem[];
    monthly_data?: Array<{
        month: string;
        budget: number;
        actual: number;
    }>;
}

export async function getBudgetData(): Promise<BudgetSummaryResponse> {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/budgets/`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch budgets");
    }

    return response.json();
}