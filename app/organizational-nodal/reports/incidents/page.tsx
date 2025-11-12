"use client";

import React, { useState, useMemo, Fragment } from "react";
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
  AlertTriangle,     // Header Icon
  FileDown,
  RefreshCw,
  Search,
  Filter,
  XCircle,           // Reset Icon
  BarChart3,
  Calendar,
  Building,
  MapPin,
  Users,
  ChevronDown,       // Expand icon
  ChevronUp,         // Collapse icon
  List,              // Table Icon
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { cn } from "@/lib/utils"; // Assuming you have cn utility
import { Label } from "@/components/ui/label";

// --- Interfaces ---
type FIRStatus = "Lodged" | "Under Investigation" | "Closed" | "N/A";
type CompStatus = "Paid" | "Pending" | "N/A";
type InquiryStatus = "Initiated" | "Completed" | "Pending";

interface Incident {
  id: number;
  incidentId: string;
  date: string;
  location: string;
  briefParticulars: string;
  deaths: number;
  injuries: number;
  firNo: string;
  firStatus: FIRStatus;
  compensationPaid: CompStatus;
  inquiryStatus: InquiryStatus;
  // Fact Sheet Details
  factSheet: {
    dateTime: string;
    narrativeSummary: string;
    firDetails: { no: string; station: string; status: FIRStatus };
    compensationDetails: { amount: string; status: CompStatus; datePaid: string };
    inquiryStatus: InquiryStatus;
    miscNotes: string;
  };
}

// --- Initial Mock Data ---
const initialIncidentData: Incident[] = [
    { id: 1, incidentId: "INC-2025-001", date: "2025-10-20", location: "Sector 5, Sewer Line", briefParticulars: "Worker collapsed after entering sewer.", deaths: 1, injuries: 0, firNo: "FIR-123/25", firStatus: "Lodged", compensationPaid: "Pending", inquiryStatus: "Initiated",
      factSheet: { dateTime: "2025-10-20 10:30 AM", narrativeSummary: "Rakesh Kumar entered sewer line without PPE...", firDetails: { no: "FIR-123/25", station: "Central PS", status: "Lodged" }, compensationDetails: { amount: "₹10,00,000", status: "Pending", datePaid: "N/A" }, inquiryStatus: "Initiated", miscNotes: "Contacted contractor." }
    },
    { id: 2, incidentId: "INC-2025-002", date: "2025-10-18", location: "T1 Waste Plant", briefParticulars: "Chemical spill caused burns.", deaths: 0, injuries: 2, firNo: "N/A", firStatus: "N/A", compensationPaid: "N/A", inquiryStatus: "Pending",
      factSheet: { dateTime: "2025-10-18 03:00 PM", narrativeSummary: "Two workers handling hazardous waste...", firDetails: { no: "N/A", station: "N/A", status: "N/A" }, compensationDetails: { amount: "N/A", status: "N/A", datePaid: "N/A" }, inquiryStatus: "Pending", miscNotes: "Internal review started." }
    },
    { id: 3, incidentId: "INC-2025-003", date: "2025-10-15", location: "Main Hangar", briefParticulars: "Fall from height, minor injury.", deaths: 0, injuries: 1, firNo: "N/A", firStatus: "N/A", compensationPaid: "Paid", inquiryStatus: "Completed",
      factSheet: { dateTime: "2025-10-15 09:15 AM", narrativeSummary: "Worker slipped while cleaning...", firDetails: { no: "N/A", station: "N/A", status: "N/A" }, compensationDetails: { amount: "₹50,000 (Medical)", status: "Paid", datePaid: "2025-10-17" }, inquiryStatus: "Completed", miscNotes: "Safety briefing reiterated." }
    },
];

const chartData = [
  { name: 'Deaths', Count: 1, color: "#ef4444" },
  { name: 'Injuries', Count: 3, color: "#f97316" },
  { name: 'FIRs Filed', Count: 1, color: "#3b82f6" },
  { name: 'Comp. Paid', Count: 1, color: "#22c55e" },
];

// --- Main Page Component ---
export default function TotalIncidentReportPage() {
  // --- State ---
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // You can use a date range picker component here
  const [contractorFilter, setContractorFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [incidentData, setIncidentData] = useState<Incident[]>(initialIncidentData);
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // For expandable row

  // --- Handlers ---
  const handleFilterChange = (filterSetter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    filterSetter(value === "all" ? "" : value);
  };
  
  const resetFilters = () => {
    setSearch(""); setDateFilter(""); setContractorFilter(""); setLocationFilter(""); setCategoryFilter(""); setStatusFilter("");
  };

  const handleExport = () => alert("Export functionality to be implemented.");
  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    setIncidentData(initialIncidentData);
    resetFilters();
  };
  
  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // --- Dynamic Filtering ---
  const filteredIncidents = useMemo(() => incidentData.filter((inc) =>
    (inc.incidentId.toLowerCase().includes(search.toLowerCase()) ||
     inc.location.toLowerCase().includes(search.toLowerCase()) ||
     inc.firNo.toLowerCase().includes(search.toLowerCase())) &&
    (contractorFilter ? inc.factSheet.firDetails.station.includes(contractorFilter) : true) && // Simplified logic
    (locationFilter ? inc.location.toLowerCase().includes(locationFilter.toLowerCase()) : true) &&
    (categoryFilter ? (
        categoryFilter === 'Deaths' ? inc.deaths > 0 :
        categoryFilter === 'Injuries' ? inc.injuries > 0 : true
    ) : true) &&
    (statusFilter ? inc.inquiryStatus === statusFilter : true)
    // Date filter logic would be added here
  ), [search, contractorFilter, locationFilter, categoryFilter, statusFilter, incidentData]);

  // --- Badge Styling ---
  const getStatusBadge = (status: InquiryStatus | FIRStatus) => {
    switch (status) {
      case "Completed":
      case "Lodged":
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case "Pending":
      case "Under Investigation":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full rounded-xl bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 px-6 py-8 shadow-md flex items-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-yellow-50 to-pink-100 bg-clip-text text-transparent tracking-tight drop-shadow-md">
            Total Incident Report
          </h1>
        </div>
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
             <Input placeholder="Search ID, Location, FIR..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-56 pl-9 focus:ring-2 focus:ring-red-300" />
          </div>
          {/* Filters */}
          <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-red-300" />
          <Select value={contractorFilter} onValueChange={handleFilterChange(setContractorFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-red-300"><SelectValue placeholder="Filter by Contractor" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Contractors</SelectItem><SelectItem value="CleanForce Pvt Ltd">CleanForce Pvt Ltd</SelectItem><SelectItem value="UrbanClean Services">UrbanClean Services</SelectItem><SelectItem value="EcoSan Solutions">EcoSan Solutions</SelectItem></SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={handleFilterChange(setCategoryFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-red-300"><SelectValue placeholder="Filter by Category" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Categories</SelectItem><SelectItem value="Deaths">Deaths</SelectItem><SelectItem value="Injuries">Injuries</SelectItem></SelectContent>
          </Select>
           <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full sm:w-auto flex-grow border-gray-300 focus:ring-2 focus:ring-red-300"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Initiated">Initiated</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent>
          </Select>
          <Button variant="ghost" onClick={resetFilters} className="text-gray-600 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1"/> Reset
          </Button>
        </CardContent>
      </Card>

      {/* Export/Reload Section - moved below Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="outline" onClick={handleExport} className="shadow-sm hover:shadow transition-shadow duration-200">
          <FileDown className="w-4 h-4 mr-2" /> Export Report
        </Button>
        <Button variant="secondary" onClick={handleRefresh} className="shadow-sm hover:shadow transition-shadow duration-200">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
        </Button>
      </div>

      {/* Visual Chart */}
      <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70 p-4">
            <CardTitle className="text-base font-semibold text-gray-700">Incident Bar Chart (Filtered)</CardTitle>
            <BarChart3 className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent className="pt-6">
             <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="Count" name="Total Count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="shadow-xl border border-gray-100 rounded-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-200 border-b p-4">
           <div className="rounded-lg bg-white px-4 py-6 flex items-center">
             <CardTitle className="text-2xl font-extrabold text-gray-900 tracking-tight">
               Total Incident Report
             </CardTitle>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-50">
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead> {/* For expand button */}
                  <TableHead className="w-[80px] font-semibold text-gray-800">Sl.</TableHead>
                  <TableHead className="min-w-[130px] font-semibold text-gray-800">Incident ID</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-800">Date</TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-800">Location</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-800">Brief Particulars</TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">Deaths</TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">Injuries</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-800">FIR No</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-800">FIR Status</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-800">Compensation</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-800">Inquiry Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={12} className="text-center text-gray-500 py-10">
                            No incidents found matching your criteria.
                        </TableCell>
                    </TableRow>
                 )}
                {filteredIncidents.map((inc, i) => (
                  <Fragment key={inc.id}> {/* Use Fragment to render two rows */}
                    <TableRow className="hover:bg-pink-50/60 transition-colors duration-150 even:bg-yellow-50/70 odd:bg-white rounded-lg shadow-sm">
                      <TableCell className="p-1">
                        <Button variant="ghost" size="icon" onClick={() => toggleRow(inc.id)} className="hover:bg-indigo-100">
                          {expandedRow === inc.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium text-gray-700">{i + 1}</TableCell>
                      <TableCell className="font-semibold text-blue-700">{inc.incidentId}</TableCell>
                      <TableCell className="text-gray-700">{inc.date}</TableCell>
                      <TableCell className="text-xs text-gray-600">{inc.location}</TableCell>
                      <TableCell className="text-xs text-gray-600">{inc.briefParticulars}</TableCell>
                      <TableCell className={`text-center font-bold ${inc.deaths > 0 ? 'text-red-600' : 'text-gray-700'}`}>{inc.deaths}</TableCell>
                      <TableCell className={`text-center font-bold ${inc.injuries > 0 ? 'text-orange-600' : 'text-gray-700'}`}>{inc.injuries}</TableCell>
                      <TableCell className="text-gray-700">{inc.firNo}</TableCell>
                      <TableCell>{getStatusBadge(inc.firStatus)}</TableCell>
                      <TableCell>{getStatusBadge(inc.compensationPaid as any)}</TableCell> {/* Simplified status */}
                      <TableCell>{getStatusBadge(inc.inquiryStatus)}</TableCell>
                    </TableRow>
                    {/* Expandable Fact Sheet Row */}
                    <AnimatePresence>
                      {expandedRow === inc.id && (
                        <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-white"
                        >
                          <TableCell colSpan={12} className="p-0">
                            <FactSheet data={inc.factSheet} />
                          </TableCell>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Expandable Fact Sheet Component ---
function FactSheet({ data }: { data: Incident['factSheet'] }) {
    return (
        <div className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-inner">
            <h4 className="text-lg font-bold text-indigo-800 mb-4">Fact Sheet Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Basic Details */}
                <div className="space-y-2">
                    <Label className="text-xs uppercase font-semibold text-gray-500">Basic Details</Label>
                    <p className="text-sm"><strong>Date & Time:</strong> {data.dateTime}</p>
                    <p className="text-sm"><strong>Narrative:</strong> {data.narrativeSummary}</p>
                    <p className="text-sm"><strong>Misc Notes:</strong> {data.miscNotes || 'N/A'}</p>
                </div>

                {/* FIR Details */}
                <div className="space-y-2">
                    <Label className="text-xs uppercase font-semibold text-gray-500">FIR Details</Label>
                    <p className="text-sm"><strong>FIR No:</strong> {data.firDetails.no}</p>
                    <p className="text-sm"><strong>Station:</strong> {data.firDetails.station}</p>
                    <p className="text-sm"><strong>Status:</strong> <Badge variant={data.firDetails.status === 'Lodged' ? 'default' : 'secondary'}>{data.firDetails.status}</Badge></p>
                </div>

                {/* Compensation & Inquiry */}
                <div className="space-y-2">
                    <Label className="text-xs uppercase font-semibold text-gray-500">Compensation & Inquiry</Label>
                    <p className="text-sm"><strong>Amount:</strong> {data.compensationDetails.amount}</p>
                    <p className="text-sm"><strong>Status:</strong> <Badge variant={data.compensationDetails.status === 'Paid' ? 'default' : 'destructive'}>{data.compensationDetails.status}</Badge></p>
                    <p className="text-sm"><strong>Date Paid:</strong> {data.compensationDetails.datePaid}</p>
                    <p className="text-sm"><strong>Inquiry Status:</strong> <Badge variant={data.inquiryStatus === 'Completed' ? 'default' : 'secondary'}>{data.inquiryStatus}</Badge></p>
                </div>
            </div>
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