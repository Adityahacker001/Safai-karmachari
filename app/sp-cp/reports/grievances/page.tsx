"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import { createPortal } from "react-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import {
  FileDown,
  Search,
  RefreshCw,
  BarChart3,
  MessageSquareWarning, // Header Icon
  Filter,         // Filter Icon
  List,           // Table Icon
  BarChart,     // Stats Icon
  ListChecks,     // Quick Actions Icon
  XCircle,        // Reset Icon
} from "lucide-react";

// --- Interfaces ---
interface Grievance {
  id: number;
  grievanceId: string;
  source: "Worker" | "SHG" | "Public";
  type: "Police Inaction" | "Delay" | "Harassment" | "Other";
  description: string;
  dateReceived: string;
  actionTaken: string;
  status: "Resolved" | "Pending" | "Escalated";
  escalatedTo: string;

  // Newly added fields
  escalationDate?: string;
  escalationReason?: string;
  escalatedBy?: string;
  expectedResolutionDate?: string;
  supportingDocument?: string;
}

// --- Initial Mock Data ---
const initialGrievances: Grievance[] = [
    { id: 1, grievanceId: "GRV001", source: "Worker", type: "Police Inaction", description: "FIR not filed despite complaint", dateReceived: "2025-10-14", actionTaken: "Officer reprimanded, FIR registered", status: "Resolved", escalatedTo: "—", },
    { id: 2, grievanceId: "GRV002", source: "SHG", type: "Delay", description: "Investigation pending over 30 days", dateReceived: "2025-10-12", actionTaken: "Awaiting report from SHO", status: "Pending", escalatedTo: "DGP", },
    { id: 3, grievanceId: "GRV003", source: "Public", type: "Harassment", description: "Improper police behavior during questioning", dateReceived: "2025-10-10", actionTaken: "Forwarded to SP for internal review", status: "Escalated", escalatedTo: "NSKC", },
    { id: 4, grievanceId: "GRV004", source: "Worker", type: "Other", description: "Equipment not returned after case closure.", dateReceived: "2025-10-09", actionTaken: "SHO instructed to return equipment.", status: "Resolved", escalatedTo: "—", },
];

// Inline IntegratedLoader (same JSX/CSS as components/IntegratedLoader.tsx)
const IntegratedLoader: React.FC = () => (
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

// --- Main Page Component ---
export default function GrievanceReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [grievancesData, setGrievancesData] = useState<Grievance[]>(initialGrievances);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // useEffect(() => { /* Fetch data here */ }, []);

  const handleStatusChange = (value: string) => setStatusFilter(value === "all" ? "" : value);
  const handleTypeChange = (value: string) => setTypeFilter(value === "all" ? "" : value);
  const handleSourceChange = (value: string) => setSourceFilter(value === "all" ? "" : value);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setTypeFilter("");
    setSourceFilter("");
  };

  // --- Filtering Logic ---
  const filteredGrievances = grievancesData.filter(
    (g) =>
      (g.grievanceId.toLowerCase().includes(search.toLowerCase()) ||
      g.source.toLowerCase().includes(search.toLowerCase()) ||
      g.type.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())) && // Added description to search
      (statusFilter ? g.status === statusFilter : true) &&
      (typeFilter ? g.type === typeFilter : true) &&
      (sourceFilter ? g.source === sourceFilter : true)
  );
  
  // --- Aggregate Stats for Summary Card ---
  const totalGrievances = filteredGrievances.length;
  const resolved = filteredGrievances.filter(g => g.status === 'Resolved').length;
  const pending = filteredGrievances.filter(g => g.status === 'Pending').length;
  const escalated = filteredGrievances.filter(g => g.status === 'Escalated').length;


  // --- Placeholder Handlers ---
  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setGrievancesData(initialGrievances);
    resetFilters();
  };
  const handleAddGrievance = () => alert("Add Grievance functionality to be implemented.");
  const handleViewEscalated = () => {
    setSelectedGrievance({
      id: 3, // Added the missing `id` field
      grievanceId: "GRV003",
      source: "Public",
      type: "Harassment",
      dateReceived: "2025-10-10",

      description:
        "Improper police behavior during questioning. Victim reports verbal misconduct and intimidation by on-duty officer.",

      // Escalation Section
      escalatedTo: "NSKC",
      escalationDate: "2025-10-12",
      escalationReason: "Misconduct by officer requiring higher administrative review.",
      escalatedBy: "SP Office",

      // Status Section
      status: "Escalated",
      actionTaken:
        "Case forwarded to Superintendent of Police for internal inquiry and disciplinary review.",
      expectedResolutionDate: "2025-10-20",

      // Supporting Document
      supportingDocument:
        "https://example.com/supporting-docs/GRV003-incident-report.pdf"
    });
  };
  const handleGenerateSummary = () => alert("Generate Summary functionality to be implemented.");


  // --- Badge Styling ---
  const getStatusBadge = (status: Grievance['status']) => {
    switch (status) {
      case "Resolved": return <Badge variant="default" className="bg-green-200 text-green-900 border-green-300">Resolved</Badge>;
      case "Pending": return <Badge variant="secondary" className="bg-yellow-200 text-yellow-900 border-yellow-300">Pending</Badge>;
      case "Escalated": return <Badge variant="destructive" className="bg-red-200 text-red-900 border-red-300">Escalated</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Prefer the app-level `#modal-root` if present (dashboard layout creates it),
    // otherwise fall back to `document.body` so the overlay covers everything.
    const root = document.getElementById("modal-root") || document.body;
    setModalRoot(root as HTMLElement);
  }, []);

  if (loading) return <IntegratedLoader />;
  // Build modal content outside of JSX to avoid parser issues and for clarity
  let EscalatedModal: React.ReactNode = null;
  if (selectedGrievance) {
    const modalContent = (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedGrievance(null)}
        />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-200 p-4 sm:p-6 max-w-4xl w-full max-h-[86vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Escalated Case Details</h2>
            <button onClick={() => setSelectedGrievance(null)} className="text-gray-600 hover:text-gray-900">&times;</button>
          </div>
          <div className="max-w-4xl mx-auto w-full space-y-4">
            {/* Basic Grievance Info */}
            <div className="rounded-md p-3 flex items-start gap-3">
              <div className="w-1 mt-1 rounded-full bg-gradient-to-b from-indigo-600 via-violet-600 to-pink-500" aria-hidden />
              <div className="flex-1">
                <h3 className="text-md font-bold text-indigo-700 flex items-center gap-2 mb-3">Basic Grievance Info</h3>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Grievance ID</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.grievanceId}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Source</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.source}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Type</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.type}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Date Received</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.dateReceived}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-4">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Description</span>
                      <span className="text-sm text-slate-900 font-medium mt-1">{selectedGrievance.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Escalation Information */}
            <div className="rounded-md p-3 flex items-start gap-3">
              <div className="w-1 mt-1 rounded-full bg-gradient-to-b from-indigo-600 via-violet-600 to-pink-500" aria-hidden />
              <div className="flex-1">
                <h3 className="text-md font-bold text-indigo-700 flex items-center gap-2 mb-3">Escalation Information</h3>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Escalated To</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.escalatedTo}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Escalation Date</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.escalationDate || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-1">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Escalated By</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.escalatedBy || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-3">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Reason for Escalation</span>
                      <span className="text-sm text-slate-900 font-medium mt-1">{selectedGrievance.escalationReason || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="rounded-md p-3 flex items-start gap-3">
              <div className="w-1 mt-1 rounded-full bg-gradient-to-b from-indigo-600 via-violet-600 to-pink-500" aria-hidden />
              <div className="flex-1">
                <h3 className="text-md font-bold text-indigo-700 flex items-center gap-2 mb-3">Current Status</h3>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Status</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.status}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Expected Resolution</span>
                      <span className="text-sm text-slate-900 font-semibold mt-1">{selectedGrievance.expectedResolutionDate || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-3 shadow-sm col-span-2 md:col-span-1">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Action Taken</span>
                      <span className="text-sm text-slate-900 font-medium mt-1">{selectedGrievance.actionTaken}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Document */}
            <div className="rounded-md p-3 flex items-start gap-3">
              <div className="w-1 mt-1 rounded-full bg-gradient-to-b from-indigo-600 via-violet-600 to-pink-500" aria-hidden />
              <div className="flex-1">
                <h3 className="text-md font-bold text-indigo-700 flex items-center gap-2">Supporting Document</h3>
                <div className="pb-2 mb-3"></div>
                <div>
                  {selectedGrievance.supportingDocument ? (
                    <a
                      href={selectedGrievance.supportingDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-bold underline hover:text-indigo-800"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">Not Uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-4 mt-3">
            <button
              onClick={() => setSelectedGrievance(null)}
              className="px-5 py-2 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );

    EscalatedModal = modalRoot ? createPortal(modalContent, modalRoot) : modalContent;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen text-slate-900 dark:text-slate-50">
      {/* District-style banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Grievances Report Dashboard</h1>
            <p className="text-sm opacity-90 mt-1">Grievance tracking and resolution overview</p>
          </div>
        </div>
        <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
      </div>

      {/* Header actions (title is in the banner above) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div />
        {/* use a row layout so buttons sit side-by-side on phones; desktop spacing preserved */}
        <div className="flex flex-row items-center gap-3">
          <Button variant="outline" onClick={handleExport} className="shadow-sm hover:shadow transition-shadow duration-200">
            <FileDown className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button variant="secondary" onClick={handleRefresh} className="shadow-sm hover:shadow transition-shadow duration-200">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-600"/> Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input
               placeholder="Search by ID, Source, Type..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-64 pl-9 focus:ring-2 focus:ring-indigo-300"
             />
          </div>

          <Select value={sourceFilter} onValueChange={handleSourceChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Worker">Worker</SelectItem>
              <SelectItem value="SHG">SHG</SelectItem>
              <SelectItem value="Public">Public</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full sm:w-56 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Police Inaction">Police Inaction</SelectItem>
              <SelectItem value="Delay">Delay</SelectItem>
              <SelectItem value="Harassment">Harassment</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <List className="w-5 h-5 text-orange-700"/> Grievances Report Table
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Grievance ID</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Source</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Type</TableHead>
                  <TableHead className="min-w-[250px] font-semibold text-gray-600">Description</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Date Received</TableHead>
                  <TableHead className="min-w-[250px] font-semibold text-gray-600">Action Taken</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Status</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Escalated To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrievances.map((g, i) => (
                  <TableRow key={g.id} className="hover:bg-orange-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-blue-700 cursor-pointer hover:underline">{g.grievanceId}</TableCell>
                    <TableCell className="text-gray-700">{g.source}</TableCell>
                    <TableCell className="text-gray-700">{g.type}</TableCell>
                    <TableCell className="text-xs text-gray-600">{g.description}</TableCell>
                    <TableCell className="text-gray-700">{g.dateReceived}</TableCell>
                    <TableCell className="text-xs text-gray-600">{g.actionTaken}</TableCell>
                    <TableCell>{getStatusBadge(g.status)}</TableCell>
                    <TableCell className={`font-medium ${g.escalatedTo !== '—' ? 'text-red-600' : 'text-gray-500'}`}>{g.escalatedTo}</TableCell>
                  </TableRow>
                ))}
                {filteredGrievances.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={9} className="text-center text-gray-500 py-10">
                            No grievances found matching your criteria.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

  {/* Summary */}
  {/* show two cards per row on mobile while keeping desktop unchanged */}
  <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">Key Metrics (Filtered)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Total Grievances Displayed: <strong>{totalGrievances}</strong></li>
              <li>Resolved: <strong className="text-green-600">{resolved}</strong></li>
              <li>Pending: <strong className="text-yellow-600">{pending}</strong></li>
              <li>Escalated: <strong className="text-red-600">{escalated}</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <ListChecks className="w-5 h-5 text-green-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleAddGrievance}>Add Grievance</Button>
            <Button variant="outline" size="sm" onClick={handleViewEscalated}>View Escalated Cases</Button>
            <Button variant="outline" size="sm" onClick={handleGenerateSummary}>Generate Summary</Button>
          </CardContent>
        </Card>
      </div>

      {/* View Escalated Case Modal (render into app-level modal root via portal so overlay covers header/sidebar) */}
      {EscalatedModal}
    </div>
  );
}