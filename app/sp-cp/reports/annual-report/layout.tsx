'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function AnnualReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="annual-report">
      {children}
    </DashboardLayout>
  );
}