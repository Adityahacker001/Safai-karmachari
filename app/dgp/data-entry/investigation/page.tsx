'use client';

import React, { useState, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ChevronRight,
  MapPin,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Calendar,
  UploadCloud,
  Save,
  Send,
  Printer,
  ArrowLeft,
  X,
  File,
  Trash2,
  Building,
  Users,
  CaseSensitive,
  FileBadge,
  BadgePercent,
  Link,
  ClipboardList,
  CalendarClock,
  Landmark,
  UserCheck,
  FilePlus2,
  FileUp,
  Files,
  ArrowRight,
  Loader2,
  FileClock,
  Clock as ValidClock
} from 'lucide-react';

// --- MOCK DATA ---
const mockCaseData = {
  incidentId: "INC-2025-00123",
  caseId: "DGP-CASE-00456",
  incidentDate: "2025-10-28",
  category: "Manual Scavenging Death",
  victimName: "Ramesh Kumar",
  location: "Dwarka Sector 23",
  orgName: "Dwarka-SHG-03",
};

const mockTimeline = {
  startDate: "2025-10-29",
  lastUpdated: "2025-10-30",
};

const districtOptions = [
  { value: "", label: "Select District" },
  { value: "new-delhi", label: "New Delhi" },
  { value: "south-delhi", label: "South Delhi" },
  { value: "dwarka", label: "Dwarka" },
];

const stationOptions: Record<string, { value: string; label: string }[]> = {
  dwarka: [
    { value: "", label: "Select Police Station" },
    { value: "ps-dwarka-n", label: "Dwarka North" },
    { value: "ps-dwarka-s", label: "Dwarka South" },
    { value: "ps-sector-23", label: "Sector 23" },
  ],
  // ... other districts
};

const statusOptions = [
  { value: "initiated", label: "Initiated" },
  { value: "evidence-collection", label: "Evidence Collection" },
  { value: "witness-statements", label: "Witness Statements" },
  { value: "fir-filed", label: "FIR Filed" },
  { value: "chargesheet-prepared", label: "Chargesheet Prepared" },
  { value: "completed", label: "Completed" },
];

const incidentCategoryOptions = [
  { value: "manual-scavenging-death", label: "Manual Scavenging Death" },
  { value: "sewer-injury", label: "Sewer/Septic Tank Injury" },
  { value: "hazardous-exposure", label: "Hazardous Exposure" },
  { value: "other", label: "Other SK-Related Incident" },
];


// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 * Reusable card with glassmorphism, border, and hover-lift animation.
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
}
const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    className={`relative bg-gradient-to-br from-white/95 via-white/90 to-blue-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gradient-to-r from-blue-200/50 via-purple-200/30 to-pink-200/50 overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

/**
 * 2. FormInputGroup Component
 * Standardized wrapper for form inputs.
 */
interface FormInputGroupProps {
  label: string;
  children: React.ReactNode;
  required?: boolean; // Changed to optional
  htmlFor: string;
  className?: string;
}
const FormInputGroup: React.FC<FormInputGroupProps> = ({ label, children, required = false, htmlFor, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={htmlFor} className="mb-1.5 text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {/* <p className="text-xs text-red-500 mt-1">Validation error placeholder</p> */}
  </div>
);

/**
 * 3. StatusBadge Component
 * Displays a styled badge for different statuses.
 */
interface StatusBadgeProps {
  status: "On Track" | "Delayed" | "Critical";
  size?: "sm" | "md" | "lg";
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  // Use Emerald, Amber, Red colors as requested in prompt
  const sizeStyles = size === "sm" ? "px-2.5 py-0.5 text-xs" : size === "lg" ? "px-4 py-1.5 text-base" : "px-3 py-1 text-sm";
  const statusStyles: Record<string, string> = {
    "On Track": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "Delayed": "bg-amber-100 text-amber-800 border-amber-300",
    "Critical": "bg-red-100 text-red-800 border-red-300",
  };
  const statusIcons: Record<string, JSX.Element> = {
    "On Track": <CheckCircle size={14} />,
    "Delayed": <ValidClock size={14} />,
    "Critical": <AlertOctagon size={14} />, // Use AlertOctagon for "Critical"
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${sizeStyles} ${statusStyles[status] || "bg-slate-100 text-slate-800 border-slate-300"}`}>
      {statusIcons[status]} {status}
    </span>
  );
};

/**
 * 4. FileUploadBox Component
 * A drag-and-drop file upload area.
 */
interface FileUploadBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const FileUploadBox: React.FC<FileUploadBoxProps> = ({ title, description, icon }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={() => setIsDragging(false)}
      // Make it more colorful
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300
        ${isDragging ? 'border-blue-600 bg-blue-100 scale-105' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'}`}
    >
      <div className="flex justify-center items-center w-12 h-12 bg-blue-100 text-blue-700 rounded-full mx-auto mb-3">
        {icon}
      </div>
      <p className="font-semibold text-blue-800">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
      <input type="file" className="hidden" />
    </div>
  );
};

/**
 * 5. DatePicker Component
 * A simple styled date input.
 */
interface DatePickerProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
const DatePicker: React.FC<DatePickerProps> = ({ id, value, onChange, disabled = false }) => (
  <input
    type="date"
    id={id}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               disabled:bg-slate-50 disabled:cursor-not-allowed"
  />
);

/**
 * 6. ToggleSwitch Component
 * A boolean toggle switch.
 */
interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  label: string;
  labelSide?: "left" | "right";
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled, label, labelSide = "left" }) => (
  <div className={`flex items-center gap-3 ${labelSide === 'right' ? 'flex-row-reverse' : ''}`}>
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <button
      type="button"
      // Use "police" blue color
      className={`${enabled ? 'bg-blue-700' : 'bg-slate-300'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      onClick={() => setEnabled(!enabled)}
    >
      <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
    </button>
  </div>
);

/**
 * 7. InfoItem Component
 * For read-only data in GlassCards.
 */
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  // Make text more professional (Navy/Slate)
  <div className="flex flex-col bg-slate-100/50 p-3 rounded-lg border border-slate-200">
    <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5"><span className="text-slate-400">{icon}</span> {label}</span>
    <span className="text-base font-semibold text-navy-800 truncate">{value}</span>
  </div>
);

/**
 * 8. Modal Component
 * For submit confirmation.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-navy-900">Confirm Submission</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          <p className="text-slate-600 mb-6">Are you sure you want to submit this investigation update? This action may be final and will notify relevant authorities.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-lg shadow-blue-500/20"
            >
              Confirm & Submit
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * 9. Toast Component
 * For success messages.
 */
interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
}
const Toast: React.FC<ToastProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-10 right-10 z-50 p-4 rounded-xl shadow-2xl bg-emerald-600 text-white flex items-center gap-3"
        >
          <CheckCircle size={20} />
          <span className="font-medium">Update Saved Successfully!</span>
          <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * 10. CardHeader Component
 * A standardized header for GlassCards.
 */
interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
}
// Apply interface
const CardHeader: React.FC<CardHeaderProps> = ({ icon, title }) => (
  // Make header more colorful/professional
  <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
    {/* Use Royal Blue for icon */}
    <span className="text-blue-700">{icon}</span>
    <h3 className="text-base font-semibold text-navy-800">{title}</h3>
  </div>
);


// --- MAIN PAGE COMPONENT ---
export default function InvestigationProgressEntry() {
  // Form State
  const [district, setDistrict] = useState("dwarka");
  const [policeStation, setPoliceStation] = useState("ps-dwarka-n");
  const [investigationOfficer, setInvestigationOfficer] = useState("Insp. Rakesh Sharma");
  const [investigationUnit, setInvestigationUnit] = useState("SK-Case Unit 7");
  const [incidentCategory, setIncidentCategory] = useState("manual-scavenging-death");

  const [investigationStatus, setInvestigationStatus] = useState("evidence-collection");
  const [isFirRegistered, setIsFirRegistered] = useState(false);
  const [firNumber, setFirNumber] = useState("");
  const [firDate, setFirDate] = useState("");

  const [isChargesheetFiled, setIsChargesheetFiled] = useState(false);
  const [chargesheetDate, setChargesheetDate] = useState("");

  const [arrestsMade, setArrestsMade] = useState(0);
  const [investigationSummary, setInvestigationSummary] = useState("");
  const [confidentialRemarks, setConfidentialRemarks] = useState("");

  const [expectedCompletionDate, setExpectedCompletionDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "prelim_report_001.pdf", size: "1.2MB" },
    { name: "witness_statement_01.pdf", size: "0.8MB" },
  ]);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isAttachmentsDrawerOpen, setIsAttachmentsDrawerOpen] = useState(false);

  const availableStations = stationOptions[district] || [];

  const handleSaveDraft = () => {
    // Logic to save draft
    setIsToastVisible(true);
  };

  const handleSubmit = () => {
    // Logic to submit
    setIsModalOpen(false); // Close modal
    setIsToastVisible(true); // Show success toast
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
    >
      {/* --- Enhanced Sticky Header --- */}
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-b-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl px-3 sm:px-4 md:px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-500/20"></div>
        <div className="relative z-10 mx-auto max-w-7xl py-4 sm:py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs sm:text-sm font-medium text-white/90 overflow-x-auto" aria-label="Breadcrumb">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
              DGP Dashboard
            </a>
            <ChevronRight size={12} className="mx-1.5 sm:hidden text-white/70" />
            <ChevronRight size={16} className="hidden sm:block mx-2 text-white/70" />
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              Data Entry
            </a>
            <ChevronRight size={12} className="mx-1.5 sm:hidden text-white/70" />
            <ChevronRight size={16} className="hidden sm:block mx-2 text-white/70" />
            <span className="text-white font-bold whitespace-nowrap flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
              Investigation Feedback
            </span>
          </nav>
          {/* Title */}
          <div className="flex items-start gap-4 mt-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/40">
              <ShieldCheck size={24} className="sm:hidden" />
              <ShieldCheck size={32} className="hidden sm:block" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-white break-words leading-tight">
                Investigation Feedback Entry
              </h1>
              <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed font-medium">
                🎯 Log and update investigation details for SKs, SHGs, and Public
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

            {/* --- Left Column (Main Form) --- */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">

              {/* 1. Case Jurisdiction Block */}
              <GlassCard>
                <CardHeader icon={<Landmark size={20} />} title="Case Jurisdiction" />
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormInputGroup label="District" htmlFor="district" required>
                    <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select">
                      {districtOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </FormInputGroup>
                  <FormInputGroup label="Police Station" htmlFor="policeStation" required>
                    <select id="policeStation" value={policeStation} onChange={(e) => setPoliceStation(e.target.value)} className="form-select" disabled={!district}>
                      {availableStations.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </FormInputGroup>
                  <FormInputGroup label="Assigned Investigation Officer (I.O.)" htmlFor="io" required>
                    <input type="text" id="io" value={investigationOfficer} onChange={(e) => setInvestigationOfficer(e.target.value)} className="form-input" />
                  </FormInputGroup>
                  {/* Made this field optional as requested in prompt */}
                  <FormInputGroup label="Investigation Unit (Optional)" htmlFor="unit">
                    <input type="text" id="unit" value={investigationUnit} onChange={(e) => setInvestigationUnit(e.target.value)} className="form-input" />
                  </FormInputGroup>
                </div>
              </GlassCard>

              {/* 2. Incident & Case Linking */}
              <GlassCard noHover>
                <CardHeader icon={<Link size={20} />} title="Incident & Case Linking (Read-Only)" />
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 bg-slate-50/50">
                  <InfoItem icon={<FileText size={16} />} label="Incident ID" value={mockCaseData.incidentId} />
                  <InfoItem icon={<FileBadge size={16} />} label="Case ID" value={mockCaseData.caseId} />
                  <InfoItem icon={<Calendar size={16} />} label="Incident Date" value={mockCaseData.incidentDate} />
                  <InfoItem icon={<User size={16} />} label="Victim/Complainant" value={mockCaseData.victimName} />
                  <InfoItem icon={<MapPin size={16} />} label="Location" value={mockCaseData.location} />
                  <InfoItem icon={<Building size={16} />} label="SHG / Urban Body" value={mockCaseData.orgName} />
                </div>
              </GlassCard>

              {/* 3. Investigation Update Form */}
              <GlassCard>
                <CardHeader icon={<ClipboardList size={20} />} title="Investigation Update" />
                <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormInputGroup label="Incident Category" htmlFor="incidentCategory" required>
                      <select id="incidentCategory" value={incidentCategory} onChange={(e) => setIncidentCategory(e.target.value)} className="form-select">
                        {incidentCategoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </FormInputGroup>
                    <FormInputGroup label="Investigation Status" htmlFor="status" required>
                      <select id="status" value={investigationStatus} onChange={(e) => setInvestigationStatus(e.target.value)} className="form-select">
                        {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </FormInputGroup>
                  </div>
                  
                  <div className="border-t border-slate-200 -mx-4 sm:-mx-6"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
                    <ToggleSwitch enabled={isFirRegistered} setEnabled={setIsFirRegistered} label="FIR Registered?" />
                    <AnimatePresence>
                      {isFirRegistered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                          <FormInputGroup label="FIR Number" htmlFor="firNumber" required>
                            <input type="text" id="firNumber" value={firNumber} onChange={(e) => setFirNumber(e.target.value)} className="form-input" />
                          </FormInputGroup>
                          <FormInputGroup label="FIR Filed Date" htmlFor="firDate" required>
                            <DatePicker id="firDate" value={firDate} onChange={(e) => setFirDate(e.target.value)} />
                          </FormInputGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <ToggleSwitch enabled={isChargesheetFiled} setEnabled={setIsChargesheetFiled} label="Charge Sheet Filed?" />
                    <AnimatePresence>
                      {isChargesheetFiled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                          <FormInputGroup label="Charge Sheet Date" htmlFor="chargesheetDate" required>
                            <DatePicker id="chargesheetDate" value={chargesheetDate} onChange={(e) => setChargesheetDate(e.target.value)} />
                          </FormInputGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-slate-200 -mx-6"></div>

                  <FormInputGroup label="Arrests Made (Count)" htmlFor="arrests" required>
                    <input type="number" id="arrests" value={arrestsMade} onChange={(e) => setArrestsMade(parseInt(e.target.value))} className="form-input w-full md:w-1/3" min="0" />
                  </FormInputGroup>

                  <FormInputGroup label="Investigation Summary (Public)" htmlFor="summary" required>
                    <textarea id="summary" value={investigationSummary} onChange={(e) => setInvestigationSummary(e.target.value)} className="form-textarea" rows={4} placeholder="Enter key findings, progress, and public-facing details..."></textarea>
                  </FormInputGroup>

                  <FormInputGroup label="Confidential Officer Remarks (Internal)" htmlFor="remarks" required>
                    <textarea id="remarks" value={confidentialRemarks} onChange={(e) => setConfidentialRemarks(e.target.value)} className="form-textarea" rows={3} placeholder="Enter internal notes, sensitive information, or next steps..."></textarea>
                  </FormInputGroup>
                </div>
              </GlassCard>

              {/* 5. Evidence & Attachments */}
              <GlassCard>
                <CardHeader icon={<Files size={20} />} title="Evidence & Attachments" />
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <FileUploadBox title="Medical / Post-mortem Report" description="Upload PDF, DOCX" icon={<FilePlus2 size={24} />} />
                    <FileUploadBox title="Charge Sheet Document" description="Upload PDF" icon={<FileBadge size={24} />} />
                    <FileUploadBox title="Witness Statements" description="Upload PDF, DOCX" icon={<Users size={24} />} />
                    <FileUploadBox title="Image / Video Evidence" description="Upload JPG, PNG, MP4" icon={<FileUp size={24} />} />
                  </div>
                  <h4 className="font-medium text-slate-700 mb-3">Uploaded Files</h4>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-100 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <File size={18} className="text-blue-700" />
                          <span className="text-sm font-medium text-slate-800">{file.name}</span>
                          <span className="text-xs text-slate-500">({file.size})</span>
                        </div>
                        <button type="button" className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </GlassCard>

            </div>

            {/* --- Right Column (Sidebar) --- */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-28">
              
              {/* 6. Timeline Tracking */}
              <GlassCard>
                <CardHeader icon={<CalendarClock size={20} />} title="Timeline & Status" />
                <div className="p-6 flex flex-col gap-5">
                  <InfoItem icon={<Calendar size={16} />} label="Investigation Start Date" value={mockTimeline.startDate} />
                  <InfoItem icon={<Calendar size={16} />} label="Last Updated Date" value={mockTimeline.lastUpdated} />
                  
                  <FormInputGroup label="Expected Completion Date" htmlFor="expectedCompletion" required>
                    <DatePicker id="expectedCompletion" value={expectedCompletionDate} onChange={(e) => setExpectedCompletionDate(e.target.value)} />
                  </FormInputGroup>

                  <div className="border-t border-slate-200 -mx-6 my-2"></div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium text-slate-700 mb-1">Case Status</h4>
                    <StatusBadge status="On Track" size="md" />
                    {/* <StatusBadge status="Delayed" size="md" /> */}
                    {/* <StatusBadge status="Critical" size="md" /> */}
                  </div>
                </div>
              </GlassCard>

              {/* 7. Buttons Bar */}
              <GlassCard noHover>
                <CardHeader icon={<Send size={20} />} title="Actions" />
                <div className="p-6 flex flex-col gap-3">
                  {/* Primary Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Send size={16} />
                    Submit Update
                  </button>
                  {/* Secondary Button */}
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
                  >
                    <Save size={16} />
                    Save Draft
                  </button>
                  {/* Tertiary Button */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Printer size={16} />
                    Generate PDF Case Memo
                  </button>
                  {/* Link-style Button */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-5 py-2 mt-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                  </button>
                </div>
              </GlassCard>

            </div>

          </div>
        </form>
      </main>

      {/* --- Modals & Toasts --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
      <Toast isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
      
      {/* --- Attachments Drawer (Example) --- */}
      <AnimatePresence>
        {isAttachmentsDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200"
          >
            {/* Drawer content */}
            <div className="p-6 flex justify-between items-center border-b border-slate-200">
              <h3 className="text-xl font-semibold">View Attachments</h3>
              <button onClick={() => setIsAttachmentsDrawerOpen(false)}><X size={24} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- Global Styles for Form Inputs --- */}
      <style jsx global>{`
        /* More Professional Form Input Styles */
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem; /* 12px 16px */
          font-size: 0.9rem;
          border-radius: 0.5rem; /* rounded-lg */
          border: 1px solid #cbd5e1; /* slate-300 */
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #2563eb; /* Royal Blue 600 */
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
        }
        .form-input::placeholder, .form-textarea::placeholder {
          color: #94a3b8; /* slate-400 */
        }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.7rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        .form-input:disabled, .form-select:disabled, .form-textarea:disabled {
          background-color: #f8fafc; /* slate-50 */
          cursor: not-allowed;
          opacity: 0.7;
        }
        /* Professional Navy/Blue Colors */
        .bg-navy-800 { background-color: #1e3a8a; } 
        .text-navy-900 { color: #172554; } 
        .text-navy-800 { color: #1e3a8a; }
        .bg-blue-700 { background-color: #1d4ed8; }
        .hover\\:bg-blue-800:hover { background-color: #1e40af; }
        .shadow-blue-500\\/30 { box-shadow: 0 10px 15px -3px rgb(59 130 246 / 0.3), 0 4px 6px -4px rgb(59 130 246 / 0.3); }
      `}</style>
    </motion.div>
  );
}

