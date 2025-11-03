'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight as ChevronRightIcon,
  Shield,
  Building,
  Filter,
  RefreshCw,
  FileText,
  Search,
  ArrowUp,
  ArrowDown,
  Eye,
  ChevronLeft as ChevronLeftIcon,
  Signal,
  SignalZero,
  CheckCircle2,
  XCircle,
  File as FileIcon,
  AlertTriangle,
  TowerControl
} from 'lucide-react';

// --- MOCK DATA & OPTIONS ---

const mockDistrictData = [
  { id: 'D-01', district: 'Mumbai City', type: 'CP', onboarded: 'Yes', lastSync: '2025-10-30T10:00:00Z', incidents: 150, cases: 120, compliance: 95 },
  { id: 'D-02', district: 'Pune City', type: 'CP', onboarded: 'Yes', lastSync: '2025-10-29T08:00:00Z', incidents: 80, cases: 65, compliance: 92 },
  { id: 'D-03', district: 'Nagpur City', type: 'CP', onboarded: 'Yes', lastSync: '2025-10-15T14:00:00Z', incidents: 50, cases: 40, compliance: 88 }, // > 7 days
  { id: 'D-04', district: 'Thane (Rural)', type: 'SP', onboarded: 'Yes', lastSync: '2025-09-25T11:00:00Z', incidents: 20, cases: 15, compliance: 75 }, // > 30 days
  { id: 'D-05', district: 'Nashik (Rural)', type: 'SP', onboarded: 'No', lastSync: null, incidents: 0, cases: 0, compliance: 0 },
  { id: 'D-06', district: 'Kolhapur', type: 'SP', onboarded: 'Yes', lastSync: '2025-10-29T18:00:00Z', incidents: 45, cases: 40, compliance: 90 },
  { id: 'D-07', district: 'Aurangabad City', type: 'CP', onboarded: 'Yes', lastSync: '2025-10-20T09:00:00Z', incidents: 30, cases: 22, compliance: 85 }, // > 7 days
  { id: 'D-08', district: 'Solapur', type: 'SP', onboarded: 'No', lastSync: null, incidents: 0, cases: 0, compliance: 0 },
  { id: 'D-09', district: 'Amravati City', type: 'CP', onboarded: 'Yes', lastSync: '2025-10-30T05:00:00Z', incidents: 25, cases: 20, compliance: 91 },
  { id: 'D-10', district: 'Ratnagiri', type: 'SP', onboarded: 'Yes', lastSync: '2025-08-10T12:00:00Z', incidents: 10, cases: 5, compliance: 68 }, // > 30 days
  { id: 'D-11', district: 'Nanded', type: 'SP', onboarded: 'Yes', lastSync: '2025-10-28T16:00:00Z', incidents: 33, cases: 30, compliance: 89 },
  { id: 'D-12', district: 'Jalgaon', type: 'SP', onboarded: 'No', lastSync: null, incidents: 0, cases: 0, compliance: 0 },
];

const districtOptions = ["All", "Mumbai City", "Pune City", "Nagpur City", "Thane (Rural)", "Nashik (Rural)", "Kolhapur", "Aurangabad City", "Solapur", "Amravati City", "Ratnagiri", "Nanded", "Jalgaon"];
const jurisdictionOptions = ["All", "SP", "CP"];
const onbardedOptions = ["All", "Yes", "No"];
const syncStatusOptions = ["All", "OK", "Delayed", "Failed"];

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { y: -5, transition: { duration: 0.2 } }}
    className={`backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-200/50 ${className}`}
  >
    {children}
  </motion.div>
);

/**
 * 2. AppButton Component
 */
interface AppButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'exportPdf' | 'exportExcel' | 'action' | 'warning' | 'danger';
  icon?: React.ElementType;
  className?: string;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ children, onClick, variant = 'primary', icon: Icon, className = "", disabled = false }) => {
  const variants: Record<string, string> = {
    primary: "bg-navy-700 text-white hover:bg-navy-800 shadow-lg shadow-blue-500/20",
    secondary: "bg-gray-200 text-navy-800 hover:bg-gray-300",
    exportPdf: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20",
    exportExcel: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20",
    action: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20",
    danger: "bg-red-700 text-white hover:bg-red-800 shadow-md shadow-red-500/30"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
};

/**
 * 3. OnboardStatusBadge Component
 */
interface OnboardStatusBadgeProps {
  status: string;
}

const OnboardStatusBadge: React.FC<OnboardStatusBadgeProps> = ({ status }) => {
  const config: Record<string, { icon: React.ElementType; class: string }> = {
    "Yes": { icon: CheckCircle2, class: "bg-emerald-100 text-emerald-800" },
    "No": { icon: XCircle, class: "bg-red-100 text-red-800" },
  };
  const Icon = config[status]?.icon || XCircle;
  const className = config[status]?.class || "bg-gray-100 text-gray-800";

  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    <Icon size={14} />
    {status}
  </span>;
};

/**
 * 4. SyncStatus Component
 */
interface SyncStatusProps {
  lastSync: string | null;
}

const getSyncStatus = (lastSync: string | null) => {
  if (!lastSync) {
    return { status: 'N/A', icon: (props: { size: number }) => <XCircle {...props} />, class: 'text-gray-500', date: 'N/A' };
  }

  const now = new Date();
  const syncDate = new Date(lastSync);
  const diffDays = (now.getTime() - syncDate.getTime()) / (1000 * 60 * 60 * 24);
  const formattedDate = syncDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  if (diffDays > 30) {
    return { status: 'Failed', icon: SignalZero, class: 'text-red-600', date: formattedDate };
  }
  if (diffDays > 7) {
    return { status: 'Delayed', icon: AlertTriangle, class: 'text-amber-600', date: formattedDate };
  }
  return { status: 'OK', icon: Signal, class: 'text-emerald-600', date: formattedDate };
};

const SyncStatus: React.FC<SyncStatusProps> = ({ lastSync }) => {
  const { status, icon: Icon, class: className, date } = getSyncStatus(lastSync);

  return (
    <div className="flex flex-col">
      <span className="font-medium">{date}</span>
      {status !== 'N/A' && (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${className}`}>
          <Icon size={14} />
          {status === 'OK' ? 'Sync OK' : (status === 'Delayed' ? 'Sync Delayed' : 'Sync Failed')}
        </span>
      )}
      {status === 'N/A' && (
        <span className="text-xs text-gray-500">Not Onboarded</span>
      )}
    </div>
  );
};

/**
 * 5. SelectInput Component
 */
interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="text-xs font-medium text-gray-500">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

/**
 * 6. ThSortable Component
 */
interface ThSortableProps {
  sortKey: string;
  title: string;
  handleSort: (key: string) => void;
  sortIcon: React.ReactNode;
}

const ThSortable: React.FC<ThSortableProps> = ({ sortKey, title, handleSort, sortIcon }) => (
  <th
    className="px-5 py-4 font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-200/30"
    onClick={() => handleSort(sortKey)}
  >
    <div className="flex items-center gap-2">
      {title}
      {sortIcon}
    </div>
  </th>
);


// --- MAIN PAGE COMPONENT ---
export default function DGPOnboardingReport() {

  // Filter & Search State
  const [filters, setFilters] = useState({
    district: 'All',
    jurisdiction: 'All',
    onboarded: 'All',
    syncStatus: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Table State
  const [sortConfig, setSortConfig] = useState({ key: 'district', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Event Handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      district: 'All',
      jurisdiction: 'All',
      onboarded: 'All',
      syncStatus: 'All'
    });
    setSearchTerm('');
  };

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Data Processing
  const filteredData = useMemo(() => {
    return mockDistrictData.filter(d => {
      const matchesSearch = d.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistrict = filters.district === 'All' || d.district === filters.district;
      const matchesJurisdiction = filters.jurisdiction === 'All' || d.type === filters.jurisdiction;
      const matchesOnboarded = filters.onboarded === 'All' || d.onboarded === filters.onboarded;
      
      const syncStatus = getSyncStatus(d.lastSync).status;
      const matchesSync = filters.syncStatus === 'All'
        || (filters.syncStatus === 'OK' && syncStatus === 'OK')
        || (filters.syncStatus === 'Delayed' && syncStatus === 'Delayed')
        || (filters.syncStatus === 'Failed' && syncStatus === 'Failed')
        || (filters.syncStatus === 'N/A' && syncStatus === 'N/A');

      return matchesSearch && matchesDistrict && matchesJurisdiction && matchesOnboarded && matchesSync;
    });
  }, [searchTerm, filters]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const key = sortConfig.key as keyof typeof a;
        const aValue = a[key] ?? '';
        const bValue = b[key] ?? '';
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
 
  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-gradient-to-br from-white via-blue-50 to-gray-100" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-6 lg:p-10 font-sans text-navy-900"
      >
        <main className="max-w-8xl mx-auto">
          {/* --- Header --- */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-navy-700 text-gold-400 shadow-lg shadow-navy-500/30 border-2 border-white/50">
                  <TowerControl size={36} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-navy-900">District SP/CP Onboarding Report</h1>
                  <p className="text-base text-gray-600">Compliance & system reporting status of all districts</p>
                </div>
              </div>
              <nav className="text-sm font-medium text-gray-500" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
                  <li><ChevronRightIcon size={16} /></li>
                  <li><a href="#" className="hover:text-blue-600">Reports</a></li>
                  <li><ChevronRightIcon size={16} /></li>
                  <li className="font-semibold text-gray-700">Onboarding</li>
                </ol>
              </nav>
            </div>
          </header>

          {/* --- Filter Bar --- */}
          <GlassCard className="mb-8 bg-gradient-to-r from-blue-50/50 via-white/80 to-blue-50/50" noHover>
            <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
                <SelectInput label="District" name="district" value={filters.district} onChange={handleFilterChange} options={districtOptions} />
                <SelectInput label="Jurisdiction Type" name="jurisdiction" value={filters.jurisdiction} onChange={handleFilterChange} options={jurisdictionOptions} />
                <SelectInput label="Onboard Status" name="onboarded" value={filters.onboarded} onChange={handleFilterChange} options={onbardedOptions} />
                <SelectInput label="Sync Status" name="syncStatus" value={filters.syncStatus} onChange={handleFilterChange} options={syncStatusOptions} />
              </div>
              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200/80 md:pl-5">
                <AppButton variant="primary" icon={Filter} onClick={() => {}}>Apply</AppButton>
                <AppButton variant="secondary" icon={RefreshCw} className="px-3" onClick={handleResetFilters}>
                  <span className="sr-only">Reset</span>
                </AppButton>
              </div>
            </div>
          </GlassCard>

          {/* --- Contractor Table --- */}
          <GlassCard noHover className="bg-white/90">
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by District..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <AppButton variant="exportPdf" icon={FileText} onClick={() => {}}>Export PDF</AppButton>
                <AppButton variant="exportExcel" icon={FileIcon} onClick={() => {}}>Export Excel</AppButton>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px] text-sm text-left">
                <thead className="bg-blue-100/70 sticky top-0 backdrop-blur-sm">
                  <tr>
                    <ThSortable sortKey="district" title="District" handleSort={handleSort} sortIcon={getSortIcon('district')} />
                    <ThSortable sortKey="type" title="Jurisdiction" handleSort={handleSort} sortIcon={getSortIcon('type')} />
                    <ThSortable sortKey="onboarded" title="Onboarded" handleSort={handleSort} sortIcon={getSortIcon('onboarded')} />
                    <ThSortable sortKey="lastSync" title="Last Sync" handleSort={handleSort} sortIcon={getSortIcon('lastSync')} />
                    <ThSortable sortKey="incidents" title="Incidents Logged" handleSort={handleSort} sortIcon={getSortIcon('incidents')} />
                    <ThSortable sortKey="cases" title="Total Cases" handleSort={handleSort} sortIcon={getSortIcon('cases')} />
                    <th className="px-5 py-4 font-semibold text-gray-600 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {paginatedData.map((d) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(239, 246, 255, 0.8)' }} // bg-blue-50/80
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer"
                    >
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-navy-800">{d.district}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          d.type === 'CP' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-teal-100 text-teal-800'
                        }`}>
                          {d.type === 'CP' ? <Building size={14} /> : <Shield size={14} />}
                          {d.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <OnboardStatusBadge status={d.onboarded} />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <SyncStatus lastSync={d.lastSync} />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center">{d.incidents}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center">{d.cases}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <AppButton variant="action" icon={Eye} onClick={() => {}} className="px-3">
                            <span className="sr-only">View</span>
                          </AppButton>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* --- Pagination --- */}
            <div className="p-4 border-t border-gray-200/80 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedData.length}</span> of <span className="font-semibold">{sortedData.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeftIcon size={18} />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRightIcon size={18} />
                </button>
              </div>
            </div>
          </GlassCard>

          {/* --- Footer --- */}
          <footer className="text-center text-gray-500 text-sm mt-12 pb-6">
            “Digital monitoring ensures timely law enforcement and state-wide compliance.”
            <p className="mt-1">&copy; {new Date().getFullYear()} DGP Office, State Command Center. All rights reserved.</p>
          </footer>
        </main>

      </motion.div>
    </>
  );
}

