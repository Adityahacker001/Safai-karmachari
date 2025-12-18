// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client';

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ChevronRight,
  ClipboardList,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  X,
  Loader2,
  Save,
  Users,
  MessageSquare,
  BookOpen,
  Send,
  Building2,
  ShieldAlert,
  List,
  DollarSign,
  HelpCircle,
  Info,
  ListChecks,
  BadgeCheck,
  BadgeHelp,
  BadgeAlert,
  History,
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

// --- Mock Data ---
const mockSource = ['Individual SK', 'SHG (Self Help Group)'];
const mockType = ['Scheme Delay', 'Fund Issue', 'Eligibility Dispute', 'Other'];
const mockStatus = ['Pending', 'Resolved', 'Escalated'];
const mockEscalationTarget = ['NSKC (National Commission)', 'State Nodal Officer'];

// --- Utility: Date Helpers ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

const getGrievanceAge = (dateReceived: string) => {
  if (!dateReceived) return null;
  const today = new Date();
  const received = new Date(dateReceived);
  today.setHours(0, 0, 0, 0);
  received.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - received.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 30) {
    return { days: diffDays, text: `Grievance is ${diffDays} days old.` };
  }
  return null;
};

// --- Reusable Components ---

// 1. Form Card Wrapper
type FormCardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
};
const FormCard: React.FC<FormCardProps> = ({ title, icon: Icon, children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 ${className}`}>
    <h2 className="flex items-center text-xl font-semibold text-slate-800 mb-6 pb-4 border-b border-slate-200">
      <span className="p-2 bg-indigo-100 rounded-lg mr-3">
        <Icon className="w-6 h-6 text-indigo-600" />
      </span>
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
      {children}
    </div>
  </div>
);

// 2. Form Input Component
type FormInputProps = {
  label: string; name: string; type: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; error?: string | null; icon?: React.ElementType;
  className?: string; disabled?: boolean; max?: string;
};
const FormInput: React.FC<FormInputProps> = ({
  label, name, type, placeholder, value, onChange, required, error, icon: Icon, className = '', disabled = false, max
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <input
        type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}
        disabled={disabled} max={max}
        className={`block w-full rounded-lg border-2 border-indigo-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-slate-50 px-4 py-2 text-slate-800 placeholder:text-slate-400 transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : 'bg-white'}`}
      />
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

// 3. Form Select Component
type FormSelectProps = {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; required?: boolean; error?: string | null;
  icon?: React.ElementType; className?: string; disabled?: boolean;
};
const FormSelect: React.FC<FormSelectProps> = ({
  label, name, value, onChange, options, required, error, icon: Icon, className = '', disabled = false
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <select
        id={name} name={name} value={value} onChange={onChange} disabled={disabled}
        className={`block w-full rounded-lg border-2 border-indigo-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-slate-50 px-4 py-2 text-slate-800 placeholder:text-slate-400 transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

// 4. Form Textarea Component
type FormTextareaProps = {
  label: string; name: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; error?: string | null; rows?: number; className?: string;
  maxLength?: number;
};
const FormTextarea: React.FC<FormTextareaProps> = ({
  label, name, placeholder, value, onChange, required, error, rows = 3, className = '', maxLength = 1000,
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      maxLength={maxLength}
      className={`block w-full rounded-lg border-2 border-indigo-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-slate-50 px-4 py-2 text-slate-800 placeholder:text-slate-400 transition-colors duration-200 resize-none ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
    />
    <div className="flex justify-between items-center">
      {error ? (
        <p className="text-xs text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" /> {error}
        </p>
      ) : (
        <div /> // Placeholder for alignment
      )}
      <p className="text-xs text-slate-400">
        {value.length}/{maxLength}
      </p>
    </div>
  </div>
);

// 5. Status Display Component
type StatusDisplayProps = {
  status: string;
};
const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  const config = useMemo(() => {
    switch (status) {
      case 'Resolved':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: BadgeCheck, label: 'Resolved' };
      case 'Escalated':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: BadgeAlert, label: 'Escalated' };
      case 'Pending':
      default:
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: BadgeHelp, label: 'Pending' };
    }
  }, [status]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-slate-700">Current Status</label>
      <div className={`inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-bold ${config.bg} ${config.text} transition-all duration-300 border ${config.text.replace('text-','border-')}`}>
        <config.icon className="w-5 h-5 mr-2" />
        {config.label}
      </div>
    </div>
  );
};

// 6. Grievance Aging Alert
const AgingAlert: React.FC<{ dateReceived: string }> = ({ dateReceived }) => {
  const ageInfo = useMemo(() => getGrievanceAge(dateReceived), [dateReceived]);

  if (!ageInfo) return null;

  return (
    <div className="md:col-span-2 p-3 rounded-lg flex items-center space-x-2 bg-red-50 border border-red-200">
      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
      <span className="text-sm font-semibold text-red-700">
        {ageInfo.text} Please prioritize resolution.
      </span>
    </div>
  );
};

// --- Main Page Component ---

type FormState = {
  grievanceId: string;
  source: string;
  type: string;
  description: string;
  dateReceived: string;
  actionTaken: string;
  status: string;
  escalatedTo: string;
};
type Errors = Partial<Record<keyof FormState, string | null>>;

const GrievanceFeedbackPage = () => {
  const today = getTodayDate();
  const [formData, setFormData] = useState<FormState>({
    grievanceId: `GRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-gen
    source: '',
    type: '',
    description: '',
    dateReceived: '',
    actionTaken: '',
    status: 'Pending',
    escalatedTo: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Custom logic for status change
    if (name === 'status' && value !== 'Escalated') {
      setFormData((prev) => ({
        ...prev,
        status: value,
        escalatedTo: '', // Clear escalation target if status changes
      }));
      if (errors.escalatedTo) setErrors(prev => ({ ...prev, escalatedTo: null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.source) newErrors.source = 'Source is required.';
    if (!formData.type) newErrors.type = 'Grievance Type is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.dateReceived) newErrors.dateReceived = 'Date Received is required.';
    if (!formData.status) newErrors.status = 'Status is required.';
    
    // Conditional Validation
    if (formData.status === 'Escalated' && !formData.escalatedTo) {
      newErrors.escalatedTo = 'Please specify where this is escalated to.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Form Submitted:', formData);
      setTimeout(() => {
        alert('Grievance Feedback Submitted Successfully!');
        // Reset form
        setFormData({
          grievanceId: `GRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          source: '', type: '', description: '', dateReceived: '',
          actionTaken: '', status: 'Pending', escalatedTo: '',
        });
        setErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Validation Failed:', errors);
    }
  };

  if (loading) {
    return (
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
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
        {/* Header with gradient card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-1">Grievance</h1>
          <p className="text-white/90 text-base">
            Record grievance feedback and track resolution actions.
          </p>
        </div>

        {/* --- 2. Form --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 w-full max-w-full mt-10 mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-pink-500" />
            Register Grievance
          </h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Card 1: Grievance Metadata */}
            <FormCard title="Grievance Metadata" icon={Info}>
              <FormInput
                label="Grievance ID"
                name="grievanceId"
                type="text"
                value={formData.grievanceId}
                onChange={() => {}}
                disabled
                icon={FileText}
                placeholder={"Enter Grievance ID" as string}
              />
              <FormInput
                label="Date Received" name="dateReceived" type="date"
                placeholder="" max={today}
                value={formData.dateReceived} onChange={handleChange}
                required error={errors.dateReceived}
                icon={Calendar}
              />
              <FormSelect
                label="Source" name="source"
                value={formData.source} onChange={handleChange}
                options={mockSource} required error={errors.source}
                icon={Users}
              />
              <FormSelect
                label="Grievance Type" name="type"
                value={formData.type} onChange={handleChange}
                options={mockType} required error={errors.type}
                icon={List}
              />
              <FormTextarea
                label="Description of Grievance" name="description"
                placeholder="Enter a detailed explanation of the grievance..."
                value={formData.description} onChange={handleChange}
                required error={errors.description} rows={5}
                className="md:col-span-2"
                maxLength={1000}
              />
              {/* Aging Alert */}
              <AgingAlert dateReceived={formData.dateReceived} />
            </FormCard>

            {/* Card 2: Action & Status Details */}
            <FormCard title="Action & Status Details" icon={ListChecks}>
              <FormTextarea
                label="Action Taken" name="actionTaken"
                placeholder="Description of steps or actions taken to resolve..."
                value={formData.actionTaken} onChange={handleChange}
                rows={5} className="md:col-span-2"
                maxLength={1000}
              />
              <FormSelect
                label="Status" name="status"
                value={formData.status} onChange={handleChange}
                options={mockStatus} required error={errors.status}
              />
              {/* Live Status Badge */}
              <StatusDisplay status={formData.status} />
              
              <FormSelect
                label="Escalated To" name="escalatedTo"
                value={formData.escalatedTo} onChange={handleChange}
                options={mockEscalationTarget}
                // Conditional required & disabled
                required={formData.status === 'Escalated'}
                disabled={formData.status !== 'Escalated'}
                error={errors.escalatedTo}
                icon={ShieldAlert}
                className="md:col-span-2"
              />
            </FormCard>
            
            {/* --- 3. Buttons Section --- */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4">
                <button
                  type="button" disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-2.5 rounded-lg font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  <X className="w-5 h-5 mr-2 inline-block" />
                  Cancel
                </button>
                <button
                  type="button" disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold text-slate-800 bg-slate-200 hover:bg-slate-300 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save as Draft
                </button>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* --- 4. Footer --- */}
        <footer className="text-center mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Created By: <strong>Officer Name</strong> • Created On: <strong>26 Oct 2025</strong>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated By: <strong>Admin</strong> • Updated On: <strong>26 Oct 2025</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GrievanceFeedbackPage;