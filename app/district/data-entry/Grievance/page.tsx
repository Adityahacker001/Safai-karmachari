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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      {/* Header outside the form card, top left */}
      <div className="max-w-5xl ml-0 mt-0 mb-10 sm:ml-4 sm:mt-2">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">District Grievance Review Form</h1>
        <p className="text-gray-600 mt-1 text-base sm:text-lg">District Officer panel to review escalated grievances and finalize resolution</p>
      </div>
      <Card className="max-w-5xl mx-auto shadow-xl border border-gray-200 rounded-xl bg-white">
        <CardContent className="space-y-10 py-6">
          <form onSubmit={handleSubmit}>
          {/* Case Information (Auto-filled from Nodal Officer) */}
          <section>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Escalated Case Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Grievance ID</Label>
                <Input
                  value="GRV-2024-012"
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Date of Escalation</Label>
                <Input value="2024-01-28" disabled className="bg-gray-100" />
              </div>
              <div>
                <Label>Reported By</Label>
                <Input value="Abishek Kumar (Worker)" disabled className="bg-gray-100" />
              </div>
              <div>
                <Label>Zone / Location</Label>
                <Input value="North Zone Depot #3" disabled className="bg-gray-100" />
              </div>
            </div>
            <div className="mt-4">
              <Label>Nodal Officer Notes</Label>
              <Textarea
                value="Verified unsafe working condition, barricades missing. Escalated for district-level action."
                disabled
                className="bg-gray-100"
              />
            </div>
          </section>

          {/* District Officer Review */}
          <section>
            <h3 className="text-lg font-semibold text-purple-700 mb-4">
              District Officer Review
            </h3>
            <div>
              <Label htmlFor="reviewNotes">Review Notes</Label>
              <Textarea
                id="reviewNotes"
                placeholder="Enter your review findings and observations..."
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
              />
            </div>
          </section>

          {/* Action Taken */}
          <section>
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Action & Final Decision
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Action Taken</Label>
                <Select value={decision} onValueChange={val => setDecision(val)}>
                  <SelectTrigger>
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
                <Label>Closure Deadline</Label>
                <Input type="date" value={closureDeadline} onChange={e => setClosureDeadline(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <Label>Final Remarks</Label>
              <Textarea placeholder="Write final remarks for closure or follow-up..." value={finalRemarks} onChange={e => setFinalRemarks(e.target.value)} />
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end pt-6 space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center px-6 py-3 border border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => setSubmitted(false)}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Reject
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 px-6 py-3 text-base font-semibold shadow-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
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
