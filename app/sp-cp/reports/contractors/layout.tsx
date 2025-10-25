'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function ContractorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="contractors">
      {children}
    </DashboardLayout>
  );
}