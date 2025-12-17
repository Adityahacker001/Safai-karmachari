// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// recharts, aur lucide-react install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React from 'react';
import StatCard from '@/components/ui/stat-card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

import {
  Target,
  FileText,
  CheckSquare,
  DollarSign,
  Banknote,
  AlertCircle,
  MessageSquareWarning,
  CheckCircle,
  Clock,
  PlusCircle,
  Send,
  ShieldAlert,
  Contact,
  PieChart as PieChartIcon,
  BarChart2,
  LineChart as LineChartIcon,
  Map,
  Filter,
  Building,
  Layers,
  FileWarning,
  BookOpen,
  TrendingUp,
  BookCopy,
  ArrowUpRight,
} from 'lucide-react';

// --- 1. Reusable Quick Action Button Component ---

type ActionButtonProps = {
  title: string;
  icon: React.ElementType;
  gradient: string; // Tailwind gradient classes
  glow: string; // Tailwind shadow/glow class
};

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon: Icon, gradient, glow }) => (
  <button 
    className={`flex items-center justify-center space-x-2.5 w-full md:w-auto flex-1 px-5 py-3 rounded-lg text-white font-semibold ${gradient} shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl ${glow}`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
);

// --- 2. Reusable Chart Card Component ---

type ChartCardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  filters: React.ReactNode;
  className?: string;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, icon: Icon, children, filters, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-slate-100 ${className}`}>
    {/* Card Header */}
    <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 bg-slate-50/50">
      <h3 className="flex items-center text-lg font-semibold text-slate-700">
        <Icon className="w-5 h-5 mr-2.5 text-indigo-500" />
        {title}
      </h3>
      <div className="flex items-center space-x-2 mt-3 md:mt-0">
        {filters}
        <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-200 rounded-md transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
    {/* Card Body */}
    <div className="p-4 h-80">
      {children}
    </div>
  </div>
);

// --- 3. Reusable Filter Dropdown ---
const FilterSelect: React.FC<{ options: string[] }> = ({ options }) => (
  <select className="text-xs text-slate-600 bg-white border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
    {options.map(opt => <option key={opt}>{opt}</option>)}
  </select>
);

// --- Mock Data ---

const pieData01 = [
  { name: 'Loan-based', value: 400 },
  { name: 'Grant-based', value: 300 },
  { name: 'Skill Development', value: 300 },
  { name: 'Rehabilitation', value: 200 },
];
const PIE_COLORS_01 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const barData = [
  { name: 'Scheme A', Total: 40, Approved: 24, Rejected: 4, Pending: 12 },
  { name: 'Scheme B', Total: 30, Approved: 13, Rejected: 2, Pending: 15 },
  { name: 'Scheme C', Total: 20, Approved: 9, Rejected: 8, Pending: 3 },
  { name: 'Scheme D', Total: 27, Approved: 19, Rejected: 1, Pending: 7 },
  { name: 'Scheme E', Total: 18, Approved: 4, Rejected: 3, Pending: 11 },
];

const lineData = [
  { month: 'Jan', Sanctioned: 400, Disbursed: 240, Pending: 160 },
  { month: 'Feb', Sanctioned: 300, Disbursed: 139, Pending: 161 },
  { month: 'Mar', Sanctioned: 200, Disbursed: 980, Pending: -780 },
  { month: 'Apr', Sanctioned: 278, Disbursed: 390, Pending: -112 },
  { month: 'May', Sanctioned: 189, Disbursed: 480, Pending: -291 },
  { month: 'Jun', Sanctioned: 239, Disbursed: 380, Pending: -141 },
  { month: 'Jul', Sanctioned: 349, Disbursed: 430, Pending: -81 },
];

const stackedBarData = [
  { name: 'Scheme Delay', Resolved: 20, Pending: 12, Escalated: 3 },
  { name: 'Fund Issue', Resolved: 30, Pending: 5, Escalated: 8 },
  { name: 'Eligibility', Resolved: 15, Pending: 20, Escalated: 2 },
];

const pieData02 = [
  { name: 'Complied', value: 82 },
  { name: 'Pending', value: 18 },
];
const PIE_COLORS_02 = ['#00C49F', '#FF8042'];

const districtPerfData = [
  { id: 1, district: 'Lucknow', sks: 1200, shgs: 85, apps: 450, sanctioned: 320, disbursed: '₹ 1.2 Cr', grievances: 15 },
  { id: 2, district: 'Kanpur', sks: 950, shgs: 60, apps: 320, sanctioned: 210, disbursed: '₹ 0.9 Cr', grievances: 8 },
  { id: 3, district: 'Varanasi', sks: 800, shgs: 70, apps: 400, sanctioned: 300, disbursed: '₹ 1.1 Cr', grievances: 12 },
  { id: 4, district: 'Agra', sks: 650, shgs: 45, apps: 250, sanctioned: 150, disbursed: '₹ 0.6 Cr', grievances: 5 },
  { id: 5, district: 'Meerut', sks: 710, shgs: 55, apps: 280, sanctioned: 190, disbursed: '₹ 0.7 Cr', grievances: 7 },
];

const heatmapData = [
  { district: 'Pune', util: 92 }, { district: 'Mumbai', util: 85 }, { district: 'Nagpur', util: 78 },
  { district: 'Nashik', util: 65 }, { district: 'Thane', util: 40 }, { district: 'Satara', util: 95 },
  { district: 'Kolkata', util: 88 }, { district: 'Howrah', util: 72 }, { district: 'Jaipur', util: 55 },
  { district: 'Udaipur', util: 91 },
];

// Function to get color for heatmap based on utilization %
const getHeatmapColor = (util: number) => {
  if (util > 90) return 'bg-green-600 hover:bg-green-700';
  if (util > 80) return 'bg-green-500 hover:bg-green-600';
  if (util > 70) return 'bg-lime-500 hover:bg-lime-600';
  if (util > 60) return 'bg-yellow-400 hover:bg-yellow-500';
  if (util > 50) return 'bg-amber-500 hover:bg-amber-600';
  if (util > 40) return 'bg-orange-500 hover:bg-orange-600';
  return 'bg-red-500 hover:bg-red-600';
};

// Custom label renderer for pie slices (shows numeric value centered in slice)
const renderPieValueLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 14, fontWeight: 800 }}>
      {value}
    </text>
  );
};

// --- 4. Main Page Component ---
const NskfdcDashboardPage = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
        <style jsx>{`
          .loader {
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
  }
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
        {/* Header with gradient card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-1">NSKFDC Dashboard</h1>
          <p className="text-white/90 text-base">Welcome back! Here's your financial empowerment overview.</p>
        </div>

        {/* --- METRIC CARDS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Schemes" value="48" icon={Target} color="blue" />
          <StatCard title="Total Applications" value="12,450" icon={FileText} color="indigo" />
          <StatCard title="Sanctions Issued" value="9,820" icon={CheckSquare} color="green" />
          <StatCard title="Funds Disbursed" value="₹ 8.2 Cr" icon={DollarSign} color="emerald" />
          <StatCard title="Pending Disbursements" value="₹ 1.5 Cr" icon={Banknote} color="amber" />
          <StatCard title="Grievances Received" value="180" icon={MessageSquareWarning} color="orange" />
          <StatCard title="Grievances Resolved" value="142" icon={CheckCircle} color="emerald" />
          <StatCard title="Directions Received" value="35" icon={AlertCircle} color="purple" />
        </div>

        {/* --- REPORTS & ANALYTICS SECTION --- */}
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="flex items-center text-lg font-semibold text-slate-700">
              <Building className="w-5 h-5 mr-2.5 text-indigo-500" />
              District-Wise Performance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">District</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total SHGs</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Apps. Received</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Sanctioned</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Disbursed</th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Grievances</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {districtPerfData.map((row) => (
                  <tr key={row.id} className="hover:bg-sky-50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.district}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">{row.shgs}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">{row.apps}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{row.sanctioned}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-indigo-600 font-bold">{row.disbursed}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{row.grievances}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- CHARTS & REPORTS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Exception Reports */}
          <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-slate-100 p-6 justify-between">
            <h3 className="flex items-center text-lg font-semibold text-red-600 mb-4">
              <FileWarning className="w-5 h-5 mr-2.5" />
              Exception Reports
            </h3>
            <ul className="space-y-2.5 flex-1">
              {[
                'Pending Disbursement (12)',
                'Rejected Applications (45)',
                'Delayed Compliance (7)',
                'Unresolved Grievances (38)',
                'Low Utilization Districts (9)',
              ].map(item => (
                <li key={item} className="flex items-center justify-between text-sm font-medium text-slate-700 hover:text-indigo-600 cursor-pointer">
                  <span>{item}</span>
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                </li>
              ))}
            </ul>
          </div>

          {/* Annual Report Sections */}
          <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-slate-100 p-6 justify-between">
            <h3 className="flex items-center text-lg font-semibold text-indigo-700 mb-4">
              <BookOpen className="w-5 h-5 mr-2.5" />
              Annual Report Sections
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 flex-1">
              {[
                'Executive Summary', 'Scheme Performance', 'Beneficiary Impact',
                'Financial Summary', 'Compliance Summary', 'Challenges & Recs.'
              ].map(item => (
                <li key={item} className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scheme Distribution Chart */}
          <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h3 className="flex items-center text-lg font-semibold text-indigo-700 mb-4">
              <PieChartIcon className="w-5 h-5 mr-2.5" />
              Scheme Distribution
            </h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={84}
                    innerRadius={42}
                    paddingAngle={4}
                    label={renderPieValueLabel}
                    labelLine={false}
                  >
                    {pieData01.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS_01[index % PIE_COLORS_01.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NskfdcDashboardPage;