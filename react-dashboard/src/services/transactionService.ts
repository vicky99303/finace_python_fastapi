import type { Transaction } from "../types/finance";
import { API_BASE_URL } from "../config/api";

export async function getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`);

    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return response.json();
}