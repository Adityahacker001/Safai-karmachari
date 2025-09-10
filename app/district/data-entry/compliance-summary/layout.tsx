'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DistrictDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="district" name="Monthly Compliance Summary">
      {children}
    </DashboardLayout>
  );
}
