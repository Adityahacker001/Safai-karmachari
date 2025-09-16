'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus, UploadCloud, FileText } from "lucide-react";
import React from "react";

export default function GrievanceEntryPage() {

  // Mock data for workers to select from
  const workers = [
    { id: 'W-C123-001', name: "Ravi Kumar" },
    { id: 'W-C123-002', name: "Sunita Yadav" },
    { id: 'W-C123-003', name: "Amit Patel" },
    { id: 'W-C123-004', name: "Priya Sharma" },
    { id: 'W-C123-005', name: "Mohan Singh" },
  ];

  // Grievance categories
  const grievanceCategories = [
    "Unsafe Conditions",
    "Payment Issues",
    "HR / Leave Issues",
    "Verbal Abuse",
    "Equipment Malfunction",
    "Other",
  ];

  return (
    // Main container with a professional and clean background gradient
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-slate-50 to-blue-100 space-y-10">
      <div className="max-w-full">
        <h3
          className="text-4xl md:text-5xl font-extrabold leading-tight whitespace-normal break-words bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text"
          style={{ WebkitTextFillColor: 'unset', lineHeight: '1.1', paddingBottom: '0.15em', marginBottom: 0 }}
        >
          Log a New Grievance
        </h3>
        <p className="text-gray-600 mt-3 text-xl">Submit a new grievance on behalf of a worker.</p>
      </div>

      <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
        <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
          <CardTitle className="flex items-center space-x-4 text-3xl md:text-4xl font-bold">
            <MessageSquarePlus className="h-9 w-9 text-white" />
            <span>New Grievance Form</span>
          </CardTitle>
          <CardDescription className="text-blue-100 mt-3 text-lg">
            Fill in the details below to formally record a worker's grievance. This will generate a new Case ID.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 md:p-10">
          <form className="max-w-3xl mx-auto space-y-8">
            <div className="p-8 border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-lg">
              <div className="flex items-center space-x-4 mb-8 pb-5 border-b border-blue-200">
                <FileText className="h-7 w-7 text-indigo-700"/>
                <h3 className="text-2xl font-bold text-gray-800">Grievance Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <Label htmlFor="worker-select" className="text-gray-700 font-semibold mb-2 block">Select Worker</Label>
                  <Select required>
                    <SelectTrigger id="worker-select" className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl px-4 py-2.5">
                      <SelectValue placeholder="Choose the worker..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      {workers.map(worker => (
                        <SelectItem key={worker.id} value={worker.id}>{worker.name} ({worker.id})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grievance-category" className="text-gray-700 font-semibold mb-2 block">Grievance Category</Label>
                  <Select required>
                    <SelectTrigger id="grievance-category" className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl px-4 py-2.5">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      {grievanceCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="grievance-date" className="text-gray-700 font-semibold mb-2 block">Date of Incident</Label>
                  <Input id="grievance-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="grievance-description" className="text-gray-700 font-semibold mb-2 block">Detailed Description of Grievance</Label>
                  <Textarea
                    id="grievance-description"
                    placeholder="Clearly describe the issue, including dates, times, locations, and any other people involved..."
                    rows={6}
                    className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl min-h-[120px] px-4 py-2.5"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="supporting-proof" className="text-gray-700 font-semibold mb-2 block">Upload Supporting Proof (Optional)</Label>
                  {/* Adjusted file input styling */}
                  <Input
                    id="supporting-proof"
                    type="file"
                    className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl px-4 py-2.5
                               file:text-gray-700 file:bg-transparent file:border-0 file:rounded-md file:px-0 file:py-0 file:h-auto file:font-bold
                               hover:file:bg-transparent cursor-pointer file:mr-2"
                  />
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                    <UploadCloud className="h-4 w-4 text-gray-400" />
                    <span>e.g., photo of unsafe equipment, screenshot of a message, etc.</span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end p-8 md:p-10 pt-6 border-t border-gray-200">
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xl py-3.5 px-10 rounded-xl shadow-xl transition-all duration-400 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <MessageSquarePlus className="h-6 w-6 mr-3" />
            Submit Grievance
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}