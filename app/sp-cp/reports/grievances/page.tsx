"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
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
}

// --- Initial Mock Data ---
const initialGrievances: Grievance[] = [
    { id: 1, grievanceId: "GRV001", source: "Worker", type: "Police Inaction", description: "FIR not filed despite complaint", dateReceived: "2025-10-14", actionTaken: "Officer reprimanded, FIR registered", status: "Resolved", escalatedTo: "—", },
    { id: 2, grievanceId: "GRV002", source: "SHG", type: "Delay", description: "Investigation pending over 30 days", dateReceived: "2025-10-12", actionTaken: "Awaiting report from SHO", status: "Pending", escalatedTo: "DGP", },
    { id: 3, grievanceId: "GRV003", source: "Public", type: "Harassment", description: "Improper police behavior during questioning", dateReceived: "2025-10-10", actionTaken: "Forwarded to SP for internal review", status: "Escalated", escalatedTo: "NSKC", },
    { id: 4, grievanceId: "GRV004", source: "Worker", type: "Other", description: "Equipment not returned after case closure.", dateReceived: "2025-10-09", actionTaken: "SHO instructed to return equipment.", status: "Resolved", escalatedTo: "—", },
];

// --- Main Page Component ---
export default function GrievanceReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [grievancesData, setGrievancesData] = useState<Grievance[]>(initialGrievances);

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
  const handleViewEscalated = () => alert("View Escalated Cases functionality to be implemented.");
  const handleGenerateSummary = () => alert("Generate Summary functionality to be implemented.");


  // --- Badge Styling ---
  const getStatusBadge = (status: Grievance['status']) => {
    switch (status) {
      case "Resolved": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case "Pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "Escalated": return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Escalated</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">
          📢 Grievances Report Dashboard
        </h1>
        <div className="flex gap-3">
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
      <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
}