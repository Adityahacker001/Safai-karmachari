import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SHGGlobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="sp-cp" name="SP/CP Dashboard">{children}</DashboardLayout>;
}
