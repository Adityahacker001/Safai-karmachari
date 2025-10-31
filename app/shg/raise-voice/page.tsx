// This is your page.tsx file
// Ensure you have React, TailwindCSS, recharts, and lucide-react installed:
// npm install recharts lucide-react

"use client"; // Add "use client" directive at the top to mark this as a Client Component

'use new'; // For Next.js App Router

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard, ChevronRight, MessageSquare, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertTriangle, ChevronLeft, ChevronRight as ChevronRightIcon,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Printer, Link as LinkIcon, BadgeCheck, BadgeHelp, BadgeAlert, Clock, MapPin, Target, WalletCards, Briefcase, FileClock, AlertOctagon, Timer,
  ClipboardList, Megaphone, ShieldCheck, FileCheck, Upload, FileWarning, AlertCircle as AlertCircleIcon, Send, Loader2, BookOpen, HandHeart, CheckSquare, ListTodo, FileQuestion, HelpCircle, FileDigit, ShieldQuestion, HeartHandshake, Sparkles,
  UploadCloud, PlusCircle, ListChecks, CaseSensitive, Mail, CheckCheck, Clock10
} from 'lucide-react';

// --- Mock Data ---

const MOCK_GRIEVANCES = [
  { id: 1, ticketId: 'GRV-2025-098', category: 'Fund Delay', dateSub: '2025-10-15', status: 'Resolved', lastUpdate: '2025-10-25', remarks: 'Funds released after verification.', type: 'Complaint', description: 'Delay in fund disbursement for scheme X', action: 'View' },
  { id: 4, ticketId: 'GRV-2025-101', category: 'Harassment', dateSub: '2025-09-05', status: 'Escalated', lastUpdate: '2025-10-10', remarks: 'Escalated to NSKC due to severity.', type: 'Complaint', description: 'Harassment by officials.', actionTaken: 'Initial inquiry done. Escalated.', escalatedTo: 'NSKC' },
  { id: 5, ticketId: 'GRV-2025-102', category: 'Fund Delay', dateSub: '2025-10-27', status: 'Pending', lastUpdate: '2025-10-27', remarks: 'New grievance logged.', type: 'Complaint', description: 'Subsidy amount not credited yet.', actionTaken: 'Acknowledged.', escalatedTo: null },
];

const mockCategories = ['Complaint', 'Suggestion', 'Feedback']; // Main Categories
const mockSubCategories = ['Fund Delay', 'Scheme Issue', 'Eligibility Dispute', 'Harassment', 'Safety Concern', 'Portal Issue', 'Process Improvement', 'Appreciation', 'Other'];
const mockStates = ['Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'Bihar', 'Gujarat']; // Example states
const mockDistricts = ['Lucknow', 'Pune', 'Jaipur', 'Patna', 'Ahmedabad']; // Example districts
const mockSchemes = ['Self Employment Scheme', 'Sanitary Mart Loan', 'Education Loan', 'Skill Development Program'];
const mockStatusOptions = ['All', 'Pending', 'Under Review', 'Resolved', 'Escalated'];
const mockResponseMethods = ['Portal Notification', 'SMS', 'Email'];

// --- Reusable Components ---

// 1. Glass Card Wrapper
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-6 ${className}`}>
    {children}
  </div>
);

// 2. Status Badge Component
type Status = 'Pending' | 'Under Review' | 'Resolved' | 'Escalated';
const GrievanceStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    'Under Review': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Search },
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    Escalated: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
  }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {status} </span> );
};

// 3. Reusable Form Input/Select/Textarea/FileUpload (Simplified & Styled)
const FormInput: React.FC<{ label: string, name: string, type: string, value: string, onChange: any, required?: boolean, error?: string | null, placeholder?: string, icon?: React.ElementType }> = 
 ({ label, name, type, value, onChange, required, error, placeholder, icon: Icon }) => (
 <div className="flex flex-col space-y-1 relative"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> {Icon && <Icon className="absolute left-3 top-[34px] w-4 h-4 text-slate-400" />} <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`block w-full p-2.5 ${Icon ? 'pl-9' : ''} text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`} /> {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircleIcon size={14}/>{error}</p>} </div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: any, required?: boolean, error?: string | null, children: React.ReactNode, icon?: React.ElementType }> = 
 ({ label, name, value, onChange, required, error, children, icon: Icon }) => (
 <div className="flex flex-col space-y-1 relative"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> {Icon && <Icon className="absolute left-3 top-[34px] w-4 h-4 text-slate-400 z-10" />} <select id={name} name={name} value={value} onChange={onChange} className={`block appearance-none w-full p-2.5 ${Icon ? 'pl-9' : ''} text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white`}> {children} </select> <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[36px]" /> {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircleIcon size={14}/>{error}</p>} </div> );
const FormTextarea: React.FC<{ label: string, name: string, value: string, onChange: any, required?: boolean, error?: string | null, placeholder?: string, rows?: number, maxLength?: number }> = 
 ({ label, name, value, onChange, required, error, placeholder, rows = 4, maxLength = 1000 }) => (
 <div className="flex flex-col space-y-1"> <label htmlFor={name} className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} maxLength={maxLength} className={`block w-full p-2.5 text-sm rounded-lg border ${error ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'} shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none`} /> <div className="flex justify-between items-center"> {error ? <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircleIcon size={14}/>{error}</p> : <div/>} <p className="text-xs text-slate-400">{value.length}/{maxLength}</p> </div> </div> );
const FileUpload: React.FC<{ label: string, name: string, onChange: any, required?: boolean, error?: string | null, files: File[] }> =
 ({ label, name, onChange, required, error, files }) => ( /* Same as previous example */ <div className="flex flex-col space-y-1"> <label className="text-xs font-medium text-slate-600">{label}{required && <span className="text-red-500">*</span>}</label> <div className={`mt-1 flex justify-center rounded-lg border border-dashed ${error ? 'border-red-400' : 'border-slate-300'} px-6 py-6 bg-slate-50/50 hover:border-indigo-400 transition-colors`}> <div className="text-center"> <UploadCloud className="mx-auto h-8 w-8 text-slate-400" /> <div className="mt-2 flex text-xs leading-5 text-slate-600"> <label htmlFor={name} className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"> <span>Upload files</span> <input id={name} name={name} type="file" className="sr-only" multiple onChange={onChange} /> </label> <p className="pl-1">or drag and drop</p> </div> <p className="text-[10px] leading-4 text-slate-500">PDF, JPG, PNG up to 5MB each</p> </div> </div> {files.length > 0 && <div className="mt-2 space-y-1">{files.map((file, idx) => <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-slate-100 rounded"><span className="truncate">{file.name}</span> {/* Add remove btn */} </div>)}</div>} {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircleIcon size={14}/>{error}</p>} </div> );
const Checkbox: React.FC<{ label: string, name: string, checked: boolean, onChange: any, error?: string | null }> =
 ({ label, name, checked, onChange, error }) => ( <div className="flex items-start"> <div className="flex items-center h-5"> <input id={name} name={name} type="checkbox" checked={checked} onChange={onChange} className={`w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 ${error ? 'border-red-400 ring-red-400' : ''}`} /> </div> <div className="ml-3 text-sm"> <label htmlFor={name} className="font-medium text-slate-700">{label}</label> {error && <p className="text-xs text-red-500 mt-1">{error}</p>} </div> </div> );

// 4. Gradient Button (same as previous)
type GradientButtonProps = { text: string; icon?: React.ElementType; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; className?: string; gradient?: string; type?: 'button' | 'submit'; disabled?: boolean; };
const GradientButton: React.FC<GradientButtonProps> = ({ text, icon: Icon, onClick, className = '', gradient = 'from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600', type = 'button', disabled = false }) => ( <button type={type} onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r ${gradient} shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}> {Icon && !disabled && <Icon className="w-5 h-5" />} {disabled && <Loader2 className="w-5 h-5 animate-spin" />} <span>{text}</span> </button> );

// 5. Success Modal
const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void; ticketId: string }> = ({ isOpen, onClose, ticketId }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Submission Successful!</h2>
                <p className="text-slate-600 mb-4">Your grievance has been logged. Your Ticket ID is:</p>
                <p className="text-lg font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg inline-block border border-indigo-200">{ticketId}</p>
                <p className="text-xs text-slate-500 mt-4">Please keep this ID for future reference. We will update you via your preferred method.</p>
                <GradientButton text="Okay, Got it!" onClick={onClose} className="mt-6 w-full" />
            </div>
        </div>
    );
};

// 6. View Details Modal (similar to previous examples)
type DetailsModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<DetailsModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  // Simple timeline component
  const Timeline = () => (
      <div className="mt-4 space-y-3 pl-5 border-l-2 border-indigo-200">
          <div className="relative"><span className="absolute -left-[26px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white"></span><p className="text-xs font-semibold text-indigo-700">Submitted</p><p className="text-xs text-slate-500">{new Date(item.dateSub).toLocaleString('en-GB')}</p></div>
          {item.status !== 'Pending' && <div className="relative"><span className="absolute -left-[26px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></span><p className="text-xs font-semibold text-blue-700">Under Review / Action Taken</p><p className="text-xs text-slate-500">{new Date(item.lastUpdated).toLocaleString('en-GB')}</p></div>}
          {item.status === 'Resolved' && <div className="relative"><span className="absolute -left-[26px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white"></span><p className="text-xs font-semibold text-green-700">Resolved</p><p className="text-xs text-slate-500">{new Date(item.lastUpdated).toLocaleString('en-GB')}</p></div>}
          {item.status === 'Escalated' && <div className="relative"><span className="absolute -left-[26px] top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-white"></span><p className="text-xs font-semibold text-red-700">Escalated</p><p className="text-xs text-slate-500">{new Date(item.lastUpdated).toLocaleString('en-GB')}</p></div>}
      </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FileQuestion className="w-6 h-6 text-indigo-600" /> Grievance Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.ticketId}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
             <DetailItem label="Beneficiary Name" value={item.benName || 'N/A'} />
             <DetailItem label="Source / Type" value={`${item.source || 'N/A'} / ${item.type || 'N/A'}`} />
             <DetailItem label="Scheme Involved" value={item.schemeName || 'N/A'} />
             <DetailItem label="Category" value={item.category || 'N/A'} />
             <DetailItem label="Date Submitted" value={new Date(item.dateSub).toLocaleDateString('en-GB')} />
             <DetailItem label="Current Status" value={<GrievanceStatusBadge status={item.status as Status} />} />
          </div>
           <DetailItem label="Description" value={item.description} className="md:col-span-2" isBlock />
           <DetailItem label="Last Action Taken" value={item.lastAction || 'N/A'} className="md:col-span-2" isBlock />
           {item.remarks && <DetailItem label="Remarks" value={item.remarks} className="md:col-span-2" isBlock />}
           {item.escalatedTo && <DetailItem label="Escalated To" value={item.escalatedTo} className="md:col-span-2 font-medium text-red-700" />}
           
           <h4 className="text-md font-semibold text-slate-700 pt-4 border-t border-slate-200">Timeline</h4>
           <Timeline />
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3 mt-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);

// 7. Sortable Table Header (for status table)
type AppSortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const AppSortableHeader: React.FC<AppSortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Main Page Component ---
const RaiseAVoicePage = () => {
  const [formData, setFormData] = useState({ category: '', subCategory: '', title: '', description: '', state: '', district: '', block: '', scheme: '', appId: '', responseMethod: 'Portal Notification', consent: false });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState('');

  // Table State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', status: 'All', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const val = isCheckbox ? e.target.checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors((prev: { [key: string]: string | null }) => ({ ...prev, [name]: null }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev: File[]) => [...prev, ...Array.from(e.target.files!)].slice(0, 3));
    }
    if (errors.files) {
      setErrors((prev: Record<string, string | null>) => ({ ...prev, files: null }));
    }
  }; // Limit 3 files

  // --- Form Validation ---
  const validate = () => {
    let tempErrors: any = {};
    if (!formData.category) tempErrors.category = "Category is required.";
    if (!formData.subCategory) tempErrors.subCategory = "Sub-Category is required.";
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.description) tempErrors.description = "Description is required.";
    if (!formData.state) tempErrors.state = "State is required.";
    if (!formData.district) tempErrors.district = "District is required.";
    // Add more specific validations as needed
    if (!formData.consent) tempErrors.consent = "You must confirm the information is true.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // --- Form Submission ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const newTicketId = `GRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      console.log("Submitting Grievance:", { ...formData, ticketId: newTicketId, files });
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedTicketId(newTicketId);
        setShowSuccessModal(true);
        // Reset form
        setFormData({ category: '', subCategory: '', title: '', description: '', state: '', district: '', block: '', scheme: '', appId: '', responseMethod: 'Portal Notification', consent: false });
        setFiles([]); setErrors({});
      }, 1500);
    } else {
        // Simple shake animation on error
        const formElement = e.target as HTMLFormElement;
        formElement.classList.add('animate-shake');
        setTimeout(() => formElement.classList.remove('animate-shake'), 500);
    }
  };

  // --- Table Logic ---
   const handleTableFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFilters(prev => ({ ...prev, [e.target.name]: e.target.value })); };
   const clearTableFilters = () => { setFilters({ category: 'All', status: 'All', dateFrom: '', dateTo: '' }); setSearchTerm(''); setCurrentPage(1); setSortConfig(null); };
   const applyTableFilters = () => setCurrentPage(1);

   const filteredTableData = useMemo(() => {
    let data = [...MOCK_GRIEVANCES]; // Use MOCK_GRIEVANCES here
    if (searchTerm) { data = data.filter(item => item.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())); }
    if (filters.category !== 'All') data = data.filter(item => item.category === filters.category);
    if (filters.status !== 'All') data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateSub) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateSub) <= new Date(filters.dateTo));
    if (sortConfig !== null) { data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return data;
   }, [searchTerm, filters, sortConfig]);

   const tableTotalPages = Math.ceil(filteredTableData.length / rowsPerPage);
   const paginatedTableData = useMemo(() => filteredTableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredTableData, currentPage, rowsPerPage]);
   const requestTableSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
   const openDetailsModal = (item: any) => { setSelectedGrievance(item); setIsDetailsModalOpen(true); };
   const closeDetailsModal = () => setIsDetailsModalOpen(false);

  // --- Summary Card Calculation ---
  const summary = useMemo(() => ({
    total: MOCK_GRIEVANCES.length, // Use MOCK_GRIEVANCES
    pending: MOCK_GRIEVANCES.filter(g => g.status === 'Pending' || g.status === 'Under Review').length,
    resolved: MOCK_GRIEVANCES.filter(g => g.status === 'Resolved').length,
    avgTime: 21, // Mock avg resolution time
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50 p-4 md:p-8 font-sans animate-fade-in">
        {/* Inline Styles for Animations */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          @keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
          .animate-shake { animation: shake 0.5s ease-in-out; }
        `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- 1. Header Section --- */}
        <header>
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRight className="w-4 h-4 mx-1" /> Manage & Apply <ChevronRight className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Raise a Voice</span> </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl text-white shadow-lg"><Megaphone className="w-8 h-8" /></span>
              <div> <h1 className="text-3xl font-bold text-slate-800">Raise a Voice</h1> <p className="text-slate-500 mt-1">Report issues, delays, or support needs — your dignity & rights matter.</p> </div>
            </div>
             <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <HelpCircle className="w-4 h-4" /> Help & Support </button>
          </div>
        </header>

        {/* --- 2. Motivation Banner --- */}
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-sky-100 p-6 rounded-2xl shadow-lg border border-blue-200/50 flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 text-blue-500 flex-shrink-0" />
            <div>
                <h2 className="text-lg font-semibold text-slate-800">Together we rise. Speak up — we listen and act.</h2>
                <p className="text-sm text-slate-600 mt-1">Your feedback helps us improve. We are committed to addressing your concerns with dignity and respect.</p>
            </div>
        </div>

        {/* --- 3. Grievance Submission Form --- */}
        <GlassCard>
            <h2 className="text-xl font-semibold text-slate-800 mb-5 flex items-center gap-2"><PlusCircle className="text-indigo-600"/> Submit New Grievance / Feedback</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect label="Category" name="category" value={formData.category} onChange={handleChange} required error={errors.category} icon={List}><option value="" disabled>Select Category</option>{mockCategories.map(c=><option key={c} value={c}>{c}</option>)}</FormSelect>
                    <FormSelect label="Sub-Category / Type" name="subCategory" value={formData.subCategory} onChange={handleChange} required error={errors.subCategory} icon={ListChecks}><option value="" disabled>Select Sub-Category</option>{mockSubCategories.map(sc=><option key={sc} value={sc}>{sc}</option>)}</FormSelect>
                </div>
                 <FormInput label="Issue Title / Subject" name="title" type="text" value={formData.title} onChange={handleChange} required error={errors.title} placeholder="Briefly summarize the issue" icon={CaseSensitive} />
                 <FormTextarea label="Detailed Description" name="description" value={formData.description} onChange={handleChange} required error={errors.description} placeholder="Please provide all relevant details..." rows={5} maxLength={1000} />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <FormSelect label="State" name="state" value={formData.state} onChange={handleChange} required error={errors.state} icon={MapPin}><option value="" disabled>Select State</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
                     <FormSelect label="District" name="district" value={formData.district} onChange={handleChange} required error={errors.district} icon={MapPin}><option value="" disabled>Select District</option>{mockDistricts.map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
                     <FormInput label="Block (Optional)" name="block" type="text" value={formData.block} onChange={handleChange} placeholder="Enter Block name"/>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormSelect label="Related Scheme (Optional)" name="scheme" value={formData.scheme} onChange={handleChange} icon={Package}><option value="">Select Scheme</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
                     <FormInput label="Related Application ID (Optional)" name="appId" type="text" value={formData.appId} onChange={handleChange} placeholder="e.g., APP/2025/..." icon={FileDigit}/>
                 </div>
                 <FileUpload label="Upload Supporting Documents (Optional)" name="files" onChange={handleFileChange} files={files} error={errors.files} />
                 <FormSelect label="Preferred Response Method" name="responseMethod" value={formData.responseMethod} onChange={handleChange} required icon={Mail}><option value="" disabled>Select Method</option>{mockResponseMethods.map(m=><option key={m} value={m}>{m}</option>)}</FormSelect>
                 <Checkbox label="I confirm that the information provided is true to the best of my knowledge." name="consent" checked={formData.consent} onChange={handleChange} error={errors.consent} />
                 <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/80">
                     <button type="reset" onClick={() => { setFormData({ category: '', subCategory: '', title: '', description: '', state: '', district: '', block: '', scheme: '', appId: '', responseMethod: 'Portal Notification', consent: false }); setFiles([]); setErrors({}); }} disabled={isSubmitting} className="px-5 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]">Reset</button>
                     <GradientButton text={isSubmitting ? "Submitting..." : "Submit Complaint"} icon={Send} type="submit" disabled={isSubmitting} />
                 </div>
            </form>
        </GlassCard>
        
        {/* --- 4. Complaint Status Summary --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
             <GlassCard className="text-center group hover:bg-white/80 transition-colors">
                <ListTodo className="w-10 h-10 text-indigo-500 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                <p className="text-3xl font-bold text-slate-800">{summary.total}</p>
                <p className="text-sm font-medium text-slate-500">Total Filed</p>
             </GlassCard>
              <GlassCard className="text-center group hover:bg-white/80 transition-colors">
                <Hourglass className="w-10 h-10 text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                <p className="text-3xl font-bold text-slate-800">{summary.pending}</p>
                <p className="text-sm font-medium text-slate-500">Pending / Review</p>
             </GlassCard>
              <GlassCard className="text-center group hover:bg-white/80 transition-colors">
                <CheckCheck className="w-10 h-10 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                <p className="text-3xl font-bold text-slate-800">{summary.resolved}</p>
                <p className="text-sm font-medium text-slate-500">Resolved</p>
             </GlassCard>
              <GlassCard className="text-center group hover:bg-white/80 transition-colors">
                <Clock10 className="w-10 h-10 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                <p className="text-3xl font-bold text-slate-800">{summary.avgTime} Days</p>
                <p className="text-sm font-medium text-slate-500">Avg. Resolution Time</p>
             </GlassCard>
        </section>

        {/* --- 5. Complaint Tracking Table --- */}
        <GlassCard>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><ListFilter className="text-indigo-600"/> Track Your Submissions</h2>
                 <div className="relative w-full sm:w-60">
                    <input type="text" placeholder="Search by Ticket ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead className="bg-slate-100/70 text-slate-700 font-medium">
                        <tr>
                            <AppSortableHeader colKey="ticketId" title="Ticket ID" sortConfig={sortConfig} requestSort={requestTableSort} className="min-w-[150px]" />
                            <AppSortableHeader colKey="category" title="Category" sortConfig={sortConfig} requestSort={requestTableSort} className="min-w-[150px]" />
                            <AppSortableHeader colKey="dateSub" title="Date Submitted" sortConfig={sortConfig} requestSort={requestTableSort} className="min-w-[130px]" />
                            <AppSortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestTableSort} className="min-w-[140px]" />
                            <AppSortableHeader colKey="lastUpdate" title="Last Update" sortConfig={sortConfig} requestSort={requestTableSort} className="min-w-[130px]" />
                            <th className="px-4 py-2 text-left min-w-[200px]">Remarks</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200/50">
                        {paginatedTableData.map(item => (
                            <tr key={item.id} className="hover:bg-sky-50/30 transition-colors">
                                <td className="px-4 py-3 text-slate-700 font-medium">{item.ticketId}</td>
                                <td className="px-4 py-3 text-slate-700">{item.category}</td>
                                <td className="px-4 py-3 text-slate-700">{new Date(item.dateSub).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-3"><GrievanceStatusBadge status={item.status as Status} /></td>
                                <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdate).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => openDetailsModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        ))}
                        {paginatedTableData.length === 0 && (<tr><td colSpan={7} className="text-center py-8 text-slate-500">No submissions found.</td></tr>)}
                   </tbody>
                </table>
             </div>
             {/* Pagination */}
             {tableTotalPages > 1 && (
                 <div className="flex justify-between items-center p-3 border-t border-slate-200/50">
                   <span className="text-xs text-slate-600">Total: {filteredTableData.length}</span>
                   <div className="flex items-center gap-2"> <span className="text-xs text-slate-600">Page {currentPage} of {tableTotalPages}</span> <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button> <button onClick={()=>setCurrentPage(p=>Math.min(p+1,tableTotalPages))} disabled={currentPage===tableTotalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button> </div>
                 </div>
             )}
        </GlassCard>

        {/* --- 7. Encouragement Footer --- */}
        <div className="text-center mt-10 py-6 border-t border-dashed border-indigo-200">
             <HeartHandshake className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
             <p className="text-md font-semibold text-slate-700">Every voice brings change. You are not alone.</p>
             <p className="text-sm text-slate-500 mt-1">We value your input and strive for continuous improvement.</p>
        </div>
        
        {/* --- Modals --- */}
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} ticketId={submittedTicketId} />
        <ViewDetailsModal item={selectedGrievance} isOpen={isDetailsModalOpen} onClose={closeDetailsModal} />
        {/* No Insights Panel for this page as per prompt */}

      </div>
    </div>
  );
};

export default RaiseAVoicePage;