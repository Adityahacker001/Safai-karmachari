import React from "react";
import FAQSection from "@/components/support/FAQSection";
import TicketHistory from "@/components/support/TicketHistory";
import SupportModal from "@/components/support/SupportModal";
import { HelpCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      <SupportModal title={<div className="flex items-center gap-3"><HelpCircle className="h-5 w-5 text-white"/><span>Help & Support</span></div>} subtitle="FAQs and ticket history">
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <FAQSection />
          <TicketHistory />
        </div>
      </SupportModal>
    </div>
  );
}
