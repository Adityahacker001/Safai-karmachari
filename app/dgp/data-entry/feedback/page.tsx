'use client';

import React, { useState, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ChevronRight,
  Landmark,
  FileText,
  Users,
  MessageSquare,
  ClipboardList,
  Calendar,
  Pencil,
  CheckCircle,
  AlertTriangle,
  Send,
  Save,
  RotateCcw,
  Loader2,
  X,
  FileDown,
  BookOpen,
  Eye,
  Building,
  Shield,
  FileSpreadsheet,
  FileBarChart,
  AlertOctagon,
  Hash,
  Star,
  ThumbsUp,
  ThumbsDown,
  Upload,
  FilePlus2,
  Clock,
  UserCheck,
  Flag,
  Globe,
  Archive,
  MessageCircle
} from 'lucide-react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';

// --- MOCK DATA & OPTIONS ---

const sourceOptions = [
  { value: "", label: "Select Source..." },
  { value: "sp-cp", label: "SP/CP Unit" },
  { value: "nskc", label: "NSKC" },
  { value: "public", label: "Public / Other" },
];

const typeOptions = [
  { value: "", label: "Select Feedback Type..." },
  { value: "suggestion", label: "Suggestion" },
  { value: "appreciation", label: "Appreciation" },
  { value: "complaint", label: "Complaint (Administrative)" },
];

const departmentOptions = [
  { value: "", label: "Select Department/Unit..." },
  { value: "sp-dwarka", label: "SP Office, Dwarka" },
  { value: "sp-rohtak", label: "SP Office, Rohtak" },
  { value: "cp-delhi", label: "CP Office, New Delhi" },
  { value: "cyber-cell", label: "Cyber Cell (State)" },
];

const statusOptions = [
  { value: "pending", label: "Pending Review" },
  { value: "resolved", label: "Resolved/Actioned" },
];

const mockSummaryData = {
  pending: { count: 8, change: "+1" },
  resolved: { count: 124, change: "+7" },
  total: { count: 132, change: "+8" },
};

const mockRecentActivity = [
  { id: "FBK-0012", unit: "SP Office, Dwarka", source: "SP/CP", type: "Suggestion", status: "Resolved", lastUpdate: "2025-10-30" },
  { id: "FBK-0011", unit: "Cyber Cell (State)", source: "NSKC", type: "Complaint", status: "Pending", lastUpdate: "2025-10-29" },
  { id: "FBK-0010", unit: "CP Office, New Delhi", source: "Public", type: "Appreciation", status: "Resolved", lastUpdate: "2025-10-29" },
  { id: "FBK-0009", unit: "SP Office, Rohtak", source: "SP/CP", type: "Suggestion", status: "Resolved", lastUpdate: "2025-10-28" },
];

// --- REUSABLE COMPONENTS ---

/**
 * 1. GlassCard Component
 * Enhanced reusable card with modern glassmorphism, gradient borders, and advanced animations.
 */
const GlassCard = ({ children, className = "", noHover = false }: { children: React.ReactNode; className?: string; noHover?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }}
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
 * Standardized wrapper for form inputs with icon, label, and help text.
 */
const FormInputGroup = ({ label, icon, helpText, required, htmlFor, children, className = "" }: {
  label: string;
  icon: React.ReactNode;
  helpText?: string; // FIX: Made optional
  required?: boolean; // FIX: Made optional
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={htmlFor} className="flex items-center gap-2 mb-1.5 text-sm font-medium text-navy-800">
      {icon}
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="form-input-wrapper">
      {children}
    </div>
    {helpText && <p className="text-xs text-slate-500 mt-1.5 px-1">{helpText}</p>}
  </div>
);

/**
 * 3. StatusBadge (for Table)
 * Displays a styled badge for different statuses.
 */
// Moved config outside for better type inference
const statusConfig = {
  "Pending": { icon: <AlertTriangle size={12} />, styles: "bg-amber-100 text-amber-900 border-amber-200" },
  "Resolved": { icon: <CheckCircle size={12} />, styles: "bg-emerald-100 text-emerald-900 border-emerald-200" },
};
  
const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
  const config = statusConfig[status] || { icon: null, styles: "bg-slate-100 text-slate-800 border-slate-200" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${config.styles}`}>
      {config.icon}
      {status}
    </span>
  );
};

/**
 * 4. DatePicker Component
 * A simple styled date input.
 */
const DatePicker = ({ id, value, onChange, disabled = false }: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <input
    type="date"
    id={id}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className="form-input"
  />
);

/**
 * 5. SummaryCard Component (for KPIs)
 * Gradient cards for the dashboard enhancements.
 */
const SummaryCard = ({ title, count, change, icon, gradientClass }: {
  title: string;
  count: number;
  change: string;
  icon: React.ReactNode;
  gradientClass: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className={`relative rounded-xl shadow-lg p-5 text-white overflow-hidden ${gradientClass}`}
  >
    <div className="relative z-10">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium opacity-90">{title}</span>
        <span className="text-sm font-semibold px-2 py-0.5 bg-white/30 rounded-full backdrop-blur-sm">
          {change}
        </span>
      </div>
      <div className="text-4xl font-bold mt-2 mb-1">{count}</div>
      <div className="text-xs opacity-80">Total Feedback</div>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-10 z-0">
      {icon}
    </div>
  </motion.div>
);


/**
 * 6. Toast Component
 * For success messages.
 */
const Toast = ({ isVisible, onClose, message, type = "success" }: {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => { onClose(); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const config = {
    success: { icon: <CheckCircle size={20} />, styles: "bg-emerald-600 border-emerald-700" },
    error: { icon: <AlertOctagon size={20} />, styles: "bg-red-600 border-red-700" },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-10 right-10 z-50 p-4 rounded-xl shadow-2xl text-white flex items-center gap-3 border ${config[type].styles}`}
        >
          {config[type].icon}
          <span className="font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * 7. CardHeader Component
 * Enhanced header with gradient backgrounds and modern styling.
 */
const CardHeader = ({ icon, title, badgeText, children }: {
  icon: React.ReactNode;
  title: string;
  badgeText?: string; // FIX: Made optional
  children?: React.ReactNode; // FIX: Made optional
}) => (
  <div className="flex items-center justify-between px-6 py-5 border-b border-gradient-to-r from-blue-200/30 via-purple-200/20 to-pink-200/30 bg-gradient-to-r from-blue-50/80 via-white/90 to-purple-50/80 rounded-t-3xl backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h3>
        {badgeText && (
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold shadow-md">
            {badgeText}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3">
      {children}
    </div>
  </div>
);

/**
 * 8. LiveDateTimeChip Component
 * Displays the current date and time, auto-updating.
 */
const LiveDateTimeChip = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' | ' + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="enhanced-info-chip bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg shadow-orange-500/25">
      <Clock size={16} className="text-white animate-pulse" />
      <span className="font-semibold">{formatDate(dateTime)}</span>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function GeneralFeedbackEntry() {
  // Loader logic: only show loader in main content area, not fullscreen
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Form State
  const [feedbackId, setFeedbackId] = useState("FBK-90152");
  const [source, setSource] = useState("sp-cp");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [description, setDescription] = useState("");
  const [dateReceived, setDateReceived] = useState(new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState("sp-dwarka");
  const [actionTaken, setActionTaken] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("pending");
  const [fileName, setFileName] = useState("");

  // UI State
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    setHasMounted(true);
    setFeedbackId(`FBK-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  const handleClearForm = () => {
    setSource("");
    setFeedbackType("");
    setDescription("");
    setDateReceived(new Date().toISOString().split('T')[0]);
    setDepartment("");
    setActionTaken("");
    setResponse("");
    setStatus("pending");
    setFileName("");
    setFeedbackId(`FBK-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Feedback logged successfully!");
      setToastType("success");
      setShowToast(true);
      handleClearForm();
    }, 1500);
  };

  const handleSaveDraft = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Draft saved!");
      setToastType("success");
      setShowToast(true);
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <IntegratedLoader />
      </div>
    );
  }

  if (!hasMounted) {
    return null; // Prevents FOUC
  }

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
              General Feedback
            </span>
          </nav>
          {/* Title */}
          <div className="flex items-start gap-4 mt-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/40">
              <Shield size={24} className="sm:hidden" />
              <Shield size={32} className="hidden sm:block" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-white break-words leading-tight">
                General Feedback Entry
              </h1>
              <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed font-medium">
                🎯 Record and monitor feedback received from law-enforcement agencies & public
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- Enhanced Info Tag Row --- */}
      <div className="max-w-7xl mx-auto mt-6 sm:mt-8 px-3 sm:px-4 md:px-6 lg:px-8 flex flex-wrap gap-3 sm:gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="enhanced-info-chip bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg shadow-blue-500/25"
        >
          <UserCheck size={16} className="text-white" />
          <span className="font-semibold">Role: DGP – State Level</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="enhanced-info-chip bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25"
        >
          <Flag size={16} className="text-white" />
          <span className="font-semibold">State: Haryana</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LiveDateTimeChip />
        </motion.div>
      </div>

      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto mt-4 sm:mt-6 px-3 sm:px-4 md:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          {/* --- Main Form Card --- */}
          <GlassCard noHover>
            <CardHeader
              icon={<ClipboardList size={20} />}
              title="Feedback Entry Form"
              badgeText={feedbackId}
            >
              {/* Add any content or leave empty if no children are needed */}
              <div></div>
            </CardHeader>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-5">
                
                {/* --- Column 1 --- */}
                <FormInputGroup 
                  label="Source" 
                  htmlFor="source" 
                  required 
                  icon={<Users size={16} className="text-slate-400" />}
                  helpText="Who is providing this feedback?"
                >
                  <select id="source" value={source} onChange={(e) => setSource(e.target.value)} className="form-select">
                    {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>
                
                <FormInputGroup 
                  label="Feedback Type" 
                  htmlFor="type" 
                  required
                  icon={<MessageSquare size={16} className="text-slate-400" />}
                  helpText="Categorize the nature of the feedback."
                >
                  <select id="type" value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)} className="form-select">
                    {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>

                <div className="sm:col-span-2">
                  <FormInputGroup 
                    label="Description" 
                    htmlFor="description" 
                    required
                    icon={<FileText size={16} className="text-slate-400" />}
                    helpText="Provide a detailed summary of the feedback."
                  >
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" rows={4} placeholder="Enter detailed description..."></textarea>
                  </FormInputGroup>
                </div>

                <FormInputGroup 
                  label="Date Received" 
                  htmlFor="dateReceived" 
                  required
                  icon={<Calendar size={16} className="text-slate-400" />}
                >
                  <DatePicker id="dateReceived" value={dateReceived} onChange={(e) => setDateReceived(e.target.value)} />
                </FormInputGroup>
                
                <FormInputGroup 
                  label="Department / Unit" 
                  htmlFor="department"
                  icon={<Landmark size={16} className="text-slate-400" />}
                  helpText="Which unit does this feedback relate to?"
                >
                  <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-select">
                    {departmentOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>
                
                <div className="sm:col-span-2 border-t border-sky-100 pt-4 sm:pt-5">
                  <FormInputGroup 
                    label="Action Taken" 
                    htmlFor="actionTaken"
                    icon={<Pencil size={16} className="text-slate-400" />}
                    helpText="Describe the action taken in response."
                  >
                    <textarea id="actionTaken" value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} className="form-textarea" rows={3} placeholder="Log action details..."></textarea>
                  </FormInputGroup>
                </div>
                
                <div className="sm:col-span-2">
                  <FormInputGroup 
                    label="Response / Reply" 
                    htmlFor="response"
                    icon={<Send size={16} className="text-slate-400" />}
                    helpText="Optional: Official reply sent to the source."
                  >
                    <textarea id="response" value={response} onChange={(e) => setResponse(e.target.value)} className="form-textarea" rows={3} placeholder="Log official response..."></textarea>
                  </FormInputGroup>
                </div>

                <FormInputGroup 
                  label="Status" 
                  htmlFor="status" 
                  required
                  icon={<CheckCircle size={16} className="text-slate-400" />}
                >
                  <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>
                
                <FormInputGroup 
                  label="File Attachment" 
                  htmlFor="fileAttachment"
                  icon={<FilePlus2 size={16} className="text-slate-400" />}
                  helpText="Upload supporting documents (PDF, JPG, PNG)."
                >
                  <label htmlFor="file-upload" className="form-file-upload-btn">
                    <Upload size={18} />
                    <span>{fileName || "Click to upload a file"}</span>
                  </label>
                  <input id="file-upload" type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "No file selected")} />
                </FormInputGroup>

              </div>
            </div>

            {/* --- Enhanced Form Button Bar --- */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-pink-50/80 border-t border-gradient-to-r from-blue-200/30 via-purple-200/20 to-pink-200/30 rounded-b-3xl flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleClearForm}
                className="enhanced-button-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} className="sm:hidden" />
                <RotateCcw size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Clear Form</span>
                <span className="sm:hidden">Clear</span>
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="enhanced-button-tertiary flex items-center justify-center gap-2"
              >
                <Save size={14} className="sm:hidden" />
                <Save size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">Save Draft</span>
                <span className="sm:hidden">Save</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="enhanced-button-primary w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin sm:hidden" />
                    <Loader2 size={18} className="hidden sm:block animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="sm:hidden" />
                    <Send size={16} className="hidden sm:block" />
                    <span className="hidden sm:inline">Submit Feedback</span>
                    <span className="sm:hidden">Submit</span>
                  </>
                )}
              </button>
            </div>
          </GlassCard>
        </form>

        {/* --- Dashboard Enhancements --- */}
        <section className="mt-12">
          {/* 📊 Summary Mini-Cards */}
          

          {/* 🕓 Recent Activity Table */}
          <div className="mt-8 sm:mt-12">
            <GlassCard noHover>
              <CardHeader
                icon={<BookOpen size={20} />}
                title="Recent Feedback Activity"
              >
                {/* Export buttons moved to footer */}
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="table-auto w-full min-w-max">
                  <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
                    <tr>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">ID</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">Department</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">Source</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">Type</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">Status</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">Last Update</th>
                      <th className="th-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {mockRecentActivity.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-sky-50/50 transition-colors"
                      >
                        <td className="td-cell font-medium text-navy-800 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-4">{item.id}</td>
                        <td className="td-cell text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">{item.unit}</td>
                        <td className="td-cell text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-4 hidden md:table-cell">{item.source}</td>
                        <td className="td-cell text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-4">{item.type}</td>
                        <td className="td-cell px-2 sm:px-4 py-3 sm:py-4">
                          <StatusBadge status={item.status as "Pending" | "Resolved"} />
                        </td>
                        <td className="td-cell text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">{item.lastUpdate}</td>
                        <td className="td-cell px-2 sm:px-4 py-3 sm:py-4">
                          <button className="p-1 sm:p-1.5 rounded-md text-sky-600 hover:bg-sky-100 transition-colors">
                            <Eye size={14} className="sm:hidden" />
                            <Eye size={16} className="hidden sm:block" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center text-slate-500 text-xs sm:text-sm mt-8 sm:mt-12 pb-4 sm:pb-6">
          <p className="px-4">Ensuring accountability and timely feedback resolution.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-2 px-4">
            <a href="#" className="footer-link">
              <FileBarChart size={12} className="sm:hidden" />
              <FileBarChart size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Generate PDF Report</span>
              <span className="sm:hidden">PDF Report</span>
            </a>
            <a href="#" className="footer-link">
              <FileSpreadsheet size={12} className="sm:hidden" />
              <FileSpreadsheet size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export CSV</span>
            </a>
          </div>
        </footer>
      </main>

      {/* --- Modals & Toasts --- */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type={toastType}
      />
      
      {/* --- Global Styles for Form Inputs --- */}
      <style>{`
        /* Enhanced Custom Colors & Gradients */
        .bg-navy-700 { background-color: #1e3a8a; }
        .hover\\:bg-navy-800:hover { background-color: #1c357a; }
        .text-navy-700 { color: #1e3a8a; }
        .text-navy-800 { color: #1e3a8a; }
        .text-navy-900 { color: #172554; }
        .shadow-navy-500\\/30 { box-shadow: 0 10px 15px -3px rgb(30 58 138 / 0.3), 0 4px 6px -4px rgb(30 58 138 / 0.3); }
        .text-royal-blue-600 { color: #2563eb; }
        .hover\\:text-navy-700:hover { color: #1e3a8a; }
        .border-sky-100 { border-color: #e0f2fe; }
        .bg-sky-50 { background-color: #f0f9ff; }
        .text-sky-600 { color: #0284c7; }
        .text-sky-700 { color: #0369a1; }
        .text-sky-800 { color: #075985; }
        .bg-sky-100 { background-color: #e0f2fe; }
        .border-sky-200 { border-color: #bae6fd; }
        .from-sky-500 { --tw-gradient-from: #0ea5e9; --tw-gradient-to: rgb(14 165 233 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-blue-400 { --tw-gradient-to: #60a5fa; }
        .from-amber-500 { --tw-gradient-from: #f59e0b; --tw-gradient-to: rgb(245 158 11 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-gold-400 { --tw-gradient-to: #facc15; }
        .from-emerald-500 { --tw-gradient-from: #10b981; --tw-gradient-to: rgb(16 185 129 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-green-400 { --tw-gradient-to: #4ade80; }
        .text-gold-400 { color: #facc15; }
        
        /* Enhanced Info Chips */
        .enhanced-info-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid transparent;
          backdrop-filter: blur(8px);
          transform: translateZ(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .enhanced-info-chip:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        /* Enhanced Form Input Styling */
        .form-input-wrapper {
          position: relative;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem; /* Enhanced padding */
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          border-radius: 1rem; /* More rounded */
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) border-box;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-input-wrapper:focus-within .form-input,
        .form-input-wrapper:focus-within .form-select,
        .form-input-wrapper:focus-within .form-textarea {
          outline: none;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6) border-box;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
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
      
        /* Page-specific styles */
        .info-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid;
          background-color: #fff;
        }
        
        .form-file-upload-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          border-radius: 1rem;
          border: 2px dashed #cbd5e1;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          color: #475569;
          font-weight: 600;
        }
        .form-file-upload-btn:hover {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }
        .form-file-upload-btn :global(svg) {
          color: #3b82f6;
        }
        
        /* Enhanced Button Styles */
        .enhanced-button-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: auto;
          min-width: 170px;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          color: white;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          position: relative;
          overflow: hidden;
        }
        .enhanced-button-primary:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .enhanced-button-primary:hover:before {
          left: 100%;
        }
        .enhanced-button-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb, #7c3aed, #db2777);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }
        .enhanced-button-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .enhanced-button-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 0.875rem;
          font-size: 0.95rem;
          font-weight: 600;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #475569;
          border: 2px solid #cbd5e1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .enhanced-button-secondary:hover {
          background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
          border-color: #94a3b8;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }
        
        .enhanced-button-tertiary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 0.875rem;
          font-size: 0.95rem;
          font-weight: 600;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
        }
        .enhanced-button-tertiary:hover {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          box-shadow: 0 8px 25px rgba(251, 191, 36, 0.6);
        }
        
        /* Table Styles */
        .th-cell {
          padding: 0.85rem 1.25rem;
          text-align: left;
          font-size: 0.75rem; /* 12px */
          color: #475569; /* slate-600 */
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .td-cell {
          padding: 1rem 1.25rem;
          white-space: nowrap;
          font-size: 0.875rem; /* 14px */
          color: #334155; /* slate-700 */
        }
        
        /* Footer */
        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #475569; /* slate-600 */
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #1e3a8a; /* navy-700 */
        }
        
      `}</style>
    </motion.div>
  );
}

