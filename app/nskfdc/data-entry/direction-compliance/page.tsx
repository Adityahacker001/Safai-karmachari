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
  UploadCloud,
  Paperclip,
  Trash2,
  File as FileIcon,
  FileImage,
  Users,
  History,
  Clock,
  BookOpen,
  Send,
  Building2,
  BadgeAlert,
  ListChecks,
  Link,
  Eye,
  MessageSquare,
  BadgeCheck,
  BadgeX,
  BadgeHelp,
  FileCheck,
  UserCheck,
} from 'lucide-react';

// --- Mock Data ---

// Mock data to simulate fetching direction details
const mockDirectionsData: { [key: string]: any } = {
  'DIR-2025-MIN-045': {
    id: 'DIR-2025-MIN-045',
    authority: 'MSJE (Ministry)',
    dateOfIssue: '2025-10-20',
    subject: 'Fund Utilization Report Submission Q2',
    fileUrl: '/docs/DIR-2025-MIN-045.pdf',
  },
  'DIR-2025-HQ-002': {
    id: 'DIR-2025-HQ-002',
    authority: 'NSKFDC HQ',
    dateOfIssue: '2025-10-15',
    subject: 'Audit Query for Rehabilitation Scheme',
    fileUrl: '/docs/DIR-2025-HQ-002.pdf',
  },
};
const mockDirectionIDs = ['DIR-2025-MIN-045', 'DIR-2025-HQ-002'];
const mockComplianceStatus = ['Complied', 'Pending'];
const mockReviewers = ['Ravi Sharma', 'Admin User', 'Sunita Singh'];

// --- Utility: Date Helpers ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

const getDaysSinceIssued = (issueDate: string) => {
  if (!issueDate) return { text: 'N/A' };
  const today = new Date();
  const issued = new Date(issueDate);
  today.setHours(0, 0, 0, 0);
  issued.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - issued.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: 'Invalid Date' };
  if (diffDays === 0) return { text: 'Issued Today' };
  return { text: `${diffDays} days ago` };
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
  className?: string; disabled?: boolean; min?: string;
};
const FormInput: React.FC<FormInputProps> = ({
  label, name, type, placeholder, value, onChange, required, error, icon: Icon, className = '', disabled = false, min
}) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
      <input
        type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}
        disabled={disabled} min={min}
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
            PDF, JPG, PNG up to 5MB each. Max {maxFiles} files.
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

// 6. Status Display Component
type DateStatusDisplayProps = {
  issueDate: string;
  status: string;
};
const DateStatusDisplay: React.FC<DateStatusDisplayProps> = ({ issueDate, status }) => {
  const daysAgo = getDaysSinceIssued(issueDate);
  
  let statusConfig = {
    bg: 'bg-yellow-100', text: 'text-yellow-700', icon: BadgeHelp, label: 'Pending'
  };
  if (status === 'Complied') {
    statusConfig = { bg: 'bg-green-100', text: 'text-green-700', icon: BadgeCheck, label: 'Complied' };
  } else if (status === 'Rejected') {
    statusConfig = { bg: 'bg-red-100', text: 'text-red-700', icon: BadgeX, label: 'Rejected' };
  }

  return (
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center space-x-3">
        <span className="p-3 bg-white rounded-full text-blue-500 shadow-sm">
          <History className="w-6 h-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-600">Days Since Issued</p>
          <p className="text-lg font-bold text-slate-800">{daysAgo.text}</p>
        </div>
      </div>
      <div className={`border rounded-lg p-4 flex items-center space-x-3 ${statusConfig.bg} ${statusConfig.text.replace('text-', 'border-')}`}>
        <span className="p-3 bg-white rounded-full shadow-sm">
          <statusConfig.icon className={`w-6 h-6 ${statusConfig.text}`} />
        </span>
        <div>
          <p className="text-sm font-semibold">Current Status</p>
          <p className="text-lg font-bold">{statusConfig.label}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---

type FormState = {
  directionId: string;
  complianceSummary: string;
  dateOfCompliance: string;
  status: string;
  remarks: string;
  reviewedBy: string;
  dateOfReview: string;
};
type Errors = { [K in keyof FormState]?: string | null; } & {
  filesCompliance?: string | null;
};
type SelectedDirection = {
  id: string;
  authority: string;
  dateOfIssue: string;
  subject: string;
  fileUrl: string;
} | null;

const DirectionCompliancePage = () => {
  const today = getTodayDate();
  const [formData, setFormData] = useState<FormState>({
    directionId: '',
    complianceSummary: '',
    dateOfCompliance: '',
    status: 'Pending',
    remarks: '',
    reviewedBy: '',
    dateOfReview: '',
  });
  const [selectedDirection, setSelectedDirection] = useState<SelectedDirection>(null);
  const [complianceFiles, setComplianceFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // --- Handlers ---
  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const directionData = mockDirectionsData[id] || null;
    setSelectedDirection(directionData);
    setFormData(prev => ({
      ...prev,
      directionId: id,
      // Reset compliance date if issue date changes
      dateOfCompliance: '', 
    }));
    if (errors.directionId) setErrors(prev => ({ ...prev, directionId: null }));
    if (errors.dateOfCompliance) setErrors(prev => ({ ...prev, dateOfCompliance: null }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setComplianceFiles(newFiles);
    if (errors.filesCompliance) setErrors((prev) => ({ ...prev, filesCompliance: null }));
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.directionId) newErrors.directionId = 'You must select a Direction ID.';
    if (!formData.complianceSummary) newErrors.complianceSummary = 'Compliance Summary is required.';
    if (!formData.dateOfCompliance) newErrors.dateOfCompliance = 'Date of Compliance is required.';
    if (selectedDirection && formData.dateOfCompliance < selectedDirection.dateOfIssue) {
      newErrors.dateOfCompliance = 'Compliance Date cannot be before the Direction Issue Date.';
    }
    if (!formData.status) newErrors.status = 'Status is required.';
    if (formData.status === 'Complied' && complianceFiles.length === 0) {
      newErrors.filesCompliance = 'Compliance Proof is required to mark as "Complied".';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Form Submitted:', formData, { complianceFiles });
      setTimeout(() => {
        alert('Compliance Submitted Successfully!');
        // Reset form
        setFormData({
          directionId: '', complianceSummary: '', dateOfCompliance: '',
          status: 'Pending', remarks: '', reviewedBy: '', dateOfReview: '',
        });
        setSelectedDirection(null);
        setComplianceFiles([]);
        setErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Validation Failed:', errors);
    }
  };

  if (loading) return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx global>{`
      .loader {
        width: 65px;
        height: 65px;
        display: block;
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
        {/* Header with gradient card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-1">Direction Compliance</h1>
          <p className="text-white/90 text-base">
            Enter compliance details for directions from NSKC or the Ministry.
          </p>
        </div>

        {/* --- 2. Form --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Card 1: Linked Direction Details */}
          <FormCard title="Linked Direction Details" icon={Link}>
            <FormSelect
              label="Direction ID" name="directionId"
              value={formData.directionId} onChange={handleDirectionChange}
              options={mockDirectionIDs} required error={errors.directionId}
              icon={FileText}
            />
            <FormInput
              label="Issuing Authority" name="issuingAuthority" type="text"
              value={selectedDirection?.authority || 'Select a Direction ID'}
              onChange={() => {}} disabled icon={Building2}
              placeholder="Enter value here"
            />
            <FormInput
              label="Date of Issue" name="dateOfIssue" type="text"
              value={selectedDirection?.dateOfIssue || 'Select a Direction ID'}
              onChange={() => {}} disabled icon={Calendar}
              placeholder="Enter value here"
            />
            <FormInput
              label="Subject" name="subject" type="text"
              value={selectedDirection?.subject || 'Select a Direction ID'}
              onChange={() => {}} disabled icon={MessageSquare}
              placeholder="Enter value here"
            />

            {/* Auto-Calcs */}
            <DateStatusDisplay 
              issueDate={selectedDirection?.dateOfIssue || ''}
              status={formData.status}
            />
            
            {/* View Original Document */}
            {selectedDirection && (
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Original Direction Copy</label>
                <div className="mt-2 flex items-center justify-between p-3 bg-slate-100 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-2 truncate">
                    <FileIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700 truncate">{selectedDirection.fileUrl.split('/').pop()}</span>
                  </div>
                  <a 
                    href={selectedDirection.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center px-3 py-1.5 rounded-md text-xs font-semibold text-indigo-600 bg-white border border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    View
                  </a>
                </div>
              </div>
            )}
          </FormCard>

          {/* Card 2: Compliance Information */}
          <FormCard title="Compliance Information" icon={ListChecks}>
            <FormTextarea
              label="Compliance Summary / Action Taken Details"
              name="complianceSummary"
              placeholder="Describe the action taken to comply with the direction..."
              value={formData.complianceSummary} onChange={handleChange}
              required error={errors.complianceSummary} rows={5}
              className="md:col-span-2"
            />
            <FormInput
              label="Date of Compliance" name="dateOfCompliance" type="date"
              value={formData.dateOfCompliance} onChange={handleChange}
              required error={errors.dateOfCompliance}
              min={selectedDirection?.dateOfIssue || ''}
              icon={Calendar}
              placeholder="Enter value here"
            />
            <FormSelect
              label="Status" name="status"
              value={formData.status} onChange={handleChange}
              options={mockComplianceStatus} required error={errors.status}
              icon={BadgeCheck}
            />
            <FormTextarea
              label="Remarks / Additional Notes (Optional)" name="remarks"
              placeholder="Optional internal notes..."
              value={formData.remarks} onChange={handleChange}
              rows={3} className="md:col-span-2"
            />
            <FormSelect
              label="Reviewed By (Optional)" name="reviewedBy"
              value={formData.reviewedBy} onChange={handleChange}
              options={mockReviewers} icon={UserCheck}
            />
            <FormInput
              label="Date of Review (Optional)" name="dateOfReview" type="date"
              value={formData.dateOfReview} onChange={handleChange}
              min={formData.dateOfCompliance}
              icon={Calendar}
              placeholder="Enter value here"
            />
          </FormCard>
          
          {/* Card 3: Supporting Documents */}
          <FormCard title="Supporting Documents" icon={FileCheck}>
            <FileUpload
              title="Proof of Compliance"
              tooltip="Attach scanned report or compliance letter (PDF/JPG/PNG)."
              files={complianceFiles}
              onFilesChange={handleFileChange}
              maxFiles={3}
              error={errors.filesCompliance}
              className="md:col-span-2"
              required={formData.status === 'Complied'}
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
                {isSubmitting ? 'Submitting...' : 'Submit Compliance'}
              </button>
            </div>
          </div>
        </form>

        {/* --- 4. Footer --- */}
        <footer className="text-center mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Created By: <strong>Nodal Officer</strong> • Created On: <strong>26 Oct 2025</strong>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated By: <strong>Admin</strong> • Updated On: <strong>26 Oct 2025</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DirectionCompliancePage;