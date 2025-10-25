'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function CompensationLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="compensation">
      {children}
    </DashboardLayout>
  );
}