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
  Building, // For Contractor Card
  Users,    // For Worker Distribution
  ListChecks,// For Quick Actions
  FileWarning, // For Exception Reports
  XCircle,  // For Reset Button
} from "lucide-react";

// --- Interfaces ---
interface Contractor {
  id: number;
  name: string;
  totalWorkers: number;
  manualScavenging: number;
  ragpickers: number;
  hazardous: number;
  ordinary: number;
  caste: { sc: number; st: number; obc: number; general: number };
  religion: { hindu: number; muslim: number; other: number };
  gender: { male: number; female: number };
  ageGroups: { under18: number; a18_40: number; a41_60: number; above60: number };
  incidents: number;
  firs: number;
  status: "Active" | "Under Review" | "Suspended"; // Use union type for status
}

// --- Initial Mock Data ---
const initialContractors: Contractor[] = [
    { id: 1, name: "CleanForce Pvt Ltd", totalWorkers: 120, manualScavenging: 5, ragpickers: 10, hazardous: 20, ordinary: 85, caste: { sc: 40, st: 10, obc: 50, general: 20 }, religion: { hindu: 90, muslim: 20, other: 10 }, gender: { male: 80, female: 40 }, ageGroups: { under18: 2, a18_40: 70, a41_60: 40, above60: 8 }, incidents: 2, firs: 1, status: "Active", },
    { id: 2, name: "UrbanClean Services", totalWorkers: 85, manualScavenging: 8, ragpickers: 12, hazardous: 15, ordinary: 50, caste: { sc: 25, st: 8, obc: 40, general: 12 }, religion: { hindu: 65, muslim: 15, other: 5 }, gender: { male: 55, female: 30 }, ageGroups: { under18: 1, a18_40: 45, a41_60: 35, above60: 4 }, incidents: 4, firs: 2, status: "Under Review", },
    { id: 3, name: "EcoSan Solutions", totalWorkers: 95, manualScavenging: 2, ragpickers: 15, hazardous: 10, ordinary: 68, caste: { sc: 30, st: 5, obc: 45, general: 15 }, religion: { hindu: 70, muslim: 18, other: 7 }, gender: { male: 60, female: 35 }, ageGroups: { under18: 0, a18_40: 55, a41_60: 30, above60: 10 }, incidents: 1, firs: 0, status: "Active", },
    { id: 4, name: "City Waste Management", totalWorkers: 150, manualScavenging: 10, ragpickers: 25, hazardous: 30, ordinary: 85, caste: { sc: 50, st: 15, obc: 60, general: 25 }, religion: { hindu: 110, muslim: 25, other: 15 }, gender: { male: 100, female: 50 }, ageGroups: { under18: 3, a18_40: 90, a41_60: 45, above60: 12 }, incidents: 6, firs: 3, status: "Suspended", },
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
export default function ContractorsReportsPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Holds the selected status value
  const [contractorsData, setContractorsData] = useState<Contractor[]>(initialContractors);
  const [loading, setLoading] = useState(true);

   // Effect for potential data fetching in the future
   // useEffect(() => {
   //   // Fetch data from API and setContractorsData
   // }, []);

  const handleStatusChange = (value: string) => {
    // The value from SelectItem is directly the status string or "" for "All"
    setStatusFilter(value === "all" ? "" : value);
  };

   const resetFilters = () => {
        setFilter("");
        setStatusFilter("");
   };

   // --- Filtering Logic ---
   const filteredContractors = contractorsData.filter(
     (c) =>
       c.name.toLowerCase().includes(filter.toLowerCase()) &&
       (statusFilter ? c.status === statusFilter : true)
   );

  // --- Placeholder Handlers ---
  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    // In a real app, you would re-fetch data here
    setContractorsData(initialContractors); // Resetting to mock data for demo
    resetFilters();
  };
  const handleAddContractor = () => alert("Add Contractor functionality to be implemented.");
  const handleViewGrievances = () => alert("View Grievances functionality to be implemented.");
  const handleGenerateSummary = () => alert("Generate Summary functionality to be implemented.");


  // --- Status Badge Styling ---
  const getStatusBadgeVariant = (status: Contractor['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Active": return "default"; // Default often maps to green/blue in themes
      case "Under Review": return "secondary"; // Often gray/yellow
      case "Suspended": return "destructive"; // Often red
      default: return "outline";
    }
  };
   const getStatusBadgeClass = (status: Contractor['status']): string => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Under Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Suspended": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };


  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen text-slate-900 dark:text-slate-50">
      {/* District-style banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contractor Reports Dashboard</h1>
            <p className="text-sm opacity-90 mt-1">Overview and contractor-level statistics</p>
          </div>
        </div>
        <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
      </div>
      {/* Header actions (title is in the banner above) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
        <div className="mb-3 sm:mb-0" />
        <div className="flex flex-row items-center gap-3">{/* Keep Export & Refresh side-by-side even on mobile */}
          <Button variant="outline" onClick={handleExport} className="shadow-sm hover:shadow transition-shadow duration-200">
            <FileDown className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button variant="secondary" onClick={handleRefresh} className="shadow-sm hover:shadow transition-shadow duration-200">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin-slow" /> Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600"/> Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input
               placeholder="Search by Contractor Name..."
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="w-full sm:w-64 pl-9 focus:ring-2 focus:ring-indigo-300" // Added focus ring
             />
          </div>
          <Select value={statusFilter} onValueChange={handleStatusChange}> {/* Controlled component */}
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:ring-2 focus:ring-indigo-300">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset
          </Button>
        </CardContent>
      </Card>

      {/* Contractors Table */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b p-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-700"/> Total Contractors Onboard Report
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0"> {/* Remove padding for full-width table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px]"> {/* Min width for horizontal scroll */}
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-600">Contractor Name</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Workers</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Manual Scav.</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Ragpickers</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Hazardous</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Ordinary</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Incidents</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">FIRs</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.map((c, i) => (
                  <TableRow key={c.id} className="hover:bg-indigo-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-gray-800">{c.name}</TableCell>
                    <TableCell className="text-center">{c.totalWorkers}</TableCell>
                    <TableCell className={`text-center font-medium ${c.manualScavenging > 0 ? 'text-red-600' : ''}`}>{c.manualScavenging}</TableCell>
                    <TableCell className="text-center">{c.ragpickers}</TableCell>
                    <TableCell className={`text-center font-medium ${c.hazardous > 0 ? 'text-orange-600' : ''}`}>{c.hazardous}</TableCell>
                    <TableCell className="text-center">{c.ordinary}</TableCell>
                    <TableCell className={`text-center font-medium ${c.incidents > 0 ? 'text-red-600' : ''}`}>{c.incidents}</TableCell>
                    <TableCell className={`text-center font-medium ${c.firs > 0 ? 'text-red-700' : ''}`}>{c.firs}</TableCell>
                    <TableCell>
                       <Badge variant={getStatusBadgeVariant(c.status)} className={`text-xs ${getStatusBadgeClass(c.status)}`}>
                         {c.status}
                       </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                 {filteredContractors.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={10} className="text-center text-gray-500 py-10">
                            No contractors found matching your criteria.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="w-5 h-5 text-blue-600"/>
            <CardTitle className="text-base font-semibold text-gray-700">Worker Distribution (Aggregated)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder - In a real app, calculate and display aggregated stats */}
            <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600">
              <li>Caste Breakdown: SC, ST, OBC, General</li>
              <li>Religion Breakdown: Hindu, Muslim, Other</li>
              <li>Gender Ratio: Male vs Female</li>
              <li>Age Groups: &lt;18, 18–40, 41–60, &gt;60</li>
            </ul>
             <p className="text-xs text-gray-400 mt-3">*Aggregated data from filtered contractors shown above.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
             <ListChecks className="w-5 h-5 text-green-600"/>
             <CardTitle className="text-base font-semibold text-gray-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleAddContractor}>Add Contractor</Button>
            <Button variant="outline" size="sm" onClick={handleViewGrievances}>View Grievances</Button>
            <Button variant="outline" size="sm" onClick={handleGenerateSummary}>Generate Summary</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-2">
             <FileWarning className="w-5 h-5 text-red-600"/>
             <CardTitle className="text-base font-semibold text-gray-700">Exception Reports Links</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder - Link to other report pages */}
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Unresolved Grievances by Contractor</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Contractors with Pending Training</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Contractors Linked to Pending Compensation</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}