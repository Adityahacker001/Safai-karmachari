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
  UploadCloud,
  Paperclip,
  Trash2,
  File as FileIcon,
  FileImage,
  Users,
  Building,
  List,
  Flag,
  ShieldCheck,
  History,
  Clock,
  Hourglass,
  BookOpen,
  Send,
  Building2,
  BadgeAlert,
  ListChecks,
} from 'lucide-react';

// --- Mock Data ---
const mockIssuingAuthority = ['MSJE', 'NSKFDC HQ', 'State Office', 'District Office'];
const mockPriority = ['High', 'Medium', 'Low'];
const mockCategory = ['Policy Implementation', 'Fund Utilization', 'Scheme Report', 'Compliance Reminder', 'Audit Query'];
const mockComplianceStatus = ['Pending', 'Complied', 'Partially Complied', 'Overdue'];
const mockDepartments = ['Finance', 'Project Monitoring', 'Human Resources', 'Operations'];

// --- Utility: Date Helpers ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

const getDaysRemaining = (dueDate: string) => {
  if (!dueDate) return { days: 0, isOverdue: false, text: 'Set Due Date' };
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0); // Normalize today to start of day
  due.setHours(0, 0, 0, 0); // Normalize due date to start of day
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { days: Math.abs(diffDays), isOverdue: true, text: `Overdue by ${Math.abs(diffDays)} days` };
  } else if (diffDays === 0) {
    return { days: 0, isOverdue: false, text: 'Due Today' };
  } else {
    return { days: diffDays, isOverdue: false, text: `${diffDays} days remaining` };
  }
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
  className?: string; disabled?: boolean; max?: string; min?: string;
};
const FormInput: React.FC<FormInputProps> = ({
  label, name, type, placeholder, value, onChange, required, error, icon: Icon, className = '', disabled = false, max, min,
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <input
        type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}
        disabled={disabled} max={max} min={min}
        className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : 'bg-white'}`}
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
        className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
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
};
const FormTextarea: React.FC<FormTextareaProps> = ({
  label, name, placeholder, value, onChange, required, error, rows = 3, className = '',
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
    />
    {error && (
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

// 5. File Upload Component
type FileUploadProps = {
  title: string; tooltip: string; files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles: number; error?: string | null; className?: string; required?: boolean;
};
const FileUpload: React.FC<FileUploadProps> = ({ title, tooltip, files, onFilesChange, maxFiles, error, className = '', required }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
      onFilesChange(combinedFiles);
    }
  };
  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileIcon className="w-5 h-5 text-red-500" />;
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.jpeg')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    return <Paperclip className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-semibold text-slate-700">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${error ? 'border-red-500' : 'border-slate-900/25'} bg-sky-50/50 px-6 py-10 transition-colors duration-200 hover:border-indigo-400`}
        title={tooltip}
      >
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
          <div className="mt-4 flex text-sm leading-6 text-slate-600">
            <label
              htmlFor={`file-upload-${name}`}
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input 
                id={`file-upload-${name}`} name={`file-upload-${name}`} type="file" className="sr-only" 
                multiple accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={files.length >= maxFiles}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-slate-500">
            PDF, JPG, PNG up to 10MB each. Max {maxFiles} files.
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center space-x-2 truncate">
                {getFileIcon(file.name)}
                <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
              </div>
              <button
                type="button" onClick={() => removeFile(index)}
                className="p-1 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-xs text-red-600 flex items-center mt-1">
          <AlertCircle className="w-4 h-4 mr-1" /> {error}
        </p>
      )}
    </div>
  );
};


// --- Main Page Component ---

type FormState = {
  directionRefNo: string;
  dateOfIssue: string;
  issuingAuthority: string;
  subject: string;
  description: string;
  priority: string;
  category: string;
  dueDate: string;
  complianceStatus: string;
  complianceRemarks: string;
  actionTakenDate: string;
  officerResponsible: string;
  department: string;
  optionalNotes: string;
};
type Errors = { [K in keyof FormState]?: string | null; } & {
  filesDirection?: string | null;
  filesCompliance?: string | null;
};

const DirectionInputPage = () => {
  const today = getTodayDate();
  const [formData, setFormData] = useState<FormState>({
    directionRefNo: `DIR-${new Date().getFullYear()}-MSJE-`,
    dateOfIssue: '',
    issuingAuthority: '',
    subject: '',
    description: '',
    priority: 'Medium',
    category: '',
    dueDate: '',
    complianceStatus: 'Pending',
    complianceRemarks: '',
    actionTakenDate: '',
    officerResponsible: '',
    department: '',
    optionalNotes: '',
  });
  const [directionFiles, setDirectionFiles] = useState<File[]>([]);
  const [complianceFiles, setComplianceFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Date Calculation
  const dueDateStatus = useMemo(() => getDaysRemaining(formData.dueDate), [formData.dueDate]);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  const handleDirectionFileChange = (newFiles: File[]) => {
    setDirectionFiles(newFiles);
    if (errors.filesDirection) setErrors((prev) => ({ ...prev, filesDirection: null }));
  };
  const handleComplianceFileChange = (newFiles: File[]) => {
    setComplianceFiles(newFiles);
    if (errors.filesCompliance) setErrors((prev) => ({ ...prev, filesCompliance: null }));
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    // Direction Details
    if (!formData.directionRefNo) newErrors.directionRefNo = 'Reference No. is required.';
    if (!formData.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required.';
    if (!formData.issuingAuthority) newErrors.issuingAuthority = 'Issuing Authority is required.';
    if (!formData.subject) newErrors.subject = 'Subject/Title is required.';
    if (!formData.description) newErrors.description = 'Detailed Description is required.';
    if (!formData.priority) newErrors.priority = 'Priority Level is required.';
    if (!formData.category) newErrors.category = 'Category/Type is required.';
    if (!formData.dueDate) newErrors.dueDate = 'Compliance Due Date is required.';
    if (formData.dateOfIssue && formData.dueDate && formData.dueDate < formData.dateOfIssue) {
      newErrors.dueDate = 'Due Date must be on or after Date of Issue.';
    }
    if (directionFiles.length === 0) {
      newErrors.filesDirection = 'At least one Direction Copy is required.';
    }

    // Compliance Details
    if (!formData.complianceStatus) newErrors.complianceStatus = 'Compliance Status is required.';
    if (!formData.officerResponsible) newErrors.officerResponsible = 'Officer Responsible is required.';
    if (!formData.department) newErrors.department = 'Department is required.';

    // Conditional Validation for Compliance
    const isComplianceInfoRequired = formData.complianceStatus === 'Complied' || formData.complianceStatus === 'Partially Complied';
    if (isComplianceInfoRequired) {
      if (!formData.complianceRemarks) newErrors.complianceRemarks = 'Compliance Remarks are required for this status.';
      if (!formData.actionTakenDate) newErrors.actionTakenDate = 'Action Taken Date is required for this status.';
      if (formData.actionTakenDate > today) newErrors.actionTakenDate = 'Action Date cannot be in the future.';
      if (complianceFiles.length === 0) newErrors.filesCompliance = 'Compliance Proof is required for this status.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Form Submitted:', formData, { directionFiles, complianceFiles });
      setTimeout(() => {
        alert('Direction Submitted Successfully!');
        // Reset form or redirect
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Validation Failed:', errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
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
                <span className="font-semibold text-indigo-600">Direction Input</span>
              </nav>
              <div className="mt-4 flex items-center space-x-3">
                <span className="p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full text-white shadow-lg">
                  <FileText className="w-8 h-8" />
                </span>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    Direction Input
                  </h1>
                  <p className="text-slate-500 mt-1">
                    Record and manage official directions received from MSJE or HQ.
                  </p>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Directions
            </button>
          </div>
        </header>

        {/* --- 2. Form --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Card 1: Direction Details */}
          <FormCard title="Direction Details" icon={FileText}>
            <FormInput
              label="Direction Reference No." name="directionRefNo" type="text"
              placeholder="e.g., DIR-2025-MIN-045"
              value={formData.directionRefNo} onChange={handleChange}
              required error={errors.directionRefNo}
              icon={FileText}
            />
            <FormSelect
              label="Issuing Authority" name="issuingAuthority"
              value={formData.issuingAuthority} onChange={handleChange}
              options={mockIssuingAuthority} required error={errors.issuingAuthority}
              icon={Building2}
            />
            <FormInput
              label="Subject / Title" name="subject" type="text"
              placeholder="e.g., Fund Utilization Report Submission"
              value={formData.subject} onChange={handleChange}
              required error={errors.subject}
              className="md:col-span-2"
            />
            <FormTextarea
              label="Detailed Description" name="description"
              placeholder="e.g., Submit fund utilization data for Q2 FY 2024-25"
              value={formData.description} onChange={handleChange}
              required error={errors.description} rows={4}
              className="md:col-span-2"
            />
            <FormInput
              label="Date of Issue" name="dateOfIssue" type="date"
              placeholder="" max={today}
              value={formData.dateOfIssue} onChange={handleChange}
              required error={errors.dateOfIssue}
              icon={Calendar}
            />
            <FormInput
              label="Compliance Due Date" name="dueDate" type="date"
              placeholder="" min={formData.dateOfIssue}
              value={formData.dueDate} onChange={handleChange}
              required error={errors.dueDate}
              icon={Clock}
            />
            <FormSelect
              label="Priority Level" name="priority"
              value={formData.priority} onChange={handleChange}
              options={mockPriority} required error={errors.priority}
              icon={Flag}
            />
            <FormSelect
              label="Category / Type" name="category"
              value={formData.category} onChange={handleChange}
              options={mockCategory} required error={errors.category}
              icon={ListChecks}
            />
            
            {/* Dynamic Date Status */}
            {formData.dueDate && (
              <div className={`md:col-span-2 p-4 rounded-lg flex items-center space-x-2 ${dueDateStatus.isOverdue ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                {dueDateStatus.isOverdue ? (
                  <BadgeAlert className="w-6 h-6 text-red-600" />
                ) : (
                  <Hourglass className="w-6 h-6 text-green-600" />
                )}
                <span className={`text-base font-semibold ${dueDateStatus.isOverdue ? 'text-red-700' : 'text-green-700'}`}>
                  {dueDateStatus.text}
                </span>
              </div>
            )}

            <FileUpload
              title="Direction Copy (Scanned Document)"
              tooltip="Attach the official letter or document received."
              files={directionFiles}
              onFilesChange={handleDirectionFileChange}
              maxFiles={2}
              error={errors.filesDirection}
              className="md:col-span-2"
              required
            />
          </FormCard>

          {/* Card 2: Compliance Information */}
          {/* <FormCard title="Compliance Information" icon={ShieldCheck}>
            <FormSelect
              label="Compliance Status" name="complianceStatus"
              value={formData.complianceStatus} onChange={handleChange}
              options={mockComplianceStatus} required error={errors.complianceStatus}
              icon={ShieldCheck}
            />
            <FormInput
              label="Action Taken Date" name="actionTakenDate" type="date"
              placeholder="" max={today}
              value={formData.actionTakenDate} onChange={handleChange}
              required={formData.complianceStatus === 'Complied' || formData.complianceStatus === 'Partially Complied'}
              error={errors.actionTakenDate}
              icon={Calendar}
            />
            <FormInput
              label="Officer Responsible" name="officerResponsible" type="text"
              placeholder="e.g., Ravi Sharma"
              value={formData.officerResponsible} onChange={handleChange}
              required error={errors.officerResponsible}
              icon={Users}
            />
            <FormSelect
              label="Department / Division" name="department"
              value={formData.department} onChange={handleChange}
              options={mockDepartments} required error={errors.department}
              icon={Building}
            />
            <FormTextarea
              label="Compliance Remarks" name="complianceRemarks"
              placeholder="e.g., Report submitted to HQ via email ref: 123"
              value={formData.complianceRemarks} onChange={handleChange}
              required={formData.complianceStatus === 'Complied' || formData.complianceStatus === 'Partially Complied'}
              error={errors.complianceRemarks} rows={4}
              className="md:col-span-2"
            />
            <FormTextarea
              label="Remarks / Notes (Optional)" name="optionalNotes"
              placeholder="Optional internal notes..."
              value={formData.optionalNotes} onChange={handleChange}
              rows={3} className="md:col-span-2"
            />
            <FileUpload
              title="Compliance Proof (Supporting Document)"
              tooltip="Attach the Action Taken Report (ATR) or compliance proof."
              files={complianceFiles}
              onFilesChange={handleComplianceFileChange}
              maxFiles={2}
              error={errors.filesCompliance}
              className="md:col-span-2"
              required={formData.complianceStatus === 'Complied' || formData.complianceStatus === 'Partially Complied'}
            />
          </FormCard> */}
          
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
                {isSubmitting ? 'Submitting...' : 'Submit Direction'}
              </button>
            </div>
          </div>
        </form>

        {/* --- 4. Footer --- */}
        <footer className="text-center mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Created By: <strong>Ravi Sharma</strong> • Created On: <strong>20 Oct 2025</strong>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated By: <strong>Admin</strong> • Updated On: <strong>25 Oct 2025</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DirectionInputPage;