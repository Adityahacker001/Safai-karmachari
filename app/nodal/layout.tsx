import DashboardLayout from "@/components/layout/dashboard-layout";
import { GlobalModalProvider } from '@/context/GlobalModalContext';
import ContactUsModal from '@/components/global-modals/ContactUsModal';
import HelpSupportModal from '@/components/global-modals/HelpSupportModal';
import SettingsModal from '@/components/global-modals/SettingsModal';

export default function NodalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
      <GlobalModalProvider>
        <DashboardLayout role="nodal" name="Nodal Officer">{children}</DashboardLayout>
        <ContactUsModal />
        <HelpSupportModal />
        <SettingsModal />
      </GlobalModalProvider>
    );
}
