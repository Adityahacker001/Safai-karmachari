import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SPCPDashboardLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: { role?: string };
}) {
  const roleParam = searchParams?.role;
  const name = roleParam === 'sp' ? 'SP Dashboard' : roleParam === 'cp' ? 'CP Dashboard' : 'SP/CP Dashboard';

  return (
    <DashboardLayout role="sp-cp" name={name}>
      {children}
    </DashboardLayout>
  );
}