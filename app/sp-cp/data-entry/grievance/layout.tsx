'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function GrievanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="grievance">
      {children}
    </DashboardLayout>
  );
}