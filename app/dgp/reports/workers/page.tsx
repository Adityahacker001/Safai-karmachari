'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import StatCard from '@/components/ui/stat-card';
import {
  Home,
  ChevronRight,
  Shield,
  Filter,
  RotateCcw,
  RefreshCw,
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
  ChevronDown,
  FileSpreadsheet
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
 * Enhanced Header section with colorful gradient styling.
 */
const Header = () => (
  <div className="mb-4 sm:mb-6 lg:mb-8 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-2xl sm:rounded-3xl"></div>
    <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl leading-tight">
          Total Workers Report
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold mt-2 lg:mt-3 drop-shadow-lg">
          State-wide Safai Karmachari worker & case-link monitoring
        </p>
      </div>
      <nav className="text-xs sm:text-sm font-bold text-white" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border border-white/30 shadow-lg">
          <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Dashboard</a></li>
          <li><ChevronRight size={14} className="sm:hidden text-white/70" /></li>
          <li><ChevronRight size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
          <li><a href="#" className="hover:text-yellow-300 transition-colors drop-shadow-md">Reports & Analytics</a></li>
          <li><ChevronRight size={14} className="sm:hidden text-white/70" /></li>
          <li><ChevronRight size={18} className="hidden sm:block text-white/70 drop-shadow-md" /></li>
          <li className="font-black text-yellow-300 drop-shadow-md">Total Workers Report</li>
        </ol>
      </nav>
    </div>
  </div>
);

/**
 * Enhanced Filter panel component with colorful styling.
 */
const FilterPanel = ({ searchTerm, setSearchTerm, handleResetFilters }: { 
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleResetFilters: () => void;
}) => (
  <div className="mb-4 sm:mb-6 lg:mb-8 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-2xl">
    <div className="p-3 sm:p-4 lg:p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Filter Workers
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <select className="form-select-sm">
            <option>All Districts</option>
            <option>Lucknow</option>
            <option>Kanpur</option>
            <option>Varanasi</option>
            <option>Agra</option>
          </select>
          <select className="form-select-sm">
            <option>All Categories</option>
            <option>Manual Scavenger</option>
            <option>Sewer Worker</option>
            <option>Hazardous SK</option>
            <option>Other SKs</option>
          </select>
          <select className="form-select-sm">
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className="form-select-sm">
            <option>All Incidents</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <select className="form-select-sm">
            <option>All FIR Status</option>
            <option>Filed</option>
            <option>Not Filed</option>
          </select>
          <select className="form-select-sm">
            <option>All Compensation</option>
            <option>Paid</option>
            <option>Sanctioned</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="flex items-center justify-start mt-4 pt-4 border-t border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Filter size={14} className="sm:hidden" />
              <Filter size={16} className="hidden sm:block" />
              <span className="hidden sm:inline">Apply Filters</span>
              <span className="sm:hidden">Filter</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, rotate: 180 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleResetFilters}
            >
              <RefreshCw size={14} className="sm:hidden" />
              <RefreshCw size={16} className="hidden sm:block lg:hidden" />
              <RefreshCw size={18} className="hidden lg:block" />
            </motion.button>
          </div>
        </div>
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
const WorkersTable = ({ onViewDetails, searchTerm, setSearchTerm }: { 
  onViewDetails: (worker: typeof mockWorkers[0]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
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

  const filteredWorkers = useMemo(() => {
    if (!searchTerm) return mockWorkers;
    
    const searchLower = searchTerm.toLowerCase();
    return mockWorkers.filter(worker => 
      worker.name.toLowerCase().includes(searchLower) ||
      worker.category.toLowerCase().includes(searchLower) ||
      worker.contractor.toLowerCase().includes(searchLower) ||
      worker.district.toLowerCase().includes(searchLower) ||
      worker.incidentLinked.toLowerCase().includes(searchLower) ||
      (worker.incidentType && worker.incidentType.toLowerCase().includes(searchLower)) ||
      worker.firFiled.toLowerCase().includes(searchLower) ||
      (worker.firNumber && worker.firNumber.toLowerCase().includes(searchLower)) ||
      (worker.policeStation && worker.policeStation.toLowerCase().includes(searchLower)) ||
      (worker.chargesheetStatus && worker.chargesheetStatus.toLowerCase().includes(searchLower)) ||
      (worker.incidentDate && worker.incidentDate.toLowerCase().includes(searchLower)) ||
      (worker.location && worker.location.toLowerCase().includes(searchLower)) ||
      worker.compensationStatus.toLowerCase().includes(searchLower) ||
      (worker.compensationAmount && worker.compensationAmount.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-500/20 overflow-hidden">
      {/* Search Bar Above Table */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80">
        <div className="relative flex-grow sm:flex-grow-0">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search workers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold shadow-lg transition-all duration-300"
          >
            <FileDown size={16} />
            Export PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold shadow-lg transition-all duration-300"
          >
            <FileSpreadsheet size={16} />
            Export Excel
          </motion.button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white sticky top-0 backdrop-blur-sm">
            <tr>
              {[
                'Sl. No.', 'Worker Name', 'Category', 'Contractor', 'District',
                'Incident Linked', 'Incident Type', 'FIR Filed', 'Compensation Status', 'Actions'
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-bold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWorkers.map((worker, index) => (
              <motion.tr 
                key={worker.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                  scale: 1.005,
                }}
                className="cursor-pointer transition-all duration-300 hover:bg-blue-50/50"
              >
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
              </motion.tr>
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
export default function WorkersReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<typeof mockWorkers[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // --- IntegratedLoader logic (no bg, no transparency) ---
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 font-inter">
      <div className="max-w-screen-2xl mx-auto relative">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IntegratedLoader />
          </div>
        )}
        {!loading && (
          <>
            <Header />
            <SummaryCards />
            <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleResetFilters={() => setSearchTerm('')} />
            <WorkersTable onViewDetails={worker => { setSelectedWorker(worker); setIsModalOpen(true); }} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Pagination />
            <div className="mt-6 text-center text-xs text-gray-500">
              Data verified by DGP Office
            </div>
          </>
        )}
      </div>
      <WorkerDetailModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedWorker(null); }}
        worker={selectedWorker}
      />
      {/* --- Global Styles --- */}
      <style jsx global>{`
        /* Form Input Styling */
        .form-input, .form-select, .form-input-sm, .form-select-sm {
          width: 100%;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input, .form-select {
           padding: 0.65rem 1rem;
        }
        .form-input-sm, .form-select-sm {
           padding: 0.5rem 0.75rem;
           font-size: 0.8rem;
        }
        .form-input:focus, .form-select:focus, .form-input-sm:focus, .form-select-sm:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
        }
        .form-select, .form-select-sm {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
}
