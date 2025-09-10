'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck, Building2, Shield, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ComplianceChecklistPage() {

    // State to manage which contractor is currently being audited
    const [selectedContractor, setSelectedContractor] = useState<any | null>(null);

    // Mock data for the contractors list
    const contractors = [
        { id: "C-123", name: "ABC Sanitation", lastAudit: "2025-07-15", status: "Compliant" },
        { id: "C-124", name: "City Maintenance", lastAudit: "2025-06-20", status: "Compliant" },
        { id: "C-125", name: "Rail Clean Services", lastAudit: "2025-07-22", status: "Compliant" },
        { id: "C-126", name: "Municipal Services", lastAudit: "2025-05-10", status: "Action Required" },
    ];

  return (
    <div className={cn("min-h-screen p-6 md:p-12 space-y-10", contractorTheme.page.formBackground)}>
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
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-700 tracking-tight leading-tight">Contractor Compliance Audit</h2>
            <p className="text-gray-500 mt-3 text-xl">Select a contractor from the list to begin an audit.</p>
          </div>
          <Card className={cn("mt-10", contractorTheme.table.container)}>
            <CardHeader className={cn(contractorTheme.table.header)}>
              <CardTitle className={cn(contractorTheme.table.headerTitle)}>Contractor List</CardTitle>
              <CardDescription className={cn(contractorTheme.table.headerDescription)}>List of all contractors in your zone.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0">
                    <TableHead className="text-gray-600">Contractor Name</TableHead>
                    <TableHead className="text-gray-600">Last Audit</TableHead>
                    <TableHead className="text-gray-600">Status</TableHead>
                    <TableHead className="text-right text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {contractors.map((contractor) => (
                    <TableRow key={contractor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{contractor.name}</TableCell>
                      <TableCell>{contractor.lastAudit}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          'text-white',
                          contractor.status === 'Compliant' ? 'bg-green-500' : 'bg-red-500'
                        )}>
                          {contractor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button className={cn(contractorTheme.button.primary, "text-sm py-2 px-4")} onClick={() => setSelectedContractor(contractor)}>
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