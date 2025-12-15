'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  TowerControl,
  FileDown,
  FileSpreadsheet,
  Users,
  X
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

import IntegratedLoader from '@/components/layout/IntegratedLoader';

// --- MOCK DATA & OPTIONS ---

const mockMetrics = {
  totalDistricts: 12,
  onboardedDistricts: 9,
  totalIncidents: 443,
  totalCases: 347,
  averageCompliance: 78.5,
  syncHealthy: 7
};

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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);


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
      if (!searchTerm) {
        const matchesDistrict = filters.district === 'All' || d.district === filters.district;
        const matchesJurisdiction = filters.jurisdiction === 'All' || d.type === filters.jurisdiction;
        const matchesOnboarded = filters.onboarded === 'All' || d.onboarded === filters.onboarded;
        
        const syncStatus = getSyncStatus(d.lastSync).status;
        const matchesSync = filters.syncStatus === 'All'
          || (filters.syncStatus === 'OK' && syncStatus === 'OK')
          || (filters.syncStatus === 'Delayed' && syncStatus === 'Delayed')
          || (filters.syncStatus === 'Failed' && syncStatus === 'Failed')
          || (filters.syncStatus === 'N/A' && syncStatus === 'N/A');

        return matchesDistrict && matchesJurisdiction && matchesOnboarded && matchesSync;
      }
      
      // Global search across all fields
      const searchLower = searchTerm.toLowerCase();
      const globalMatch = (
        d.id.toLowerCase().includes(searchLower) ||
        d.district.toLowerCase().includes(searchLower) ||
        d.type.toLowerCase().includes(searchLower) ||
        d.onboarded.toLowerCase().includes(searchLower) ||
        d.incidents.toString().includes(searchLower) ||
        d.cases.toString().includes(searchLower) ||
        d.compliance.toString().includes(searchLower) ||
        (d.lastSync && d.lastSync.toLowerCase().includes(searchLower)) ||
        getSyncStatus(d.lastSync).status.toLowerCase().includes(searchLower)
      );
      
      if (!globalMatch) return false;
      
      const matchesDistrict = filters.district === 'All' || d.district === filters.district;
      const matchesJurisdiction = filters.jurisdiction === 'All' || d.type === filters.jurisdiction;
      const matchesOnboarded = filters.onboarded === 'All' || d.onboarded === filters.onboarded;
      
      const syncStatus = getSyncStatus(d.lastSync).status;
      const matchesSync = filters.syncStatus === 'All'
        || (filters.syncStatus === 'OK' && syncStatus === 'OK')
        || (filters.syncStatus === 'Delayed' && syncStatus === 'Delayed')
        || (filters.syncStatus === 'Failed' && syncStatus === 'Failed')
        || (filters.syncStatus === 'N/A' && syncStatus === 'N/A');

      return matchesDistrict && matchesJurisdiction && matchesOnboarded && matchesSync;
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

  // Details modal state
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);

  const openDetails = (d: any) => {
    const details = {
      id: d.id,
      district: d.district,
      jurisdiction: d.type,
      officerName: d.officerName || 'N/A',
      designation: d.designation || d.type || 'N/A',
      email: d.email || 'N/A',
      contact: d.contact || 'N/A',
      operationalStatus: d.operationalStatus || 'Active',
      onboarding: d.onboarded || 'No',
      dateOnboarded: d.dateOnboarded || (d.onboarded === 'Yes' ? '2025-01-01' : null),
      systemAccess: d.systemAccess || (d.onboarded === 'Yes' ? 'Yes' : 'No'),
      lastSync: d.lastSync || null,
      syncStatus: getSyncStatus(d.lastSync).status,
      syncFailureReason: d.syncFailureReason || null,
      totals: {
        incidents: d.incidents || 0,
        cases: d.cases || 0,
        firs: d.firs || Math.floor((d.cases || 0) * 0.2),
        chargeSheets: d.chargeSheets || Math.floor((d.cases || 0) * 0.07),
        underInvestigation: d.underInvestigation || Math.floor((d.cases || 0) * 0.25),
        closed: d.closed || Math.floor((d.cases || 0) * 0.6),
      },
      compliance: {
        firForAllSewerDeaths: d.firForAllSewerDeaths || 'Pending',
        compensationInitiated: d.compensationInitiated || 'Pending',
        manualScavengingIdentified: d.manualScavengingIdentified || 'Pending',
        actionAgainstOfficials: d.actionAgainstOfficials || 'Pending',
        rehabilitationInitiated: d.rehabilitationInitiated || 'Pending',
      },
      audit: {
        lastUpdatedOn: d.lastUpdatedOn || d.lastSync || new Date().toISOString(),
        updatedBy: d.updatedBy || 'District System',
        reportingCycle: d.reportingCycle || 'Monthly',
      }
    };

    setSelectedDistrict(details);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedDistrict(null);
  };

  // lock body scroll while modal open
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    if (detailsOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [detailsOpen]);
 
  if (loading) return <IntegratedLoader />;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 font-sans text-navy-900"
      >
        <main className="max-w-8xl mx-auto">
          {/* --- Enhanced Header --- --*/}
          <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                  District SP/CP Onboarding Report
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold mt-1 sm:mt-2 lg:mt-3 drop-shadow-lg">
                  Compliance & system reporting status of all districts
                </p>
              </div>
              <nav className="text-xs sm:text-sm font-bold text-white" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border border-white/30 shadow-lg">
                  <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Dashboard</a></li>
                  <li><ChevronRightIcon size={14} className="sm:hidden text-white/70" /></li>
                  <li><ChevronRightIcon size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
                  <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Reports</a></li>
                  <li><ChevronRightIcon size={14} className="sm:hidden text-white/70" /></li>
                  <li><ChevronRightIcon size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
                  <li className="font-black text-yellow-300 drop-shadow-md">Onboarding</li>
                </ol>
              </nav>
            </div>
          </header>

          {/* --- Enhanced Metric Cards --- */}
          <section className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard title="Total Districts" value={mockMetrics.totalDistricts.toString()} icon={Building} color="blue" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard title="Onboarded" value={mockMetrics.onboardedDistricts.toString()} icon={CheckCircle2} color="green" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard title="Total Incidents" value={mockMetrics.totalIncidents.toString()} icon={AlertTriangle} color="orange" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard title="Avg Compliance" value={`${mockMetrics.averageCompliance}%`} icon={TowerControl} color="purple" />
            </motion.div>
          </section>

          {/* --- Enhanced Filter Bar --- */}
          <GlassCard className="mb-4 sm:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg" noHover>
            <div className="p-3 sm:p-4 lg:p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Filter District Status
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  <select name="district" value={filters.district} onChange={handleFilterChange} className="form-select-sm">
                    {districtOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <select name="jurisdiction" value={filters.jurisdiction} onChange={handleFilterChange} className="form-select-sm">
                    {jurisdictionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <select name="onboarded" value={filters.onboarded} onChange={handleFilterChange} className="form-select-sm">
                    {onbardedOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <select name="syncStatus" value={filters.syncStatus} onChange={handleFilterChange} className="form-select-sm">
                    {syncStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {/* <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Global search..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input-sm pl-9 w-full" 
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div> */}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      <Filter size={14} className="sm:hidden" />
                      <Filter size={16} className="hidden sm:block" />
                      <span className="hidden sm:inline">Apply Filters</span>
                      <span className="sm:hidden">Filter</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, rotate: 180 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleResetFilters}
                    >
                      <RefreshCw size={14} className="sm:hidden" />
                      <RefreshCw size={16} className="hidden sm:block lg:hidden" />
                      <RefreshCw size={18} className="hidden lg:block" />
                    </motion.button>
                  </div>
                 
                </div>
              </div>
            </div>
          </GlassCard>

          {/* --- District Status Table --- */}
          <GlassCard noHover className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-500/20">
            {/* Global Search Bar */}
            <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200/50">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search districts, SP/CP names..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300/50 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200" 
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FileDown size={16} />
                    <span className="hidden sm:inline">Export PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FileSpreadsheet size={16} />
                    <span className="hidden sm:inline">Export Excel</span>
                    <span className="sm:hidden">Excel</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-b-lg sm:rounded-b-xl">
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
                  {paginatedData.map((d, index) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                        scale: 1.005,
                      }}
                      className="cursor-pointer transition-all duration-300"
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
                          <AppButton variant="action" icon={Eye} onClick={() => openDetails(d)} className="px-3">
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

      {detailsOpen && selectedDistrict && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-700 to-indigo-700">
              <h2 className="text-lg font-bold text-white">District Overview — {selectedDistrict.district}</h2>
              <button onClick={closeDetails} aria-label="Close" className="p-2 rounded-md text-white bg-white/10 hover:bg-white/20">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {/* 1. District & Authority Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border-0 shadow-sm">
                  <h3 className="font-semibold mb-2 text-sky-900">District & Authority Overview</h3>
                  <div className="text-sm text-slate-700 space-y-2">
                    <div><span className="font-medium text-sky-800">District:</span> {selectedDistrict.district}</div>
                    <div><span className="font-medium text-sky-800">Jurisdiction:</span> {selectedDistrict.jurisdiction}</div>
                    <div><span className="font-medium text-sky-800">Officer-in-Charge:</span> {selectedDistrict.officerName}</div>
                    <div><span className="font-medium text-sky-800">Designation:</span> {selectedDistrict.designation}</div>
                    <div><span className="font-medium text-sky-800">Official Email:</span> {selectedDistrict.email}</div>
                    <div><span className="font-medium text-sky-800">Contact Number:</span> {selectedDistrict.contact}</div>
                    <div><span className="font-medium text-sky-800">Operational Status:</span> {selectedDistrict.operationalStatus}</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border-0 shadow-sm">
                  <h3 className="font-semibold mb-2 text-amber-800">Onboarding & System Status</h3>
                  <div className="text-sm text-slate-700 space-y-2">
                    <div className="flex items-center justify-between"><span className="font-medium text-amber-900">Onboarding Status</span><span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${selectedDistrict.onboarding === 'Yes' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>{selectedDistrict.onboarding}</span></div>
                    <div className="flex items-center justify-between"><span className="font-medium text-amber-900">Date of Onboarding</span><span className="text-sm text-slate-800">{selectedDistrict.dateOnboarded || 'N/A'}</span></div>
                    <div className="flex items-center justify-between"><span className="font-medium text-amber-900">System Access Granted</span><span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${selectedDistrict.systemAccess === 'Yes' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>{selectedDistrict.systemAccess}</span></div>
                    <div className="flex items-center justify-between"><span className="font-medium text-amber-900">Last Data Sync</span><span className="text-sm text-slate-800">{selectedDistrict.lastSync ? new Date(selectedDistrict.lastSync).toLocaleString() : 'N/A'}</span></div>
                    <div className="flex items-center justify-between"><span className="font-medium text-amber-900">Sync Status</span><span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${selectedDistrict.syncStatus === 'OK' ? 'bg-emerald-600 text-white' : (selectedDistrict.syncStatus === 'Delayed' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white')}`}>{selectedDistrict.syncStatus}</span></div>
                    {selectedDistrict.syncStatus === 'Failed' && selectedDistrict.syncFailureReason && (
                      <div><span className="font-medium text-amber-900">Sync Failure Reason:</span> <span className="text-sm text-red-700">{selectedDistrict.syncFailureReason}</span></div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Incident & Case Monitoring Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100">
                <h3 className="font-semibold mb-3 text-emerald-700">Incident & Case Monitoring Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-blue-600 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">Total Incidents</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.incidents}</div>
                  </div>
                  <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">Total Cases</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.cases}</div>
                  </div>
                  <div className="p-3 bg-amber-500 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">FIRs Filed</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.firs}</div>
                  </div>
                  <div className="p-3 bg-sky-500 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">Charge-sheets Filed</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.chargeSheets}</div>
                  </div>
                  <div className="p-3 bg-amber-600 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">Under Investigation</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.underInvestigation}</div>
                  </div>
                  <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-md text-center">
                    <div className="text-xs opacity-90">Cases Closed</div>
                    <div className="font-bold text-2xl">{selectedDistrict.totals.closed}</div>
                  </div>
                </div>
              </div>

              {/* 4. Compliance Indicators */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-white to-pink-50 border border-pink-100">
                <h3 className="font-semibold mb-3 text-pink-700">Compliance Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  {Object.entries(selectedDistrict.compliance).map(([key, val]) => {
                    const value = val as string;
                    return (
                      <div key={key} className="flex items-center justify-between bg-white/95 p-3 rounded-lg shadow-sm">
                        <div className="capitalize text-sm text-slate-700">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${value === 'Yes' ? 'bg-emerald-600 text-white' : (value === 'No' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white')}`}>{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Audit & Reporting Metadata */}
              <div className="p-3 text-xs text-slate-600 border-t bg-slate-50">
                <div>Data Last Updated On: <span className="font-medium text-slate-800">{new Date(selectedDistrict.audit.lastUpdatedOn).toLocaleString()}</span></div>
                <div>Updated By: <span className="font-medium text-slate-800">{selectedDistrict.audit.updatedBy}</span></div>
                <div>Reporting Cycle: <span className="font-medium text-slate-800">{selectedDistrict.audit.reportingCycle}</span></div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- Global Styles --- */}
      <style jsx global>{`
        /* Define custom colors */
        .bg-navy-700 { background-color: #1e3a8a; }
        .hover\\:bg-navy-800:hover { background-color: #1c357a; }
        .text-navy-800 { color: #1e3a8a; }
        .text-navy-900 { color: #172554; }
        .shadow-navy-500\\/30 { box-shadow: 0 10px 15px -3px rgb(30 58 138 / 0.3), 0 4px 6px -4px rgb(30 58 138 / 0.3); }
        .text-gold-400 { color: #facc15; }
        .border-sky-100 { border-color: #e0f2fe; }
        .bg-sky-50 { background-color: #f0f9ff; }
        .via-sky-50 { --tw-gradient-stops: var(--tw-gradient-from), #f0f9ff, var(--tw-gradient-to); }
        .to-slate-100 { --tw-gradient-to: #f1f5f9; }

        /* Form Input Styling */
        .form-input, .form-select, .form-input-sm, .form-select-sm {
          width: 100%;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input, .form-select {
           padding: 0.65rem 1rem;
        }
        .form-input-sm, .form-select-sm {
           padding: 0.5rem 0.75rem;
           font-size: 0.8rem;
        }
        .form-input:focus, .form-select:focus, .form-input-sm:focus, .form-select-sm:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
        }
        .form-select, .form-select-sm {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
      `}</style>
    </>
  );
}

