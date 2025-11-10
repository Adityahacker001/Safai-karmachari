// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client';

import React, { useState } from 'react';
import {
  PlusCircle,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Target,
  Users,
  DollarSign,
  Calendar,
  FileText,
  MessageSquare,
  UploadCloud,
  Paperclip,
  Trash2,
  ShieldCheck,
  Archive,
  Save,
  CheckCircle,
  X,
  AlertCircle,
  File as FileIcon,
  FileImage,
  Loader2,
} from 'lucide-react';

// --- Reusable Form Components ---

// 1. Form Input Component
type FormInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | null;
  icon?: React.ElementType;
  className?: string;
  disabled?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  label, name, type, placeholder, value, onChange, required, error, icon: Icon, className = '', disabled,
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-50 cursor-not-allowed' : 'bg-white'}`}
      />
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 2. Form Select Component
type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  error?: string | null;
  icon?: React.ElementType;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label, name, value, onChange, options, required, error, icon: Icon,
}) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 3. Form Textarea Component
type FormTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string | null;
  rows?: number;
};

const FormTextarea: React.FC<FormTextareaProps & { className?: string }> = ({
  label, name, placeholder, value, onChange, required, error, rows = 3, className = "",
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${error ? 'border-red-500 ring-red-500/50' : 'bg-white'}`}
    />
    {error && (
      <p className="text-xs text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 4. Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const isPending = !status || (status !== 'Active' && status !== 'Archived');
  let config = {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: Archive,
    label: 'Archived',
    animate: false,
  };

  if (isPending) {
     config = {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      icon: Loader2,
      label: 'Pending',
      animate: true,
     };
  } else if (status === 'Active') {
    config = {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: ShieldCheck,
      label: 'Active',
      animate: true,
    };
  }
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-slate-700">Current Status</label>
      <div className={`inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-bold ${config.bg} ${config.text} transition-all duration-300`}>
        <config.icon className={`w-5 h-5 mr-2 ${config.animate ? 'animate-pulse' : ''}`} />
        {config.label}
      </div>
    </div>
  );
};

// 5. File Upload Component
type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: string | null;
};

const FileUpload: React.FC<FileUploadProps & { className?: string }> = ({ files, onFilesChange, error, className = "" }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const combinedFiles = [...files, ...newFiles].slice(0, 3); // Limit 3 files
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
        Supporting Documents <span className="text-red-500">*</span>
      </label>
      <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${error ? 'border-red-500' : 'border-slate-900/25'} bg-sky-50/50 px-6 py-10 transition-colors duration-200 hover:border-indigo-400`}>
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
          <div className="mt-4 flex text-sm leading-6 text-slate-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={files.length >= 3}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-slate-500">
            PDF, JPG, PNG up to 10MB each. Max 3 files.
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2 truncate">
                {getFileIcon(file.name)}
                <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};


// --- Main Page Component ---

type FormState = {
  schemeName: string;
  schemeType: string;
  targetGroup: string;
  eligibility: string;
  startDate: string;
  endDate: string;
  fundLimit: string;
  remarks: string;
  status: string;
};

type Errors = {
  [K in keyof FormState]?: string | null;
} & { files?: string | null };


const NewSchemeEntryPage = () => {
  const [formData, setFormData] = useState<FormState>({
    schemeName: '',
    schemeType: '',
    targetGroup: '',
    eligibility: '',
    startDate: '',
    endDate: '',
    fundLimit: '',
    remarks: '',
    status: 'Active', // Default status
  });

  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (errors.files) {
      setErrors((prev) => ({ ...prev, files: null }));
    }
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.schemeName) newErrors.schemeName = 'Scheme Name is required.';
    if (!formData.schemeType) newErrors.schemeType = 'Scheme Type is required.';
    if (!formData.targetGroup) newErrors.targetGroup = 'Target Group is required.';
    if (!formData.eligibility) newErrors.eligibility = 'Eligibility Criteria are required.';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required.';
    if (!formData.endDate) newErrors.endDate = 'End Date is required.';
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End Date cannot be before Start Date.';
    }
    
    if (!formData.fundLimit) {
      newErrors.fundLimit = 'Fund Allocation Limit is required.';
    } else if (isNaN(Number(formData.fundLimit))) {
      newErrors.fundLimit = 'Must be a valid number.';
    }

    if (!formData.status) newErrors.status = 'Status is required.';
    
    if (files.length === 0) {
      newErrors.files = 'At least one supporting document is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // API call simulation
      console.log('Form Submitted:', formData, files);
      setTimeout(() => {
        alert('Scheme Submitted Successfully!');
        // Reset form
        setFormData({
          schemeName: '', schemeType: '', targetGroup: '', eligibility: '',
          startDate: '', endDate: '', fundLimit: '', remarks: '', status: 'Active',
        });
        setFiles([]);
        setErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Validation Failed:', errors);
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-5xl mx-auto p-2 sm:p-4 md:p-8">
        {/* Gradient Header Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 sm:p-8 mb-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="p-2 bg-white/20 rounded-full text-white shadow-lg">
            <PlusCircle className="w-8 h-8" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Add New Scheme Entry</h1>
            <p className="text-white/90 text-base">Enter details of the new government scheme for approval and listing under active programs.</p>
          </div>
        </div>
        {/* Responsive Form Section */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              
              <FormInput
                label="Scheme Name"
                name="schemeName"
                type="text"
                placeholder="e.g., Safai Mitra Skill Loan Yojana"
                value={formData.schemeName}
                onChange={handleChange}
                required
                error={errors.schemeName}
                className="md:col-span-1"
              />

              <FormSelect
                label="Scheme Type"
                name="schemeType"
                value={formData.schemeType}
                onChange={handleChange}
                options={['Loan', 'Grant', 'Skill Development', 'Rehabilitation']}
                required
                error={errors.schemeType}
                icon={Target}
              />

              <FormSelect
                label="Target Group"
                name="targetGroup"
                value={formData.targetGroup}
                onChange={handleChange}
                options={['Individual SK', 'SHG (Self Help Group)']}
                required
                error={errors.targetGroup}
                icon={Users}
              />
              
              <FormInput
                label="Fund Allocation Limit (₹)"
                name="fundLimit"
                type="number"
                placeholder="e.g., 500000"
                value={formData.fundLimit}
                onChange={handleChange}
                required
                error={errors.fundLimit}
                icon={DollarSign}
              />
              
              {/* Date Range */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">
                  Application Window <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <FormInput
                    label="Start Date"
                    name="startDate"
                    type="date"
                    placeholder=""
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
                    icon={Calendar}
                  />
                  <FormInput
                    label="End Date"
                    name="endDate"
                    type="date"
                    placeholder=""
                    value={formData.endDate}
                    onChange={handleChange}
                    error={errors.endDate}
                    icon={Calendar}
                  />
                </div>
              </div>

              <FormTextarea
                label="Eligibility Criteria"
                name="eligibility"
                placeholder="Applicant must be a registered Safai Karamchari..."
                value={formData.eligibility}
                onChange={handleChange}
                required
                error={errors.eligibility}
                rows={4}
                className="md:col-span-2"
              />

              <FormTextarea
                label="Remarks (Optional)"
                name="remarks"
                placeholder="Optional internal notes about the scheme"
                value={formData.remarks}
                onChange={handleChange}
                rows={3}
                className="md:col-span-2"
              />

              <FileUpload
                files={files}
                onFilesChange={handleFileChange}
                error={errors.files}
                className="md:col-span-2"
              />

              <FormSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={['Active', 'Archived']}
                required
                error={errors.status}
              />

              <StatusBadge status={formData.status} />

            </div>
          </div>
          {/* Buttons Section */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4">
              <button
                type="button"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2.5 rounded-lg font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
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
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </button>
            </div>
          </div>
        </form>
        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-xs text-slate-500">
            Last Edited By: <strong>Ravi Sharma</strong> • Last Updated: <strong>25 Oct 2025, 10:30 AM</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NewSchemeEntryPage;