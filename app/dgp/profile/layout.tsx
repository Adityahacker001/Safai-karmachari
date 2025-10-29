'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DGPProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="dgp" name="DGP Profile">
      {children}
    </DashboardLayout>
  );
}
