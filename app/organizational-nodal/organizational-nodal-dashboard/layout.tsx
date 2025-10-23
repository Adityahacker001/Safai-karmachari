'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function OrganizationalNodalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="organizational-nodal" name=" dashboard">
      {children}
    </DashboardLayout>
  );
}
