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
  LayoutDashboard, ChevronRight as ChevronRightIcon, MapPin, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, XCircle, ChevronLeft, Users, Building, List, DollarSign, BarChart3,
  Info, TrendingUp, Package, SlidersHorizontal, ListFilter, Eye, Printer, Link as LinkIcon, Building2, UserCheck, Clock,
  FileText, CheckCheck, FileWarning, BadgeCheck, BadgeHelp, BadgeAlert, Star, Target as TargetIcon, Percent, BookOpen,
  Wallet, Calculator, Award, Activity, Medal, Trophy, Zap, AlertOctagon
} from 'lucide-react';

// --- Mock Data ---

// Helper to calculate rating based on utilization and achievement
const calculateRating = (utilPercent: number, achievePercent: number): PerformanceRating => {
  const score = (utilPercent + achievePercent) / 2;
  if (score >= 95) return 'Excellent';
  if (score >= 85) return 'Good';
  if (score >= 70) return 'Average';
  if (score >= 50) return 'Poor';
  return 'Very Poor';
};

const MOCK_DISTRICT_PERFORMANCE_DATA = [
  { id: 1, state: 'Maharashtra', district: 'Nagpur', schemeName: 'Self Employment Scheme', fy: '2024-25', fundSanctioned: 1200000, fundUtilized: 1050000, targetBen: 150, achievedBen: 138, lastUpdated: '2025-10-25', remarks: 'District meeting expected utilization goals.' },
  { id: 2, state: 'Uttar Pradesh', district: 'Lucknow', schemeName: 'Skill Development Program', fy: '2024-25', fundSanctioned: 800000, fundUtilized: 780000, targetBen: 200, achievedBen: 195, lastUpdated: '2025-10-24', remarks: 'High achievement rate.' },
  { id: 3, state: 'Karnataka', district: 'Bengaluru', schemeName: 'Sanitary Mart Loan', fy: '2024-25', fundSanctioned: 2000000, fundUtilized: 1500000, targetBen: 50, achievedBen: 40, lastUpdated: '2025-10-26', remarks: 'Lower beneficiary achievement, needs review.' },
  { id: 4, state: 'West Bengal', district: 'Kolkata', schemeName: 'Rehabilitation Grant', fy: '2023-24', fundSanctioned: 500000, fundUtilized: 490000, targetBen: 100, achievedBen: 98, lastUpdated: '2025-09-30', remarks: 'Excellent performance.' },
  { id: 5, state: 'Tamil Nadu', district: 'Chennai', schemeName: 'Education Loan', fy: '2024-25', fundSanctioned: 1500000, fundUtilized: 600000, targetBen: 80, achievedBen: 35, lastUpdated: '2025-10-22', remarks: 'Very poor utilization and achievement.' },
  { id: 6, state: 'Rajasthan', district: 'Jaipur', schemeName: 'Self Employment Scheme', fy: '2024-25', fundSanctioned: 900000, fundUtilized: 650000, targetBen: 120, achievedBen: 90, lastUpdated: '2025-10-15', remarks: 'Average performance.' },
  { id: 7, state: 'Gujarat', district: 'Ahmedabad', schemeName: 'Mechanized Cleaning Grant', fy: '2024-25', fundSanctioned: 3000000, fundUtilized: 2800000, targetBen: 30, achievedBen: 29, lastUpdated: '2025-10-18', remarks: 'Good utilization.' },
  { id: 8, state: 'Maharashtra', district: 'Pune', schemeName: 'Skill Development Program', fy: '2024-25', fundSanctioned: 700000, fundUtilized: 680000, targetBen: 250, achievedBen: 240, lastUpdated: '2025-10-23', remarks: 'Excellent achievement.' },
  { id: 9, state: 'Uttar Pradesh', district: 'Kanpur', schemeName: 'E-Rickshaw Loan', fy: '2023-24', fundSanctioned: 600000, fundUtilized: 550000, targetBen: 40, achievedBen: 38, lastUpdated: '2025-08-15', remarks: 'Good performance in previous FY.' },
  { id: 10, state: 'Haryana', district: 'Gurugram', schemeName: 'Self Employment Scheme', fy: '2024-25', fundSanctioned: 1100000, fundUtilized: 500000, targetBen: 140, achievedBen: 60, lastUpdated: '2025-10-20', remarks: 'Poor utilization, requires investigation.' },
  // Add more data
].map(item => {
  const utilPercent = item.fundSanctioned > 0 ? (item.fundUtilized / item.fundSanctioned) * 100 : 0;
  const achievePercent = item.targetBen > 0 ? (item.achievedBen / item.targetBen) * 100 : 0;
  return {
    ...item,
    utilizationPercent: parseFloat(utilPercent.toFixed(1)),
    achievementPercent: parseFloat(achievePercent.toFixed(1)),
    rating: calculateRating(utilPercent, achievePercent),
  };
});

const mockStates = [...new Set(MOCK_DISTRICT_PERFORMANCE_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_DISTRICT_PERFORMANCE_DATA.map(d => d.district))]; // Simplified
const mockSchemes = [...new Set(MOCK_DISTRICT_PERFORMANCE_DATA.map(d => d.schemeName))];
const mockFinancialYears = ['2024-25', '2023-24'];
const mockPerformanceTypes = ['Overall Rating', 'Fund Utilization', 'Beneficiary Target'];

// --- Reusable Components ---

// 1. Performance Rating Badge
type PerformanceRating = 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
const PerformanceRatingBadge: React.FC<{ rating: PerformanceRating }> = ({ rating }) => {
  const config = {
    Excellent: { bg: 'bg-green-100', text: 'text-green-700', icon: Trophy, label: '⭐⭐⭐⭐⭐ Excellent' },
    Good: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Medal, label: '⭐⭐⭐⭐ Good' },
    Average: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Star, label: '⭐⭐⭐ Average' },
    Poor: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Zap, label: '⭐⭐ Poor' },
    'Very Poor': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertOctagon, label: '⭐ Very Poor' },
  }[rating];

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
type SortableHeaderProps = {
  colKey: keyof typeof MOCK_DISTRICT_PERFORMANCE_DATA[0];
  title: string;
  sortConfig: { key: keyof typeof MOCK_DISTRICT_PERFORMANCE_DATA[0]; direction: 'asc' | 'desc' } | null;
  requestSort: (key: keyof typeof MOCK_DISTRICT_PERFORMANCE_DATA[0]) => void;
  className?: string;
};
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-modal-enter">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><MapPin className="w-6 h-6 text-indigo-600" /> District Performance Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.district}, {item.state} - {item.schemeName} ({item.fy})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <DetailItem label="State" value={item.state} />
            <DetailItem label="District" value={item.district} />
            <DetailItem label="Scheme Name" value={item.schemeName} />
            <DetailItem label="Financial Year" value={item.fy} />
            <DetailItem label="Fund Sanctioned" value={formatCurrency(item.fundSanctioned)} className="text-blue-700 font-bold" />
            <DetailItem label="Fund Utilized" value={formatCurrency(item.fundUtilized)} className="text-emerald-700 font-bold" />
            <DetailItem label="Utilization %" value={`${item.utilizationPercent}%`} className="font-bold" />
            <DetailItem label="Target Beneficiaries" value={item.targetBen} />
            <DetailItem label="Achieved Beneficiaries" value={item.achievedBen} />
            <DetailItem label="Achievement %" value={`${item.achievementPercent}%`} className="font-bold" />
            <DetailItem label="Performance Rating" value={<PerformanceRatingBadge rating={item.rating} />} className="md:col-span-1" />
            <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} />
          </div>
           <DetailItem label="Remarks" value={item.remarks || 'No remarks provided.'} className="md:col-span-3" isBlock />
        </div>
        {/* Footer Actions */}
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
  const districtUtilization = useMemo(() => data.sort((a,b) => b.utilizationPercent - a.utilizationPercent).slice(0, 10), [data]); // Top 10 by Util %
  const ratingCounts = useMemo(() => {
    const counts: Record<PerformanceRating, number> = { Excellent: 0, Good: 0, Average: 0, Poor: 0, 'Very Poor': 0 };
    data.forEach((item: { rating: PerformanceRating }) => { counts[item.rating]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);
  // Mock monthly trend data for top districts
  const monthlyTrend = [
    { month: 'May', Nagpur: 80, Lucknow: 85, Bengaluru: 75 }, { month: 'Jun', Nagpur: 82, Lucknow: 88, Bengaluru: 78 },
    { month: 'Jul', Nagpur: 85, Lucknow: 90, Bengaluru: 80 }, { month: 'Aug', Nagpur: 88, Lucknow: 92, Bengaluru: 82 },
    { month: 'Sep', Nagpur: 90, Lucknow: 94, Bengaluru: 85 }, { month: 'Oct', Nagpur: 87.5, Lucknow: 97.5, Bengaluru: 75 },
  ];

  const PIE_COLORS: Record<PerformanceRating, string> = { Excellent: '#10B981', Good: '#3B82F6', Average: '#F59E0B', Poor: '#F97316', 'Very Poor': '#EF4444' };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Performance Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* District Utilization Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 Districts by Fund Utilization %</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={districtUtilization} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" domain={[0, 100]} fontSize={10} tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="district" type="category" fontSize={10} width={80} interval={0} />
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Bar dataKey="utilizationPercent" fill="#8884d8" name="Utilization %" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Rating Distribution Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">District Distribution by Rating</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={ratingCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {ratingCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as PerformanceRating]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Districts`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Utilization Trend */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Utilization Trend (Top 3 Districts)</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis domain={[0, 100]} fontSize={10} tickFormatter={(value) => `${value}%`} />
                 <RechartsTooltip formatter={(value) => [`${value}%`, 'Utilization']} /> <Legend />
                 <Line type="monotone" dataKey="Nagpur" stroke="#8884d8" strokeWidth={2}/>
                 <Line type="monotone" dataKey="Lucknow" stroke="#82ca9d" strokeWidth={2}/>
                 <Line type="monotone" dataKey="Bengaluru" stroke="#ffc658" strokeWidth={2}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const DistrictPerformanceReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ state: '', district: '', schemeName: '', financialYear: '', performanceType: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof MOCK_DISTRICT_PERFORMANCE_DATA[0];
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Basic dependency: Reset district if state changes
    if (e.target.name === 'state') setFilters(prev => ({ ...prev, district: '' }));
  };
  const clearFilters = () => { setFilters({ state: '', district: '', schemeName: '', financialYear: '', performanceType: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_DISTRICT_PERFORMANCE_DATA];
    if (searchQuery) {
      data = data.filter(item =>
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    if (filters.financialYear) data = data.filter(item => item.fy === filters.financialYear);
    if (sortConfig !== null) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: keyof typeof MOCK_DISTRICT_PERFORMANCE_DATA[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // --- Summary Calculation ---
  const summary = useMemo(() => {
    const totalDistricts = new Set(filteredData.map(d => `${d.state}-${d.district}`)).size;
    const avgUtil = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.utilizationPercent, 0) / filteredData.length : 0;
    const avgAchieve = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.achievementPercent, 0) / filteredData.length : 0;
    const overallRating = calculateRating(avgUtil, avgAchieve); // Overall based on average
    return {
      totalStates: new Set(filteredData.map(d => d.state)).size,
      totalDistricts,
      avgUtil: avgUtil.toFixed(1) + '%',
      avgAchieve: avgAchieve.toFixed(1) + '%',
      overallRating,
    };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
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
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">District-Wise Performance</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3 rounded-xl px-6 py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
               <div>
                 <h1 className="text-3xl font-bold text-white drop-shadow">District-Wise Performance Report</h1>
                 <p className="text-indigo-100 mt-1 font-medium">Analyze district-level scheme performance, utilization, and achievement.</p>
               </div>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {/* Filter Inputs */}
            <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}>
              <option value="">All States</option>
              {mockStates.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}>
              <option value="">All Districts</option>
              {mockDistricts.filter(d => filters.state ? MOCK_DISTRICT_PERFORMANCE_DATA.find(data => data.state === filters.state && data.district === d) : true).map(d => <option key={d} value={d}>{d}</option>)}
            </FormSelect>
            <FormSelect label="Scheme Name" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}>
              <option value="">All Schemes</option>
              {mockSchemes.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            <FormSelect label="Financial Year" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}>
              <option value="">All Years</option>
              {mockFinancialYears.map(y => <option key={y} value={y}>{y}</option>)}
            </FormSelect>
            <FormSelect label="Performance Type" name="performanceType" value={filters.performanceType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {mockPerformanceTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </FormSelect>
            <div className="grid grid-cols-2 gap-2">
              <FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
              <FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
            </div>
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="District/Scheme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"
            >
              <X className="w-4 h-4" /> Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <Search className="w-4 h-4" /> Apply Filters
            </button>
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
                  <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[200px]" />
                  <SortableHeader colKey="fy" title="FY" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                  <SortableHeader colKey="fundSanctioned" title="Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                  <SortableHeader colKey="fundUtilized" title="Utilized (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                  <th className="px-4 py-3 text-left min-w-[100px]">Target Ben.</th>
                  <th className="px-4 py-3 text-left min-w-[100px]">Achieved Ben.</th>
                  <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50/70 transition-colors" : "bg-indigo-50/40 hover:bg-indigo-100 transition-colors"}>
                    <td className="px-4 py-3 text-slate-500">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="px-4 py-3 text-slate-700">{item.state}</td>
                    <td className="px-4 py-3 text-slate-700 font-semibold">{item.district}</td>
                    <td className="px-4 py-3 text-indigo-700">{item.schemeName}</td>
                    <td className="px-4 py-3 text-slate-700">{item.fy}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium text-right">{formatCurrency(item.fundSanctioned)}</td>
                    <td className="px-4 py-3 text-emerald-700 font-bold text-right">{formatCurrency(item.fundUtilized)}</td>
                    <td className="px-4 py-3 text-slate-700 text-center">{item.targetBen}</td>
                    <td className="px-4 py-3 text-green-700 font-bold text-center">{item.achievedBen}</td>
                    <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openModal(item)}
                        className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100 shadow-sm"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={11} className="text-center py-10 text-slate-500">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
               <div className="flex items-center gap-2">
                 <label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label>
                 <select
                   id="rowsPerPage"
                   value={rowsPerPage}
                   onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                   className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"
                 >
                   <option value={10}>10</option>
                   <option value={20}>20</option>
                   <option value={50}>50</option>
                 </select>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span>
                 <div className="flex items-center gap-1">
                   <button
                     onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                     disabled={currentPage === 1}
                     className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"
                   >
                     <ChevronLeft className="w-4 h-4" />
                   </button>
                   <button
                     onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                     disabled={currentPage === totalPages}
                     className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"
                   >
                     <ChevronRightIcon className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
        {/* Summary Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-2">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><strong>States:</strong> {summary.totalStates}</span><span><strong>Districts:</strong> {summary.totalDistricts}</span><span className="text-emerald-700"><strong>Avg. Utilization:</strong> {summary.avgUtil}</span><span className="text-green-700"><strong>Avg. Achievement:</strong> {summary.avgAchieve}</span></div>
           <div className="flex items-center gap-2"><strong>Overall Performance:</strong> <PerformanceRatingBadge rating={summary.overallRating} /></div>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 26 Oct 2025, 18:00 IST</p>
           <p className="mt-1">Data Source: NSKFDC Performance Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default DistrictPerformanceReportPage;