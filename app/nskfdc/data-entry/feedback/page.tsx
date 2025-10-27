// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client'; // Next.js App Router ke liye

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
  List,
  Info,
  ListChecks,
  BadgeCheck,
  BadgeHelp,
  Smile,       // Appreciation
  HelpCircle,  // Suggestion
  MessageCircleWarning, // Complaint
} from 'lucide-react';

// --- Mock Data ---
const mockSource = ['Beneficiary', 'Staff', 'Public'];
const mockType = ['Suggestion', 'Appreciation', 'Complaint'];
const mockStatus = ['Pending', 'Resolved'];

// --- Utility: Date Helpers ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

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
        className={`block w-full p-2.5 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : 'bg-white'}`}
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
  icon?: React.ElementType; className?: string;
};
const FormSelect: React.FC<FormSelectProps> = ({
  label, name, value, onChange, options, required, error, icon: Icon, className = '',
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <select
        id={name} name={name} value={value} onChange={onChange}
        className={`block w-full p-2.5 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
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
  label, name, placeholder, value, onChange, required, error, rows = 4, className = '', maxLength = 1000,
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      maxLength={maxLength}
      className={`block w-full p-2.5 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 resize-none ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
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

// 5. Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const config = useMemo(() => {
    switch (status) {
      case 'Resolved':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: BadgeCheck, label: 'Resolved' };
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

// 6. Dynamic Icon Picker for Feedback Type
const FeedbackTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case 'Appreciation': return Smile;
      case 'Complaint': return MessageCircleWarning;
      case 'Suggestion':
      default:
        return HelpCircle;
    }
  }, [type]);
  return <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />;
};


// --- Main Page Component ---

type FormState = {
  feedbackId: string;
  feedbackSource: string;
  feedbackType: string;
  description: string;
  dateReceived: string;
  actionTaken: string;
  status: string;
};
type Errors = Partial<Record<keyof FormState, string | null>>;

const GeneralFeedbackPage = () => {
  const today = getTodayDate();
  const [formData, setFormData] = useState<FormState>({
    feedbackId: `FDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-gen
    feedbackSource: '',
    feedbackType: '',
    description: '',
    dateReceived: '',
    actionTaken: '',
    status: 'Pending',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Clear conditional error if status changes
    if (name === 'status' && value === 'Pending' && errors.actionTaken) {
      setErrors(prev => ({ ...prev, actionTaken: null }));
    }
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.feedbackSource) newErrors.feedbackSource = 'Source is required.';
    if (!formData.feedbackType) newErrors.feedbackType = 'Type is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.dateReceived) newErrors.dateReceived = 'Date Received is required.';
    if (!formData.status) newErrors.status = 'Status is required.';
    
    // Conditional Validation
    if (formData.status === 'Resolved' && !formData.actionTaken) {
      newErrors.actionTaken = 'Action Taken is required if status is "Resolved".';
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
        alert('Feedback Submitted Successfully!');
        // Reset form
        setFormData({
          feedbackId: `FDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          feedbackSource: '', feedbackType: '', description: '', dateReceived: '',
          actionTaken: '', status: 'Pending',
        });
        setErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Validation Failed:', errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- 1. Header Section --- */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Breadcrumb & Title */}
            <div>
              <nav className="flex items-center text-sm font-medium text-slate-500" aria-label="Breadcrumb">
                <LayoutDashboard className="w-4 h-4 mr-1.5" />
                Dashboard
                <ChevronRight className="w-4 h-4 mx-1" />
                <ClipboardList className="w-4 h-4 mr-1.5" />
                Data Entry
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-semibold text-indigo-600">General Feedback Input</span>
              </nav>
              <div className="mt-4 flex items-center space-x-3">
                <span className="p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full text-white shadow-lg">
                  <MessageSquare className="w-8 h-8" />
                </span>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    General Feedback Input
                  </h1>
                  <p className="text-slate-500 mt-1">
                    Record feedback from beneficiaries, staff, and the public.
                  </p>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Feedback
            </button>
          </div>
        </header>

        {/* --- 2. Form --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Card 1: Feedback Information */}
          <FormCard title="Feedback Information" icon={Info}>
            <FormInput
              label="Feedback ID"
              name="feedbackId"
              type="text"
              value={formData.feedbackId}
              onChange={() => {}}
              disabled
              icon={FileText}
              placeholder="Enter Feedback ID"
            />
            <FormInput
              label="Date Received" name="dateReceived" type="date"
              placeholder="" max={today}
              value={formData.dateReceived} onChange={handleChange}
              required error={errors.dateReceived}
              icon={Calendar}
            />
            <FormSelect
              label="Feedback Source" name="feedbackSource"
              value={formData.feedbackSource} onChange={handleChange}
              options={mockSource} required error={errors.feedbackSource}
              icon={Users}
            />
            
            {/* Custom Select with Dynamic Icon */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="feedbackType" className="text-sm font-semibold text-slate-700">
                Feedback Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FeedbackTypeIcon type={formData.feedbackType} />
                <select
                  id="feedbackType" name="feedbackType" value={formData.feedbackType} onChange={handleChange}
                  className={`block w-full p-2.5 pl-10 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${errors.feedbackType ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
                >
                  <option value="" disabled>Select Feedback Type</option>
                  {mockType.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {errors.feedbackType && (
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" /> {errors.feedbackType}
                </p>
              )}
            </div>
            
            <FormTextarea
              label="Description" name="description"
              placeholder="Enter the full feedback description..."
              value={formData.description} onChange={handleChange}
              required error={errors.description} rows={5}
              className="md:col-span-2"
              maxLength={1000}
            />
          </FormCard>

          {/* Card 2: Action & Status Details */}
          <FormCard title="Action & Status Details" icon={ListChecks}>
            <FormSelect
              label="Status" name="status"
              value={formData.status} onChange={handleChange}
              options={mockStatus} required error={errors.status}
              className="md:col-span-1"
            />
            <StatusBadge status={formData.status} />

            <FormTextarea
              label="Action Taken" name="actionTaken"
              placeholder="Description of steps or actions taken in response..."
              value={formData.actionTaken} onChange={handleChange}
              // Conditional Requirement
              required={formData.status === 'Resolved'}
              error={errors.actionTaken}
              rows={5} className="md:col-span-2"
              maxLength={1000}
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
                type="submit"
                disabled={isSubmitting}
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

export default GeneralFeedbackPage;