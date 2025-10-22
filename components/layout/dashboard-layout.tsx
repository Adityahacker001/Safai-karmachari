"use client";

import { useSearchParams } from 'next/navigation';
import Sidebar from './sidebar';
import Header from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'contractor' | 'nodal' | 'district' | 'state' | 'national' | 'sp-cp';
  name: string; // added
}

const roleTitles = {
  contractor: 'Contractor Dashboard',
  nodal: 'Nodal Officer Interface',
  district: 'District Monitoring System',
  state: 'State Command Centre',
  national: 'National Dashboard (NCSK)',
  // sp-cp intentionally omitted so layout-provided `name` is used for SP/CP
};

export default function DashboardLayout({ children, role, name }: DashboardLayoutProps) {
  const searchParams = useSearchParams();

  // Prefer explicit `name` prop, but when the dashboard role is the combined
  // SP/CP route, derive the title from the URL query `?role=sp|cp` so the
  // layout shows "SP Dashboard" or "CP Dashboard" according to who logged in.
  let dynamicName = name;
  if (role === 'sp-cp') {
    const roleParam = searchParams?.get('role');
    if (roleParam === 'sp') dynamicName = 'SP Dashboard';
    else if (roleParam === 'cp') dynamicName = 'CP Dashboard';
    else dynamicName = name || 'SP/CP Dashboard';
  }

  const title = dynamicName || (roleTitles as any)[role] || 'Dashboard';

  return (
    <div className="flex h-screen">
      <aside className="w-72 flex-shrink-0">
        <Sidebar role={role} />
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
  <Header dashboardTitle={title} userName={title} />
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}