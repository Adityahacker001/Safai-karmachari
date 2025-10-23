'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function NskfdcDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="nskfdc" name="NSKFDC Dashboard">
      {children}
    </DashboardLayout>
  );
}
