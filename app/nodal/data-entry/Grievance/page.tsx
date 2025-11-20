"use client";

import React, { useState, useEffect } from "react";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
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
import StatCard from '@/components/ui/stat-card';
import { Calendar, UploadCloud, ShieldCheck, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function GrievanceResolutionForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }

  // Mock data for statistics
  const grievanceStats = {
    total: 47,
    pending: 12,
    resolved: 28,
    escalated: 7
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Grievance Resolution Form
        </h1>
        <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
          Nodal Officer panel for verifying, documenting, and resolving grievances
        </p>
      </div>

      {/* Summary Cards - Using StatCard Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title="Total Grievances"
          value={grievanceStats.total}
          subtitle="This month"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Pending Review"
          value={grievanceStats.pending}
          subtitle="Awaiting action"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Resolved"
          value={grievanceStats.resolved}
          subtitle="Successfully closed"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Escalated"
          value={grievanceStats.escalated}
          subtitle="Higher authority"
          icon={AlertCircle}
          color="red"
        />
      </div>
      <Card className="w-full max-w-5xl mx-auto shadow-lg rounded-2xl bg-white">
        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* Case Information */}
          <section>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Case Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="grievanceId" className="text-sm font-semibold text-slate-700">Grievance ID</Label>
                <Input id="grievanceId" placeholder="e.g., GRV-2024-001" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-semibold text-slate-700">Date of Submission</Label>
                <Input id="date" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="category" className="text-sm font-semibold text-slate-700">Category of Grievance</Label>
                <Select>
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="zone" className="text-sm font-semibold text-slate-700">Zone / Location</Label>
                <Input id="zone" placeholder="e.g., East Delhi Zone" className="mt-1" />
              </div>
            </div>
          </section>

          {/* Reporter Details */}
          <section>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Reporter Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="workerName" className="text-sm font-semibold text-slate-700">Worker Name</Label>
                <Input id="workerName" placeholder="Enter name if not anonymous" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="workerId" className="text-sm font-semibold text-slate-700">Worker ID</Label>
                <Input id="workerId" placeholder="e.g., WRK-1234" className="mt-1" />
              </div>
            </div>
          </section>

          {/* Incident Verification */}
          <section>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Incident Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="verifyDate" className="text-sm font-semibold text-slate-700">Verification Date</Label>
                <Input id="verifyDate" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="officerName" className="text-sm font-semibold text-slate-700">Verification Officer</Label>
                <Input id="officerName" placeholder="Officer Name & ID" className="mt-1" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="evidence" className="text-sm font-semibold text-slate-700">Evidence Upload</Label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
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
            <div className="mb-4">
              <Label htmlFor="actionNotes" className="text-sm font-semibold text-slate-700">Resolution Notes</Label>
              <Textarea id="actionNotes" placeholder="Document findings, corrective actions..." className="mt-1" rows={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="status" className="text-sm font-semibold text-slate-700">Final Status</Label>
                <Select onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="resolutionDate" className="text-sm font-semibold text-slate-700">Resolution Date</Label>
                <Input id="resolutionDate" type="date" className="mt-1" />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6 py-3 text-sm sm:text-base font-semibold shadow-lg">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Submit Resolution
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

