import DashboardLayout from '@/components/layout/dashboard-layout';

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="dgp" name="feedback">
      {children}
    </DashboardLayout>
  );
}