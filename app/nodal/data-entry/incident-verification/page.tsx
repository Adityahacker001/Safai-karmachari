"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertTriangle,
  ClipboardCheck,
  FileText,
  User,
  Building,
  ArrowLeft,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function IncidentVerificationPage() {
  // State to manage which incident is currently being verified
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [currentTab, setCurrentTab] = useState("All");

  // Mock data for the incidents list
  const incidents = [
    {
      id: "INC-001",
      reportedDate: "2025-09-05",
      type: "Safety Violation",
      description:
        "Worker reported lack of safety gloves for handling chemical waste.",
      worker: "Ram Singh",
      contractor: "ABC Sanitation",
      status: "Pending Verification",
    },
    {
      id: "INC-002",
      reportedDate: "2025-09-03",
      type: "Wage Dispute",
      description: "Worker claims non-payment for 15 days of overtime.",
      worker: "Sita Devi",
      contractor: "City Maintenance",
      status: "Pending Verification",
    },
    {
      id: "INC-003",
      reportedDate: "2025-09-01",
      type: "Equipment Failure",
      description:
        "Sewer cleaning machine malfunctioned, no replacement provided.",
      worker: "Amit Kumar",
      contractor: "Municipal Services",
      status: "Verified",
    },
  ];

  const incidentTypes = ["All", ...new Set(incidents.map((inc) => inc.type))];

  const filteredIncidents =
    currentTab === "All"
      ? incidents
      : incidents.filter((inc) => inc.type === currentTab);

  return (
    <div className="space-y-6">
      {selectedIncident ? (
        <div>
          <Button
            variant="ghost"
            onClick={() => setSelectedIncident(null)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Incident List
          </Button>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">
                Verification for Incident: {selectedIncident.id}
              </CardTitle>
              <CardDescription>{selectedIncident.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50/50">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="font-semibold mr-2">Worker:</span>
                  <span className="ml-2">{selectedIncident.worker}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="font-semibold mr-2">Contractor:</span>
                  <span className="ml-2">{selectedIncident.contractor}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center border-b pb-2">
                  Verification Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="verificationDate">Verification Date</Label>
                    <Input
                      id="verificationDate"
                      type="date"
                      defaultValue={new Date().toISOString().substring(0, 10)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="verificationMethod">
                      Verification Method
                    </Label>
                    <Select required>
                      <SelectTrigger id="verificationMethod">
                        <SelectValue placeholder="Select method..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-Site Visit</SelectItem>
                        <SelectItem value="doc-review">
                          Document Review
                        </SelectItem>
                        <SelectItem value="interview">Interviews</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center border-b pb-2">
                  Verification Summary & Findings
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary of Findings</Label>
                  <Textarea
                    id="summary"
                    placeholder="Detail the steps taken for verification and the findings. Include references to any evidence collected."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Update Incident Status</Label>
                  <Select required>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Set final status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">
                        Verified - Action Required
                      </SelectItem>
                      <SelectItem value="unfounded">
                        Unfounded / No Action
                      </SelectItem>
                      <SelectItem value="escalated">
                        Escalate to District Officer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Submit Verification Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Incident Verification
            </h2>
            <p className="text-gray-600">
              Select an incident from the list to begin verification.
            </p>
          </div>

          <Tabs
            defaultValue="All"
            className="mt-6"
            onValueChange={setCurrentTab}
            value={currentTab}
          >
            <TabsList>
              {incidentTypes.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>
                  {currentTab === "All"
                    ? "All Incidents"
                    : `${currentTab} Incidents`}
                </CardTitle>
                <CardDescription>
                  List of reported incidents. Click a row to verify.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow
                        key={incident.id}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">
                          {incident.id}
                        </TableCell>
                        <TableCell>{incident.type}</TableCell>
                        <TableCell>{incident.worker}</TableCell>
                        <TableCell>{incident.contractor}</TableCell>
                        <TableCell>{incident.reportedDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              incident.status === "Pending Verification"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIncident(incident)}
                          >
                            Verify
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      )}
    </div>
  );
}