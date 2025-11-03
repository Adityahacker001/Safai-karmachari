"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn Table components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import {
  FileDown,
  Search,
  RefreshCw,
  Users,    // Header Icon
  Filter,   // Filter Icon
  List,     // Table Icon
  BarChart2,// Stats Icon
  ListChecks,// Quick Actions Icon
  XCircle,  // Reset Icon
} from "lucide-react";

// --- Interfaces ---
interface Worker {
  id: number;
  name: string;
  category: string;
  contractor: string;
  gender: string;
  caste: string;
  religion: string;
  age: number;
  incidentLinked: "Yes" | "No"; // Use union type
  firFiled: "Yes" | "No";       // Use union type
  investigationStatus: "Initiated" | "In Progress" | "Completed" | "Charge Sheet Filed" | "N/A"; // Added N/A
  compensationStatus: "Paid" | "Pending" | "Under Process" | "Rejected" | "N/A"; // Added N/A
  remarks: string;
}

// --- Initial Mock Data ---
const initialWorkersData: Worker[] = [
    { id: 1, name: "Aditya Kumar", category: "Manual Scavenging Death", contractor: "CleanForce Pvt Ltd", gender: "Male", caste: "SC", religion: "Hindu", age: 38, incidentLinked: "Yes", firFiled: "Yes", investigationStatus: "Completed", compensationStatus: "Paid", remarks: "FIR filed, compensation processed.", },
    { id: 2, name: "Suresh Yadav", category: "Sewer Injury", contractor: "UrbanClean Services", gender: "Male", caste: "OBC", religion: "Hindu", age: 41, incidentLinked: "Yes", firFiled: "No", investigationStatus: "In Progress", compensationStatus: "Pending", remarks: "Awaiting FIR update.", },
    { id: 3, name: "Anita Devi", category: "Ordinary Worker", contractor: "CleanForce Pvt Ltd", gender: "Female", caste: "SC", religion: "Hindu", age: 29, incidentLinked: "No", firFiled: "No", investigationStatus: "N/A", compensationStatus: "N/A", remarks: "Regular cleaning duties.", },
    { id: 4, name: "Mohammad Irfan", category: "Hazardous Cleaning", contractor: "EcoSan Solutions", gender: "Male", caste: "General", religion: "Muslim", age: 45, incidentLinked: "Yes", firFiled: "Yes", investigationStatus: "Charge Sheet Filed", compensationStatus: "Under Process", remarks: "Charge sheet submitted.", },
    { id: 5, name: "Lakshmi Murmu", category: "Ragpicker", contractor: "UrbanClean Services", gender: "Female", caste: "ST", religion: "Other", age: 22, incidentLinked: "No", firFiled: "No", investigationStatus: "N/A", compensationStatus: "N/A", remarks: "Waste segregation.", },
];

// --- Main Page Component ---
export default function WorkersReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Investigation Status
  const [categoryFilter, setCategoryFilter] = useState("");
  const [compFilter, setCompFilter] = useState(""); // Compensation Status
  const [workersData, setWorkersData] = useState<Worker[]>(initialWorkersData);

   // useEffect(() => { /* Fetch data here */ }, []);

  const handleStatusChange = (value: string) => setStatusFilter(value === "all" ? "" : value);
  const handleCategoryChange = (value: string) => setCategoryFilter(value === "all" ? "" : value);
  const handleCompChange = (value: string) => setCompFilter(value === "all" ? "" : value);

   const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setCategoryFilter("");
        setCompFilter("");
   };

   // --- Filtering Logic ---
   const filteredWorkers = workersData.filter(
     (w) =>
       w.name.toLowerCase().includes(search.toLowerCase()) &&
       (statusFilter ? w.investigationStatus === statusFilter : true) &&
       (categoryFilter ? w.category === categoryFilter : true) &&
       (compFilter ? w.compensationStatus === compFilter : true)
   );

  // --- Placeholder Handlers ---
  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setWorkersData(initialWorkersData); // Resetting to mock data
    resetFilters();
  };
  const handleAddWorker = () => alert("Add Worker functionality to be implemented.");
  const handleViewIncidents = () => alert("View All Incidents functionality to be implemented.");
  const handleExportSummary = () => alert("Export Summary functionality to be implemented.");


  // --- Badge Styling ---
   const getInvestigationStatusBadge = (status: Worker['investigationStatus']) => {
       switch (status) {
           case "Initiated": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Initiated</Badge>;
           case "In Progress": return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">In Progress</Badge>;
           case "Completed": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
           case "Charge Sheet Filed": return <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-200">Charge Sheet Filed</Badge>;
           default: return <Badge variant="outline">N/A</Badge>;
       }
   };
   const getCompensationStatusBadge = (status: Worker['compensationStatus']) => {
       switch (status) {
           case "Paid": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
           case "Pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
           case "Under Process": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Under Process</Badge>;
           case "Rejected": return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
           default: return <Badge variant="outline">N/A</Badge>;
       }
   };


  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 min-h-screen"> {/* Adjusted background */}
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🧍‍♂️ Workers Reports Dashboard
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
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm"> {/* Added backdrop blur */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-600"/> Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input
               placeholder="Search by Worker Name..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-64 pl-9 focus:ring-2 focus:ring-indigo-300"
             />
          </div>

          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-56 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Manual Scavenging Death">Manual Scavenging Death</SelectItem>
              <SelectItem value="Sewer Injury">Sewer Injury</SelectItem>
              <SelectItem value="Hazardous Cleaning">Hazardous Cleaning</SelectItem>
              <SelectItem value="Ordinary Worker">Ordinary Worker</SelectItem>
              <SelectItem value="Ragpicker">Ragpicker</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Investigation Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Initiated">Initiated</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Charge Sheet Filed">Charge Sheet Filed</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>

          <Select value={compFilter} onValueChange={handleCompChange}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Compensation Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Under Process">Under Process</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
               <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <List className="w-5 h-5 text-green-700"/> Total Workers Report
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]"> {/* Min width for horizontal scroll */}
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Worker Name</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Category</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Contractor</TableHead>
                  <TableHead className="font-semibold text-gray-600">Gender</TableHead>
                  <TableHead className="font-semibold text-gray-600">Caste</TableHead>
                  <TableHead className="font-semibold text-gray-600">Religion</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Age</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Incident</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">FIR</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Inv. Status</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Comp. Status</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((w, i) => (
                  <TableRow key={w.id} className="hover:bg-blue-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-blue-700 cursor-pointer hover:underline">{w.name}</TableCell>
                    <TableCell className="text-gray-700">{w.category}</TableCell>
                    <TableCell className="text-gray-700">{w.contractor}</TableCell>
                    <TableCell className="text-gray-700">{w.gender}</TableCell>
                    <TableCell className="text-gray-700">{w.caste}</TableCell>
                    <TableCell className="text-gray-700">{w.religion}</TableCell>
                    <TableCell className="text-center text-gray-700">{w.age}</TableCell>
                    <TableCell className={`text-center font-medium ${w.incidentLinked === 'Yes' ? 'text-red-600' : 'text-gray-500'}`}>{w.incidentLinked}</TableCell>
                    <TableCell className={`text-center font-medium ${w.firFiled === 'Yes' ? 'text-red-700' : 'text-gray-500'}`}>{w.firFiled}</TableCell>
                    <TableCell>{getInvestigationStatusBadge(w.investigationStatus)}</TableCell>
                    <TableCell>{getCompensationStatusBadge(w.compensationStatus)}</TableCell>
                    <TableCell className="text-xs text-gray-500">{w.remarks}</TableCell>
                  </TableRow>
                ))}
                {filteredWorkers.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={13} className="text-center text-gray-500 py-10">
                            No workers found matching your criteria. Adjust filters or search term.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Summary Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
             <BarChart2 className="w-5 h-5 text-blue-600"/>
             <CardTitle className="text-base font-semibold text-gray-700">Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with dynamic calculations based on filteredWorkers */}
            <ul className="text-sm list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Total Workers Displayed: <strong>{filteredWorkers.length}</strong></li>
              <li>Linked to Incidents: <strong>{filteredWorkers.filter(w => w.incidentLinked === 'Yes').length}</strong></li>
              <li>FIRs Filed: <strong>{filteredWorkers.filter(w => w.firFiled === 'Yes').length}</strong></li>
              <li>Compensation Paid: <strong>{filteredWorkers.filter(w => w.compensationStatus === 'Paid').length}</strong></li>
              <li>Pending Investigations: <strong>{filteredWorkers.filter(w => w.investigationStatus === 'In Progress' || w.investigationStatus === 'Initiated').length}</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
           <CardHeader className="flex flex-row items-center gap-2">
             <ListChecks className="w-5 h-5 text-green-600"/>
             <CardTitle className="text-base font-semibold text-gray-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleAddWorker}>Add New Worker</Button>
            <Button variant="outline" size="sm" onClick={handleViewIncidents}>View All Incidents</Button>
            <Button variant="outline" size="sm" onClick={handleExportSummary}>Export Summary</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}