import DashboardLayout from '@/components/layout/dashboard-layout';

export default function InvestigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="dgp" name="investigation">
      {children}
    </DashboardLayout>
  );
}