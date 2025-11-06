"use client";
import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Clock, AlertTriangle, Eye, Filter, User, MapPin, Calendar, Flag, X, ArrowLeft } from 'lucide-react';

// --- Helper components defined within the file ---


import { ReactNode } from 'react';

interface TableProps {
  className?: string;
  children: ReactNode;
}
const Table = ({ className = '', children }: TableProps) => <table className={className}>{children}</table>;
const TableHeader = ({ children }: { children: ReactNode }) => <thead>{children}</thead>;
const TableBody = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;
interface TableRowProps {
  className?: string;
  children: ReactNode;
}
const TableRow = ({ className = '', children }: TableRowProps) => <tr className={className}>{children}</tr>;
const TableHead = ({ className = '', children }: TableRowProps) => <th className={className}>{children}</th>;
const TableCell = ({ className = '', children }: TableRowProps) => <td className={className}>{children}</td>;

// Dialog Components
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto w-full relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
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

// Updated KPI Card Component to match the new design

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'yellow' | 'blue' | 'purple' | 'green';
}
const KPICard = ({ title, value, icon: Icon, color }: KPICardProps) => {
  const colorSchemes: Record<KPICardProps['color'], string> = {
    yellow: 'bg-gradient-to-br from-amber-400 to-orange-500',
    blue: 'bg-gradient-to-br from-sky-400 to-blue-600',
    purple: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    green: 'bg-gradient-to-br from-emerald-400 to-green-500',
  };
  const scheme = colorSchemes[color] || colorSchemes.blue;
  return (
    <div className={`relative ${scheme} p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1 duration-300`}>
      <Icon className="absolute -right-5 -bottom-5 h-28 w-28 text-white/20 transform" />
      <div className="relative">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-5xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};


export default function Grievances() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState<string | null>(null);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'districts' | 'grievances' | 'details'>('districts');

  const kpiData = [
    { title: 'Total Grievances', value: 2486, icon: MessageCircle, color: 'blue' },
    { title: 'Verified', value: 2362, icon: CheckCircle, color: 'green' },
    { title: 'Pending', value: 173, icon: Clock, color: 'yellow' },
    { title: 'Escalated (this month)', value: 124, icon: AlertTriangle, color: 'purple' }, // Changed to purple for the new design
  ];

  const grievanceData = [
    { id: 'GR-2024-001', date: '2024-01-15', state: 'Uttar Pradesh', district: 'Lucknow', category: 'PPE Distribution', status: 'Pending', priority: 'High', days_pending: 3, },
    { id: 'GR-2024-002', date: '2024-01-14', state: 'Maharashtra', district: 'Mumbai', category: 'Wage Payment', status: 'Resolved', priority: 'Medium', days_pending: 0, },
    { id: 'GR-2024-003', date: '2024-01-13', state: 'Bihar', district: 'Patna', category: 'Training', status: 'Escalated', priority: 'High', days_pending: 5, },
    { id: 'GR-2024-004', date: '2024-01-12', state: 'West Bengal', district: 'Kolkata', category: 'Health Insurance', status: 'Verified', priority: 'Low', days_pending: 2, },
     { id: 'GR-2024-005', date: '2024-01-11', state: 'Tamil Nadu', district: 'Chennai', category: 'Safety Gear', status: 'Resolved', priority: 'Low', days_pending: 0, },
  ];

  // District grievances data
  const districtGrievancesData = {
    'Lucknow': [
      { id: 'GRV-UP-LKO-001', date: '2024-01-15', category: 'PPE Distribution', status: 'Pending', priority: 'High', days_pending: 3 },
      { id: 'GRV-UP-LKO-002', date: '2024-01-14', category: 'Wage Payment', status: 'Resolved', priority: 'Medium', days_pending: 0 },
      { id: 'GRV-UP-LKO-003', date: '2024-01-13', category: 'Safety Training', status: 'Escalated', priority: 'High', days_pending: 5 },
      { id: 'GRV-UP-LKO-004', date: '2024-01-12', category: 'Health Insurance', status: 'Pending', priority: 'Low', days_pending: 2 },
      { id: 'GRV-UP-LKO-005', date: '2024-01-11', category: 'Equipment Repair', status: 'Verified', priority: 'Medium', days_pending: 1 }
    ],
    'Mumbai': [
      { id: 'GRV-MH-MUM-001', date: '2024-01-15', category: 'Wage Delay', status: 'Pending', priority: 'High', days_pending: 4 },
      { id: 'GRV-MH-MUM-002', date: '2024-01-14', category: 'PPE Quality', status: 'Resolved', priority: 'Medium', days_pending: 0 },
      { id: 'GRV-MH-MUM-003', date: '2024-01-13', category: 'Working Hours', status: 'Escalated', priority: 'High', days_pending: 6 },
      { id: 'GRV-MH-MUM-004', date: '2024-01-12', category: 'Medical Benefits', status: 'Pending', priority: 'Low', days_pending: 3 },
      { id: 'GRV-MH-MUM-005', date: '2024-01-11', category: 'Transportation', status: 'Verified', priority: 'Medium', days_pending: 1 }
    ],
    'Patna': [
      { id: 'GRV-BR-PAT-001', date: '2024-01-15', category: 'Training Issues', status: 'Escalated', priority: 'High', days_pending: 5 },
      { id: 'GRV-BR-PAT-002', date: '2024-01-14', category: 'Equipment Shortage', status: 'Pending', priority: 'Medium', days_pending: 3 },
      { id: 'GRV-BR-PAT-003', date: '2024-01-13', category: 'Safety Protocols', status: 'Resolved', priority: 'High', days_pending: 0 },
      { id: 'GRV-BR-PAT-004', date: '2024-01-12', category: 'Overtime Pay', status: 'Pending', priority: 'Low', days_pending: 2 },
      { id: 'GRV-BR-PAT-005', date: '2024-01-11', category: 'Uniform Supply', status: 'Verified', priority: 'Medium', days_pending: 1 }
    ],
    'Kolkata': [
      { id: 'GRV-WB-KOL-001', date: '2024-01-15', category: 'Health Insurance', status: 'Verified', priority: 'Medium', days_pending: 2 },
      { id: 'GRV-WB-KOL-002', date: '2024-01-14', category: 'Work Schedule', status: 'Pending', priority: 'Low', days_pending: 3 },
      { id: 'GRV-WB-KOL-003', date: '2024-01-13', category: 'PPE Distribution', status: 'Resolved', priority: 'High', days_pending: 0 },
      { id: 'GRV-WB-KOL-004', date: '2024-01-12', category: 'Salary Issues', status: 'Escalated', priority: 'High', days_pending: 4 },
      { id: 'GRV-WB-KOL-005', date: '2024-01-11', category: 'Safety Gear', status: 'Pending', priority: 'Medium', days_pending: 2 }
    ],
    'Chennai': [
      { id: 'GRV-TN-CHE-001', date: '2024-01-15', category: 'Safety Gear', status: 'Resolved', priority: 'Low', days_pending: 0 },
      { id: 'GRV-TN-CHE-002', date: '2024-01-14', category: 'Night Shift Issues', status: 'Pending', priority: 'Medium', days_pending: 2 },
      { id: 'GRV-TN-CHE-003', date: '2024-01-13', category: 'Equipment Maintenance', status: 'Verified', priority: 'Low', days_pending: 1 },
      { id: 'GRV-TN-CHE-004', date: '2024-01-12', category: 'Training Materials', status: 'Escalated', priority: 'High', days_pending: 3 },
      { id: 'GRV-TN-CHE-005', date: '2024-01-11', category: 'Protective Equipment', status: 'Resolved', priority: 'Medium', days_pending: 0 }
    ]
  };

  // District data for each state
  const stateDistrictsData = {
    'Uttar Pradesh': [
      { district: 'Lucknow', total: 245, pending: 45, resolved: 180, escalated: 20 },
      { district: 'Kanpur', total: 189, pending: 32, resolved: 145, escalated: 12 },
      { district: 'Agra', total: 156, pending: 28, resolved: 118, escalated: 10 },
      { district: 'Varanasi', total: 134, pending: 24, resolved: 102, escalated: 8 }
    ],
    'Maharashtra': [
      { district: 'Mumbai', total: 312, pending: 56, resolved: 230, escalated: 26 },
      { district: 'Pune', total: 198, pending: 34, resolved: 152, escalated: 12 },
      { district: 'Nagpur', total: 167, pending: 29, resolved: 128, escalated: 10 },
      { district: 'Nashik', total: 143, pending: 25, resolved: 110, escalated: 8 }
    ],
    'Bihar': [
      { district: 'Patna', total: 201, pending: 38, resolved: 148, escalated: 15 },
      { district: 'Gaya', total: 156, pending: 28, resolved: 118, escalated: 10 },
      { district: 'Bhagalpur', total: 134, pending: 24, resolved: 102, escalated: 8 },
      { district: 'Muzaffarpur', total: 123, pending: 22, resolved: 94, escalated: 7 }
    ],
    'West Bengal': [
      { district: 'Kolkata', total: 278, pending: 48, resolved: 210, escalated: 20 },
      { district: 'Howrah', total: 167, pending: 29, resolved: 128, escalated: 10 },
      { district: 'Durgapur', total: 145, pending: 26, resolved: 112, escalated: 7 },
      { district: 'Siliguri', total: 134, pending: 24, resolved: 102, escalated: 8 }
    ],
    'Tamil Nadu': [
      { district: 'Chennai', total: 289, pending: 52, resolved: 218, escalated: 19 },
      { district: 'Coimbatore', total: 178, pending: 31, resolved: 136, escalated: 11 },
      { district: 'Madurai', total: 156, pending: 28, resolved: 119, escalated: 9 },
      { district: 'Salem', total: 134, pending: 24, resolved: 103, escalated: 7 }
    ]
  };

  // Sample grievance details data
  const grievanceDetailsData = {
    "Lucknow": {
      caseId: "CASE-UP-LKO-001",
      type: "PPE Distribution",
      contractor: "ABC Sanitation Services",
      reportedDate: "2024-01-15",
      location: "Lucknow Municipal Corporation, Ward 15",
      reportedBy: "Ward Supervisor - Ramesh Singh",
      priority: "High",
      status: "Action Required",
      description: "Reported PPE distribution issues at Lucknow Municipal Corporation. Workers are not receiving proper Personal Protective Equipment including masks, gloves, and safety boots. This is causing health hazards and safety concerns among the sanitation staff. Immediate action required to ensure proper PPE distribution and worker safety compliance.",
      officers: [
        { name: "Dr. Amit Kumar", designation: "State Nodal Officer", contact: "+91 9876543210", email: "amit.kumar@up.gov.in" },
        { name: "Mrs. Priya Sharma", designation: "District Health Officer", contact: "+91 9876543211", email: "priya.sharma@up.gov.in" },
        { name: "Mr. Ravi Gupta", designation: "Safety Compliance Officer", contact: "+91 9876543212", email: "ravi.gupta@up.gov.in" }
      ]
    },
    "Mumbai": {
      caseId: "CASE-MH-MUM-002",
      type: "Wage Payment",
      contractor: "Clean Mumbai Services",
      reportedDate: "2024-01-14",
      location: "Mumbai Municipal Corporation, Zone 2",
      reportedBy: "Union Representative - Sunita Patil",
      priority: "Medium",
      status: "Under Review",
      description: "Delayed wage payments to sanitation workers for the month of December 2023. Workers are facing financial difficulties due to non-payment of wages on time. This issue needs immediate attention to ensure timely salary disbursement.",
      officers: [
        { name: "Ms. Kavita Joshi", designation: "State Labor Commissioner", contact: "+91 9876543213", email: "kavita.joshi@mh.gov.in" },
        { name: "Mr. Deepak Verma", designation: "District Collector", contact: "+91 9876543214", email: "deepak.verma@mh.gov.in" }
      ]
    },
    "Patna": {
      caseId: "CASE-BR-PAT-003",
      type: "Training Issues",
      contractor: "Bihar Waste Management",
      reportedDate: "2024-01-13",
      location: "Patna Municipal Corporation, East Zone",
      reportedBy: "Training Coordinator - Mohan Das",
      priority: "High",
      status: "Escalated",
      description: "Lack of proper training for new sanitation workers on safety protocols and modern waste management techniques. This has resulted in several safety incidents and inefficient waste collection processes.",
      officers: [
        { name: "Dr. Sneha Gupta", designation: "State Training Director", contact: "+91 9876543215", email: "sneha.gupta@br.gov.in" },
        { name: "Mr. Vikash Roy", designation: "Safety Training Officer", contact: "+91 9876543216", email: "vikash.roy@br.gov.in" }
      ]
    },
    "Kolkata": {
      caseId: "CASE-WB-KOL-004",
      type: "Health Insurance",
      contractor: "Kolkata Clean Services",
      reportedDate: "2024-01-12",
      location: "Kolkata Municipal Corporation, South Zone",
      reportedBy: "Health Officer - Dr. Raj Banerjee",
      priority: "Medium",
      status: "Verified",
      description: "Issues with health insurance coverage for sanitation workers and their families. Some workers reported difficulty in accessing healthcare benefits under the government insurance scheme.",
      officers: [
        { name: "Dr. Madhuri Sen", designation: "State Health Director", contact: "+91 9876543218", email: "madhuri.sen@wb.gov.in" },
        { name: "Mr. Subrata Ghosh", designation: "Insurance Coordinator", contact: "+91 9876543219", email: "subrata.ghosh@wb.gov.in" }
      ]
    },
    "Chennai": {
      caseId: "CASE-TN-CHE-005",
      type: "Safety Gear",
      contractor: "Chennai Sanitation Ltd",
      reportedDate: "2024-01-11",
      location: "Chennai Corporation, Zone 3",
      reportedBy: "Safety Inspector - K. Murugan",
      priority: "Low",
      status: "Resolved",
      description: "Request for improved safety gear including high-visibility jackets and protective footwear for night shift workers. Workers need better protective equipment for hazardous waste handling.",
      officers: [
        { name: "Ms. Lakshmi Devi", designation: "State Safety Officer", contact: "+91 9876543220", email: "lakshmi.devi@tn.gov.in" },
        { name: "Mr. Rahul Kumar", designation: "Equipment Manager", contact: "+91 9876543221", email: "rahul.kumar@tn.gov.in" }
      ]
    }
  };

  // Removed escalatedData, not needed


  type StatusType = 'Pending' | 'Resolved' | 'Escalated' | 'Verified';
  const StatusPill = ({ value }: { value: StatusType }) => {
    const statusStyles: Record<StatusType, string> = {
      Pending: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white',
      Resolved: 'bg-gradient-to-r from-green-400 to-teal-500 text-white',
      Escalated: 'bg-gradient-to-r from-orange-500 to-pink-600 text-white',
      Verified: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusStyles[value]}`}>
        {value}
      </span>
    );
  };


  type PriorityType = 'High' | 'Medium' | 'Low';
  const PriorityPill = ({ value }: { value: PriorityType }) => {
    const priorityStyles: Record<PriorityType, string> = {
      High: 'text-orange-600 font-bold',
      Medium: 'text-yellow-600 font-bold',
      Low: 'text-green-600 font-bold',
    };
    return <span className={`${priorityStyles[value]}`}>{value}</span>;
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                Grievance Management
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
                Track, manage, and resolve all reported grievances efficiently
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            <button className="px-4 sm:px-5 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Advanced Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value.toLocaleString()}
            icon={kpi.icon}
            color={kpi.color as 'yellow' | 'blue' | 'purple' | 'green'}
          />
        ))}
      </div>

      {/* Professional Main Content Area with Table */}
      <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Only All Grievances tab remains, so remove tab UI */}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b-0">
                <TableHead className="text-sm font-semibold text-gray-600 p-6">Grievance ID</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Date</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">State</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">District</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Category</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600 text-center">Status</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Priority</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Days Pending</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grievanceData.map((row) => (
                <TableRow key={row.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium text-gray-800 p-6">{row.id}</TableCell>
                  <TableCell className="text-gray-600">{row.date}</TableCell>
                  <TableCell className="text-gray-600">{row.state}</TableCell>
                  <TableCell className="text-gray-600">{row.district}</TableCell>
                  <TableCell className="text-gray-600">{row.category}</TableCell>
                  <TableCell className="text-center"><StatusPill value={row.status as 'Pending' | 'Resolved' | 'Escalated' | 'Verified'} /></TableCell>
                  <TableCell className=""><PriorityPill value={row.priority as 'High' | 'Medium' | 'Low'} /></TableCell>
                  <TableCell className="text-gray-600">{row.days_pending > 0 ? `${row.days_pending} days` : '-'}</TableCell>
                  <TableCell className="text-right pr-6">
                    <button 
                      onClick={() => {
                        setSelectedState(row.state);
                        setIsDistrictModalOpen(true);
                        setCurrentView('districts');
                      }}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-all"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* District Modal */}
      <Dialog open={isDistrictModalOpen} onOpenChange={setIsDistrictModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              {currentView === 'districts' ? (
                <>
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <span>Districts in {selectedState}</span>
                </>
              ) : currentView === 'grievances' ? (
                <>
                  <button 
                    onClick={() => setCurrentView('districts')}
                    className="p-1 hover:bg-gray-100 rounded-full mr-2"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <span>Grievances in {selectedDistrict}</span>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setCurrentView('grievances')}
                    className="p-1 hover:bg-gray-100 rounded-full mr-2"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <Eye className="w-6 h-6 text-blue-600" />
                  <span>Incident Case Details - {grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData]?.caseId}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {currentView === 'districts' 
                ? `Grievance summary by districts in ${selectedState}` 
                : currentView === 'grievances'
                ? `List of all grievances reported in ${selectedDistrict} district`
                : 'Complete case information and grievance details'
              }
            </DialogDescription>
          </DialogHeader>

          {currentView === 'districts' ? (
            // Districts Table View
            <div className="mt-6">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">District</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Total</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Pending</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Resolved</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Escalated</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedState && stateDistrictsData[selectedState as keyof typeof stateDistrictsData]?.map((district, idx) => (
                      <TableRow key={district.district} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                        <TableCell className="px-4 py-3 text-center text-sm font-medium text-gray-800">{district.district}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-gray-800">{district.total}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-yellow-600 font-medium">{district.pending}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-green-600 font-medium">{district.resolved}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-red-600 font-medium">{district.escalated}</TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedDistrict(district.district);
                              setCurrentView('grievances');
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-medium hover:bg-blue-600 transition flex items-center space-x-1 mx-auto"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : currentView === 'grievances' ? (
            // Grievances List View
            <div className="mt-6">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Grievance ID</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Date</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Category</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Status</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Priority</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Days Pending</TableHead>
                      <TableHead className="px-4 py-3 text-center text-sm font-semibold text-gray-700 tracking-wider uppercase">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDistrict && districtGrievancesData[selectedDistrict as keyof typeof districtGrievancesData]?.map((grievance, idx) => (
                      <TableRow key={grievance.id} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                        <TableCell className="px-4 py-3 text-center text-sm font-medium text-gray-800">{grievance.id}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-gray-800">{grievance.date}</TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-gray-800">{grievance.category}</TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            grievance.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            grievance.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            grievance.status === 'Escalated' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {grievance.status}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <span className={`font-medium ${
                            grievance.priority === 'High' ? 'text-red-600' :
                            grievance.priority === 'Medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {grievance.priority}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center text-sm text-gray-800">
                          {grievance.days_pending > 0 ? `${grievance.days_pending} days` : '-'}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedGrievanceId(grievance.id);
                              setCurrentView('details');
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-medium hover:bg-blue-600 transition flex items-center space-x-1 mx-auto"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Details</span>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            // Grievance Details View
            selectedDistrict && grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData] && (
              <div className="mt-6 space-y-6">
                {/* Case Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Overview</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Case ID</label>
                        <p className="text-gray-900 font-semibold">{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].caseId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Contractor</label>
                        <p className="text-gray-900">{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].contractor}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="text-gray-900 flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].location}</span>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          <Flag className="w-3 h-3 mr-1" />
                          {grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].priority}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type</label>
                        <p className="text-gray-900">{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Reported Date</label>
                        <p className="text-gray-900 flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].reportedDate}</span>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Reported By</label>
                        <p className="text-gray-900 flex items-center space-x-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].reportedBy}</span>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grievance Details */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Grievance Details</h3>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Message Description</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].description}
                    </p>
                  </div>
                </div>

                {/* Assigned Officers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Officers</h3>
                  <div className="grid gap-4">
                    {grievanceDetailsData[selectedDistrict as keyof typeof grievanceDetailsData].officers.map((officer, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{officer.name}</h4>
                              <p className="text-sm text-gray-600">{officer.designation}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>📱 {officer.contact}</span>
                                <span>✉️ {officer.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                              Contact
                            </button>
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                              Assign Task
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

