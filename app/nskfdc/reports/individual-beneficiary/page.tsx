// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  UserSearch,
  Search,
  FileSpreadsheet,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Hourglass,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  UserCheck,
} from 'lucide-react';

// --- Mock Data ---

const MOCK_BENEFICIARY_DATA = [
  { id: 'BEN-2025-0147', name: 'Ramesh Kumar', gender: 'Male', caste: 'SC', state: 'Uttar Pradesh', district: 'Kanpur', mobile: '9876543210', email: 'ramesh.k@example.com', schemeName: 'Self Employment Scheme', schemeType: 'Loan', regDate: '2025-03-15', amtSanctioned: 150000, amtDisbursed: 120000, agency: 'State Channelizing Agency', status: 'Active', remarks: 'Loan in 2nd installment phase' },
  { id: 'BEN-2025-0148', name: 'Sunita Devi', gender: 'Female', caste: 'OBC', state: 'Maharashtra', district: 'Pune', mobile: '9123456789', email: 'sunita.d@example.com', schemeName: 'Skill Development Program', schemeType: 'Skill Development', regDate: '2025-02-10', amtSanctioned: 0, amtDisbursed: 0, agency: 'NSKFDC (Direct)', status: 'Completed', remarks: 'Training batch 4 completed' },
  { id: 'BEN-2025-0149', name: 'Amit Singh', gender: 'Male', caste: 'General', state: 'Rajasthan', district: 'Jaipur', mobile: '9988776655', email: 'amit.s@example.com', schemeName: 'Rehabilitation Grant', schemeType: 'Rehabilitation', regDate: '2025-01-20', amtSanctioned: 40000, amtDisbursed: 40000, agency: 'District Magistrate', status: 'Completed', remarks: 'One-time grant disbursed' },
  { id: 'BEN-2025-0150', name: 'Priya Sharma', gender: 'Female', caste: 'SC', state: 'Uttar Pradesh', district: 'Lucknow', mobile: '9876501234', email: 'priya.s@example.com', schemeName: 'Education Loan', schemeType: 'Loan', regDate: '2025-04-01', amtSanctioned: 500000, amtDisbursed: 100000, agency: 'NSKFDC (Direct)', status: 'Active', remarks: '1st year fees disbursed' },
  { id: 'BEN-2025-0151', name: 'Vijay Patel', gender: 'Male', caste: 'OBC', state: 'Gujarat', district: 'Ahmedabad', mobile: '9765432109', email: 'vijay.p@example.com', schemeName: 'Self Employment Scheme', schemeType: 'Loan', regDate: '2025-03-22', amtSanctioned: 200000, amtDisbursed: 0, agency: 'State Channelizing Agency', status: 'Pending', remarks: 'Awaiting agency approval' },
  { id: 'BEN-2025-0152', name: 'Anjali Gupta', gender: 'Female', caste: 'General', state: 'Delhi', district: 'New Delhi', mobile: '9654321098', email: 'anjali.g@example.com', schemeName: 'Skill Development Program', schemeType: 'Skill Development', regDate: '2025-02-15', amtSanctioned: 0, amtDisbursed: 0, agency: 'NSKFDC (Direct)', status: 'Active', remarks: 'Currently in training' },
  { id: 'BEN-2025-0153', name: 'Manoj Kumar', gender: 'Male', caste: 'SC', state: 'Bihar', district: 'Patna', mobile: '9543210987', email: 'manoj.k@example.com', schemeName: 'Self Employment Scheme', schemeType: 'Loan', regDate: '2025-01-30', amtSanctioned: 100000, amtDisbursed: 0, agency: 'State Channelizing Agency', status: 'Rejected', remarks: 'Incomplete documentation' },
  { id: 'BEN-2025-0154', name: 'Lakshmi Iyer', gender: 'Female', caste: 'General', state: 'Tamil Nadu', district: 'Chennai', mobile: '9432109876', email: 'lakshmi.i@example.com', schemeName: 'Education Loan', schemeType: 'Loan', regDate: '2025-04-05', amtSanctioned: 800000, amtDisbursed: 200000, agency: 'NSKFDC (Direct)', status: 'Active', remarks: 'Course started' },
  { id: 'BEN-2025-0155', name: 'Sandeep Singh', gender: 'Male', caste: 'OBC', state: 'Punjab', district: 'Ludhiana', mobile: '9321098765', email: 'sandeep.s@example.com', schemeName: 'Sanitary Mart Loan', schemeType: 'Loan', regDate: '2025-03-10', amtSanctioned: 1500000, amtDisbursed: 750000, agency: 'State Channelizing Agency', status: 'Active', remarks: 'Store setup ongoing' },
  { id: 'BEN-2025-0156', name: 'Deepa Biswas', gender: 'Female', caste: 'SC', state: 'West Bengal', district: 'Kolkata', mobile: '9210987654', email: 'deepa.b@example.com', schemeName: 'Rehabilitation Grant', schemeType: 'Rehabilitation', regDate: '2025-01-25', amtSanctioned: 40000, amtDisbursed: 40000, agency: 'District Magistrate', status: 'Completed', remarks: 'Grant utilized for shop' },
  { id: 'BEN-2025-0157', name: 'Imran Khan', gender: 'Male', caste: 'General', state: 'Uttar Pradesh', district: 'Agra', mobile: '9109876543', email: 'imran.k@example.com', schemeName: 'Skill Development Program', schemeType: 'Skill Development', regDate: '2025-02-20', amtSanctioned: 0, amtDisbursed: 0, agency: 'NSKFDC (Direct)', status: 'Pending', remarks: 'Awaiting batch start' },
  { id: 'BEN-2025-0158', name: 'Kavita Joshi', gender: 'Female', caste: 'General', state: 'Uttarakhand', district: 'Dehradun', mobile: '9098765432', email: 'kavita.j@example.com', schemeName: 'Self Employment Scheme', schemeType: 'Loan', regDate: '2025-03-18', amtSanctioned: 120000, amtDisbursed: 120000, agency: 'State Channelizing Agency', status: 'Completed', remarks: 'Loan fully repaid' },
];

const mockStates = ['Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'Gujarat', 'Delhi', 'Bihar', 'Tamil Nadu', 'Punjab', 'West Bengal', 'Uttarakhand'];

// Districts mapped by state
const districtsByState: { [key: string]: string[] } = {
  'Uttar Pradesh': ['Kanpur', 'Lucknow', 'Agra'],
  'Maharashtra': ['Pune'],
  'Rajasthan': ['Jaipur'],
  'Gujarat': ['Ahmedabad'],
  'Delhi': ['New Delhi'],
  'Bihar': ['Patna'],
  'Tamil Nadu': ['Chennai'],
  'Punjab': ['Ludhiana'],
  'West Bengal': ['Kolkata'],
  'Uttarakhand': ['Dehradun']
};

// Scheme types mapped by district
const schemeTypesByDistrict: { [key: string]: string[] } = {
  'Kanpur': ['Loan', 'Skill Development'],
  'Lucknow': ['Loan'],
  'Agra': ['Skill Development'],
  'Pune': ['Skill Development'],
  'Jaipur': ['Rehabilitation'],
  'Ahmedabad': ['Loan'],
  'New Delhi': ['Skill Development'],
  'Patna': ['Loan'],
  'Chennai': ['Loan'],
  'Ludhiana': ['Loan'],
  'Kolkata': ['Rehabilitation'],
  'Dehradun': ['Loan']
};



// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Active' | 'Completed' | 'Pending' | 'Rejected';
const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Active: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Active' },
    Completed: { bg: 'bg-purple-100', text: 'text-purple-700', icon: UserCheck, label: 'Completed' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Pending' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Rejected' },
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
      className="block w-full p-2 rounded-lg border-2 border-slate-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200"
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
  colKey: string;
  title: string;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  requestSort: (key: string) => void;
  className?: string;
};
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => {
    if (!sortConfig || sortConfig.key !== colKey) {
      return <ChevronDown className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <th 
      className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`}
      onClick={() => requestSort(colKey)}
    >
      <div className="flex items-center gap-1">
        {title}
        {getSortIcon()}
      </div>
    </th>
  );
};


// --- Main Page Component ---
const BeneficiaryReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    beneficiaryId: '',
    state: '',
    district: '',
    schemeType: '',
    dateFrom: '',
    dateTo: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters(prev => {
      let newFilters = { ...prev, [name]: value };
      
      // Reset dependent dropdowns when parent changes
      if (name === 'state') {
        newFilters.district = '';
        newFilters.schemeType = '';
      } else if (name === 'district') {
        newFilters.schemeType = '';
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ beneficiaryId: '', state: '', district: '', schemeType: '', dateFrom: '', dateTo: '' });
    setSearchQuery('');
    setCurrentPage(1);
    setSortConfig(null);
  };
  
  const applyFilters = () => {
    setCurrentPage(1);
    // Data filtering is already happening in useMemo, this just resets pagination.
  };

  // --- Data Logic (Filtering, Sorting, Pagination) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_BENEFICIARY_DATA];

    // 1. Filter by search query
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery)
      );
    }

    // 2. Filter by dropdowns and beneficiary ID
    if (filters.beneficiaryId) data = data.filter(item => item.id.toLowerCase().includes(filters.beneficiaryId.toLowerCase()));
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.schemeType) data = data.filter(item => item.schemeType === filters.schemeType);
    
    // 3. Filter by date range (Registration Date)
    if (filters.dateFrom) data = data.filter(item => new Date(item.regDate) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.regDate) <= new Date(filters.dateTo));
    
    // 4. Sorting
    if (sortConfig !== null) {
      data.sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
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
  
  // --- Footer Summary Calculation ---
  const summary = useMemo(() => ({
    total: filteredData.length,
    active: filteredData.filter(d => d.status === 'Active').length,
    completed: filteredData.filter(d => d.status === 'Completed').length,
    pending: filteredData.filter(d => d.status === 'Pending').length,
    rejected: filteredData.filter(d => d.status === 'Rejected').length,
  }), [filteredData]);


  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-8 font-sans">
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
            <span className="font-semibold text-indigo-600">Individual Beneficiary Report</span>
          </nav>

          {/* Title Card Responsive and Styled */}
          <div className="w-full">
            <div className="w-full rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #4f6ef7 0%, #7c4fe6 50%, #f15b9c 100%)',
                color: 'white',
                boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.10)',
              }}>
              <span className="p-4 bg-white/20 rounded-full mb-2 sm:mb-0">
                <UserSearch className="w-10 h-10 text-white" />
              </span>
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm text-center sm:text-left">Individual Beneficiary Report</h1>
                <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 text-center sm:text-left">View and analyze detailed beneficiary-level data.</p>
              </div>
            </div>
          </div>
        </header>

  {/* --- 2. Filters Panel --- */}
  <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Filter className="w-5 h-5 text-indigo-600" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <FormInput label="Beneficiary ID" type="text" name="beneficiaryId" value={filters.beneficiaryId} onChange={handleFilterChange} />
            
            {/* State Dropdown */}
            <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}>
              <option value="">Select State</option>
              {mockStates.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            
            {/* District Dropdown - Only show if state is selected */}
            {filters.state && (
              <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}>
                <option value="">Select District</option>
                {districtsByState[filters.state]?.map(d => <option key={d} value={d}>{d}</option>)}
              </FormSelect>
            )}
            
            {/* Scheme Type Dropdown - Only show if district is selected */}
            {filters.district && (
              <FormSelect label="Scheme Type" name="schemeType" value={filters.schemeType} onChange={handleFilterChange}>
                <option value="">Select Scheme Type</option>
                {schemeTypesByDistrict[filters.district]?.map(t => <option key={t} value={t}>{t}</option>)}
              </FormSelect>
            )}
            

            
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-2">
              <FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
              <FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
            </div>
          </div>
          {/* Filter Buttons and Export/Reload Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 border-t border-slate-200 pt-5">
            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02]"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
              <button
                onClick={applyFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                <Search className="w-4 h-4" />
                Apply Filters
              </button>
            </div>
            {/* Export/Reload Section under Filters */}
            <div className="flex items-center gap-2 justify-end">
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-green-600 hover:bg-green-50 transition-colors shadow" title="Export as Excel">
                <FileSpreadsheet className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-red-600 hover:bg-red-50 transition-colors shadow" title="Export as PDF">
                <FileDown className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors shadow" title="Refresh Data">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. Beneficiary Data Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-pink-100 to-yellow-100 text-indigo-900 font-bold sticky top-0 z-10">
                <tr>
                  <SortableHeader colKey="id" title="Beneficiary ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="name" title="Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                  <SortableHeader colKey="gender" title="Gender" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                  <SortableHeader colKey="caste" title="Caste" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                  <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <th className="px-4 py-3 text-left min-w-[130px]">Mobile</th>
                  <th className="px-4 py-3 text-left min-w-[200px]">Email</th>
                  <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[200px]" />
                  <SortableHeader colKey="schemeType" title="Scheme Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="regDate" title="Reg. Date" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <SortableHeader colKey="amtSanctioned" title="Amt Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[160px]" />
                  <SortableHeader colKey="amtDisbursed" title="Amt Disbursed (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[160px]" />
                  <th className="px-4 py-3 text-left min-w-[200px]">Agency</th>
                  <th className="px-4 py-3 text-left min-w-[140px]">Status</th>
                  <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={
                      `transition-colors ${idx % 2 === 0 ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-pink-50/60`
                    }
                  >
                    <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap border-r border-slate-100">{item.id}</td>
                    <td className="px-4 py-3 text-indigo-700 font-semibold whitespace-nowrap cursor-pointer hover:underline border-r border-slate-100">{item.name}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.gender}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.caste}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.state}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.district}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.mobile}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.email}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.schemeName}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.schemeType}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">
                      {new Date(item.regDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap text-right font-medium border-r border-slate-100">
                      {item.amtSanctioned.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-green-700 whitespace-nowrap text-right font-bold border-r border-slate-100">
                      {item.amtDisbursed.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.agency}</td>
                    {/* Status Badge - now visible and colored */}
                    <td className="px-4 py-3 whitespace-nowrap border-r border-slate-100">
                      <StatusBadge status={item.status as Status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={16} className="text-center py-10 text-slate-500">
                      No beneficiaries found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* --- Pagination Controls --- */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-slate-200 bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50">
              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows per page:</label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              {/* Page indicator and Navigation */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600">
                  Page {currentPage} of {totalPages} (Total: {filteredData.length} records)
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-100"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- 4. Footer Summary Card --- */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm 
                        flex flex-col md:flex-row flex-wrap justify-between gap-2">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
            <span><strong>Total Beneficiaries:</strong> {summary.total}</span>
            <span className="text-green-600"><strong>Active:</strong> {summary.active}</span>
            <span className="text-purple-600"><strong>Completed:</strong> {summary.completed}</span>
            <span className="text-yellow-600"><strong>Pending:</strong> {summary.pending}</span>
            <span className="text-red-600"><strong>Rejected:</strong> {summary.rejected}</span>
          </div>
          <span><strong>Last Updated:</strong> 26 Oct 2025, 11:30 AM</span>
        </div>

        {/* --- 5. Audit Footer --- */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Data Source: NSKFDC Central Database • Generated On: 26 Oct 2025 • Prepared By: Admin</p>
        </footer>
      </div>
    </div>
  );
};

export default BeneficiaryReportPage;