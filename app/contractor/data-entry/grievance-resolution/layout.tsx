'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function ContractorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="contractor" name="Grievance Resolution">
      {children}
    </DashboardLayout>
  );
}
