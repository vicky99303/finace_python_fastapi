interface Props {
    preferences: {
        emailAlerts: boolean;
        pushNotifications: boolean;
        weeklyReports: boolean;
        darkMode: boolean;
    };
    onToggle: (
        field: "emailAlerts" | "pushNotifications" | "weeklyReports" | "darkMode"
    ) => void;
}

function PreferenceRow({
    title,
    description,
    enabled,
    onClick,
}: {
    title: string;
    description: string;
    enabled: boolean;
    onClick: () => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
            <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{description}</p>
            </div>

            <button
                type="button"
                onClick={onClick}
                className={`flex h-7 w-12 items-center rounded-full p-1 transition ${enabled ? "justify-end bg-slate-900" : "justify-start bg-slate-200"
                    }`}
            >
                <div className="h-5 w-5 rounded-full bg-white" />
            </button>
        </div>
    );
}

export default function SettingsPreferencesCard({ preferences, onToggle }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Preferences</h3>
            <p className="mt-1 text-sm text-slate-500">
                Manage notifications and reporting options
            </p>

            <div className="mt-6 space-y-4">
                <PreferenceRow
                    title="Email Alerts"
                    description="Receive important account alerts by email"
                    enabled={preferences.emailAlerts}
                    onClick={() => onToggle("emailAlerts")}
                />
                <PreferenceRow
                    title="Push Notifications"
                    description="Get instant activity notifications"
                    enabled={preferences.pushNotifications}
                    onClick={() => onToggle("pushNotifications")}
                />
                <PreferenceRow
                    title="Weekly Reports"
                    description="Receive weekly finance summaries"
                    enabled={preferences.weeklyReports}
                    onClick={() => onToggle("weeklyReports")}
                />
                <PreferenceRow
                    title="Dark Mode"
                    description="Switch dashboard appearance mode"
                    enabled={preferences.darkMode}
                    onClick={() => onToggle("darkMode")}
                />
            </div>
        </div>
    );
}