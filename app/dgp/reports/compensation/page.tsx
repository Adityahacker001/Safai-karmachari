'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '@/components/ui/stat-card';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
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
  Send
} from 'lucide-react';
const StatusBadge = ({ status }: { status: CompensationStatus }) => {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-emerald-100 text-emerald-900 border-emerald-200">
        <CheckCircle size={12} /> Paid
      </span>
    );
  }
  if (status === "Pending" || status === "Sanctioned") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-red-100 text-red-900 border-red-300">
        <X size={12} /> Not Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-100 text-slate-700 border-slate-200">
      N/A
    </span>
  );
};

// --- TYPES ---
type CompensationStatus = "Paid" | "Pending" | "Sanctioned" | "N/A";
type IncidentCategory = "Death" | "Injury" | "Hazard";

type CompensationCase = {
  id: string; // Sl. No. equivalent
  workerName: string;
  incidentId: string;
  district: string;
  firNo: string;
  amountSanctioned: string;
  status: CompensationStatus;
  datePaid: string | null;
  remarks: string;
  // Modal Data
  dateSanctioned: string; // For calculating delay
  incidentType: IncidentCategory;
  policeStation: string;
  paymentProofUTR?: string;
  escalationTrail?: string;
  pendingReason?: string; // Added pendingReason property
  docs: { name: string, url: string }[];
};



// --- MOCK DATA ---

const mockKpis = {
  totalSanctioned: { value: "₹ 1.25 Cr", change: "+10L" },
  totalPaid: { value: "₹ 95 L", change: "+5L" },
  totalPending: { value: "₹ 30 L", change: "+5L" },
};

const mockCompensationCases: CompensationCase[] = [
  {
    id: '1',
    workerName: 'Rakesh Sharma',
    incidentId: 'INC-2025-00123',
    district: 'New Delhi',
    firNo: 'FIR-00234',
    amountSanctioned: '₹ 10,00,000',
    status: 'Pending',
    datePaid: null,
    remarks: 'Awaiting FSL Report for final processing.',
    dateSanctioned: '2025-09-20', // > 30 days
    incidentType: 'Death',
    policeStation: 'Connaught Place',
    paymentProofUTR: undefined,
    escalationTrail: 'SP (New Delhi) -> DGP Office',
    docs: [{ name: 'FIR_00234.pdf', url: '#' }, { name: 'Sanction_Order_1.pdf', url: '#' }]
  },
  {
    id: '2',
    workerName: 'Priya Singh',
    incidentId: 'INC-2025-00100',
    district: 'Dwarka',
    firNo: 'FIR-00255',
    amountSanctioned: '₹ 2,00,000',
    status: 'Paid',
    datePaid: '2025-10-20',
    remarks: 'Payment completed via DBT.',
    dateSanctioned: '2025-10-10',
    incidentType: 'Injury',
    policeStation: 'Dwarka Sec-9',
    paymentProofUTR: 'SBIN2025102012345',
    docs: [{ name: 'FIR_00255.pdf', url: '#' }, { name: 'Sanction_Order_2.pdf', url: '#' }, { name: 'Payment_Proof_2.pdf', url: '#' }]
  },
  {
    id: '3',
    workerName: 'Amit Kumar',
    incidentId: 'INC-2025-00101',
    district: 'South Delhi',
    firNo: 'FIR-00260',
    amountSanctioned: '₹ 50,000',
    status: 'Paid',
    datePaid: '2025-10-15',
    remarks: 'Paid.',
    dateSanctioned: '2025-10-01',
    incidentType: 'Hazard',
    policeStation: 'Hauz Khas',
    paymentProofUTR: 'HDFC2025101598765',
    docs: [{ name: 'FIR_00260.pdf', url: '#' }, { name: 'Sanction_Order_3.pdf', url: '#' }]
  },
  {
    id: '4',
    workerName: 'Mohan Lal',
    incidentId: 'INC-2025-00102',
    district: 'Rohtak',
    firNo: 'FIR-00112',
    amountSanctioned: '₹ 10,00,000',
    status: 'Sanctioned',
    datePaid: null,
    remarks: 'Bank details verification in progress.',
    dateSanctioned: '2025-10-25', // < 15 days
    incidentType: 'Death',
    policeStation: 'Rohtak Civil Lines',
    paymentProofUTR: undefined,
    docs: [{ name: 'FIR_00112.pdf', url: '#' }, { name: 'Sanction_Order_4.pdf', url: '#' }]
  },
  {
    id: '5',
    workerName: 'Sunil Kumar',
    incidentId: 'INC-2025-00098',
    district: 'New Delhi',
    firNo: 'FIR-00200',
    amountSanctioned: '₹ 10,00,000',
    status: 'Pending',
    datePaid: null,
    remarks: 'Inter-departmental query pending resolution.',
    dateSanctioned: '2025-08-10', // > 60 days
    incidentType: 'Death',
    policeStation: 'Parliament St.',
    paymentProofUTR: undefined,
    escalationTrail: 'SP -> DGP -> NSKC',
    docs: [{ name: 'FIR_00200.pdf', url: '#' }, { name: 'Sanction_Order_5.pdf', url: '#' }]
  },
];

const filterOptions = {
  districts: ["All Districts", "New Delhi", "South Delhi", "Dwarka", "Rohtak"],
  policeStations: ["All Police Stations", "Connaught Place", "Dwarka Sec-9", "Hauz Khas", "Rohtak Civil Lines", "Parliament St."],
  statuses: ["All Statuses", "Paid", "Pending", "Sanctioned", "N/A"],
  categories: ["All Incident Categories", "Death", "Injury", "Hazard"],
  timePeriods: ["This FY", "This Quarter", "This Month", "Last 30 Days"],
};

// --- HELPER FUNCTIONS ---

/**
 * Calculates days pending since a given date.
 */
const getDaysPending = (dateSanctioned: string | null): number => {
  if (!dateSanctioned) return 0;
  const sanctionedDate = new Date(dateSanctioned);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - sanctionedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 */
const GlassCard: React.FC<{ children: React.ReactNode; className?: string; noHover?: boolean }> = ({ children, className = "", noHover = false }) => (
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
 * 3. PaidBadge Component (as requested)
 */
const PaidBadge = ({ status }: { status: CompensationStatus }) => {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-emerald-100 text-emerald-900 border-emerald-200">
        <CheckCircle size={12} /> Yes
      </span>
    );
  }
  if (status === "Pending" || status === "Sanctioned") {
     return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-red-100 text-red-900 border-red-300">
        <X size={12} /> No
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-100 text-slate-700 border-slate-200">
      N/A
    </span>
  );
};


/**
 * 4. Styled Button Component
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
 * 5. InfoItem Component (Used in Modal)
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
 * 6. CompensationDetailModal Component
 */
const CompensationDetailModal = ({ caseData, onClose }: { caseData: CompensationCase | null, onClose: () => void }) => (
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
              <span className="p-2 bg-navy-100 text-navy-700 rounded-full"><DollarSign size={20} /></span>
              <h3 className="text-lg font-semibold text-navy-900">Compensation Case Details</h3>
              <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
                {caseData.incidentId}
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
                <InfoItem label="Worker Name" value={caseData.workerName} icon={<User size={14} />} />
                <InfoItem label="Incident ID" value={caseData.incidentId} icon={<AlertOctagon size={14} />} />
                <InfoItem label="Incident Type" value={caseData.incidentType} icon={<ShieldAlert size={14} />} />
                <InfoItem label="District" value={caseData.district} icon={<MapPin size={14} />} />
                <InfoItem label="Police Station" value={caseData.policeStation} icon={<Landmark size={14} />} />
                <InfoItem label="FIR No." value={caseData.firNo} icon={<FileBadge size={14} />} />
              </div>

              {/* Right Column (Details) */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Compensation Status */}
                <div>
                  <h4 className="text-base font-semibold text-navy-800 border-b border-slate-200 pb-2 mb-3">Compensation Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem 
                      label="Status" 
                      value={<StatusBadge status={caseData.status} />} 
                      icon={<AlertTriangle size={14} />} 
                    />
                    <InfoItem label="Amount Sanctioned" value={caseData.amountSanctioned} icon={<DollarSign size={14} />} />
                    
                    {caseData.status === 'Paid' ? (
                       <InfoItem label="Date Paid" value={caseData.datePaid} icon={<CheckCircle size={14} />} />
                    ) : (
                       <InfoItem label="Pending Reason" value={caseData.pendingReason} icon={<Clock size={14} />} />
                    )}
                    {caseData.paymentProofUTR && (
                       <InfoItem label="Payment Proof (UTR)" value={caseData.paymentProofUTR} icon={<FileCheck2 size={14} />} />
                    )}
                  </div>
                </div>

                {/* Escalation */}
                {caseData.escalationTrail && (
                  <div>
                    <h4 className="text-base font-semibold text-red-700 border-b border-red-200 pb-2 mb-3">Escalation Trail</h4>
                    <InfoItem label="Escalation Path" value={caseData.escalationTrail} icon={<ArrowUpCircle size={14} />} className="bg-red-50/80 border-red-200" />
                  </div>
                )}

                {/* Documents */}
                <div>
                  <h4 className="text-base font-semibold text-navy-800 border-b border-slate-200 pb-2 mb-3">Documents</h4>
                  <div className="space-y-2">
                    {caseData.docs.map((doc, idx) => (
                      <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <File size={16} className={doc.name.includes('FIR') ? 'text-red-600' : 'text-blue-600'} />
                          <span className="text-sm font-medium text-slate-800">{doc.name}</span>
                        </div>
                        <Download size={16} className="text-slate-500" />
                      </a>
                    ))}
                  </div>
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

// --- MAIN PAGE COMPONENT ---
export default function CompensationReport() {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    district: "All Districts",
    policeStation: "All Police Stations",
    status: "All Statuses",
    category: "All Incident Categories",
    timePeriod: "This FY",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState<CompensationCase | null>(null);

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
      policeStation: "All Police Stations",
      status: "All Statuses",
      category: "All Incident Categories",
      timePeriod: "This FY",
    });
    setSearchTerm("");
  };

  const filteredCases = useMemo(() => {
    return mockCompensationCases
      .filter(c => filters.district === "All Districts" || c.district === filters.district)
      .filter(c => filters.policeStation === "All Police Stations" || c.policeStation === filters.policeStation)
      .filter(c => filters.status === "All Statuses" || c.status === filters.status)
      .filter(c => filters.category === "All Incident Categories" || c.incidentType === filters.category)
      .filter(c => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          c.workerName.toLowerCase().includes(searchLower) ||
          c.incidentId.toLowerCase().includes(searchLower) ||
          c.firNo.toLowerCase().includes(searchLower) ||
          c.district.toLowerCase().includes(searchLower) ||
          c.policeStation.toLowerCase().includes(searchLower) ||
          c.incidentType.toLowerCase().includes(searchLower) ||
          c.status.toLowerCase().includes(searchLower) ||
          c.amountSanctioned.toLowerCase().includes(searchLower) ||
          c.dateSanctioned.toLowerCase().includes(searchLower) ||
          (c.datePaid && c.datePaid.toLowerCase().includes(searchLower)) ||
          c.remarks.toLowerCase().includes(searchLower)
        );
      });
  }, [filters, searchTerm]);
  
  const paginatedCases = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCases.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCases, currentPage]);
  
  const totalPages = Math.ceil(filteredCases.length / 10);

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
              Compensation Report
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold mt-1 sm:mt-2 lg:mt-3 drop-shadow-lg">
              State-wide tracking of compensation status for SK incidents
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
              <li className="font-black text-yellow-300 drop-shadow-md">Compensation Report</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* --- KPI Metrics --- */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <StatCard title="Total Sanctioned" value={mockKpis.totalSanctioned.value} icon={DollarSign} color="blue" />
        <StatCard title="Total Paid" value={mockKpis.totalPaid.value} icon={CheckCircle} color="green" />
        <StatCard title="Total Pending" value={mockKpis.totalPending.value} icon={Clock} color="amber" />
      </section>
      
      {/* --- Enhanced Filter Panel --- */}
      <GlassCard className="max-w-7xl mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg" noHover>
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Filter Compensation Cases
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              <select name="district" value={filters.district} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.districts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="policeStation" value={filters.policeStation} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.policeStations.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
               <select name="category" value={filters.category} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.categories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
               <select name="timePeriod" value={filters.timePeriod} onChange={handleFilterChange} className="form-select-sm">
                {filterOptions.timePeriods.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* --- Enhanced Main Table --- */}
      <GlassCard className="max-w-7xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-500/20" noHover>
        {/* Global Search Bar */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-slate-200/50">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search compensation cases, workers..." 
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
                <th className="th-cell">Worker Name</th>
                <th className="th-cell">Incident ID</th>
                <th className="th-cell">District</th>
                <th className="th-cell">FIR No</th>
                <th className="th-cell">Amount Sanctioned</th>
                <th className="th-cell">Paid (Yes/No)</th>
                <th className="th-cell">Date Paid</th>
                <th className="th-cell">Remarks</th>
                <th className="th-cell">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {paginatedCases.map((c, index) => {
                const daysPending = (c.status === 'Pending' || c.status === 'Sanctioned') ? getDaysPending(c.dateSanctioned) : 0;
                return (
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
                      daysPending > 60 ? 'bg-red-50/70 hover:bg-red-100/70' : 
                      daysPending > 30 ? 'bg-amber-50/70 hover:bg-amber-100/70' :
                      'bg-white hover:bg-blue-50/50'
                    }`}
                  >
                    <td className="td-cell text-slate-500">{index + 1 + (currentPage - 1) * 10}</td>
                    <td className="td-cell font-medium text-navy-800">{c.workerName}</td>
                    <td className="td-cell">{c.incidentId}</td>
                    <td className="td-cell">{c.district}</td>
                    <td className="td-cell">{c.firNo}</td>
                    <td className="td-cell font-medium">{c.amountSanctioned}</td>
                    <td className="td-cell"><PaidBadge status={c.status} /></td>
                    <td className="td-cell">{c.datePaid || 'N/A'}</td>
                    <td className="td-cell max-w-xs truncate" title={c.remarks}>{c.remarks}</td>
                    <td className="td-cell">
                      <StyledButton onClick={() => setSelectedCase(c)} variant="icon" className="p-1.5 h-auto">
                        <Eye size={16} />
                      </StyledButton>
                    </td>
                  </motion.tr>
                );
              })}
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
        <p className="italic">“Data verified by DGP Office — Ensuring timely compensation and justice.”</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a href="#" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
            <HelpCircle size={14} /> Help & Support
          </a>
        </div>
      </footer>

      {/* --- Modal --- */}
      <CompensationDetailModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />

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
