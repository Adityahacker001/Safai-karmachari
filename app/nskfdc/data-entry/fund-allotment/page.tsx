// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ChevronRight,
  ClipboardList,
  Banknote,
  FileText,
  Calendar,
  DollarSign,
  UploadCloud,
  Paperclip,
  Trash2,
  AlertCircle,
  Save,
  CheckCircle,
  X,
  Loader2,
  File as FileIcon,
  FileImage,
  MapPin,
  Building,
  Users,
  List,
  TrendingUp,
  Calculator,
  ShieldCheck,
  Package,
  History,
  Info,
} from 'lucide-react';

// --- Mock Data ---
const mockSchemes = ['Safai Mitra Skill Loan Yojana', 'Rehabilitation Scheme', 'NSKFDC Grant Program'];
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockFundingCategories = ['Central Share', 'State Share', 'Revolving Fund', 'Skill Development', 'Grant'];
const mockStates = ['Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Tamil Nadu', 'Rajasthan'];
const mockDistricts = ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Mumbai', 'Pune']; // Simplified
const mockTransferModes = ['NEFT', 'RTGS', 'Bank Transfer', 'Cheque'];
const mockBeneficiaryTypes = ['Individual SK', 'SHG (Self Help Group)', 'Municipal Body', 'Institution'];
const mockStatusOptions = ['Approved', 'Pending Verification', 'Released', 'Rejected'];

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
  label, name, type, placeholder, value, onChange, required, error, icon: Icon, className = '', disabled = false,
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
        className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 ring-red-500/50' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : 'bg-white'}`}
      />
    </div>
    {error && (
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 3. Form Select Component
type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  error?: string | null;
  icon?: React.ElementType;
  className?: string;
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
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 4. Form Textarea Component
type FormTextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string | null;
  rows?: number;
  className?: string;
};
const FormTextarea: React.FC<FormTextareaProps> = ({
  label, name, placeholder, value, onChange, required, error, rows = 3, className = '',
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
      <p className="text-xs text-red-600 flex items-center mt-1">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// 5. File Upload Component
type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: string | null;
  className?: string;
};
const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange, error, className = '' }) => {
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
      <div className={`mt-2 flex justify-center rounded-lg border border-dashed ${error ? 'border-red-500' : 'border-slate-900/25'} bg-sky-50/50 px-6 py-10 transition-colors duration-200 hover:border-indigo-400`}
        title="Attach scanned copies of sanction order and release proof."
      >
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
          <div className="mt-4 flex text-sm leading-6 text-slate-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input 
                id="file-upload" name="file-upload" type="file" className="sr-only" 
                multiple accept=".pdf,.jpg,.jpeg,.png"
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
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

// 6. Dynamic Calculation Display
type DynamicDisplayProps = {
  sanctioned: string;
  released: string;
};
const DynamicDisplay: React.FC<DynamicDisplayProps> = ({ sanctioned, released }) => {
  const { pendingAmount } = useMemo(() => {
    const san = parseFloat(sanctioned) || 0;
    const rel = parseFloat(released) || 0;
    const pending = san - rel;
    return {
      pendingAmount: pending.toLocaleString('en-IN'),
    };
  }, [sanctioned, released]);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200 rounded-lg p-6 my-6">
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <span className="p-3 bg-white rounded-full text-orange-500 shadow-sm">
          <Calculator className="w-6 h-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-600">Pending Amount</p>
          <p className="text-2xl font-bold text-slate-800">₹{pendingAmount}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

type FormState = {
  allotmentId: string;
  schemeName: string;
  financialYear: string;
  sanctionOrderNo: string;
  sanctionDate: string;
  fundingCategory: string;
  implementingState: string;
  district: string;
  totalSanctioned: string;
  releasedAmount: string;
  releaseDate: string;
  modeOfTransfer: string;
  bankRefNo: string;
  beneficiaryType: string;
  beneficiaryCount: string;
  remarks: string;
  status: string;
};
type Errors = { [K in keyof FormState]?: string | null; } & { files?: string | null };

const FundAllotmentPage = () => {
  const [formData, setFormData] = useState<FormState>({
    allotmentId: 'FA-2025-UP-0345', // Auto-generated
    schemeName: '',
    financialYear: '2025-2026',
    sanctionOrderNo: '',
    sanctionDate: '',
    fundingCategory: '',
    implementingState: '',
    district: '',
    totalSanctioned: '',
    releasedAmount: '',
    releaseDate: '',
    modeOfTransfer: '',
    bankRefNo: '',
    beneficiaryType: '',
    beneficiaryCount: '',
    remarks: '',
    status: 'Pending Verification',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFiles(newFiles);
    if (errors.files) setErrors((prev) => ({ ...prev, files: null }));
  };

  // --- Validation Logic ---
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const san = parseFloat(formData.totalSanctioned) || 0;
    const rel = parseFloat(formData.releasedAmount) || 0;

    if (!formData.schemeName) newErrors.schemeName = 'Scheme Name is required.';
    if (!formData.financialYear) newErrors.financialYear = 'Financial Year is required.';
    if (!formData.sanctionOrderNo) newErrors.sanctionOrderNo = 'Sanction Order No. is required.';
    if (!formData.sanctionDate) newErrors.sanctionDate = 'Sanction Date is required.';
    if (!formData.fundingCategory) newErrors.fundingCategory = 'Funding Category is required.';
    if (!formData.implementingState) newErrors.implementingState = 'State is required.';
    if (!formData.district) newErrors.district = 'District is required.';
    if (!formData.totalSanctioned) newErrors.totalSanctioned = 'Sanctioned Amount is required.';
    if (!formData.releasedAmount) newErrors.releasedAmount = 'Released Amount is required.';
    if (rel > san) newErrors.releasedAmount = 'Released Amount cannot be greater than Sanctioned Amount.';
    if (!formData.releaseDate) newErrors.releaseDate = 'Release Date is required.';
    if (formData.sanctionDate && formData.releaseDate && formData.releaseDate < formData.sanctionDate) {
      newErrors.releaseDate = 'Release Date must be on or after Sanction Date.';
    }
    if (!formData.modeOfTransfer) newErrors.modeOfTransfer = 'Mode of Transfer is required.';
    if (!formData.bankRefNo) newErrors.bankRefNo = 'Bank Reference No. is required.';
    if (!formData.beneficiaryType) newErrors.beneficiaryType = 'Beneficiary Type is required.';
    if (formData.beneficiaryType !== 'Institution' && !formData.beneficiaryCount) {
      newErrors.beneficiaryCount = 'Number of Beneficiaries is required for this type.';
    }
    if (!formData.status) newErrors.status = 'Status is required.';
    if (files.length === 0) newErrors.files = 'At least one supporting document is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Form Submitted:', formData, files);
      setTimeout(() => {
        alert('Fund Allotment Submitted Successfully!');
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
          <nav className="flex items-center text-sm font-medium text-slate-500" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" />
            Dashboard
            <ChevronRight className="w-4 h-4 mx-1" />
            <ClipboardList className="w-4 h-4 mr-1.5" />
            Data Entry
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">Fund Allotment Entry</span>
          </nav>
          <div className="mt-4 flex items-center space-x-3">
             <span className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full text-white shadow-lg">
               <Banknote className="w-8 h-8" />
             </span>
             <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Fund Allotment Entry
                </h1>
                <p className="text-slate-500 mt-1">
                  Enter sanctioned and released fund details for the selected scheme.
                </p>
             </div>
          </div>
        </header>

        {/* --- 2. Form --- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Card 1: Allotment Metadata */}
          <FormCard title="Allotment Metadata" icon={Info}>
            <FormInput
              label="Allotment Reference ID" name="allotmentId" type="text"
              value={formData.allotmentId} onChange={() => {}} // Read-only
              disabled
              icon={FileText}
              placeholder="Auto-generated"
            />
            <FormSelect
              label="Scheme Name" name="schemeName"
              value={formData.schemeName} onChange={handleChange}
              options={mockSchemes} required error={errors.schemeName}
              icon={Package}
            />
            <FormSelect
              label="Financial Year" name="financialYear"
              value={formData.financialYear} onChange={handleChange}
              options={mockFinancialYears} required error={errors.financialYear}
              icon={Calendar}
            />
          </FormCard>
          {/* Card 2: Sanction & Fund Details */}
          <FormCard title="Sanction & Fund Details" icon={DollarSign}>
            <FormInput
              label="Sanction Order No." name="sanctionOrderNo" type="text"
              placeholder="e.g., NSK-ORD-0567"
              value={formData.sanctionOrderNo} onChange={handleChange}
              required error={errors.sanctionOrderNo}
              icon={FileText}
            />
            <FormInput
              label="Sanction Date" name="sanctionDate" type="date"
              placeholder=""
              value={formData.sanctionDate} onChange={handleChange}
              required error={errors.sanctionDate}
              icon={Calendar}
            />
            <FormSelect
              label="Funding Category" name="fundingCategory"
              value={formData.fundingCategory} onChange={handleChange}
              options={mockFundingCategories} required error={errors.fundingCategory}
              icon={List}
            />
            <FormInput
              label="Total Sanctioned Amount (₹)" name="totalSanctioned" type="number"
              placeholder="e.g., 500000"
              value={formData.totalSanctioned} onChange={handleChange}
              required error={errors.totalSanctioned}
              icon={DollarSign}
            />
            <FormInput
              label="Released Amount (₹)" name="releasedAmount" type="number"
              placeholder="e.g., 410000"
              value={formData.releasedAmount} onChange={handleChange}
              required error={errors.releasedAmount}
              icon={DollarSign}
            />
            <FormInput
              label="Release Date" name="releaseDate" type="date"
              placeholder=""
              value={formData.releaseDate} onChange={handleChange}
              required error={errors.releaseDate}
              icon={Calendar}
            />
            <FormSelect
              label="Mode of Transfer" name="modeOfTransfer"
              value={formData.modeOfTransfer} onChange={handleChange}
              options={mockTransferModes} required error={errors.modeOfTransfer}
              icon={Banknote}
            />
            <FormInput
              label="Bank / Treasury Ref No." name="bankRefNo" type="text"
              placeholder="e.g., UTR-NSKFDC-56298"
              value={formData.bankRefNo} onChange={handleChange}
              required error={errors.bankRefNo}
              icon={FileText}
            />
          </FormCard>

          {/* Dynamic Calculation Display */}
          <DynamicDisplay 
            sanctioned={formData.totalSanctioned}
            released={formData.releasedAmount}
          />

          {/* Card 3: Beneficiary & Location Details */}
          <FormCard title="Beneficiary & Location" icon={MapPin}>
            <FormSelect
              label="Implementing State" name="implementingState"
              value={formData.implementingState} onChange={handleChange}
              options={mockStates} required error={errors.implementingState}
              icon={MapPin}
            />
            <FormSelect
              label="District" name="district"
              value={formData.district} onChange={handleChange}
              options={mockDistricts} required error={errors.district}
              icon={MapPin}
            />
            <FormSelect
              label="Beneficiary Type" name="beneficiaryType"
              value={formData.beneficiaryType} onChange={handleChange}
              options={mockBeneficiaryTypes} required error={errors.beneficiaryType}
              icon={Building}
            />
            <FormInput
              label="No. of Beneficiaries Covered" name="beneficiaryCount" type="number"
              placeholder="e.g., 25"
              value={formData.beneficiaryCount} onChange={handleChange}
              required={formData.beneficiaryType !== 'Institution'}
              error={errors.beneficiaryCount}
              icon={Users}
              disabled={formData.beneficiaryType === 'Institution'}
            />
            <FormTextarea
              label="Purpose / Remarks (Optional)" name="remarks"
              placeholder="e.g., Funds released for Q2 training batch disbursement."
              value={formData.remarks} onChange={handleChange}
              rows={4} className="md:col-span-2"
            />
          </FormCard>

          {/* Card 4: Documents & Status */}
          <FormCard title="Documents & Status" icon={ShieldCheck}>
            <FileUpload
              files={files}
              onFilesChange={handleFileChange}
              error={errors.files}
              className="md:col-span-2"
            />
            <FormSelect
              label="Status" name="status"
              value={formData.status} onChange={handleChange}
              options={mockStatusOptions} required error={errors.status}
              className="md:col-span-1"
              icon={ShieldCheck}
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
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
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

export default FundAllotmentPage;