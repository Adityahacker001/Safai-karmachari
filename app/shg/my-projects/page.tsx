// This is your page.tsx file
// Ensure you have React, TailwindCSS, and lucide-react installed:
// npm install lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, ChevronRight, Briefcase, PlusCircle, CheckCircle, Clock,
  DollarSign, BarChart3, ListFilter, Search, X, Eye, Edit, Trash2, FileText,
  Users, Calendar, TrendingUp, Download, ArrowRight, Activity, Zap, FileUp, Filter, FolderKanban, ActivitySquare
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

// --- Reusable Components ---

// 1. Gradient Button
type GradientButtonProps = {
  text: string;
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
  gradient?: string; // e.g., 'from-blue-500 to-sky-400'
};
const GradientButton: React.FC<GradientButtonProps> = ({
  text, icon: Icon, onClick, className = '', gradient = 'from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600'
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold 
               bg-gradient-to-r ${gradient} shadow-lg hover:shadow-xl 
               transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
               focus:ring-4 focus:ring-blue-300 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span>{text}</span>
  </button>
);



// 3. Project Status Badge
type Status = 'Active' | 'Completed' | 'Pending Approval' | 'On Hold';
const ProjectStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Active: { bg: 'bg-green-100', text: 'text-green-700', icon: ActivitySquare },
    Completed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
    'Pending Approval': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    'On Hold': { bg: 'bg-orange-100', text: 'text-orange-700', icon: Zap },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};



// 5. Project Card
type ProjectCardProps = {
  project: any; // Define a proper type later
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onEdit, onDelete }) => (
  <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 
                 p-6 space-y-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform-gpu">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-slate-800">{project.title}</h3>
        <p className="text-xs text-indigo-600 font-medium">{project.scheme}</p>
      </div>
      <ProjectStatusBadge status={project.status as Status} />
    </div>

    {/* Details */}
    <div className="text-sm text-slate-600 space-y-2">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-blue-500" />
        <span>Start Date: <span className="font-semibold text-slate-700">{project.startDate}</span></span>
      </div>
    </div>


    {/* Actions */}
    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/80">
      <button onClick={() => onView(project.id)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors" title="View Details"> <Eye className="w-4 h-4" /> </button>
      <button onClick={() => onEdit(project.id)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors" title="Edit Project"> <Edit className="w-4 h-4" /> </button>
      <button onClick={() => onDelete(project.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors" title="Delete Project"> <Trash2 className="w-4 h-4" /> </button>
    </div>
  </div>
);

// --- Mock Data ---

const MOCK_PROJECT_DATA = [
{ id: 1, title: 'Railway Station Platform Cleaning', scheme: 'Railway Sanitation Contract', status: 'Active', startDate: '12 May 2025' },
{ id: 2, title: 'Train Coach Cleaning & Maintenance', scheme: 'Railway Cleaning Service', status: 'Active', startDate: '20 Apr 2025' },
{ id: 3, title: 'Railway Track Cleaning & Debris Removal', scheme: 'Railway Track Maintenance', status: 'Completed', startDate: '05 Feb 2025' },
{ id: 4, title: 'Railway Toilet Cleaning & Sanitization', scheme: 'Railway Sanitation Service', status: 'Active', startDate: '18 Jun 2025' },
{ id: 5, title: 'Railway Yard Waste Management', scheme: 'Railway Waste Management', status: 'Pending Approval', startDate: '02 Nov 2025' },
{ id: 6, title: 'Railway Station Washroom Maintenance', scheme: 'Railway Facility Cleaning', status: 'Active', startDate: '25 Mar 2025' },
{ id: 7, title: 'Railway Platform Mechanized Sweeping', scheme: 'Mechanized Railway Cleaning', status: 'On Hold', startDate: '15 Sep 2025' },
{ id: 8, title: 'Railway Compartment Deep Cleaning', scheme: 'Railway Deep Cleaning Service', status: 'Active', startDate: '08 Jul 2025' },
{ id: 9, title: 'Railway Engine Shed Cleaning', scheme: 'Railway Maintenance Contract', status: 'Active', startDate: '14 Jan 2025' },
{ id: 10, title: 'Railway Pantry Car Sanitization', scheme: 'Railway Food Safety Service', status: 'Completed', startDate: '28 Mar 2025' },
{ id: 11, title: 'Railway Signal Box Cleaning', scheme: 'Railway Infrastructure Cleaning', status: 'Active', startDate: '05 Aug 2025' },
{ id: 12, title: 'Railway Overhead Bridge Cleaning', scheme: 'Railway Structure Maintenance', status: 'Pending Approval', startDate: '10 Oct 2025' },
];

const mockStatusOptions = ['All', 'Active', 'Completed', 'Pending Approval', 'On Hold'];
const mockSchemeOptions = ['All', ...new Set(MOCK_PROJECT_DATA.map(p => p.scheme))];
const mockYearOptions = ['All', '2025', '2024'];


// --- Main Page Component ---
const MyProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    scheme: 'All',
    year: 'All',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ status: 'All', scheme: 'All', year: 'All' });
    setSearchTerm('');
  };

  // --- Filtering Logic ---
  const filteredProjects = useMemo(() => {
    return MOCK_PROJECT_DATA.filter(project => {
      const matchesSearch = searchTerm === '' || 
                            project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.scheme.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'All' || project.status === filters.status;
      const matchesScheme = filters.scheme === 'All' || project.scheme === filters.scheme;
      // Basic year check on startDate
      const matchesYear = filters.year === 'All' || project.startDate.includes(filters.year); 

      return matchesSearch && matchesStatus && matchesScheme && matchesYear;
    });
  }, [searchTerm, filters]);

  // --- Mock Actions ---
  const handleView = (id: number) => alert(`View Project ID: ${id}`);
  const handleEdit = (id: number) => alert(`Edit Project ID: ${id}`);
  const handleDelete = (id: number) => {
    if(confirm(`Are you sure you want to delete Project ID: ${id}?`)) {
        alert(`Deleting Project ID: ${id}`);
        // Add actual delete logic here
    }
  };
  const handleAddNew = () => alert('Navigate to Add New Project Form');

  // --- Summary Metrics Calculation ---
  const summary = useMemo(() => ({
    total: MOCK_PROJECT_DATA.length,
    active: MOCK_PROJECT_DATA.filter(p => p.status === 'Active').length,
    completed: MOCK_PROJECT_DATA.filter(p => p.status === 'Completed').length,
    pending: MOCK_PROJECT_DATA.filter(p => p.status === 'Pending Approval').length,
  }), []);


  return (
    <div className="min-h-screen p-4 md:p-8 font-sans animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 1. Header Section --- */}
        <header className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" />
            SHG Dashboard
            <ChevronRight className="w-4 h-4 mx-1" />
            Manage & Apply
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">My Projects</span>
          </nav>

          {/* District Dashboard–style gradient title container */}
          <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-xl shadow-2xl p-6 md:p-8 mb-6 min-h-[96px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Projects</h1>
              <p className="text-white/90 mt-1">Manage your SHG's ongoing and completed projects.</p>
            </div>
            <div className="w-full md:w-auto">
              <GradientButton text="Add New Project" icon={PlusCircle} onClick={handleAddNew} />
            </div>
          </div>
        </header>

        {/* --- 2. Summary Metrics --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Projects" value={summary.total.toString()} icon={Briefcase} color="blue" />
            <StatCard title="Active Projects" value={summary.active.toString()} icon={ActivitySquare} color="green" />
            <StatCard title="Completed Projects" value={summary.completed.toString()} icon={CheckCircle} color="purple" />
            <StatCard title="Pending Projects" value={summary.pending.toString()} icon={Clock} color="sky" />
        </section>

        {/* --- 3. Filters Section --- */}
         <section className="mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-slate-200/80">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
                    <Filter className="w-5 h-5 text-indigo-500" /> Filter Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* Status Filter */}
                    <div>
                        <label htmlFor="statusFilter" className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                        <select id="statusFilter" name="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                            {mockStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     {/* Scheme Filter */}
                    <div>
                        <label htmlFor="schemeFilter" className="block text-xs font-medium text-slate-600 mb-1">Scheme</label>
                        <select id="schemeFilter" name="scheme" value={filters.scheme} onChange={handleFilterChange} className="w-full p-2 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                           {mockSchemeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     {/* Year Filter */}
                     <div>
                        <label htmlFor="yearFilter" className="block text-xs font-medium text-slate-600 mb-1">Year Started</label>
                        <select id="yearFilter" name="year" value={filters.year} onChange={handleFilterChange} className="w-full p-2 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                           {mockYearOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     {/* Search Input */}
                    <div className="relative">
                       <label htmlFor="searchProjects" className="block text-xs font-medium text-slate-600 mb-1">Search</label>
                        <input
                            type="text"
                            id="searchProjects"
                            placeholder="Search by title or scheme..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[33px]" />
                    </div>
                </div>
                 {/* Clear Button */}
                {(filters.status !== 'All' || filters.scheme !== 'All' || filters.year !== 'All' || searchTerm !== '') && (
                    <div className="mt-4 flex justify-end">
                        <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                            <X className="w-3.5 h-3.5" /> Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </section>

        {/* --- 4. Projects List --- */}
        <section>
          {filteredProjects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
          ) : (
             <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
                <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">No Projects Found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your filters or add a new project.</p>
             </div>
          )}
        </section>

      </div>
       {/* Simple Footer */}
        <footer className="text-center mt-12 text-xs text-slate-500">
           NSKFDC SHG Dashboard &copy; {new Date().getFullYear()}
        </footer>
    </div>
  );
};

export default MyProjectsPage;

// Add this CSS for fade-in animation to your global stylesheet (e.g., globals.css)
/*
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
*/