import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const ComplianceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout role="dgp" name="compliance">
      {children}
    </DashboardLayout>
  );
};

export default ComplianceLayout;