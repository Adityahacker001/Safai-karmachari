import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SHGGlobalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="district" name="District Dashboard">{children}</DashboardLayout>;
}
