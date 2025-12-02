'use client';

import React from 'react'; // Import React
import { createPortal } from 'react-dom';
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
  DollarSign,
  TrendingUp,
  FileWarning,
  XCircle, // Added for Reset
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

// --- MOCK DATA & TYPES ---

interface SummaryMetric {
  title: string;
  metric: string;
  icon: React.ElementType;
  color: string;
  bgColor: string; // Added for icon background
}

interface CompensationAlert {
    workerName: string;
    incidentId: string;
    amountSanctioned: number;
    paid: 'No'; // Alerts are for pending
    daysPending: number;
    policeStation: string;
}

interface CompensationLedgerEntry {
    slNo: number;
    workerName: string;
    incidentId: string;
    firNo: string;
    amountSanctioned: number;
    paid: 'Yes' | 'No';
    datePaid: string; // Can be '---' or a date
    remarks: string;
  // Additional fields for View Incident modal
  dateOfIncident?: string;
  location?: string;
  policeStation?: string;
  investigationStatus?: string;
  numberOfDeaths?: number;
  numberOfInjuries?: number;
  workerId?: string;
  category?: string;
  contractor?: string;
  amountReleased?: number;
  amountPending?: number;
  paymentStatus?: 'Paid' | 'Pending';
  paymentDate?: string;
  supportingDocuments?: {
    // file URLs
    sanctionOrderFile?: string;
    paymentProofFile?: string;
    // sanction order metadata
    sanctionNumber?: string;
    sanctionDate?: string;
    sanctionAmount?: number;
    approvingAuthority?: string;
    // payment order metadata
    paymentDate?: string;
    amountReleased?: number;
    paymentMode?: string;
    transactionId?: string;
    certifyingAuthority?: string;
  };
}

interface ChartDataEntry {
    month: string;
    'Total Sanctioned': number;
    'Total Paid': number;
    Pending: number;
}


const summaryMetrics: SummaryMetric[] = [
  { title: 'Total Sanctioned', metric: '₹1,25,00,000', icon: CircleDollarSign, color: 'text-white', bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600' },
  { title: 'Total Paid', metric: '₹98,50,000', icon: CheckCircle2, color: 'text-white', bgColor: 'bg-gradient-to-r from-green-400 to-green-600' },
  { title: 'Total Pending', metric: '₹26,50,000', icon: FileWarning, color: 'text-white', bgColor: 'bg-gradient-to-r from-red-400 to-red-600' },
  { title: 'Cases Awaiting Payment', metric: '14', icon: Clock, color: 'text-white', bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
];

const mockAlertData: CompensationAlert[] = [
  { workerName: 'Ramesh K.', incidentId: 'INC027', amountSanctioned: 500000, paid: 'No', daysPending: 82, policeStation: 'Mumbai Central' },
  { workerName: 'Suresh M.', incidentId: 'INC030', amountSanctioned: 500000, paid: 'No', daysPending: 75, policeStation: 'Lucknow Zone' },
  { workerName: 'Anil G.', incidentId: 'INC039', amountSanctioned: 250000, paid: 'No', daysPending: 61, policeStation: 'Delhi North' },
];

const mockTableData: CompensationLedgerEntry[] = [
  {
    slNo: 1,
    workerName: 'Ramesh K.',
    incidentId: 'INC027',
    firNo: 'FIR-121/2025',
    amountSanctioned: 500000,
    amountReleased: 0,
    amountPending: 500000,
    paid: 'No',
    paymentStatus: 'Pending',
    datePaid: '---',
    paymentDate: '---',
    remarks: 'Pending at treasury',
    dateOfIncident: '2025-07-10',
    location: 'Kurla, Mumbai',
    policeStation: 'Mumbai Central',
    investigationStatus: 'In Progress',
    numberOfDeaths: 0,
    numberOfInjuries: 1,
    workerId: 'WKR-1001',
    category: 'Sanitation Worker',
    contractor: 'CleanCity Pvt Ltd',
    supportingDocuments: {
      sanctionOrderFile: '',
      paymentProofFile: '',
      sanctionNumber: 'SAN-001',
      sanctionDate: '2025-07-15',
      sanctionAmount: 500000,
      approvingAuthority: 'District Nodal Officer',
      paymentDate: '',
      amountReleased: 0,
      paymentMode: '',
      transactionId: '',
      certifyingAuthority: '',
    },
  },
  {
    slNo: 2,
    workerName: 'Vikas P.',
    incidentId: 'INC023',
    firNo: 'FIR-234/2025',
    amountSanctioned: 500000,
    amountReleased: 500000,
    amountPending: 0,
    paid: 'Yes',
    paymentStatus: 'Paid',
    datePaid: '2025-09-15',
    paymentDate: '2025-09-15',
    remarks: 'Paid to next of kin',
    dateOfIncident: '2025-05-21',
    location: 'Gurgaon Sector 12',
    policeStation: 'Gurgaon North',
    investigationStatus: 'Closed',
    numberOfDeaths: 1,
    numberOfInjuries: 0,
    workerId: 'WKR-0987',
    category: 'Contract Labour',
    contractor: 'SafeHands Contractors',
    supportingDocuments: {
      sanctionOrderFile: 'https://example.com/sanction/inc023.pdf',
      paymentProofFile: 'https://example.com/payment/inc023_receipt.pdf',
      sanctionNumber: 'SAN-023',
      sanctionDate: '2025-05-30',
      sanctionAmount: 500000,
      approvingAuthority: 'State Nodal Officer',
      paymentDate: '2025-09-15',
      amountReleased: 500000,
      paymentMode: 'NEFT',
      transactionId: 'TXN-20250915-9876',
      certifyingAuthority: 'Treasury Officer',
    },
  },
  {
    slNo: 3,
    workerName: 'Suresh M.',
    incidentId: 'INC030',
    firNo: 'FIR-145/2025',
    amountSanctioned: 500000,
    amountReleased: 0,
    amountPending: 500000,
    paid: 'No',
    paymentStatus: 'Pending',
    datePaid: '---',
    paymentDate: '---',
    remarks: 'Awaiting District Nodal approval',
    dateOfIncident: '2025-06-02',
    location: 'Lucknow Zone',
    policeStation: 'Lucknow Zone',
    investigationStatus: 'Verification',
    numberOfDeaths: 0,
    numberOfInjuries: 2,
    workerId: 'WKR-1022',
    category: 'Sanitation Worker',
    contractor: 'CityClean Services',
    supportingDocuments: {
      sanctionOrderFile: '',
      paymentProofFile: '',
      sanctionNumber: '',
      sanctionDate: '',
      sanctionAmount: 0,
      approvingAuthority: '',
      paymentDate: '',
      amountReleased: 0,
      paymentMode: '',
      transactionId: '',
      certifyingAuthority: '',
    },
  },
  {
    slNo: 4,
    workerName: 'Amit S.',
    incidentId: 'INC031',
    firNo: 'FIR-235/2025',
    amountSanctioned: 250000,
    amountReleased: 250000,
    amountPending: 0,
    paid: 'Yes',
    paymentStatus: 'Paid',
    datePaid: '2025-10-01',
    paymentDate: '2025-10-01',
    remarks: 'Injury compensation paid',
    dateOfIncident: '2025-08-12',
    location: 'Noida Sector 5',
    policeStation: 'Noida West',
    investigationStatus: 'Closed',
    numberOfDeaths: 0,
    numberOfInjuries: 1,
    workerId: 'WKR-1100',
    category: 'Sanitation Worker',
    contractor: 'Apex Contractors',
    supportingDocuments: {
      sanctionOrderFile: 'https://example.com/sanction/inc031.pdf',
      paymentProofFile: 'https://example.com/payment/inc031_receipt.pdf',
      sanctionNumber: 'SAN-031',
      sanctionDate: '2025-08-25',
      sanctionAmount: 250000,
      approvingAuthority: 'District Nodal Officer',
      paymentDate: '2025-10-01',
      amountReleased: 250000,
      paymentMode: 'Cheque',
      transactionId: 'CHQ-20251001-4455',
      certifyingAuthority: 'Treasury Officer',
    },
  },
  {
    slNo: 5,
    workerName: 'Anil G.',
    incidentId: 'INC039',
    firNo: 'FIR-111/2025',
    amountSanctioned: 250000,
    amountReleased: 0,
    amountPending: 250000,
    paid: 'No',
    paymentStatus: 'Pending',
    datePaid: '---',
    paymentDate: '---',
    remarks: 'Verification in progress',
    dateOfIncident: '2025-09-01',
    location: 'Delhi North',
    policeStation: 'Delhi North',
    investigationStatus: 'Under Investigation',
    numberOfDeaths: 0,
    numberOfInjuries: 1,
    workerId: 'WKR-1155',
    category: 'Sanitation Worker',
    contractor: 'Delhi Cleaners',
    supportingDocuments: {
      sanctionOrderFile: '',
      paymentProofFile: '',
      sanctionNumber: '',
      sanctionDate: '',
      sanctionAmount: 0,
      approvingAuthority: '',
      paymentDate: '',
      amountReleased: 0,
      paymentMode: '',
      transactionId: '',
      certifyingAuthority: '',
    },
  },
];

const chartLineData: ChartDataEntry[] = [
  { month: 'Apr', 'Total Sanctioned': 2000000, 'Total Paid': 1500000, Pending: 500000 },
  { month: 'May', 'Total Sanctioned': 3500000, 'Total Paid': 2500000, Pending: 1000000 },
  { month: 'Jun', 'Total Sanctioned': 4000000, 'Total Paid': 3000000, Pending: 1000000 },
  { month: 'Jul', 'Total Sanctioned': 6500000, 'Total Paid': 5000000, Pending: 1500000 },
  { month: 'Aug', 'Total Sanctioned': 8000000, 'Total Paid': 6500000, Pending: 1500000 },
  { month: 'Sep', 'Total Sanctioned': 10500000, 'Total Paid': 8500000, Pending: 2000000 },
  { month: 'Oct', 'Total Sanctioned': 12500000, 'Total Paid': 9850000, Pending: 2650000 },
];

// Inline IntegratedLoader (same JSX/CSS as components/IntegratedLoader.tsx)
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

// --- HELPER COMPONENTS ---

const YesNoTag = ({ value }: { value: 'Yes' | 'No' }) => {
  const className =
    value === 'Yes'
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-700';
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      {value}
    </span>
  );
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// --- MAIN PAGE COMPONENT ---

export default function CompensationReportPage() {
    // Basic state for handlers (can be expanded for actual filtering)
    const handleRefresh = () => alert("Refreshing data...");
    const handleExport = () => alert("Exporting data...");
    const handleApplyFilters = () => alert("Applying filters...");
    const handleResetFilters = () => alert("Resetting filters...");
    const handleProcessPayment = (incidentId: string) => alert(`Processing payment for ${incidentId}...`);
    const handleViewIncident = (incidentId: string) => {
      const found = mockTableData.find(m => m.incidentId === incidentId);
      if (found) setSelectedIncident(found);
      else alert(`Viewing incident ${incidentId}...`);
    };
    const handleViewWorker = (workerName: string) => {
      const found = mockTableData.find(m => m.workerName === workerName);
      if (found) setSelectedDocIncident(found);
      else alert(`No documents found for worker ${workerName}`);
    };
    const handleMarkAsPaid = (incidentId: string) => alert(`Marking ${incidentId} as paid...`);
    const handleViewDocuments = (incidentId: string) => {
      const found = mockTableData.find(m => m.incidentId === incidentId);
      if (found) setSelectedDocIncident(found);
      else alert(`No documents found for ${incidentId}`);
    };

    // Download full details (JSON) for selected incident
    const handleDownloadDetails = (inc: CompensationLedgerEntry) => {
      try {
        const payload = JSON.stringify(inc, null, 2);
        const blob = new Blob([payload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const fileName = `${inc.incidentId || 'incident'}-details.json`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (err) {
        alert('Failed to download details.');
      }
    };

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(t);
    }, []);

    // Modal root and selected incident state (placed before early return to keep hooks order stable)
    const [modalRoot, setModalRoot] = React.useState<HTMLElement | null>(null);
    const [selectedIncident, setSelectedIncident] = React.useState<CompensationLedgerEntry | null>(null);
    const [selectedDocIncident, setSelectedDocIncident] = React.useState<CompensationLedgerEntry | null>(null);

    React.useEffect(() => {
      const root = document.getElementById('modal-root') || document.body;
      setModalRoot(root as HTMLElement);
    }, []);

    if (loading) return <IntegratedLoader />;
    // Build modal outside return
    let ViewIncidentModal: React.ReactNode = null;
    if (selectedIncident) {
      const doc = selectedIncident.supportingDocuments || {};
      const pending = selectedIncident.amountPending ?? (selectedIncident.amountSanctioned - (selectedIncident.amountReleased ?? 0));
      const modalContent = (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
            onClick={() => setSelectedIncident(null)}
          />
          <div className="relative bg-white/95 rounded-lg shadow-2xl border border-slate-200 p-4 sm:p-6 max-w-4xl w-full max-h-[86vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900">Incident Details</h2>
              <button onClick={() => setSelectedIncident(null)} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>

            <div className="space-y-4">
              {/* 1) Incident Info */}
              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Incident Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Incident ID</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.incidentId}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Date of Incident</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.dateOfIncident || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Location</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.location || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Police Station</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.policeStation || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">FIR Number</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.firNo || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Investigation Status</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.investigationStatus || 'N/A'}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Outcome (Deaths / Injuries)</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.numberOfDeaths ?? 0} / {selectedIncident.numberOfInjuries ?? 0}</div>
                  </div>
                </div>
              </section>

              {/* 2) Worker Info */}
              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Worker Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Name</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.workerName}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Worker ID</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.workerId || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Category</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.category || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Contractor</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.contractor || 'N/A'}</div>
                  </div>
                </div>
              </section>

              {/* 3) Compensation Details */}
              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Compensation Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Amount Sanctioned</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{formatCurrency(selectedIncident.amountSanctioned)}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Amount Released</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.amountReleased ? formatCurrency(selectedIncident.amountReleased) : '₹0'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Amount Pending</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{pending ? formatCurrency(pending) : '₹0'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Payment Status</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.paymentStatus || selectedIncident.paid || 'Pending'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Payment Date</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedIncident.paymentDate || selectedIncident.datePaid || 'N/A'}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Remarks</span>
                    <div className="text-sm text-slate-900 mt-1">{selectedIncident.remarks || 'N/A'}</div>
                  </div>
                </div>
              </section>

              {/* 4) Supporting Documents */}
              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Supporting Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Sanction Order</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{doc.sanctionOrderFile ? (<a href={doc.sanctionOrderFile} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View</a>) : 'None'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Payment Proof</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{doc.paymentProofFile ? (<a href={doc.paymentProofFile} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View</a>) : 'None'}</div>
                    </div>
                </div>
              </section>
            </div>

            <div className="flex justify-end pt-4 mt-3">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-5 py-2 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );

      ViewIncidentModal = modalRoot ? createPortal(modalContent, modalRoot) : modalContent;
    }

    // Document View modal
    let DocumentViewModal: React.ReactNode = null;
    if (selectedDocIncident) {
      const d = selectedDocIncident.supportingDocuments || {};
      const docContent = (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
            onClick={() => setSelectedDocIncident(null)}
          />
          <div className="relative bg-white/95 rounded-lg shadow-2xl border border-slate-200 p-4 sm:p-6 max-w-2xl w-full max-h-[86vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900">Document View</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => selectedDocIncident && handleDownloadDetails(selectedDocIncident)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm text-slate-700"
                >
                  Download Details
                </button>
                <button onClick={() => setSelectedDocIncident(null)} className="text-gray-600 hover:text-gray-900">&times;</button>
              </div>
            </div>

            <div className="space-y-4">
              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Sanction Order</h3>
                <div className="grid grid-cols-1 gap-2 bg-white/60 rounded-xl p-3 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Sanction Number</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.sanctionNumber || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Sanction Date</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.sanctionDate || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Amount</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.sanctionAmount ? formatCurrency(d.sanctionAmount) : 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Worker Name</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{selectedDocIncident.workerName}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Category</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{selectedDocIncident.category || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Incident ID</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{selectedDocIncident.incidentId}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">FIR Number</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{selectedDocIncident.firNo || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Approving Authority</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.approvingAuthority || 'N/A'}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Sanction Order File</span>
                    <div className="text-sm font-semibold text-slate-900 mt-2">
                      {d.sanctionOrderFile ? (
                        <div className="space-y-2">
                          {d.sanctionOrderFile.toLowerCase().includes('.pdf') ? (
                            <div className="w-full h-64 border rounded overflow-hidden">
                              <iframe src={d.sanctionOrderFile} className="w-full h-full" title="Sanction Order Preview" />
                            </div>
                          ) : (
                            <img src={d.sanctionOrderFile} alt="Sanction Order" className="max-h-64 object-contain border rounded" />
                          )}
                          <div>
                            <a href={d.sanctionOrderFile} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open / Download</a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500">No file attached</div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-md font-bold text-indigo-700 mb-2">Payment Order</h3>
                <div className="grid grid-cols-1 gap-2 bg-white/60 rounded-xl p-3 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Payment Date</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.paymentDate || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Amount Released</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.amountReleased ? formatCurrency(d.amountReleased) : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Mode</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.paymentMode || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 uppercase">Transaction ID</span>
                      <div className="text-sm font-semibold text-slate-900 mt-1">{d.transactionId || 'N/A'}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Certifying Authority</span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">{d.certifyingAuthority || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase">Payment Proof File</span>
                    <div className="text-sm font-semibold text-slate-900 mt-2">
                      {d.paymentProofFile ? (
                        <div className="space-y-2">
                          {d.paymentProofFile.toLowerCase().includes('.pdf') ? (
                            <div className="w-full h-64 border rounded overflow-hidden">
                              <iframe src={d.paymentProofFile} className="w-full h-full" title="Payment Proof Preview" />
                            </div>
                          ) : (
                            <img src={d.paymentProofFile} alt="Payment Proof" className="max-h-64 object-contain border rounded" />
                          )}
                          <div>
                            <a href={d.paymentProofFile} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open / Download</a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500">No file attached</div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex justify-end pt-4 mt-3">
              <button
                onClick={() => setSelectedDocIncident(null)}
                className="px-5 py-2 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );

      DocumentViewModal = modalRoot ? createPortal(docContent, modalRoot) : docContent;
    }

    return (
    <div className="flex-1 space-y-10 p-6 md:p-10 pt-8 text-slate-900 dark:text-slate-50">
      {ViewIncidentModal}
      {DocumentViewModal}
      {/* District-style banner (taller, gradient, gap below) */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* spacer to keep the title aligned where the icon used to be */}
          <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compensation Report</h1>
            <p className="text-sm opacity-90 mt-1">Overview and latest compensation cases</p>
          </div>
        </div>
        <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
      </div>
        {/* 1️⃣ Header & Filter Controls */}
      <div className="space-y-6">
        {/* Top Bar: Buttons only (title is provided by the banner above) - container removed, responsive */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 p-2 md:p-0">
          <button
              onClick={handleExport}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium transform hover:scale-105">
            <Download size={16} />
            Export (CSV/PDF)
          </button>
          <button
              onClick={handleRefresh}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium transform hover:scale-105">
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300"><Filter size={18} /> Filters</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Search Box */}
                <div className="relative lg:col-span-2">
                    <label htmlFor="search-compensation" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Search Worker/FIR</label>
                    <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                        <Search className="text-slate-400 dark:text-slate-500" size={18} />
                    </div>
                    <input
                        id="search-compensation"
                        type="text"
                        placeholder="Search Worker Name, FIR No..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                       <label htmlFor="filter-station" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Police Station</label>
                    <select id="filter-station" className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>All Stations</option>
                        {/* Add station options here */}
                    </select>
                </div>
                 <div>
                    <label htmlFor="filter-status" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Payment Status</label>
                    <select id="filter-status" className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>All Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                    </select>
                 </div>
                 {/* Add more filters similarly if needed (Date Range, Worker Cat, Incident Type) */}
                 <div className="flex gap-2 lg:col-start-4">
                     <button
                        onClick={handleApplyFilters}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm font-medium">
                        <Filter size={16} /> Apply
                    </button>
                    <button
                        onClick={handleResetFilters}
                        title="Reset Filters"
                        className="px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                        <XCircle size={18} />
                    </button>
                 </div>
            </div>
        </div>


        {/* Quick Summary Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sanctioned"
            value="₹1,25,00,000"
            icon={CircleDollarSign}
            color="blue"
          />
          <StatCard
            title="Total Paid"
            value="₹98,50,000"
            icon={CheckCircle2}
            color="green"
          />
          <StatCard
            title="Total Pending"
            value="₹26,50,000"
            icon={FileWarning}
            color="red"
          />
          <StatCard
            title="Cases Awaiting Payment"
            value="14"
            icon={Clock}
            color="amber"
          />
        </div>
      </div>

      {/* 4. Compensation Alerts (UI Enrichment Layer) */}
      <div className="bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 dark:from-red-900/30 dark:via-rose-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-700 rounded-xl shadow-lg p-8 space-y-6">
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200 flex items-center gap-3">
          <AlertTriangle />
          Compensation Alerts (Pending {'>'} 60 Days)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b-2 border-red-200 dark:border-red-600">
              <tr>
                {["Worker Name", "Incident ID", "Police Station", "Amount Sanctioned", "Days Pending", "Actions"].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="pb-3 text-left text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAlertData.map((row) => (
                <tr
                  key={row.incidentId}
                  className="hover:bg-red-100/70 dark:hover:bg-red-900/50 border-b border-red-100 dark:border-red-800 last:border-b-0"
                >
                  <td className="py-4 whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {row.workerName}
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {row.incidentId}
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {row.policeStation}
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-200">
                    {formatCurrency(row.amountSanctioned)}
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm font-bold text-red-600 dark:text-red-400">
                    {row.daysPending} days
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleProcessPayment(row.incidentId)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors text-xs font-medium transform hover:scale-105">
                      <DollarSign size={14} />
                      Process Payment
                    </button>
                  </td>
                </tr>
              ))}
                {mockAlertData.length === 0 && (
                   <tr>
                     <td colSpan={6} className="text-center py-6 text-slate-500 dark:text-slate-400">
                         No alerts for compensation pending over 60 days.
                     </td>
                   </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Compensation Tracker Line Chart (Visualisation) */}
      {/* <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-200">
          <TrendingUp className="text-green-500" />
          Compensation Tracker (Monthly)
        </h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartLineData}
              margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.1}
                className="stroke-slate-400 dark:stroke-slate-600"
              />
              <XAxis
                dataKey="month"
                className="text-xs"
                stroke="currentColor"
                tick={{ fill: '#64748b' }} // slate-500
              />
              <YAxis
                className="text-xs"
                stroke="currentColor"
                tick={{ fill: '#64748b' }} // slate-500
                tickFormatter={(value) => `₹${value / 100000}L`}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)", // More opaque
                  border: "1px solid #cbd5e1", // slate-300
                  borderRadius: "0.75rem", // Larger radius
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)", // More shadow
                }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }} // slate-800
                  itemStyle={{ fontSize: '12px' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="Total Sanctioned"
                stroke="#3B82F6" // blue-500
                strokeWidth={3}
                dot={{ r: 4, fill: '#3B82F6' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Total Paid"
                stroke="#10B981" // green-500
                strokeWidth={3}
                dot={{ r: 4, fill: '#10B981' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Pending"
                stroke="#EF4444" // red-500
                strokeWidth={3}
                dot={{ r: 4, fill: '#EF4444' }}
                  activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* 1. Compensation Report Tabular Format (Report 7) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <h3 className="text-xl font-bold p-6 text-slate-800 dark:text-slate-200">
          Detailed Compensation Ledger
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-100 dark:bg-slate-900/50">
              <tr>
                {["Sl. No.", "Worker Name", "Incident ID", "FIR No", "Amount Sanctioned", "Paid", "Date Paid", "Remarks", "Actions"].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockTableData.map((row) => (
                <tr
                  key={row.slNo}
                  className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors duration-150 even:bg-slate-50/70 dark:even:bg-slate-900/20"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {row.slNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {row.workerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {row.incidentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {row.firNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-200">
                    {formatCurrency(row.amountSanctioned)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <YesNoTag value={row.paid} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {row.datePaid}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate" title={row.remarks}>
                    {row.remarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1.5">
                      <button
                        onClick={() => handleViewIncident(row.incidentId)}
                        title="View Incident"
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                      >
                        <Eye size={16} />
                      </button>
                    
                    <button
                      onClick={() => handleViewWorker(row.workerName)}
                      title="View Worker Profile"
                      className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                    >
                      <FileText size={16} />
                    </button>
                    {row.paid === "No" && (
                      <button
                        onClick={() => handleMarkAsPaid(row.incidentId)}
                        title="Mark as Paid"
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
                {mockTableData.length === 0 && (
                       <tr>
                         <td colSpan={9} className="text-center py-10 text-slate-500 dark:text-slate-400">
                             No compensation records found.
                         </td>
                       </tr>
                )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing 1 to 5 of 245 results
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
              Previous
            </button>
            <button className="px-4 py-2 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

