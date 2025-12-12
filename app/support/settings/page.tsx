import React from "react";
import SettingsPanel from "@/components/support/SettingsPanel";
import SupportModal from "@/components/support/SupportModal";
import { Settings } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      <SupportModal title={<div className="flex items-center gap-3"><Settings className="h-5 w-5 text-white"/><span>Settings</span></div>} subtitle="Profile, password, and preferences">
        <div className="mt-2 max-w-5xl mx-auto">
          <SettingsPanel />
        </div>
      </SupportModal>
    </div>
  );
}
