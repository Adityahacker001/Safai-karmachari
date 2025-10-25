'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function TotalCasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="total-cases">
      {children}
    </DashboardLayout>
  );
}