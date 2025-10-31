'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  ListFilter,
  RotateCcw,
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

type Kpi = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  gradient: string;
  glow: string;
};

// --- MOCK DATA ---

const mockKpis: Kpi[] = [
  { title: "Total Directions", value: "82", change: "+5", changeType: 'positive', icon: <ClipboardCheck size={28} />, gradient: "from-blue-600 to-blue-800", glow: "shadow-blue-500/40" },
  { title: "Complied", value: "65", change: "+10", changeType: 'positive', icon: <CheckCircle size={28} />, gradient: "from-emerald-500 to-emerald-700", glow: "shadow-emerald-500/40" },
  { title: "Pending", value: "17", change: "-5", changeType: 'positive', icon: <Clock size={28} />, gradient: "from-amber-500 to-amber-700", glow: "shadow-amber-500/40" },
  { title: "Avg. Pending Days", value: "14.2", change: "+2.1d", changeType: 'negative', icon: <AlertTriangle size={28} />, gradient: "from-slate-500 to-slate-700", glow: "shadow-slate-500/40" },
  { title: "High-Priority Pending", value: "3", change: "+1", changeType: 'negative', icon: <AlertOctagon size={28} />, gradient: "from-red-600 to-red-800", glow: "shadow-red-500/40" },
];

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
 * 2. KPI Card Component
 */
const KpiCard = ({ kpi }: { kpi: Kpi }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -6, boxShadow: `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), 0 0 0 4px rgba(255,255,255,0.5)`, transition: { duration: 0.2 } }}
    className={`relative rounded-xl shadow-lg p-5 text-white overflow-hidden ${kpi.gradient} ${kpi.glow}`}
  >
    <div className="relative z-10">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium opacity-90">{kpi.title}</span>
        {kpi.change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${kpi.changeType === 'positive' ? 'bg-white/20' : 'bg-red-500/50'}`}>
            {kpi.changeType === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {kpi.change}
          </span>
        )}
      </div>
      <div className="text-4xl font-bold mt-2 mb-1">{kpi.value}</div>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-10 z-0">
      {React.cloneElement(kpi.icon as React.ReactElement, { size: 80 })}
    </div>
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
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-navy-100 text-navy-700 rounded-full"><FileText size={20} /></span>
              <h3 className="text-lg font-semibold text-navy-900">Direction Details</h3>
              <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
                {direction.id}
              </span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column (Meta) */}
              <div className="md:col-span-1 bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-4">
                <InfoItem label="Status" value={<StatusBadge status={direction.status} />} icon={<AlertTriangle size={14} />} />
                <InfoItem label="Days Pending" value={<DaysPendingBadge days={direction.daysPending} />} icon={<Clock size={14} />} />
                <InfoItem label="Issuing Authority" value={direction.issuedBy} icon={<Landmark size={14} />} />
                <InfoItem label="Assigned District" value={direction.district} icon={<MapPin size={14} />} />
                <InfoItem label="Police Unit" value={direction.policeUnit} icon={<Shield size={14} />} />
                <InfoItem label="Date Received" value={direction.dateReceived} icon={<Calendar size={14} />} />
                <InfoItem label="Compliance Date" value={direction.complianceDate} icon={<CheckCircle size={14} />} />
              </div>

              {/* Right Column (Details) */}
              <div className="md:col-span-2 space-y-5">
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
          <div className="p-4 flex justify-end gap-3 bg-slate-50 border-t border-slate-200">
            <StyledButton onClick={onClose} variant="secondary">
              <X size={16} /> Close
            </StyledButton>
            <StyledButton onClick={() => {}} variant="primary">
              <Printer size={16} /> Download Case Detail
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
  const [filters, setFilters] = useState({
    district: "All Districts",
    issuedBy: "All Authorities",
    status: "All Statuses",
    timePeriod: "This FY",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);

  useEffect(() => { setHasMounted(true); }, []);

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
      .filter(d => d.summary.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [filters, searchTerm]);
  
  const paginatedDirections = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDirections.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDirections, currentPage]);
  
  const totalPages = Math.ceil(filteredDirections.length / 10);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-sky-50 to-slate-100">
        <Loader2 size={48} className="animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 lg:p-10 bg-gradient-to-br from-white via-sky-50 to-slate-100"
    >
      {/* --- Header --- */}
      <header className="max-w-7xl mx-auto mb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-slate-500" aria-label="Breadcrumb">
          <a href="#" className="hover:text-slate-700">DGP Dashboard</a>
          <ChevronRight size={16} className="mx-1.5" />
          <a href="#" className="hover:text-slate-700">Reports & Analytics</a>
          <ChevronRight size={16} className="mx-1.5" />
          <span className="text-slate-800 font-semibold">Direction Report</span>
        </nav>
        {/* Title */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-navy-700 text-gold-400 shadow-lg shadow-navy-500/30 border-2 border-white/50">
              <ClipboardCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Direction Report</h1>
              <p className="text-sm text-slate-600">State-wide monitoring of directives & compliance.</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* --- Filter Panel --- */}
      <GlassCard className="max-w-7xl mx-auto mb-8" noHover>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-sky-100">
          <ListFilter size={18} className="text-blue-700" />
          <h3 className="text-base font-semibold text-navy-800">Filter Directions</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
            <div className="relative col-span-2 lg:col-span-1">
              <input 
                type="text" 
                placeholder="Search ID or summary..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input-sm pl-9 w-full" 
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <StyledButton onClick={() => {}} variant="primary" className="h-full">
              <Filter size={16} /> Apply
            </StyledButton>
             <StyledButton onClick={handleResetFilters} variant="secondary" className="h-full">
              <RotateCcw size={16} /> Reset
            </StyledButton>
          </div>
          <div className="flex justify-end items-center mt-4 pt-4 border-t border-sky-100">
             <div className="flex gap-2">
              <StyledButton onClick={() => {}} variant="exportPdf">
                <FileDown size={16} /> PDF
              </StyledButton>
              <StyledButton onClick={() => {}} variant="exportExcel">
                <FileSpreadsheet size={16} /> Excel
              </StyledButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* --- KPI Metrics --- */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {mockKpis.map(kpi => (
          <KpiCard key={kpi.title} kpi={{ ...kpi, gradient: 'bg-gradient-to-r from-blue-500 to-green-500' }} />
        ))}
      </section>
      
      {/* --- Main Content (Table & Charts) --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Main Table --- */}
        <div className="lg:col-span-2">
          <GlassCard noHover>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
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
                  {paginatedDirections.map((d) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className={
                        d.status === "Pending" ? 'bg-red-50/70 hover:bg-red-100/70' : 
                        d.status === "In-Process" ? 'bg-amber-50/70 hover:bg-amber-100/70' :
                        'hover:bg-sky-50/50'
                      }
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
            <div className="p-4 flex flex-col md:flex-row justify-between items-center border-t border-sky-100">
              <div className="flex items-center gap-2 mb-3 md:mb-0">
                <span className="text-sm text-slate-600">Rows per page:</span>
                <select className="form-select-sm p-1.5" defaultValue="10">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-sm text-slate-600">
                  Showing {paginatedDirections.length} of {filteredDirections.length} results
                </span>
              </div>
              <div className="flex gap-2">
                <StyledButton onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} variant="secondary" className="px-3 py-1.5">
                  <ArrowLeft size={16} /> Previous
                </StyledButton>
                <span className="px-4 py-1.5 text-sm font-medium text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <StyledButton onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} variant="secondary" className="px-3 py-1.5">
                  Next <ArrowRight size={16} />
                </StyledButton>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* --- Charts Section --- */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <GlassCard noHover>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart size={18} />
                <span className="text-lg font-semibold">Compliance Pie Chart</span>
              </div>
            </CardHeader>
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={labelFunction}
                  >
                    {mockPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          
          <GlassCard noHover>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart2 size={18} />
                <span className="text-lg font-semibold">Directions by Authority</span>
              </div>
            </CardHeader>
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockBarData} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={10} />
                  <YAxis type="category" dataKey="name" fontSize={10} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="Directions" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* --- Footer --- */}
      <footer className="text-center text-slate-500 text-sm mt-12 pb-6 max-w-7xl mx-auto">
        <p className="italic">“Data monitored by DGP Office — Compliance Governance System”</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a href="#" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
            <HelpCircle size={14} /> Help & Support
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

