'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="sp-cp" name="feedback">
      {children}
    </DashboardLayout>
  );
}