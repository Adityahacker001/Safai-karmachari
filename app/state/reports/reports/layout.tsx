'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function StateDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="state" name="reports">
      {children}
    </DashboardLayout>
  );
}
