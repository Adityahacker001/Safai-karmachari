// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// recharts, aur lucide-react install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
  LayoutDashboard,
  Wallet,
  Search,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Hourglass,
  AlertTriangle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Users,
  Building,
  List,
  DollarSign,
  BarChart3,
  Info,
  TrendingUp,
  Package,
  SlidersHorizontal,
  ListFilter,
} from 'lucide-react';

// --- Mock Data ---

const MOCK_DISBURSEMENT_DATA = [
  { id: 1, benType: 'Individual', name: 'Ramesh Kumar', scheme: 'Self Employment Scheme', amtSanctioned: 150000, amtDisbursed: 120000, date: '2025-10-25', status: 'Paid', delayReason: '—' },
  { id: 2, benType: 'SHG', name: 'Jyoti SHG', scheme: 'Sanitary Mart Loan', amtSanctioned: 1500000, amtDisbursed: 750000, date: '2025-10-22', status: 'Paid', delayReason: '—' },
  { id: 3, benType: 'Individual', name: 'Sunita Devi', scheme: 'Education Loan', amtSanctioned: 500000, amtDisbursed: 100000, date: '2025-10-18', status: 'Paid', delayReason: '—' },
  { id: 4, benType: 'Individual', name: 'Vijay Patel', scheme: 'Self Employment Scheme', amtSanctioned: 200000, amtDisbursed: 0, date: '2025-11-05', status: 'Pending', delayReason: 'Awaiting Docs' },
  { id: 5, benType: 'SHG', name: 'Ujala SHG', scheme: 'Mechanized Cleaning Grant', amtSanctioned: 2500000, amtDisbursed: 1000000, date: '2025-09-15', status: 'Delayed', delayReason: 'Bank Processing Issue' },
  { id: 6, benType: 'Individual', name: 'Amit Singh', scheme: 'Rehabilitation Grant', amtSanctioned: 40000, amtDisbursed: 40000, date: '2025-01-25', status: 'Paid', delayReason: '—' },
  { id: 7, benType: 'SHG', name: 'Ekta SHG', scheme: 'Self Employment Scheme', amtSanctioned: 800000, amtDisbursed: 400000, date: '2025-11-10', status: 'Pending', delayReason: 'Verification Ongoing' },
  { id: 8, benType: 'Individual', name: 'Priya Sharma', scheme: 'Education Loan', amtSanctioned: 600000, amtDisbursed: 150000, date: '2025-08-20', status: 'Paid', delayReason: '—' },
  { id: 9, benType: 'Individual', name: 'Manoj Kumar', scheme: 'Self Employment Scheme', amtSanctioned: 100000, amtDisbursed: 0, date: '2025-09-01', status: 'Delayed', delayReason: 'State Agency Delay' },
  { id: 10, benType: 'SHG', name: 'Sahara SHG', scheme: 'Sanitary Mart Loan', amtSanctioned: 1200000, amtDisbursed: 600000, date: '2025-10-30', status: 'Paid', delayReason: '—' },
  // Add more data for pagination
  { id: 11, benType: 'Individual', name: 'Kavita Joshi', scheme: 'Self Employment Scheme', amtSanctioned: 120000, amtDisbursed: 120000, date: '2025-04-10', status: 'Paid', delayReason: '—' },
  { id: 12, benType: 'Individual', name: 'Sandeep Singh', scheme: 'E-Rickshaw Loan', amtSanctioned: 150000, amtDisbursed: 150000, date: '2025-05-15', status: 'Paid', delayReason: '—' },
  { id: 13, benType: 'SHG', name: 'Pragati SHG', scheme: 'Mechanized Cleaning Grant', amtSanctioned: 2000000, amtDisbursed: 500000, date: '2025-11-20', status: 'Pending', delayReason: 'Approval Pending' },
  { id: 14, benType: 'Individual', name: 'Lakshmi Iyer', scheme: 'Education Loan', amtSanctioned: 800000, amtDisbursed: 200000, date: '2025-06-01', status: 'Paid', delayReason: '—' },
  { id: 15, benType: 'SHG', name: 'Nirman SHG', scheme: 'Self Employment Scheme', amtSanctioned: 900000, amtDisbursed: 300000, date: '2025-10-05', status: 'Delayed', delayReason: 'Fund Availability' },
];

const mockSchemes = ['Self Employment Scheme', 'Sanitary Mart Loan', 'Education Loan', 'Rehabilitation Grant', 'Mechanized Cleaning Grant', 'E-Rickshaw Loan'];
const mockStatuses = ['Paid', 'Pending', 'Delayed'];
const mockBenTypes = ['Individual', 'SHG'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Paid' | 'Pending' | 'Delayed';
const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Paid: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Paid' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Pending' },
    Delayed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle, label: 'Delayed' },
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

// --- Currency Formatter ---
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
};

// --- Insights Panel Component ---
type InsightsPanelProps = {
  data: any[];
  isOpen: boolean;
  onClose: () => void;
};
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  const statusCounts = useMemo(() => {
    const counts = { Paid: 0, Pending: 0, Delayed: 0 };
    data.forEach(item => {
      if (item.status in counts) counts[item.status as Status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const schemeDisbursement = useMemo(() => {
    const schemeMap = new Map<string, number>();
    data.forEach(item => {
      schemeMap.set(item.scheme, (schemeMap.get(item.scheme) || 0) + item.amtDisbursed);
    });
    return Array.from(schemeMap.entries()).map(([name, value]) => ({ name, disbursed: value }));
  }, [data]);

  const PIE_COLORS = { Paid: '#10B981', Pending: '#F59E0B', Delayed: '#EF4444' }; // Green, Yellow, Red

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Disbursement Insights
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
                <RechartsTooltip formatter={(value, name) => [`${value} Records`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Scheme-wise Disbursement Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Disbursement by Scheme</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={schemeDisbursement} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" fontSize={10} tickFormatter={(value) => `₹${value/100000}L`} />
                <YAxis dataKey="name" type="category" fontSize={10} width={100} interval={0} />
                <RechartsTooltip formatter={(value) => [formatCurrency(value as number), 'Disbursed']} />
                <Bar dataKey="disbursed" fill="#6366F1" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const FundDisbursementReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    benType: '',
    scheme: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
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
    setFilters({ benType: '', scheme: '', status: '', dateFrom: '', dateTo: '' });
    setSearchQuery('');
    setCurrentPage(1);
    setSortConfig(null);
  };
  
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic (Filtering, Sorting) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_DISBURSEMENT_DATA];
    // Search
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false
      );
    }
    // Filters
    if (filters.benType) data = data.filter(item => item.benType === filters.benType);
    if (filters.scheme) data = data.filter(item => item.scheme === filters.scheme);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.date) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.date) <= new Date(filters.dateTo));
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
    const totalSanctioned = filteredData.reduce((sum, item) => sum + item.amtSanctioned, 0);
    const totalDisbursed = filteredData.reduce((sum, item) => sum + item.amtDisbursed, 0);
    return {
      totalRecords: filteredData.length,
      totalSanctioned: formatCurrency(totalSanctioned),
      totalDisbursed: formatCurrency(totalDisbursed),
      pending: formatCurrency(totalSanctioned - totalDisbursed),
    };
  }, [filteredData]);

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
            <span className="font-semibold text-indigo-600">Fund Disbursement Report</span>
          </nav>
          <div className="w-full rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #10b981 0%, #22d3ee 50%, #6366f1 100%)',
              color: 'white',
              boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.10)',
            }}>
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm text-center sm:text-left">Fund Disbursement Report</h1>
              <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 text-center sm:text-left">Track fund allocation, disbursement progress, and delays.</p>
            </div>
          </div>
        </header>

        {/* --- 2. Filters Panel --- */}
  <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <ListFilter className="w-5 h-5 text-indigo-600" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <FormSelect label="Beneficiary Type" name="benType" value={filters.benType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {mockBenTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </FormSelect>
            <FormSelect label="Scheme" name="scheme" value={filters.scheme} onChange={handleFilterChange}>
              <option value="">All Schemes</option>
              {mockSchemes.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              {mockStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
            <FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
              <input
                type="text" id="search" placeholder="Name/Scheme/Remarks..."
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

        {/* --- 3. Disbursement Data Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-pink-100 to-yellow-100 text-indigo-900 font-bold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left min-w-[50px]">Sl. No.</th>
                  <SortableHeader colKey="benType" title="Beneficiary Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <SortableHeader colKey="name" title="Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                  <SortableHeader colKey="scheme" title="Scheme" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[200px]" />
                  <SortableHeader colKey="amtSanctioned" title="Amt Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[160px]" />
                  <SortableHeader colKey="amtDisbursed" title="Amt Disbursed (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[160px]" />
                  <SortableHeader colKey="date" title="Disbursement Date" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  {/* <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" /> */}
                  <th className="px-4 py-3 text-left min-w-[200px]">Delay Reason</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className={`transition-colors ${index % 2 === 0 ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-pink-50/60`}>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap border-r border-slate-100">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.benType}</td>
                    <td className="px-4 py-3 text-indigo-700 font-semibold whitespace-nowrap border-r border-slate-100">{item.name}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.scheme}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap text-right font-medium border-r border-slate-100">{formatCurrency(item.amtSanctioned)}</td>
                    <td className="px-4 py-3 text-green-700 whitespace-nowrap text-right font-bold border-r border-slate-100">{formatCurrency(item.amtDisbursed)}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{new Date(item.date).toLocaleDateString('en-GB')}</td>
                    <td className={`px-4 py-3 text-xs whitespace-nowrap border-r border-slate-100 ${item.status === 'Delayed' ? 'text-red-600 font-medium' : 'text-slate-500'}`}>{item.delayReason}</td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-slate-500">No records found matching your criteria.</td></tr>
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
            <span><strong>Total Records:</strong> {summary.totalRecords}</span>
            <span><strong>Total Sanctioned:</strong> {summary.totalSanctioned}</span>
            <span className="text-green-700 font-semibold"><strong>Total Disbursed:</strong> {summary.totalDisbursed}</span>
            <span className="text-orange-600 font-semibold"><strong>Pending:</strong> {summary.pending}</span>
          </div>
          <span><strong>Last Updated:</strong> 26 Oct 2025, 03:22 PM</span>
        </div>

        {/* --- 5. Audit Footer --- */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Report Generated By: NSKFDC Officer – Automated Reporting System • Generated On: 26 Oct 2025, 15:22 IST</p>
          <p className="mt-1">Data Source: NSKFDC Financial Records</p>
        </footer>
        
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

export default FundDisbursementReportPage;