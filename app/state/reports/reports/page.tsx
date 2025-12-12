"use client";   
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Calendar, BarChart, Image } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: 'Monthly Grievance Summary',
      description: 'Comprehensive overview of all grievances filed and resolved in the current month',
      lastGenerated: '2024-01-20',
      category: 'Grievances',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Worker Welfare Status Report',
      description: 'Current status of PPE distribution, training completion, and scheme enrollment',
      lastGenerated: '2024-01-19',
      category: 'Welfare',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Recognition Performance Analytics',
      description: 'District and contractor performance metrics with recognition scores',
      lastGenerated: '2024-01-18',
      category: 'Recognition',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'Directives Compliance Report',
      description: 'Status and compliance tracking of all issued directives',
      lastGenerated: '2024-01-17',
      category: 'Directives',
      size: '1.1 MB'
    },
    {
      id: 5,
      title: 'State Overview Dashboard',
      description: 'Executive summary with key metrics and KPIs',
      lastGenerated: '2024-01-20',
      category: 'Overview',
      size: '856 KB'
    },
    {
      id: 6,
      title: 'Audit Trail Report',
      description: 'Complete audit log of all system activities and user actions',
      lastGenerated: '2024-01-19',
      category: 'Audit',
      size: '4.7 MB'
    }
  ];

  // IntegratedLoader (inline copy) — do not modify anything else in this file
  const IntegratedLoader: React.FC = () => (
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

  const [loading, setLoading] = React.useState(true);
  const [selectedReport, setSelectedReport] = React.useState<any | null>(null);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  const getCategoryColor = (category: string) => {
    const colors = {
      'Grievances': 'bg-yellow-100 text-yellow-800',
      'Welfare': 'bg-green-100 text-green-800',
      'Recognition': 'bg-purple-100 text-purple-800',
      'Directives': 'bg-blue-100 text-blue-800',
      'Overview': 'bg-gray-100 text-gray-800',
      'Audit': 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryAccent = (category: string) => {
    const accents: Record<string, string> = {
      'Grievances': 'border-yellow-400',
      'Welfare': 'border-green-400',
      'Recognition': 'border-violet-400',
      'Directives': 'border-sky-400',
      'Overview': 'border-gray-300',
      'Audit': 'border-rose-400',
    };
    return accents[category] || 'border-gray-300';
  };

  return (
    <div className="space-y-8 min-h-screen w-full p-6 md:p-10">
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Reports & Analytics</h1>
            <p className="text-sm text-white/90">Generate and download comprehensive reports</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      {/* Quick Stats (now using reusable StatCard) */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Available Reports"
          value={reports.length}
          icon={FileText}
          color="orange"
        />

        <StatCard
          title="Generated Today"
          value={3}
          icon={Calendar}
          color="emerald"
        />

        <StatCard
          title="Total Downloads"
          value={247}
          icon={Download}
          color="purple"
        />
      </div>

      {/* Reports Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <div
              key={report.id}
              className={
                idx % 2 === 0
                  ? "p-6 rounded-2xl border shadow-lg bg-gradient-to-br from-blue-100 via-white to-purple-100 hover:shadow-2xl hover:scale-[1.01] transition-all"
                  : "p-6 rounded-2xl border shadow-lg bg-gradient-to-br from-pink-100 via-white to-yellow-100 hover:shadow-2xl hover:scale-[1.01] transition-all"
              }
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 via-white to-blue-100 border border-blue-200 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 shadow-sm ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="font-medium">📅 {report.lastGenerated}</span>
                <span className="font-medium">💾 {report.size}</span>
              </div>
              
                <div className="flex flex-wrap gap-3">
                <button onClick={() => setSelectedReport(report)} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 shadow-md transition">
                  <FileText className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 shadow-md transition">
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 shadow-md transition">
                  <Download className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
                  Regenerate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Generator */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Custom Report Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>Grievance Analysis</option>
              <option>Welfare Statistics</option>
              <option>Performance Metrics</option>
              <option>Compliance Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Districts</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>All Districts</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Nashik</option>
            </select>
          </div>
        </div>
        {/* Full screen modal / page for viewing a report */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-6 md:p-12"
            >
              <motion.div
                initial={{ y: 20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative w-[90vw] max-w-5xl h-auto max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto border border-gray-200"
              >
                {/* Header block styled to match PDF-like layout */}
                <div className={`relative px-6 py-4 border-b ${getCategoryAccent(selectedReport.category)} border-l-4`}> 
                  <button onClick={() => setSelectedReport(null)} aria-label="Close report" className="absolute right-4 top-4 px-3 py-2 bg-gray-100 rounded-md">Close</button>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">{selectedReport.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedReport.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-start gap-8 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">Generated On:</div>
                      <div className="text-gray-800">{new Date().toLocaleString()}</div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedReport.category)}`}>{selectedReport.category}</span>
                      </div>
                      <div>Generated By: <span className="font-medium text-gray-800">System</span></div>
                      <div>File Size: <span className="font-medium text-gray-800">{selectedReport.size}</span></div>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    <div>Reporting Month: <span className="font-medium text-gray-800">{selectedReport.lastGenerated}</span></div>
                  </div>
                </div>

                <div className="px-6 py-6 space-y-4">
                  {/* KPIs */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Summary Metrics</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {/* Compact KPI cards styled like PDF: small title, large bold number, pastel background */}
                      {selectedReport.category === 'Grievances' && (
                        <>
                          <div className="rounded-lg p-3 bg-yellow-50 border border-yellow-100">
                            <div className="text-xs text-gray-500">Total grievances</div>
                            <div className="text-2xl font-extrabold text-gray-900">1,234</div>
                          </div>
                          <div className="rounded-lg p-3 bg-yellow-50 border border-yellow-100">
                            <div className="text-xs text-gray-500">Resolved</div>
                            <div className="text-2xl font-extrabold text-gray-900">1,010</div>
                          </div>
                          <div className="rounded-lg p-3 bg-yellow-50 border border-yellow-100">
                            <div className="text-xs text-gray-500">Pending</div>
                            <div className="text-2xl font-extrabold text-gray-900">224</div>
                          </div>
                          <div className="rounded-lg p-3 bg-yellow-50 border border-yellow-100">
                            <div className="text-xs text-gray-500">Avg resolution time</div>
                            <div className="text-2xl font-extrabold text-gray-900">5 days</div>
                          </div>
                        </>
                      )}
                      {selectedReport.category === 'Welfare' && (
                        <>
                          <div className="rounded-lg p-3 bg-green-50 border border-green-100">
                            <div className="text-xs text-gray-500">PPE distribution %</div>
                            <div className="text-2xl font-extrabold text-gray-900">92%</div>
                          </div>
                          <div className="rounded-lg p-3 bg-green-50 border border-green-100">
                            <div className="text-xs text-gray-500">Training completion</div>
                            <div className="text-2xl font-extrabold text-gray-900">88%</div>
                          </div>
                          <div className="rounded-lg p-3 bg-green-50 border border-green-100">
                            <div className="text-xs text-gray-500">Scheme enrollment</div>
                            <div className="text-2xl font-extrabold text-gray-900">12,345</div>
                          </div>
                          <div className="rounded-lg p-3 bg-green-50 border border-green-100">
                            <div className="text-xs text-gray-500">Health camp coverage</div>
                            <div className="text-2xl font-extrabold text-gray-900">74%</div>
                          </div>
                        </>
                      )}
                      {selectedReport.category === 'Directives' && (
                        <>
                          <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                            <div className="text-xs text-gray-500">Directives issued</div>
                            <div className="text-2xl font-extrabold text-gray-900">420</div>
                          </div>
                          <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                            <div className="text-xs text-gray-500">Completed</div>
                            <div className="text-2xl font-extrabold text-gray-900">310</div>
                          </div>
                          <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                            <div className="text-xs text-gray-500">Pending</div>
                            <div className="text-2xl font-extrabold text-gray-900">80</div>
                          </div>
                          <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                            <div className="text-xs text-gray-500">Overdue</div>
                            <div className="text-2xl font-extrabold text-gray-900">30</div>
                          </div>
                        </>
                      )}
                    </div>
                  </section>

                  {/* Main Data Table */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Report Details</h3>
                    <div className="bg-white border rounded-lg overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            {selectedReport.category === 'Grievances' && (
                              <>
                                <th className="px-4 py-2 text-left">District</th>
                                <th className="px-4 py-2 text-left">Grievance ID</th>
                                <th className="px-4 py-2 text-left">Date Filed</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Ageing</th>
                              </>
                            )}
                            {selectedReport.category === 'Welfare' && (
                              <>
                                <th className="px-4 py-2 text-left">District</th>
                                <th className="px-4 py-2 text-left">PPE Issued</th>
                                <th className="px-4 py-2 text-left">Training Completed</th>
                                <th className="px-4 py-2 text-left">Enrolled</th>
                                <th className="px-4 py-2 text-left">Health Camp Coverage</th>
                                <th className="px-4 py-2 text-left">Remarks</th>
                              </>
                            )}
                            {selectedReport.category === 'Directives' && (
                              <>
                                <th className="px-4 py-2 text-left">Directive ID</th>
                                <th className="px-4 py-2 text-left">District</th>
                                <th className="px-4 py-2 text-left">Issue Date</th>
                                <th className="px-4 py-2 text-left">Due Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Compliance %</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            {/* No data available: show friendly message, do not use placeholders */}
                            <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No records available for this report.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Charts / Visualizations */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Charts</h3>
                    {/* Only show charts when data exists. For now no data => show message. */}
                    {false ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-48 bg-white border rounded-lg flex items-center justify-center text-gray-400">Pie chart</div>
                        <div className="h-48 bg-white border rounded-lg flex items-center justify-center text-gray-400">Bar chart</div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">No chart data available</div>
                    )}
                  </section>

                  {/* Attachments */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Supporting Documents</h3>
                    <div className="bg-white p-4 border rounded-lg">
                      {selectedReport.attachments && selectedReport.attachments.length > 0 ? (
                        <ul className="space-y-3">
                          {selectedReport.attachments.map((a: any, i: number) => (
                            <li key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div className="text-sm text-gray-800">{a.name || `Attachment ${i + 1}`}</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button className="text-sm text-blue-600 hover:underline">Preview</button>
                                <a href={a.href || '#'} download className="text-sm text-gray-600 hover:text-gray-900">Download</a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500">No supporting documents.</div>
                      )}
                    </div>
                  </section>

                  {/* Footer */}
                  <footer className="pt-6 pb-12 text-center text-sm text-gray-500">
                    Auto-generated by Safai Karmachari Management System (SKMS).
                  </footer>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md">
          <BarChart className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>
    </div>
  );
};

export default Reports;
