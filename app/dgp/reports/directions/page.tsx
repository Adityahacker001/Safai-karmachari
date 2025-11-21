'use client';

import React, { useState, useMemo, useEffect } from 'react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '@/components/ui/stat-card';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  ListFilter,
  RotateCcw,
  RefreshCw,
  FileDown,
  Users,
  Briefcase,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  X,
  Download,
  Search,
  ChevronDown,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Printer,
  FileSpreadsheet,
  HelpCircle,
  ArrowUpCircle,
  Calendar,
  Landmark,
  User,
  File,
  Loader2,
  BarChart2,
  PieChart,
  TrendingUp,
  TrendingDown,
  Hash,
  MapPin,
  ClipboardCheck,
  AlertOctagon,
  FileCheck2,
  Filter,
  Shield
} from 'lucide-react';
import {
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Placeholder implementation for CustomTooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// --- TYPES ---
type DirectionStatus = "Complied" | "Pending" | "In-Process";
type IssuedBy = "NSKC" | "Judiciary" | "Ministry" | "DGP Office";

type Direction = {
  id: string;
  issuedBy: IssuedBy;
  district: string;
  dateReceived: string;
  summary: string;
  status: DirectionStatus;
  daysPending: number;
  docs: { name: string, url: string }[];
  // Modal Data
  fullDescription: string;
  actionTaken: string;
  complianceDate?: string;
  policeUnit: string;
};



// --- MOCK DATA ---

const mockKpis = {
  totalDirections: { value: "82", change: "+5" },
  complied: { value: "65", change: "+10" },
  pending: { value: "17", change: "-5" },
  avgPendingDays: { value: "14.2", change: "+2.1d" },
  highPriorityPending: { value: "3", change: "+1" },
};

const mockDirections: Direction[] = [
  {
    id: 'DIR-2025-001',
    issuedBy: 'NSKC',
    district: 'New Delhi',
    dateReceived: '2025-10-25',
    summary: 'Submit report on FIR-00234 (Rakesh Sharma case).',
    status: 'In-Process',
    daysPending: 5,
    docs: [{ name: 'DIR_NSKC_001.pdf', url: '#' }],
    fullDescription: 'Urgently submit the complete investigation report and compensation status for the death of Safai Karmachari Rakesh Sharma (Incident INC-2025-00123).',
    actionTaken: 'Report compiled, awaiting final signature from CP office. Expected submission by 2025-11-02.',
    policeUnit: 'CP Office, New Delhi'
  },
  {
    id: 'DIR-2025-002',
    issuedBy: 'Judiciary',
    district: 'Dwarka',
    dateReceived: '2025-10-10',
    summary: 'Action taken report on non-filing of FIR for Priya Singh.',
    status: 'Complied',
    daysPending: 0,
    docs: [{ name: 'Compliance_Report_002.pdf', url: '#' }, { name: 'FIR_Copy_00255.pdf', url: '#' }],
    fullDescription: 'Provide justification for the delay in filing the FIR for the injury case of Priya Singh (Incident INC-2025-00100) and report on subsequent action.',
    actionTaken: 'FIR-00255 has been filed on 2025-10-11. IO has been assigned. Compliance report submitted.',
    complianceDate: '2025-10-12',
    policeUnit: 'SP Office, Dwarka'
  },
  {
    id: 'DIR-2025-003',
    issuedBy: 'Ministry',
    district: 'South Delhi',
    dateReceived: '2025-09-15',
    summary: 'Report on harassment allegations by SHG-03.',
    status: 'Pending',
    daysPending: 45,
    docs: [{ name: 'MIN_DIR_003.pdf', url: '#' }],
    fullDescription: 'Investigate and report on the allegations of harassment and wage theft filed by Dwarka-SHG-03 against Contractor "Urban Services".',
    actionTaken: 'Initial inquiry conducted. Awaiting statements from contractor.',
    policeUnit: 'SP Office, South Delhi'
  },
  {
    id: 'DIR-2025-004',
    issuedBy: 'DGP Office',
    district: 'Rohtak',
    dateReceived: '2025-10-28',
    summary: 'Review all pending compensation cases for SK workers.',
    status: 'In-Process',
    daysPending: 2,
    docs: [],
    fullDescription: 'All SP units must review and submit a status report on all pending compensation cases (Sanctioned but not Paid) for Safai Karmacharis in their district.',
    actionTaken: 'Report compilation in progress.',
    policeUnit: 'SP Office, Rohtak'
  },
];

const mockPieData = [
  { name: 'Complied', value: 65, fill: '#10b981' }, // Emerald
  { name: 'Pending', value: 17, fill: '#f59e0b' }, // Amber
];

const mockBarData = [
  { name: 'NSKC', Directions: 40, fill: '#1e3a8a' }, // Navy
  { name: 'Judiciary', Directions: 15, fill: '#2563eb' }, // Royal Blue
  { name: 'Ministry', Directions: 12, fill: '#3b82f6' }, // Blue
  { name: 'DGP Office', Directions: 15, fill: '#60a5fa' }, // Sky Blue
];

const filterOptions = {
  districts: ["All Districts", "New Delhi", "South Delhi", "Dwarka", "Rohtak"],
  issuedBy: ["All Authorities", "NSKC", "Judiciary", "Ministry", "DGP Office"],
  statuses: ["All Statuses", "Complied", "Pending", "In-Process"],
  timePeriods: ["This FY", "This Quarter", "This Month", "Last 30 Days"],
};

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 */
const GlassCard = ({ children, className = "", noHover = false }: {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { y: -5, boxShadow: '0 20px 30px -10px rgba(0, 70, 130, 0.1)', transition: { duration: 0.2 } }}
    className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-sky-100 ${className}`}
  >
    {children}
  </motion.div>
);



/**
 * 3. StatusBadge Component
 */
const StatusBadge = ({ status }: { status: DirectionStatus }) => {
  const statusConfig: { [key in DirectionStatus]: { icon: JSX.Element, styles: string } } = {
    "Pending": { icon: <AlertTriangle size={12} />, styles: "bg-red-100 text-red-900 border-red-300" },
    "Complied": { icon: <CheckCircle size={12} />, styles: "bg-emerald-100 text-emerald-900 border-emerald-200" },
    "In-Process": { icon: <Clock size={12} />, styles: "bg-amber-100 text-amber-900 border-amber-300" },
  };
  const config = statusConfig[status] || { icon: null, styles: "bg-slate-100 text-slate-800 border-slate-200" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${config.styles}`}>
      {config.icon}
      {status}
    </span>
  );
};

/**
 * 4. DaysPendingBadge Component
 */
const DaysPendingBadge = ({ days }: { days: number }) => {
  if (days <= 0) return <span className="text-emerald-700">-</span>;
  
  let styles = "bg-emerald-100 text-emerald-900";
  if (days > 7 && days <= 30) {
    styles = "bg-amber-100 text-amber-900 animate-pulse";
  } else if (days > 30) {
    styles = "bg-red-100 text-red-900 font-bold animate-pulse";
  }

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {days} {days === 1 ? 'Day' : 'Days'}
    </span>
  );
};


/**
 * 5. Styled Button Component
 */
const StyledButton = ({ children, onClick, variant = 'primary', className = "", disabled = false }: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'exportPdf' | 'exportExcel' | 'icon';
  className?: string;
  disabled?: boolean;
}) => {
  const baseStyle = "px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-navy-700 text-white hover:bg-navy-800 focus:ring-navy-500 shadow-lg shadow-navy-500/30 hover:shadow-xl",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
    exportPdf: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-lg shadow-red-500/20",
    exportExcel: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400 shadow-lg shadow-emerald-500/20",
    icon: "p-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 focus:ring-sky-400"
  };
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

/**
 * 6. InfoItem Component (Used in Modal)
 */
const InfoItem = ({ label, value, icon, className = "" }: {
  label: string;
  value: React.ReactNode;
  icon: JSX.Element;
  className?: string;
}) => (
  <div className={`bg-slate-50/80 p-3 rounded-xl border border-slate-200 ${className}`}>
    <h5 className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
      {icon}
      {label}
    </h5>
    <div className="text-sm font-semibold text-navy-800 mt-1">{value || 'N/A'}</div>
  </div>
);

/**
 * 7. DirectionDetailModal Component
 */
const DirectionDetailModal = ({ direction, onClose }: { direction: Direction | null, onClose: () => void }) => (
  <AnimatePresence>
    {direction && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden mx-2 sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span className="p-1.5 sm:p-2 bg-navy-100 text-navy-700 rounded-full"><FileText size={16} className="sm:hidden" /><FileText size={20} className="hidden sm:block" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-navy-900 truncate">Direction Details</h3>
                <span className="inline-block mt-1 sm:mt-0 sm:ml-2 px-2 sm:px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 truncate max-w-full">
                  {direction.id}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 sm:p-2 -mr-1 sm:-mr-2">
              <X size={20} className="sm:hidden" />
              <X size={24} className="hidden sm:block" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-3 sm:p-4 md:p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column (Meta) */}
              <div className="lg:col-span-1 bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200 space-y-3 sm:space-y-4">
                <InfoItem label="Status" value={<StatusBadge status={direction.status} />} icon={<AlertTriangle size={14} />} />
                <InfoItem label="Days Pending" value={<DaysPendingBadge days={direction.daysPending} />} icon={<Clock size={14} />} />
                <InfoItem label="Issuing Authority" value={direction.issuedBy} icon={<Landmark size={14} />} />
                <InfoItem label="Assigned District" value={direction.district} icon={<MapPin size={14} />} />
                <InfoItem label="Police Unit" value={direction.policeUnit} icon={<Shield size={14} />} />
                <InfoItem label="Date Received" value={direction.dateReceived} icon={<Calendar size={14} />} />
                <InfoItem label="Compliance Date" value={direction.complianceDate} icon={<CheckCircle size={14} />} />
              </div>

              {/* Right Column (Details) */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Full Directive Summary</h4>
                  <p className="text-slate-700 leading-relaxed">{direction.fullDescription}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Action Taken Summary</h4>
                  <p className="text-slate-700 leading-relaxed">{direction.actionTaken || 'No action logged yet.'}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-500 mb-2">Supporting Documents</h4>
                  {direction.docs.length > 0 ? (
                    direction.docs.map((doc, idx) => (
                      <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium mb-1">
                        <File size={16} /> {doc.name}
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 italic">No documents attached.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 bg-slate-50 border-t border-slate-200">
            <StyledButton onClick={onClose} variant="secondary" className="text-xs sm:text-sm py-2 sm:py-2.5">
              <X size={14} className="sm:hidden" />
              <X size={16} className="hidden sm:block" />
              Close
            </StyledButton>
            <StyledButton onClick={() => {}} variant="primary" className="text-xs sm:text-sm py-2 sm:py-2.5">
              <Printer size={14} className="sm:hidden" />
              <Printer size={16} className="hidden sm:block" />
              Download Case Detail
            </StyledButton>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * 8. CustomTooltip Component
 */
// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-2 rounded shadow">
//         <p className="text-sm font-medium">{label}</p>
//         <p className="text-xs text-gray-500">{payload[0].value}</p>
//       </div>
//     );
//   }
//   return null;
// };

// Fix type errors for label function
const labelFunction = ({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`;

// --- MAIN PAGE COMPONENT ---
export default function DirectionReport() {
  const [hasMounted, setHasMounted] = useState(false);
  // Show the integrated loader while the page initializes (consistent with other pages)
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    district: "All Districts",
    issuedBy: "All Authorities",
    status: "All Statuses",
    timePeriod: "This FY",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);

  useEffect(() => { 
    setHasMounted(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      district: "All Districts",
      issuedBy: "All Authorities",
      status: "All Statuses",
      timePeriod: "This FY",
    });
    setSearchTerm("");
  };

  const filteredDirections = useMemo(() => {
    return mockDirections
      .filter(d => filters.district === "All Districts" || d.district === filters.district)
      .filter(d => filters.issuedBy === "All Authorities" || d.issuedBy === filters.issuedBy)
      .filter(d => filters.status === "All Statuses" || d.status === filters.status)
      .filter(d => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          d.id.toLowerCase().includes(searchLower) ||
          d.summary.toLowerCase().includes(searchLower) ||
          d.district.toLowerCase().includes(searchLower) ||
          d.issuedBy.toLowerCase().includes(searchLower) ||
          d.status.toLowerCase().includes(searchLower) ||
          d.dateReceived.toLowerCase().includes(searchLower) ||
          (d.complianceDate ?? "").toLowerCase().includes(searchLower)
        );
      });
  }, [filters, searchTerm]);
  
  const paginatedDirections = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDirections.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDirections, currentPage]);
  
  const totalPages = Math.ceil(filteredDirections.length / 10);

  // Use the shared IntegratedLoader while mounting or loading
  if (!hasMounted || loading) {
    return <IntegratedLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
    >
      {/* --- Enhanced Header --- */}
      <header className="max-w-7xl mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
              Direction Report
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold mt-1 sm:mt-2 lg:mt-3 drop-shadow-lg">
              State-wide monitoring of directives & compliance
            </p>
          </div>
          <nav className="text-xs sm:text-sm font-bold text-white w-full lg:w-auto" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 bg-white/20 backdrop-blur-lg rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-6 py-2 sm:py-2.5 lg:py-3 border border-white/30 shadow-lg overflow-x-auto">
              <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md whitespace-nowrap">DGP Dashboard</a></li>
              <li><ChevronRight size={12} className="md:hidden text-white/70" /></li>
              <li><ChevronRight size={14} className="hidden md:block lg:hidden text-white/70" /></li>
              <li><ChevronRight size={16} className="hidden lg:block text-white/70 drop-shadow-md" /></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md whitespace-nowrap">Reports & Analytics</a></li>
              <li><ChevronRight size={12} className="md:hidden text-white/70" /></li>
              <li><ChevronRight size={14} className="hidden md:block lg:hidden text-white/70" /></li>
              <li><ChevronRight size={16} className="hidden lg:block text-white/70 drop-shadow-md" /></li>
              <li className="font-black text-yellow-300 drop-shadow-md whitespace-nowrap">Direction Report</li>
            </ol>
          </nav>
        </div>
      </header>
      
      {/* --- KPI Metrics --- */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <StatCard title="Total Directions" value={mockKpis.totalDirections.value} icon={ClipboardCheck} color="blue" />
        <StatCard title="Complied" value={mockKpis.complied.value} icon={CheckCircle} color="green" />
        <StatCard title="Pending" value={mockKpis.pending.value} icon={Clock} color="amber" />
        <StatCard title="Avg. Pending Days" value={mockKpis.avgPendingDays.value} icon={AlertTriangle} color="red" />
      </section>

      {/* --- Enhanced Filter Panel --- */}
      <GlassCard className="max-w-7xl mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg" noHover>
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Filter Directions
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <select name="district" value={filters.district} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.districts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="issuedBy" value={filters.issuedBy} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.issuedBy.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="timePeriod" value={filters.timePeriod} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.timePeriods.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 gap-3 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
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
              {/* <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-stretch sm:justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 flex-1 sm:flex-initial"
                >
                  <FileDown size={14} className="sm:hidden" />
                  <FileDown size={16} className="hidden sm:block" />
                  PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex-1 sm:flex-initial"
                >
                  <FileSpreadsheet size={14} className="sm:hidden" />
                  <FileSpreadsheet size={16} className="hidden sm:block" />
                  Excel
                </motion.button>
              </div> */}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* --- Main Content (Table) --- */}
      <div className="max-w-7xl mx-auto">
        
        {/* --- Enhanced Main Table --- */}
        <GlassCard className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-500/20" noHover>
          {/* Search Bar Above Table */}
          <div className="p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-gray-200/80">
            <div className="relative w-full sm:w-auto sm:flex-grow-0">
              <Search size={16} className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Search size={18} className="hidden sm:block absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search directions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 md:w-72 pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 flex-1 sm:flex-initial"
              >
                <FileDown size={14} className="sm:hidden" />
                <FileDown size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Export </span>PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 flex-1 sm:flex-initial"
              >
                <FileSpreadsheet size={14} className="sm:hidden" />
                <FileSpreadsheet size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Export </span>Excel
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-5 px-3 sm:px-4 md:px-5">
            <table className="table-auto w-full min-w-[800px]">
              <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
                <tr>
                  <th className="th-cell">Direction ID</th>
                  <th className="th-cell">Issued By</th>
                  <th className="th-cell">District</th>
                  <th className="th-cell">Date Received</th>
                  <th className="th-cell">Summary</th>
                  <th className="th-cell">Status</th>
                  <th className="th-cell">Days Pending</th>
                  <th className="th-cell">Docs</th>
                  <th className="th-cell">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {paginatedDirections.map((d, index) => (
                  <motion.tr
                    key={d.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                      scale: 1.005,
                    }}
                    className={`cursor-pointer transition-all duration-300 ${
                      d.status === "Pending" ? 'bg-red-50/70 hover:bg-red-100/70' : 
                      d.status === "In-Process" ? 'bg-amber-50/70 hover:bg-amber-100/70' :
                      'bg-white hover:bg-blue-50/50'
                    }`}
                  >
                    <td className="td-cell font-medium text-navy-800">{d.id}</td>
                    <td className="td-cell">{d.issuedBy}</td>
                    <td className="td-cell">{d.district}</td>
                    <td className="td-cell">{d.dateReceived}</td>
                    <td className="td-cell max-w-xs truncate" title={d.summary}>{d.summary}</td>
                    <td className="td-cell"><StatusBadge status={d.status} /></td>
                    <td className="td-cell text-center"><DaysPendingBadge days={d.daysPending} /></td>
                    <td className="td-cell text-center">
                      {d.docs.length > 0 ? (
                        <FileText size={16} className="text-sky-600" />
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="td-cell">
                      <StyledButton onClick={() => setSelectedDirection(d)} variant="icon" className="p-1.5 h-auto">
                        <Eye size={16} />
                      </StyledButton>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center border-t border-sky-100 gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">Rows per page:</span>
                <select className="form-select-sm p-1.5 text-xs sm:text-sm" defaultValue="10">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                Showing {paginatedDirections.length} of {filteredDirections.length} results
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <StyledButton onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="secondary" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm">
                <ArrowLeft size={14} className="sm:hidden" />
                <ArrowLeft size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Previous</span>
              </StyledButton>
              <span className="px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>
              <StyledButton onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="secondary" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm">
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={14} className="sm:hidden" />
                <ArrowRight size={16} className="hidden sm:block" />
              </StyledButton>
            </div>
          </div>
        </GlassCard>

      </div>

      {/* --- Footer --- */}
      <footer className="text-center text-slate-500 text-xs sm:text-sm mt-8 sm:mt-10 lg:mt-12 pb-4 sm:pb-6 max-w-7xl mx-auto">
        <p className="italic px-4">"Data monitored by DGP Office — Compliance Governance System"</p>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 px-4">
          <a href="#" className="flex items-center gap-1 sm:gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
            <HelpCircle size={12} className="sm:hidden" />
            <HelpCircle size={14} className="hidden sm:block" />
            Help & Support
          </a>
        </div>
      </footer>

      {/* --- Modal --- */}
      <DirectionDetailModal direction={selectedDirection} onClose={() => setSelectedDirection(null)} />

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
          border-radius: 0.5rem; /* rounded-lg */
          border: 1px solid #cbd5e1; /* slate-300 */
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
          border-color: #2563eb; /* royal-blue-600 */
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
        
        /* Table Styles */
        .th-cell {
          padding: 0.85rem 1rem;
          text-align: left;
          font-size: 0.75rem; /* 12px */
          color: #475569; /* slate-600 */
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .td-cell {
          padding: 0.9rem 1rem;
          white-space: nowrap;
          font-size: 0.875rem; /* 14px */
          color: #334155; /* slate-700 */
        }
        
        .info-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid;
          background-color: #fff;
        }
        
        /* Chart Tooltip */
        .custom-tooltip {
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .tooltip-label {
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 4px;
        }

      `}</style>
    </motion.div>
  );
}

