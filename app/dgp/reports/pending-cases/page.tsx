'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  FileBadge,
  DollarSign,
  Loader,
  Shield,
  ShieldAlert,
  Archive,
  CalendarClock,
  Send,
  FileClock,
  Check
} from 'lucide-react';

// --- TYPES ---
type CaseStatus = "Initiated" | "In Progress" | "Awaiting Charge Sheet" | "Completed";

type PendingCase = {
  id: string; // Case ID
  firNo: string;
  district: string;
  policeStation: string;
  status: CaseStatus;
  daysPending: number;
  escalationTriggered: boolean;
  // Modal Data
  incidentId: string;
  workerName: string;
  incidentType: string;
  dateReceived: string;
  fullDescription: string;
  actionTaken: string;
  docs: { name: string, url: string }[];
};



// --- MOCK DATA ---

const mockKpis = {
  totalPendingCases: { value: "28", change: "+3" },
  slaBreaches: { value: "6", change: "+2" },
  escalatedToDgp: { value: "9", change: "+1" },
  avgPendingDays: { value: "22.5", change: "+1.5d" },
};

const mockPendingCases: PendingCase[] = [
  {
    id: 'DGP-CASE-00456',
    firNo: 'FIR-00234',
    district: 'New Delhi',
    policeStation: 'Connaught Place',
    status: 'In Progress',
    daysPending: 42,
    escalationTriggered: true,
    incidentId: 'INC-2025-00123',
    workerName: 'Rakesh Sharma',
    incidentType: 'Manual Scavenging Death',
    dateReceived: '2025-09-15',
    fullDescription: 'Death of worker during cleaning operation in a septic tank.',
    actionTaken: 'Awaiting FSL report. Statements from contractor recorded.',
    docs: [{ name: 'FIR_00234.pdf', url: '#' }, { name: 'PM_Report.pdf', url: '#' }]
  },
  {
    id: 'DGP-CASE-00460',
    firNo: 'FIR-00288',
    district: 'Dwarka',
    policeStation: 'Dwarka Sec-9',
    status: 'Awaiting Charge Sheet',
    daysPending: 25,
    escalationTriggered: false,
    incidentId: 'INC-2025-00145',
    workerName: 'Sunil Kumar',
    incidentType: 'Sewer Injury',
    dateReceived: '2025-10-05',
    fullDescription: 'Worker fell from ladder, sustaining spinal injuries. Case registered against contractor.',
    actionTaken: 'Investigation complete. Charge sheet is being prepared.',
    docs: [{ name: 'FIR_00288.pdf', url: '#' }, { name: 'Medical_Report.pdf', url: '#' }]
  },
  {
    id: 'DGP-CASE-00461',
    firNo: 'FIR-00290',
    district: 'South Delhi',
    policeStation: 'Hauz Khas',
    status: 'Initiated',
    daysPending: 7,
    escalationTriggered: false,
    incidentId: 'INC-2025-00150',
    workerName: 'Geeta Devi',
    incidentType: 'Hazardous Exposure',
    dateReceived: '2025-10-23',
    fullDescription: 'Worker reported chemical burns due to unidentified substance. FIR filed.',
    actionTaken: 'IO assigned. Awaiting statement from worker.',
    docs: [{ name: 'FIR_00290.pdf', url: '#' }]
  },
  {
    id: 'DGP-CASE-00462',
    firNo: 'FIR-00112',
    district: 'Rohtak',
    policeStation: 'Rohtak Civil Lines',
    status: 'In Progress',
    daysPending: 18,
    escalationTriggered: false,
    incidentId: 'INC-2025-00102',
    workerName: 'Mohan Lal',
    incidentType: 'Manual Scavenging Death',
    dateReceived: '2025-10-12',
    fullDescription: 'Worker died due to asphyxiation in septic tank.',
    actionTaken: 'Contractor arrested. Awaiting witness statements.',
    docs: [{ name: 'FIR_00112.pdf', url: '#' }]
  },
];

const filterOptions = {
  districts: ["All Districts", "New Delhi", "South Delhi", "Dwarka", "Rohtak"],
  statuses: ["All Statuses", "Initiated", "In Progress", "Awaiting Charge Sheet", "Completed"],
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
const StatusBadge = ({ status }: { status: CaseStatus }) => {
  const statusConfig: { [key in CaseStatus]: { icon: JSX.Element, styles: string } } = {
    "Initiated": { icon: <FileBadge size={12} />, styles: "bg-sky-100 text-sky-900 border-sky-200" },
    "In Progress": { icon: <Loader size={12} className="animate-spin" />, styles: "bg-amber-100 text-amber-900 border-amber-300" },
    "Awaiting Charge Sheet": { icon: <FileText size={12} />, styles: "bg-purple-100 text-purple-900 border-purple-200" },
    "Completed": { icon: <CheckCircle size={12} />, styles: "bg-emerald-100 text-emerald-900 border-emerald-200" },
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
  
  let styles = "bg-emerald-100 text-emerald-900"; // < 15 Days
  if (days > 15 && days <= 30) {
    styles = "bg-amber-100 text-amber-900"; // 15-30 Days
  } else if (days > 30) {
    styles = "bg-red-100 text-red-900 font-bold animate-pulse"; // > 30 Days
  }

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {days} {days === 1 ? 'Day' : 'Days'}
    </span>
  );
};

/**
 * 5. EscalationBadge Component
 */
const EscalationBadge = ({ triggered }: { triggered: boolean }) => {
  if (triggered) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-red-100 text-red-900 border-red-300">
        <ArrowUpCircle size={12} /> Yes
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-100 text-slate-700 border-slate-200">
      <Check size={12} /> No
    </span>
  );
};

/**
 * 6. Styled Button Component
 */
const StyledButton = ({ children, onClick, variant = 'primary', className = "", disabled = false }: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'exportPdf' | 'exportExcel' | 'icon' | 'escalate';
  className?: string;
  disabled?: boolean;
}) => {
  const baseStyle = "px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-navy-700 text-white hover:bg-navy-800 focus:ring-navy-500 shadow-lg shadow-navy-500/30 hover:shadow-xl",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
    exportPdf: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-lg shadow-red-500/20",
    exportExcel: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400 shadow-lg shadow-emerald-500/20",
    icon: "p-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 focus:ring-sky-400",
    escalate: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-lg shadow-amber-500/30"
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
 * 7. InfoItem Component (Used in Modal)
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
 * 8. CaseDetailModal Component
 */
const CaseDetailModal = ({ caseData, onClose }: { caseData: PendingCase | null, onClose: () => void }) => (
  <AnimatePresence>
    {caseData && (
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
              <span className="p-2 bg-navy-100 text-navy-700 rounded-full"><FileBadge size={20} /></span>
              <h3 className="text-lg font-semibold text-navy-900">Pending Case Details</h3>
              <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
                {caseData.id}
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
                <InfoItem label="Case ID" value={caseData.id} icon={<Hash size={14} />} />
                <InfoItem label="Incident ID" value={caseData.incidentId} icon={<AlertOctagon size={14} />} />
                <InfoItem label="Worker Name" value={caseData.workerName} icon={<User size={14} />} />
                <InfoItem label="Incident Type" value={caseData.incidentType} icon={<ShieldAlert size={14} />} />
                <InfoItem label="Date Received" value={caseData.dateReceived} icon={<Calendar size={14} />} />
                <InfoItem label="District" value={caseData.district} icon={<MapPin size={14} />} />
                <InfoItem label="Police Station" value={caseData.policeStation} icon={<Landmark size={14} />} />
              </div>

              {/* Right Column (Details) */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Investigation Status</h4>
                  <StatusBadge status={caseData.status} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Full Description</h4>
                  <p className="text-slate-700 leading-relaxed">{caseData.fullDescription}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Action Taken Summary</h4>
                  <p className="text-slate-700 leading-relaxed">{caseData.actionTaken || 'No action logged yet.'}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-500 mb-2">Supporting Documents</h4>
                  {caseData.docs.length > 0 ? (
                    caseData.docs.map((doc, idx) => (
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
          <div className="p-4 flex justify-between items-center gap-3 bg-slate-50 border-t border-slate-200">
            <StyledButton onClick={() => {}} variant="escalate">
              <ArrowUpCircle size={16} /> Trigger Escalation (Manual)
            </StyledButton>
            <div className="flex gap-3">
              <StyledButton onClick={onClose} variant="secondary">
                <X size={16} /> Close
              </StyledButton>
              <StyledButton onClick={() => {}} variant="primary">
                <Printer size={16} /> Download Case Detail
              </StyledButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- MAIN PAGE COMPONENT ---
export default function PendingCasesReport() {
  const [hasMounted, setHasMounted] = useState(false);
  const [filters, setFilters] = useState({
    district: "All Districts",
    status: "All Statuses",
    timePeriod: "This FY",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);

  useEffect(() => { setHasMounted(true); }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      district: "All Districts",
      status: "All Statuses",
      timePeriod: "This FY",
    });
    setSearchTerm("");
  };

  const filteredCases = useMemo(() => {
    return mockPendingCases
      .filter(c => filters.district === "All Districts" || c.district === filters.district)
      .filter(c => filters.status === "All Statuses" || c.status === filters.status)
      .filter(c => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          c.id.toLowerCase().includes(searchLower) ||
          c.firNo.toLowerCase().includes(searchLower) ||
          c.district.toLowerCase().includes(searchLower) ||
          c.policeStation.toLowerCase().includes(searchLower) ||
          c.status.toLowerCase().includes(searchLower) ||
          c.daysPending.toString().includes(searchLower) ||
          c.incidentId.toLowerCase().includes(searchLower) ||
          c.workerName.toLowerCase().includes(searchLower) ||
          c.incidentType.toLowerCase().includes(searchLower) ||
          c.dateReceived.toLowerCase().includes(searchLower) ||
          c.fullDescription.toLowerCase().includes(searchLower) ||
          c.actionTaken.toLowerCase().includes(searchLower)
        );
      });
  }, [filters, searchTerm]);
  
  const paginatedCases = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCases.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCases, currentPage]);
  
  const totalPages = Math.ceil(filteredCases.length / 10);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-blue-700" />
      </div>
    );
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
              Pending Cases Report
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold mt-1 sm:mt-2 lg:mt-3 drop-shadow-lg">
              State-wide law enforcement delays & SLA compliance
            </p>
          </div>
          <nav className="text-xs sm:text-sm font-bold text-white" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border border-white/30 shadow-lg">
              <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">DGP Dashboard</a></li>
              <li><ChevronRight size={14} className="sm:hidden text-white/70" /></li>
              <li><ChevronRight size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Reports & Analytics</a></li>
              <li><ChevronRight size={14} className="sm:hidden text-white/70" /></li>
              <li><ChevronRight size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
              <li className="font-black text-yellow-300 drop-shadow-md">Pending Cases Report</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* --- KPI Metrics --- */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <StatCard title="Total Pending Cases" value={mockKpis.totalPendingCases.value} icon={FileClock} color="amber" />
        <StatCard title="SLA Breaches (>30d)" value={mockKpis.slaBreaches.value} icon={AlertOctagon} color="red" />
        <StatCard title="Escalated to DGP" value={mockKpis.escalatedToDgp.value} icon={ArrowUpCircle} color="purple" />
        <StatCard title="Avg. Pending Days" value={mockKpis.avgPendingDays.value} icon={Clock} color="indigo" />
      </section>
      
      {/* --- Enhanced Filter Panel --- */}
      <GlassCard className="max-w-7xl mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg" noHover>
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Filter Pending Cases
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
              <select name="district" value={filters.district} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.districts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="timePeriod" value={filters.timePeriod} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.timePeriods.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
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
              {/* <div className="flex gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
                >
                  <FileDown size={14} className="sm:hidden" />
                  <FileDown size={16} className="hidden sm:block" />
                  PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
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
      
      {/* --- Enhanced Main Worker Table --- */}
      <GlassCard className="max-w-7xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-500/20" noHover>
        {/* Global Search Bar */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200/50">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search pending cases, FIR, districts..." 
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
                    <X size={16} />
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
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
              <tr>
                <th className="th-cell">Sl. No.</th>
                <th className="th-cell">Case ID</th>
                <th className="th-cell">FIR No</th>
                <th className="th-cell">District</th>
                <th className="th-cell">Police Station</th>
                <th className="th-cell">Status</th>
                <th className="th-cell">Days Pending</th>
                <th className="th-cell">Escalation Triggered</th>
                <th className="th-cell">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {paginatedCases.map((c, index) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                    scale: 1.005,
                  }}
                  className={`cursor-pointer transition-all duration-300 ${
                    c.daysPending > 30 ? 'bg-red-50/70 hover:bg-red-100/70' : 
                    c.daysPending > 15 ? 'bg-amber-50/70 hover:bg-amber-100/70' :
                    'bg-white hover:bg-blue-50/50'
                  }`}
                >
                  <td className="td-cell text-slate-500">{index + 1 + (currentPage - 1) * 10}</td>
                  <td className="td-cell font-medium text-navy-800">{c.id}</td>
                  <td className="td-cell">{c.firNo}</td>
                  <td className="td-cell">{c.district}</td>
                  <td className="td-cell">{c.policeStation}</td>
                  <td className="td-cell"><StatusBadge status={c.status} /></td>
                  <td className="td-cell text-center"><DaysPendingBadge days={c.daysPending} /></td>
                  <td className="td-cell text-center"><EscalationBadge triggered={c.escalationTriggered} /></td>
                  <td className="td-cell">
                    <StyledButton onClick={() => setSelectedCase(c)} variant="icon" className="p-1.5 h-auto">
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
              Showing {paginatedCases.length} of {filteredCases.length} results
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
      <CaseDetailModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />

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
        .bg-purple-100 { background-color: #f3e8ff; }
        .text-purple-900 { color: #581c87; }
        .border-purple-200 { border-color: #e9d5ff; }

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
      <style jsx>{`
        /* Page-specific styles */
      `}</style>
    </motion.div>
  );
}
