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
  LayoutDashboard,
  ChevronRight as ChevronRightIcon,
  Search,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Hourglass,
  AlertTriangle,
  ChevronLeft,
  BarChart3,
  Eye,
  Printer,
  WalletCards,
  FileClock,
  Timer
} from 'lucide-react';

// --- Mock Data ---

const MOCK_PENDING_DATA = [
  { id: 1, benName: 'Vijay Patel', benType: 'Individual', scheme: 'Self Employment Scheme', amtSanctioned: 200000, dateSanction: '2025-09-15', status: 'Pending', delayReason: 'Awaiting fund approval from bank', remarks: 'Escalated to State Nodal', state: 'Gujarat', district: 'Ahmedabad', officer: 'S. Sharma', expectedDate: '2025-11-05', lastUpdated: '2025-10-27' },
  { id: 2, benName: 'Ujala SHG', benType: 'SHG', scheme: 'Mechanized Cleaning Grant', amtSanctioned: 2500000, dateSanction: '2025-08-10', status: 'Delayed', delayReason: 'Bank Processing Issue - KYC Update', remarks: 'Contacted bank relationship manager', state: 'Maharashtra', district: 'Mumbai', officer: 'A. Desai', expectedDate: '2025-11-10', lastUpdated: '2025-10-26' },
  { id: 3, benName: 'Ekta SHG', benType: 'SHG', scheme: 'Self Employment Scheme', amtSanctioned: 800000, dateSanction: '2025-10-01', status: 'Under Review', delayReason: 'Verification Ongoing by SCA', remarks: 'Documents submitted, awaiting clearance', state: 'Rajasthan', district: 'Jaipur', officer: 'R. Meena', expectedDate: '2025-11-15', lastUpdated: '2025-10-25' },
  { id: 4, benName: 'Manoj Kumar', benType: 'Individual', scheme: 'Self Employment Scheme', amtSanctioned: 100000, dateSanction: '2025-07-20', status: 'Delayed', delayReason: 'State Agency Fund Constraint', remarks: 'Awaiting fund release from State Govt.', state: 'Bihar', district: 'Patna', officer: 'P. Singh', expectedDate: '2025-11-30', lastUpdated: '2025-10-20' },
  { id: 5, benName: 'Pragati SHG', benType: 'SHG', scheme: 'Mechanized Cleaning Grant', amtSanctioned: 2000000, dateSanction: '2025-10-05', status: 'Pending', delayReason: 'Final Approval Pending at HQ', remarks: 'File moved to final approver', state: 'Punjab', district: 'Ludhiana', officer: 'G. Kaur', expectedDate: '2025-11-12', lastUpdated: '2025-10-27' },
  { id: 6, benName: 'Imran Khan', benType: 'Individual', scheme: 'Skill Development Program (Stipend)', amtSanctioned: 15000, dateSanction: '2025-09-28', status: 'Pending', delayReason: 'Attendance Verification', remarks: 'Coordinator to verify attendance logs', state: 'Uttar Pradesh', district: 'Agra', officer: 'K. Lal', expectedDate: '2025-11-08', lastUpdated: '2025-10-26' },
  { id: 7, benName: 'Nirman SHG', benType: 'SHG', scheme: 'Self Employment Scheme', amtSanctioned: 900000, dateSanction: '2025-08-01', status: 'Delayed', delayReason: 'Fund Availability Issue at SCA', remarks: 'Matter escalated', state: 'Madhya Pradesh', district: 'Indore', officer: 'V. Verma', expectedDate: '2025-11-25', lastUpdated: '2025-10-19' },
  // Add more data
];

const mockSchemes = [...new Set(MOCK_PENDING_DATA.map(d => d.scheme))];
const mockBenTypes = ['Individual', 'SHG'];
const mockStates = [...new Set(MOCK_PENDING_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_PENDING_DATA.map(d => d.district))]; // Simplified
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockStatus = ['Pending', 'Under Review', 'Delayed'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Pending' | 'Under Review' | 'Delayed';
const DisbursementStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Pending' },
    'Under Review': { bg: 'bg-orange-100', text: 'text-orange-700', icon: FileClock, label: 'Under Review' },
    Delayed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle, label: 'Delayed' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// 2. Reusable Form Input & Select (same as previous)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = 
  ({ label, type, name, value, onChange, placeholder }) => (
  <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" /></div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => (
  <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">{children}</select></div> );

// 3. Sortable Table Header (same as previous)
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Currency Formatter ---
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 4. View Details Modal
type DetailsModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<DetailsModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><WalletCards className="w-6 h-6 text-indigo-600" /> Pending Disbursement Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.benName} ({item.benType})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailItem label="Beneficiary Name" value={item.benName} />
            <DetailItem label="Beneficiary Type" value={item.benType} />
            <DetailItem label="Scheme" value={item.scheme} />
            <DetailItem label="Amount Sanctioned" value={formatCurrency(item.amtSanctioned)} className="font-bold text-blue-700" />
            <DetailItem label="Date of Sanction" value={new Date(item.dateSanction).toLocaleDateString('en-GB')} />
            <DetailItem label="Current Status" value={<DisbursementStatusBadge status={item.status as Status} />} />
            <DetailItem label="Reason for Delay" value={item.delayReason || 'N/A'} className={`md:col-span-2 ${item.status === 'Delayed' ? 'text-red-700 font-medium' : ''}`} isBlock />
            <DetailItem label="Remarks" value={item.remarks || 'N/A'} className="md:col-span-2" isBlock />
            <DetailItem label="State" value={item.state} />
            <DetailItem label="District" value={item.district} />
            <DetailItem label="Sanctioning Officer" value={item.officer || 'N/A'} />
            <DetailItem label="Expected Disbursement Date" value={item.expectedDate ? new Date(item.expectedDate).toLocaleDateString('en-GB') : 'N/A'} />
            <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} className="md:col-span-2"/>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print Report</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);

// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const schemePendingShare = useMemo(() => {
    const schemeMap = new Map<string, number>();
    data.forEach(item => { schemeMap.set(item.scheme, (schemeMap.get(item.scheme) || 0) + item.amtSanctioned); }); // Using sanctioned amount for share
    return Array.from(schemeMap.entries()).map(([name, value]) => ({ name, value }));
  }, [data]);

  const statePendingCount = useMemo(() => {
     const stateMap = new Map<string, number>();
     data.forEach(item => { stateMap.set(item.state, (stateMap.get(item.state) || 0) + 1); });
     return Array.from(stateMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0,10); // Top 10 states
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', sanctioned: 10, pending: 2 }, { month: 'Jun', sanctioned: 12, pending: 3 }, { month: 'Jul', sanctioned: 15, pending: 4 },
    { month: 'Aug', sanctioned: 14, pending: 3 }, { month: 'Sep', sanctioned: 18, pending: 5 }, { month: 'Oct', sanctioned: 20, pending: 6 },
  ]; // Assuming values in Crores for display

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Pending Disbursement Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Scheme-wise Pending Share Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Scheme-wise Pending Amount Share</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={schemePendingShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  {schemePendingShare.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} /> ))} </Pie>
                <RechartsTooltip formatter={(value) => formatCurrency(value as number)} /> 
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State-wise Pending Count Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Pending Case Count</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={statePendingCount} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#FFBB28" name="Pending Cases" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Sanction vs. Pending Trend (Crores)</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10} tickFormatter={(value) => `₹${value}Cr`}/>
                 <RechartsTooltip formatter={(value) => `₹${value} Cr`} /> <Legend />
                 <Line type="monotone" dataKey="sanctioned" name="Sanctioned" stroke="#8884d8" strokeWidth={2}/>
                 <Line type="monotone" dataKey="pending" name="Pending" stroke="#FF8042" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const PendingDisbursementReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2025-2026', schemeName: '', benType: '', state: '', district: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'state') setFilters(prev => ({ ...prev, district: '' }));
  };
  const clearFilters = () => { setFilters({ financialYear: '', schemeName: '', benType: '', state: '', district: '', status: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_PENDING_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.benName.toLowerCase().includes(searchQuery.toLowerCase()) /* || item.schemeId.includes(searchQuery) */); }
    // Filters
    // if (filters.financialYear) // Need FY data
    if (filters.schemeName) data = data.filter(item => item.scheme === filters.schemeName);
    if (filters.benType) data = data.filter(item => item.benType === filters.benType);
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    // Sorting
    if (sortConfig !== null) { data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  // --- Summary ---
  const summary = useMemo(() => {
    const totalSanctioned = filteredData.reduce((sum, item) => sum + item.amtSanctioned, 0);
    // Calculate average delay in days (Sanction Date to Today for pending/delayed)
    const todayTime = new Date().getTime();
    const totalDelayDays = filteredData.reduce((sum, item) => {
        const sanctionTime = new Date(item.dateSanction).getTime();
        return sum + Math.max(0, (todayTime - sanctionTime) / (1000 * 60 * 60 * 24));
    }, 0);
    const avgDelay = filteredData.length > 0 ? (totalDelayDays / filteredData.length).toFixed(0) : 0;

    return { totalPending: filteredData.length, totalSanctioned: formatCurrency(totalSanctioned), avgDelay: `${avgDelay} Days` };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Pending Disbursement Report</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3">
               <span className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full text-white shadow-lg"><WalletCards className="w-8 h-8" /></span>
               <div> <h1 className="text-3xl font-bold text-slate-800">Pending Disbursement Report</h1> <p className="text-slate-500 mt-1">Monitor pending fund releases and analyze delay reasons.</p> </div>
             </div>
             <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}> <BarChart3 className="w-4 h-4" /> View Insights </button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-6">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800"><Filter className="w-5 h-5 text-indigo-600" /> Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
             <FormSelect label="Financial Year" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All Years</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="Scheme Name" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All Schemes</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="Beneficiary Type" name="benType" value={filters.benType} onChange={handleFilterChange}><option value="">All Types</option>{mockBenTypes.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All States</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All Districts</option>{mockDistricts.filter(d=> filters.state ? MOCK_PENDING_DATA.find(data => data.state === filters.state && data.district === d) : true).map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}><option value="">All Statuses</option>{mockStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <div className="relative">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="Beneficiary/Scheme ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
             <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"><X className="w-4 h-4" /> Clear Filters</button>
             <button onClick={applyFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"><Search className="w-4 h-4" /> Apply Filters</button>
           </div>
         </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-indigo-100 text-indigo-800 font-semibold sticky top-0 z-10">
                 <tr>
                   <th className="px-4 py-3 text-left">Sl.</th>
                   <SortableHeader colKey="benName" title="Beneficiary Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="scheme" title="Scheme" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[200px]" />
                   <SortableHeader colKey="amtSanctioned" title="Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px] text-right" />
                   <SortableHeader colKey="dateSanction" title="Sanction Date" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                   <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px]" />
                   <th className="px-4 py-3 text-left min-w-[250px]">Reason for Delay</th>
                   <th className="px-4 py-3 text-left min-w-[250px]">Remarks</th>
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200">
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className="hover:bg-indigo-50/70 transition-colors">
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold">{item.benName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.scheme}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium text-right">{formatCurrency(item.amtSanctioned)}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.dateSanction).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3"><DisbursementStatusBadge status={item.status as Status} /></td>
                     <td className={`px-4 py-3 text-xs whitespace-normal max-w-xs ${item.status === 'Delayed' ? 'text-red-600 font-medium' : 'text-slate-500'}`}>{item.delayReason}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={10} className="text-center py-10 text-slate-500">No pending disbursements found.</td></tr>)}
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
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-3">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><Timer className="w-4 h-4 inline mr-1 text-red-500"/><strong>Total Pending Cases:</strong> {summary.totalPending}</span><span className="font-semibold text-blue-700"><strong>Total Sanctioned Amt:</strong> {summary.totalSanctioned}</span><span className="font-semibold text-orange-600"><strong>Average Delay:</strong> {summary.avgDelay}</span></div>
           <span><strong>Last Updated:</strong> 27 Oct 2025, 06:35 PM</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated Reporting System • Generated On: 27 Oct 2025, 18:35 IST</p>
           <p className="mt-1">Data Source: NSKFDC Financial Records & Disbursement Logs</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default PendingDisbursementReportPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/