import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/auth";

export interface SettingsProfileResponse {
    full_name?: string;
    email?: string;
    currency?: string;
    timezone?: string;
}

export interface SettingsPreferenceResponse {
    email_alerts?: boolean;
    push_notifications?: boolean;
    weekly_reports?: boolean;
    dark_mode?: boolean;
}

export interface SettingsResponse {
    profile?: SettingsProfileResponse;
    preferences?: SettingsPreferenceResponse;
}

export interface UpdateSettingsPayload {
    profile: {
        full_name: string;
        email: string;
        currency: string;
        timezone: string;
    };
    preferences: {
        email_alerts: boolean;
        push_notifications: boolean;
        weekly_reports: boolean;
        dark_mode: boolean;
    };
}

export async function getSettings(): Promise<SettingsResponse> {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/settings/`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch settings");
    }

    return response.json();
}

export async function updateSettings(payload: UpdateSettingsPayload) {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/settings/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update settings");
    }

    return response.json();
}