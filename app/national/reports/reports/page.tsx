"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import IntegratedLoader from '../../../../components/layout/IntegratedLoader';
import StatCard from '@/components/ui/stat-card';
import { Download, FileText, Calendar, BarChart3, ChevronRight, Eye, FileSpreadsheet, X } from 'lucide-react';

// --- Re-defining components within the file for a self-contained structure ---


import { ReactNode } from 'react';

// Dialog Components
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 overflow-auto min-h-screen min-w-full"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg w-[92%] md:max-w-4xl max-h-[92vh] overflow-y-auto relative mx-auto my-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-95 bg-white/20 hover:bg-white/30 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modal, document.body);
  }
  return null;
};

const DialogContent = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">{children}</div>
);

const DialogTitle = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const DialogDescription = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);

const DialogFooter = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">{children}</div>
);

interface Report {
  title: string;
  description: string;
  type: string;
  lastGenerated: string;
  size: string;
  category: string;
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);
  const preBuiltReports = [
    { title: 'Monthly Grievance Report', description: 'Comprehensive analysis of grievances by state and category.', type: 'PDF', lastGenerated: '2024-01-15', size: '2.4 MB', category: 'Grievances' },
    { title: 'Worker Welfare Statistics', description: 'PPE distribution, training completion, and scheme enrollment data.', type: 'Excel', lastGenerated: '2024-01-14', size: '1.8 MB', category: 'Welfare' },
    { title: 'Recognition Program Summary', description: 'Performance metrics and leaderboard rankings.', type: 'PDF', lastGenerated: '2024-01-13', size: '3.2 MB', category: 'Recognition' },
    { title: 'Directive Compliance Report', description: 'Status and progress of issued directives across states.', type: 'PDF', lastGenerated: '2024-01-12', size: '1.5 MB', category: 'Directives' },
    { title: 'Financial Summary Report', description: 'Budget allocation and expenditure tracking.', type: 'Excel', lastGenerated: '2024-01-10', size: '2.1 MB', category: 'Finance' },
    { title: 'User Activity Log', description: 'System usage and audit trail information.', type: 'CSV', lastGenerated: '2024-01-15', size: '856 KB', category: 'Audit' },
  ];


  interface CategoryStyle {
    icon: React.ElementType;
    color: string;
    gradient: string;
  }
  const categoryStyles: Record<string, CategoryStyle> = {
    'Grievances': { icon: FileText, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    'Welfare': { icon: FileText, color: 'green', gradient: 'from-green-500 to-teal-600' },
    'Recognition': { icon: FileText, color: 'purple', gradient: 'from-purple-500 to-indigo-600' },
    'Directives': { icon: FileText, color: 'yellow', gradient: 'from-yellow-500 to-amber-600' },
    'Finance': { icon: FileText, color: 'orange', gradient: 'from-orange-500 to-amber-600' },
    'Audit': { icon: FileText, color: 'cyan', gradient: 'from-cyan-500 to-sky-600' },
  };


  const handleDownload = (reportTitle: string) => {
    console.log('Downloading report:', reportTitle);
  };

  const handleGenerateAnnualReport = () => {
    console.log('Generating annual report...');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <IntegratedLoader />
      </div>
    );
  }
  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 relative">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                Reports & Analytics
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg mt-2">
                Access pre-built reports or generate custom analytics
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            <button
              onClick={handleGenerateAnnualReport}
              className="px-4 sm:px-5 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Generate Annual Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <StatCard title="Total Reports" value="24" icon={FileText} color="purple" />
        <StatCard title="Downloads This Month" value="156" icon={Download} color="green" />
        <StatCard title="Last Updated" value="Today" icon={Calendar} color="blue" />
        <StatCard title="Auto-Generated" value="18" icon={BarChart3} color="orange" />
      </div>

      {/* Enhanced Pre-Built Reports */}
      <div className="space-y-4 sm:space-y-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <h2 className="relative text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-lg">Reports</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {preBuiltReports.map((report, index) => {
            const style = categoryStyles[report.category] || categoryStyles['Audit'];
            const Icon = style.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200/80 overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-r ${style.gradient} p-5 text-white flex items-center space-x-4`}>
                    <Icon className="h-8 w-8" />
                    <h3 className="font-bold text-lg leading-tight">{report.title}</h3>
                </div>
                <div className="p-5 flex-grow">
                  <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className={`px-2 py-1 rounded-full font-medium bg-${style.color}-100 text-${style.color}-700`}>{report.category}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 mt-auto">
                    <p className="text-xs text-slate-400 mb-3">Last generated: {report.lastGenerated}</p>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={() => {
                              setSelectedReport(report);
                              setIsDialogOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="font-semibold text-sm">View</span>
                        </button>
                        <button
                            onClick={() => handleDownload(report.title)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300"
                        >
                            <FileText className="w-4 h-4" />
                            <span className="font-semibold text-sm">PDF</span>
                        </button>
                        <button
                            onClick={() => handleDownload(report.title)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            <span className="font-semibold text-sm">Excel</span>
                        </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80">
        <div className="p-6">
            <h3 className="text-2xl font-bold text-slate-700 mb-4">Custom Report Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Report Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>Grievance Analysis</option>
                        <option>Welfare Statistics</option>
                        <option>Performance Metrics</option>
                        <option>Financial Summary</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Time Period</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                        <option>Custom Range</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Format</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                    </select>
                </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Generate Custom Report</span>
            </button>
        </div>
      </div>

      {/* Report View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
              {selectedReport?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedReport?.category} Report - Generated on {selectedReport?.lastGenerated}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Report Details */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Report Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900">{selectedReport?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Format</p>
                  <p className="font-semibold text-gray-900">{selectedReport?.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">File Size</p>
                  <p className="font-semibold text-gray-900">{selectedReport?.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Generated</p>
                  <p className="font-semibold text-gray-900">{selectedReport?.lastGenerated}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{selectedReport?.description}</p>
            </div>

            {/* Sample Data Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Report Contents Preview</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• Comprehensive data analysis and insights</p>
                <p>• Statistical breakdowns by region and category</p>
                <p>• Trend analysis and performance metrics</p>
                <p>• Comparative data with previous periods</p>
                <p>• Actionable recommendations and next steps</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => handleDownload(selectedReport?.title || '')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

