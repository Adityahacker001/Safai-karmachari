'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DirectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="directions">
      {children}
    </DashboardLayout>
  );
}