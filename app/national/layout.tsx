import DashboardLayout from '@/components/layout/dashboard-layout';

export default function NationalGlobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="national" name="National Dashboard">{children}</DashboardLayout>;
}
