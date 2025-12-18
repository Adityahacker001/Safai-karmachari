'use client';

import React from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Award, ThumbsDown, Eye, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DistrictPerformanceReportPage() {
    // Mock data for district performance in West Bengal
    // Added optional fields used by the Monthly Summary modal (execSummary, actions, and incident breakdowns)
    const districts = [
      { name: "Kolkata", score: 94, incidents: 8, grievances: 5, fatalities: 0, resolutionTime: "24 Hours", status: "Excellent", openWarnings: 1, mechanization: 78, welfareCompliance: 92, sewerDeaths: 0, hazardousIncidents: 1, manualScavenging: 0, injuries: 2, compCases: 1, execSummary: "Stable performance with targeted mechanization efforts.", actions: [{ date: '2025-10-01', issuedBy: 'DA Kolkata', severity: 'Low', description: 'PPE distribution and refresher training completed.' }] },
      { name: "Jalpaiguri", score: 91, incidents: 4, grievances: 2, fatalities: 0, resolutionTime: "22 Hours", status: "Excellent", openWarnings: 0, mechanization: 65, welfareCompliance: 88, sewerDeaths: 0, hazardousIncidents: 0, manualScavenging: 0, injuries: 0, compCases: 0, execSummary: "Good compliance; continue monitoring high-risk pockets.", actions: [{ date: '2025-09-25', issuedBy: 'DA Jalpaiguri', severity: 'Low', description: 'Spot checks and PPE audits performed.' }] },
      { name: "Purba Bardhaman", score: 88, incidents: 10, grievances: 8, fatalities: 0, resolutionTime: "30 Hours", status: "Good", openWarnings: 2, mechanization: 52, welfareCompliance: 80, sewerDeaths: 0, hazardousIncidents: 2, manualScavenging: 0, injuries: 3, compCases: 2, execSummary: "Improving but needs faster grievance resolution.", actions: [{ date: '2025-09-20', issuedBy: 'DA Purba Bardhaman', severity: 'Medium', description: 'Focused mechanization pilot launched.' }] },
      { name: "Howrah", score: 85, incidents: 15, grievances: 12, fatalities: 0, resolutionTime: "36 Hours", status: "Good", openWarnings: 3, mechanization: 45, welfareCompliance: 75, sewerDeaths: 0, hazardousIncidents: 4, manualScavenging: 0, injuries: 5, compCases: 3, execSummary: "High incident volume in industrial zones; prioritized interventions underway.", actions: [{ date: '2025-09-10', issuedBy: 'DA Howrah', severity: 'High', description: 'Zone-level safety audits and immediate corrective orders.' }] },
      { name: "South 24 Parganas", score: 78, incidents: 25, grievances: 18, fatalities: 1, resolutionTime: "45 Hours", status: "Needs Improvement", openWarnings: 6, mechanization: 32, welfareCompliance: 60, sewerDeaths: 1, hazardousIncidents: 10, manualScavenging: 1, injuries: 12, compCases: 8, execSummary: "Significant risks identified; fatalities reported — escalated for urgent action.", actions: [{ date: '2025-08-30', issuedBy: 'DA South 24 Parganas', severity: 'High', description: 'Emergency task force constituted and immediate PPE procurement ordered.' }] },
      { name: "Murshidabad", score: 76, incidents: 22, grievances: 20, fatalities: 0, resolutionTime: "52 Hours", status: "Needs Improvement", openWarnings: 5, mechanization: 28, welfareCompliance: 58, sewerDeaths: 0, hazardousIncidents: 8, manualScavenging: 0, injuries: 10, compCases: 6, execSummary: "Resource constraints and training gaps impacting performance.", actions: [{ date: '2025-08-15', issuedBy: 'DA Murshidabad', severity: 'Medium', description: 'Training schedule and procurement plan proposed.' }] },
    ];

      // IntegratedLoader (inline copy) — do not modify anything else in this file
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

      const [loading, setLoading] = React.useState(true);
      React.useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
      }, []);

      if (loading) return <IntegratedLoader />;

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8")}>
      <div className="rounded-2xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">District Performance Report</h2>
            <p className="text-sm text-white/90">Analyze and compare operational performance across all districts in West Bengal.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-0 justify-end">
        <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Performance Data</Button>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        {/* Stronger, harder header color per request */}
        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg rounded-2xl">
            <CardTitle className="text-2xl md:text-3xl font-bold">Master Performance Roster</CardTitle>
            <CardDescription className="text-white/90 mt-2">Detailed metrics aggregated from each district's monthly summary report.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Incidents (30d)</TableHead>
                <TableHead>Open Grievances</TableHead>
                <TableHead>Fatalities (YTD)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((d) => (
                <TableRow key={d.name}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">{d.score}%</TableCell>
                  <TableCell className={`text-center font-semibold ${d.incidents > 20 ? 'text-red-600' : ''}`}>{d.incidents}</TableCell>
                  <TableCell className="text-center">{d.grievances}</TableCell>
                  <TableCell className={`text-center font-bold ${d.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{d.fatalities}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild><Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View Submitted Report</Button></DialogTrigger>
                      <DialogContent className="p-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-xl border-0 max-w-4xl w-[85vw] mx-auto">
                        {/* Gradient header */}
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-4 rounded-t-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white text-2xl font-bold drop-shadow">Monthly Summary: {d.name}</DialogTitle>
                            <DialogDescription className="text-blue-100">Read-only view of the official report submitted by the District Administrator.</DialogDescription>
                          </DialogHeader>
                        </div>

                        {/* Scrollable content area */}
                        <div className="px-6 py-6 space-y-6 text-base max-h-[70vh] overflow-y-auto">
                          {/* 1. Summary Metrics (KPI cards) */}
                          <section>
                            <h4 className="text-lg font-semibold mb-3">Summary Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Overall Compliance Score</div>
                                <div className="text-xl font-extrabold text-purple-700">{d.score}%</div>
                              </div>
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Total Incidents (30d)</div>
                                <div className="text-xl font-extrabold text-gray-900">{d.incidents}</div>
                              </div>
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Fatalities (YTD)</div>
                                <div className="text-xl font-extrabold text-red-600">{d.fatalities}</div>
                              </div>
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Open Audit Warnings</div>
                                <div className="text-xl font-extrabold text-gray-900">{d.openWarnings ?? 0}</div>
                              </div>
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Mechanization Adoption %</div>
                                <div className="text-xl font-extrabold text-gray-900">{d.mechanization ?? '—'}%</div>
                              </div>
                              <div className="rounded-lg p-3 bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Worker Welfare Compliance %</div>
                                <div className="text-xl font-extrabold text-gray-900">{d.welfareCompliance ?? '—'}%</div>
                              </div>
                            </div>
                          </section>

                          {/* 2. Incident Breakdown Table */}
                          <section>
                            <h4 className="text-lg font-semibold mb-3">Incident Breakdown</h4>
                            <div className="bg-white border rounded-lg overflow-x-auto">
                              <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left">Category</th>
                                    <th className="px-4 py-2 text-left">Count</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-t">
                                    <td className="px-4 py-3">Sewer Deaths</td>
                                    <td className="px-4 py-3">{d.sewerDeaths ?? 0}</td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="px-4 py-3">Hazardous Cleaning Incidents</td>
                                    <td className="px-4 py-3">{d.hazardousIncidents ?? 0}</td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="px-4 py-3">Manual Scavenging Deaths</td>
                                    <td className="px-4 py-3">{d.manualScavenging ?? 0}</td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="px-4 py-3">Worker Injuries</td>
                                    <td className="px-4 py-3">{d.injuries ?? 0}</td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="px-4 py-3">Compensation Cases Filed</td>
                                    <td className="px-4 py-3">{d.compCases ?? 0}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </section>

                          {/* 3. Executive Summary */}
                          <section>
                            <h4 className="text-lg font-semibold mb-3">Executive Summary</h4>
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                              <p className="text-gray-800">{d.execSummary || `No executive summary provided for ${d.name}.`}</p>
                            </div>
                          </section>

                          {/* 4. Detailed Actions Taken */}
                          <section>
                            <h4 className="text-lg font-semibold mb-3">Actions Taken</h4>
                            <div className="space-y-3">
                              {(d.actions && d.actions.length > 0) ? (
                                d.actions.map((a: any, i: number) => (
                                  <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                      <div><span className="font-medium">Action Date:</span> {a.date || '—'}</div>
                                      <div><span className="font-medium">Issued By:</span> {a.issuedBy || '—'}</div>
                                      <div><span className="font-medium">Severity:</span> <span className={`px-2 py-0.5 rounded-full text-xs ${a.severity === 'High' ? 'bg-red-100 text-red-700' : a.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>{a.severity || 'Low'}</span></div>
                                    </div>
                                    <div className="text-gray-800">{a.description || 'No description provided.'}</div>
                                  </div>
                                ))
                              ) : (
                                <div className="bg-white border rounded-lg p-4 shadow-sm text-gray-600">No actions recorded.</div>
                              )}
                            </div>
                          </section>

                          {/* 5. Recommendations */}
                          <section>
                            <h4 className="text-lg font-semibold mb-3">Recommendations</h4>
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                                <li>Highlight low-performing zones and assign corrective leads.</li>
                                <li>Implement targeted training to close skill gaps.</li>
                                <li>Increase mechanization and PPE provisioning in high-risk areas.</li>
                                <li>Schedule follow-up audits and monitor corrective action timelines.</li>
                              </ul>
                            </div>
                          </section>
                        </div>
                        {/* end scrollable content */}
                      </DialogContent>
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