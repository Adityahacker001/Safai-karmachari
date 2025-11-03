import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DGPGlobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="dgp" name="DGP Dashboard">{children}</DashboardLayout>;
}
