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
import { useState } from "react";

export default function WorkerManagementReportPage() {
  // State for status filter
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // State for zone filter
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  // Expanded mock data for the worker roster
  const workers = [
    {
      id: "W-C123-001",
      name: "Biplob Haldar",
      zone: "Zone 1",
      status: "Active",
      performance: "Top Performer",
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

  // Updated helper function to return gradient classes for badges
  const getBadgeClass = (type: string, value: string) => {
    const baseClasses = "text-white border-transparent";
    switch (type) {
      case 'status':
        if (value === 'Active') return `bg-gradient-to-r from-green-500 to-emerald-600 ${baseClasses}`;
        if (value === 'On Leave') return `bg-gradient-to-r from-slate-400 to-slate-500 ${baseClasses}`;
        if (value === 'Inactive') return `bg-gradient-to-r from-gray-500 to-gray-600 ${baseClasses}`;
        return 'bg-gray-100 text-gray-800';
      case 'performance':
        if (value === 'Top Performer') return `bg-gradient-to-r from-blue-500 to-indigo-600 ${baseClasses}`;
        if (value === 'Consistent') return `bg-gradient-to-r from-slate-400 to-slate-500 ${baseClasses}`;
        if (value === 'Needs Review') return `bg-gradient-to-r from-amber-500 to-orange-600 ${baseClasses}`;
        return 'bg-gray-100 text-gray-800';
      // Keeping other badge types with non-gradient, clean styles for the dialog
      case 'compliance':
        if (value === 'Compliant') return 'bg-green-100 text-green-800';
        if (value === 'Non-Compliant') return 'bg-amber-100 text-amber-800';
        return 'bg-gray-100 text-gray-800';
      case 'training':
        if (value === 'Completed') return 'bg-green-100 text-green-800';
        if (value === 'Pending') return 'bg-slate-100 text-slate-800';
        return 'bg-gray-100 text-gray-800';
      case 'grievance':
        if (value === 'Resolved') return 'bg-green-100 text-green-800';
        if (value === 'In Progress') return 'bg-slate-100 text-slate-800';
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    // Main container with a clean, professional background
    <div className="min-h-screen p-6 md:p-12 bg-slate-50 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
            Worker Management Report
          </h2>
          <p className="text-gray-600 mt-3 text-xl">
            A complete roster and performance overview of your workforce.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-6 sm:mt-0">
          <Button
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all duration-200"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Roster (CSV)
          </Button>
        </div>
      </div>

      {/* Workforce Summary KPIs with a clean, modern design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-white">Total Workers</CardTitle>
            <div className="p-2 bg-blue-500/30 rounded-lg">
                <Users className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{workers.length}</div>
            <p className="text-sm text-blue-100 mt-1">Registered workers</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-500 via-green-400 to-emerald-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-white">Active Today</CardTitle>
            <div className="p-2 bg-green-500/30 rounded-lg">
                <UserCheck className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{workers.filter((w) => w.status === "Active").length}</div>
            <p className="text-sm text-green-100 mt-1">Currently active</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-white">Grievances Pending</CardTitle>
            <div className="p-2 bg-orange-500/30 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">23</div>
            <p className="text-sm text-orange-100 mt-1">Pending grievances</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-white">Safety Compliance</CardTitle>
            <div className="p-2 bg-purple-500/30 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">94.2%</div>
            <p className="text-sm text-purple-100 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

  <Card className="bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-100 shadow-2xl border border-gray-100 rounded-3xl overflow-hidden">
  <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white shadow-lg">
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
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">Worker</TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">Assigned Zone</TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">Employment Status</TableHead>
                <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">Performance Status</TableHead>
                <TableHead className="text-right py-4 px-6 text-slate-600 font-bold text-base">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="py-4 px-6">
                    <div className="font-semibold text-gray-800 text-base">{worker.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{worker.id}</div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 text-base">{worker.zone}</TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge className={`${getBadgeClass('status', worker.status)} px-3 py-1 text-sm font-semibold rounded-full`}>
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge className={`${getBadgeClass('performance', worker.performance)} px-3 py-1 text-sm font-semibold rounded-full`}>
                      {worker.performance}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 px-6">
                    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedWorker(null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all duration-200" onClick={() => setSelectedWorker(worker)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      {selectedWorker && selectedWorker.id === worker.id && (
                        <DialogContent className="max-w-5xl p-0 bg-slate-50 rounded-3xl shadow-2xl">
                          <DialogHeader className="p-8 bg-gradient-to-r from-indigo-600 to-violet-700 text-white rounded-t-3xl">
                            <div className="flex items-start space-x-6">
                              <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                                <AvatarImage src="/placeholder-user.jpg" alt={selectedWorker.name}/>
                                <AvatarFallback className="bg-violet-200 text-violet-800 text-3xl font-bold">
                                  {selectedWorker.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 pt-2">
                                <DialogTitle className="text-4xl font-bold">{selectedWorker.name}</DialogTitle>
                                <DialogDescription className="text-indigo-100 text-lg">
                                  ID: {selectedWorker.id} | Zone: {selectedWorker.zone} | Status: {selectedWorker.status}
                                </DialogDescription>
                                <div className="pt-3">
                                  {/* The badge inside the dialog still uses the gradient style, let's adjust it */}
                                  <Badge className={`${getBadgeClass('performance', selectedWorker.performance)} px-4 py-1.5 text-base font-semibold rounded-full`}>
                                     Performance: {selectedWorker.performance}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </DialogHeader>
                          <div className="p-8">
                            <Tabs defaultValue="compliance" className="w-full">
                              <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-slate-200 rounded-xl shadow-inner">
                                <TabsTrigger value="compliance" className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out">
                                  <Shield className="h-5 w-5" />
                                  <span>Compliance History</span>
                                </TabsTrigger>
                                <TabsTrigger value="training" className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out">
                                  <GraduationCap className="h-5 w-5" />
                                  <span>Training Record</span>
                                </TabsTrigger>
                                <TabsTrigger value="grievances" className="flex items-center justify-center space-x-2 text-base font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out">
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
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Date</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Status</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Details</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.compliance.map((c: any, idx: number) => (
                                            <TableRow key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150">
                                              <TableCell className="py-3 px-4 text-gray-800">{c.date}</TableCell>
                                              <TableCell className="py-3 px-4">
                                                <Badge className={`${getBadgeClass('compliance', c.status)} px-3 py-1 text-sm font-semibold rounded-full`}>{c.status}</Badge>
                                              </TableCell>
                                              <TableCell className="py-3 px-4 text-gray-700">{c.details}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">No compliance history found.</p>
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
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Module</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Status</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Completion Date</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.training.map((t: any, idx: number) => (
                                            <TableRow key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150">
                                              <TableCell className="py-3 px-4 text-gray-800">{t.module}</TableCell>
                                              <TableCell className="py-3 px-4">
                                                <Badge className={`${getBadgeClass('training', t.status)} px-3 py-1 text-sm font-semibold rounded-full`}>{t.status}</Badge>
                                              </TableCell>
                                              <TableCell className="py-3 px-4 text-gray-700">{t.date}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">No training record found.</p>
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
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Grievance</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Date</TableHead>
                                            <TableHead className="py-3 px-4 text-slate-700 font-bold">Status</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedWorker.details.grievances.map((g: any, idx: number) => (
                                            <TableRow key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-150">
                                              <TableCell className="py-3 px-4 text-gray-800">{g.grievance}</TableCell>
                                              <TableCell className="py-3 px-4 text-gray-700">{g.date}</TableCell>
                                              <TableCell className="py-3 px-4">
                                                <Badge className={`${getBadgeClass('grievance', g.status)} px-3 py-1 text-sm font-semibold rounded-full`}>{g.status}</Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <p className="text-center text-gray-500 py-6 text-lg">No grievance history found.</p>
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
    </div>
  );
}