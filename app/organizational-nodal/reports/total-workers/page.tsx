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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,             // Header Icon
  FileDown,
  RefreshCw,
  Search,
  Filter,
  XCircle,           // Reset Icon
  BarChart,
  AlertTriangle,     // Manual Scavenging
  Trash2,            // Ragpickers
  ShieldAlert,       // Hazardous
  UserCheck,         // Ordinary SKs
  List,               // List Icon
  Eye,               // View Icon
  User,              // User Profile Icon
  Building,          // Contractor Icon
  Calendar,          // Duration Icon
  MapPin,            // Location Icon
  Phone,             // Contact Icon
  Mail,              // Email Icon
} from "lucide-react";

import { cn } from "@/lib/utils"; // Assuming you have cn utility
import StatCard from "@/components/ui/stat-card";

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
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  const handleViewReport = () => alert("Viewing detailed worker report...");
  const handleViewWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsDialogOpen(true);
  };
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen w-full">
      {/* Header */}
      <div className="w-full rounded-2xl p-6 mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg flex flex-col items-start">
        <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Total Workers Report
        </h1>
        <p className="mt-2 text-lg text-white/90 font-medium">
          Monitor deployments, manage compliance, and track worker performance for your organization.
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            Search & Filters
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

      {/* Export/Reload Section (moved below Filters) */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="default" onClick={handleExport} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          Export CSV
        </Button>
        <Button variant="default" onClick={handleExport} className="bg-pink-600 hover:bg-pink-700 text-white shadow-sm">
          Export PDF
        </Button>
        <Button variant="default" onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          Reload
        </Button>
      </div>

      {/* Summary Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Workers"
          value={filteredWorkers.length}
          subtitle="Active workforce"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Manual Scavenging"
          value={filteredWorkers.filter(w => w.category === 'Manual Scavenging').length}
          subtitle="High risk workers"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Hazardous Work"
          value={filteredWorkers.filter(w => w.category === 'Hazardous').length}
          subtitle="Safety critical"
          icon={ShieldAlert}
          color="orange"
        />
        <StatCard
          title="On Leave"
          value={filteredWorkers.filter(w => w.status === 'On-Leave').length}
          subtitle="Temporary absence"
          icon={Calendar}
          color="amber"
        />
      </div>

      {/* Table Section */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 border-b p-4">
           <CardTitle className="text-lg font-semibold text-gray-800">
            Total Workers Report
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader className="bg-gradient-to-r from-indigo-100 via-blue-50 to-teal-50">
                <TableRow>
                  <TableHead className="w-[50px] font-semibold text-gray-800">Sl.</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-800">Worker Name</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-800">Contractor</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-800">Category</TableHead>
                  <TableHead className="font-semibold text-gray-800">Caste</TableHead>
                  <TableHead className="font-semibold text-gray-800">Religion</TableHead>
                  <TableHead className="font-semibold text-gray-800">Gender</TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">Age</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-800">Assigned Location</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-800">Work Duration</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-gray-800">Status</TableHead>
                  <TableHead className="w-[80px] font-semibold text-gray-800 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((w, i) => (
                  <TableRow key={w.id} className="hover:bg-teal-50/50 transition-colors duration-150 even:bg-slate-50/70 odd:bg-white">
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
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewWorker(w)}
                        className="h-8 w-8 p-0 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200"
                        title={`View details for ${w.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredWorkers.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={12} className="text-center text-gray-500 py-10">
                            No workers found matching your criteria. Please adjust filters.
                        </TableCell>
                    </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Worker Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-teal-700">
              Worker Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete information about the selected worker
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && (
            <div className="space-y-6">
              {/* Personal Information */}
              <Card className="border-teal-200">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-teal-700">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="font-semibold text-gray-800">{selectedWorker.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Worker ID</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="font-semibold text-gray-800">SK-{selectedWorker.id.toString().padStart(4, '0')}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Gender</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-800">{selectedWorker.gender}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Age</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-800">{selectedWorker.age} years</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Caste Category</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {selectedWorker.caste}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Religion</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-800">{selectedWorker.religion}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Information */}
              <Card className="border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
                    Work Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Contractor</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="font-semibold text-gray-800">{selectedWorker.contractor}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Work Category</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {getCategoryBadge(selectedWorker.category)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Assigned Location</label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-800">{selectedWorker.assignedLocation}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Work Duration</label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-800">{selectedWorker.workDuration}</span>
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">Current Status</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {getStatusBadge(selectedWorker.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-800">+91 98765 43210</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-800">{selectedWorker.name.toLowerCase().replace(' ', '.')}@contractor.com</span>
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <span className="text-gray-800">123 Worker Colony, Delhi - 110001</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                  Edit Worker
                </Button>
                <Button variant="outline" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}