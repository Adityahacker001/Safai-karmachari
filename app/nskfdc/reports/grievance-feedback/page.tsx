// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// recharts, aur lucide-react install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard, ChevronRight as ChevronRightIcon, MessageSquare, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertTriangle, ChevronLeft,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Link as LinkIcon, Building2, UserCheck, Clock, FileText, CheckCheck, FileWarning, BadgeCheck, BadgeHelp, BadgeAlert,
  Printer, Mail, AlertOctagon, HelpCircle, Smile, MessageCircleWarning,
} from 'lucide-react';

// --- Mock Data ---

const MOCK_GRIEVANCE_DATA = [
  { id: 1, grievanceId: 'GRV-2025-001', source: 'Individual SK', type: 'Payment', description: 'Delay in fund disbursement for scheme X', dateReceived: '2025-10-15', actionTaken: 'Escalated to state nodal office for verification and fund release.', status: 'Resolved', escalatedTo: 'State Nodal Office' },
  { id: 2, grievanceId: 'GRV-2025-002', source: 'SHG', type: 'Scheme Delay', description: 'Application for Sanitary Mart Loan pending approval for 2 months.', dateReceived: '2025-10-10', actionTaken: 'Followed up with the implementing agency. Awaiting response.', status: 'Pending', escalatedTo: null },
  { id: 3, grievanceId: 'GRV-2025-003', source: 'Staff', type: 'Eligibility Dispute', description: 'Beneficiary criteria clarification needed for education loan.', dateReceived: '2025-10-18', actionTaken: 'Clarification provided as per scheme guidelines.', status: 'Resolved', escalatedTo: null },
  { id: 4, grievanceId: 'GRV-2025-004', source: 'Public', type: 'Other', description: 'Website link for scheme details is broken.', dateReceived: '2025-10-20', actionTaken: 'IT team notified to fix the link.', status: 'Pending', escalatedTo: null },
  { id: 5, grievanceId: 'GRV-2025-005', source: 'Individual SK', type: 'Fund Issue', description: 'Incorrect amount disbursed for rehabilitation grant.', dateReceived: '2025-09-25', actionTaken: 'Finance team investigating discrepancy. Escalated to NSKC due to policy implication.', status: 'Escalated', escalatedTo: 'NSKC (National Commission)' },
  { id: 6, grievanceId: 'GRV-2025-006', source: 'SHG', type: 'Payment', description: 'Delay in subsidy release for mechanised cleaning equipment.', dateReceived: '2025-10-05', actionTaken: 'Funds released on 2025-10-24 after verification.', status: 'Resolved', escalatedTo: null },
  { id: 7, grievanceId: 'GRV-2025-007', source: 'Worker', type: 'Harassment', description: 'Issue with supervisor regarding work allocation.', dateReceived: '2025-10-22', actionTaken: 'HR department intervening.', status: 'Pending', escalatedTo: null },
  { id: 8, grievanceId: 'GRV-2025-008', source: 'Individual SK', type: 'Safety', description: 'Lack of safety gear provided for sewer cleaning.', dateReceived: '2025-10-12', actionTaken: 'Contractor instructed to provide PPE immediately. Follow-up scheduled.', status: 'In Progress', escalatedTo: null }, // Added In Progress
   { id: 9, grievanceId: 'GRV-2025-009', source: 'Staff', type: 'Suggestion', description: 'Improvement suggested for online application portal.', dateReceived: '2025-09-30', actionTaken: 'Suggestion forwarded to IT development team.', status: 'Resolved', escalatedTo: null },
   { id: 10, grievanceId: 'GRV-2025-010', source: 'SHG', type: 'Eligibility Dispute', description: 'Group eligibility questioned for E-Rickshaw loan.', dateReceived: '2025-10-26', actionTaken: 'Reviewing group documents against guidelines.', status: 'Pending', escalatedTo: null },
   // Add more data
   { id: 11, grievanceId: 'GRV-2025-011', source: 'Individual SK', type: 'Scheme Delay', description: 'Skill development training batch delayed.', dateReceived: '2025-10-01', actionTaken: 'Training partner confirmed new start date.', status: 'Resolved', escalatedTo: null },
   { id: 12, grievanceId: 'GRV-2025-012', source: 'Public', type: 'Appreciation', description: 'Positive feedback on timely loan processing.', dateReceived: '2025-10-19', actionTaken: 'Feedback noted and shared with the team.', status: 'Resolved', escalatedTo: null },
   { id: 13, grievanceId: 'GRV-2025-013', source: 'SHG', type: 'Fund Issue', description: 'Discrepancy in interest calculation.', dateReceived: '2025-10-27', actionTaken: 'Finance team reviewing calculation.', status: 'Pending', escalatedTo: null },
];

const mockSource = ['Individual SK', 'SHG', 'Staff', 'Public', 'Worker'];
const mockType = ['Payment', 'Scheme Delay', 'Eligibility Dispute', 'Fund Issue', 'Harassment', 'Safety', 'Other', 'Suggestion', 'Appreciation'];
const mockStatus = ['Pending', 'Resolved', 'Escalated', 'In Progress']; // Added In Progress

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Pending' | 'Resolved' | 'Escalated' | 'In Progress';
const GrievanceStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: BadgeCheck, label: 'Resolved' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: BadgeHelp, label: 'Pending' },
    Escalated: { bg: 'bg-red-100', text: 'text-red-700', icon: BadgeAlert, label: 'Escalated' },
    'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Hourglass, label: 'In Progress' }, // Added In Progress
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// 2. Reusable Form Input
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = 
  ({ label, type, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input
      type={type} id={name} name={name} value={value} onChange={onChange}
      className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200"
    />
  </div>
);

// 3. Reusable Form Select
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <select
      id={name} name={name} value={value} onChange={onChange}
      className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white"
    >
      {children}
    </select>
  </div>
);

// 4. Sortable Table Header
type SortableHeaderProps = {
  colKey: string; title: string;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  requestSort: (key: string) => void; className?: string;
};
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => {
    if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  return (
    <th 
      className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`}
      onClick={() => requestSort(colKey)}
    >
      <div className="flex items-center gap-1">{title}{getSortIcon()}</div>
    </th>
  );
};

// 5. View Details Modal
type GrievanceModalProps = {
  grievance: any | null;
  isOpen: boolean;
  onClose: () => void;
};
const GrievanceModal: React.FC<GrievanceModalProps> = ({ grievance, isOpen, onClose }) => {
  if (!isOpen || !grievance) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-modal-enter">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Grievance Details
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{grievance.grievanceId}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailItem label="Source" value={grievance.source} />
            <DetailItem label="Type" value={grievance.type} />
            <DetailItem label="Date Received" value={new Date(grievance.dateReceived).toLocaleDateString('en-GB')} />
            <DetailItem label="Current Status" value={<GrievanceStatusBadge status={grievance.status as Status} />} />
          </div>
          <DetailItem label="Description" value={grievance.description} className="md:col-span-2" isBlock />
          <DetailItem label="Action Taken" value={grievance.actionTaken || 'No action recorded yet.'} className="md:col-span-2" isBlock />
          {grievance.escalatedTo && (
            <DetailItem label="Escalated To" value={grievance.escalatedTo} className="md:col-span-2 text-red-600 font-medium" />
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]">
            <FileDown className="w-4 h-4" /> Download PDF
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.03] shadow-md"
          >
            <X className="w-4 h-4" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200' : ''}`}>{value}</p>
  </div>
);


// 6. Insights Panel Component
type InsightsPanelProps = {
  data: any[];
  isOpen: boolean;
  onClose: () => void;
};
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const statusCounts = useMemo(() => {
    const counts: Record<Status, number> = { Pending: 0, Resolved: 0, Escalated: 0, 'In Progress': 0 };
    data.forEach(item => { if (item.status in counts) counts[item.status as Status]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const typeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach(item => { counts[item.type] = (counts[item.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', received: 15, resolved: 10 }, { month: 'Jun', received: 18, resolved: 12 },
    { month: 'Jul', received: 25, resolved: 18 }, { month: 'Aug', received: 22, resolved: 20 },
    { month: 'Sep', received: 30, resolved: 25 }, { month: 'Oct', received: 35, resolved: 28 },
  ];

  const PIE_COLORS: Record<Status, string> = { Resolved: '#10B981', Pending: '#F59E0B', Escalated: '#EF4444', 'In Progress': '#3B82F6' }; // Green, Yellow, Red, Blue

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Grievance Insights
        </h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Status Distribution Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Status Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as Status]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Grievances`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Grievances by Type Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Grievances by Type</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={typeCounts} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={100} interval={0} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#8884d8" name="Count" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Grievance Trend</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                 <XAxis dataKey="month" fontSize={10} />
                 <YAxis fontSize={10}/>
                 <RechartsTooltip />
                 <Legend />
                 <Line type="monotone" dataKey="received" name="Received" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 6 }}/>
                 <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const GrievanceReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateFrom: '', dateTo: '', status: '', type: '', source: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ dateFrom: '', dateTo: '', status: '', type: '', source: '' });
    setSearchQuery('');
    setCurrentPage(1); setSortConfig(null);
  };
  
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic (Filtering, Sorting) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_GRIEVANCE_DATA];
    // Search
    if (searchQuery) {
      data = data.filter(item =>
        item.grievanceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Filters
    if (filters.source) data = data.filter(item => item.source === filters.source);
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateReceived) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateReceived) <= new Date(filters.dateTo));
    // Sorting
    if (sortConfig !== null) {
      data.sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // --- Sorting Handler ---
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // --- Summary Calculation ---
  const summary = useMemo(() => {
    const total = filteredData.length;
    const resolved = filteredData.filter(d => d.status === 'Resolved').length;
    const pending = filteredData.filter(d => d.status === 'Pending').length;
    const escalated = filteredData.filter(d => d.status === 'Escalated').length;
    const inProgress = filteredData.filter(d => d.status === 'In Progress').length; // Include In Progress
    const resolutionRate = total === 0 ? 0 : (resolved / total) * 100;
    return {
      total, resolved, pending, escalated, inProgress,
      resolutionRate: resolutionRate.toFixed(1) + '%',
    };
  }, [filteredData]);

  // --- Modal Handlers ---
  const openModal = (grievance: any) => {
    setSelectedGrievance(grievance);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);


  if (loading) return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx global>{`
        .loader {
          width: 65px;
          height: 65px;
          display: block;
          --c: no-repeat linear-gradient(#4f46e5 0 0);
          background: 
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c);
          background-size: 16px 16px;
          animation: 
            l32-1 1s infinite,
            l32-2 1s infinite;
        }
        @keyframes l32-1 {
          0%,100% {width:45px;height: 45px}
          35%,65% {width:65px;height: 65px}
        }
        @keyframes l32-2 {
          0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
          60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- 1. Header Section --- */}
        <header className="mb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-2" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" />
            Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" />
            Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">Grievance Feedback Report</span>
          </nav>
          <div className="w-full">
            <div className="rounded-xl px-6 py-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 shadow-lg w-full">
              <h1 className="text-3xl font-bold text-white tracking-tight">Grievance Feedback Report</h1>
              <p className="text-white/80 mt-1 font-medium">Monitor, review, and analyze grievances and feedback.</p>
            </div>
          </div>
        </header>

  {/* --- 2. Filters Panel --- */}
  <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Filter className="w-5 h-5 text-indigo-600" /> Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <FormSelect label="Source" name="source" value={filters.source} onChange={handleFilterChange}>
              <option value="">All Sources</option>
              {mockSource.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <FormSelect label="Type" name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {mockType.map(t => <option key={t} value={t}>{t}</option>)}
            </FormSelect>
            <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              {mockStatus.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <div className="grid grid-cols-2 gap-2">
              <FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
              <FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
            </div>
             <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
                <input
                  type="text" id="search" placeholder="ID / Type / Source..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
              </div>
          </div>
          <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02]"
            >
              <X className="w-4 h-4" /> Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <Search className="w-4 h-4" /> Apply Filters
            </button>
          </div>
        </div>

        {/* --- Export/Reload/Insights Section (moved below filters) --- */}
        <div className="flex flex-wrap gap-2 mb-6 w-full">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}> <BarChart3 className="w-4 h-4" /> View Insights </button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
        </div>
        {/* --- 3. Grievance Data Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-sky-100 to-blue-100 text-indigo-900 font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left min-w-[50px]">Sl.</th>
                  <SortableHeader colKey="grievanceId" title="Grievance ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="source" title="Source" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <SortableHeader colKey="type" title="Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <th className="px-4 py-3 text-left min-w-[250px]">Description</th>
                  <SortableHeader colKey="dateReceived" title="Date Received" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <th className="px-4 py-3 text-left min-w-[250px]">Action Taken</th>
                  {/* <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" /> */}
                  <th className="px-4 py-3 text-left min-w-[150px]">Escalated To</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className={
                    `${index % 2 === 0 ? 'bg-white' : 'bg-sky-50'} hover:bg-indigo-50/70 transition-colors rounded-lg`}
                  >
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{item.grievanceId}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{item.source}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{item.type}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.description}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{new Date(item.dateReceived).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.actionTaken}</td>
                    <td className={`px-4 py-3 whitespace-nowrap ${item.escalatedTo ? 'text-red-600 font-medium' : 'text-slate-400'}`}>{item.escalatedTo || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button onClick={() => openModal(item)} className="flex items-center gap-1 text-indigo-600 hover:underline hover:text-indigo-800">
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-10 text-slate-500">No grievances found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
             <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label>
                <select id="rowsPerPage" value={rowsPerPage} 
                        onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500">
                  <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- 4. Summary Footer Card --- */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm 
                        flex flex-col md:flex-row flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><strong>Total Grievances:</strong> {summary.total}</span>
            <span className="text-yellow-600"><strong>Pending:</strong> {summary.pending}</span>
            <span className="text-blue-600"><strong>In Progress:</strong> {summary.inProgress}</span>
            <span className="text-green-600"><strong>Resolved:</strong> {summary.resolved}</span>
            <span className="text-red-600"><strong>Escalated:</strong> {summary.escalated}</span>
          </div>
          <span className="font-semibold text-indigo-700">Resolution Rate: {summary.resolutionRate}</span>
        </div>

        {/* --- 5. Audit Footer --- */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Created By: Officer Name • Created On: 26 Oct 2025</p>
          <p className="mt-1">Last Updated By: Admin • Updated On: 26 Oct 2025, 16:40 IST</p>
        </footer>
        
        {/* View Details Modal */}
        <GrievanceModal 
          grievance={selectedGrievance} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
        
        {/* Insights Panel */}
        <InsightsPanel 
          data={filteredData} 
          isOpen={isInsightsOpen} 
          onClose={() => setIsInsightsOpen(false)} 
        />
        {/* Backdrop for Insights Panel */}
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}

      </div>
    </div>
  );
};

export default GrievanceReportPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-enter {
  animation: modalEnter 0.2s ease-out forwards;
}
*/