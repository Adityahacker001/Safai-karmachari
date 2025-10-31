'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Filter,
  RefreshCw,
  FileText,
  ArrowUp,
  ArrowDown,
  File as FileIcon,
  AlertTriangle,
  FileSearch,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Printer,
  BarChart4,
  LineChart,
  PieChart,
  Trophy,
  GanttChartSquare,
  Target
} from 'lucide-react';
import { LucideProps } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer as RechartsResponsiveContainer,
} from "recharts";

// --- MOCK DATA & OPTIONS ---

const mockAnnualMetrics = {
  totalIncidents: 1240,
  totalFirs: 980,
  casesResolved: 850,
  casesPending: 130,
  compensationSanctioned: 5_20_00_000,
  compensationDisbursed: 4_80_00_000,
};

const mockAnnualDistrictData = [
  { id: 'D-01', district: 'Mumbai City', incidents: 150, firs: 120, closed: 110, pending: 10, compensation: 1200000, compliance: 95.2 },
  { id: 'D-02', district: 'Pune City', incidents: 80, firs: 65, closed: 60, pending: 5, compensation: 750000, compliance: 92.0 },
  { id: 'D-03', district: 'Nagpur City', incidents: 50, firs: 40, closed: 30, pending: 10, compensation: 400000, compliance: 88.5 },
  { id: 'D-04', district: 'Thane (Rural)', incidents: 20, firs: 15, closed: 10, pending: 5, compensation: 150000, compliance: 75.0 },
  { id: 'D-05', district: 'Nashik (Rural)', incidents: 75, firs: 60, closed: 50, pending: 10, compensation: 550000, compliance: 85.0 },
  { id: 'D-06', district: 'Kolhapur', incidents: 45, firs: 40, closed: 38, pending: 2, compensation: 300000, compliance: 90.0 },
  { id: 'D-07', district: 'Aurangabad City', incidents: 30, firs: 22, closed: 18, pending: 4, compensation: 200000, compliance: 82.1 },
  { id: 'D-08', district: 'Solapur', incidents: 60, firs: 50, closed: 40, pending: 10, compensation: 450000, compliance: 80.0 },
  { id: 'D-09', district: 'Amravati City', incidents: 25, firs: 20, closed: 18, pending: 2, compensation: 180000, compliance: 91.3 },
  { id: 'D-10', district: 'Ratnagiri', incidents: 10, firs: 5, closed: 2, pending: 3, compensation: 50000, compliance: 68.0 },
];

const mockAnnualInsights = {
  performanceRanking: { best: 'Mumbai City', worst: 'Ratnagiri' },
  slaCompliance: 91.2,
  avgClosureTime: 45, // days
  highRiskDistricts: 3,
};

const yearOptions = ["2024", "2023", "2022"];
const districtOptions = ["All", "Mumbai City", "Pune City", "Nagpur City", "Thane (Rural)", "Nashik (Rural)", "Kolhapur", "Aurangabad City", "Solapur", "Amravati City", "Ratnagiri"];
const incidentTypeOptions = ["All", "Death", "Injury", "Sewer", "Septic Tank"];
const statusOptions = ["All", "Resolved", "Pending", "Escalated"];

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 */
const GlassCard: React.FC<{ children: React.ReactNode; className?: string; noHover?: boolean }> = ({ children, className = "", noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { y: -5, transition: { duration: 0.2 } }}
    className={`backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-200/50 ${className}`}
  >
    {children}
  </motion.div>
);

/**
 * 2. AnimatedNumber Component
 */
const AnimatedNumber: React.FC<{ value: number; isCurrency?: boolean; isPercentage?: boolean; isDays?: boolean }> = ({ value, isCurrency = false, isPercentage = false, isDays = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const formatValue = (val: number) => {
    const roundedVal = Math.round(val);
    if (isCurrency) {
      return `₹${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(roundedVal)}`;
    }
    if (isPercentage) {
      return `${val.toFixed(1)}%`;
    }
    if (isDays) {
      return `${roundedVal} days`;
    }
    return roundedVal.toLocaleString('en-IN');
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "circOut",
      onUpdate(latest) {
        if (isPercentage) {
          node.textContent = `${latest.toFixed(1)}%`;
        } else {
        }
      }
    });

    return () => controls.stop();
  }, [value, isCurrency, isPercentage, isDays]);

  return (
    <span ref={ref}>
      {formatValue(0)}
    </span>
  );
};


/**
 * 3. MetricCard Component
 */
const MetricCard: React.FC<{ title: string; value: number; icon: React.FC<LucideProps>; gradient: string; isCurrency?: boolean }> = ({ title, value, icon: Icon, gradient, isCurrency = false }) => (
  <GlassCard className={`relative text-white overflow-hidden bg-gradient-to-br ${gradient}`}>
    <div className="p-5 relative z-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-90">{title}</span>
        <div className="p-2 bg-white/20 rounded-full">
          <Icon size={18} />
        </div>
      </div>
      <h2 className="text-4xl font-bold mt-2">
        <AnimatedNumber value={value} isCurrency={isCurrency} />
      </h2>
    </div>
  </GlassCard>
);

/**
 * 4. InsightCard Component
 */
const InsightCard: React.FC<{ title: string; value: string | number; icon: React.FC<LucideProps>; isPercentage?: boolean; isDays?: boolean }> = ({ title, value, icon: Icon, isPercentage, isDays }) => (
  <GlassCard className="bg-white/80 p-5">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
        <Icon size={22} />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <h3 className="text-2xl font-bold text-navy-800">
          <AnimatedNumber value={typeof value === 'number' ? value : 0} isPercentage={isPercentage} isDays={isDays} />
        </h3>
      </div>
    </div>
  </GlassCard>
);

/**
 * 5. AppButton Component
 */
const AppButton: React.FC<{ children: React.ReactNode; onClick?: () => void; variant?: string; icon?: React.ComponentType<LucideProps>; className?: string; disabled?: boolean }> = ({ children, onClick = () => {}, variant = 'primary', icon: Icon, className = "", disabled = false }) => {
  const variants: Record<string, string> = {
    primary: "bg-navy-700 text-white hover:bg-navy-800 shadow-lg shadow-blue-500/20",
    secondary: "bg-gray-200 text-navy-800 hover:bg-gray-300",
    exportPdf: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20",
    exportExcel: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20",
    print: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
};

/**
 * 6. ChartPlaceholder Component
 */
const ChartPlaceholder: React.FC<{ title: string; type: 'bar' | 'line' | 'pie' }> = ({ title, type }) => {
  const Icon = type === 'bar' ? BarChart4 : type === 'line' ? LineChart : PieChart;
  return (
    <GlassCard className="bg-white/80 p-5 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className="text-gray-500" />
          <h3 className="font-semibold text-navy-800">{title}</h3>
        </div>
        <div className="flex-grow flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 min-h-[250px]">
          <div className="text-center text-gray-400">
            <Icon size={48} className="mb-2" />
            <p className="text-sm font-medium">Chart Data Placeholder</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

/**
 * 7. ComplianceCell Component
 */
const ComplianceCell: React.FC<{ score: number }> = ({ score }) => {
  const classConfig = score > 90 ? "text-emerald-600" : score > 75 ? "text-amber-600" : "text-red-600";
  return <span className={`text-base font-bold ${classConfig}`}>{score.toFixed(1)}%</span>;
};

/**
 * 8. SelectInput Component
 */
const SelectInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="text-xs font-medium text-gray-500">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

/**
 * 9. ThSortable Component
 */
const ThSortable: React.FC<{ sortKey: keyof typeof mockAnnualDistrictData[0]; title: string; handleSort: (key: keyof typeof mockAnnualDistrictData[0]) => void; sortIcon: React.ReactNode }> = ({ sortKey, title, handleSort, sortIcon }) => (
  <th
    className="px-5 py-4 font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-200/30"
    onClick={() => handleSort(sortKey)}
  >
    <div className="flex items-center gap-2">
      {title}
      {sortIcon}
    </div>
  </th>
);


// --- MAIN PAGE COMPONENT ---
export default function DGPAnnualReport() {

  // Filter & Search State
  const [filters, setFilters] = useState({
    year: '2024',
    district: 'All',
    incidentType: 'All',
    status: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Table State
  const [sortConfig, setSortConfig] = useState({ key: 'compliance', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Event Handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      year: '2024',
      district: 'All',
      incidentType: 'All',
      status: 'All'
    });
    setSearchTerm('');
  };

  const handleSort = (key: keyof typeof mockAnnualDistrictData[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Data Processing
  const filteredData = useMemo(() => {
    // In a real app, filters (esp. year) would fetch new data. Here we just filter the mock data.
    return mockAnnualDistrictData.filter(d => {
      const matchesSearch = d.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistrict = filters.district === 'All' || d.district === filters.district;
      // Other filters (incidentType, status) would apply here if data structure supported it
      return matchesSearch && matchesDistrict;
    });
  }, [searchTerm, filters]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const key = sortConfig.key as keyof typeof mockAnnualDistrictData[0];
        if (a[key] < b[key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const getSortIcon = (key: keyof typeof mockAnnualDistrictData[0]) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
 
  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-gradient-to-br from-white via-blue-50 to-gray-100" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-6 lg:p-10 font-sans text-navy-900"
      >
        <main className="max-w-8xl mx-auto">
          {/* --- Header --- */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-navy-700 text-gold-400 shadow-lg shadow-navy-500/30 border-2 border-white/50">
                  <GanttChartSquare size={36} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-navy-900">DGP Annual Report</h1>
                  <p className="text-base text-gray-600">State-wide enforcement & compliance summary</p>
                </div>
              </div>
              <nav className="text-sm font-medium text-gray-500" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
                  <li><ChevronRight size={16} /></li>
                  <li><a href="#" className="hover:text-blue-600">Reports</a></li>
                  <li><ChevronRight size={16} /></li>
                  <li className="font-semibold text-gray-700">Annual Report</li>
                </ol>
              </nav>
            </div>
          </header>

          {/* --- Filter Bar --- */}
          <GlassCard className="mb-8 bg-gradient-to-r from-blue-50/50 via-white/80 to-blue-50/50" noHover>
            <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
                <SelectInput label="Year" name="year" value={filters.year} onChange={handleFilterChange} options={yearOptions} />
                <SelectInput label="District" name="district" value={filters.district} onChange={handleFilterChange} options={districtOptions} />
                <SelectInput label="Incident Type" name="incidentType" value={filters.incidentType} onChange={handleFilterChange} options={incidentTypeOptions} />
                <SelectInput label="Status" name="status" value={filters.status} onChange={handleFilterChange} options={statusOptions} />
              </div>
              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200/80 md:pl-5">
                <AppButton variant="primary" icon={Filter}>Apply</AppButton>
                <AppButton variant="secondary" icon={RefreshCw} className="px-3" onClick={handleResetFilters}>
                  <span className="sr-only">Reset</span>
                </AppButton>
              </div>
            </div>
          </GlassCard>

          {/* --- Top Metric Cards --- */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <MetricCard title="Incidents Reported" value={mockAnnualMetrics.totalIncidents} icon={AlertTriangle} gradient="from-amber-500 to-orange-700" />
            <MetricCard title="FIRs Registered" value={mockAnnualMetrics.totalFirs} icon={FileSearch} gradient="from-red-500 to-rose-700" />
            <MetricCard title="Cases Resolved" value={mockAnnualMetrics.casesResolved} icon={CheckCircle} gradient="from-emerald-500 to-green-700" />
            <MetricCard title="Cases Pending" value={mockAnnualMetrics.casesPending} icon={Clock} gradient="from-gray-500 to-gray-700" />
            <MetricCard title="Compensation Sanctioned" value={mockAnnualMetrics.compensationSanctioned} icon={DollarSign} gradient="from-blue-600 to-navy-800" isCurrency />
            <MetricCard title="Compensation Disbursed" value={mockAnnualMetrics.compensationDisbursed} icon={TrendingUp} gradient="from-sky-500 to-blue-700" isCurrency />
          </section>

          {/* --- Charts & Insights --- */}
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassCard className="shadow-lg border border-gray-100 rounded-lg bg-white lg:col-span-2">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70 p-4">
                  <span className="text-base font-semibold text-gray-700">Incident Trend (Last 12 Months)</span>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { month: 'Jan', incidents: 120 },
                        { month: 'Feb', incidents: 100 },
                        { month: 'Mar', incidents: 140 },
                        { month: 'Apr', incidents: 130 },
                        { month: 'May', incidents: 150 },
                        { month: 'Jun', incidents: 170 },
                        { month: 'Jul', incidents: 160 },
                        { month: 'Aug', incidents: 180 },
                        { month: 'Sep', incidents: 190 },
                        { month: 'Oct', incidents: 210 },
                        { month: 'Nov', incidents: 220 },
                        { month: 'Dec', incidents: 240 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        stroke="#4a5568"
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        stroke="#4a5568"
                      />
                      <Tooltip
                        cursor={{ fill: "#edf2f7" }}
                        contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", color: "#4a5568" }}
                        iconType="circle"
                      />
                      <Bar
                        dataKey="incidents"
                        fill="#38a169"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
            <div className="grid grid-rows-1 gap-6">
              <GlassCard className="shadow-lg border border-gray-100 rounded-lg bg-white">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70 p-4">
                  <span className="text-base font-semibold text-gray-700">Case Type Analysis</span>
                </div>
                <div className="p-4">
                  <RechartsResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
                      />
                      <RechartsLegend
                        wrapperStyle={{ fontSize: "12px", color: "#4a5568" }}
                        iconType="circle"
                      />
                      <Pie
                        data={[
                          { name: "Death", value: 40 },
                          { name: "Injury", value: 30 },
                          { name: "Sewer", value: 20 },
                          { name: "Septic Tank", value: 10 },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                        fill="#8884d8"
                      >
                        { [
                          "#8884d8",
                          "#82ca9d",
                          "#ffc658",
                          "#ff7f50"
                        ].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        )) }
                      </Pie>
                    </RechartsPieChart>
                  </RechartsResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </section>

        

          {/* --- Additional Insights --- */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InsightCard title="Best Performing District" value={mockAnnualInsights.performanceRanking.best} icon={Trophy} />
            <InsightCard title="Worst Performing District" value={mockAnnualInsights.performanceRanking.worst} icon={ShieldAlert} />
            <InsightCard title="SLA Compliance" value={mockAnnualInsights.slaCompliance} icon={Target} isPercentage />
            <InsightCard title="Avg. Case Closure Time" value={mockAnnualInsights.avgClosureTime} icon={Clock} isDays />
          </section>


          {/* --- District-wise Table --- */}
          <GlassCard noHover className="bg-white/90">
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80">
              <h3 className="text-xl font-bold text-navy-900">District-wise Annual Summary</h3>
              <div className="flex items-center gap-3">
                <AppButton variant="exportPdf" icon={FileText}>Export PDF</AppButton>
                <AppButton variant="exportExcel" icon={FileIcon}>Export Excel</AppButton>
                <AppButton variant="print" icon={Printer}>Print Report</AppButton>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px] text-sm text-left">
                <thead className="bg-blue-100/70 sticky top-0 backdrop-blur-sm">
                  <tr>
                    <ThSortable sortKey="district" title="District" handleSort={handleSort} sortIcon={getSortIcon('district')} />
                    <ThSortable sortKey="incidents" title="Total Incidents" handleSort={handleSort} sortIcon={getSortIcon('incidents')} />
                    <ThSortable sortKey="firs" title="FIR Registered" handleSort={handleSort} sortIcon={getSortIcon('firs')} />
                    <ThSortable sortKey="closed" title="Cases Closed" handleSort={handleSort} sortIcon={getSortIcon('closed')} />
                    <ThSortable sortKey="pending" title="Pending Cases" handleSort={handleSort} sortIcon={getSortIcon('pending')} />
                    <ThSortable sortKey="compensation" title="Compensation Paid" handleSort={handleSort} sortIcon={getSortIcon('compensation')} />
                    <ThSortable sortKey="compliance" title="Compliance %" handleSort={handleSort} sortIcon={getSortIcon('compliance')} />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {paginatedData.map((d) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(239, 246, 255, 0.8)' }} // bg-blue-50/80
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer"
                    >
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-navy-800">{d.district}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center">{d.incidents}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center">{d.firs}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center text-emerald-700">{d.closed}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center text-amber-700">{d.pending}</td>
                      <td className="px-5 py-4 whitespace-nowrap font-medium text-right">
                        {`₹${new Intl.NumberFormat('en-IN').format(d.compensation)}`}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-bold text-center">
                        <ComplianceCell score={d.compliance} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* --- Pagination --- */}
            <div className="p-4 border-t border-gray-200/80 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedData.length}</span> of <span className="font-semibold">{sortedData.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </GlassCard>

          {/* --- Footer --- */}
          <footer className="text-center text-gray-500 text-sm mt-12 pb-6">
            “Annual auditing ensures transparency and drives district-level performance.”
            <p className="mt-1">&copy; {new Date().getFullYear()} DGP Office, State Command Center. All rights reserved.</p>
          </footer>
        </main>

      </motion.div>
    </>
  );
}

