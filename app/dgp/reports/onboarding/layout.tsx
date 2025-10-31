import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout role="dgp" name="onboarding">
      {children}
    </DashboardLayout>
  );
};

export default OnboardingLayout;