'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SHGDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="shg" name="SHG Dashboard">
      {children}
    </DashboardLayout>
  );
}
