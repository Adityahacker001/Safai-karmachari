"use client";

import React, { useState, useMemo } from "react";
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
} from "@/components/ui/table"; // Shadcn Table
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
  GraduationCap, // Header Icon
  FileDown,
  RefreshCw,
  Search,
  Filter,
  XCircle,           // Reset Icon
  Users,             // Worker Category
  Building,          // Contractor
  List,              // Table Icon
  CheckCircle,       // Completed
  Clock,             // Pending
} from "lucide-react";

import { motion } from "framer-motion"; // For animations
import { cn } from "@/lib/utils"; // Assuming you have cn utility
import StatCard from "@/components/ui/stat-card";

// --- Interfaces ---
type TrainingStatus = "Completed" | "Pending";
type WorkerCategory = "Hazardous" | "Ordinary SK" | "Ragpicker" | "Manual Scavenging";

interface TrainingRecord {
  id: number;
  workerName: string;
  contractor: string;
  workerCategory: WorkerCategory;
  trainingModule: string;
  completionDate: string | null; // Null if pending
  trainerName: string;
  status: TrainingStatus;
}

// --- Initial Mock Data ---
const initialTrainingData: TrainingRecord[] = [
    { id: 1, workerName: "Rakesh Kumar", contractor: "CleanForce Pvt Ltd", workerCategory: "Hazardous", trainingModule: "Sewer Safety", completionDate: "2025-10-15", trainerName: "A. Gupta", status: "Completed" },
    { id: 2, workerName: "Sita Sharma", contractor: "UrbanClean Services", workerCategory: "Ragpicker", trainingModule: "PPE Usage", completionDate: "2025-10-12", trainerName: "R. Sharma", status: "Completed" },
    { id: 3, workerName: "Amit Singh", contractor: "CleanForce Pvt Ltd", workerCategory: "Hazardous", trainingModule: "Sewer Safety", completionDate: null, trainerName: "A. Gupta", status: "Pending" },
    { id: 4, workerName: "Vikas Mehra", contractor: "CleanForce Pvt Ltd", workerCategory: "Manual Scavenging", trainingModule: "Sewer Safety", completionDate: "2025-10-15", trainerName: "A. Gupta", status: "Completed" },
    { id: 5, workerName: "Pooja Devi", contractor: "EcoSan Solutions", workerCategory: "Ragpicker", trainingModule: "PPE Usage", completionDate: null, trainerName: "R. Sharma", status: "Pending" },
    { id: 6, workerName: "Mohammad Irfan", contractor: "UrbanClean Services", workerCategory: "Hazardous", trainingModule: "First-Aid Basics", completionDate: "2025-10-01", trainerName: "Dr. B. Das", status: "Completed" },
];



// --- Main Page Component ---
export default function TrainingReportPage() {
  // --- State ---
  const [search, setSearch] = useState("");
  const [contractorFilter, setContractorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [trainingData, setTrainingData] = useState<TrainingRecord[]>(initialTrainingData);

  // --- Handlers ---
  const handleFilterChange = (filterSetter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    filterSetter(value === "all" ? "" : value);
  };
  
  const resetFilters = () => {
    setSearch("");
    setContractorFilter("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setTrainingData(initialTrainingData);
    resetFilters();
  };

  // --- Dynamic Filtering ---
  const filteredData = useMemo(() => trainingData.filter((record) =>
    (record.workerName.toLowerCase().includes(search.toLowerCase()) || record.trainerName.toLowerCase().includes(search.toLowerCase())) &&
    (contractorFilter ? record.contractor === contractorFilter : true) &&
    (categoryFilter ? record.workerCategory === categoryFilter : true) &&
    (statusFilter ? record.status === statusFilter : true)
  ), [search, contractorFilter, categoryFilter, statusFilter, trainingData]);


  
  // --- Dynamic Summary Stats ---
  const totalTrained = useMemo(() => filteredData.filter(r => r.status === 'Completed').length, [filteredData]);
  const totalPending = useMemo(() => filteredData.filter(r => r.status === 'Pending').length, [filteredData]);


  // --- Badge Styling ---
  const getStatusBadge = (status: TrainingStatus) => {
    switch (status) {
      case "Completed": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1"/>Completed</Badge>;
      case "Pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1"/>Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🎓 Training Completion Report
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
               placeholder="Search Worker or Trainer..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-56 pl-9 focus:ring-2 focus:ring-cyan-300"
             />
          </div>
          <Select value={contractorFilter} onValueChange={handleFilterChange(setContractorFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-cyan-300"><SelectValue placeholder="Filter by Contractor" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Contractors</SelectItem>
                <SelectItem value="CleanForce Pvt Ltd">CleanForce Pvt Ltd</SelectItem>
                <SelectItem value="UrbanClean Services">UrbanClean Services</SelectItem>
                <SelectItem value="EcoSan Solutions">EcoSan Solutions</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={handleFilterChange(setCategoryFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-cyan-300"><SelectValue placeholder="Filter by Worker Category" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Manual Scavenging">Manual Scavenging</SelectItem>
                <SelectItem value="Ragpicker">Ragpicker</SelectItem>
                <SelectItem value="Hazardous">Hazardous</SelectItem>
                <SelectItem value="Ordinary SK">Ordinary SK</SelectItem>
            </SelectContent>
          </Select>
           <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-cyan-300"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset
          </Button>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <StatCard
          title="Workers Trained"
          value={totalTrained}
          subtitle="Completed training"
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Training Pending"
          value={totalPending}
          subtitle="Awaiting completion"
          icon={Clock}
          color="amber"
        />
      </div>


      {/* Table Section */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <List className="w-5 h-5 text-cyan-700"/> Training Records Table
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Worker Name</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-600">Training Module</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-600">Completion Date</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Trainer Name</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, i) => (
                  <TableRow key={row.id} className="hover:bg-cyan-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-blue-700 cursor-pointer hover:underline">{row.workerName}</TableCell>
                    <TableCell className="text-gray-700">{row.trainingModule}</TableCell>
                    <TableCell className="text-gray-700">{row.completionDate || "N/A"}</TableCell>
                    <TableCell className="text-gray-700">{row.trainerName}</TableCell>
                    <TableCell>{getStatusBadge(row.status)}</TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                            No training records found matching your criteria.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}