// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  BarChart3,
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
} from 'lucide-react';

// --- Mock Data ---

const MOCK_SCHEME_DATA = [
  {
    id: 'SCH-001',
    name: 'Self Employment Scheme (SES)',
    type: 'Loan',
    component: 'Subsidy + Loan',
    limit: 500000,
    rate: '4%',
    agency: 'State Channelizing Agency',
    sanctionDate: '2023-05-12',
    effectiveDate: '2023-06-01',
    beneficiaries: 'Safai Karamcharis',
    status: 'Active',
    remarks: 'Currently running successfully',
  },
  {
    id: 'SCH-002',
    name: 'Skill Development Program',
    type: 'Skill Development',
    component: 'Grant',
    limit: 1000000,
    rate: 'N/A',
    agency: 'NSKFDC (Direct)',
    sanctionDate: '2023-02-15',
    effectiveDate: '2023-03-01',
    beneficiaries: 'Dependents of SKs',
    status: 'Active',
    remarks: 'Batch 4 ongoing',
  },
  {
    id: 'SCH-003',
    name: 'Awareness Campaign Grant',
    type: 'Awareness',
    component: 'Grant',
    limit: 50000,
    rate: 'N/A',
    agency: 'NGOs',
    sanctionDate: '2023-07-20',
    effectiveDate: '2023-07-20',
    beneficiaries: 'General Public',
    status: 'Under Review',
    remarks: 'Proposal submitted',
  },
  {
    id: 'SCH-004',
    name: 'Sanitary Mart Loan',
    type: 'Loan',
    component: 'Loan',
    limit: 1500000,
    rate: '5%',
    agency: 'State Channelizing Agency',
    sanctionDate: '2022-11-01',
    effectiveDate: '2022-12-01',
    beneficiaries: 'SK Groups (SHGs)',
    status: 'Active',
    remarks: 'High uptake in Maharashtra',
  },
  {
    id: 'SCH-005',
    name: 'Old Rehabilitation Scheme',
    type: 'Rehabilitation',
    component: 'One-time Grant',
    limit: 40000,
    rate: 'N/A',
    agency: 'District Magistrate',
    sanctionDate: '2021-04-10',
    effectiveDate: '2021-04-10',
    beneficiaries: 'Identified Manual Scavengers',
    status: 'Inactive',
    remarks: 'Replaced by S.R.M.S.',
  },
  {
    id: 'SCH-006',
    name: 'Education Loan for Dependents',
    type: 'Loan',
    component: 'Loan',
    limit: 1000000,
    rate: '3.5%',
    agency: 'NSKFDC (Direct)',
    sanctionDate: '2023-08-01',
    effectiveDate: '2023-08-15',
    beneficiaries: 'Children of SKs',
    status: 'Active',
    remarks: 'Good response',
  },
  // Add more mock data for pagination
  {
    id: 'SCH-007',
    name: 'Mechanized Cleaning Grant',
    type: 'Grant',
    component: 'Subsidy',
    limit: 2500000,
    rate: 'N/A',
    agency: 'Municipal Corporations',
    sanctionDate: '2023-09-10',
    effectiveDate: '2023-10-01',
    beneficiaries: 'ULBs/SHGs',
    status: 'Active',
    remarks: 'Pilot phase in 5 cities',
  },
  {
    id: 'SCH-008',
    name: 'E-Rickshaw Purchase Loan',
    type: 'Loan',
    component: 'Loan',
    limit: 150000,
    rate: '4.5%',
    agency: 'State Channelizing Agency',
    sanctionDate: '2023-03-05',
    effectiveDate: '2023-04-01',
    beneficiaries: 'Safai Karamcharis',
    status: 'Active',
    remarks: 'Popular in Delhi/UP',
  },
  {
    id: 'SCH-009',
    name: 'Health Insurance Scheme',
    type: 'Awareness',
    component: 'Grant',
    limit: 0, // N/A
    rate: 'N/A',
    agency: 'NSKFDC (Direct)',
    sanctionDate: '2022-10-10',
    effectiveDate: '2022-11-01',
    beneficiaries: 'All SKs',
    status: 'Inactive',
    remarks: 'Merged with Ayushman Bharat',
  },
  {
    id: 'SCH-010',
    name: 'New Skill Training (AI/ML)',
    type: 'Skill Development',
    component: 'Grant',
    limit: 500000,
    rate: 'N/A',
    agency: 'Training Partners',
    sanctionDate: '2024-01-15',
    effectiveDate: '2024-02-01',
    beneficiaries: 'Educated Dependents',
    status: 'Under Review',
    remarks: 'Awaiting final approval',
  },
];

// --- Reusable Components ---

// 1. Status Badge Component
const StatusBadge: React.FC<{ status: 'Active' | 'Inactive' | 'Under Review' }> = ({ status }) => {
  const config = {
    Active: {
      bg: 'bg-green-100', text: 'text-green-700',
      icon: CheckCircle, label: 'Active',
    },
    Inactive: {
      bg: 'bg-red-100', text: 'text-red-700',
      icon: XCircle, label: 'Inactive',
    },
    'Under Review': {
      bg: 'bg-yellow-100', text: 'text-yellow-700',
      icon: Hourglass, label: 'Under Review',
    },
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
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
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
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white"
    >
      {children}
    </select>
  </div>
);

// --- Main Page Component ---
const SchemeMasterReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    schemeType: '',
    status: '',
    agency: '',
    dateFrom: '',
    dateTo: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ schemeType: '', status: '', agency: '', dateFrom: '', dateTo: '' });
    setSearchQuery('');
  };

  // --- Data Logic (Filtering, Sorting, Pagination) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_SCHEME_DATA];

    // 1. Filter by search query
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Filter by dropdowns
    if (filters.schemeType) {
      data = data.filter(item => item.type === filters.schemeType);
    }
    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    if (filters.agency) {
      data = data.filter(item => item.agency === filters.agency);
    }
    
    // 3. Filter by date range (Effective Date)
    if (filters.dateFrom) {
      data = data.filter(item => new Date(item.effectiveDate) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      data = data.filter(item => new Date(item.effectiveDate) <= new Date(filters.dateTo));
    }
    
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

  // --- Column Header Sorting ---
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  
  // Table Header Renderer
  const SortableHeader: React.FC<{ colKey: string; title: string; className?: string }> = ({ colKey, title, className = '' }) => (
    <th 
      className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`}
      onClick={() => requestSort(colKey)}
    >
      <div className="flex items-center gap-1">
        {title}
        {getSortIcon(colKey)}
      </div>
    </th>
  );

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
            <span className="font-semibold text-indigo-600">Scheme Master Report</span>
          </nav>

          {/* Title Card Responsive and Styled */}
          <div className="w-full">
            <div className="w-full rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #4f6ef7 0%, #7c4fe6 50%, #f15b9c 100%)',
                color: 'white',
                boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.10)',
              }}>
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm text-center sm:text-left">Scheme Master Report</h1>
                <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 text-center sm:text-left">View and analyze all scheme details.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect label="Scheme Type" name="schemeType" value={filters.schemeType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="Loan">Loan</option>
              <option value="Skill Development">Skill Development</option>
              <option value="Awareness">Awareness</option>
              <option value="Rehabilitation">Rehabilitation</option>
            </FormSelect>
            <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Review">Under Review</option>
            </FormSelect>
            <FormSelect label="Implementing Agency" name="agency" value={filters.agency} onChange={handleFilterChange}>
              <option value="">All Agencies</option>
              <option value="State Channelizing Agency">State Channelizing Agency</option>
              <option value="NSKFDC (Direct)">NSKFDC (Direct)</option>
              <option value="NGOs">NGOs</option>
              <option value="District Magistrate">District Magistrate</option>
              <option value="Municipal Corporations">Municipal Corporations</option>
              <option value="Training Partners">Training Partners</option>
            </FormSelect>
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
                onClick={() => setCurrentPage(1)} // Reset to page 1 on apply
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

        {/* --- 3. Scheme Master Data Table --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-pink-100 to-yellow-100 text-indigo-900 font-bold sticky top-0 z-10">
                <tr>
                  <SortableHeader colKey="id" title="Scheme Code" className="min-w-[120px]" />
                  <SortableHeader colKey="name" title="Scheme Name" className="min-w-[250px]" />
                  <SortableHeader colKey="type" title="Scheme Type" className="min-w-[150px]" />
                  <SortableHeader colKey="limit" title="Fin. Limit (₹)" className="min-w-[130px]" />
                  {/* <SortableHeader colKey="rate" title="Interest Rate" className="min-w-[120px]" /> */}
                  <SortableHeader colKey="agency" title="Agency" className="min-w-[200px]" />
                  <SortableHeader colKey="effectiveDate" title="Effective Date" className="min-w-[130px]" />
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
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.type}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap text-right font-medium border-r border-slate-100">
                      {item.limit.toLocaleString('en-IN')}
                    </td>
                    {/* <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{item.rate}</td> */}
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">{item.agency}</td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap border-r border-slate-100">
                      {new Date(item.effectiveDate).toLocaleDateString('en-GB')}
                    </td>
                    {/* Status Badge - now visible and colored */}
                    <td className="px-4 py-3 whitespace-nowrap border-r border-slate-100">
                      <StatusBadge status={item.status as any} />
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-slate-500">
                      No schemes found matching your criteria.
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
                  <option value={20}>20</option>
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
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row justify-between gap-2">
          <div className="flex items-center gap-4">
            <span><strong>Total Schemes:</strong> {MOCK_SCHEME_DATA.length}</span>
            <span className="text-green-600"><strong>Active:</strong> {MOCK_SCHEME_DATA.filter(s => s.status === 'Active').length}</span>
            <span className="text-red-600"><strong>Inactive:</strong> {MOCK_SCHEME_DATA.filter(s => s.status === 'Inactive').length}</span>
            <span className="text-yellow-600"><strong>Under Review:</strong> {MOCK_SCHEME_DATA.filter(s => s.status === 'Under Review').length}</span>
          </div>
          <span><strong>Last Updated:</strong> 26 Oct 2025, 10:30 AM</span>
        </div>

        {/* --- 5. Audit Footer --- */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Data Source: NSKFDC Master Database • Generated On: 26 Oct 2025 • Prepared by: Admin</p>
        </footer>
      </div>
    </div>
  );
};

export default SchemeMasterReportPage;