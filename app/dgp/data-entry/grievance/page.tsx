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
  ArrowUpCircle,
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
  AlertOctagon
} from 'lucide-react';

// --- MOCK DATA & OPTIONS ---

const districtOptions = [
  { value: "", label: "Select District" },
  { value: "new-delhi", label: "New Delhi" },
  { value: "south-delhi", label: "South Delhi" },
  { value: "dwarka", label: "Dwarka" },
  { value: "rohtak", label: "Rohtak" },
];

const sourceOptions = [
  { value: "", label: "Select Source" },
  { value: "worker", label: "Worker" },
  { value: "shg", label: "SHG (Self-Help Group)" },
  { value: "public", label: "Public" },
];

const typeOptions = [
  { value: "", label: "Select Grievance Type" },
  { value: "inaction", label: "Police Inaction" },
  { value: "delay", label: "Delay in Investigation" },
  { value: "harassment", label: "Harassment by Personnel" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "escalated", label: "Escalated" },
];

const escalatedToOptions = [
  { value: "", label: "Escalate To..." },
  { value: "nskc", label: "NSKC (National Commission)" },
  { value: "ministry", label: "Ministry" },
];

const mockSummaryData = {
  pending: { count: 12, change: "+2" },
  resolved: { count: 185, change: "+15" },
  escalated: { count: 3, change: "+1" },
};

const mockRecentActivity = [
  { id: "GRV-00451", district: "Dwarka", source: "Worker", type: "Police Inaction", status: "Pending", lastUpdate: "2025-10-30" },
  { id: "GRV-00450", district: "South Delhi", source: "SHG", type: "Delay in Investigation", status: "Resolved", lastUpdate: "2025-10-29" },
  { id: "GRV-00449", district: "New Delhi", source: "Public", type: "Harassment", status: "Escalated", lastUpdate: "2025-10-29" },
  { id: "GRV-00448", district: "Rohtak", source: "Worker", type: "Other", status: "Resolved", lastUpdate: "2025-10-28" },
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    whileHover={noHover ? {} : { y: -6, transition: { duration: 0.2 } }}
    className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 ${className}`}
  >
    {children}
  </motion.div>
);

/**
 * 2. FormInputGroup Component
 * Standardized wrapper for form inputs with focus-within glow.
 */
interface FormInputGroupProps {
  label: string;
  children: React.ReactNode;
  required: boolean;
  htmlFor: string;
  className?: string;
}
const FormInputGroup: React.FC<FormInputGroupProps> = ({ label, children, required, htmlFor, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={htmlFor} className="mb-1.5 text-sm font-medium text-navy-800">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="form-input-wrapper">
      {children}
    </div>
  </div>
);

/**
 * 3. StatusBadge (for Table)
 * Displays a styled badge for different statuses.
 */
interface StatusBadgeProps {
  status: "Pending" | "Resolved" | "Escalated";
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<string, { icon: React.ReactNode; styles: string }> = {
    Pending: { icon: <AlertTriangle size={12} />, styles: "bg-amber-100 text-amber-800 border-amber-200" },
    Resolved: { icon: <CheckCircle size={12} />, styles: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    Escalated: { icon: <ArrowUpCircle size={12} />, styles: "bg-red-100 text-red-800 border-red-200" },
  };
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
    className="form-input"
  />
);

/**
 * 5. SummaryCard Component (for KPIs)
 * Gradient cards for the dashboard enhancements.
 */
interface SummaryCardProps {
  title: string;
  count: number;
  change: string;
  icon: React.ReactNode;
  gradientClass: string;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, change, icon, gradientClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className={`relative rounded-xl shadow-lg p-5 text-white overflow-hidden ${gradientClass}`}
    style={{
      background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div className="absolute inset-0 opacity-10">
      {icon}
    </div>
    <div className="relative z-10">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-1">{count}</p>
      <span className="text-sm font-medium">{change}</span>
    </div>
  </motion.div>
);


/**
 * 6. Toast Component
 * For success messages.
 */
interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error";
}
const Toast: React.FC<ToastProps> = ({ isVisible, onClose, message, type = "success" }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => { onClose(); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const config = {
    success: { icon: <CheckCircle size={20} />, styles: "bg-emerald-600" },
    error: { icon: <AlertOctagon size={20} />, styles: "bg-red-600" },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-10 right-10 z-50 p-4 rounded-xl shadow-2xl text-white flex items-center gap-3 ${config[type].styles}`}
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
interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  badgeText: string;
  children: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({ icon, title, badgeText, children }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/50 rounded-t-2xl">
    <div className="flex items-center gap-3">
      <span className="text-royal-blue-600">{icon}</span>
      <h3 className="text-base font-semibold text-navy-800">{title}</h3>
      {badgeText && (
        <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
          {badgeText}
        </span>
      )}
    </div>
    <div className="flex items-center gap-3">
      {children}
    </div>
  </div>
);


// --- MAIN PAGE COMPONENT ---
export default function GrievanceFeedbackEntry() {
  // Form State
  const [district, setDistrict] = useState("dwarka");
  const [grievanceId, setGrievanceId] = useState("GRV-00452"); // Auto-generated
  const [source, setSource] = useState("worker");
  const [grievanceType, setGrievanceType] = useState("inaction");
  const [description, setDescription] = useState("");
  const [dateReceived, setDateReceived] = useState(new Date().toISOString().split('T')[0]);
  const [actionTaken, setActionTaken] = useState("");
  const [status, setStatus] = useState("pending");
  const [escalatedTo, setEscalatedTo] = useState("");

  // UI State
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    setHasMounted(true);
    // Simulate fetching a new Grievance ID
    setGrievanceId(`GRV-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  const handleClearForm = () => {
    setDistrict("");
    setSource("");
    setGrievanceType("");
    setDescription("");
    setDateReceived(new Date().toISOString().split('T')[0]);
    setActionTaken("");
    setStatus("pending");
    setEscalatedTo("");
    setGrievanceId(`GRV-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  // Fix implicit `any` type for handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Grievance update submitted successfully!");
      setToastType("success");
      setShowToast(true);
      // Optionally clear form or move to next step
      handleClearForm();
    }, 1500);
  };

  const handleSaveDraft = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Draft saved!");
      setToastType("success"); // Could be a different type/color
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
      className="min-h-screen p-6 lg:p-10 bg-gradient-to-br from-white via-blue-50 to-slate-100"
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
            <span className="text-slate-800 font-semibold">Grievance Feedback</span>
          </nav>
          {/* Title */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-navy-700 text-white shadow-lg shadow-navy-500/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Grievance Feedback Entry</h1>
                <p className="text-sm text-slate-600">Log and update police grievance resolutions for SKs, SHGs, and Public.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="max-w-7xl mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          {/* --- Main Form Card --- */}
          <GlassCard>
            <CardHeader
              icon={<ClipboardList size={20} />}
              title="Grievance Details"
              badgeText={grievanceId}
            >
              {/* Add any children content here, or leave empty if not needed */}
              <div></div>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                
                {/* --- Column 1 --- */}
                <FormInputGroup label="District" htmlFor="district" required>
                  <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select">
                    {districtOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>
                
                <FormInputGroup label="Source" htmlFor="source" required>
                  <select id="source" value={source} onChange={(e) => setSource(e.target.value)} className="form-select">
                    {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>

                <FormInputGroup label="Grievance Type" htmlFor="type" required>
                  <select id="type" value={grievanceType} onChange={(e) => setGrievanceType(e.target.value)} className="form-select">
                    {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>
                
                <FormInputGroup label="Date Received" htmlFor="dateReceived" required>
                  <DatePicker id="dateReceived" value={dateReceived} onChange={(e) => setDateReceived(e.target.value)} />
                </FormInputGroup>

                <div className="md:col-span-2">
                  <FormInputGroup label="Description" htmlFor="description" required>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" rows={4} placeholder="Enter detailed description of the grievance..."></textarea>
                  </FormInputGroup>
                </div>
                
                <div className="md:col-span-2 border-t border-slate-200 pt-5">
                  <FormInputGroup label="Action Taken" htmlFor="actionTaken" required>
                    <textarea id="actionTaken" value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} className="form-textarea" rows={4} placeholder="Describe the action taken by the department..."></textarea>
                  </FormInputGroup>
                </div>
                
                <FormInputGroup label="Status" htmlFor="status" required>
                  <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormInputGroup>

                {/* --- Conditional Field --- */}
                <AnimatePresence>
                  {status === 'escalated' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '0px' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FormInputGroup label="Escalated To" htmlFor="escalatedTo" required>
                        <select id="escalatedTo" value={escalatedTo} onChange={(e) => setEscalatedTo(e.target.value)} className="form-select">
                          {escalatedToOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      </FormInputGroup>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* --- Form Button Bar --- */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-200 rounded-b-2xl flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={handleClearForm}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw size={16} />
                Clear
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-navy-700 border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Save size={16} />
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-36 px-5 py-2.5 rounded-lg text-sm font-semibold bg-navy-700 text-white hover:bg-navy-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
                {isLoading ? "Submitting..." : "Submit Update"}
              </button>
            </div>
          </GlassCard>
        </form>

        {/* --- Dashboard Enhancements --- */}
        <section className="mt-12">
          {/* 📊 Summary Mini-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
              title="Pending Grievances"
              count={mockSummaryData.pending.count}
              change={mockSummaryData.pending.change}
              icon={<AlertTriangle size={80} />}
              gradientClass="from-amber-500 to-yellow-400"
            />
            <SummaryCard
              title="Resolved Grievances"
              count={mockSummaryData.resolved.count}
              change={mockSummaryData.resolved.change}
              icon={<CheckCircle size={80} />}
              gradientClass="from-emerald-500 to-green-400"
            />
            <SummaryCard
              title="Escalated Grievances"
              count={mockSummaryData.escalated.count}
              change={mockSummaryData.escalated.change}
              icon={<ArrowUpCircle size={80} />}
              gradientClass="from-red-500 to-rose-400"
            />
          </div>

          {/* 🕓 Recent Activity Table */}
          <div className="mt-12">
            <GlassCard noHover>
              <CardHeader
                icon={<BookOpen size={20} />}
                title="Recent Grievance Activity"
                badgeText=""
              >
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                  <FileSpreadsheet size={14} />
                  Export CSV
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                  <FileBarChart size={14} />
                  Generate PDF
                </button>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-slate-100/80 backdrop-blur-sm z-10">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Grievance ID</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">District</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Source</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Type</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Last Update</th>
                      <th className="px-5 py-3 text-left text-xs text-slate-600 font-medium uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {mockRecentActivity.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-navy-800">{item.id}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">{item.district}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">{item.source}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">{item.type}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <StatusBadge status={item.status as "Pending" | "Resolved" | "Escalated"} />
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">{item.lastUpdate}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <button className="p-1.5 rounded-md text-royal-blue-600 hover:bg-blue-100 transition-colors">
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
            <a href="#" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
              <FileBarChart size={14} /> Generate PDF Report
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-700 transition-colors">
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
        type={toastType as "success" | "error"}
      />
      
      {/* --- Global Styles for Form Inputs --- */}
      {/* FIX: Removed boolean props 'jsx' and 'global' from style tags */}
      <style jsx global>{`
        /* Define custom colors */
        .bg-navy-700 { background-color: #1e3a8a; } /* Royal Blue/Navy */
        .hover\\:bg-navy-800:hover { background-color: #1e3a8a; } /* Darker Navy */
        .text-navy-700 { color: #1e3a8a; }
        .text-navy-800 { color: #1e3a8a; } /* Darker Navy */
        .text-navy-900 { color: #172554; } /* Darkest Navy */
        .shadow-navy-500\\/30 { box-shadow: 0 10px 15px -3px rgb(30 58 138 / 0.3), 0 4px 6px -4px rgb(30 58 138 / 0.3); }
        .text-royal-blue-600 { color: #2563eb; }
        .hover\\:text-navy-700:hover { color: #1e3a8a; }
        
        .from-amber-500 { --tw-gradient-from: #f59e0b; --tw-gradient-to: rgb(245 158 11 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-yellow-400 { --tw-gradient-to: #facc15; }
        .from-emerald-500 { --tw-gradient-from: #10b981; --tw-gradient-to: rgb(16 185 129 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-green-400 { --tw-gradient-to: #4ade80; }
        .from-red-500 { --tw-gradient-from: #ef4444; --tw-gradient-to: rgb(239 68 68 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-rose-400 { --tw-gradient-to: #fb7185; }

        /* Form Input Styling */
        .form-input-wrapper {
          position: relative;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem; /* 12px 16px */
          font-size: 0.9rem;
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
      `}</style>
      <style jsx>{`
        /* Page-specific styles */
      `}</style>
    </motion.div>
  );
}

