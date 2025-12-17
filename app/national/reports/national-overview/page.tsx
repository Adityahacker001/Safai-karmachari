
'use client';

import React, { useState } from "react";
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, X, Users, Briefcase, FileText, AlertTriangle, Shield, Award, ChevronRight } from "lucide-react";
import { contractorTheme } from "@/lib/theme";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
import StatCard from "@/components/ui/stat-card";

// Dummy data for state details
const stateData: Record<string, any> = {
  "Kerala": {
    status: "High Performing",
    totalWorkers: 12450,
    activeWorkers: 11890,
    totalSHGs: 245,
    totalContractors: 89,
    ongoingWorkOrders: 156,
    completedWorkOrders: 1420,
    incidents30d: 5,
    fatalitiesYTD: 0,
    injuries: 3,
    firFiled: 2,
    firPending: 0,
    workerCategories: [
      { type: "Manual Scavengers", count: 1200 },
      { type: "Hazardous Workers", count: 2800 },
      { type: "Ragpickers", count: 3450 },
      { type: "Ordinary Safai Karmacharis", count: 5000 }
    ],
    districts: [
      { name: "Thiruvananthapuram", workers: 2100, incidents: 1, grievances: 3, status: "High Performing" },
      { name: "Kochi", workers: 1850, incidents: 0, grievances: 2, status: "High Performing" },
      { name: "Kozhikode", workers: 1600, incidents: 2, grievances: 4, status: "Good Standing" },
      { name: "Thrissur", workers: 1400, incidents: 1, grievances: 3, status: "Good Standing" }
    ],
    grievances: { total: 45, resolved: 38, pending: 7, ppeCompliance: 92, trainingCompletion: 88 },
    schemes: [
      { name: "Insurance Coverage", benefited: 11200, pending: 1250 },
      { name: "Skill Training Program", benefited: 8900, pending: 3550 },
      { name: "Loan & Subsidy", benefited: 6700, pending: 5750 }
    ]
  },
  "Tamil Nadu": {
    status: "High Performing",
    totalWorkers: 18900,
    activeWorkers: 17650,
    totalSHGs: 412,
    totalContractors: 156,
    ongoingWorkOrders: 287,
    completedWorkOrders: 2340,
    incidents30d: 12,
    fatalitiesYTD: 0,
    injuries: 8,
    firFiled: 5,
    firPending: 2,
    workerCategories: [
      { type: "Manual Scavengers", count: 1800 },
      { type: "Hazardous Workers", count: 4200 },
      { type: "Ragpickers", count: 5100 },
      { type: "Ordinary Safai Karmacharis", count: 7800 }
    ],
    districts: [
      { name: "Chennai", workers: 4500, incidents: 3, grievances: 8, status: "High Performing" },
      { name: "Coimbatore", workers: 3200, incidents: 2, grievances: 5, status: "High Performing" },
      { name: "Madurai", workers: 2800, incidents: 4, grievances: 6, status: "Good Standing" },
      { name: "Tiruchirappalli", workers: 2100, incidents: 2, grievances: 3, status: "Good Standing" }
    ],
    grievances: { total: 78, resolved: 66, pending: 12, ppeCompliance: 89, trainingCompletion: 85 },
    schemes: [
      { name: "Insurance Coverage", benefited: 17100, pending: 1800 },
      { name: "Skill Training Program", benefited: 13500, pending: 5400 },
      { name: "Loan & Subsidy", benefited: 10200, pending: 8700 }
    ]
  },
  "West Bengal": {
    status: "Good Standing",
    totalWorkers: 24500,
    activeWorkers: 22100,
    totalSHGs: 586,
    totalContractors: 234,
    ongoingWorkOrders: 412,
    completedWorkOrders: 3120,
    incidents30d: 35,
    fatalitiesYTD: 1,
    injuries: 24,
    firFiled: 18,
    firPending: 8,
    workerCategories: [
      { type: "Manual Scavengers", count: 2400 },
      { type: "Hazardous Workers", count: 6100 },
      { type: "Ragpickers", count: 7200 },
      { type: "Ordinary Safai Karmacharis", count: 8800 }
    ],
    districts: [
      { name: "Kolkata", workers: 6800, incidents: 10, grievances: 15, status: "Good Standing" },
      { name: "Howrah", workers: 4200, incidents: 8, grievances: 10, status: "Good Standing" },
      { name: "Durgapur", workers: 3100, incidents: 9, grievances: 12, status: "Under Watch" },
      { name: "Siliguri", workers: 2800, incidents: 5, grievances: 8, status: "Good Standing" }
    ],
    grievances: { total: 156, resolved: 124, pending: 32, ppeCompliance: 78, trainingCompletion: 76 },
    schemes: [
      { name: "Insurance Coverage", benefited: 20100, pending: 4400 },
      { name: "Skill Training Program", benefited: 15800, pending: 8700 },
      { name: "Loan & Subsidy", benefited: 12300, pending: 12200 }
    ]
  },
  "Maharashtra": {
    status: "Good Standing",
    totalWorkers: 32400,
    activeWorkers: 29800,
    totalSHGs: 712,
    totalContractors: 312,
    ongoingWorkOrders: 548,
    completedWorkOrders: 4560,
    incidents30d: 42,
    fatalitiesYTD: 2,
    injuries: 31,
    firFiled: 24,
    firPending: 12,
    workerCategories: [
      { type: "Manual Scavengers", count: 3200 },
      { type: "Hazardous Workers", count: 8100 },
      { type: "Ragpickers", count: 9600 },
      { type: "Ordinary Safai Karmacharis", count: 11500 }
    ],
    districts: [
      { name: "Mumbai", workers: 9800, incidents: 12, grievances: 20, status: "Good Standing" },
      { name: "Pune", workers: 6400, incidents: 10, grievances: 15, status: "Good Standing" },
      { name: "Nagpur", workers: 4200, incidents: 11, grievances: 14, status: "Under Watch" },
      { name: "Nashik", workers: 3500, incidents: 6, grievances: 11, status: "Good Standing" }
    ],
    grievances: { total: 210, resolved: 168, pending: 42, ppeCompliance: 75, trainingCompletion: 73 },
    schemes: [
      { name: "Insurance Coverage", benefited: 26700, pending: 5700 },
      { name: "Skill Training Program", benefited: 20900, pending: 11500 },
      { name: "Loan & Subsidy", benefited: 16300, pending: 16100 }
    ]
  },
  "Bihar": {
    status: "Under Watch",
    totalWorkers: 28900,
    activeWorkers: 24200,
    totalSHGs: 456,
    totalContractors: 198,
    ongoingWorkOrders: 312,
    completedWorkOrders: 2140,
    incidents30d: 88,
    fatalitiesYTD: 4,
    injuries: 62,
    firFiled: 42,
    firPending: 28,
    workerCategories: [
      { type: "Manual Scavengers", count: 3800 },
      { type: "Hazardous Workers", count: 7200 },
      { type: "Ragpickers", count: 8100 },
      { type: "Ordinary Safai Karmacharis", count: 9800 }
    ],
    districts: [
      { name: "Patna", workers: 7200, incidents: 22, grievances: 38, status: "Under Watch" },
      { name: "Gaya", workers: 5100, incidents: 18, grievances: 32, status: "Under Watch" },
      { name: "Muzaffarpur", workers: 4300, incidents: 24, grievances: 40, status: "Needs Intervention" },
      { name: "Bhagalpur", workers: 3800, incidents: 16, grievances: 28, status: "Under Watch" }
    ],
    grievances: { total: 312, resolved: 198, pending: 114, ppeCompliance: 62, trainingCompletion: 58 },
    schemes: [
      { name: "Insurance Coverage", benefited: 18200, pending: 10700 },
      { name: "Skill Training Program", benefited: 13400, pending: 15500 },
      { name: "Loan & Subsidy", benefited: 9800, pending: 19100 }
    ]
  },
  "Uttar Pradesh": {
    status: "Under Watch",
    totalWorkers: 41200,
    activeWorkers: 35800,
    totalSHGs: 612,
    totalContractors: 278,
    ongoingWorkOrders: 456,
    completedWorkOrders: 3240,
    incidents30d: 110,
    fatalitiesYTD: 5,
    injuries: 78,
    firFiled: 54,
    firPending: 36,
    workerCategories: [
      { type: "Manual Scavengers", count: 5100 },
      { type: "Hazardous Workers", count: 10200 },
      { type: "Ragpickers", count: 11800 },
      { type: "Ordinary Safai Karmacharis", count: 14100 }
    ],
    districts: [
      { name: "Lucknow", workers: 8900, incidents: 28, grievances: 52, status: "Under Watch" },
      { name: "Kanpur", workers: 7400, incidents: 24, grievances: 46, status: "Under Watch" },
      { name: "Agra", workers: 6100, incidents: 30, grievances: 58, status: "Needs Intervention" },
      { name: "Varanasi", workers: 5200, incidents: 20, grievances: 42, status: "Under Watch" }
    ],
    grievances: { total: 428, resolved: 268, pending: 160, ppeCompliance: 58, trainingCompletion: 54 },
    schemes: [
      { name: "Insurance Coverage", benefited: 24600, pending: 16600 },
      { name: "Skill Training Program", benefited: 18200, pending: 23000 },
      { name: "Loan & Subsidy", benefited: 13400, pending: 27800 }
    ]
  },
  "Jharkhand": {
    status: "Needs Intervention",
    totalWorkers: 18600,
    activeWorkers: 14800,
    totalSHGs: 298,
    totalContractors: 142,
    ongoingWorkOrders: 198,
    completedWorkOrders: 1560,
    incidents30d: 95,
    fatalitiesYTD: 3,
    injuries: 68,
    firFiled: 48,
    firPending: 32,
    workerCategories: [
      { type: "Manual Scavengers", count: 2400 },
      { type: "Hazardous Workers", count: 4800 },
      { type: "Ragpickers", count: 5200 },
      { type: "Ordinary Safai Karmacharis", count: 6200 }
    ],
    districts: [
      { name: "Ranchi", workers: 5100, incidents: 28, grievances: 34, status: "Needs Intervention" },
      { name: "Jamshedpur", workers: 4200, incidents: 24, grievances: 28, status: "Under Watch" },
      { name: "Dhanbad", workers: 3600, incidents: 26, grievances: 30, status: "Needs Intervention" },
      { name: "Bokaro", workers: 2900, incidents: 14, grievances: 18, status: "Under Watch" }
    ],
    grievances: { total: 234, resolved: 148, pending: 86, ppeCompliance: 54, trainingCompletion: 51 },
    schemes: [
      { name: "Insurance Coverage", benefited: 11200, pending: 7400 },
      { name: "Skill Training Program", benefited: 8600, pending: 10000 },
      { name: "Loan & Subsidy", benefited: 6400, pending: 12200 }
    ]
  }
};

const statusGradients: Record<string, string> = {
  'High Performing': 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-white',
  'Good Standing': 'bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-white',
  'Under Watch': 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300 text-gray-900',
  'Needs Intervention': 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white',
};



export default function NationalOverviewReportPage() {
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  
  const handleViewDashboard = (stateName: string) => {
    setSelectedState(stateName);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedState(null);
  };
  
  if (loading) {
    return <IntegratedLoader />;
  }

  const stateDetails = selectedState ? stateData[selectedState] : null;

  // Mock data with simple, raw counts. No percentages.
  const states = [
    { name: "Kerala", incidents: 5, fatalities: 0, nonCompliantChecklists: 120, openGrievances: 15, status: "High Performing" },
    { name: "Tamil Nadu", incidents: 12, fatalities: 0, nonCompliantChecklists: 250, openGrievances: 22, status: "High Performing" },
    { name: "West Bengal", incidents: 35, fatalities: 1, nonCompliantChecklists: 800, openGrievances: 45, status: "Good Standing" },
    { name: "Maharashtra", incidents: 42, fatalities: 2, nonCompliantChecklists: 1200, openGrievances: 60, status: "Good Standing" },
    { name: "Bihar", incidents: 88, fatalities: 4, nonCompliantChecklists: 2500, openGrievances: 150, status: "Under Watch" },
    { name: "Uttar Pradesh", incidents: 110, fatalities: 5, nonCompliantChecklists: 3100, openGrievances: 210, status: "Under Watch" },
    { name: "Jharkhand", incidents: 95, fatalities: 3, nonCompliantChecklists: 1800, openGrievances: 90, status: "Needs Intervention" },
  ];

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
              National Overview Report
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg text-white/90 font-bold drop-shadow-lg mt-2">
              A comprehensive, data-driven overview of all states and union territories
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl">
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Export National Data (CSV)
            </Button>
          </div>
        </div>
      </header>

      {/* Professional Performance Table */}
      <Card className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm border-b border-purple-200 p-4 sm:p-6 md:p-8">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 drop-shadow-lg">National Performance</CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mt-2">
                This master table aggregates key performance indicators from all state-level reports
            </CardDescription>
             <div className="flex items-center gap-3 pt-4">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur opacity-30"></div>
                  <Input 
                    placeholder="Search by state/UT name..." 
                    className="relative bg-white text-gray-900 placeholder:text-gray-500 border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl font-semibold shadow-lg" 
                  />
                </div>
             </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-white via-blue-50 to-emerald-50">
            <Table>
              <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-slate-600 font-bold">State / UT</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Incidents (30d)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Fatalities (YTD)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Non-Compliant Checklists (30d)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Open Grievances</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Status</TableHead>
                <TableHead className="text-right text-slate-600 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map(s => (
                <TableRow key={s.name} className="hover:shadow-lg hover:z-10 hover:bg-white transition-all duration-200 border-b border-slate-100">
                  <TableCell className="font-medium text-slate-800">{s.name}</TableCell>
                  <TableCell className={`font-semibold text-center ${s.incidents > 50 ? 'text-red-600' : 'text-green-600'}`}>{s.incidents}</TableCell>
                  <TableCell className={`font-bold text-center ${s.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{s.fatalities}</TableCell>
                  <TableCell className="text-center text-slate-600">{s.nonCompliantChecklists.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-slate-600">{s.openGrievances}</TableCell>
                  <TableCell>
                      <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transition-transform duration-200 ${statusGradients[s.status as keyof typeof statusGradients] || 'bg-gray-300 text-gray-800'} hover:scale-105`}>
                            {s.status}
                          </span>
                      </div>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-300 text-blue-700 bg-white hover:bg-blue-50"
                        onClick={() => handleViewDashboard(s.name)}
                      >
                        <Eye className="h-4 w-4 mr-2"/>View Dashboard
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* State Performance Modal */}
      {isModalOpen && stateDetails && (
        createPortal(
          <div 
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-auto"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600/100 via-purple-600/100 to-pink-600/100 rounded-t-2xl p-6 border-b border-white/20">
              <button
                onClick={handleCloseModal}
                className="absolute right-6 top-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <div className="flex flex-col gap-2 pr-12">
                <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                  <span>National Dashboard</span>
                  <span>→</span>
                  <span>Reports</span>
                  <span>→</span>
                  <span className="text-white">National Overview</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                    State Performance Overview – {selectedState}
                  </h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap ${statusGradients[stateDetails.status]}`}>
                    {stateDetails.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Summary List (compact with arrow) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'Total Workers', value: stateDetails.totalWorkers.toLocaleString() },
                  { label: 'Active Workers', value: stateDetails.activeWorkers.toLocaleString() },
                  { label: 'Total SHGs', value: stateDetails.totalSHGs.toString() },
                  { label: 'Total Contractors', value: stateDetails.totalContractors.toString() },
                  { label: 'Ongoing Work Orders', value: stateDetails.ongoingWorkOrders.toString() },
                  { label: 'Completed Work Orders', value: stateDetails.completedWorkOrders.toLocaleString() },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-3 items-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                    <div className="col-span-1">
                      <div className="text-sm text-gray-500">{item.label}</div>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <div className="col-span-1 text-right">
                      <div className="text-xl font-extrabold text-gray-900">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Incident & Safety Snapshot */}
              <Card className="bg-gradient-to-br from-red-50/50 to-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Incident & Safety Snapshot</CardTitle>
                  <CardDescription>Critical safety metrics for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <p className="text-xs font-semibold text-gray-600">Incidents (30d)</p>
                      </div>
                      <p className="text-2xl font-black text-yellow-700">{stateDetails.incidents30d}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-red-600" />
                        <p className="text-xs font-semibold text-gray-600">Fatalities (YTD)</p>
                      </div>
                      <p className="text-2xl font-black text-red-700">{stateDetails.fatalitiesYTD}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <p className="text-xs font-semibold text-gray-600">Injuries</p>
                      </div>
                      <p className="text-2xl font-black text-orange-700">{stateDetails.injuries}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <p className="text-xs font-semibold text-gray-600">FIR Filed</p>
                      </div>
                      <p className="text-2xl font-black text-green-700">{stateDetails.firFiled}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-amber-600" />
                        <p className="text-xs font-semibold text-gray-600">FIR Pending</p>
                      </div>
                      <p className="text-2xl font-black text-amber-700">{stateDetails.firPending}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Worker Category Breakdown */}
              <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Worker Category Breakdown</CardTitle>
                  <CardDescription>Distribution of workers by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stateDetails.workerCategories.map((category: any) => (
                      <div key={category.type} className="bg-white rounded-xl p-4 border-2 border-blue-200">
                        <p className="text-xs font-semibold text-gray-600 mb-2">{category.type}</p>
                        <p className="text-2xl font-black text-blue-700">{category.count.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* District-Wise Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">District-Wise Performance</CardTitle>
                  <CardDescription>Performance metrics for all districts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold">District Name</TableHead>
                        <TableHead className="font-bold text-center">Total Workers</TableHead>
                        <TableHead className="font-bold text-center">Incidents</TableHead>
                        <TableHead className="font-bold text-center">Grievances</TableHead>
                        <TableHead className="font-bold text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stateDetails.districts.map((district: any) => (
                        <TableRow key={district.name}>
                          <TableCell className="font-medium">{district.name}</TableCell>
                          <TableCell className="text-center font-semibold">{district.workers.toLocaleString()}</TableCell>
                          <TableCell className={`text-center font-semibold ${district.incidents > 15 ? 'text-red-600' : district.incidents > 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {district.incidents}
                          </TableCell>
                          <TableCell className="text-center font-semibold">{district.grievances}</TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusGradients[district.status]}`}>
                                {district.status}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Grievance & Compliance */}
              <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Grievance & Compliance Snapshot</CardTitle>
                  <CardDescription>Worker grievances and compliance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Total Grievances</p>
                      <p className="text-2xl font-black text-blue-700">{stateDetails.grievances.total}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Resolved</p>
                      <p className="text-2xl font-black text-green-700">{stateDetails.grievances.resolved}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Pending</p>
                      <p className="text-2xl font-black text-yellow-700">{stateDetails.grievances.pending}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">PPE Compliance</p>
                      <p className="text-2xl font-black text-purple-700">{stateDetails.grievances.ppeCompliance}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Training Completion</p>
                      <p className="text-2xl font-black text-pink-700">{stateDetails.grievances.trainingCompletion}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schemes & Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Schemes & Benefits Coverage</CardTitle>
                  <CardDescription>Beneficiary coverage across various schemes</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-bold">Scheme Name</TableHead>
                        <TableHead className="font-bold text-center">Benefited</TableHead>
                        <TableHead className="font-bold text-center">Pending</TableHead>
                        <TableHead className="font-bold text-center">Coverage %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stateDetails.schemes.map((scheme: any) => {
                        const total = scheme.benefited + scheme.pending;
                        const percentage = ((scheme.benefited / total) * 100).toFixed(1);
                        return (
                          <TableRow key={scheme.name}>
                            <TableCell className="font-medium">{scheme.name}</TableCell>
                            <TableCell className="text-center text-green-700 font-bold">{scheme.benefited.toLocaleString()}</TableCell>
                            <TableCell className="text-center text-yellow-700 font-bold">{scheme.pending.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                parseFloat(percentage) >= 75 ? 'bg-green-100 text-green-700' :
                                parseFloat(percentage) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {percentage}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Footer */}
              <div className="flex justify-center pt-4 pb-2">
                <Button 
                  size="lg"
                  onClick={handleCloseModal}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold px-8 py-6 rounded-xl shadow-xl"
                >
                  Close
                </Button>
              </div>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  );
}

