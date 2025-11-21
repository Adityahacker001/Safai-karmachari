'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import StatCard from '@/components/ui/stat-card';
import {
  UsersRound,
  ChevronRight as ChevronRightIcon,
  Shield,
  Building2,
  Users,
  AlertTriangle,
  FileSearch,
  ShieldAlert,
  BadgeCheck,
  Filter,
  RefreshCw,
  FileDown,
  FileText,
  Search,
  ArrowUp,
  ArrowDown,
  Eye,
  X,
  ChevronLeft as ChevronLeftIcon,
  Download,
  CalendarDays,
  List,
  ShieldCheck as ShieldCheckIcon,
  File as FileIcon
} from 'lucide-react';
import IntegratedLoader from "@/components/layout/IntegratedLoader";

// --- MOCK DATA & OPTIONS ---

const mockMetrics = {
  totalContractors: 132,
  totalWorkers: 8450,
  incidentsLinked: 42,
  firsFiled: 19,
  highRisk: 8,
  complianceScore: 92.5,
};

// Define a type for the contractor object keys
type ContractorKey = keyof typeof mockContractors[0];

const mockContractors = [
  { id: 'C-001', name: 'M/s. Cleanway Services', districts: ['Mumbai', 'Thane'], workers: 1200, incidents: 2, firs: 1, status: 'Active', risk: 'Low', compliance: 98, lastAudit: '2025-10-15', contract: 'doc-001.pdf', notices: [] },
  { id: 'C-002', name: 'UrbanDeep Cleaners Ltd.', districts: ['Pune', 'Nashik'], workers: 850, incidents: 0, firs: 0, status: 'Active', risk: 'Low', compliance: 99, lastAudit: '2025-10-10', contract: 'doc-002.pdf', notices: [] },
  { id: 'C-003', name: 'Safaai Solutions Pvt.', districts: ['Nagpur', 'Amravati'], workers: 600, incidents: 5, firs: 1, status: 'Under Watch', risk: 'Medium', compliance: 85, lastAudit: '2025-09-20', contract: 'doc-003.pdf', notices: ['notice-001.pdf'] },
  { id: 'C-004', name: 'A-1 Maintenance', districts: ['Aurangabad'], workers: 300, incidents: 8, firs: 3, status: 'High-Risk', risk: 'High-Risk', compliance: 65, lastAudit: '2025-09-15', contract: 'doc-004.pdf', notices: ['notice-002.pdf', 'notice-003.pdf'] },
  { id: 'C-005', name: 'Metro Waste Mgmt.', districts: ['Mumbai', 'Pune', 'Navi Mumbai'], workers: 2500, incidents: 1, firs: 0, status: 'Active', risk: 'Low', compliance: 97, lastAudit: '2025-10-20', contract: 'doc-005.pdf', notices: [] },
  { id: 'C-006', name: 'Rural Hygiene Co.', districts: ['Solapur', 'Kolhapur'], workers: 450, incidents: 3, firs: 0, status: 'Under Watch', risk: 'Medium', compliance: 88, lastAudit: '2025-09-30', contract: 'doc-006.pdf', notices: [] },
  { id: 'C-007', name: 'City InfraKeep', districts: ['Thane'], workers: 220, incidents: 12, firs: 5, status: 'Suspended', risk: 'High-Risk', compliance: 40, lastAudit: '2025-08-10', contract: 'doc-007.pdf', notices: ['notice-004.pdf', 'notice-005.pdf'] },
  { id: 'C-008', name: 'Pioneer Facility Mgmt.', districts: ['Nashik'], workers: 700, incidents: 0, firs: 0, status: 'Active', risk: 'Low', compliance: 99, lastAudit: '2025-10-18', contract: 'doc-008.pdf', notices: [] },
  { id: 'C-009', name: 'Deccan Sanitization', districts: ['Pune'], workers: 550, incidents: 1, firs: 0, status: 'Active', risk: 'Low', compliance: 96, lastAudit: '2025-10-12', contract: 'doc-009.pdf', notices: [] },
  { id: 'C-010', name: 'Vidarbha Clean-up', districts: ['Nagpur', 'Wardha'], workers: 350, incidents: 4, firs: 2, status: 'High-Risk', risk: 'High-Risk', compliance: 72, lastAudit: '2025-09-05', contract: 'doc-010.pdf', notices: ['notice-006.pdf'] },
  { id: 'C-011', name: 'Konkan Coastal Care', districts: ['Ratnagiri', 'Sindhudurg'], workers: 280, incidents: 1, firs: 0, status: 'Active', risk: 'Low', compliance: 95, lastAudit: '2025-10-01', contract: 'doc-011.pdf', notices: [] },
  { id: 'C-012', name: 'Marathwada Services', districts: ['Aurangabad', 'Nanded'], workers: 620, incidents: 6, firs: 1, status: 'Under Watch', risk: 'Medium', compliance: 82, lastAudit: '2025-09-22', contract: 'doc-012.pdf', notices: ['notice-007.pdf'] },
];

const districtOptions = ["All", "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati"];
const yearOptions = ["All", "2025-2026", "2024-2025", "2023-2024"];
const statusOptions = ["All", "Active", "Under Watch", "High-Risk", "Suspended"];
const riskOptions = ["All", "Low", "Medium", "High-Risk"];

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 * Reusable card with glassmorphism, border, and hover-lift animation.
 */
const GlassCard: React.FC<{ children: React.ReactNode; className?: string; noHover?: boolean }> = ({ children, className = "", noHover = false }) => (
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
 * 2. AnimatedNumber Component
 * Animates a number count-up.
 */
const AnimatedNumber: React.FC<{ value: number; isPercentage?: boolean }> = ({ value, isPercentage = false }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "circOut",
      onUpdate(latest) {
        if (isPercentage) {
          node.textContent = latest.toFixed(1);
        } else {
          node.textContent = Math.round(latest).toLocaleString('en-IN');
        }
      }
    });

    return () => controls.stop();
  }, [value, isPercentage]);

  return (
    <span ref={ref}>
      {isPercentage ? value.toFixed(1) : value}
    </span>
  );
};



/**
 * 4. AppButton Component
 * Reusable button with variants and motion.
 */
const AppButton: React.FC<{ children: React.ReactNode; onClick: () => void; variant?: string; icon?: React.ElementType; className?: string }> = ({ children, onClick, variant = 'primary', icon: Icon, className = "" }) => {
  const variants: Record<string, string> = {
    primary: "bg-navy-700 text-white hover:bg-navy-800 shadow-lg shadow-blue-500/20",
    secondary: "bg-gray-200 text-navy-800 hover:bg-gray-300",
    exportPdf: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20",
    exportExcel: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20",
    action: "bg-blue-100 text-blue-700 hover:bg-blue-200"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
};

/**
 * 5. StatusBadge & RiskBadge Components
 */
const StatusBadge: React.FC<{ status: "Active" | "Under Watch" | "High-Risk" | "Suspended" }> = ({ status }) => {
  const config = {
    "Active": "bg-emerald-100 text-emerald-800",
    "Under Watch": "bg-amber-100 text-amber-800",
    "High-Risk": "bg-red-100 text-red-800",
    "Suspended": "bg-gray-200 text-gray-800",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config[status]}`}>{status}</span>;
};

const RiskBadge: React.FC<{ risk: "Low" | "Medium" | "High-Risk" }> = ({ risk }) => {
  const config = {
    "Low": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Medium": "bg-amber-100 text-amber-800 border-amber-200",
    "High-Risk": "bg-red-100 text-red-800 border-red-200",
  };
  const dotConfig = {
    "Low": "bg-emerald-500",
    "Medium": "bg-amber-500",
    "High-Risk": "bg-red-500",
  };
  return <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config[risk]}`}>
    <span className={`w-2 h-2 rounded-full ${dotConfig[risk]}`} />
    {risk}
  </span>;
};

/**
 * 6. ContractorModal Component
 * Modal to show contractor details.
 */
const ContractorModal: React.FC<{ contractor: typeof mockContractors[0] | null; onClose: () => void }> = ({ contractor, onClose }) => {
  if (!contractor) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'circOut' }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-blue-100 bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-900">{contractor.name}</h2>
                  <p className="text-sm text-gray-600">Contractor ID: {contractor.id}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-500 rounded-full hover:bg-blue-100">
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <StatusBadge status={contractor.status as "Active" | "Under Watch" | "High-Risk" | "Suspended"} />
              <RiskBadge risk={contractor.risk as "Low" | "Medium" | "High-Risk"} />
              <span className="text-sm text-gray-600">Last Audit: {contractor.lastAudit}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section 1: Details */}
              <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-navy-800">Profile Details</h3>
                <div className="text-sm">
                  <strong className="text-gray-500 block">Districts Covered:</strong>
                  <span className="text-gray-800">{contractor.districts.join(', ')}</span>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-500 block">Total Workers:</strong>
                  <span className="text-gray-800">{contractor.workers.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-500 block">Compliance Score:</strong>
                  <span className="text-gray-800 font-bold">{contractor.compliance}%</span>
                </div>
              </div>

              {/* Section 2: Incidents */}
              <div className="flex flex-col gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-900">Incident Report</h3>
                <div className="text-sm">
                  <strong className="text-red-600 block">Incidents Linked:</strong>
                  <span className="text-red-700 font-bold">{contractor.incidents}</span>
                </div>
                <div className="text-sm">
                  <strong className="text-red-600 block">FIRs Filed:</strong>
                  <span className="text-red-800 font-bold">{contractor.firs}</span>
                </div>
                <div className="text-sm">
                  <strong className="text-red-600 block">Safety Notes:</strong>
                  <p className="text-red-800">
                    {contractor.incidents > 0 ? "Multiple warnings issued for lack of safety gear." : "No safety violations recorded."}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Documents */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-navy-800 mb-3">Documents & Notices</h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="flex items-center gap-2 text-sm font-medium text-blue-700">
                    <FileText size={16} />
                    Contract Agreement ({contractor.contract})
                  </span>
                  <Download size={16} className="text-gray-500" />
                </a>
                {contractor.notices.length > 0 ? (
                  contractor.notices.map((notice, index) => (
                    <a key={index} href="#" className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
                      <span className="flex items-center gap-2 text-sm font-medium text-amber-700">
                        <AlertTriangle size={16} />
                        Show Cause Notice ({notice})
                      </span>
                      <Download size={16} className="text-gray-500" />
                    </a>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-500 bg-gray-50 rounded-lg">No notices issued.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-100 border-t flex justify-end gap-3">
            <AppButton variant="secondary" onClick={onClose}>Close</AppButton>
            <AppButton variant="action" icon={FileSearch} onClick={() => {}}>Open FIR Records</AppButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function TotalContractorsReport() {
  // Loader logic (like example)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // All hooks must be declared unconditionally
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<{
    id: string;
    name: string;
    districts: string[];
    workers: number;
    incidents: number;
    firs: number;
    status: "Active" | "Under Watch" | "High-Risk" | "Suspended";
    risk: "Low" | "Medium" | "High-Risk";
    compliance: number;
    lastAudit: string;
    contract: string;
    notices: string[];
  } | null>(null);
  const [filters, setFilters] = useState({
    district: 'All',
    year: 'All',
    status: 'All',
    risk: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: ContractorKey, direction: 'asc' | 'desc' }>({ key: 'incidents', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Event Handlers
  const handleOpenModal = (contractor: typeof mockContractors[0]) => {
    setSelectedContractor({
      ...contractor,
      status: contractor.status as "Active" | "Under Watch" | "High-Risk" | "Suspended",
      risk: contractor.risk as "Low" | "Medium" | "High-Risk",
    });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      district: 'All',
      year: 'All',
      status: 'All',
      risk: 'All'
    });
    setSearchTerm('');
  };

  const handleSort = (key: ContractorKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Data Processing
  const filteredData = useMemo(() => {
    return mockContractors.filter(c => {
      // Global search across all fields
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        c.name.toLowerCase().includes(searchLower) || 
        c.id.toLowerCase().includes(searchLower) ||
        c.districts.some(district => district.toLowerCase().includes(searchLower)) ||
        c.workers.toString().includes(searchLower) ||
        c.incidents.toString().includes(searchLower) ||
        c.firs.toString().includes(searchLower) ||
        c.status.toLowerCase().includes(searchLower) ||
        c.risk.toLowerCase().includes(searchLower) ||
        c.compliance.toString().includes(searchLower) ||
        c.lastAudit.toLowerCase().includes(searchLower);
      
      const matchesDistrict = filters.district === 'All' || c.districts.includes(filters.district);
      const matchesStatus = filters.status === 'All' || c.status === filters.status;
      const matchesRisk = filters.risk === 'All' || c.risk === filters.risk;
      // Note: Year filter logic would need a date field on the contractor, omitting for simplicity.
      return matchesSearch && matchesDistrict && matchesStatus && matchesRisk;
    });
  }, [searchTerm, filters]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
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
  
  const getSortIcon = (key: ContractorKey): React.ReactNode => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
  
  // Only return loader if loading is true
  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <>      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 font-sans relative"
      >
        <main className="max-w-7xl mx-auto">
          {/* --- Enhanced Header --- */}
          <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="flex items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-lg leading-tight">
                    Total Contractors Report
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-medium mt-1 sm:mt-2 lg:mt-3 drop-shadow-md">
                    State-wide contractor compliance & incident mapping
                  </p>
                </div>
              </div>
              <nav className="text-xs sm:text-sm font-bold text-white overflow-x-auto" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-lg rounded-lg sm:rounded-xl lg:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border border-white/30 shadow-lg whitespace-nowrap">
                  <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Dashboard</a></li>
                  <li><ChevronRightIcon size={12} className="sm:hidden text-white/70" /></li>
                  <li><ChevronRightIcon size={16} className="hidden sm:block lg:hidden text-white/70 drop-shadow-md" /></li>
                  <li><ChevronRightIcon size={18} className="hidden lg:block text-white/70 drop-shadow-md" /></li>
                  <li className="hidden sm:block"><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Reports</a></li>
                  <li className="hidden sm:block"><ChevronRightIcon size={12} className="sm:hidden text-white/70" /></li>
                  <li className="hidden sm:block"><ChevronRightIcon size={16} className="hidden sm:block lg:hidden text-white/70 drop-shadow-md" /></li>
                  <li className="hidden sm:block"><ChevronRightIcon size={18} className="hidden lg:block text-white/70 drop-shadow-md" /></li>
                  <li className="font-black text-yellow-300 drop-shadow-md">Contractors</li>
                </ol>
              </nav>
            </div>
          </header>

          {/* --- Enhanced Metric Cards --- */}
          <section className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard title="Total Contractors" value={mockMetrics.totalContractors.toString()} icon={Building2} color="blue" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard title="Total Workers" value={mockMetrics.totalWorkers.toLocaleString('en-IN')} icon={Users} color="purple" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard title="Incidents Linked" value={mockMetrics.incidentsLinked.toString()} icon={AlertTriangle} color="orange" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard title="FIRs Filed" value={mockMetrics.firsFiled.toString()} icon={FileSearch} color="red" />
            </motion.div>
          </section>

          {/* --- Enhanced Filter Bar --- */}
          <GlassCard className="mb-4 sm:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg" noHover>
            <div className="p-3 sm:p-4 lg:p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-grow">
                  <SelectInput label="District" name="district" value={filters.district} onChange={handleFilterChange} options={districtOptions} />
                  <SelectInput label="Financial Year" name="year" value={filters.year} onChange={handleFilterChange} options={yearOptions} />
                  <SelectInput label="Status" name="status" value={filters.status} onChange={handleFilterChange} options={statusOptions} />
                  <SelectInput label="Risk Level" name="risk" value={filters.risk} onChange={handleFilterChange} options={riskOptions} />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                    onClick={() => {}}
                  >
                    <Filter size={14} className="sm:hidden" />
                    <Filter size={16} className="hidden sm:block lg:hidden" />
                    <Filter size={18} className="hidden lg:block" />
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
          </GlassCard>

          {/* --- Enhanced Contractor Table --- */}
          <GlassCard noHover className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl">
            <div className="p-3 sm:p-4 lg:p-6 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-gray-200/50">
              <div className="relative flex-1 lg:flex-grow-0">
                <Search size={16} className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <Search size={18} className="hidden sm:block lg:hidden absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <Search size={20} className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  placeholder="Search across all fields (name, ID, districts, workers, incidents, status...)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-80 pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl border border-blue-200 bg-gradient-to-r from-white to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base font-medium"
                />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
                  onClick={() => {}}
                >
                  <FileText size={14} className="sm:hidden" />
                  <FileText size={16} className="hidden sm:block lg:hidden" />
                  <FileText size={18} className="hidden lg:block" />
                  <span className="hidden sm:inline">Export PDF</span>
                  <span className="sm:hidden">PDF</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
                  onClick={() => {}}
                >
                  <FileIcon size={14} className="sm:hidden" />
                  <FileIcon size={16} className="hidden sm:block lg:hidden" />
                  <FileIcon size={18} className="hidden lg:block" />
                  <span className="hidden sm:inline">Export Excel</span>
                  <span className="sm:hidden">Excel</span>
                </motion.button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] lg:min-w-[1200px] text-xs sm:text-sm text-left">
                <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white sticky top-0 backdrop-blur-sm">
                  <tr>
                    <ThSortable sortKey="id" title="Sl. No." handleSort={handleSort} sortIcon={getSortIcon('id')} />
                    <ThSortable sortKey="name" title="Contractor Name" handleSort={handleSort} sortIcon={getSortIcon('name')} />
                    <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-semibold text-white uppercase tracking-wider">Districts Covered</th>
                    <ThSortable sortKey="workers" title="Workers" handleSort={handleSort} sortIcon={getSortIcon('workers')} />
                    <ThSortable sortKey="incidents" title="Incidents" handleSort={handleSort} sortIcon={getSortIcon('incidents')} />
                    <ThSortable sortKey="firs" title="FIRs" handleSort={handleSort} sortIcon={getSortIcon('firs')} />
                    <th className="hidden md:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-semibold text-white uppercase tracking-wider">Status</th>
                    <th className="hidden lg:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-semibold text-white uppercase tracking-wider">Risk Level</th>
                    <th className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-semibold text-white uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {paginatedData.map((c, index) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                        scale: 1.005,
                      }}
                      className="cursor-pointer bg-white hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap text-gray-800 font-bold">{c.id}</td>
                      <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap font-bold text-blue-900 max-w-[120px] sm:max-w-none truncate">{c.name}</td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 text-gray-700 max-w-xs truncate font-medium">{c.districts.join(', ')}</td>
                      <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap text-gray-800 font-bold text-right">{c.workers.toLocaleString('en-IN')}</td>
                      <td className={`px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap font-black text-center ${c.incidents > 0 ? 'text-orange-600' : 'text-green-600'}`}>{c.incidents}</td>
                      <td className={`px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap font-black text-center ${c.firs > 0 ? 'text-red-600' : 'text-green-600'}`}>{c.firs}</td>
                      <td className="hidden md:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap"><StatusBadge status={c.status as "High-Risk" | "Active" | "Under Watch" | "Suspended"} /></td>
                      <td className="hidden lg:table-cell px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap"><RiskBadge risk={c.risk as "Low" | "Medium" | "High-Risk"} /></td>
                      <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 whitespace-nowrap text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                          onClick={() => handleOpenModal(c)}
                        >
                          <Eye size={12} className="sm:hidden" />
                          <Eye size={14} className="hidden sm:block lg:hidden" />
                          <Eye size={16} className="hidden lg:block" />
                          <span className="hidden sm:inline">View</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* --- Enhanced Pagination --- */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200/50 bg-gray-50/50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-700 bg-white/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 text-center sm:text-left">
                Showing <span className="font-bold text-blue-600">{paginatedData.length}</span> of <span className="font-bold text-purple-600">{sortedData.length}</span> results
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronLeftIcon size={16} className="sm:hidden" />
                  <ChevronLeftIcon size={18} className="hidden sm:block lg:hidden" />
                  <ChevronLeftIcon size={20} className="hidden lg:block" />
                </motion.button>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white font-bold text-gray-800 rounded-lg sm:rounded-xl border border-gray-200 shadow-md text-xs sm:text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronRightIcon size={16} className="sm:hidden" />
                  <ChevronRightIcon size={18} className="hidden sm:block lg:hidden" />
                  <ChevronRightIcon size={20} className="hidden lg:block" />
                </motion.button>
              </div>
            </div>
          </GlassCard>

          {/* --- Enhanced Footer --- */}
          <footer className="text-center mt-6 sm:mt-8 lg:mt-12 pb-4 sm:pb-6 relative">
            <div className="bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/30 p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-purple-600/10"></div>
              <div className="relative z-10">
                <p className="text-sm sm:text-lg lg:text-2xl font-black text-white drop-shadow-2xl leading-relaxed">
                  "Accountability & safety compliance protect lives."
                </p>
                <p className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm lg:text-lg text-white/95 font-bold drop-shadow-lg">
                  © {new Date().getFullYear()} DGP Office, State Command Center. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>

        {/* --- Modal --- */}
        <AnimatePresence>
          {isModalOpen && <ContractorModal contractor={selectedContractor} onClose={handleCloseModal} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// --- Helper Sub-Components ---

const SelectInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5 sm:gap-2">
    <label htmlFor={name} className="text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl border border-blue-200 bg-gradient-to-r from-white to-blue-50 text-gray-800 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-purple-300 transition-all duration-300 shadow-md"
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const ThSortable: React.FC<{ sortKey: ContractorKey; title: string; handleSort: (key: ContractorKey) => void; sortIcon: React.ReactNode }> = ({ sortKey, title, handleSort, sortIcon }) => (
  <th
    className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/20 transition-all duration-300"
    onClick={() => handleSort(sortKey)}
  >
    <div className="flex items-center gap-1 sm:gap-2 hover:scale-105 transition-transform duration-200">
      {title}
      {sortIcon && <span className="text-yellow-300">{sortIcon}</span>}
    </div>
  </th>
);

