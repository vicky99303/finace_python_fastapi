interface Props {
    profile: {
        fullName: string;
        email: string;
        currency: string;
        timezone: string;
    };
    onChange: (field: "fullName" | "email" | "currency" | "timezone", value: string) => void;
    onSave: () => void;
    saving?: boolean;
}

export default function SettingsProfileCard({
    profile,
    onChange,
    onSave,
    saving = false,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
            <p className="mt-1 text-sm text-slate-500">
                Update your account and regional preferences
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Full Name
                    </label>
                    <input
                        value={profile.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email Address
                    </label>
                    <input
                        value={profile.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Currency
                    </label>
                    <select
                        value={profile.currency}
                        onChange={(e) => onChange("currency", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                    >
                        <option value="USD">USD</option>
                        <option value="PKR">PKR</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Timezone
                    </label>
                    <select
                        value={profile.timezone}
                        onChange={(e) => onChange("timezone", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                    >
                        <option value="Asia/Karachi">Asia/Karachi</option>
                        <option value="UTC">UTC</option>
                        <option value="Europe/London">Europe/London</option>
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onSave}
                    disabled={saving}
                    type="button"
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}