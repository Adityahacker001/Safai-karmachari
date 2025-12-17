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
  LayoutDashboard, ChevronRight as ChevronRightIcon, ClipboardCheck, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertCircle, ChevronLeft,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Link as LinkIcon, Building2, UserCheck, Clock, FileText, CheckCheck, FileWarning,
} from 'lucide-react';

// --- Mock Data ---

const MOCK_COMPLIANCE_DATA = [
  { id: 1, dirId: 'DIR/2025/NSKFDC/0023', issuedBy: 'NSKFDC HQ', dateIssued: '2025-10-10', subject: 'Compliance report on sanitation training', status: 'Complied', dateComplied: '2025-10-22', proofUrl: '/docs/compliance_0023.pdf', remarks: 'Report submitted with photographic evidence', reviewedBy: 'Regional Officer' },
  { id: 2, dirId: 'DIR/2025/MSJE/0015', issuedBy: 'MSJE (Ministry)', dateIssued: '2025-09-15', subject: 'Fund Utilization Data Submission Q2', status: 'Complied', dateComplied: '2025-10-05', proofUrl: '/docs/compliance_0015.pdf', remarks: 'Excel sheet uploaded to portal', reviewedBy: 'Finance Officer' },
  { id: 3, dirId: 'DIR/2025/STATE/0008', issuedBy: 'State Office (UP)', dateIssued: '2025-10-01', subject: 'Beneficiary Verification Drive Report', status: 'In Progress', dateComplied: null, proofUrl: null, remarks: 'Verification ongoing in 5 districts', reviewedBy: 'State Nodal Officer' },
  { id: 4, dirId: 'DIR/2025/NSKFDC/0024', issuedBy: 'NSKFDC HQ', dateIssued: '2025-10-18', subject: 'Action Taken Report on Grievance #145', status: 'Pending', dateComplied: null, proofUrl: null, remarks: 'Awaiting response from field office', reviewedBy: 'Grievance Cell' },
  { id: 5, dirId: 'DIR/2025/MSJE/0016', issuedBy: 'MSJE (Ministry)', dateIssued: '2025-08-20', subject: 'Mid-term Scheme Performance Review', status: 'Complied', dateComplied: '2025-09-10', proofUrl: '/docs/compliance_0016.pdf', remarks: 'Presentation submitted', reviewedBy: 'Project Director' },
  { id: 6, dirId: 'DIR/2025/NSKFDC/0025', issuedBy: 'NSKFDC HQ', dateIssued: '2025-10-25', subject: 'Details for Annual Report Compilation', status: 'Pending', dateComplied: null, proofUrl: null, remarks: 'Data collection in progress', reviewedBy: 'Reporting Officer' },
  { id: 7, dirId: 'DIR/2025/DIST/0002', issuedBy: 'District Office (Pune)', dateIssued: '2025-09-28', subject: 'SHG Formation Status Update', status: 'Complied', dateComplied: '2025-10-15', proofUrl: '/docs/compliance_DIST0002.pdf', remarks: 'List of new SHGs attached', reviewedBy: 'District Coordinator' },
  { id: 8, dirId: 'DIR/2025/NSKFDC/0026', issuedBy: 'NSKFDC HQ', dateIssued: '2025-10-05', subject: 'Audit Query Response - Skill Dev.', status: 'In Progress', dateComplied: null, proofUrl: null, remarks: 'Awaiting clarification from Training Partner', reviewedBy: 'Audit Cell' },
  // Add more mock data for pagination
  { id: 9, dirId: 'DIR/2025/MSJE/0017', issuedBy: 'MSJE (Ministry)', dateIssued: '2025-07-01', subject: 'Implementation Status of New Policy', status: 'Complied', dateComplied: '2025-08-15', proofUrl: '/docs/compliance_0017.pdf', remarks: 'State-wise report submitted', reviewedBy: 'Policy Officer' },
  { id: 10, dirId: 'DIR/2025/NSKFDC/0027', issuedBy: 'NSKFDC HQ', dateIssued: '2025-10-12', subject: 'Proposal for Awareness Camp Budget', status: 'Pending', dateComplied: null, proofUrl: null, remarks: 'Proposal under internal review', reviewedBy: 'Finance Officer' },
  { id: 11, dirId: 'DIR/2025/STATE/0009', issuedBy: 'State Office (MH)', dateIssued: '2025-09-20', subject: 'Loan Recovery Data Q2', status: 'Complied', dateComplied: '2025-10-10', proofUrl: '/docs/compliance_STATE0009.pdf', remarks: 'Recovery data sheet attached', reviewedBy: 'Recovery Officer' },
  { id: 12, dirId: 'DIR/2025/MSJE/0018', issuedBy: 'MSJE (Ministry)', dateIssued: '2025-10-22', subject: 'Urgent Data Request - PMO Ref', status: 'In Progress', dateComplied: null, proofUrl: null, remarks: 'Compiling data from states', reviewedBy: 'Director Office' },
];

const mockIssuedBy = ['NSKFDC HQ', 'MSJE (Ministry)', 'State Office (UP)', 'State Office (MH)', 'District Office (Pune)'];
const mockStatus = ['Complied', 'In Progress', 'Pending'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Complied' | 'In Progress' | 'Pending';
const ComplianceStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Complied: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCheck, label: 'Complied' },
    'In Progress': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'In Progress' },
    Pending: { bg: 'bg-red-100', text: 'text-red-700', icon: FileWarning, label: 'Pending' },
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

// --- Insights Panel Component ---
type InsightsPanelProps = {
  data: any[];
  isOpen: boolean;
  onClose: () => void;
};
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const statusCounts = useMemo(() => {
    const counts = { Complied: 0, 'In Progress': 0, Pending: 0 };
    data.forEach(item => {
      if (item.status in counts) counts[item.status as Status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const issuedByCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach(item => {
      counts[item.issuedBy] = (counts[item.issuedBy] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);
  
  // Mock monthly compliance trend
  const monthlyTrend = [
    { month: 'May', complied: 8, pending: 4 }, { month: 'Jun', complied: 10, pending: 3 },
    { month: 'Jul', complied: 12, pending: 5 }, { month: 'Aug', complied: 15, pending: 2 },
    { month: 'Sep', complied: 18, pending: 4 }, { month: 'Oct', complied: 20, pending: 6 },
  ];


  const PIE_COLORS = { Complied: '#10B981', 'In Progress': '#F59E0B', Pending: '#EF4444' }; // Green, Yellow, Red

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Compliance Insights
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
                <RechartsTooltip formatter={(value, name) => [`${value} Directions`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Directions Issued By Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Directions Issued By</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={issuedByCounts} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" fontSize={10} interval={0} angle={-30} textAnchor="end" height={50} />
                <YAxis fontSize={10} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#8884d8" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Compliance Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Compliance Trend</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                 <XAxis dataKey="month" fontSize={10} />
                 <YAxis fontSize={10}/>
                 <RechartsTooltip />
                 <Legend />
                 <Line type="monotone" dataKey="complied" name="Complied" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }}/>
                 <Line type="monotone" dataKey="pending" name="Pending" stroke="#EF4444" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const DirectionComplianceReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    issuedBy: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerStatus, setViewerStatus] = useState<'idle' | 'loading' | 'not-found' | 'ready'>('idle');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const clearFilters = () => {
    setFilters({ issuedBy: '', status: '', dateFrom: '', dateTo: '' });
    setSearchQuery('');
    setCurrentPage(1);
    setSortConfig(null);
  };
  
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic (Filtering, Sorting) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_COMPLIANCE_DATA];
    // Search
    if (searchQuery) {
      data = data.filter(item =>
        item.dirId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.remarks.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Filters
    if (filters.issuedBy) data = data.filter(item => item.issuedBy === filters.issuedBy);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateIssued) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateIssued) <= new Date(filters.dateTo));
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
    const complied = filteredData.filter(d => d.status === 'Complied').length;
    const inProgress = filteredData.filter(d => d.status === 'In Progress').length;
    const pending = filteredData.filter(d => d.status === 'Pending').length;
    const complianceRate = total === 0 ? 0 : (complied / total) * 100;
    return {
      total, complied, inProgress, pending,
      complianceRate: complianceRate.toFixed(2) + '%',
    };
  }, [filteredData]);

  // Mock View Document Function
  // View Document Function — opens the document in a new browser tab
  // Mock View Document Function (kept for fallback if needed)
  const viewDocument = (url: string | null) => {
    if (!url) {
      alert('No document uploaded.');
      return;
    }
    try {
      const href = url.startsWith('http') ? url : `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;
      window.open(href, '_blank', 'noopener,noreferrer');
    } catch (err) {
      try { window.location.href = url; } catch (e) { alert(`Unable to open document: ${url}`); }
    }
  };

  // Show document inline (drawer) — checks resource before embedding to avoid iframe 404s
  const showDocumentInline = async (url: string | null) => {
    setViewerOpen(true);
    setViewerUrl(null);
    setViewerStatus('loading');

    if (!url) {
      // immediate not-found state
      setViewerStatus('not-found');
      return;
    }

    // normalize URL to absolute for fetch
    const href = url.startsWith('http') ? url : (typeof window !== 'undefined' ? `${window.location.origin}${url}` : url);

    try {
      // Try HEAD first; some servers disallow HEAD so fallback to GET
      let res = null;
      try {
        res = await fetch(href, { method: 'HEAD' });
      } catch (e) {
        // HEAD failed, try GET
        res = await fetch(href, { method: 'GET' });
      }

      if (res && res.ok) {
        setViewerUrl(href);
        setViewerStatus('ready');
      } else {
        setViewerStatus('not-found');
      }
    } catch (err) {
      setViewerStatus('not-found');
    }
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setViewerStatus('idle');
    setTimeout(() => setViewerUrl(null), 200);
  };

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
    <div className="min-h-screen bg-white p-2 sm:p-4 lg:p-8 font-sans">
      <div className="w-full mx-auto">
        
        {/* --- 1. Header Section --- */}
        <header className="mb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-2" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" />
            Dashboard
            <ChevronRightIcon className="w-4 h-4 mx-1" />
            Reports & Analytics
            <ChevronRightIcon className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">Direction Compliance Report</span>
          </nav>
          <div className="w-full rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 50%, #10b981 100%)',
              color: 'white',
              boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.10)',
            }}>
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm text-center sm:text-left">Direction Compliance Report</h1>
              <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 text-center sm:text-left">Monitor and analyze compliance submissions for all issued directions.</p>
            </div>
          </div>
        </header>

        {/* --- 2. Filters Panel --- */}
  <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Filter className="w-5 h-5 text-indigo-600" /> Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect label="Issued By" name="issuedBy" value={filters.issuedBy} onChange={handleFilterChange}>
              <option value="">All Authorities</option>
              {mockIssuedBy.map(a => <option key={a} value={a}>{a}</option>)}
            </FormSelect>
            <FormSelect label="Compliance Status" name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              {mockStatus.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
             <div className="grid grid-cols-2 gap-2">
               <FormInput label="From Date (Issue)" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
               <FormInput label="To Date (Issue)" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
             </div>
             <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
                <input
                  type="text" id="search" placeholder="ID / Subject / Remarks..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 pl-9 rounded-lg border-2 border-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
              </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 border-t border-slate-200 pt-5">
            <div className="flex gap-3">
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
            {/* Export/Reload/Insights Section under Filters */}
            <div className="flex items-center gap-2 justify-end">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.03] shadow-md hover:shadow-lg"
                      onClick={() => setIsInsightsOpen(true)}>
                <BarChart3 className="w-4 h-4" /> View Insights
              </button>
              <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors shadow-sm" title="Export as CSV">
                <FileDown className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors shadow-sm" title="Export as PDF">
                <FileDown className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors shadow-sm" title="Refresh Data">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. Compliance Data Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-pink-100 to-yellow-100 text-indigo-900 font-bold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left min-w-[50px]">Sl.</th>
                  <SortableHeader colKey="dirId" title="Direction ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                  <SortableHeader colKey="issuedBy" title="Issued By" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="dateIssued" title="Date Issued" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <th className="px-4 py-3 text-left min-w-[250px]">Subject / Summary</th>
                  {/* <SortableHeader colKey="status" title="Compliance Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" /> */}
                  <SortableHeader colKey="dateComplied" title="Date Complied" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <th className="px-4 py-3 text-left min-w-[140px]">Proof Document</th>
                  <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                  <th className="px-4 py-3 text-left min-w-[150px]">Reviewed By</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className={`transition-colors ${index % 2 === 0 ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-pink-50/60`}>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap border-r border-slate-100">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap border-r border-slate-100">{item.dirId}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.issuedBy}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{new Date(item.dateIssued).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap truncate max-w-xs border-r border-slate-100">{item.subject}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.dateComplied ? new Date(item.dateComplied).toLocaleDateString('en-GB') : '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap border-r border-slate-100">
                      {item.proofUrl ? (
                        <button onClick={() => showDocumentInline(item.proofUrl)} className="flex items-center gap-1 text-indigo-600 hover:underline hover:text-indigo-800">
                          <LinkIcon className="w-4 h-4" /> View
                        </button>
                      ) : (
                        <button onClick={() => showDocumentInline(null)} className="flex items-center gap-1 text-slate-400 text-xs hover:underline">
                          Not Uploaded
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs border-r border-slate-100">{item.remarks}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.reviewedBy || '—'}</td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-10 text-slate-500">No directions found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
             <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-slate-200 bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50">
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

        {/* --- 4. Footer Summary Card --- */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm 
                        flex flex-col md:flex-row flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><strong>Total Directions:</strong> {summary.total}</span>
            <span className="text-green-600"><strong>Complied:</strong> {summary.complied}</span>
            <span className="text-yellow-600"><strong>In Progress:</strong> {summary.inProgress}</span>
            <span className="text-red-600"><strong>Pending:</strong> {summary.pending}</span>
          </div>
          <span className="font-semibold text-indigo-700">Compliance Rate: {summary.complianceRate}</span>
        </div>

        {/* --- 5. Audit Footer --- */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 26 Oct 2025, 16:20 IST</p>
          <p className="mt-1">Data Source: NSKFDC Direction & Compliance Records</p>
        </footer>
        
        {/* Insights Panel */}
        <InsightsPanel 
          data={filteredData} 
          isOpen={isInsightsOpen} 
          onClose={() => setIsInsightsOpen(false)} 
        />
        {/* Backdrop for Insights Panel */}
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}

        {/* Document Viewer Modal (centered, compact) */}
        {viewerOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-50" onClick={closeViewer}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="pointer-events-auto bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-slate-200">
                  <h3 className="text-md font-semibold text-slate-800">Document Viewer</h3>
                  <button onClick={closeViewer} className="p-2 rounded-full hover:bg-slate-100">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="p-3 overflow-auto" style={{ maxHeight: 'calc(80vh - 56px)' }}>
                  {viewerStatus === 'loading' && (
                    <div className="w-full h-40 flex items-center justify-center text-slate-500">Loading document…</div>
                  )}
                  {viewerStatus === 'not-found' && (
                    <div className="w-full h-40 flex items-center justify-center text-slate-500">No document uploaded for this direction.</div>
                  )}
                  {viewerStatus === 'ready' && viewerUrl && (
                    <div className="w-full">
                      <iframe
                        src={viewerUrl}
                        className="w-full border rounded-md"
                        style={{ height: '60vh' }}
                        title="Proof Document"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default DirectionComplianceReportPage;