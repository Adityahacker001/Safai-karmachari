// This is your page.tsx file
// Ensure you have React, TailwindCSS, and lucide-react installed:
// npm install lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, ChevronRight, Briefcase, PlusCircle, CheckCircle, Clock, XCircle, FileClock,
  DollarSign, BarChart3, ListFilter, Search, X, Eye, Edit, Trash2, FileText,
  Users, Calendar, TrendingUp, Download, ArrowRight, Activity, Zap, FileUp, Filter, FolderKanban, ActivitySquare,
  BadgePercent, ListChecks, UploadCloud, Send, Loader2, Award, ClipboardList, Info, Sparkles, Receipt, Paperclip,
  ChevronLeft, ChevronDown, ChevronUp
} from 'lucide-react';

// --- Mock Data ---

const MOCK_SCHEMES = [
  { id: 1, name: 'Self Employment Scheme (SES)', category: 'Loan', maxAmount: '₹5,00,000', rate: '4% p.a.', eligibility: 'Registered SKs/Dependents, SHGs', docs: 'Aadhaar, Bank Details, Project Report', deadline: '2025-12-31', brochureUrl: '/docs/ses.pdf' },
  { id: 2, name: 'Skill Development Grant', category: 'Grant', maxAmount: 'Up to ₹25,000/trainee', rate: 'N/A', eligibility: 'SKs/Dependents for approved courses', docs: 'Aadhaar, Course Admission Proof', deadline: null, brochureUrl: '/docs/sdg.pdf' },
  { id: 3, name: 'Sanitary Mart Loan', category: 'Livelihood', maxAmount: '₹15,00,000', rate: '5% p.a.', eligibility: 'Registered SHGs (min. 1 year)', docs: 'SHG Reg., Project Report, Quotations', deadline: '2026-03-31', brochureUrl: '/docs/sml.pdf' },
  { id: 4, name: 'Mechanized Cleaning Grant', category: 'Subsidy', maxAmount: 'Up to 75% Project Cost', rate: 'N/A', eligibility: 'SHGs, ULBs for equipment purchase', docs: 'Project Proposal, Quotations, SHG/ULB Docs', deadline: null, brochureUrl: '/docs/mcg.pdf' },
  { id: 5, name: 'Education Loan for Dependents', category: 'Loan', maxAmount: '₹10,00,000', rate: '3.5% p.a.', eligibility: 'Children of SKs for higher education', docs: 'Aadhaar, Admission Letter, Fee Structure', deadline: '2025-11-30', brochureUrl: '/docs/edu.pdf' },
];

const MOCK_APPLICATIONS = [
  { id: 'APP001', schemeName: 'Self Employment Scheme', dateApplied: '2025-10-15', loanRequested: '₹1,50,000', status: 'Approved', remarks: 'Funds disbursed on 2025-10-25', ackUrl: '/docs/ack001.pdf' },
  { id: 'APP002', schemeName: 'Sanitary Mart Loan', dateApplied: '2025-09-20', loanRequested: '₹4,80,000', status: 'Pending', remarks: 'Under review by State Nodal Officer', ackUrl: '/docs/ack002.pdf' },
  { id: 'APP003', schemeName: 'Skill Development Grant', dateApplied: '2025-10-01', loanRequested: '₹20,000', status: 'Rejected', remarks: 'Ineligible course selected', ackUrl: '/docs/ack003.pdf' },
  { id: 'APP004', schemeName: 'Self Employment Scheme', dateApplied: '2025-10-22', loanRequested: '₹80,000', status: 'Under Review', remarks: 'Awaiting document verification', ackUrl: '/docs/ack004.pdf' },
  { id: 'APP005', schemeName: 'Education Loan', dateApplied: '2025-08-10', loanRequested: '₹3,00,000', status: 'Approved', remarks: 'First installment released', ackUrl: '/docs/ack005.pdf' },
];

// --- Reusable Components ---

// 1. Gradient Button
type GradientButtonProps = {
  text: string;
  icon?: React.ElementType;
  onClick?: (e: React.FormEvent) => void; // Updated to accept event argument
  className?: string;
  gradient?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const GradientButton: React.FC<GradientButtonProps> = ({ text, icon: Icon, onClick, className = '', gradient = 'from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600', type = 'button', disabled = false }) => (
  <button type={type} onClick={onClick} disabled={disabled}
    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm
               bg-gradient-to-r ${gradient} shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed
               transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
               focus:ring-4 focus:ring-blue-300 ${className}`}>
    {Icon && !disabled && <Icon className="w-5 h-5" />}
    {disabled && <Loader2 className="w-5 h-5 animate-spin" />}
    <span>{text}</span>
  </button>
);

// 2. Scheme Card
const SchemeCard: React.FC<{ scheme: any; onApply: (scheme: any) => void; onViewDetails: (scheme: any) => void; }> = ({ scheme, onApply, onViewDetails }) => (
  <div className="bg-gradient-to-br from-white/70 to-sky-50/50 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 
                 p-6 space-y-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] transform-gpu flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">{scheme.category}</span>
        {scheme.deadline && <span className="text-xs text-red-600 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Deadline: {scheme.deadline}</span>}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-1">{scheme.name}</h3>
      <p className="text-sm text-slate-600 mb-4">Empower your SHG with financial support.</p>
      
      <div className="space-y-2 text-sm text-slate-700 mb-5">
         <p><strong className="text-green-600">Max Amount:</strong> {scheme.maxAmount}</p>
         <p><strong className="text-purple-600">Eligibility:</strong> <span className="text-slate-600 text-xs">{scheme.eligibility}</span></p>
         <p><strong className="text-amber-600">Docs:</strong> <span className="text-slate-600 text-xs">{scheme.docs}</span></p>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200/80">
      <GradientButton text="Apply Now" icon={Send} onClick={() => onApply(scheme)} className="w-full sm:w-auto" />
      <div className="flex gap-2">
         <button onClick={() => onViewDetails(scheme)} className="text-xs font-medium text-slate-600 hover:text-indigo-700 flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 transition-colors"> <Info className="w-3.5 h-3.5"/> Details </button>
         <a href={scheme.brochureUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-600 hover:text-indigo-700 flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 transition-colors"> <Download className="w-3.5 h-3.5"/> Brochure </a>
      </div>
    </div>
  </div>
);

// 3. Application Status Badge
type AppStatus = 'Approved' | 'Pending' | 'Rejected' | 'Under Review';
const ApplicationStatusBadge: React.FC<{ status: AppStatus }> = ({ status }) => {
  const config = {
    Approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    Rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    'Under Review': { bg: 'bg-blue-100', text: 'text-blue-700', icon: FileClock },
  }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {status} </span> );
};

// 4. Form Input/Select/Textarea/FileUpload (Simplified versions)
const FormInput: React.FC<{ label: string, name: string, type: string, value: string, onChange: any, required?: boolean, error?: string | null, placeholder?: string }> = 
 ({ label, name, type, value, onChange, required, error, placeholder }) => (
 <div className="flex flex-col space-y-1"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`block w-full p-2 text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`} /> {error && <p className="text-xs text-red-500">{error}</p>} </div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: any, required?: boolean, error?: string | null, children: React.ReactNode }> = 
 ({ label, name, value, onChange, required, error, children }) => (
 <div className="flex flex-col space-y-1"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <select id={name} name={name} value={value} onChange={onChange} className={`block w-full p-2 text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white`}> {children} </select> {error && <p className="text-xs text-red-500">{error}</p>} </div> );
const FormTextarea: React.FC<{ label: string, name: string, value: string, onChange: any, required?: boolean, error?: string | null, placeholder?: string, rows?: number }> = 
 ({ label, name, value, onChange, required, error, placeholder, rows = 3 }) => (
 <div className="flex flex-col space-y-1"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className={`block w-full p-2 text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none`} /> {error && <p className="text-xs text-red-500">{error}</p>} </div> );
const FileUpload: React.FC<{ label: string, name: string, onChange: any, required?: boolean, error?: string | null, files: File[] }> =
 ({ label, name, onChange, required, error, files }) => (
 <div className="flex flex-col space-y-1"> <label className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <div className={`mt-1 flex justify-center rounded-lg border border-dashed ${error ? 'border-red-400' : 'border-slate-300'} px-6 py-6 bg-slate-50/50 hover:border-indigo-400 transition-colors`}> <div className="text-center"> <UploadCloud className="mx-auto h-8 w-8 text-slate-400" /> <div className="mt-2 flex text-xs leading-5 text-slate-600"> <label htmlFor={name} className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"> <span>Upload files</span> <input id={name} name={name} type="file" className="sr-only" multiple onChange={onChange} /> </label> <p className="pl-1">or drag and drop</p> </div> <p className="text-[10px] leading-4 text-slate-500">PDF, JPG, PNG up to 5MB each</p> </div> </div> {/* File List */} {files.length > 0 && <div className="mt-2 space-y-1">{files.map((file, idx) => <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-slate-100 rounded"><span className="truncate">{file.name}</span> {/* Add remove button if needed */} </div>)}</div>} {error && <p className="text-xs text-red-500">{error}</p>} </div> );

// 5. Apply Modal Component
const ApplyModal: React.FC<{ isOpen: boolean; onClose: () => void; scheme: any | null }> = ({ isOpen, onClose, scheme }) => {
  const [formData, setFormData] = useState({ projectTitle: '', category: '', amount: '', cost: '', contribution: '', description: '', assets: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
      if(errors[e.target.name]) setErrors((prev: any) => ({...prev, [e.target.name]: null}));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if(e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5)); }; // Limit 5 files

  const validate = () => {
    let tempErrors: any = {};
    if (!formData.projectTitle) tempErrors.projectTitle = "Project Title is required.";
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) tempErrors.amount = "Valid Loan Amount is required.";
    if (!formData.description) tempErrors.description = "Description is required.";
    if (files.length === 0) tempErrors.files = "At least one document is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      console.log("Submitting:", { ...formData, scheme: scheme?.name, files });
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true); // Show success toast
        setTimeout(() => { setShowToast(false); onClose(); }, 2000); // Close toast & modal after 2s
        // Reset form? You might want to clear formData and files here
      }, 1500);
    }
  };

  if (!isOpen || !scheme) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-modal-enter">
      <div className="bg-gradient-to-br from-white via-sky-50 to-blue-50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Send className="w-6 h-6 text-indigo-600" /> Apply for Scheme</h2>
            <p className="text-sm text-slate-500">Submit your project proposal for: <span className="font-semibold text-indigo-700">{scheme.name}</span></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <p className="text-sm p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg"><span className="font-semibold">SHG Name:</span> Your SHG Name Here (Auto-filled)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Project Title" name="projectTitle" type="text" value={formData.projectTitle} onChange={handleChange} required error={errors.projectTitle} placeholder="e.g., Organic Soap Making Unit" />
            <FormSelect label="Project Category" name="category" value={formData.category} onChange={handleChange}><option value="">Select Category</option><option value="Handicrafts">Handicrafts</option><option value="Food Processing">Food Processing</option><option value="Services">Services</option><option value="Other">Other</option></FormSelect>
            <FormInput label="Loan Amount Requested (₹)" name="amount" type="number" value={formData.amount} onChange={handleChange} required error={errors.amount} placeholder="e.g., 250000" />
            <FormInput label="Estimated Project Cost (₹)" name="cost" type="number" value={formData.cost} onChange={handleChange} placeholder="e.g., 300000" />
            <FormInput label="SHG Contribution (%)" name="contribution" type="number" value={formData.contribution} onChange={handleChange} placeholder="e.g., 10" />
          </div>
          <FormTextarea label="Project Description" name="description" value={formData.description} onChange={handleChange} required error={errors.description} placeholder="Describe your project plan, objectives, and market..." rows={4} />
          <FormTextarea label="Assets Required" name="assets" value={formData.assets} onChange={handleChange} placeholder="List main equipment or assets needed..." rows={2} />
          <FileUpload label="Upload Supporting Documents" name="files" onChange={handleFileChange} required error={errors.files} files={files} />
        </form>
        {/* Footer Actions */}
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3 mt-auto">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-5 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]">Cancel</button>
          {/* Submit button needs to be linked to the form */}
          <GradientButton text={isSubmitting ? "Submitting..." : "Submit Application"} icon={Send} type="submit" onClick={handleSubmit} disabled={isSubmitting} />
        </div>
        {/* Toast Notification - Rendered conditionally within the modal */}
        {showToast && <ToastNotification message="Application Submitted Successfully!" type="success" onClose={() => setShowToast(false)} />}
      </div>
    </div>
  );
};

// 6. Toast Notification
type ToastProps = { message: string; type: 'success' | 'error'; onClose: () => void; };
const ToastNotification: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  return (
    <div className={`absolute bottom-5 right-5 z-[100] p-4 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium animate-toast-enter-exit
                   ${isSuccess ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
       {isSuccess ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
       <span>{message}</span>
       <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-black/10"><X className="w-4 h-4" /></button>
    </div>
  );
};

// 7. Sortable Table Header (for status table)
type AppSortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const AppSortableHeader: React.FC<AppSortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => {
    if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Main Page Component ---
const SchemesApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);
  const [appSearchTerm, setAppSearchTerm] = useState('');
  const [appCurrentPage, setAppCurrentPage] = useState(1);
  const [appRowsPerPage, setAppRowsPerPage] = useState(5); // Fewer rows for this section
  const [appSortConfig, setAppSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Modal Handlers
  const openApplyModal = (scheme: any) => { setSelectedScheme(scheme); setIsModalOpen(true); };
  const closeApplyModal = () => { setSelectedScheme(null); setIsModalOpen(false); };
  const openViewDetailsModal = (scheme: any) => { alert(`Viewing details for: ${scheme.name}`); /* Implement details modal later */ };

  // --- Application Table Logic ---
  const filteredApplications = useMemo(() => {
    let apps = [...MOCK_APPLICATIONS];
    if (appSearchTerm) { apps = apps.filter(app => app.schemeName.toLowerCase().includes(appSearchTerm.toLowerCase()) || app.id.toLowerCase().includes(appSearchTerm.toLowerCase())); }
    if (appSortConfig !== null) { apps.sort((a, b) => { // @ts-ignore
        if (a[appSortConfig.key] < b[appSortConfig.key]) return appSortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[appSortConfig.key] > b[appSortConfig.key]) return appSortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return apps;
  }, [appSearchTerm, appSortConfig]);

  const appTotalPages = Math.ceil(filteredApplications.length / appRowsPerPage);
  const paginatedApplications = useMemo(() => filteredApplications.slice((appCurrentPage - 1) * appRowsPerPage, appCurrentPage * appRowsPerPage), [filteredApplications, appCurrentPage, appRowsPerPage]);
  const requestAppSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (appSortConfig && appSortConfig.key === key && appSortConfig.direction === 'asc') { direction = 'desc'; } setAppSortConfig({ key, direction }); };
  const viewApplication = (appId: string) => alert(`Viewing Application: ${appId}`);
  const downloadAck = (url: string) => window.open(url, '_blank');


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50 p-4 md:p-8 font-sans animate-fade-in">
        {/* Inline Styles for Animations */}
        <style jsx global>{`
          @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(10px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
          .animate-fade-in { 
            animation: fadeIn 0.5s ease-out forwards; 
          }

          @keyframes modalEnter { 
            from { opacity: 0; transform: scale(0.95); } 
            to { opacity: 1; transform: scale(1); } 
          }
          .animate-modal-enter { 
            animation: modalEnter 0.2s ease-out forwards; 
          }

          @keyframes toastEnterExit { 
            0% { opacity: 0; transform: translateY(20px) scale(0.95); } 
            10% { opacity: 1; transform: translateY(0) scale(1); } 
            90% { opacity: 1; transform: translateY(0) scale(1); } 
            100% { opacity: 0; transform: translateY(20px) scale(0.95); } 
          }
          .animate-toast-enter-exit { 
            animation: toastEnterExit 2.5s ease-in-out forwards; 
          }
        `}</style>
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- 1. Header Section --- */}
        <header>
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRight className="w-4 h-4 mx-1" />
            Manage & Apply <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">Schemes & Application</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl text-white shadow-lg"><Award className="w-8 h-8" /></span>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Schemes & Application</h1>
                <p className="text-slate-500 mt-1">Explore available schemes & apply for funding.</p>
              </div>
            </div>
            {/* Add Header buttons like Search, Filter if needed for schemes */}
          </div>
        </header>

        {/* --- 2. Schemes List Section --- */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-5 flex items-center gap-2"><Sparkles className="w-6 h-6 text-amber-500"/> Available Schemes for Your SHG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SCHEMES.map(scheme => (
              <SchemeCard 
                key={scheme.id} 
                scheme={scheme} 
                onApply={openApplyModal} 
                onViewDetails={openViewDetailsModal} 
              />
            ))}
          </div>
        </section>

        {/* --- 3. Application Status Table Section --- */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
            <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2"><ClipboardList className="w-6 h-6 text-blue-500"/> My Application Status</h2>
             <div className="relative w-full sm:w-64">
                <input type="text" placeholder="Search Applications..." value={appSearchTerm} onChange={(e) => setAppSearchTerm(e.target.value)}
                       className="w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead className="bg-indigo-100/70 text-indigo-800 font-semibold">
                        <tr>
                            <AppSortableHeader colKey="id" title="Application ID" sortConfig={appSortConfig} requestSort={requestAppSort} className="min-w-[120px]" />
                            <AppSortableHeader colKey="schemeName" title="Scheme Name" sortConfig={appSortConfig} requestSort={requestAppSort} className="min-w-[200px]" />
                            <AppSortableHeader colKey="dateApplied" title="Date Applied" sortConfig={appSortConfig} requestSort={requestAppSort} className="min-w-[120px]" />
                            <AppSortableHeader colKey="loanRequested" title="Amount Requested" sortConfig={appSortConfig} requestSort={requestAppSort} className="min-w-[150px] text-right" />
                            <AppSortableHeader colKey="status" title="Status" sortConfig={appSortConfig} requestSort={requestAppSort} className="min-w-[140px]" />
                            <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200/80">
                        {paginatedApplications.map(app => (
                            <tr key={app.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{app.id}</td>
                                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{app.schemeName}</td>
                                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{new Date(app.dateApplied).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-3 text-slate-700 font-medium text-right whitespace-nowrap">{app.loanRequested}</td>
                                <td className="px-4 py-3 whitespace-nowrap"><ApplicationStatusBadge status={app.status as AppStatus} /></td>
                                <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{app.remarks}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                    <button onClick={() => viewApplication(app.id)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100 mx-1" title="View Application"><Eye className="w-4 h-4" /></button>
                                    <button onClick={() => downloadAck(app.ackUrl)} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 mx-1" title="Download Ack"><Receipt className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                        {paginatedApplications.length === 0 && (<tr><td colSpan={7} className="text-center py-8 text-slate-500">No applications found.</td></tr>)}
                   </tbody>
                </table>
             </div>
             {/* Pagination */}
             {appTotalPages > 1 && (
                 <div className="flex justify-between items-center p-3 border-t border-slate-200/80 bg-slate-50/70">
                   <span className="text-xs text-slate-600">Total Applications: {filteredApplications.length}</span>
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-slate-600">Page {appCurrentPage} of {appTotalPages}</span>
                     <button onClick={() => setAppCurrentPage(p=>Math.max(p-1,1))} disabled={appCurrentPage === 1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button>
                     <button onClick={() => setAppCurrentPage(p=>Math.min(p+1,appTotalPages))} disabled={appCurrentPage === appTotalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRight className="w-4 h-4"/></button>
                   </div>
                 </div>
             )}
          </div>
        </section>

        {/* --- Modals --- */}
        <ApplyModal isOpen={isModalOpen} onClose={closeApplyModal} scheme={selectedScheme} />
        
        {/* Simple Footer */}
        <footer className="text-center mt-12 text-xs text-slate-500">
           NSKFDC SHG Dashboard &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default SchemesApplicationPage;