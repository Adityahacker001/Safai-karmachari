import DashboardLayout from '@/components/layout/dashboard-layout';

export default function StatelobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="state" name="State Dashboard">{children}</DashboardLayout>;
}
