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
  LayoutDashboard, ChevronRightIcon, BarChart3, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, XCircle, ChevronLeft,
  Users, Building, List, DollarSign, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Link as LinkIcon, Building2, UserCheck, Clock, FileText, CheckCheck, FileWarning, BadgeCheck, BadgeHelp, BadgeAlert,
  Printer, Mail, AlertOctagon, HelpCircle, Smile, MessageCircleWarning, MapPin, Target, Percent, BookOpen, Wallet, Calculator,
} from 'lucide-react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';

// --- Mock Data ---

const MOCK_UTILIZATION_DATA = [
  { id: 1, schemeName: 'Self Employment Scheme', schemeId: 'SCH-2025-001', state: 'Karnataka', district: 'Bengaluru', amtSanctioned: 1000000, amtReleased: 900000, amtUtilized: 850000, lastUpdated: '2025-10-25' },
  { id: 2, schemeName: 'Skill Development Program', schemeId: 'SCH-2025-002', state: 'Maharashtra', district: 'Pune', amtSanctioned: 500000, amtReleased: 500000, amtUtilized: 480000, lastUpdated: '2025-10-24' },
  { id: 3, schemeName: 'Sanitary Mart Loan', schemeId: 'SCH-2025-003', state: 'Uttar Pradesh', district: 'Lucknow', amtSanctioned: 1500000, amtReleased: 700000, amtUtilized: 300000, lastUpdated: '2025-10-26' },
  { id: 4, schemeName: 'Rehabilitation Grant', schemeId: 'SCH-2025-004', state: 'West Bengal', district: 'Kolkata', amtSanctioned: 800000, amtReleased: 800000, amtUtilized: 800000, lastUpdated: '2025-09-30' },
  { id: 5, schemeName: 'Education Loan', schemeId: 'SCH-2025-005', state: 'Tamil Nadu', district: 'Chennai', amtSanctioned: 1200000, amtReleased: 400000, amtUtilized: 150000, lastUpdated: '2025-10-22' },
  { id: 6, schemeName: 'Self Employment Scheme', schemeId: 'SCH-2025-006', state: 'Rajasthan', district: 'Jaipur', amtSanctioned: 700000, amtReleased: 350000, amtUtilized: 0, lastUpdated: '2025-10-15' },
  { id: 7, schemeName: 'Mechanized Cleaning Grant', schemeId: 'SCH-2025-007', state: 'Delhi', district: 'New Delhi', amtSanctioned: 2500000, amtReleased: 2000000, amtUtilized: 1950000, lastUpdated: '2025-10-18' },
  { id: 8, schemeName: 'Skill Development Program', schemeId: 'SCH-2025-008', state: 'Gujarat', district: 'Ahmedabad', amtSanctioned: 600000, amtReleased: 600000, amtUtilized: 590000, lastUpdated: '2025-10-05' },
  { id: 9, schemeName: 'E-Rickshaw Loan', schemeId: 'SCH-2025-009', state: 'Haryana', district: 'Gurugram', amtSanctioned: 400000, amtReleased: 400000, amtUtilized: 400000, lastUpdated: '2025-10-24' },
  { id: 10, schemeName: 'Self Employment Scheme', schemeId: 'SCH-2025-010', state: 'Punjab', district: 'Ludhiana', amtSanctioned: 900000, amtReleased: 500000, amtUtilized: 200000, lastUpdated: '2025-10-12' },
  // Add more data
  { id: 11, schemeName: 'Sanitary Mart Loan', schemeId: 'SCH-2025-011', state: 'Madhya Pradesh', district: 'Indore', amtSanctioned: 1300000, amtReleased: 1300000, amtUtilized: 1250000, lastUpdated: '2025-10-19' },
  { id: 12, schemeName: 'Education Loan', schemeId: 'SCH-2025-012', state: 'Bihar', district: 'Patna', amtSanctioned: 800000, amtReleased: 200000, amtUtilized: 50000, lastUpdated: '2025-10-26' },
];

const mockSchemes = [...new Set(MOCK_UTILIZATION_DATA.map(d => d.schemeName))];
const mockStates = [...new Set(MOCK_UTILIZATION_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_UTILIZATION_DATA.map(d => d.district))]; // Simplified
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockUtilizationStatus = ['Fully Utilized', 'Partially Utilized', 'Not Utilized'];

// --- Utility: Calculate Utilization ---
const calculateUtilization = (sanctioned: number, utilized: number) => {
  if (sanctioned === 0) return { percent: 0, status: 'Not Utilized' as UtilizationStatus };
  const percent = (utilized / sanctioned) * 100;
  let status: UtilizationStatus = 'Not Utilized';
  if (percent >= 90) status = 'Fully Utilized';
  else if (percent > 0) status = 'Partially Utilized';
  return { percent: parseFloat(percent.toFixed(1)), status };
};

// --- Reusable Components ---

// 1. Status Badge Component
type UtilizationStatus = 'Fully Utilized' | 'Partially Utilized' | 'Not Utilized';
const UtilizationStatusBadge: React.FC<{ status: UtilizationStatus }> = ({ status }) => {
  const config = {
    'Fully Utilized': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Fully Utilized' },
    'Partially Utilized': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Partial Utilize' },
    'Not Utilized': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Not Utilized' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// 2. Reusable Form Input & Select (same as previous examples, included for completeness)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = 
  ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}
           className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" />
  </div>
);
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange}
            className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">
      {children}
    </select>
  </div>
);

// 3. Sortable Table Header (same as previous examples)
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Currency Formatter ---
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 4. View Details Modal
type UtilizationModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<UtilizationModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  const { percent, status } = calculateUtilization(item.amtSanctioned, item.amtUtilized);
  const balance = item.amtSanctioned - item.amtUtilized;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-modal-enter">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><Info className="w-6 h-6 text-indigo-600" /> Utilization Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.schemeName} ({item.schemeId})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailItem label="State" value={item.state} />
            <DetailItem label="District" value={item.district} />
            <DetailItem label="Amount Sanctioned" value={formatCurrency(item.amtSanctioned)} className="text-blue-700 font-bold" />
            <DetailItem label="Amount Released" value={formatCurrency(item.amtReleased)} className="text-green-700 font-bold" />
            <DetailItem label="Amount Utilized" value={formatCurrency(item.amtUtilized)} className="text-emerald-700 font-bold" />
            <DetailItem label="Balance Amount" value={formatCurrency(balance)} className="text-orange-700 font-bold" />
            <DetailItem label="Utilization %" value={`${percent}%`} className="font-bold" />
            <DetailItem label="Status" value={<UtilizationStatusBadge status={status} />} />
            <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} />
          </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print Summary</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = 
  ({ label, value, className = '' }) => (
  <div className={className}><p className="text-xs font-semibold text-slate-500 mb-1">{label}</p><p className="font-medium text-slate-800">{value}</p></div>
);

// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const statusCounts = useMemo(() => {
    const counts: Record<UtilizationStatus, number> = { 'Fully Utilized': 0, 'Partially Utilized': 0, 'Not Utilized': 0 };
    data.forEach(item => { const { status } = calculateUtilization(item.amtSanctioned, item.amtUtilized); if (status in counts) counts[status]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const stateUtilization = useMemo(() => {
    const stateMap = new Map<string, { sanctioned: number, utilized: number }>();
    data.forEach(item => { const current = stateMap.get(item.state) || { sanctioned: 0, utilized: 0 }; stateMap.set(item.state, { sanctioned: current.sanctioned + item.amtSanctioned, utilized: current.utilized + item.amtUtilized }); });
    // Sort by utilized amount and take top 10
    return Array.from(stateMap.entries()).map(([name, values]) => ({ name, ...values })).sort((a,b) => b.utilized - a.utilized).slice(0, 10);
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', utilized: 5000000 }, { month: 'Jun', utilized: 6200000 }, { month: 'Jul', utilized: 7800000 },
    { month: 'Aug', utilized: 7500000 }, { month: 'Sep', utilized: 8800000 }, { month: 'Oct', utilized: 9500000 },
  ];

  const PIE_COLORS: Record<UtilizationStatus, string> = { 'Fully Utilized': '#10B981', 'Partially Utilized': '#F59E0B', 'Not Utilized': '#EF4444' };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Utilization Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Status Distribution Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Utilization Status Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as UtilizationStatus]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Schemes`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State-wise Utilization Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Utilization Amount</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={stateUtilization} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" fontSize={10} tickFormatter={(value) => `₹${value/100000}L`} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} />
                <RechartsTooltip formatter={(value) => [formatCurrency(value as number), 'Utilized']} />
                <Bar dataKey="utilized" fill="#82ca9d" name="Utilized Amount" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Utilization Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Utilization Trend</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                 <XAxis dataKey="month" fontSize={10} />
                 <YAxis fontSize={10} tickFormatter={(value) => `₹${value/100000}L`}/>
                 <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                 <Legend />
                 <Line type="monotone" dataKey="utilized" name="Amount Utilized" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const SchemeUtilizationPage = () => {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  // Declare UI state before any early returns to preserve hook order
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ schemeName: '', financialYear: '', state: '', district: '', status: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  // --- Data & UI handlers must be declared before any early returns so hooks run consistently
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFilters = () => { setFilters({ schemeName: '', financialYear: '', state: '', district: '', status: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic (Filtering, Sorting) ---
  const filteredData = useMemo(() => {
    let data = MOCK_UTILIZATION_DATA.map(item => ({
      ...item,
      ...calculateUtilization(item.amtSanctioned, item.amtUtilized),
      balance: item.amtSanctioned - item.amtUtilized,
    }));
    // Search
    if (searchQuery) { data = data.filter(item => item.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) || item.schemeId.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    // if (filters.financialYear) // Need FY data
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    // if (filters.dateFrom) // Need date field
    // if (filters.dateTo)
    // Sorting
    if (sortConfig !== null) {
      data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting Handler ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  // --- Summary Calculation ---
  const summary = useMemo(() => {
    const totalSchemes = new Set(filteredData.map(d => d.schemeName)).size;
    const totalSanctioned = filteredData.reduce((sum, item) => sum + item.amtSanctioned, 0);
    const totalReleased = filteredData.reduce((sum, item) => sum + item.amtReleased, 0);
    const totalUtilized = filteredData.reduce((sum, item) => sum + item.amtUtilized, 0);
    const overallUtil = totalSanctioned === 0 ? 0 : (totalUtilized / totalSanctioned) * 100;
    return {
      totalSchemes,
      totalSanctioned: formatCurrency(totalSanctioned),
      totalReleased: formatCurrency(totalReleased),
      totalUtilized: formatCurrency(totalUtilized),
      overallUtilization: overallUtil.toFixed(1) + '%',
    };
  }, [filteredData]);

  // --- Modal Handlers ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  /* duplicate loader return removed (top-level loader used earlier) */

  // Show the canonical loader during initial mount
  if (loading) return <IntegratedLoader />;
  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Scheme Utilization Summary</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3 rounded-xl px-6 py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
               <div> <h1 className="text-3xl font-bold text-white drop-shadow">Scheme Utilization Summary</h1> <p className="text-indigo-100 mt-1 font-medium">Track and analyze utilization of funds across all NSKFDC schemes.</p> </div>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-4">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
             <FormSelect label="Scheme Name" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All Schemes</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All States</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All Districts</option>{mockDistricts.map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Financial Year" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All Years</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="Utilization Status" name="status" value={filters.status} onChange={handleFilterChange}><option value="">All Statuses</option>{mockUtilizationStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <div className="relative">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="Scheme ID/Name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
             <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"><X className="w-4 h-4" /> Clear Filters</button>
             <button onClick={applyFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"><Search className="w-4 h-4" /> Apply Filters</button>
           </div>
        </div>
        {/* Export/Reload Section - moved below Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
           <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}>
             <BarChart3 className="w-4 h-4" /> View Insights
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV">
             <FileDown className="w-5 h-5 text-green-600" />
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF">
             <FileDown className="w-5 h-5 text-red-600" />
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh">
             <RefreshCcw className="w-5 h-5 text-blue-600" />
           </button>
        </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-full">
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold">
                 <tr>
                   <th className="px-4 py-3 text-left">Sl.</th>
                   <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="schemeId" title="Scheme ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                   <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="amtSanctioned" title="Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="amtReleased" title="Released (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="amtUtilized" title="Utilized (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="balance" title="Balance (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50/70 transition-colors" : "bg-indigo-50/40 hover:bg-indigo-100 transition-colors"}>
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold">{item.schemeName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.schemeId}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700">{item.district}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium text-right">{formatCurrency(item.amtSanctioned)}</td>
                     <td className="px-4 py-3 text-green-700 font-bold text-right">{formatCurrency(item.amtReleased)}</td>
                     <td className="px-4 py-3 text-emerald-700 font-bold text-right">{formatCurrency(item.amtUtilized)}</td>
                     <td className="px-4 py-3 text-orange-700 font-bold text-right">{formatCurrency(item.balance)}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={11} className="text-center py-10 text-slate-500">No records found.</td></tr>)}
               </tbody>
             </table>
           </div>
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
               <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select></div>
               <div className="flex items-center gap-3"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span><div className="flex items-center gap-1"><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button></div></div>
             </div>
           )}
         </div>
        {/* Summary Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-2">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><strong>Schemes:</strong> {summary.totalSchemes}</span><span><strong>Sanctioned:</strong> {summary.totalSanctioned}</span><span className="text-green-700"><strong>Released:</strong> {summary.totalReleased}</span><span className="text-emerald-700"><strong>Utilized:</strong> {summary.totalUtilized}</span></div>
           <span className="font-semibold text-indigo-700">Overall Utilization: {summary.overallUtilization}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 26 Oct 2025, 17:40 IST</p>
           <p className="mt-1">Data Source: NSKFDC Financial Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default SchemeUtilizationPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/