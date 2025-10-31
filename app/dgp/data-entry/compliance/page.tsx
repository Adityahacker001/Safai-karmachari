"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ChevronRight,
  FileSearch,
  Building,
  UserCircle,
  CalendarDays,
  Upload,
  FileText,
  Image,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Eye,
  Save,
  Undo2,
  ArrowLeft,
  Info,
  AlertCircle,
  Menu,
  FileUp,
  X,
  Database
} from 'lucide-react';
import { LucideProps } from 'lucide-react';

/*
 * DGP Compliance Entry Dashboard
 * A modern, premium React + Tailwind UI page for entering compliance data.
 * Features:
 * - Glassmorphic cards with backdrop blur
 * - Framer Motion animations for a fluid feel
 * - Responsive design for all screen sizes
 * - Conditional form logic
 * - Lucide icons for a clean, professional look
 */

// Main Application Component
export default function App() {
  // === STATE MANAGEMENT ===

  // Form State
  const [district, setDistrict] = useState('');
  const [spName, setSpName] = useState('');
  const [complianceStatus, setComplianceStatus] = useState('');
  const [complianceDate, setComplianceDate] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // File Upload State
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [photosFile, setPhotosFile] = useState<File | null>(null);
  
  // UI State
  const [showToast, setShowToast] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date().toLocaleString());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // === MOCK DATA ===

  // Mock mapping for SP/CP names based on district
  const districtSpMap: Record<string, string> = {
    'Mumbai City': 'CP. Vivek Phansalkar',
    'Pune City': 'CP. Amitesh Kumar',
    'Nagpur City': 'CP. Dr. Ravinder Singal',
    'Thane District': 'SP. D. S. Swami',
    'Raigad District': 'SP. Somnath Gharge',
  };

  // Mock data for the recent logs table
  const mockLogs = [
    { id: 'DGP-2024-001', district: 'Mumbai City', status: 'Complied', date: '2024-10-28', officer: 'CP. V. Phansalkar' },
    { id: 'MHA-2024-098', district: 'Pune City', status: 'In-Progress', date: '2024-10-27', officer: 'CP. A. Kumar' },
    { id: 'NSKC-2024-045', district: 'Nagpur City', status: 'Complied', date: '2024-10-26', officer: 'CP. Dr. R. Singal' },
    { id: 'DGP-2024-002', district: 'Thane District', status: 'Not Complied', date: '2024-10-25', officer: 'SP. D. S. Swami' },
    { id: 'DGP-2024-003', district: 'Raigad District', status: 'In-Progress', date: '2024-10-24', officer: 'SP. S. Gharge' },
  ];
  
  // Read-only direction data
  const directionInfo = {
    id: 'DGP-2024-003',
    title: 'Implementation of New Cyber-Security Protocols for CCTNS Portal',
    issuedBy: 'DGP, Maharashtra State',
    issuedDate: '2024-10-01',
  };

  // === EFFECTS ===

  // Effect to auto-fill SP/CP name when district changes
  useEffect(() => {
    if (districtSpMap[district]) {
      setSpName(districtSpMap[district]);
    } else {
      setSpName('');
    }
  }, [district]);

  // Effect to update timestamp periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(new Date().toLocaleString());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // === EVENT HANDLERS ===

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      district,
      spName,
      complianceStatus,
      complianceDate,
      actionTaken,
      remarks,
      reportFile: reportFile?.name,
      photosFile: photosFile?.name,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  
  // Handle file changes
  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    } else {
      setter(null);
    }
  };

  // Handle form clearing
  const handleClear = () => {
    setDistrict('');
    setSpName('');
    setComplianceStatus('');
    setComplianceDate('');
    setActionTaken('');
    setRemarks('');
    setReportFile(null);
    setPhotosFile(null);
  };

  // Fixing implicit 'any' types
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value);
  const handleComplianceStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setComplianceStatus(e.target.value);
  const handleComplianceDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => setComplianceDate(e.target.value);

  // === HELPER COMPONENTS ===

  // Status Chip Component
  const StatusChip = ({ status }: { status: string }) => {
    const baseStyle = "px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5";
    switch (status) {
      case 'Complied':
        return <span className={`${baseStyle} bg-green-100 text-green-800 ring-1 ring-inset ring-green-200`}><CheckCircle size={14} />Complied</span>;
      case 'In-Progress':
        return <span className={`${baseStyle} bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200`}><Loader size={14} className="animate-spin" />In-Progress</span>;
      case 'Not Complied':
        return <span className={`${baseStyle} bg-red-100 text-red-800 ring-1 ring-inset ring-red-200`}><XCircle size={14} />Not Complied</span>;
      default:
        return <span className={`${baseStyle} bg-gray-100 text-gray-800`}>Unknown</span>;
    }
  };

  // Glassmorphic Card Wrapper Component
  const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string }) => (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-500/5 ring-1 ring-black/5 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );

  // Form Input Group Component
  const InputGroup = ({ label, helperText, children, htmlFor }: {
    label: string;
    helperText?: string;
    children: React.ReactNode;
    htmlFor: string;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-blue-900/80">
        {label}
      </label>
      {children}
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );

  // Styled Input Component
  const StyledInput = ({ icon: Icon, ...props }: { icon?: React.ElementType<{ size?: number; className?: string }>; [key: string]: any }) => (
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <input
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-white/50 border border-gray-300/50 rounded-lg shadow-inner-sm shadow-blue-500/5 text-gray-800 placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100/70 disabled:cursor-not-allowed`}
        {...props}
      />
    </div>
  );

  // Styled Select Component
  const StyledSelect = ({ icon: Icon, children, ...props }: {
    icon?: React.ElementType<{ size?: number; className?: string }>; children: React.ReactNode; [key: string]: any;
  }) => (
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <select
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 bg-white/50 border border-gray-300/50 rounded-lg shadow-inner-sm shadow-blue-500/5 text-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
        {...props}
      >
        {children}
      </select>
      <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transform -rotate-90" />
    </div>
  );

  // Styled Textarea Component
  const StyledTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
      className="w-full pl-4 pr-4 py-2.5 bg-white/50 border border-gray-300/50 rounded-lg shadow-inner-sm shadow-blue-500/5 text-gray-800 placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows={4}
      {...props}
    ></textarea>
  );

  // File Input Card Component
  const FileUploadCard = ({ title, file, onChange, accept }: {
    title: string;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
  }) => (
    <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center transition-all duration-300 hover:border-blue-500 hover:bg-white/50">
      <FileUp className="text-gray-400" size={32} />
      <label htmlFor={title} className="mt-2 text-sm font-medium text-blue-600 cursor-pointer">
        {title}
        <input id={title} type="file" className="sr-only" onChange={onChange} accept={accept} />
      </label>
      <p className="text-xs text-gray-500">Click to upload or drag & drop</p>
      {file && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 w-full p-2 bg-green-50 rounded-md flex items-center justify-between text-sm text-green-800"
        >
          <span className="truncate">{file.name}</span>
          <CheckCircle size={16} />
        </motion.div>
      )}
    </div>
  );

  // Button Component
  const AppButton = ({ children, onClick, variant = 'primary', icon: Icon, type = 'button' }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
    icon?: React.ElementType<{ size?: number }>;
    type?: 'button' | 'submit' | 'reset';
  }) => {
    const baseStyle = "relative px-5 py-2.5 rounded-lg text-sm font-semibold overflow-hidden transition-all duration-300 ease-out flex items-center justify-center gap-2 group";
    const rippleStyle = "absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300 scale-150 group-active:scale-100";

    const variants: Record<string, string> = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:from-blue-700',
      secondary: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:from-yellow-600',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
      link: 'bg-transparent text-blue-600 hover:underline p-0',
    };

    return (
      <motion.button
        type={type}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyle} ${variants[variant]}`}
        onClick={onClick}
      >
        <span className={rippleStyle}></span>
        <span className="relative z-10 flex items-center gap-2">
          {Icon && <Icon size={16} />}
          {children}
        </span>
      </motion.button>
    );
  };
  
  // === ICON WRAPPER ===

  const LucideIconWrapper = (Icon: React.ComponentType<LucideProps>) => {
    return ({ size, className }: { size?: number; className?: string }) => (
      <Icon size={size} className={className} />
    );
  };

  // Wrapped Icons
  const InfoIcon = LucideIconWrapper(Info);
  const FileTextIcon = LucideIconWrapper(FileText);
  const UserIcon = LucideIconWrapper(User);
  const CalendarDaysIcon = LucideIconWrapper(CalendarDays);
  const BuildingIcon = LucideIconWrapper(Building);
  const UserCircleIcon = LucideIconWrapper(UserCircle);
  const ClockIcon = LucideIconWrapper(Clock);
  const ArrowLeftIcon = LucideIconWrapper(ArrowLeft);
  const Undo2Icon = LucideIconWrapper(Undo2);
  const SaveIcon = LucideIconWrapper(Save);
  const CheckCircleIcon = LucideIconWrapper(CheckCircle);

  // === MAIN RENDER ===

  return (
    <>
      {/* --- Page Background --- */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      
      {/* --- Main Container --- */}
      <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white/80 via-white/50 to-blue-50/20 text-slate-800 font-sans">
        
        {/* --- Main Content with Fade-in Animation --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="max-w-7xl mx-auto"
        >
          {/* --- Header --- */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full ring-8 ring-blue-50/50">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight">
                  Direction Compliance Entry
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Update compliance status of government & DGP directives
                </p>
              </div>
            </div>
            
            {/* --- Breadcrumb --- */}
            <nav className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-2" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1.5">
                <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
                <li><ChevronRight size={14} /></li>
                <li><a href="#" className="hover:text-blue-600">Data Entry</a></li>
                <li><ChevronRight size={14} /></li>
                <li className="font-medium text-gray-700">Direction Compliance</li>
              </ol>
            </nav>
          </header>

          {/* --- Main Form --- */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              {/* --- Card: Direction Information --- */}
              <Card>
                <div className="p-5 border-b border-black/5">
                  <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <FileSearch size={20} />
                    Direction Information
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Read-only fields */}
                  <InputGroup label="Direction ID" htmlFor="direction-id" helperText="Unique identifier for the directive.">
                    <StyledInput value={directionInfo.id} icon={InfoIcon} readOnly disabled />
                  </InputGroup>
                  <div className="lg:col-span-2">
                    <InputGroup label="Direction Title" htmlFor="direction-title" helperText="The official title of the directive.">
                      <StyledInput value={directionInfo.title} icon={FileTextIcon} readOnly disabled />
                    </InputGroup>
                  </div>
                  <InputGroup label="Issued By" htmlFor="issued-by" helperText="The issuing authority or department.">
                    <StyledInput value={directionInfo.issuedBy} icon={UserIcon} readOnly disabled />
                  </InputGroup>
                  <InputGroup label="Issued Date" htmlFor="issued-date" helperText="The date the directive was issued.">
                    <StyledInput value={directionInfo.issuedDate} type="date" icon={CalendarDaysIcon} readOnly disabled />
                  </InputGroup>
                  
                  {/* Interactive fields */}
                  <InputGroup label="District / Unit" htmlFor="district" helperText="Select the reporting unit.">
                    <StyledSelect 
                      id="district"
                      icon={BuildingIcon} 
                      value={district} 
                      onChange={handleDistrictChange}
                    >
                      <option value="">Select District/Unit</option>
                      {Object.keys(districtSpMap).map(d => <option key={d} value={d}>{d}</option>)}
                    </StyledSelect>
                  </InputGroup>
                  <InputGroup label="SP/CP Name" htmlFor="sp-cp-name" helperText="Auto-filled based on selected unit.">
                    <StyledInput 
                      value={spName} 
                      icon={UserCircleIcon} 
                      readOnly 
                      disabled 
                      placeholder="N/A" 
                    />
                  </InputGroup>
                </div>
              </Card>

              {/* --- Card: Compliance Entry Form --- */}
              <Card>
                <div className="p-5 border-b border-black/5">
                  <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <CheckCircle size={20} />
                    Compliance Entry Form
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Compliance Status" htmlFor="status" helperText="Select the current status.">
                    <StyledSelect 
                      id="status"
                      icon={ClockIcon} 
                      value={complianceStatus} 
                      onChange={handleComplianceStatusChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Complied">Complied</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Not Complied">Not Complied</option>
                    </StyledSelect>
                  </InputGroup>
                  
                  <InputGroup label="Compliance Date" htmlFor="comp-date" helperText="Date of status update.">
                    <StyledInput 
                      id="comp-date"
                      type="date" 
                      icon={CalendarDaysIcon} 
                      value={complianceDate}
                      onChange={handleComplianceDateChange}
                    />
                  </InputGroup>

                  <div className="md:col-span-2">
                    <InputGroup label="Action Taken" htmlFor="action-taken" helperText="Describe actions taken so far.">
                      <StyledTextarea 
                        id="action-taken"
                        placeholder="e.g., 'Conducted training for all staff...', 'Software update deployed...'"
                        value={actionTaken}
                        onChange={(e) => setActionTaken(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  
                  {/* --- Conditional Remarks Field --- */}
                  <AnimatePresence>
                    {complianceStatus === 'Not Complied' && (
                      <motion.div 
                        className="md:col-span-2"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '0px' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <InputGroup label="Reason for Non-Compliance (Required)" htmlFor="remarks" helperText="Provide a clear justification.">
                          <StyledTextarea 
                            id="remarks"
                            className="focus:ring-red-500 focus:border-red-500 border-red-300/50"
                            placeholder="Provide detailed reasons for non-compliance..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* --- Audit Footer --- */}
                <div className="p-4 bg-blue-50/30 border-t border-black/5 rounded-b-2xl">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-blue-700" />
                      Entered by: <span className="font-medium text-blue-900">DGP Staff (Admin)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-700" />
                      Auto Timestamp: <span className="font-medium text-blue-900">{currentTimestamp}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium">
                      Last Updated: 1 min ago
                    </span>
                  </div>
                </div>
              </Card>

              {/* --- Conditional Upload Section --- */}
              <AnimatePresence>
                {complianceStatus === 'Complied' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <Card>
                      <div className="p-5 border-b border-black/5">
                        <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                          <Upload size={20} />
                          Upload Evidence
                        </h2>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FileUploadCard 
                          title="Upload Report (PDF)"
                          file={reportFile}
                          onChange={handleFileChange(setReportFile)}
                          accept=".pdf"
                        />
                        <FileUploadCard 
                          title="Upload Photos (Optional)"
                          file={photosFile}
                          onChange={handleFileChange(setPhotosFile)}
                          accept="image/*"
                        />
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* --- Action Buttons --- */}
              <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
                <AppButton variant="link" icon={ArrowLeftIcon} onClick={() => {}}>
                  Back to Dashboard
                </AppButton>
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <AppButton variant="ghost" icon={Undo2Icon} onClick={handleClear}>
                    Clear Form
                  </AppButton>
                  <AppButton variant="secondary" icon={SaveIcon} onClick={() => {}}>
                    Save Draft
                  </AppButton>
                  <AppButton type="submit" variant="primary" icon={CheckCircleIcon} onClick={() => {}}>
                    Submit Compliance
                  </AppButton>
                </div>
              </div>

              {/* --- Card: Recent Compliance Logs --- */}
              <Card className="mt-8">
                <div className="p-5 border-b border-black/5">
                  <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <Database size={20} />
                    Recent Compliance Logs
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max text-sm text-left">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Direction ID</th>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">District</th>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Officer</th>
                        <th className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-center">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {mockLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-700">{log.id}</td>
                          <td className="px-4 py-3 text-gray-800">{log.district}</td>
                          <td className="px-4 py-3"><StatusChip status={log.status} /></td>
                          <td className="px-4 py-3 text-gray-600">{log.date}</td>
                          <td className="px-4 py-3 text-gray-800">{log.officer}</td>
                          <td className="px-4 py-3 text-center">
                            <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100/50">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

            </div>
          </form>
        </motion.div>
        
        {/* --- Success Toast Notification --- */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 w-full max-w-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl shadow-blue-500/40"
            >
              <CheckCircle size={24} className="flex-shrink-0" />
              <div className="flex-grow">
                <h4 className="font-semibold">Success</h4>
                <p className="text-sm text-blue-100">Compliance status submitted successfully.</p>
              </div>
              <button onClick={() => setShowToast(false)} className="p-1 rounded-full hover:bg-white/10">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
