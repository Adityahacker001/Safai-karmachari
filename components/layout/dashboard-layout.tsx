'use client';

import { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'contractor' | 'nodal' | 'district' | 'state' | 'national';
  name: string; // added
}

const roleTitles = {
  contractor: 'Contractor Dashboard',
  nodal: 'Nodal Officer Interface',
  district: 'District Monitoring System',
  state: 'State Command Centre',
  national: 'National Dashboard (NCSK)',
};

export default function DashboardLayout({ children, role, name }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <aside className="w-72 flex-shrink-0">
        <Sidebar role={role} />
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
        <Header title={roleTitles[role]} userName={name} />
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}