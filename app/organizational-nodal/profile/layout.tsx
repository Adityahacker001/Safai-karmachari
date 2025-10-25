'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function OrganizationalNodalProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="organizational-nodal" name="profile">
      {children}
    </DashboardLayout>
  );
}