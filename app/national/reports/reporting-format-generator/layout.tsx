'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function ReportingFormatGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="national" name="Reporting Format Generator">
      {children}
    </DashboardLayout>
  );
}
