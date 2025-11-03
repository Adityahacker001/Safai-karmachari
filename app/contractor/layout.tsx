import DashboardLayout from '@/components/layout/dashboard-layout';

export default function ContractorGlobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="contractor" name="Contractor Dashboard">{children}</DashboardLayout>;
}
