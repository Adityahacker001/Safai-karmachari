import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const WorkersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout role="dgp" name="workers">
      {children}
    </DashboardLayout>
  );
};

export default WorkersLayout;