import DashboardLayout from '@/components/layout/dashboard-layout';

export default function orglobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="organizational-nodal" name="Dashboard">{children}</DashboardLayout>;
}
