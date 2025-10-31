import DashboardLayout from '@/components/layout/dashboard-layout';

interface LayoutProps {
  children: React.ReactNode;
  params?: any;
}

export default function SPCPDashboardLayout({ children }: LayoutProps) {
  return (
    <DashboardLayout role="sp-cp" name="SP/CP Dashboard">
      {children}
    </DashboardLayout>
  );
}