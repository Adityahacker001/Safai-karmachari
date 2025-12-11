'use client';

import IntegratedLoader from '@/components/layout/IntegratedLoader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus, UploadCloud, FileText } from "lucide-react";
import React from "react";

export default function GrievanceEntryPage() {
  const [loading, setLoading] = React.useState(true);
  const [fileError, setFileError] = React.useState<string>('');

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }

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
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            Log a New Grievance
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Submit a new grievance on behalf of a worker.
          </p>
        </div>
      </header>

      <Card className="w-full bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-red-600/90 to-orange-600/90 text-white rounded-t-xl sm:rounded-t-2xl rounded-b-xl sm:rounded-b-2xl">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
            <span className="break-words">New Grievance Form</span>
          </CardTitle>
          <CardDescription className="text-white/90 mt-2 text-sm sm:text-base">
            Fill in the details below to formally record a worker's grievance. This will generate a new Case ID.
          </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const fileInput = form.querySelector('#supporting-proof') as HTMLInputElement | null;
          if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            setFileError('Please upload supporting proof before submitting.');
            fileInput?.focus();
            return;
          }
          setFileError('');
          // TODO: submit form data to API
          // For now, show a console message and reset form (optional)
          console.log('Grievance submitted', new FormData(form));
          form.reset();
          alert('Grievance submitted successfully');
        }} className="space-y-6 sm:space-y-8">
          <CardContent className="p-4 sm:p-6">
            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600"/>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Grievance Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-6 md:gap-y-7">
                <div>
                  <Label htmlFor="worker-select" className="text-gray-700 font-semibold mb-2 block text-sm sm:text-base">Select Worker</Label>
                  <Select required>
                    <SelectTrigger id="worker-select" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
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
                  <Label htmlFor="grievance-category" className="text-gray-700 font-semibold mb-2 block text-sm sm:text-base">Grievance Category</Label>
                  <Select required>
                    <SelectTrigger id="grievance-category" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
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
                  <Label htmlFor="supporting-proof" className="text-gray-700 font-semibold mb-2 block">Upload Supporting Proof</Label>
                  {/* Adjusted file input styling */}
                  <Input
                    id="supporting-proof"
                    type="file"
                    required
                    aria-describedby="supporting-proof-error"
                    className="border-gray-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-200 transition-all duration-300 rounded-xl px-4 py-2.5
                               file:text-gray-700 file:bg-transparent file:border-0 file:rounded-md file:px-0 file:py-0 file:h-auto file:font-bold
                               hover:file:bg-transparent cursor-pointer file:mr-2"
                  />
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                    <UploadCloud className="h-4 w-4 text-gray-400" />
                    <span>e.g., photo of unsafe equipment, screenshot of a message, etc.</span>
                  </p>
                  {fileError && (
                    <p id="supporting-proof-error" className="text-sm text-red-600 mt-2">{fileError}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 pt-4 rounded-b-xl sm:rounded-b-2xl">
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-lg sm:text-xl py-2.5 sm:py-3.5 px-8 sm:px-10 rounded-lg sm:rounded-xl shadow-xl transition-all duration-400 ease-in-out transform hover:scale-105 hover:shadow-2xl order-1">
              <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Submit Grievance
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}