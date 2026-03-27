import PageHeader from "../components/ui/PageHeader";
import SettingsProfileCard from "../components/ui/SettingsProfileCard";
import SettingsPreferencesCard from "../components/ui/SettingsPreferencesCard";
import SecuritySettingsCard from "../components/ui/SecuritySettingsCard";
import { settingsPreferences, settingsProfile } from "../data/mockData";

export default function Settings() {
    return (
        <div className="min-w-0 space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your profile, notifications, and security preferences."
                actionLabel="Save Preferences"
            />

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <SettingsProfileCard profile={settingsProfile} />
                </div>

                <div>
                    <SettingsPreferencesCard preferences={settingsPreferences} />
                </div>
            </section>

            <section>
                <SecuritySettingsCard />
            </section>
        </div>
    );
}