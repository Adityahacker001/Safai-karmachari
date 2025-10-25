'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function spcpdashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="profile">
      {children}
    </DashboardLayout>
  );
}
