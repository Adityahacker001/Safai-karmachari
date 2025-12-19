'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StatCard from '@/components/ui/stat-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck, Building2, Shield, ArrowLeft, Users, CheckCircle, AlertTriangle, FileCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ComplianceChecklistPage() {

  const [loading, setLoading] = useState(true);
  const [selectedContractor, setSelectedContractor] = useState<{id: string; name: string; lastAudit: string; status: string} | null>(null);
  const contractors = [
    { id: "C-123", name: "ABC Sanitation", lastAudit: "2025-07-15", status: "Compliant" },
    { id: "C-124", name: "City Maintenance", lastAudit: "2025-06-20", status: "Compliant" },
    { id: "C-125", name: "Rail Clean Services", lastAudit: "2025-07-22", status: "Compliant" },
    { id: "C-126", name: "Municipal Services", lastAudit: "2025-05-10", status: "Action Required" },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {selectedContractor ? (
        <div>
          <Button
            variant="ghost"
            onClick={() => setSelectedContractor(null)}
            className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contractor List
          </Button>
          <Card className={cn(contractorTheme.card.container)}>
            <CardHeader className={cn(contractorTheme.card.header)}>
              <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-4 text-3xl md:text-4xl")}>
                <ShieldCheck className="h-9 w-9" />
                <span>Compliance Checklist: {selectedContractor.name}</span>
              </CardTitle>
              <CardDescription className={cn(contractorTheme.card.description)}>
                Verify each item based on records and on-site inspection.
              </CardDescription>
            </CardHeader>
            <CardContent className={cn(contractorTheme.card.content)}>
              <div className="space-y-12">
                <div className={cn(contractorTheme.card.section)}>
                    <h3 className="font-semibold flex items-center text-xl mb-6 pb-4 border-b border-blue-200 text-blue-800"><Building2 className="h-6 w-6 mr-3"/>Contractor Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between"><Label htmlFor="check1" className={cn(contractorTheme.form.label, "text-base")}>Valid License & Insurance</Label><Checkbox id="check1"/></div>
                      <div className="flex items-center justify-between"><Label htmlFor="check2" className={cn(contractorTheme.form.label, "text-base")}>Timely Salary Disbursement Records</Label><Checkbox id="check2"/></div>
                      <div className="flex items-center justify-between"><Label htmlFor="check3" className={cn(contractorTheme.form.label, "text-base")}>Grievance Resolution SLA (48hrs)</Label><Checkbox id="check3"/></div>
                      <div className="flex items-center justify-between"><Label htmlFor="check4" className={cn(contractorTheme.form.label, "text-base")}>Maintains Worker Training Records</Label><Checkbox id="check4"/></div>
                    </div>
                </div>

                 <div className={cn(contractorTheme.card.section, "from-white to-purple-50")}>
                    <h3 className="font-semibold flex items-center text-xl mb-6 pb-4 border-b border-purple-200 text-purple-800"><Shield className="h-6 w-6 mr-3"/>Safety & PPE Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between"><Label htmlFor="check5" className={cn(contractorTheme.form.label, "text-base")}>Adequate PPE Stock Available</Label><Checkbox id="check5"/></div>
                      <div className="flex items-center justify-between"><Label htmlFor="check6" className={cn(contractorTheme.form.label, "text-base")}>Maintains PPE Distribution Logs</Label><Checkbox id="check6"/></div>
                      <div className="flex items-center justify-between"><Label htmlFor="check7" className={cn(contractorTheme.form.label, "text-base")}>Safety Equipment (Gas Detectors, etc.) is calibrated</Label><Checkbox id="check7"/></div>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-200">
                   <h3 className="font-semibold text-2xl text-gray-800">Audit Summary</h3>
                   <div className="space-y-4">
                      <div>
                          <Label className={cn(contractorTheme.form.label)}>Overall Compliance Status</Label>
                          <Select required><SelectTrigger className={cn(contractorTheme.form.select)}><SelectValue placeholder="Set final status..." /></SelectTrigger><SelectContent>
                              <SelectItem value="compliant">Fully Compliant</SelectItem>
                              <SelectItem value="partial">Partially Compliant</SelectItem>
                              <SelectItem value="non-compliant">Non-Compliant - Action Required</SelectItem>
                          </SelectContent></Select>
                      </div>
                      <div>
                          <Label className={cn(contractorTheme.form.label)}>Audit Notes & Required Actions</Label>
                          <Textarea placeholder="Document any findings, violations, or required corrective actions..." className={cn(contractorTheme.form.input)} />
                      </div>
                   </div>
                   <div className="flex justify-end pt-4">
                      <Button className={cn(contractorTheme.button.primary, "text-base py-3 px-6")}>
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Submit Audit Record
                      </Button>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Contractor Compliance Audit
            </h2>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">Select a contractor from the list to begin an audit.</p>
          </div>

          {/* Summary Cards - Using StatCard Component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatCard
              title="Total Contractors"
              value={contractors.length}
              subtitle={`${contractors.filter(c => c.status === 'Compliant').length} Compliant`}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Compliant"
              value={contractors.filter(c => c.status === 'Compliant').length}
              subtitle="Fully compliant"
              icon={CheckCircle}
              color="green"
            />
            <StatCard
              title="Action Required"
              value={contractors.filter(c => c.status === 'Action Required').length}
              subtitle="Need attention"
              icon={AlertTriangle}
              color="amber"
            />
            <StatCard
              title="Recent Audits"
              value={contractors.filter(c => new Date(c.lastAudit) > new Date('2025-07-01')).length}
              subtitle="This month"
              icon={FileCheck}
              color="purple"
            />
          </div>
          <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
              <CardTitle className="text-xl font-bold">Contractor List</CardTitle>
              <CardDescription className="text-blue-100">List of all contractors in your zone</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Contractor Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Last Audit</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Status</TableHead>
                    <TableHead className="text-right text-gray-700 font-semibold py-4 px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {contractors.map((contractor, index) => (
                    <TableRow key={contractor.id} className={cn(
                      "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-l-4",
                      contractor.status === 'Compliant' 
                        ? "border-l-green-400 hover:border-l-green-500" 
                        : "border-l-red-400 hover:border-l-red-500",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}>
                      <TableCell className="font-medium text-gray-900 py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            contractor.status === 'Compliant' ? "bg-green-400" : "bg-red-400"
                          )}></div>
                          <span>{contractor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 py-4 px-6">{contractor.lastAudit}</TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge className={cn(
                          'text-white font-medium px-3 py-1 rounded-full shadow-sm',
                          contractor.status === 'Compliant' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        )}>
                          {contractor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200" 
                          onClick={() => setSelectedContractor(contractor)}
                        >
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Start Audit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}