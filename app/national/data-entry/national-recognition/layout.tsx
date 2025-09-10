'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function NationalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="national" name="National Recognition">
      {children}
    </DashboardLayout>
  );
}
