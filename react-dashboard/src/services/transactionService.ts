import type { Transaction } from "../types/finance";
import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/auth";

export async function getTransactions(): Promise<Transaction[]> {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/transactions/`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return response.json();
}