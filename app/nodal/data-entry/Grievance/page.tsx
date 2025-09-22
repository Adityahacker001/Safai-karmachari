"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, UploadCloud, ShieldCheck } from "lucide-react";

export default function GrievanceResolutionForm() {
  const [status, setStatus] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      {/* Header at the very top, full width */}
  <div className="mb-20">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">Grievance Resolution Form</h1>
        <p className="text-gray-600 mt-1 text-base sm:text-lg">Nodal Officer panel for verifying, documenting, and resolving grievances</p>
      </div>
  <Card className="w-full max-w-5xl mx-auto shadow-xl border border-gray-200 rounded-xl bg-white">
  <CardContent className="space-y-4 py-4">

          {/* Case Information */}
          <section>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Case Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="grievanceId">Grievance ID</Label>
                <Input id="grievanceId" placeholder="e.g., GRV-2024-001" />
              </div>
              <div>
                <Label htmlFor="date">Date of Submission</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="category">Category of Grievance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unsafe">Unsafe Conditions</SelectItem>
                    <SelectItem value="ppe">Lack of PPE</SelectItem>
                    <SelectItem value="wage">Wage/Payment Delay</SelectItem>
                    <SelectItem value="abuse">Verbal/Physical Abuse</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zone">Zone / Location</Label>
                <Input id="zone" placeholder="e.g., East Delhi Zone" />
              </div>
            </div>
          </section>

          {/* Reporter Details */}
          <section>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Reporter Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="workerName">Worker Name</Label>
                <Input id="workerName" placeholder="Enter name if not anonymous" />
              </div>
              <div>
                <Label htmlFor="workerId">Worker ID</Label>
                <Input id="workerId" placeholder="e.g., WRK-1234" />
              </div>
            </div>
          </section>

          {/* Incident Verification */}
          <section>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Incident Verification</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="verifyDate">Verification Date</Label>
                <Input id="verifyDate" type="date" />
              </div>
              <div>
                <Label htmlFor="officerName">Verification Officer</Label>
                <Input id="officerName" placeholder="Officer Name & ID" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="evidence">Evidence Upload</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" className="flex items-center space-x-2">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Files</span>
                </Button>
                <span className="text-xs text-gray-500">Photos, videos, or reports</span>
              </div>
            </div>
          </section>

          {/* Resolution Workflow */}
          <section>
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Resolution Workflow</h3>
            <div>
              <Label htmlFor="actionNotes">Resolution Notes</Label>
              <Textarea id="actionNotes" placeholder="Document findings, corrective actions..." />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label htmlFor="status">Final Status</Label>
                <Select onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resolutionDate">Resolution Date</Label>
                <Input id="resolutionDate" type="date" />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end pt-6">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6 py-3 text-base font-semibold shadow-lg">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Submit Resolution
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
