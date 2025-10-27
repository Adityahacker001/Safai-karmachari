'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function NSKFDCDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="nskfdc" name="grievance-feedback">
      {children}
    </DashboardLayout>
  );
}