'use client';

import React from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ShieldCheck, AlertTriangle, FileText, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function IntegratedLoader() {
  return (
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
}

export default function StateComplianceReportPage() {
    // Mock data for district compliance in West Bengal (expanded details)
    const districts = [
        {
          name: "Kolkata",
          score: 94,
          warnings: 0,
          incidents: 8,
          status: "Excellent",
          reportingMonth: 'Oct 2025',
          officer: { name: 'R. Sen', contact: '033-1234-5678' },
          openAuditWarnings: 0,
          warningsResolved: 1,
          pendingComplianceIssues: 0,
          lastAudit: '2025-09-20',
          riskLevel: 'Low',
          totals: {
            totalIncidents30d: 8,
            manualScavenging: 0,
            sewerDeaths: 1,
            hazardousExposure: 0,
            injuries: 2,
            firsFiled: 3,
            investigationsCompleted: 5,
            investigationsPending: 1,
          },
          compensation: {
            sanctioned: 600000,
            released: 300000,
            pendingCases: 2,
            avgProcessingDays: 25,
          },
          safety: {
            gearIssuedPct: 88,
            trainingCompletedPct: 76,
            pendingSafetyKits: 12,
            awarenessPrograms: 3,
          },
          shg: {
            active: 12,
            score: 91,
            pendingDocs: 2,
            siteInspections: 10,
          },
          directives: {
            received: 4,
            complied: 3,
            pending: 1,
            remarks: 'All major directives addressed.'
          },
          documents: {
            monthlyReport: '#',
            auditNotes: '#',
            incidentLogs: '#',
            certificates: '#'
          },
          lastUpdated: '03-12-2025 11:23'
        },
        {
          name: "South 24 Parganas",
          score: 78,
          warnings: 5,
          incidents: 25,
          status: "Needs Improvement",
          reportingMonth: 'Oct 2025',
          officer: { name: 'A. Roy', contact: '032-9876-5432' },
          openAuditWarnings: 5,
          warningsResolved: 0,
          pendingComplianceIssues: 6,
          lastAudit: '2025-10-01',
          riskLevel: 'High',
          totals: {
            totalIncidents30d: 25,
            manualScavenging: 3,
            sewerDeaths: 4,
            hazardousExposure: 2,
            injuries: 12,
            firsFiled: 8,
            investigationsCompleted: 10,
            investigationsPending: 7,
          },
          compensation: {
            sanctioned: 1200000,
            released: 450000,
            pendingCases: 9,
            avgProcessingDays: 42,
          },
          safety: {
            gearIssuedPct: 62,
            trainingCompletedPct: 50,
            pendingSafetyKits: 40,
            awarenessPrograms: 1,
          },
          shg: {
            active: 6,
            score: 68,
            pendingDocs: 8,
            siteInspections: 3,
          },
          directives: {
            received: 5,
            complied: 2,
            pending: 3,
            remarks: 'Follow-up required on pending directives.'
          },
          documents: {
            monthlyReport: '#',
            auditNotes: '#',
            incidentLogs: '#',
            certificates: '#'
          },
          lastUpdated: '02-12-2025 15:48'
        },
        // fallback simple entries for other districts
        { name: "Jalpaiguri", score: 91, warnings: 1, incidents: 4, status: "Good", reportingMonth: 'Oct 2025', officer: { name: 'N/A', contact: '-' }, openAuditWarnings:0, warningsResolved:0, pendingComplianceIssues:0, lastAudit:'2025-09-10', riskLevel:'Low', totals:{totalIncidents30d:4,manualScavenging:0,sewerDeaths:0,hazardousExposure:0,injuries:0,firsFiled:0,investigationsCompleted:0,investigationsPending:0}, compensation:{sanctioned:0,released:0,pendingCases:0,avgProcessingDays:0}, safety:{gearIssuedPct:0,trainingCompletedPct:0,pendingSafetyKits:0,awarenessPrograms:0}, shg:{active:0,score:0,pendingDocs:0,siteInspections:0}, directives:{received:0,complied:0,pending:0,remarks:''}, documents:{monthlyReport:'#',auditNotes:'#',incidentLogs:'#',certificates:'#'}, lastUpdated:'01-12-2025 10:00' },
        { name: "Purba Bardhaman", score: 88, warnings: 1, incidents: 10, status: "Good", reportingMonth: 'Oct 2025', officer:{name:'N/A',contact:'-'}, openAuditWarnings:0, warningsResolved:0, pendingComplianceIssues:0, lastAudit:'2025-09-05', riskLevel:'Low', totals:{totalIncidents30d:10,manualScavenging:0,sewerDeaths:0,hazardousExposure:0,injuries:1,firsFiled:0,investigationsCompleted:0,investigationsPending:0}, compensation:{sanctioned:0,released:0,pendingCases:0,avgProcessingDays:0}, safety:{gearIssuedPct:0,trainingCompletedPct:0,pendingSafetyKits:0,awarenessPrograms:0}, shg:{active:0,score:0,pendingDocs:0,siteInspections:0}, directives:{received:0,complied:0,pending:0,remarks:''}, documents:{monthlyReport:'#',auditNotes:'#',incidentLogs:'#',certificates:'#'}, lastUpdated:'01-12-2025 09:00' },
        { name: "Howrah", score: 85, warnings: 2, incidents: 15, status: "Good", reportingMonth: 'Oct 2025', officer:{name:'N/A',contact:'-'}, openAuditWarnings:1, warningsResolved:0, pendingComplianceIssues:1, lastAudit:'2025-09-15', riskLevel:'Medium', totals:{totalIncidents30d:15,manualScavenging:1,sewerDeaths:0,hazardousExposure:0,injuries:3,firsFiled:1,investigationsCompleted:2,investigationsPending:1}, compensation:{sanctioned:0,released:0,pendingCases:0,avgProcessingDays:0}, safety:{gearIssuedPct:0,trainingCompletedPct:0,pendingSafetyKits:0,awarenessPrograms:0}, shg:{active:0,score:0,pendingDocs:0,siteInspections:0}, directives:{received:0,complied:0,pending:0,remarks:''}, documents:{monthlyReport:'#',auditNotes:'#',incidentLogs:'#',certificates:'#'}, lastUpdated:'30-11-2025 16:00' },
        { name: "Murshidabad", score: 76, warnings: 4, incidents: 22, status: "Needs Improvement", reportingMonth: 'Oct 2025', officer:{name:'N/A',contact:'-'}, openAuditWarnings:2, warningsResolved:0, pendingComplianceIssues:2, lastAudit:'2025-09-28', riskLevel:'Medium', totals:{totalIncidents30d:22,manualScavenging:2,sewerDeaths:1,hazardousExposure:1,injuries:5,firsFiled:2,investigationsCompleted:4,investigationsPending:2}, compensation:{sanctioned:0,released:0,pendingCases:0,avgProcessingDays:0}, safety:{gearIssuedPct:0,trainingCompletedPct:0,pendingSafetyKits:0,awarenessPrograms:0}, shg:{active:0,score:0,pendingDocs:0,siteInspections:0}, directives:{received:0,complied:0,pending:0,remarks:''}, documents:{monthlyReport:'#',auditNotes:'#',incidentLogs:'#',certificates:'#'}, lastUpdated:'29-11-2025 12:00' }
    ];

    const [loading, setLoading] = React.useState(true);
    const [selectedDistrict, setSelectedDistrict] = React.useState<any>(null);

    React.useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(t);
    }, []);

    if (loading) return <IntegratedLoader />;

    // small helper to format INR numbers
    const formatINR = (n?: number) => (n ? n.toLocaleString('en-IN') : '0');

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8")}>
      <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">State Compliance Report (West Bengal)</h2>
            <p className="text-sm text-white/90">Analyze compliance data aggregated from all district-level reports.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-0 justify-end">
        <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export State Summary</Button>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        {/* Use a stronger, harder gradient for the header to match requested look */}
        <CardHeader className="rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 md:p-8 bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Master Compliance Roster (West Bengal)</CardTitle>
            <CardDescription className="text-white/90 mt-2">Detailed compliance metrics aggregated from each district's monthly report.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Open Audit Warnings</TableHead>
                <TableHead>Total Incidents (30d)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((d) => (
                <TableRow key={d.name}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">{d.score}%</TableCell>
                  <TableCell className={`text-center font-semibold ${d.warnings > 0 ? 'text-orange-600' : ''}`}>{d.warnings}</TableCell>
                  <TableCell className={`text-center font-semibold ${d.incidents > 20 ? 'text-red-600' : ''}`}>{d.incidents}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setSelectedDistrict(d)} className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View District Report</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* District detail modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedDistrict(null)} />
          <div className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">District Overview — {selectedDistrict.name}</h3>
                <div className="text-sm text-gray-600">Reporting: {selectedDistrict.reportingMonth} • Last updated: {selectedDistrict.lastUpdated}</div>
              </div>
              <div>
                <button onClick={() => setSelectedDistrict(null)} className="text-gray-500 hover:text-gray-900">×</button>
              </div>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="p-4 bg-emerald-50 rounded border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-2">1. District Overview</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">District Name</span><span className="font-medium">{selectedDistrict.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Monthly Compliance Score</span><span className="font-medium text-purple-600">{selectedDistrict.score}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Reporting Month</span><span className="font-medium">{selectedDistrict.reportingMonth}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Officer In-Charge</span><span className="font-medium">{selectedDistrict.officer?.name} • {selectedDistrict.officer?.contact}</span></div>
                  </div>
                </section>

                <section className="p-4 bg-yellow-50 rounded border border-yellow-100">
                  <h4 className="font-semibold text-yellow-800 mb-2">2. Audit & Warning Status</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Open Audit Warnings</span><span className="font-medium text-orange-600">{selectedDistrict.openAuditWarnings}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Warnings Resolved This Month</span><span className="font-medium">{selectedDistrict.warningsResolved}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Pending Compliance Issues</span><span className="font-medium text-red-600">{selectedDistrict.pendingComplianceIssues}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Last Audit Date</span><span className="font-medium">{selectedDistrict.lastAudit}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">Risk Level</span>
                      <span>
                        <Badge variant={selectedDistrict.riskLevel === 'High' ? 'destructive' : selectedDistrict.riskLevel === 'Medium' ? 'outline' : 'secondary'}>{selectedDistrict.riskLevel}</Badge>
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="p-4 bg-sky-50 rounded border border-sky-100">
                  <h4 className="font-semibold text-sky-800 mb-2">3. Incident Statistics</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Total Incidents (30 days)</span><span className="font-medium">{selectedDistrict.totals?.totalIncidents30d}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Manual Scavenging Incidents</span><span className="font-medium">{selectedDistrict.totals?.manualScavenging}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Sewer Death Incidents</span><span className="font-medium">{selectedDistrict.totals?.sewerDeaths}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Hazardous Exposure Incidents</span><span className="font-medium">{selectedDistrict.totals?.hazardousExposure}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Injuries Reported</span><span className="font-medium">{selectedDistrict.totals?.injuries}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">FIRs Filed</span><span className="font-medium">{selectedDistrict.totals?.firsFiled}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Investigations Completed</span><span className="font-medium">{selectedDistrict.totals?.investigationsCompleted}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Investigations Pending</span><span className="font-medium">{selectedDistrict.totals?.investigationsPending}</span></div>
                  </div>
                </section>

                <section className="p-4 bg-rose-50 rounded border border-rose-100">
                  <h4 className="font-semibold text-rose-800 mb-2">4. Compensation Status Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Total Compensation Sanctioned</span><span className="font-medium">₹{formatINR(selectedDistrict.compensation?.sanctioned)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Total Compensation Released</span><span className="font-medium">₹{formatINR(selectedDistrict.compensation?.released)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Pending Compensation Cases</span><span className="font-medium">{selectedDistrict.compensation?.pendingCases}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Average Processing Time</span><span className="font-medium">{selectedDistrict.compensation?.avgProcessingDays} days</span></div>
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="p-4 bg-indigo-50 rounded border border-indigo-100">
                  <h4 className="font-semibold text-indigo-800 mb-2">5. Worker Safety & Training Compliance</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Safety Gear Issued (%)</span><span className="font-medium">{selectedDistrict.safety?.gearIssuedPct}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Training Completed (%)</span><span className="font-medium">{selectedDistrict.safety?.trainingCompletedPct}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Pending Safety Kits</span><span className="font-medium">{selectedDistrict.safety?.pendingSafetyKits}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Awareness Programs Conducted</span><span className="font-medium">{selectedDistrict.safety?.awarenessPrograms}</span></div>
                  </div>
                </section>

                <section className="p-4 bg-amber-50 rounded border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-2">6. SHG / Contractor Compliance</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Active SHGs/Contractors</span><span className="font-medium">{selectedDistrict.shg?.active}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Compliance Score</span><span className="font-medium">{selectedDistrict.shg?.score}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Pending Documentation</span><span className="font-medium">{selectedDistrict.shg?.pendingDocs}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Site Inspections Completed</span><span className="font-medium">{selectedDistrict.shg?.siteInspections}</span></div>
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="p-4 bg-violet-50 rounded border border-violet-100">
                  <h4 className="font-semibold text-violet-800 mb-2">7. Policy & Directive Compliance</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Directives Received</span><span className="font-medium">{selectedDistrict.directives?.received}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Directives Complied</span><span className="font-medium">{selectedDistrict.directives?.complied}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Directives Pending</span><span className="font-medium">{selectedDistrict.directives?.pending}</span></div>
                    <div className="pt-2 text-sm text-gray-700">Remarks: {selectedDistrict.directives?.remarks}</div>
                  </div>
                </section>

                <section className="p-4 bg-teal-50 rounded border border-teal-100">
                  <h4 className="font-semibold text-teal-800 mb-2">8. Supporting Documents</h4>
                  <div className="text-sm space-y-2">
                    <div><a href={selectedDistrict.documents?.monthlyReport} className="text-emerald-600 hover:underline">District Monthly Report (PDF)</a></div>
                    <div><a href={selectedDistrict.documents?.auditNotes} className="text-emerald-600 hover:underline">Audit Notes</a></div>
                    <div><a href={selectedDistrict.documents?.incidentLogs} className="text-emerald-600 hover:underline">Incident Logs</a></div>
                    <div><a href={selectedDistrict.documents?.certificates} className="text-emerald-600 hover:underline">Compliance Certificates</a></div>
                  </div>
                </section>
              </div>

              <section className="p-4 bg-slate-50 rounded border border-slate-100">
                <h4 className="font-semibold text-slate-800 mb-1">9. Last Updated</h4>
                <div className="text-sm text-gray-600">{selectedDistrict.lastUpdated}</div>
              </section>

              <div className="flex justify-end">
                <Button onClick={() => setSelectedDistrict(null)} className={cn(contractorTheme.button.secondary)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}