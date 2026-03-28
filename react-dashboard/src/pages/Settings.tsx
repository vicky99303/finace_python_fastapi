import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import SettingsProfileCard from "../components/ui/SettingsProfileCard";
import SettingsPreferencesCard from "../components/ui/SettingsPreferencesCard";
import SecuritySettingsCard from "../components/ui/SecuritySettingsCard";
import { getSettings, updateSettings } from "../services/settingsService";

type ProfileState = {
    fullName: string;
    email: string;
    currency: string;
    timezone: string;
};

type PreferencesState = {
    emailAlerts: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    darkMode: boolean;
};

export default function Settings() {
    const hasFetched = useRef(false);

    const [profile, setProfile] = useState<ProfileState>({
        fullName: "",
        email: "",
        currency: "USD",
        timezone: "Asia/Karachi",
    });

    const [preferences, setPreferences] = useState<PreferencesState>({
        emailAlerts: false,
        pushNotifications: false,
        weeklyReports: false,
        darkMode: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchSettings = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getSettings();

                setProfile({
                    fullName: data.profile?.full_name ?? "",
                    email: data.profile?.email ?? "",
                    currency: data.profile?.currency ?? "USD",
                    timezone: data.profile?.timezone ?? "Asia/Karachi",
                });

                setPreferences({
                    emailAlerts: data.preferences?.email_alerts ?? false,
                    pushNotifications: data.preferences?.push_notifications ?? false,
                    weeklyReports: data.preferences?.weekly_reports ?? false,
                    darkMode: data.preferences?.dark_mode ?? false,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleProfileChange = (
        field: keyof ProfileState,
        value: string
    ) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTogglePreference = (field: keyof PreferencesState) => {
        setPreferences((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await updateSettings({
                profile: {
                    full_name: profile.fullName,
                    email: profile.email,
                    currency: profile.currency,
                    timezone: profile.timezone,
                },
                preferences: {
                    email_alerts: preferences.emailAlerts,
                    push_notifications: preferences.pushNotifications,
                    weekly_reports: preferences.weeklyReports,
                    dark_mode: preferences.darkMode,
                },
            });

            setSuccess("Settings updated successfully.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-w-0 space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your profile, notifications, and security preferences."
                actionLabel="Save Preferences"
            />

            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                    Loading settings...
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-700 shadow-sm">
                    {success}
                </div>
            )}

            {!loading && (
                <>
                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <SettingsProfileCard
                                profile={profile}
                                onChange={handleProfileChange}
                                onSave={handleSave}
                                saving={saving}
                            />
                        </div>

                        <div>
                            <SettingsPreferencesCard
                                preferences={preferences}
                                onToggle={handleTogglePreference}
                            />
                        </div>
                    </section>

                    <section>
                        <SecuritySettingsCard />
                    </section>
                </>
            )}
        </div>
    );
}