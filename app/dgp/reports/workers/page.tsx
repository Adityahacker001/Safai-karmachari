'use client';

import React, { useState } from 'react';
import StatCard from '@/components/ui/stat-card';
import {
  Home,
  ChevronRight,
  Shield,
  Filter,
  RotateCcw,
  FileDown,
  Users,
  Briefcase,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  X,
  Download,
  Search,
  ChevronDown
} from 'lucide-react';

// --- Mock Data ---
const mockWorkers = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    category: 'Sewer Worker',
    contractor: 'ABC Infra Ltd.',
    district: 'Lucknow',
    incidentLinked: 'Yes',
    incidentType: 'Death',
    firFiled: 'Yes',
    firNumber: 'FIR-00123/2024',
    policeStation: 'Hazratganj',
    chargesheetStatus: 'Filed',
    incidentDate: '2024-03-15',
    location: 'Sewer Line, Sector B, Gomti Nagar',
    compensationStatus: 'Paid',
    compensationAmount: '10,00,000',
    paymentDate: '2024-04-20',
  },
  {
    id: 2,
    name: 'Suresh Singh',
    category: 'Manual Scavenger',
    contractor: 'XYZ Services',
    district: 'Kanpur',
    incidentLinked: 'Yes',
    incidentType: 'Injury',
    firFiled: 'Yes',
    firNumber: 'FIR-00098/2024',
    policeStation: 'Kanpur Central',
    chargesheetStatus: 'Pending',
    incidentDate: '2024-02-10',
    location: 'Main Hole, Civil Lines',
    compensationStatus: 'Sanctioned',
    compensationAmount: '2,00,000',
    paymentDate: 'Pending',
  },
  {
    id: 3,
    name: 'Deepak Verma',
    category: 'Hazardous SK',
    contractor: 'CleanFlow Inc.',
    district: 'Varanasi',
    incidentLinked: 'No',
    incidentType: 'N/A',
    firFiled: 'N/A',
    compensationStatus: 'N/A',
  },
  {
    id: 4,
    name: 'Amit Patel',
    category: 'Regular SK',
    contractor: 'ABC Infra Ltd.',
    district: 'Agra',
    incidentLinked: 'No',
    incidentType: 'N/A',
    firFiled: 'N/A',
    compensationStatus: 'N/A',
  },
  {
    id: 5,
    name: 'Vijay Bahadur',
    category: 'Sewer Worker',
    contractor: 'XYZ Services',
    district: 'Lucknow',
    incidentLinked: 'Yes',
    incidentType: 'Hazard Exposure',
    firFiled: 'No',
    firNumber: 'N/A',
    policeStation: 'N/A',
    chargesheetStatus: 'N/A',
    incidentDate: '2024-05-01',
    location: 'Manhole, Aliganj',
    compensationStatus: 'Pending',
    compensationAmount: 'Pending',
    paymentDate: 'Pending',
  },
];

// --- Reusable Components ---

/**
 * A color-coded badge for status fields.
 * @param {object} props
 * @param {'green' | 'red' | 'amber' | 'blue' | 'gray'} props.color - Color theme
 * @param {string} props.text - Text to display
 * @param {string} [props.className] - Additional classes
 */
const StatusBadge = ({ color = 'gray', text, className = '' }: { color: 'green' | 'red' | 'amber' | 'blue' | 'gray'; text: string; className?: string }) => {
  const colorClasses: { [key in 'green' | 'red' | 'amber' | 'blue' | 'gray']: string } = {
    green: 'bg-green-100 text-green-800 ring-green-500/20',
    red: 'bg-red-100 text-red-800 ring-red-500/20',
    amber: 'bg-yellow-100 text-yellow-800 ring-yellow-500/20',
    blue: 'bg-blue-100 text-blue-800 ring-blue-500/20',
    gray: 'bg-gray-100 text-gray-800 ring-gray-500/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        colorClasses[color]
      } ${className}`}
    >
      {text}
    </span>
  );
};



/**
 * A styled dropdown for the filter panel.
 */
const FilterDropdown = ({ label, options, icon }: { label: string; options: string[]; icon?: React.ReactNode }) => (
  <div className="w-full">
    <label htmlFor={label} className="block text-xs font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon || <ChevronDown size={16} className="text-gray-400" />}
      </div>
      <select
        id={label}
        name={label}
        className="block w-full rounded-md border-gray-300 py-2 pl-10 pr-8 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option>All</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

/**
 * A styled button.
 */
const Button = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'danger'; className?: string }) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const variants: { [key in 'primary' | 'secondary' | 'danger']: string } = {
    primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  return (
    <button type="button" onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- Page Sections ---

/**
 * Header section with title, breadcrumbs, and badge.
 */
const Header = () => (
  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Total Workers Report</h1>
        <p className="mt-1 text-sm text-gray-500">
          State-wide Safai Karmachari worker & case-link monitoring
        </p>
      </div>
      <div className="mt-3 sm:mt-0">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          <Shield size={16} className="mr-1.5" />
          DGP State View — Full Access
        </span>
      </div>
    </div>
    <nav className="mt-2 flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        <li>
          <a href="#" className="hover:text-gray-700 flex items-center">
            <Home size={16} className="mr-1.5" />
            Dashboard
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight size={16} />
            <a href="#" className="ml-1 hover:text-gray-700">
              Reports & Analytics
            </a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight size={16} />
            <span className="ml-1 text-gray-700 font-medium">Total Workers Report</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
);

/**
 * Filter panel component.
 */
const FilterPanel = () => (
  <div className="mb-6 rounded-lg bg-white p-4 shadow-sm border border-gray-200">
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
      <FilterDropdown label="District" options={["Lucknow", "Kanpur", "Varanasi", "Agra"]} icon={null} />
      <FilterDropdown label="Worker Category" options={["Manual Scavenger", "Sewer Worker", "Hazardous", "Other SKs"]} icon={null} />
      <FilterDropdown label="Year / Period" options={["2024", "2023", "2022"]} icon={null} />
      <FilterDropdown label="Incident Linked" options={["Yes", "No"]} icon={null} />
      <FilterDropdown label="FIR Status" options={["Filed", "Not Filed"]} icon={null} />
      <FilterDropdown label="Compensation" options={["Paid", "Sanctioned", "Pending"]} icon={null} />
    </div>
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-4">
      <div className="flex gap-2">
        <Button variant="primary" onClick={() => console.log('Apply Filter clicked')}>
          <Filter size={16} className="mr-2" />
          Apply Filter
        </Button>
        <Button variant="secondary" onClick={() => console.log('Reset clicked')}>
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>
      </div>
      <div className="flex gap-2 mt-3 sm:mt-0">
        <Button variant="secondary" onClick={() => console.log('Export PDF clicked')}>
          <FileDown size={16} className="mr-2" />
          Export PDF
        </Button>
        <Button variant="secondary" onClick={() => console.log('Export Excel clicked')}>
          <FileDown size={16} className="mr-2" />
          Export Excel
        </Button>
      </div>
    </div>
  </div>
);

/**
 * Summary statistics cards section.
 */
const SummaryCards = () => (
  <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    <StatCard
      title="Total Workers"
      value="1,24,560"
      icon={Users}
      color="green"
    />
    <StatCard
      title="Incident-Linked"
      value="482"
      icon={AlertTriangle}
      color="red"
    />
    <StatCard
      title="FIR Filed"
      value="390"
      icon={FileText}
      color="red"
    />
    <StatCard
      title="Compensation Paid"
      value="310"
      icon={CheckCircle}
      color="green"
    />
    <StatCard
      title="Pending Compensation"
      value="80"
      icon={Clock}
      color="amber"
    />
  </div>
);

/**
 * Main data table component.
 * @param {object} props
 * @param {function} props.onViewDetails - Function to call when "View Details" is clicked.
 */
const WorkersTable = ({ onViewDetails }: { onViewDetails: (worker: typeof mockWorkers[0]) => void }) => {
  /**
   * Helper to get badge color based on status.
   */
  const getBadgeColor = (type: string, status: string): 'green' | 'red' | 'amber' | 'blue' | 'gray' => {
    switch (type) {
      case 'category':
        if (status === 'Sewer Worker' || status === 'Manual Scavenger') return 'red';
        if (status === 'Hazardous SK') return 'amber';
        return 'gray';
      case 'incident':
        return status === 'Yes' ? 'red' : 'green';
      case 'fir':
        return status === 'Yes' ? 'blue' : 'gray';
      case 'compensation':
        if (status === 'Paid') return 'green';
        if (status === 'Sanctioned') return 'blue';
        if (status === 'Pending') return 'amber';
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                'Sl. No.', 'Worker Name', 'Category', 'Contractor', 'District',
                'Incident Linked', 'Incident Type', 'FIR Filed', 'Compensation Status', 'Actions'
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockWorkers.map((worker, index) => (
              <tr key={worker.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{worker.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge color={getBadgeColor('category', worker.category)} text={worker.category} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{worker.contractor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{worker.district}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge color={getBadgeColor('incident', worker.incidentLinked)} text={worker.incidentLinked} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{worker.incidentType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge color={getBadgeColor('fir', worker.firFiled)} text={worker.firFiled} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge color={getBadgeColor('compensation', worker.compensationStatus)} text={worker.compensationStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(worker)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={16} className="mr-1.5" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Worker Detail Modal component.
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {object | null} props.worker - The worker data to display.
 */
const WorkerDetailModal = ({ isOpen, onClose, worker }: { isOpen: boolean; onClose: () => void; worker: typeof mockWorkers[0] | null }) => {
  if (!isOpen || !worker) return null;

  const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value || 'N/A'}</dd>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">{title}</h3>
  );

  const getBadgeColor = (type: string, status: string): 'green' | 'red' | 'amber' | 'blue' | 'gray' => {
    switch (type) {
      case 'category':
        if (status === 'Sewer Worker' || status === 'Manual Scavenger') return 'red';
        if (status === 'Hazardous SK') return 'amber';
        return 'gray';
      case 'incident':
        return status === 'Yes' ? 'red' : 'green';
      case 'fir':
        return status === 'Yes' ? 'blue' : 'gray';
      case 'compensation':
        if (status === 'Paid') return 'green';
        if (status === 'Sanctioned') return 'blue';
        if (status === 'Pending') return 'amber';
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900" id="modal-title">
                Worker Detail: {worker.name}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="max-h-[70vh] overflow-y-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <SectionTitle title="Basic Info" />
                <dl>
                  <DetailItem label="Worker Name" value={worker.name} />
                  <DetailItem label="Category" value={<StatusBadge color={getBadgeColor('category', worker.category)} text={worker.category} />} />
                  <DetailItem label="Contractor Name" value={worker.contractor} />
                  <DetailItem label="District" value={worker.district} />
                </dl>
                <SectionTitle title="Compensation" />
                <dl>
                  <DetailItem 
                    label="Status" 
                    value={<StatusBadge color={getBadgeColor('compensation', worker.compensationStatus)} text={worker.compensationStatus} />} 
                  />
                  <DetailItem label="Amount" value={worker.compensationAmount} />
                  <DetailItem label="Payment Date / Reason" value={worker.paymentDate} />
                </dl>
              </div>
              <div>
                <SectionTitle title="Incident Info" />
                <dl>
                  <DetailItem 
                    label="Incident Linked" 
                    value={<StatusBadge color={getBadgeColor('incident', worker.incidentLinked)} text={worker.incidentLinked} />} 
                  />
                  <DetailItem label="Incident Type" value={worker.incidentType} />
                  <DetailItem label="Incident Date" value={worker.incidentDate} />
                  <DetailItem label="Location" value={worker.location} />
                  <DetailItem label="Police Station" value={worker.policeStation} />
                  <DetailItem label="Case / FIR Number" value={worker.firNumber} />
                  <DetailItem label="Charge-sheet Status" value={worker.chargesheetStatus} />
                </dl>
                <SectionTitle title="Documents / Evidence" />
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-blue-600 hover:underline">
                    <Download size={16} className="mr-2" /> FIR Copy (FIR-00123.pdf)
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:underline">
                    <Download size={16} className="mr-2" /> Compensation Approval (CA-0045.pdf)
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Pagination component.
 */
const Pagination = () => (
  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div className="text-sm text-gray-700">
      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">1,24,560</span> results
    </div>
    <div className="flex gap-2 mt-3 sm:mt-0">
      <Button variant="secondary" onClick={() => console.log('Previous clicked')}>Previous</Button>
      <Button variant="secondary" onClick={() => console.log('Next clicked')}>Next</Button>
    </div>
  </div>
);

/**
 * Main App Component
 */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<typeof mockWorkers[0] | null>(null);

  const handleViewDetails = (worker: typeof mockWorkers[0]) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-screen-2xl mx-auto">
        <Header />
        <FilterPanel />
        <SummaryCards />
        <WorkersTable onViewDetails={handleViewDetails} />
        <Pagination />
        <div className="mt-6 text-center text-xs text-gray-500">
          Data verified by DGP Office
        </div>
      </div>
      <WorkerDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        worker={selectedWorker}
      />
    </div>
  );
}
