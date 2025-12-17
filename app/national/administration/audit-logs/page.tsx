'use client';
import React, { useState, useEffect } from 'react';
import IntegratedLoader from '../../../../components/layout/IntegratedLoader';
import { Filter, Download, Eye, CheckCircle, XCircle, Shield, User, LayoutDashboard, ChevronRight, X, MapPin, Clock } from 'lucide-react';
import StatCard from "@/components/ui/stat-card";

// Dialog Components
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => onOpenChange(false)}
    >
      <div 
        className="bg-white/70 backdrop-blur-2xl rounded-lg max-w-xl max-h-[85vh] overflow-y-auto w-full relative shadow-2xl border border-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10 bg-white/50 p-2 rounded-full hover:bg-white/80"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">{children}</div>
);

const DialogTitle = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const DialogDescription = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);

const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">{children}</div>
);

interface AuditLog {
  timestamp: string;
  action: string;
  user: string;
  role: string;
  details: string;
  status: string;
  location: string;
}

// --- Main AuditLogs Component (moved to Administration) ---
export default function AuditLogs() {
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);
    const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

    const auditData = [
    { timestamp: '2024-01-15 14:30:45', action: 'User Login', user: 'Abishek Kumar', role: 'State Officer', details: 'Successful login from IP 203.192.45.12', status: 'Success', location: 'Lucknow, UP' },
    { timestamp: '2024-01-15 14:25:12', action: 'Directive Created', user: 'Admin User', role: 'National Admin', details: 'Created directive DIR-2024-001 for PPE Distribution', status: 'Success', location: 'New Delhi' },
    { timestamp: '2024-01-15 14:20:33', action: 'Report Downloaded', user: 'Priya Sharma', role: 'State Officer', details: 'Downloaded Monthly Grievance Report (January 2024)', status: 'Success', location: 'Mumbai, MH' },
    { timestamp: '2024-01-15 14:15:21', action: 'User Role Updated', user: 'Admin User', role: 'National Admin', details: 'Updated role for user USR-004 from District to State', status: 'Success', location: 'New Delhi' },
    { timestamp: '2024-01-15 14:10:18', action: 'Login Failed', user: 'Unknown', role: 'N/A', details: 'Failed login attempt for email: test@example.com', status: 'Failed', location: 'Unknown' },
    { timestamp: '2024-01-15 14:05:44', action: 'Grievance Status Changed', user: 'Amit Singh', role: 'District Officer', details: 'Changed status of GR-2024-001 from Pending to Resolved', status: 'Success', location: 'Lucknow, UP' },
    ];

    const actionStats = {
        total: auditData.length,
        successful: auditData.filter(a => a.status === 'Success').length,
        failed: auditData.filter(a => a.status === 'Failed').length,
        logins: auditData.filter(a => a.action.includes('Login')).length,
    };

    const handleExport = () => {
        console.log('Exporting audit logs...');
    };


        type StatusType = 'Success' | 'Failed' | 'Warning';
        const StatusPill = ({ status }: { status: StatusType }) => {
            const styles: Record<StatusType, string> = {
                Success: 'from-green-400 to-teal-500',
                Failed: 'from-amber-500 to-orange-600',
                Warning: 'from-yellow-400 to-amber-500',
            };
            return <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm bg-gradient-to-r ${styles[status] || 'from-slate-400 to-slate-500'}`}>{status}</span>;
        };

        type RoleType = 'National Admin' | 'State Officer' | 'District Officer' | 'Nodal Officer' | 'N/A';
        const RolePill = ({ role }: { role: RoleType }) => {
            const styles: Record<RoleType, string> = {
                'National Admin': 'text-indigo-700',
                'State Officer': 'text-blue-700',
                'District Officer': 'text-emerald-700',
                'Nodal Officer': 'text-sky-700',
                'N/A': 'text-slate-500',
            };
            return <span className={`font-medium ${styles[role] || 'text-slate-500'}`}>{role}</span>;
        };

    if (loading) {
        return (
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 min-h-screen flex items-center justify-center">
                <IntegratedLoader />
            </div>
        );
    }
    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen relative">
            <nav className="flex items-center text-sm font-medium text-slate-500 mb-3" aria-label="Breadcrumb">
                <LayoutDashboard className="w-4 h-4 mr-1.5" />
                Dashboard
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-semibold text-indigo-600">Administration</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-semibold text-indigo-600">Audit Logs</span>
            </nav>

            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 flex items-center gap-4">
                            <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                                    Audit Logs
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg">
                                    A detailed record of all system activities
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <select
                                value={selectedTimeRange}
                                onChange={(e) => setSelectedTimeRange(e.target.value)}
                                className="px-4 py-2 sm:py-3 bg-white/20 text-white border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 rounded-lg sm:rounded-xl backdrop-blur-sm"
                            >
                                <option value="1hour">Last Hour</option>
                                <option value="24hours">Last 24 Hours</option>
                                <option value="7days">Last 7 Days</option>
                                <option value="30days">Last 30 Days</option>
                                <option value="custom">Custom Range</option>
                            </select>
                            <button
                                onClick={handleExport}
                                className="px-4 sm:px-5 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Export</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Activity Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Activities"
                    value={actionStats.total}
                    icon={Eye}
                    color="blue"
                />
                <StatCard
                    title="Successful Actions"
                    value={actionStats.successful}
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Failed Actions"
                    value={actionStats.failed}
                    icon={XCircle}
                    color="red"
                />
                <StatCard
                    title="Login Activities"
                    value={actionStats.logins}
                    icon={User}
                    color="purple"
                />
            </div>

            {/* Main Content Area with Table (identical to original) */}
            <div className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Filters */}
                <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
                        <h3 className="text-lg sm:text-xl font-bold">Filter Options</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <select className="px-4 py-2 bg-white/20 text-white border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 rounded-lg backdrop-blur-sm">
                            <option value="">All Actions</option>
                            <option value="login">Login/Logout</option>
                        </select>
                        <select className="px-4 py-2 bg-white/20 text-white border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 rounded-lg backdrop-blur-sm">
                            <option value="">All Roles</option>
                            <option value="admin">National Admin</option>
                        </select>
                        <select className="px-4 py-2 bg-white/20 text-white border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 rounded-lg backdrop-blur-sm">
                            <option value="">All Status</option>
                            <option value="success">Success</option>
                        </select>
                    </div>
                </div>

                {/* Audit Logs Table (kept identical) */}
                <div className="p-0 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-50">
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Timestamp</th>
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Action</th>
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">User</th>
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Role</th>
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Details</th>
                                <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Status</th>
                                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Location</th>
                                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditData.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base text-slate-700 whitespace-nowrap">{row.timestamp}</td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium text-slate-800">{row.action}</td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base text-slate-700">{row.user}</td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6"><RolePill role={row.role as 'National Admin' | 'State Officer' | 'District Officer' | 'Nodal Officer' | 'N/A'} /></td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base text-slate-600 max-w-xs truncate" title={row.details}>{row.details}</td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-center"><StatusPill status={row.status as 'Success' | 'Failed' | 'Warning'} /></td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base text-slate-700">{row.location}</td>
                                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                        <button 
                                            onClick={() => {
                                                setSelectedLog(row);
                                                setIsDialogOpen(true);
                                            }}
                                            className="p-1 sm:p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-all"
                                        >
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Audit Log Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
                            Audit Log Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about this system activity
                        </DialogDescription>
                    </DialogHeader>

                    {selectedLog && (
                        <div className="space-y-6">
                            {/* Main Information */}
                            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-lg p-6 border border-blue-200/30">
                                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Activity Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Action Type</p>
                                        <p className="font-semibold text-gray-900">{selectedLog.action}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Status</p>
                                        <StatusPill status={selectedLog.status as 'Success' | 'Failed' | 'Warning'} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />Timestamp
                                        </p>
                                        <p className="font-semibold text-gray-900">{selectedLog.timestamp}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />Location
                                        </p>
                                        <p className="font-semibold text-gray-900">{selectedLog.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* User Information */}
                            <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 backdrop-blur-sm rounded-lg p-6 border border-purple-200/30">
                                <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                                    <User className="w-5 h-5" />User Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">User Name</p>
                                        <p className="font-semibold text-gray-900">{selectedLog.user}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Role</p>
                                        <RolePill role={selectedLog.role as 'National Admin' | 'State Officer' | 'District Officer' | 'Nodal Officer' | 'N/A'} />
                                    </div>
                                </div>
                            </div>

                            {/* Activity Details */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />Activity Details
                                </h4>
                                <div className="bg-gray-50/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/40">
                                    <p className="text-gray-700 leading-relaxed">{selectedLog.details}</p>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-yellow-50/60 backdrop-blur-sm border border-yellow-200/50 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> This activity has been logged for security and compliance purposes. 
                                    All audit logs are retained according to data retention policies.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => console.log('Export single log:', selectedLog)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center space-x-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export Log</span>
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
