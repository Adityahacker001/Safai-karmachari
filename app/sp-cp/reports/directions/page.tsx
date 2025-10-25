"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import {
  File as FileIcon,
  ListChecks,
  PieChart as PieChartIcon, // Renamed icon
  BarChart3, // Used for Stats
  Gavel,     // For Judiciary
  Building,  // For NSKC/DGP/Ministry (Authority)
  Bot,        // AI Icon
  XCircle,    // Reset Icon
  Download as FileDownIcon,
  RotateCw as RefreshCwIcon,
  Search as SearchIcon,
  Upload,
  CheckCheck, // Added CheckCheck icon
  FileBarChart, // Added FileBarChart icon
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// --- Interfaces ---
interface Direction {
  id: number;
  directionId: string;
  issuedBy: "NSKC" | "DGP" | "Judiciary" | "Ministry";
  dateReceived: string;
  summary: string;
  complianceStatus: "Complied" | "Pending";
  daysPending: number;
  documents: string;
}

interface PieChartEntry {
    name: string;
    value: number;
}

// --- Initial Mock Data ---
const initialDirections: Direction[] = [
    { id: 1, directionId: "DIR001", issuedBy: "NSKC", dateReceived: "2025-10-01", summary: "File compensation details for sewer incident.", complianceStatus: "Complied", daysPending: 0, documents: "View PDF", },
    { id: 2, directionId: "DIR002", issuedBy: "DGP", dateReceived: "2025-09-22", summary: "Submit case progress for FIR #213.", complianceStatus: "Pending", daysPending: 32, documents: "Upload Missing", },
    { id: 3, directionId: "DIR003", issuedBy: "Judiciary", dateReceived: "2025-09-15", summary: "Court order to complete investigation and report back.", complianceStatus: "Pending", daysPending: 39, documents: "Order.docx", },
    { id: 4, directionId: "DIR004", issuedBy: "Ministry", dateReceived: "2025-09-10", summary: "Provide state-wide compliance report.", complianceStatus: "Complied", daysPending: 0, documents: "View PDF", },
];

const initialChartData: PieChartEntry[] = [
    { name: "Complied", value: 82 },
    { name: "Pending", value: 38 },
    { name: "Overdue (>30 Days)", value: 12 }, // Renamed for clarity
];
const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // Green, Yellow, Red


// --- Main Page Component ---
export default function DirectionReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [authorityFilter, setAuthorityFilter] = useState("");
  const [directionsData, setDirectionsData] = useState<Direction[]>(initialDirections);
  const [chartData, setChartData] = useState<PieChartEntry[]>(initialChartData);

  // useEffect(() => { /* Fetch data here */ }, []);

  const handleStatusChange = (value: string) => setStatusFilter(value === "all" ? "" : value);
  const handleAuthorityChange = (value: string) => setAuthorityFilter(value === "all" ? "" : value);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setAuthorityFilter("");
  };

  // --- Filtering Logic ---
  const filteredDirections = directionsData.filter(
    (d) =>
      (d.directionId.toLowerCase().includes(search.toLowerCase()) ||
        d.issuedBy.toLowerCase().includes(search.toLowerCase()) ||
        d.summary.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? d.complianceStatus === statusFilter : true) &&
      (authorityFilter ? d.issuedBy === authorityFilter : true)
  );
  
    // --- Aggregate Stats for Summary Card ---
  const totalDirections = filteredDirections.length;
  const complied = filteredDirections.filter(d => d.complianceStatus === 'Complied').length;
  const pending = filteredDirections.filter(d => d.complianceStatus === 'Pending').length;
  const overdue = filteredDirections.filter(d => d.complianceStatus === 'Pending' && d.daysPending > 30).length; // Example: Overdue > 30 days


  // --- Placeholder Handlers ---
  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setDirectionsData(initialDirections);
    setChartData(initialChartData);
    resetFilters();
  };
  const handleUploadDoc = () => alert("Upload Document functionality to be implemented.");
  const handleMarkComplied = () => alert("Mark as Complied functionality to be implemented.");
  const handleGenerateSummary = () => alert("Generate Summary functionality to be implemented.");
  const handleDraftReply = () => alert("Draft Reply (AI) functionality to be implemented.");
  const handleSummarize = () => alert("Summarize Directions (AI) functionality to be implemented.");
  const handlePredictRisks = () => alert("Predict Overdue Risks (AI) functionality to be implemented.");
  
  // --- Badge Styling ---
  const getStatusBadge = (status: Direction['complianceStatus']) => {
    switch (status) {
      case "Complied": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Complied</Badge>;
      case "Pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getDocumentButtonVariant = (doc: string): "default" | "secondary" | "destructive" | "outline" | "link" => {
    if (doc.startsWith("View") || doc.endsWith(".pdf") || doc.endsWith(".docx")) return "outline";
    if (doc.startsWith("Upload")) return "destructive";
    return "secondary";
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          📘 Direction Compliance Report
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport} className="shadow-sm hover:shadow transition-shadow duration-200">
            <FileDownIcon className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button variant="secondary" onClick={handleRefresh} className="shadow-sm hover:shadow transition-shadow duration-200">
            <RefreshCwIcon className="w-4 h-4 mr-2" /> Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FileIcon className="w-5 h-5 text-indigo-600"/> Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
             <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input
               placeholder="Search by ID, Authority, Summary..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-64 pl-9 focus:ring-2 focus:ring-indigo-300"
             />
          </div>

          <Select value={authorityFilter} onValueChange={handleAuthorityChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Authority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authorities</SelectItem>
              <SelectItem value="NSKC">NSKC</SelectItem>
              <SelectItem value="DGP">DGP</SelectItem>
              <SelectItem value="Judiciary">Judiciary</SelectItem>
              <SelectItem value="Ministry">Ministry</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Compliance Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Complied">Complied</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
             <XCircle className="w-4 h-4 mr-1"/> Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-700"/> Direction Compliance Table
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Direction ID</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Issued By</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Date Received</TableHead>
                  <TableHead className="min-w-[300px] font-semibold text-gray-600">Summary</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Days Pending</TableHead>
                  <TableHead className="font-semibold text-gray-600">Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDirections.map((d, i) => (
                  <TableRow key={d.id} className="hover:bg-blue-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-blue-700 cursor-pointer hover:underline">{d.directionId}</TableCell>
                    <TableCell className="text-gray-700">{d.issuedBy}</TableCell>
                    <TableCell className="text-gray-700">{d.dateReceived}</TableCell>
                    <TableCell className="text-xs text-gray-600">{d.summary}</TableCell>
                    <TableCell>{getStatusBadge(d.complianceStatus)}</TableCell>
                    <TableCell className={`text-center font-bold ${d.daysPending > 30 ? 'text-red-600' : (d.daysPending > 0 ? 'text-orange-600' : 'text-gray-500')}`}>{d.daysPending > 0 ? d.daysPending : '—'}</TableCell>
                    <TableCell>
                      <Button variant={getDocumentButtonVariant(d.documents)} size="sm">{d.documents}</Button>
                    </TableCell>
                  </TableRow>
                ))}
                 {filteredDirections.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={9} className="text-center text-gray-500 py-10">
                            No directions found matching your criteria.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b p-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-indigo-600" /> Direction Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart margin={{ top: 20, bottom: 20 }}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} directions`}/>
              <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">Compliance Summary (Filtered)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Total Directions Displayed: <strong>{totalDirections}</strong></li>
              <li>Complied: <strong className="text-green-600">{complied}</strong></li>
              <li>Pending: <strong className="text-yellow-600">{pending}</strong></li>
              <li>Overdue (Pending {'>'}30 days): <strong className="text-red-600">{overdue}</strong></li>
            </ul>
          </CardContent>
        </Card>

         <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <ListChecks className="w-5 h-5 text-green-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleUploadDoc}><Upload className="w-4 h-4 mr-2"/> Upload Compliance Doc</Button>
            <Button variant="outline" size="sm" onClick={handleMarkComplied}><CheckCheck className="w-4 h-4 mr-2"/> Mark as Complied</Button>
            <Button variant="outline" size="sm" onClick={handleGenerateSummary}><FileBarChart className="w-4 h-4 mr-2"/> Generate Summary</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">AI Assistance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline" size="sm" onClick={handleDraftReply}>Draft Reply Letter (AI)</Button>
            <Button variant="outline" size="sm" onClick={handleSummarize}>Summarize Directions (AI)</Button>
            <Button variant="outline" size="sm" onClick={handlePredictRisks}>Predict Overdue Risks (AI)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}