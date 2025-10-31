import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const ContractorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout role="dgp" name="pending-cases">
      {children}
    </DashboardLayout>
  );
};

export default ContractorsLayout;