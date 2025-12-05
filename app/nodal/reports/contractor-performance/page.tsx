'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, X, User, Users, ShieldCheck, CreditCard, AlertCircle, MessageSquare, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ContractorPerformanceReportPage() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<any | null>(null);
  const contractors = [
    { 
      name: "ABC Sanitation", 
      avgGrievanceResponse: "18 Hours", 
      ppeRequestFulfilled: "98%", 
      overdueTasks: 2, 
      lastLogin: "Today, 9:15 AM",
      status: "Highly Responsive"
    },
    { 
      name: "Rail Clean Services", 
      avgGrievanceResponse: "26 Hours", 
      ppeRequestFulfilled: "95%", 
      overdueTasks: 1, 
      lastLogin: "Today, 11:30 AM",
      status: "Consistent"
    },
    { 
      name: "Municipal Services", 
      avgGrievanceResponse: "38 Hours", 
      ppeRequestFulfilled: "90%", 
      overdueTasks: 5, 
      lastLogin: "Yesterday, 4:00 PM",
      status: "Needs Follow-up"
    },
    { 
      name: "City Maintenance", 
      avgGrievanceResponse: "52 Hours (SLA Miss)", 
      ppeRequestFulfilled: "85%", 
      overdueTasks: 8, 
      lastLogin: "3 days ago",
      status: "Unresponsive"
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Contractor Performance
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Analyze contractor responsiveness and administrative consistency
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-6">Contractor Name</TableHead>
                <TableHead className="text-center py-4 px-6">Overdue Tasks</TableHead>
                <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Last System Login</TableHead>
                <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Responsiveness Status</TableHead>
                <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c, index) => (
                <TableRow 
                  key={c.name} 
                  className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-l-4 ${
                    c.status === 'Unresponsive' ? "border-l-red-400 hover:border-l-red-500" :
                    c.status === 'Highly Responsive' ? "border-l-green-400 hover:border-l-green-500" :
                    "border-l-yellow-400 hover:border-l-yellow-500"
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Avatar><AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">{c.name.substring(0, 2)}</AvatarFallback></Avatar>
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn("text-center py-4 px-6 font-bold", c.overdueTasks > 4 ? 'text-red-600' : 'text-gray-700')}>
                    {c.overdueTasks}
                  </TableCell>
                  <TableCell className="text-center text-gray-600 py-4 px-6">{c.lastLogin}</TableCell>
                  <TableCell className="text-center py-4 px-6">
                    <Badge 
                      className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                        c.status === 'Unresponsive' ? "bg-red-100 text-red-800 hover:bg-red-200" :
                        c.status === 'Highly Responsive' ? "bg-green-100 text-green-800 hover:bg-green-200" :
                        c.status === 'Needs Follow-up' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                        "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      )}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center py-4 px-6">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => { setSelectedContractor(c); setModalOpen(true); }}>
                      <Eye className="h-4 w-4 mr-2"/>
                      View Dashboard
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contractor Performance - View Details Modal (client-side) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setModalOpen(false)} />

          <div role="dialog" aria-modal="true" className="relative z-60 w-full max-w-full sm:max-w-3xl md:max-w-4xl mx-auto transform transition-all duration-200">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden border border-slate-100 ring-1 ring-slate-50 max-h-[92vh] sm:max-h-[88vh]">
              <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b bg-gradient-to-r from-white to-slate-50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow">CP</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">Contractor Performance</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Read-only snapshot — compliance, incidents, payments</p>
                  </div>
                </div>
                <button aria-label="Close" className="p-2 rounded-md hover:bg-slate-100" onClick={() => setModalOpen(false)}>
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[72vh] sm:max-h-[68vh] p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left column - Basic Info, Workforce, Compliance */}
                  <div className="space-y-4">
                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><User className="h-4 w-4 text-blue-500" /> Contractor Basic Information</h4>
                      <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700">
                        <div className="flex justify-between"><span className="text-slate-500">Contractor Name</span><span className="font-medium text-sm">{selectedContractor?.name ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Registration ID</span><span className="font-medium text-sm">{selectedContractor?.registrationId ?? 'REG-XXXX (placeholder)'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Contact Person</span><span className="font-medium text-sm">{selectedContractor?.contactPerson ?? 'N/A'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Phone / Email</span><span className="font-medium text-sm">{selectedContractor?.contact ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Last System Login</span><span className="font-medium text-sm">{selectedContractor?.lastLogin ?? '—'}</span></div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><Users className="h-4 w-4 text-sky-500" /> Workforce Overview</h4>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-blue-50 border-l-4 border-blue-200">
                          <div className="text-xs text-slate-500">Total Workers</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.totalWorkers ?? '—'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-rose-50 border-l-4 border-rose-200">
                          <div className="text-xs text-slate-500">Manual Scavenging</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.manualScavenging ?? '—'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-amber-50 border-l-4 border-amber-200">
                          <div className="text-xs text-slate-500">Hazardous</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.hazardous ?? '—'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-sky-50 border-l-4 border-sky-200">
                          <div className="text-xs text-slate-500">Ordinary SKs</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.ordinary ?? '—'}</div>
                        </div>
                        <div className="p-2 rounded-md md:col-span-2 bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Ragpickers</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.ragpickers ?? '—'}</div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Compliance & Performance</h4>
                      <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700">
                        <div className="flex justify-between"><span className="text-slate-500">Absenteeism Rate</span><span className="font-medium">{selectedContractor?.absenteeism ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Safety Violations Count</span><span className="font-medium">{selectedContractor?.safetyViolations ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Pending Training Count</span><span className="font-medium">{selectedContractor?.pendingTraining ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Supervisor Remarks</span><span className="font-medium">{selectedContractor?.supervisorRemarks ?? '—'}</span></div>
                      </div>
                    </section>
                  </div>

                  {/* Right column - Payments, Incidents, Grievance, Directives */}
                  <div className="space-y-4">
                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><CreditCard className="h-4 w-4 text-emerald-500" /> Payment & Financial Status</h4>
                      <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700">
                        <div className="flex justify-between"><span className="text-slate-500">Last Payment</span><span className="font-medium text-sm">{selectedContractor?.lastPaymentDate ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Amount Pending</span><span className="font-medium text-sm">{selectedContractor?.paymentPending ?? '—'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Compliance Score</span><span className="font-medium text-sm">{selectedContractor?.complianceScore ?? '—'}</span></div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><AlertCircle className="h-4 w-4 text-rose-500" /> Incident Summary</h4>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-rose-50 border-l-4 border-rose-200">
                          <div className="text-xs text-slate-500">Total Incidents</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.totalIncidents ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Deaths</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.deaths ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-amber-50 border-l-4 border-amber-200">
                          <div className="text-xs text-slate-500">Injuries</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.injuries ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-sky-50 border-l-4 border-sky-200">
                          <div className="text-xs text-slate-500">FIR Filed</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.firFiled ? 'Yes' : 'No'}</div>
                        </div>
                        <div className="p-2 rounded-md md:col-span-2 bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Compensation Status</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.compensationStatus ?? '—'}</div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><MessageSquare className="h-4 w-4 text-violet-500" /> Grievance Summary</h4>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Total Grievances</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.totalGrievances ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-emerald-50 border-l-4 border-emerald-200">
                          <div className="text-xs text-slate-500">Resolved</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.grievancesResolved ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-amber-50 border-l-4 border-amber-200">
                          <div className="text-xs text-slate-500">Pending</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.grievancesPending ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-rose-50 border-l-4 border-rose-200">
                          <div className="text-xs text-slate-500">Escalated</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.grievancesEscalated ?? '0'}</div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2"><FileText className="h-4 w-4 text-sky-500" /> Directive Compliance</h4>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Total Directions</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.directionsReceived ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-emerald-50 border-l-4 border-emerald-200">
                          <div className="text-xs text-slate-500">Complied</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.directionsComplied ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-amber-50 border-l-4 border-amber-200">
                          <div className="text-xs text-slate-500">Pending</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.directionsPending ?? '0'}</div>
                        </div>
                        <div className="p-2 rounded-md bg-gradient-to-br from-white to-slate-50 border-l-4 border-slate-200">
                          <div className="text-xs text-slate-500">Days Pending</div>
                          <div className="text-base font-semibold text-slate-800">{selectedContractor?.directionsDaysPending ?? '—'}</div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 sm:px-6 sm:py-4 border-t flex justify-end gap-3 bg-white">
                <button className="px-3 py-1.5 bg-white border rounded-md text-sm text-slate-700 hover:bg-slate-50" onClick={() => setModalOpen(false)}>Close</button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700" onClick={() => setModalOpen(false)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
