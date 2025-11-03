'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '@/components/ui/stat-card';
import {
  Home,
  ChevronRight,
  ShieldAlert,
  Filter,
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
  ListFilter,
  BarChart2,
  Shield, // <-- FIX: Added missing import
  TrendingUp, // <-- FIX: Added missing import
  TrendingDown, // <-- FIX: Added missing import
  Hash, // <-- FIX: Added missing import
  MapPin // <-- FIX: Added missing import
} from 'lucide-react';

// --- MOCK DATA ---
const mockGrievances = [
  {
    id: 'GRV-00451',
    source: 'Worker',
    type: 'Police Inaction',
    district: 'Dwarka',
    description: 'FIR not registered for incident INC-2025-00123 despite multiple visits.',
    dateReceived: '2025-10-30',
    actionTaken: 'SP Dwarka has been notified. Awaiting preliminary report.',
    status: 'Pending',
    escalatedTo: 'N/A',
    policeStation: 'Dwarka Sector 9',
    timeline: [
      { status: 'Logged', date: '2025-10-30' },
      { status: 'Assigned to SP Dwarka', date: '2025-10-30' },
    ],
    documents: [{ name: 'Initial Complaint Copy.pdf', url: '#' }]
  },
  {
    id: 'GRV-00450',
    source: 'SHG',
    type: 'Delay in Investigation',
    district: 'South Delhi',
    description: 'Investigation for FIR-00098/2024 has shown no progress for 30 days.',
    dateReceived: '2025-10-29',
    actionTaken: 'IO requested to submit updated case diary.',
    status: 'Resolved',
    escalatedTo: 'N/A',
    policeStation: 'Kanpur Central',
    timeline: [
      { status: 'Logged', date: '2025-10-29' },
      { status: 'Action Taken', date: '2025-10-29' },
      { status: 'Resolved', date: '2025-10-30' },
    ],
    documents: []
  },
  {
    id: 'GRV-00449',
    source: 'Public',
    type: 'Harassment',
    district: 'New Delhi',
    description: 'Alleged harassment by contractor staff, police refusing to file complaint.',
    dateReceived: '2025-10-29',
    actionTaken: 'Initial query sent. Pending response from unit.',
    status: 'Escalated',
    escalatedTo: 'NSKC',
    policeStation: 'Connaught Place',
    timeline: [
      { status: 'Logged', date: '2025-10-29' },
      { status: 'Escalated to NSKC', date: '2025-10-30' },
    ],
    documents: [{ name: 'Victim Statement.pdf', url: '#' }]
  },
  {
    id: 'GRV-00448',
    source: 'Worker',
    type: 'Other',
    district: 'Rohtak',
    description: 'Contractor not providing safety gear, local police unresponsive.',
    dateReceived: '2025-10-28',
    actionTaken: 'Forwarded to local SHO for immediate action.',
    status: 'Resolved',
    escalatedTo: 'N/A',
    policeStation: 'Rohtak Civil Lines',
    timeline: [
        { status: 'Logged', date: '2025-10-28' },
        { status: 'Resolved', date: '2025-10-29' },
    ],
    documents: []
  },
];

const mockKpis = {
  total: { value: 132, change: "+8" },
  pending: { value: 12, change: "+2", changeType: 'negative' },
  resolved: { value: 117, change: "+5", changeType: 'positive' },
  escalated: { value: 3, change: "+1", changeType: 'negative' },
  resolvedPercent: { value: "88.6%", change: "-1.2%", changeType: 'negative' },
  avgTime: { value: "3.5 Days", change: "+0.5d", changeType: 'negative' },
};

const filterOptions = {
  districts: ["All Districts", "New Delhi", "South Delhi", "Dwarka", "Rohtak"],
  sources: ["All Sources", "Worker", "SHG", "Public"],
  types: ["All Types", "Police Inaction", "Delay in Investigation", "Harassment", "Other"],
  statuses: ["All Statuses", "Pending", "Resolved", "Escalated"],
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
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: { [key: string]: { icon: JSX.Element, styles: string } } = {
    "Pending": { icon: <Clock size={12} />, styles: "bg-amber-100 text-amber-900 border-amber-300" },
    "Resolved": { icon: <CheckCircle size={12} />, styles: "bg-emerald-100 text-emerald-900 border-emerald-200" },
    "Escalated": { icon: <AlertTriangle size={12} />, styles: "bg-red-100 text-red-900 border-red-300 animate-pulse" },
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
 * 4. Styled Button Component
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
 * 5. InfoItem Component (Used in Modal)
 */
const InfoItem = ({ label, value, icon }: {
  label: string;
  value: React.ReactNode; // Changed to React.ReactNode to allow components like StatusBadge
  icon: JSX.Element;
}) => (
  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200">
    <h5 className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
      {icon}
      {label}
    </h5>
    <div className="text-sm font-semibold text-navy-800 mt-1">{value || 'N/A'}</div>
  </div>
);


/**
 * 6. GrievanceDetailModal Component
 */
const GrievanceDetailModal = ({ grievance, onClose }: { grievance: typeof mockGrievances[0] | null, onClose: () => void }) => (
  <AnimatePresence>
    {grievance && (
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
              <h3 className="text-lg font-semibold text-navy-900">Grievance Details</h3>
              <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
                {grievance.id}
              </span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column (Details) */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Status</h4>
                  <StatusBadge status={grievance.status} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Grievance Type</h4>
                  <p className="text-lg font-semibold text-navy-800">{grievance.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Description</h4>
                  <p className="text-slate-700 leading-relaxed">{grievance.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Action Taken by Police</h4>
                  <p className="text-slate-700 leading-relaxed">{grievance.actionTaken || 'No action logged yet.'}</p>
                </div>
                {grievance.escalatedTo !== 'N/A' && (
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-1">Escalation</h4>
                    <p className="text-slate-700">Case escalated to: <strong>{grievance.escalatedTo}</strong></p>
                  </div>
                )}
              </div>

              {/* Right Column (Meta) */}
              <div className="md:col-span-1 bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-4">
                <InfoItem label="Grievance ID" value={grievance.id} icon={<Hash size={14} />} />
                <InfoItem label="Source" value={grievance.source} icon={<User size={14} />} />
                <InfoItem label="District" value={grievance.district} icon={<MapPin size={14} />} />
                <InfoItem label="Police Station" value={grievance.policeStation} icon={<Landmark size={14} />} />
                <InfoItem label="Date Received" value={grievance.dateReceived} icon={<Calendar size={14} />} />
                
                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-500 mb-2">Supporting Documents</h4>
                  {grievance.documents.length > 0 ? (
                    grievance.documents.map((doc, idx) => (
                      <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium">
                        <File size={16} /> {doc.name}
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 italic">No documents attached.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Timeline */}
            <div className="mt-6">
              <h4 className="text-base font-semibold text-navy-800 border-b border-slate-200 pb-2 mb-4">Actions Timeline</h4>
              <ol className="relative border-l border-slate-300">
                {grievance.timeline.map((item, idx) => (
                  <li key={idx} className="mb-6 ml-6">
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white
                      ${item.status === 'Resolved' ? 'bg-emerald-200 text-emerald-800' : 
                        item.status.includes('Escalate') ? 'bg-red-200 text-red-800' : 
                        'bg-sky-100 text-sky-800'}`
                      }
                    >
                      {item.status === 'Resolved' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                    </span>
                    <h3 className="flex items-center mb-1 text-sm font-semibold text-slate-800">
                      {item.status}
                    </h3>
                    <time className="block text-xs font-normal leading-none text-slate-500">{item.date}</time>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="p-4 flex justify-end gap-3 bg-slate-50 border-t border-slate-200">
            <StyledButton onClick={onClose} variant="secondary">
              <X size={16} /> Close
            </StyledButton>
            <StyledButton onClick={() => {}} variant="primary">
              <Printer size={16} /> Download Report
            </StyledButton>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- MAIN PAGE COMPONENT ---
export default function GrievancesReport() {
  const [hasMounted, setHasMounted] = useState(false);
  const [filters, setFilters] = useState({
    district: "All Districts",
    source: "All Sources",
    type: "All Types",
    status: "All Statuses",
    timePeriod: "This FY",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrievance, setSelectedGrievance] = useState<typeof mockGrievances[0] | null>(null);

  useEffect(() => { setHasMounted(true); }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      district: "All Districts",
      source: "All Sources",
      type: "All Types",
      status: "All Statuses",
      timePeriod: "This FY",
    });
    setSearchTerm("");
  };

  const filteredGrievances = useMemo(() => {
    return mockGrievances
      .filter(g => filters.district === "All Districts" || g.district === filters.district)
      .filter(g => filters.source === "All Sources" || g.source === filters.source)
      .filter(g => filters.type === "All Types" || g.type === filters.type)
      .filter(g => filters.status === "All Statuses" || g.status === filters.status)
      .filter(g => g.description.toLowerCase().includes(searchTerm.toLowerCase()) || g.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [filters, searchTerm]);
  
  const paginatedGrievances = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGrievances.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGrievances, currentPage]);
  
  const totalPages = Math.ceil(filteredGrievances.length / 10);

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
          <span className="text-slate-800 font-semibold">Grievances Report</span>
        </nav>
        {/* Title */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-navy-700 text-gold-400 shadow-lg shadow-navy-500/30 border-2 border-white/50">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Grievances Report</h1>
              <p className="text-sm text-slate-600">State-wide police grievance monitoring and resolution tracking.</p>
            </div>
          </div>
          <span className="info-chip bg-navy-100 text-navy-800 border-navy-200">
            <Shield size={14} className="text-navy-600" />
            DGP State View — Full Access
          </span>
        </div>
      </header>
      
      {/* --- Filter Panel --- */}
      <GlassCard className="max-w-7xl mx-auto mb-8" noHover>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-sky-100">
          <ListFilter size={18} className="text-blue-700" />
          <h3 className="text-base font-semibold text-navy-800">Filter Grievances</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <select name="district" value={filters.district} onChange={handleFilterChange} className="form-select-sm">
              {filterOptions.districts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="source" value={filters.source} onChange={handleFilterChange} className="form-select-sm">
              {filterOptions.sources.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="form-select-sm">
              {filterOptions.types.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
                placeholder="Search ID or keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input-sm pl-9 w-full" 
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <StyledButton onClick={() => {}} variant="primary" className="h-full">
              <Filter size={16} /> Apply
            </StyledButton>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-sky-100">
             <StyledButton onClick={handleResetFilters} variant="secondary" className="px-3 py-1.5">
              <RotateCcw size={16} /> Reset Filters
            </StyledButton>
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
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title="Total Grievances" value={mockKpis.total.value.toString()} icon={MessageSquare} color="blue" />
        <StatCard title="Resolved" value={mockKpis.resolved.value.toString()} icon={CheckCircle} color="green" />
        <StatCard title="Pending" value={mockKpis.pending.value.toString()} icon={Clock} color="amber" />
        <StatCard title="Escalated" value={mockKpis.escalated.value.toString()} icon={AlertTriangle} color="red" />
      </section>

      {/* --- Main Worker Table --- */}
      <GlassCard className="max-w-7xl mx-auto" noHover>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
              <tr>
                <th className="th-cell">Grievance ID</th>
                <th className="th-cell">Source</th>
                <th className="th-cell">Type</th>
                <th className="th-cell">District</th>
                <th className="th-cell">Description</th>
                <th className="th-cell">Date Received</th>
                <th className="th-cell">Action Taken</th>
                <th className="th-cell">Status</th>
                <th className="th-cell">Escalated To</th>
                <th className="th-cell">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {paginatedGrievances.map((g) => (
                <motion.tr
                  key={g.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className={
                    g.status === "Escalated" ? 'bg-red-50/70 hover:bg-red-100/70' : 
                    g.status === "Pending" ? 'bg-amber-50/70 hover:bg-amber-100/70' :
                    'hover:bg-sky-50/50'
                  }
                >
                  <td className="td-cell font-medium text-navy-800">{g.id}</td>
                  <td className="td-cell">{g.source}</td>
                  <td className="td-cell">{g.type}</td>
                  <td className="td-cell">{g.district}</td>
                  <td className="td-cell max-w-xs truncate" title={g.description}>{g.description}</td>
                  <td className="td-cell">{g.dateReceived}</td>
                  <td className="td-cell max-w-xs truncate" title={g.actionTaken}>{g.actionTaken}</td>
                  <td className="td-cell"><StatusBadge status={g.status} /></td>
                  <td className="td-cell">{g.escalatedTo}</td>
                  <td className="td-cell">
                    <StyledButton onClick={() => setSelectedGrievance(g)} variant="icon" className="p-1.5 h-auto">
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
              Showing {paginatedGrievances.length} of {filteredGrievances.length} results
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
        <p className="italic">“Verified by DGP Office: Ensuring accountability and timely grievance resolution.”</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a href="#" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
            <HelpCircle size={14} /> Help & Support
          </a>
        </div>
      </footer>

      {/* --- Modal --- */}
      <GrievanceDetailModal grievance={selectedGrievance} onClose={() => setSelectedGrievance(null)} />

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

      `}</style>
    </motion.div>
  );
}

