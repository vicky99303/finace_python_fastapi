export default function SecuritySettingsCard() {
    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Security</h3>
            <p className="mt-1 text-sm text-slate-500">
                Password and account protection controls
            </p>

            <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900">Password</p>
                    <p className="mt-1 text-xs text-slate-500">
                        Last changed 14 days ago
                    </p>
                    <button className="mt-3 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Change Password
                    </button>
                </div>

                <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                        Two-Factor Authentication
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Add an extra layer of security to your account
                    </p>
                    <button className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                        Enable 2FA
                    </button>
                </div>
            </div>
        </div>
    );
}