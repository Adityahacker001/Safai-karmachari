"use client";
import React from 'react';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

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

const Reports: React.FC = () => {
  const reports = [
    {
      title: 'Monthly District Grievance Summary',
      description: 'Comprehensive overview of all grievances filed and resolved in the district',
      lastGenerated: '2024-01-25',
      type: 'PDF/Excel'
    },
    {
      title: 'Contractor Performance Report',
      description: 'Detailed analysis of contractor performance metrics including welfare and compliance',
      lastGenerated: '2024-01-24',
      type: 'PDF/Excel'
    },
    {
      title: 'Welfare Status Report',
      description: 'Complete status of worker welfare programs, PPE distribution, and training completion',
      lastGenerated: '2024-01-23',
      type: 'PDF/Excel'
    },
    {
      title: 'Recognition & Awards Report',
      description: 'Performance rankings and recognition awards for workers and contractors',
      lastGenerated: '2024-01-22',
      type: 'PDF/Excel'
    },
    {
      title: 'Attendance Analytics Report',
      description: 'Worker attendance patterns and trends across all zones and contractors',
      lastGenerated: '2024-01-21',
      type: 'PDF/Excel'
    },
    {
      title: 'Directive Compliance Report',
      description: 'Status and compliance tracking for all issued directives',
      lastGenerated: '2024-01-20',
      type: 'PDF/Excel'
    }
  ];

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">
      
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl text-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">
              Reports & Analytics
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg">
              Generate and download comprehensive reports for analysis and compliance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/30 transition-all flex items-center justify-center space-x-2 border border-white/30">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm sm:text-base">Custom Report</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/30 transition-all flex items-center justify-center space-x-2 border border-white/30">
              <Calendar className="h-4 w-4" />
              <span className="text-sm sm:text-base">Schedule Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard
          title="Reports Generated"
          value="156"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="This Month"
          value="24"
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Downloads"
          value="1,247"
          icon={Download}
          color="purple"
        />
        <StatCard
          title="Scheduled"
          value="8"
          icon={BarChart3}
          color="amber"
        />
      </div>

      {/* Available Reports */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200/50">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">📑 Available Reports</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Generate and download reports for analysis and compliance</p>
        </div>
        
        <div className="divide-y divide-gray-200/50">
          {reports.map((report, index) => (
            <div key={index} className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg shadow-md w-fit">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{report.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs text-gray-500 space-y-1 sm:space-y-0">
                        <span>📅 Last generated: {report.lastGenerated}</span>
                        <span>📂 Format: {report.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md flex items-center justify-center space-x-2">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">PDF</span>
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md flex items-center justify-center space-x-2">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Excel</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Insights */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4">🔍 Recent Report Insights</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-lg p-3 sm:p-4 shadow-sm">
            <h4 className="text-sm sm:text-base font-medium text-blue-900">Grievance Resolution Improved</h4>
            <p className="text-xs sm:text-sm text-blue-800 mt-1">Average resolution time decreased by 0.3 days compared to last month</p>
          </div>
          
          <div className="bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-lg p-3 sm:p-4 shadow-sm">
            <h4 className="text-sm sm:text-base font-medium text-green-900">PPE Distribution On Track</h4>
            <p className="text-xs sm:text-sm text-green-800 mt-1">86% coverage achieved, exceeding the 80% monthly target</p>
          </div>
          
          <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-lg p-3 sm:p-4 shadow-sm">
            <h4 className="text-sm sm:text-base font-medium text-yellow-900">Training Completion Needs Attention</h4>
            <p className="text-xs sm:text-sm text-yellow-800 mt-1">3 contractors are below the 85% completion threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;
