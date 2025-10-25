'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function GrievancesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="grievances">
      {children}
    </DashboardLayout>
  );
}