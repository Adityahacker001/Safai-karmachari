'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DGPDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="dgp" name="DGP Dashboard">
      {children}
    </DashboardLayout>
  );
}
