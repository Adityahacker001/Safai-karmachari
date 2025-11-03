import DashboardLayout from '@/components/layout/dashboard-layout';

export default function orglobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="nskfdc" name="Dashboard">{children}</DashboardLayout>;
}
