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
 * Reusable card with glassmorphism, border, and hover-lift animation.
 */
const GlassCard = ({ children, className = "", noHover = false }: { children: React.ReactNode; className?: string; noHover?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { y: -6, transition: { duration: 0.2 } }}
    className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-sky-100 ${className}`}
  >
    {children}
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
 * A standardized header for GlassCards.
 */
const CardHeader = ({ icon, title, badgeText, children }: {
  icon: React.ReactNode;
  title: string;
  badgeText?: string; // FIX: Made optional
  children?: React.ReactNode; // FIX: Made optional
}) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-sky-100 bg-white/50 rounded-t-2xl">
    <div className="flex items-center gap-3">
      <span className="text-sky-600">{icon}</span>
      <h3 className="text-base font-semibold text-navy-800">{title}</h3>
      {badgeText && (
        <span className="px-3 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200">
          {badgeText}
        </span>
      )}
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
    <div className="info-chip">
      <Clock size={14} className="text-sky-700" />
      <span>{formatDate(dateTime)}</span>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function GeneralFeedbackEntry() {
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
  
  if (!hasMounted) {
    return null; // Prevents FOUC
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 lg:p-10 bg-gradient-to-br from-white via-sky-50 to-slate-100"
    >
      {/* --- Sticky Header --- */}
      <header className="relative bg-white border-b border-slate-200 shadow-sm px-6 lg:px-10">
        <div className="mx-auto max-w-7xl py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500" aria-label="Breadcrumb">
            <a href="#" className="hover:text-slate-700">DGP Dashboard</a>
            <ChevronRight size={16} className="mx-1.5" />
            <a href="#" className="hover:text-slate-700">Data Entry</a>
            <ChevronRight size={16} className="mx-1.5" />
            <span className="text-slate-800 font-semibold">General Feedback</span>
          </nav>
          {/* Title */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-navy-700 text-white shadow-lg shadow-navy-500/30">
                <Shield size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">General Feedback Entry</h1>
                <p className="text-sm text-slate-600">Record and monitor feedback received from law-enforcement agencies & public.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Filter / Info Tag Row --- */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-wrap gap-3">
        <div className="info-chip bg-navy-100 text-navy-800 border-navy-200">
          <UserCheck size={14} className="text-navy-600" />
          <span>Role: DGP – State Level</span>
        </div>
        <div className="info-chip bg-sky-100 text-sky-800 border-sky-200">
          <Flag size={14} className="text-sky-700" />
          <span>State: Haryana</span>
        </div>
        <LiveDateTimeChip />
      </div>

      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto mt-6 pt-[4rem]">
        <form onSubmit={handleSubmit}>
          {/* --- Main Form Card --- */}
          <GlassCard>
            <CardHeader
              icon={<ClipboardList size={20} />}
              title="Feedback Entry Form"
              badgeText={feedbackId}
            >
              {/* Add any content or leave empty if no children are needed */}
              <div></div>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                
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

                <div className="md:col-span-2">
                  <FormInputGroup 
                    label="Description" 
                    htmlFor="description" 
                    required
                    icon={<FileText size={16} className="text-slate-400" />}
                    helpText="Provide a detailed summary of the feedback."
                  >
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" rows={5} placeholder="Enter detailed description..."></textarea>
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
                
                <div className="md:col-span-2 border-t border-sky-100 pt-5">
                  <FormInputGroup 
                    label="Action Taken" 
                    htmlFor="actionTaken"
                    icon={<Pencil size={16} className="text-slate-400" />}
                    helpText="Describe the action taken in response."
                  >
                    <textarea id="actionTaken" value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} className="form-textarea" rows={3} placeholder="Log action details..."></textarea>
                  </FormInputGroup>
                </div>
                
                <div className="md:col-span-2">
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

            {/* --- Form Button Bar --- */}
            <div className="p-4 bg-slate-50/50 border-t border-sky-100 rounded-b-2xl flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={handleClearForm}
                className="form-button-secondary"
              >
                <RotateCcw size={16} />
                Clear
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="form-button-secondary"
              >
                <Save size={16} />
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="form-button-primary"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
                {isLoading ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </GlassCard>
        </form>

        {/* --- Dashboard Enhancements --- */}
        <section className="mt-12">
          {/* 📊 Summary Mini-Cards */}
        

          {/* 🕓 Recent Activity Table */}
          <div className="mt-12">
            <GlassCard noHover>
              <CardHeader
                icon={<BookOpen size={20} />}
                title="Recent Feedback Activity"
              >
                {/* Export buttons moved to footer */}
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
                    <tr>
                      <th className="th-cell">Feedback ID</th>
                      <th className="th-cell">Department / Unit</th>
                      <th className="th-cell">Source</th>
                      <th className="th-cell">Type</th>
                      <th className="th-cell">Status</th>
                      <th className="th-cell">Last Update</th>
                      <th className="th-cell">Action</th>
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
                        <td className="td-cell font-medium text-navy-800">{item.id}</td>
                        <td className="td-cell">{item.unit}</td>
                        <td className="td-cell">{item.source}</td>
                        <td className="td-cell">{item.type}</td>
                        <td className="td-cell">
                          <StatusBadge status={item.status as "Pending" | "Resolved"} />
                        </td>
                        <td className="td-cell">{item.lastUpdate}</td>
                        <td className="td-cell">
                          <button className="p-1.5 rounded-md text-sky-600 hover:bg-sky-100 transition-colors">
                            <Eye size={16} />
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
        <footer className="text-center text-slate-500 text-sm mt-12 pb-6">
          <p>Ensuring accountability and timely grievance resolution.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="footer-link">
              <FileBarChart size={14} /> Generate PDF Report
            </a>
            <a href="#" className="footer-link">
              <FileSpreadsheet size={14} /> Export CSV
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
        /* Define custom colors */
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
        
        /* Form Input Styling */
        .form-input-wrapper {
          position: relative;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem; /* 12px 16px */
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          border-radius: 0.75rem; /* rounded-xl */
          border: 1px solid #cbd5e1; /* slate-300 */
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .form-input-wrapper:focus-within .form-input,
        .form-input-wrapper:focus-within .form-select,
        .form-input-wrapper:focus-within .form-textarea {
          outline: none;
          border-color: #2563eb; /* royal-blue-600 */
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
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
          color: #475569; /* slate-600 */
        }
        .form-file-upload-btn:hover {
          border-color: #2563eb;
        }
        .form-file-upload-btn :global(svg) {
          color: #2563eb;
        }
        
        .form-button-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: auto;
          min-width: 150px;
          padding: 0.7rem 1.25rem;
          border-radius: 0.5rem; /* rounded-lg */
          font-size: 0.9rem;
          font-weight: 600;
          background-color: #1e3a8a; /* navy-700 */
          color: white;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 14px 0 rgb(30 58 138 / 0.3);
        }
        .form-button-primary:hover:not(:disabled) {
          background-color: #172554; /* navy-900 */
          box-shadow: 0 6px 16px 0 rgb(30 58 138 / 0.4);
          transform: translateY(-1px);
        }
        .form-button-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .form-button-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          background-color: #f1f5f9; /* slate-100 */
          color: #334155; /* slate-700 */
          border: 1px solid #e2e8f0; /* slate-200 */
          transition: all 0.2s ease-in-out;
        }
        .form-button-secondary:hover {
          background-color: #e2e8f0; /* slate-200 */
          border-color: #cbd5e1; /* slate-300 */
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

