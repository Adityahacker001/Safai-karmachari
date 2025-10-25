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
  Users,             // Header Icon
  FileDown,
  RefreshCw,
  Search,
  Filter,
  XCircle,           // Reset Icon
  PieChart as PieChartIcon,
  BarChart,
  AlertTriangle,     // Manual Scavenging
  Trash2,            // Ragpickers
  ShieldAlert,       // Hazardous
  UserCheck,         // Ordinary SKs
  List,               // List Icon
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
type WorkerCategory = "Manual Scavenging" | "Ragpicker" | "Hazardous" | "Ordinary SK";
type WorkerStatus = "Active" | "Inactive" | "On-Leave";

interface Worker {
  id: number;
  name: string;
  contractor: string;
  category: WorkerCategory;
  caste: "SC" | "ST" | "OBC" | "General";
  religion: "Hindu" | "Muslim" | "Other";
  gender: "Male" | "Female";
  age: number;
  assignedLocation: string;
  workDuration: string; // e.g., "1.5 Years"
  status: WorkerStatus;
}

// --- Initial Mock Data ---
const initialWorkersData: Worker[] = [
    { id: 1, name: "Rakesh Kumar", contractor: "CleanForce Pvt Ltd", category: "Ordinary SK", caste: "SC", religion: "Hindu", gender: "Male", age: 35, assignedLocation: "Terminal 1 Entry", workDuration: "2 Years", status: "Active" },
    { id: 2, name: "Sita Sharma", contractor: "CleanForce Pvt Ltd", category: "Ordinary SK", caste: "General", religion: "Hindu", gender: "Female", age: 28, assignedLocation: "Washroom Block A", workDuration: "1 Year", status: "Active" },
    { id: 3, name: "Amit Singh", contractor: "UrbanClean Services", category: "Hazardous", caste: "OBC", religion: "Hindu", gender: "Male", age: 42, assignedLocation: "Waste Disposal Area", workDuration: "3 Years", status: "Active" },
    { id: 4, name: "Vikas Mehra", contractor: "CleanForce Pvt Ltd", category: "Manual Scavenging", caste: "SC", religion: "Hindu", gender: "Male", age: 39, assignedLocation: "Sewer Line 2", workDuration: "5 Years", status: "Active" },
    { id: 5, name: "Pooja Devi", contractor: "EcoSan Solutions", category: "Ragpicker", caste: "ST", religion: "Other", gender: "Female", age: 24, assignedLocation: "Recycling Plant", workDuration: "6 Months", status: "On-Leave" },
    { id: 6, name: "Mohammad Irfan", contractor: "UrbanClean Services", category: "Hazardous", caste: "General", religion: "Muslim", gender: "Male", age: 45, assignedLocation: "Medical Waste", workDuration: "2.5 Years", status: "Active" },
];

// --- Pie Chart Colors ---
const PIE_COLORS = {
  "Manual Scavenging": "#ef4444", // red-500
  "Ragpicker": "#eab308",         // yellow-500
  "Hazardous": "#f97316",         // orange-500
  "Ordinary SK": "#22c55e",       // green-500
};

// --- Main Page Component ---
export default function TotalWorkersReportPage() {
  // --- State ---
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [casteFilter, setCasteFilter] = useState("");
  const [religionFilter, setReligionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [workersData, setWorkersData] = useState<Worker[]>(initialWorkersData);

  // --- Handlers ---
  const handleFilterChange = (filterSetter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    filterSetter(value === "all" ? "" : value);
  };
  
  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setCasteFilter("");
    setReligionFilter("");
    setGenderFilter("");
    setAgeFilter("");
    setStatusFilter("");
  };

  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setWorkersData(initialWorkersData);
    resetFilters();
  };

  // --- Dynamic Filtering ---
  const filteredWorkers = useMemo(() => workersData.filter((w) =>
    (w.name.toLowerCase().includes(search.toLowerCase()) || w.contractor.toLowerCase().includes(search.toLowerCase())) &&
    (categoryFilter ? w.category === categoryFilter : true) &&
    (casteFilter ? w.caste === casteFilter : true) &&
    (religionFilter ? w.religion === religionFilter : true) &&
    (genderFilter ? w.gender === genderFilter : true) &&
    (statusFilter ? w.status === statusFilter : true) &&
    (ageFilter ? (
        ageFilter === "<18" ? w.age < 18 :
        ageFilter === "18-40" ? w.age >= 18 && w.age <= 40 :
        ageFilter === "41-60" ? w.age >= 41 && w.age <= 60 :
        w.age > 60
    ) : true)
  ), [search, categoryFilter, casteFilter, religionFilter, genderFilter, ageFilter, statusFilter, workersData]);

  // --- Dynamic Pie Chart Data ---
  const pieData = useMemo(() => {
    const counts = filteredWorkers.reduce((acc, worker) => {
        acc[worker.category] = (acc[worker.category] || 0) + 1;
        return acc;
    }, {} as Record<WorkerCategory, number>);
    
    return Object.entries(counts).map(([name, value]) => ({ name: name as WorkerCategory, value }));
  }, [filteredWorkers]);

  // --- Badge Styling ---
  const getCategoryBadge = (category: WorkerCategory) => {
    switch (category) {
      case "Manual Scavenging": return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200"><AlertTriangle className="h-3 w-3 mr-1"/>{category}</Badge>;
      case "Hazardous": return <Badge variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200"><ShieldAlert className="h-3 w-3 mr-1"/>{category}</Badge>;
      case "Ragpicker": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><Trash2 className="h-3 w-3 mr-1"/>{category}</Badge>;
      case "Ordinary SK": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200"><UserCheck className="h-3 w-3 mr-1"/>{category}</Badge>;
      default: return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: WorkerStatus) => {
    switch (status) {
      case "Active": return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "On-Leave": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">On-Leave</Badge>;
      case "Inactive": return <Badge variant="outline">Inactive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          👥 Total Workers Report
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
          {/* Search */}
          <div className="relative flex-grow sm:flex-grow-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input
               placeholder="Search by Worker or Contractor..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-56 pl-9 focus:ring-2 focus:ring-teal-300"
             />
          </div>
          {/* Filters */}
          <Select value={categoryFilter} onValueChange={handleFilterChange(setCategoryFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Category" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Categories</SelectItem><SelectItem value="Manual Scavenging">Manual Scavenging</SelectItem><SelectItem value="Ragpicker">Ragpicker</SelectItem><SelectItem value="Hazardous">Hazardous</SelectItem><SelectItem value="Ordinary SK">Ordinary SK</SelectItem></SelectContent>
          </Select>
          <Select value={casteFilter} onValueChange={handleFilterChange(setCasteFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Caste" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Castes</SelectItem><SelectItem value="SC">SC</SelectItem><SelectItem value="ST">ST</SelectItem><SelectItem value="OBC">OBC</SelectItem><SelectItem value="General">General</SelectItem></SelectContent>
          </Select>
          <Select value={religionFilter} onValueChange={handleFilterChange(setReligionFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Religion" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Religions</SelectItem><SelectItem value="Hindu">Hindu</SelectItem><SelectItem value="Muslim">Muslim</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
          </Select>
          <Select value={genderFilter} onValueChange={handleFilterChange(setGenderFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Gender" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Genders</SelectItem><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
          </Select>
          <Select value={ageFilter} onValueChange={handleFilterChange(setAgeFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Age Group" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Ages</SelectItem><SelectItem value="<18">&lt;18</SelectItem><SelectItem value="18-40">18-40</SelectItem><SelectItem value="41-60">41-60</SelectItem><SelectItem value=">60">&gt;60</SelectItem></SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-teal-300"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem><SelectItem value="On-Leave">On-Leave</SelectItem></SelectContent>
          </Select>
          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset
          </Button>
        </CardContent>
      </Card>

      {/* Visuals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border border-gray-100 rounded-lg bg-white lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70">
            <CardTitle className="text-base font-semibold text-gray-700">Worker Distribution (Filtered)</CardTitle>
            <PieChartIcon className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent className="pt-6">
             {filteredWorkers.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((entry) => (<Cell key={entry.name} fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]} />))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
             ) : (
                <div className="h-[250px] flex items-center justify-center text-gray-500">No data for chart.</div>
             )}
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border border-gray-100 rounded-lg bg-white lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70">
                <CardTitle className="text-base font-semibold text-gray-700">Filtered Summary</CardTitle>
                <BarChart className="w-4 h-4 text-indigo-500" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <SummaryStat label="Total Workers" value={filteredWorkers.length} />
                <SummaryStat label="Manual Scavenging" value={filteredWorkers.filter(w => w.category === 'Manual Scavenging').length} className="text-red-600" />
                <SummaryStat label="Hazardous" value={filteredWorkers.filter(w => w.category === 'Hazardous').length} className="text-orange-600" />
                <SummaryStat label="On-Leave" value={filteredWorkers.filter(w => w.status === 'On-Leave').length} className="text-yellow-600" />
            </CardContent>
        </Card>
      </div>


      {/* Table Section */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <List className="w-5 h-5 text-teal-700"/> Total Workers Report
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-600">Sl.</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Worker Name</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Contractor</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Category</TableHead>
                  <TableHead className="font-semibold text-gray-600">Caste</TableHead>
                  <TableHead className="font-semibold text-gray-600">Religion</TableHead>
                  <TableHead className="font-semibold text-gray-600">Gender</TableHead>
                  <TableHead className="text-center font-semibold text-gray-600">Age</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-600">Assigned Location</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Work Duration</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((w, i) => (
                  <TableRow key={w.id} className="hover:bg-teal-50/50 transition-colors duration-150 even:bg-slate-50/70">
                    <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                    <TableCell className="font-semibold text-blue-700 cursor-pointer hover:underline">{w.name}</TableCell>
                    <TableCell className="text-gray-700">{w.contractor}</TableCell>
                    <TableCell>{getCategoryBadge(w.category)}</TableCell>
                    <TableCell className="text-gray-700">{w.caste}</TableCell>
                    <TableCell className="text-gray-700">{w.religion}</TableCell>
                    <TableCell className="text-gray-700">{w.gender}</TableCell>
                    <TableCell className="text-center text-gray-700">{w.age}</TableCell>
                    <TableCell className="text-xs text-gray-600">{w.assignedLocation}</TableCell>
                    <TableCell className="text-gray-700">{w.workDuration}</TableCell>
                    <TableCell>{getStatusBadge(w.status)}</TableCell>
                  </TableRow>
                ))}
                {filteredWorkers.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={11} className="text-center text-gray-500 py-10">
                            No workers found matching your criteria. Please adjust filters.
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

// Helper component for summary stats
function SummaryStat({ label, value, className = "" }: { label: string, value: string | number, className?: string }) {
    return (
        <div className={cn("p-4 bg-gray-50 rounded-lg text-center shadow-inner", className)}>
            <div className="text-xs uppercase text-gray-500 font-medium">{label}</div>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
        </div>
    );
}