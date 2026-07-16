import { getSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/settings-form";
import { updateSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Firm profile, contact details, social links, and SEO defaults.</p>
      </div>
      <SettingsForm action={updateSettings} defaults={settings} />
    </div>
  );
}
