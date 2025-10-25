'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function OrganizationalNodalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="organizational-nodal" name="grievance">
      {children}
    </DashboardLayout>
  );
}