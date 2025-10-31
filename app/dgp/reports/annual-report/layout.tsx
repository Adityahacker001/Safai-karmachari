import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const CompensationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout role="dgp" name="annual-report">
      {children}
    </DashboardLayout>
  );
};

export default CompensationLayout;