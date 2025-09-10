'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function NodalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="nodal" name="Contractor Performance Report">
      {children}
    </DashboardLayout>
  );
}
