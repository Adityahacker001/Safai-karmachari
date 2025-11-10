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
  LayoutDashboard, ChevronRight as ChevronRightLucide, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, XCircle, ChevronLeft, ChevronRight as ChevronRightIcon,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Printer, Link as LinkIcon, Building2, UserCheck, Clock, FileText, CheckCheck, FileWarning, BadgeCheck, BadgeHelp, BadgeAlert,
  Star, Target as TargetIcon, Percent, BookOpen, Wallet, Calculator, InfoIcon, Award, Activity, Medal, Trophy, Zap, AlertOctagon, MapPin, TrendingDown, Map as MapIcon,
} from 'lucide-react';
import { ChevronRight } from '@/lib/lucide-icons-wrapper';

// --- Mock Data ---

// Helper to calculate rating & status based on utilization and achievement
type PerformanceRating = 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
type PerformanceStatus = 'High' | 'Moderate' | 'Low'; // Simplified status based on rating
const calculatePerformance = (utilPercent: number, achievePercent: number): { rating: PerformanceRating, status: PerformanceStatus } => {
  const score = (utilPercent + achievePercent) / 2;
  if (score >= 90) return { rating: 'Excellent', status: 'High' }; // Adjusted Excellent threshold
  if (score >= 75) return { rating: 'Good', status: 'High' }; // Adjusted Good threshold
  if (score >= 60) return { rating: 'Average', status: 'Moderate' }; // Adjusted Average threshold
  if (score >= 40) return { rating: 'Poor', status: 'Low' };
  return { rating: 'Very Poor', status: 'Low' };
};

const MOCK_LOW_UTILIZATION_DATA = [
  { id: 1, state: 'Rajasthan', district: 'Ajmer', schemeName: 'Self Employment Scheme', fy: '2024-25', fundSanctioned: 2000000, fundUtilized: 850000, targetBen: 180, achievedBen: 72, reason: 'Delayed loan processing & data entry', remarks: 'Monitoring required by State Officer.', lastUpdated: '2025-10-27' },
  { id: 2, state: 'Bihar', district: 'Patna', schemeName: 'Education Loan', fy: '2024-25', fundSanctioned: 1500000, fundUtilized: 600000, targetBen: 100, achievedBen: 35, reason: 'Low awareness about the scheme in district', remarks: 'Awareness camp planned.', lastUpdated: '2025-10-26' },
  { id: 3, state: 'Uttar Pradesh', district: 'Agra', schemeName: 'Sanitary Mart Loan', fy: '2023-24', fundSanctioned: 1800000, fundUtilized: 950000, targetBen: 40, achievedBen: 15, reason: 'SHG eligibility documentation issues', remarks: 'Workshop conducted for SHGs.', lastUpdated: '2025-09-30' },
  { id: 4, state: 'Assam', district: 'Guwahati', schemeName: 'Skill Development Program', fy: '2024-25', fundSanctioned: 700000, fundUtilized: 250000, targetBen: 300, achievedBen: 90, reason: 'Training partner mobilization challenges', remarks: 'New partner onboarding initiated.', lastUpdated: '2025-10-25' },
  { id: 5, state: 'Madhya Pradesh', district: 'Bhopal', schemeName: 'Self Employment Scheme', fy: '2024-25', fundSanctioned: 1600000, fundUtilized: 700000, targetBen: 160, achievedBen: 65, reason: 'Delayed approvals at District Level', remarks: 'Process review underway.', lastUpdated: '2025-10-24' },
  // Add more data with varying utilization/achievement
  { id: 6, state: 'Odisha', district: 'Bhubaneswar', schemeName: 'Mechanized Cleaning Grant', fy: '2024-25', fundSanctioned: 2200000, fundUtilized: 1000000, targetBen: 25, achievedBen: 10, reason: 'Procurement delays by ULB', remarks: 'Follow-up with Municipal Corp.', lastUpdated: '2025-10-20' },
  { id: 7, state: 'Chhattisgarh', district: 'Raipur', schemeName: 'E-Rickshaw Loan', fy: '2023-24', fundSanctioned: 500000, fundUtilized: 150000, targetBen: 30, achievedBen: 8, reason: 'Low demand in the area', remarks: 'Market survey suggested.', lastUpdated: '2025-07-15' },
].map(item => {
  const utilPercent = item.fundSanctioned > 0 ? (item.fundUtilized / item.fundSanctioned) * 100 : 0;
  const achievePercent = item.targetBen > 0 ? (item.achievedBen / item.targetBen) * 100 : 0;
  const { rating, status } = calculatePerformance(utilPercent, achievePercent);
  return {
    ...item,
    utilizationPercent: parseFloat(utilPercent.toFixed(1)),
    achievementPercent: parseFloat(achievePercent.toFixed(1)),
    rating,
    performanceStatus: status, // Add status field
  };
});

const mockStates = [...new Set(MOCK_LOW_UTILIZATION_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_LOW_UTILIZATION_DATA.map(d => d.district))]; // Simplified
const mockSchemes: string[] = [];
const mockFinancialYears = ['2024-25', '2023-24'];
const mockUtilizationRanges = ['Below 40%', '40% – 60%', '60% – 80%', 'Above 80%'];
const mockPerformanceStatus = ['Low', 'Moderate', 'High'];

// --- Reusable Components ---

// 1. Performance Rating Badge
const PerformanceRatingBadge: React.FC<{ rating: PerformanceRating }> = ({ rating }) => {
  const config = { Excellent: { bg: 'bg-green-100', text: 'text-green-700', icon: Trophy, label: '⭐⭐⭐⭐⭐ Excellent' }, Good: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Medal, label: '⭐⭐⭐⭐ Good' }, Average: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Star, label: '⭐⭐⭐ Average' }, Poor: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Zap, label: '⭐⭐ Poor' }, 'Very Poor': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertOctagon, label: '⭐ Very Poor' } }[rating];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {config.label} </span> );
};

// 1b. Performance Status Badge
const PerformanceStatusBadge: React.FC<{ status: PerformanceStatus }> = ({ status }) => {
  const config = { High: { bg: 'bg-green-100', text: 'text-green-700', icon: TrendingUp, label: 'High' }, Moderate: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Activity, label: 'Moderate' }, Low: { bg: 'bg-red-100', text: 'text-red-700', icon: TrendingDown, label: 'Low' } }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {config.label} </span> );
};


// 2. Reusable Form Input & Select (same as previous)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = 
  ({ label, type, name, value, onChange, placeholder }) => ( <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" /></div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => ( <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">{children}</select></div> );

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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><MapPin className="w-6 h-6 text-red-600" /> Low Utilization District Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.district}, {item.state} - {item.schemeName} ({item.fy})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <DetailItem label="State" value={item.state} />
            <DetailItem label="District" value={item.district} />
            <DetailItem label="Scheme Name" value={item.schemeName} />
            <DetailItem label="Financial Year" value={item.fy} />
            <DetailItem label="Fund Sanctioned" value={formatCurrency(item.fundSanctioned)} className="font-bold text-blue-700" />
            <DetailItem label="Fund Utilized" value={formatCurrency(item.fundUtilized)} className="font-bold text-emerald-700" />
            <DetailItem label="Utilization %" value={`${item.utilizationPercent}%`} className={`font-bold ${item.utilizationPercent < 60 ? 'text-red-600' : 'text-green-600'}`} />
            <DetailItem label="Target Beneficiaries" value={item.targetBen} />
            <DetailItem label="Achieved Beneficiaries" value={item.achievedBen} />
            <DetailItem label="Achievement %" value={`${item.achievementPercent}%`} className={`font-bold ${item.achievementPercent < 60 ? 'text-red-600' : 'text-green-600'}`} />
            <DetailItem label="Performance Rating" value={<PerformanceRatingBadge rating={item.rating} />} className="md:col-span-2" />
          </div>
          <DetailItem label="Reason for Low Utilization" value={item.reason || 'N/A'} className="md:col-span-3 font-medium" isBlock />
          <DetailItem label="Remarks" value={item.remarks || 'N/A'} className="md:col-span-3" isBlock />
          <DetailItem label="Action Suggested" value={item.actionSuggested || 'Review performance and identify bottlenecks.'} className="md:col-span-3 font-medium text-indigo-700" isBlock />
          <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} className="md:col-span-3" />
        </div>
        {/* Footer Actions */}
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]">
            <Printer className="w-4 h-4" /> Print Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]">
            <FileDown className="w-4 h-4" /> Download PDF
          </button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md">
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
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);


// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const utilizationRangeCounts = useMemo(() => {
    const counts = { 'Below 40%': 0, '40% – 60%': 0, '60% – 80%': 0, 'Above 80%': 0 };
    data.forEach(item => {
      const p = item.utilizationPercent;
      if (p < 40) counts['Below 40%']++;
      else if (p < 60) counts['40% – 60%']++;
      else if (p < 80) counts['60% – 80%']++;
      else counts['Above 80%']++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const stateLowUtilCount = useMemo(() => {
     const stateMap = new Map<string, number>();
     // Count only 'Low' performance status districts per state
     data.filter(d => d.performanceStatus === 'Low').forEach(item => { 
       stateMap.set(item.state, (stateMap.get(item.state) || 0) + 1); 
     });
     return Array.from(stateMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value - a.value).slice(0, 10); // Top 10 states with low performers
  }, [data]);
  
  // Mock monthly trend data for low utilization districts count
  const monthlyTrend = [
    { month: 'May', count: 15 }, { month: 'Jun', count: 18 }, { month: 'Jul', count: 16 },
    { month: 'Aug', count: 20 }, { month: 'Sep', count: 22 }, { month: 'Oct', count: 19 },
  ]; 

  const PIE_COLORS = ['#EF4444', '#F97316', '#F59E0B', '#10B981']; // Red, Orange, Yellow, Green

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Low Utilization Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Utilization Range Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Distribution by Utilization Range</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={utilizationRangeCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {utilizationRangeCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Districts`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State-wise Low Util Count Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Low Utilization Districts</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={stateLowUtilCount} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#EF4444" name="Low Util Districts" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Trend of Low Utilization Districts</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10}/>
                 <RechartsTooltip /> <Legend />
                 <Line type="monotone" dataKey="count" name="Low Util Districts" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 6 }}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const LowUtilizationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2024-25', state: '', district: '', schemeName: '', utilRange: '', perfStatus: '', dateFrom: '', dateTo: '' });
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
  const clearFilters = () => { setFilters({ financialYear: '', state: '', district: '', schemeName: '', utilRange: '', perfStatus: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_LOW_UTILIZATION_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.district.toLowerCase().includes(searchQuery.toLowerCase()) || item.schemeName.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    if (filters.financialYear) data = data.filter(item => item.fy === filters.financialYear);
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    if (filters.perfStatus) data = data.filter(item => item.performanceStatus === filters.perfStatus);
    if (filters.utilRange) {
        const ranges = { 'Below 40%': [0, 39.99], '40% – 60%': [40, 59.99], '60% – 80%': [60, 79.99], 'Above 80%': [80, 101] };
        const [min, max] = ranges[filters.utilRange as keyof typeof ranges];
        data = data.filter(item => item.utilizationPercent >= min && item.utilizationPercent <= max);
    }
    // if (filters.dateFrom) // Filter by lastUpdated?
    // if (filters.dateTo)
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
    const totalDistricts = filteredData.length; // Or potentially all districts if unfiltered
    const lowUtilDistricts = filteredData.filter(d => d.performanceStatus === 'Low').length;
    const avgUtil = totalDistricts > 0 ? (filteredData.reduce((sum, item) => sum + item.utilizationPercent, 0) / totalDistricts) : 0;
    // Find top/lowest performing states based on average utilization in the filtered data
    const stateUtilMap = new Map<string, { totalUtil: number, count: number }>();
    filteredData.forEach(item => { const current = stateUtilMap.get(item.state) || { totalUtil: 0, count: 0 }; stateUtilMap.set(item.state, { totalUtil: current.totalUtil + item.utilizationPercent, count: current.count + 1 }); });
    const stateAvgs = Array.from(stateUtilMap.entries()).map(([name, values]) => ({ name, avg: values.totalUtil / values.count })).sort((a,b) => b.avg - a.avg);
    const topState = stateAvgs[0] ? `${stateAvgs[0].name} (${stateAvgs[0].avg.toFixed(1)}%)` : 'N/A';
    const lowestState = stateAvgs.length > 0 ? `${stateAvgs[stateAvgs.length - 1].name} (${stateAvgs[stateAvgs.length - 1].avg.toFixed(1)}%)` : 'N/A';

    return { totalStates: new Set(filteredData.map(d => d.state)).size, totalDistricts: filteredData.length, lowUtilDistricts, avgUtil: avgUtil.toFixed(1) + '%', topState, lowestState };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRight className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRight className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Low Utilization Districts</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3">
               <span className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full text-white shadow-lg"><TrendingDown className="w-8 h-8" /></span>
               <div> <h1 className="text-3xl font-bold text-slate-800">Low Utilization Districts</h1> <p className="text-slate-500 mt-1">Analyze districts with below-average fund utilization.</p> </div>
             </div>
             <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md" onClick={() => setIsInsightsOpen(true)}> <BarChart3 className="w-4 h-4" /> View Insights </button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-6">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800"><Filter className="w-5 h-5 text-indigo-600" /> Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4"> {/* More cols */}
             <FormSelect label="FY" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All</option>{mockDistricts.filter((d) => filters.state ? MOCK_LOW_UTILIZATION_DATA.find(data => data.state === filters.state && data.district === d) : true).map((s: string) => (
  <option key={s} value={s}>{s}</option>
))}</FormSelect>
             <FormSelect label="Scheme" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="Utilization Range" name="utilRange" value={filters.utilRange} onChange={handleFilterChange}><option value="">All</option>{mockUtilizationRanges.map(r=><option key={r} value={r}>{r}</option>)}</FormSelect>
             <FormSelect label="Performance Status" name="perfStatus" value={filters.perfStatus} onChange={handleFilterChange}><option value="">All</option>{mockPerformanceStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             {/* <div className="grid grid-cols-2 gap-2"><FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} /><FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} /></div> */}
             <div className="relative col-span-2">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="District/Scheme ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
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
                   <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="schemeName" title="Scheme" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="fy" title="FY" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                   <SortableHeader colKey="fundSanctioned" title="Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="fundUtilized" title="Utilized (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   {/* <SortableHeader colKey="utilizationPercent" title="Util %" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px] text-right" /> */}
                   <th className="px-4 py-3 text-center min-w-[100px]">Target Ben.</th>
                   <th className="px-4 py-3 text-center min-w-[100px]">Achieved Ben.</th>
                   {/* <SortableHeader colKey="achievementPercent" title="Achieve %" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[110px] text-right" /> */}
                   {/* <SortableHeader colKey="rating" title="Rating" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" /> */}
                   <th className="px-4 py-3 text-left min-w-[200px]">Reason</th>
                   <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200">
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className="hover:bg-indigo-50/70 transition-colors">
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700 font-semibold">{item.district}</td>
                     <td className="px-4 py-3 text-indigo-700">{item.schemeName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.fy}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium text-right">{formatCurrency(item.fundSanctioned)}</td>
                     <td className="px-4 py-3 text-emerald-700 font-bold text-right">{formatCurrency(item.fundUtilized)}</td>
                     {/* <td className={`px-4 py-3 font-bold text-right ${item.utilizationPercent < 60 ? 'text-red-600' : 'text-green-600'}`}>{item.utilizationPercent}%</td> */}
                     <td className="px-4 py-3 text-slate-700 text-center">{item.targetBen}</td>
                     <td className="px-4 py-3 text-green-700 font-bold text-center">{item.achievedBen}</td>
                     {/* <td className={`px-4 py-3 font-bold text-right ${item.achievementPercent < 60 ? 'text-red-600' : 'text-green-600'}`}>{item.achievementPercent}%</td> */}
                     {/* <td className="px-4 py-3"><PerformanceRatingBadge rating={item.rating} /></td> */}
                     <td className="px-4 py-3 text-slate-600 text-xs truncate max-w-[150px]">{item.reason}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-[150px]">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={13} className="text-center py-10 text-slate-500">No low utilization records found.</td></tr>)}
               </tbody>
             </table>
           </div>
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
               <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option></select></div>
               <div className="flex items-center gap-3"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span><div className="flex items-center gap-1"><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button></div></div>
             </div>
           )}
         </div>
        {/* Summary Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-3">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><MapPin className="w-4 h-4 inline mr-1"/><strong>States Covered:</strong> {summary.totalStates}</span><span><strong>Districts Analyzed:</strong> {summary.totalDistricts}</span><span className="text-red-600"><TrendingDown className="w-4 h-4 inline mr-1"/><strong>Low Util Districts:</strong> {summary.lowUtilDistricts}</span></div>
           <span className="font-semibold text-orange-600">Average Utilization (Low Group): {summary.avgUtil}</span>
           {/* <span className="font-semibold text-green-600">Top State: {summary.topState}</span> */}
           <span className="font-semibold text-red-700">Lowest State: {summary.lowestState}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 27 Oct 2025, 19:25 IST</p>
           <p className="mt-1">Data Source: NSKFDC Performance & Financial Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default LowUtilizationPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/