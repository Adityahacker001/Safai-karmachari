'use client';

import React from 'react';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  GraduationCap,
  DollarSign,
  FileText,
  BarChart3,
  Building,
  Users,
  Briefcase,
  UserCog
} from 'lucide-react';

export default function StateDashboard() {
  function IntegratedLoader() {
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

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;
  // Updated Graph1 with modern curved gradient line chart
  const Graph1 = () => {
    const points = [
      { x: 70, y: 70, label: 'Apr', value: 82 },
      { x: 110, y: 65, label: 'May', value: 78 },
      { x: 150, y: 50, label: 'Jun', value: 62 },
      { x: 190, y: 44, label: 'Jul', value: 55 },
      { x: 230, y: 36, label: 'Aug', value: 48 },
      { x: 270, y: 28, label: 'Sep', value: 42 },
    ];
    const [active, setActive] = React.useState<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const onDocClick = () => setActive(null);
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }, []);

    return (
      <div ref={containerRef} className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-2xl border border-blue-200 shadow-md">
        <span className="text-lg font-bold text-blue-700 mb-2">State Sanitation Trend</span>
        <div className="w-full h-40 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
          <svg width="92%" height="100%" viewBox="0 0 340 120" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.18"/>
              </filter>
            </defs>

            {/* background grid */}
            <g stroke="#e6eefc" strokeWidth="1">
              <line x1="40" x2="300" y1="20" y2="20" />
              <line x1="40" x2="300" y1="45" y2="45" />
              <line x1="40" x2="300" y1="70" y2="70" />
              <line x1="40" x2="300" y1="95" y2="95" />
            </g>

            {/* Y-axis labels */}
            <g fill="#6b7280" fontSize="10" textAnchor="end">
              <text x="36" y="22">100</text>
              <text x="36" y="47">75</text>
              <text x="36" y="72">50</text>
              <text x="36" y="97">25</text>
            </g>

            {/* X-axis labels (months) */}
            <g fill="#6b7280" fontSize="10" textAnchor="middle">
              <text x="60" y="112">Apr</text>
              <text x="110" y="112">May</text>
              <text x="160" y="112">Jun</text>
              <text x="210" y="112">Jul</text>
              <text x="260" y="112">Aug</text>
              <text x="310" y="112">Sep</text>
            </g>

            {/* area + connecting line + dots */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* approximate smooth path */}
            <path d="M70,70 C90,68 110,66 130,58 C150,50 170,48 190,44 C210,42 230,38 250,32 270,28" fill="none" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)" />

            {/* area under curve */}
            <path d="M70,70 C90,68 110,66 130,58 C150,50 170,48 190,44 C210,42 230,38 250,32 270,28 L270,98 L70,98 Z" fill="url(#areaGrad)" />

            {points.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill="#1e40af"
                  className="cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setActive(prev => prev === i ? null : i); }}
                />
                <title>{`${p.label}: ${p.value}%`}</title>
              </g>
            ))}

            {/* subtle x-axis line */}
            <line x1="40" x2="300" y1="100" y2="100" stroke="#dbeafe" strokeWidth="1" />
          </svg>

          {/* Tooltip rendered absolutely inside container using percentage positions */}
          {active !== null && (
            (() => {
              const p = points[active];
              const left = `${(p.x / 340) * 100}%`;
              const top = `${(p.y / 120) * 100}%`;
              return (
                <div className="absolute pointer-events-auto -translate-y-8" style={{ left, top, transform: 'translate(-50%, -100%)' }}>
                  <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md shadow-md">{p.value}%</div>
                </div>
              );
            })()
          )}
        </div>
        <span className="text-xs text-gray-500">Monthly sanitation performance (mock)</span>
      </div>
    );
  };

  // Updated Graph2 with 3D styled bars and gradient
  const Graph2 = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-green-100 via-green-50 to-white rounded-2xl border border-green-200 shadow-md">
      <span className="text-lg font-bold text-green-700 mb-2">District Incident Comparison</span>
      <div className="w-full h-40 flex items-center justify-center">
        <svg width="90%" height="100%" viewBox="0 0 300 100">
          <defs>
            {/* Gradient for bars */}
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.7" />
            </linearGradient>
            {/* Drop shadow for bars */}
            <filter id="barShadow" x="-10%" y="-10%" width="150%" height="150%">
              <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#166534" floodOpacity="0.3"/>
            </filter>
          </defs>
          {/* Bars with gradient + shadow */}
          <rect x="20" y="60" width="30" height="30" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="70" y="40" width="30" height="50" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="120" y="20" width="30" height="70" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="170" y="50" width="30" height="40" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="220" y="30" width="30" height="60" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
        </svg>
      </div>
      <span className="text-xs text-gray-500">Incidents by district (mock)</span>
    </div>
  );

  return (
  // Main container with proper padding
  <div className="min-h-screen w-full p-6 md:p-10 space-y-8">
      {/* Page Header - District-style gradient banner */}
      <div className="w-full rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12" aria-hidden />
            <div>
              <h1 className="text-3xl font-bold">State-Level Dashboard</h1>
              <p className="mt-1 text-sm opacity-90">An overview of all district activities and compliance metrics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards - Two Rows, 3 Cards Each */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Total Districts"
          value="33"
          change="100% coverage achieved"
          changeType="increase"
          icon={Building}
          color="blue"
          description="Districts monitored"
        />
        <DashboardCard
          title="Total Workers"
          value="1,842"
          icon={Users}
          color="blue"
          description="Enrolled workforce"
        />
        <DashboardCard
          title="Total Contractors"
          value="12"
          icon={Briefcase}
          color="indigo"
          description="Registered agencies"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Nodal Officers"
          value="8"
          icon={UserCog}
          color="indigo"
          description="State-level nodal officers"
        />
        <DashboardCard
          title="Incidents This Month"
          value="28"
          change="-12 from last month"
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
          description="State-wide incidents"
        />
        <DashboardCard
          title="District Performance"
          value="8.6"
          change="Above national average"
          changeType="increase"
          icon={BarChart3}
          color="green"
          description="Average score"
        />
      </div>

      {/* New Graphs Container for State Officer */}
      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/30 flex flex-col gap-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">State Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Graph1 />
          <Graph2 />
        </div>
      </div>

      {/* Quick Actions - Enhanced Button Styling */}
      <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Priority Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-blue-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-blue-500">
                <BarChart3 className="h-7 w-7 text-blue-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">State Compliance Review</p>
            <p className="text-sm text-gray-600">Quarterly assessment due</p>
          </button>
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-green-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-green-500">
                <Shield className="h-7 w-7 text-green-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">District Data Audit</p>
            <p className="text-sm text-gray-600">Audit district-level data for accuracy</p>
          </button>
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-purple-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-purple-500">
                <FileText className="h-7 w-7 text-purple-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">Policy Update</p>
            <p className="text-sm text-gray-600">New guidelines to implement</p>
          </button>
        </div>
      </div>
    </div>
  );
}
