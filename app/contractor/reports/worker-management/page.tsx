"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  Download,
  Eye,
  GraduationCap,
  Shield,
  MessageSquare,
  Star,
  Search,
  Save,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/ui/stat-card";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
import React, { useState, useEffect } from "react"; // Import React for useMemo

export default function WorkerManagementReportPage() {
  // Loader state
  const [loading, setLoading] = useState(true);
  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search input

  // Expanded mock data for the worker roster
  const workers = [
    {
      id: "W-C123-001",
      name: "Biplob Haldar",
      zone: "Zone 1",
      status: "Active",
      performance: "Top Performer",
      phone: "+91 9876543210",
      gender: "Male",
      dob: "1985-06-15",
      address: "123 Main St, Zone 1",
      aadhaar: "1234-5678-9012",
      pan: "ABCDE1234F",
      voterId: "WB1234567",
      rationCard: "RC123456",
      maritalStatus: "Married",
      dependents: 3,
      nomineeName: "Sita Devi",
      nomineeRelation: "Spouse",
      bloodGroup: "O+",
      casteCategory: "SC",
      identificationMark: "Mole on right hand",
      profilePhoto: "/placeholder-user.jpg",
      emergencyContact: {
        name: "Abishek Kumar",
        relation: "Brother",
        phone: "+91 9123456789",
      },
      employment: {
        dateOfJoining: "2020-01-10",
        employmentType: "Full-time",
        primaryRole: "Sewer Cleaner",
        monthlySalary: 15000,
        bankAccount: "1234567890",
        bankIfsc: "SBIN0001234",
        esiNumber: "ESI123456",
        pfUanNumber: "UAN123456",
      },
      details: {
        compliance: [
          {
            date: "2025-08-27",
            status: "Compliant",
            details: "Full PPE worn.",
          },
          {
            date: "2025-08-26",
            status: "Non-Compliant",
            details: "Boots missing.",
          },
        ],
        training: [
          {
            module: "Advanced Sewer Safety",
            status: "Completed",
            date: "2025-07-15",
          },
          { module: "Confined Space Entry", status: "Pending", date: "-" },
        ],
        grievances: [
          {
            grievance: "Delayed salary payment",
            date: "2025-08-05",
            status: "Resolved",
          },
        ],
      },
    },
    {
      id: "W-C123-004",
      name: "Priya Sharma",
      zone: "Zone 2",
      status: "Active",
      performance: "Top Performer",
      details: {
        compliance: [
          {
            date: "2025-08-28",
            status: "Compliant",
            details: "All PPE present.",
          },
        ],
        training: [
          {
            module: "First Aid Basics",
            status: "Completed",
            date: "2025-06-20",
          },
        ],
        grievances: [],
      },
    },
    {
      id: "W-C123-002",
      name: "Sita Devi",
      zone: "Zone 1",
      status: "Active",
      performance: "Consistent",
      details: {
        compliance: [
          {
            date: "2025-08-27",
            status: "Compliant",
            details: "Full PPE worn.",
          },
        ],
        training: [
          {
            module: "Equipment Handling",
            status: "Completed",
            date: "2025-07-01",
          },
        ],
        grievances: [],
      },
    },
    {
      id: "W-C123-003",
      name: "Mohan Singh",
      zone: "Zone 1",
      status: "On Leave",
      performance: "Consistent",
      details: {
        compliance: [],
        training: [
          { module: "Advanced Sewer Safety", status: "Pending", date: "-" },
        ],
        grievances: [],
      },
    },
    {
      id: "W-C123-005",
      name: "Ravi Kumar",
      zone: "Zone 2",
      status: "Active",
      performance: "Needs Review",
      details: {
        compliance: [
          {
            date: "2025-08-25",
            status: "Non-Compliant",
            details: "Helmet missing.",
          },
        ],
        training: [
          { module: "Waste Segregation", status: "Pending", date: "-" },
        ],
        grievances: [
          {
            grievance: "Unsafe equipment",
            date: "2025-08-01",
            status: "In Progress",
          },
        ],
      },
    },
    {
      id: "W-C123-006",
      name: "Sunita Yadav",
      zone: "Zone 2",
      status: "Inactive",
      performance: "Consistent",
      details: { compliance: [], training: [], grievances: [] },
    },
    {
      id: "W-C123-007",
      name: "Amit Patel",
      zone: "Zone 1",
      status: "Active",
      performance: "Needs Review",
      details: {
        compliance: [
          {
            date: "2025-08-24",
            status: "Non-Compliant",
            details: "Gloves not worn.",
          },
        ],
        training: [
          { module: "First Aid Basics", status: "Pending", date: "-" },
        ],
        grievances: [],
      },
    },
  ];

  const [selectedWorker, setSelectedWorker] = useState<any | null>(null);

  // Loader effect (simulate loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900); // Loader shows for 900ms
    return () => clearTimeout(timer);
  }, []);

  // Filter workers based on search query and dropdown selections
  const filteredWorkers = React.useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return workers.filter((worker) => {
      const matchesSearch =
        searchQuery === "" ||
        worker.name.toLowerCase().includes(lowerCaseQuery) ||
        worker.id.toLowerCase().includes(lowerCaseQuery);
      const matchesStatus =
        statusFilter === "all" || worker.status === statusFilter;
      const matchesZone = zoneFilter === "all" || worker.zone === zoneFilter;

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [searchQuery, statusFilter, zoneFilter, workers]);


  // Helper function to return gradient classes for badges
  const getBadgeClass = (type: string, value: string) => {
    const baseClasses = "text-white border-transparent";
    switch (type) {
      case "status":
        if (value === "Active")
          return `bg-gradient-to-r from-green-500 to-emerald-600 ${baseClasses}`;
        if (value === "On Leave")
          return `bg-gradient-to-r from-slate-400 to-slate-500 ${baseClasses}`;
        if (value === "Inactive")
          return `bg-gradient-to-r from-gray-500 to-gray-600 ${baseClasses}`;
        return "bg-gray-100 text-gray-800";
      case "performance":
        if (value === "Top Performer")
          return `bg-gradient-to-r from-blue-500 to-indigo-600 ${baseClasses}`;
        if (value === "Consistent")
          return `bg-gradient-to-r from-slate-400 to-slate-500 ${baseClasses}`;
        if (value === "Needs Review")
          return `bg-gradient-to-r from-amber-500 to-orange-600 ${baseClasses}`;
        return "bg-gray-100 text-gray-800";
      // Keeping other badge types with non-gradient, clean styles for the dialog
      case "compliance":
        if (value === "Compliant") return "bg-green-100 text-green-800";
        if (value === "Non-Compliant") return "bg-amber-100 text-amber-800";
        return "bg-gray-100 text-gray-800";
      case "training":
        if (value === "Completed") return "bg-green-100 text-green-800";
        if (value === "Pending") return "bg-slate-100 text-slate-800";
        return "bg-gray-100 text-gray-800";
      case "grievance":
        if (value === "Resolved") return "bg-green-100 text-green-800";
        if (value === "In Progress") return "bg-slate-100 text-slate-800";
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                Worker Management Report
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                A complete roster and performance overview of your workforce
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
              >
                <Download className="h-5 w-5 mr-2" />
                Export Roster (CSV)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Workforce Summary KPIs with StatCard components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Workers"
          value={workers.length}
          subtitle="Registered workers"
          icon={Users}
          color="blue"
        />
        
        <StatCard
          title="Active Today"
          value={workers.filter((w) => w.status === "Active").length}
          subtitle="Currently active"
          icon={UserCheck}
          color="green"
        />
        
        <StatCard
          title="Grievances Pending"
          value={23}
          subtitle="Pending grievances"
          icon={MessageSquare}
          color="orange"
        />
        
        <StatCard
          title="Safety Compliance"
          value="94.2%"
          subtitle="This week"
          icon={Shield}
          color="purple"
        />
      </div>

      <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Master Worker Roster
          </CardTitle>
          <CardDescription className="text-slate-300 mt-2 text-lg">
            Browse and manage all registered workers.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2.5 max-w-full sm:max-w-xs bg-white/10 text-white placeholder:text-white border-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 rounded-xl"
              />
            </div>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 text-white border-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 rounded-xl px-4 py-2.5 placeholder:text-white">
                <SelectValue placeholder="All Zones" className="placeholder:text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="Zone 1">Zone 1</SelectItem>
                <SelectItem value="Zone 2">Zone 2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 text-white border-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 rounded-xl px-4 py-2.5 placeholder:text-white">
                <SelectValue placeholder="All Statuses" className="placeholder:text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="w-full">
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                  Worker
                </TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                  Worker ID
                </TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                  Assigned Zone
                </TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                  Employment Status
                </TableHead>
                <TableHead className="text-right py-4 px-6 text-slate-600 font-bold text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow
                  key={worker.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell className="py-4 px-6">
                    <div className="font-semibold text-gray-800 text-base">
                      {worker.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 text-base">
                    {worker.id}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 text-base">
                    {worker.zone}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      className={`${getBadgeClass("status", worker.status)} px-3 py-1 text-sm font-semibold rounded-full`}
                    >
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 px-6">
                    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedWorker(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all duration-200"
                          onClick={() => setSelectedWorker(worker)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      {selectedWorker && selectedWorker.id === worker.id && (
                        <DialogContent className="max-w-5xl p-0 shadow-2xl rounded-3xl overflow-y-auto bg-gradient-to-br from-indigo-100 via-blue-100 to-emerald-100 max-h-[90vh] [&>button]:bg-white [&>button]:text-gray-800 [&>button]:rounded-full [&>button]:h-8 [&>button]:w-8 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button:hover]:bg-gray-200">
                          <DialogHeader className="p-8 bg-gradient-to-r from-indigo-600 to-violet-700 text-white w-full">
                            <div className="flex items-start space-x-6">
                              <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                                <AvatarImage
                                  src={
                                    selectedWorker.profilePhoto ||
                                    "/placeholder-user.jpg"
                                  }
                                  alt={selectedWorker.name}
                                />
                                <AvatarFallback className="bg-violet-200 text-violet-800 text-3xl font-bold">
                                  {selectedWorker.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 pt-2">
                                <DialogTitle className="text-4xl font-bold">
                                  {selectedWorker.name}
                                </DialogTitle>
                                <DialogDescription className="text-indigo-100 text-lg">
                                  ID: {selectedWorker.id} | Zone:{" "}
                                  {selectedWorker.zone} | Status:{" "}
                                  {selectedWorker.status}
                                </DialogDescription>
                                <div className="pt-3">
                                  <Badge className={`${getBadgeClass('performance', selectedWorker.performance)} px-4 py-1.5 text-base font-semibold rounded-full`}>
                                    Performance: {selectedWorker.performance}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </DialogHeader>
                          <div className="p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 min-h-[400px] space-y-8">
                            {/* Personal & Identity Information */}
                            <Card className="mb-4">
                              <CardHeader>
                                <CardTitle>
                                  Personal & Identity Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <Label>Full Name</Label>
                                  <div>{selectedWorker.name}</div>
                                </div>
                                <div>
                                  <Label>Gender</Label>
                                  <div>{selectedWorker.gender}</div>
                                </div>
                                <div>
                                  <Label>Date of Birth</Label>
                                  <div>{selectedWorker.dob}</div>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <div>{selectedWorker.phone}</div>
                                </div>
                                <div>
                                  <Label>Address</Label>
                                  <div>{selectedWorker.address}</div>
                                </div>
                                <div>
                                  <Label>Aadhaar</Label>
                                  <div>{selectedWorker.aadhaar}</div>
                                </div>
                                <div>
                                  <Label>PAN</Label>
                                  <div>{selectedWorker.pan}</div>
                                </div>
                                <div>
                                  <Label>Voter ID</Label>
                                  <div>{selectedWorker.voterId}</div>
                                </div>
                                <div>
                                  <Label>Ration Card</Label>
                                  <div>{selectedWorker.rationCard}</div>
                                </div>
                                <div>
                                  <Label>Marital Status</Label>
                                  <div>{selectedWorker.maritalStatus}</div>
                                </div>
                                <div>
                                  <Label>Dependents</Label>
                                  <div>{selectedWorker.dependents}</div>
                                </div>
                                <div>
                                  <Label>Nominee Name</Label>
                                  <div>{selectedWorker.nomineeName}</div>
                                </div>
                                <div>
                                  <Label>Nominee Relation</Label>
                                  <div>{selectedWorker.nomineeRelation}</div>
                                </div>
                                <div>
                                  <Label>Blood Group</Label>
                                  <div>{selectedWorker.bloodGroup}</div>
                                </div>
                                <div>
                                  <Label>Caste Category</Label>
                                  <div>{selectedWorker.casteCategory}</div>
                                </div>
                                <div>
                                  <Label>Identification Mark</Label>
                                  <div>{selectedWorker.identificationMark}</div>
                                </div>
                              </CardContent>
                            </Card>
                            {/* Emergency Contact */}
                            <Card className="mb-4">
                              <CardHeader>
                                <CardTitle>Emergency Contact</CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Label>Name</Label>
                                  <div>{selectedWorker.emergencyContact?.name}</div>
                                </div>
                                <div>
                                  <Label>Relation</Label>
                                  <div>{selectedWorker.emergencyContact?.relation}</div>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <div>{selectedWorker.emergencyContact?.phone}</div>
                                </div>
                              </CardContent>
                            </Card>
                            {/* Employment & Financial Details */}
                            <Card className="mb-4">
                              <CardHeader>
                                <CardTitle>Employment & Financial Details</CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Label>Date of Joining</Label>
                                  <div>{selectedWorker.employment?.dateOfJoining}</div>
                                </div>
                                <div>
                                  <Label>Employment Type</Label>
                                  <div>{selectedWorker.employment?.employmentType}</div>
                                </div>
                                <div>
                                  <Label>Primary Role</Label>
                                  <div>{selectedWorker.employment?.primaryRole}</div>
                                </div>
                                <div>
                                  <Label>Monthly Salary</Label>
                                  <div>{selectedWorker.employment?.monthlySalary}</div>
                                </div>
                                <div>
                                  <Label>Bank Account</Label>
                                  <div>{selectedWorker.employment?.bankAccount}</div>
                                </div>
                                <div>
                                  <Label>Bank IFSC</Label>
                                  <div>{selectedWorker.employment?.bankIfsc}</div>
                                </div>
                                <div>
                                  <Label>ESI Number</Label>
                                  <div>{selectedWorker.employment?.esiNumber}</div>
                                </div>
                                <div>
                                  <Label>PF/UAN Number</Label>
                                  <div>{selectedWorker.employment?.pfUanNumber}</div>
                                </div>
                              </CardContent>
                            </Card>
                            {/* Tabs for Compliance, Training, Grievances (existing) */}
                            <Tabs defaultValue="compliance" className="w-full">
                              <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-slate-200 rounded-xl shadow-inner">
                                <TabsTrigger
                                  value="compliance"
                                  className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out"
                                >
                                  <Shield className="h-5 w-5" />
                                  <span>Compliance History</span>
                                </TabsTrigger>
                                <TabsTrigger
                                  value="training"
                                  className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out"
                                >
                                  <GraduationCap className="h-5 w-5" />
                                  <span>Training Record</span>
                                </TabsTrigger>
                                <TabsTrigger
                                  value="grievances"
                                  className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out"
                                >
                                  <MessageSquare className="h-5 w-5" />
                                  <span>Grievance History</span>
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="compliance" className="mt-6">
                                <Card className="bg-white border-slate-200 shadow-md rounded-xl">
                                  <CardContent className="pt-6">
                                    {selectedWorker.details.compliance.length > 0 ? (
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="border-b border-slate-200">
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Date
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Status
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Details
                                            </TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.compliance.map(
                                            (c: any, idx: number) => (
                                              <TableRow
                                                key={idx}
                                                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150"
                                              >
                                                <TableCell className="py-3 px-4 text-gray-800">
                                                  {c.date}
                                                </TableCell>
                                                <TableCell className="py-3 px-4">
                                                  <Badge
                                                    className={`${getBadgeClass(
                                                      "compliance",
                                                      c.status
                                                    )} px-3 py-1 text-sm font-semibold rounded-full`}
                                                  >
                                                    {c.status}
                                                  </Badge>
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-700">
                                                  {c.details}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">
                                        No compliance history found.
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="training" className="mt-6">
                                <Card className="bg-white border-slate-200 shadow-md rounded-xl">
                                  <CardContent className="pt-6">
                                    {selectedWorker.details.training.length > 0 ? (
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="border-b border-slate-200">
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Module
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Status
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Completion Date
                                            </TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.training.map(
                                            (t: any, idx: number) => (
                                              <TableRow
                                                key={idx}
                                                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150"
                                              >
                                                <TableCell className="py-3 px-4 text-gray-800">
                                                  {t.module}
                                                </TableCell>
                                                <TableCell className="py-3 px-4">
                                                  <Badge
                                                    className={`${getBadgeClass(
                                                      "training",
                                                      t.status
                                                    )} px-3 py-1 text-sm font-semibold rounded-full`}
                                                  >
                                                    {t.status}
                                                  </Badge>
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-700">
                                                  {t.date}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">
                                        No training record found.
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="grievances" className="mt-6">
                                <Card className="bg-white border-slate-200 shadow-md rounded-xl">
                                  <CardContent className="pt-6">
                                    {selectedWorker.details.grievances.length > 0 ? (
                                      <Table>
                                        <TableHeader>
                                          <TableRow className="border-b border-slate-200">
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Grievance
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Date
                                            </TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">
                                              Status
                                            </TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.grievances.map(
                                            (g: any, idx: number) => (
                                              <TableRow
                                                key={idx}
                                                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150"
                                              >
                                                <TableCell className="py-3 px-4 text-gray-800">
                                                  {g.grievance}
                                                </TableCell>
                                                <TableCell className="py-3 px-4 text-gray-700">
                                                  {g.date}
                                                </TableCell>
                                                <TableCell className="py-3 px-4">
                                                  <Badge
                                                    className={`${getBadgeClass(
                                                      "grievance",
                                                      g.status
                                                    )} px-3 py-1 text-sm font-semibold rounded-full`}
                                                  >
                                                    {g.status}
                                                  </Badge>
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">
                                        No grievance history found.
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Zone Assignment Section (as per image) */}
      <div className="mt-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="mb-2">
          <h3 className="text-3xl font-extrabold mb-1">Zone Assignment</h3>
          <p className="text-lg opacity-90">Manage worker's assigned zone.</p>
        </div>
        {/* Worker selection dropdown */}
        <div className="mb-6">
          <label htmlFor="zone-worker-select" className="block text-lg font-semibold mb-2">Select Worker</label>
          <select
            id="zone-worker-select"
            className="w-full bg-cyan-300/60 border-2 border-white rounded-xl px-6 py-4 text-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
            value={selectedWorker ? selectedWorker.id : ''}
            onChange={e => {
              const worker = workers.find(w => w.id === e.target.value);
              setSelectedWorker(worker || null);
            }}
          >
            <option value="" disabled>Select a worker</option>
            {workers.map(worker => (
              <option key={worker.id} value={worker.id}>
                {worker.name} ({worker.id})
              </option>
            ))}
          </select>
        </div>
        {selectedWorker && (
          <div className="mt-8 mb-4">
            <div className="text-lg font-semibold">Current Zone</div>
            <div className="text-2xl font-extrabold mt-1 mb-6">{selectedWorker.zone}</div>
            <div className="text-lg font-semibold mb-2">Change Zone</div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <select className="flex-grow bg-cyan-300/60 border-2 border-white rounded-xl px-6 py-4 text-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white transition-all" defaultValue="">
                <option value="" disabled>Select a new zone</option>
                <option value="Zone 1">Zone 1</option>
                <option value="Zone 2">Zone 2</option>
                <option value="Zone 3">Zone 3</option>
                <option value="Zone 4">Zone 4</option>
              </select>
              <button className="bg-white text-teal-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 hover:bg-gray-100 transition-all">
                <Save className="h-6 w-6" />
                Update Zone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}