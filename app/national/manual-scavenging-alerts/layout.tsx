'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function ManualScavengingAlertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="national" name="Manual Scavenging Alerts">
      {children}
    </DashboardLayout>
  );
}
