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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, XCircle, FileText } from "lucide-react";

export default function DistrictGrievanceForm() {
  const [decision, setDecision] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [closureDeadline, setClosureDeadline] = useState("");
  const [finalRemarks, setFinalRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // You can add API call or further logic here
  };

  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
            District Grievance Review Form
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg">
            District Officer panel to review escalated grievances and finalize resolution
          </p>
        </div>
      </header>
      <Card className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8 md:space-y-10">
          <form onSubmit={handleSubmit}>
          {/* Case Information (Auto-filled from Nodal Officer) */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-blue-700 mb-3 sm:mb-4 border-l-4 border-blue-500 pl-3">
              Escalated Case Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Grievance ID</Label>
                <Input
                  value="GRV-2024-012"
                  disabled
                  className="bg-gray-50 text-xs sm:text-sm"
                />
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Date of Escalation</Label>
                <Input value="2024-01-28" disabled className="bg-gray-50 text-xs sm:text-sm" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Reported By</Label>
                <Input value="Abishek Kumar (Worker)" disabled className="bg-gray-50 text-xs sm:text-sm" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Zone / Location</Label>
                <Input value="North Zone Depot #3" disabled className="bg-gray-50 text-xs sm:text-sm" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Label className="text-xs sm:text-sm font-medium text-gray-700">Nodal Officer Notes</Label>
              <Textarea
                value="Verified unsafe working condition, barricades missing. Escalated for district-level action."
                disabled
                className="bg-gray-50 text-xs sm:text-sm"
              />
            </div>
          </section>

          {/* District Officer Review */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-purple-700 mb-3 sm:mb-4 border-l-4 border-purple-500 pl-3">
              District Officer Review
            </h3>
            <div>
              <Label htmlFor="reviewNotes" className="text-xs sm:text-sm font-medium text-gray-700">Review Notes</Label>
              <Textarea
                id="reviewNotes"
                placeholder="Enter your review findings and observations..."
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                className="text-xs sm:text-sm"
              />
            </div>
          </section>

          {/* Action Taken */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-green-700 mb-3 sm:mb-4 border-l-4 border-green-500 pl-3">
              Action & Final Decision
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Action Taken</Label>
                <Select value={decision} onValueChange={val => setDecision(val)}>
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve Resolution</SelectItem>
                    <SelectItem value="reject">Reject & Reopen</SelectItem>
                    <SelectItem value="disciplinary">Initiate Disciplinary Action</SelectItem>
                    <SelectItem value="contractor">Direct Contractor to Act</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700">Closure Deadline</Label>
                <Input type="date" value={closureDeadline} onChange={e => setClosureDeadline(e.target.value)} className="text-xs sm:text-sm" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <Label className="text-xs sm:text-sm font-medium text-gray-700">Final Remarks</Label>
              <Textarea placeholder="Write final remarks for closure or follow-up..." value={finalRemarks} onChange={e => setFinalRemarks(e.target.value)} className="text-xs sm:text-sm" />
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row justify-end pt-4 sm:pt-6 gap-2 sm:gap-3 md:gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border border-red-500 text-red-600 hover:bg-red-50 text-xs sm:text-sm md:text-base"
              onClick={() => setSubmitted(false)}
            >
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Reject
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-lg flex items-center justify-center"
              onClick={() => alert('Escalated to State!')}
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Escalate to State
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Approve & Close
            </Button>
          </div>
          {submitted && (
            <div className="mt-6 text-green-700 font-semibold text-center">Form submitted successfully!</div>
          )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
