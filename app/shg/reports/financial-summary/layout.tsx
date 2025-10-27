import DashboardLayout from '@/components/layout/dashboard-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="shg" name="Financial Summary Report">{children}</DashboardLayout>;
}