import React from "react";
import ContactForm from "@/components/support/ContactForm";
import SupportModal from "@/components/support/SupportModal";
import { Contact } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      <SupportModal title={<div className="flex items-center gap-3"><Contact className="h-5 w-5 text-white"/><span>Contact Us</span></div>} subtitle="Get help or report an issue">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </SupportModal>
    </div>
  );
}
