"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription, // Added for subtitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FileSignature, // Page Header
  Search, // Select Work ID
  CalendarDays, // For Dates
  Building, // For Contractor
  Users, // For Worker Count
  ShieldAlert, // For Hazardous
  Trash2, // For Ragpickers
  UserCheck, // For Ordinary SKs
  AlertTriangle, // For Manual Scavenging & Alerts
  Save, // For Submit button
  CheckCircle, // For Success
  FileText, // For Justification
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
interface WorkAssignment {
  workId: string;
  contractor: string;
  startDate: string;
  endDate: string;
  totalWorkers: string;
  catManualScavenging: string;
  catRagpickers: string;
  catHazardous: string;
  catOrdinarySKs: string;
}

// --- Mock Data for existing work orders ---
const mockWorkOrders: { [key: string]: WorkAssignment } = {
  "WO-2025-001": {
    workId: "WO-2025-001",
    contractor: "CleanForce Pvt Ltd",
    startDate: "2025-10-20",
    endDate: "2025-10-30",
    totalWorkers: "50",
    catManualScavenging: "0",
    catRagpickers: "10",
    catHazardous: "10",
    catOrdinarySKs: "30",
  },
  "WO-2025-002": {
    workId: "WO-2025-002",
    contractor: "UrbanClean Services",
    startDate: "2025-11-01",
    endDate: "2025-11-15",
    totalWorkers: "25",
    catManualScavenging: "5",
    catRagpickers: "0",
    catHazardous: "10",
    catOrdinarySKs: "10",
  },
};

// --- Main Page Component ---
export default function ModifyWorkAssignmentPage() {
  // --- State for Form Data ---
  const [selectedWorkId, setSelectedWorkId] = useState<string>("");
  const [formData, setFormData] = useState<Partial<WorkAssignment>>({});
  const [justification, setJustification] = useState<string>("");
  
  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  
  // Check if a work order is selected to enable/disable the form
  const isFormEnabled = Boolean(selectedWorkId);

  // Handle Work ID selection
  const handleWorkIdSelect = (workId: string) => {
    setSelectedWorkId(workId);
    setSubmitted(false); // Reset submission status
    setAlerts([]); // Clear alerts
    if (workId && mockWorkOrders[workId]) {
      // Load the data for the selected work order into the form
      setFormData(mockWorkOrders[workId]);
    } else {
      // Clear form data if no work ID is selected
      setFormData({});
    }
  };
  
  // Handle changes in the editable form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };
  
  // Handle select changes for contractor
  const handleContractorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, contractor: value }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    if (!selectedWorkId) errors.push("You must select a Work ID to modify.");
    if (!formData.startDate) errors.push("Start Date is required.");
    if (!formData.endDate) errors.push("End Date is required.");
    if (!formData.contractor) errors.push("Contractor is required.");
    
    const total = parseInt(formData.totalWorkers || "0") || 0;
    if (total <= 0) errors.push("Total Workers must be greater than 0.");

    // (Add category breakdown validation if needed)

    if (justification.trim().length < 20) {
        errors.push("A detailed Change Justification (min 20 characters) is mandatory.");
    }

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting Modifications:", { workId: selectedWorkId, changes: formData, justification });
      alert("Work Assignment Modified Successfully (Simulation)!");
      // API call to submit modifications would go here
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Modify Existing Work Assignment
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Select a work order to update its duration, contractor, or workforce details.
        </p>
      </motion.div>

      {/* 🔹 Main Form Card */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        <Card className="shadow-xl border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b p-5">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <Search className="w-6 h-6 text-indigo-700" />
              1. Select Work to Modify
            </CardTitle>
            <CardDescription className="text-gray-600">
              Choose the Work ID you need to change. The form will unlock once selected.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
             <InputGroup>
                <Label htmlFor="workIdSelect" className="text-base font-medium">Select Work ID</Label>
                <Select name="workIdSelect" value={selectedWorkId} onValueChange={handleWorkIdSelect}>
                  <SelectTrigger className="w-full md:w-1/2 text-lg focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="-- Select a Work ID --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WO-2025-001">WO-2025-001 (T1 Airport Deep Cleaning)</SelectItem>
                    <SelectItem value="WO-2025-002">WO-2025-002 (Hospital Bio-Waste)</SelectItem>
                  </SelectContent>
                </Select>
              </InputGroup>
          </CardContent>
        </Card>

        {/* --- Section 2: Editable Fields --- */}
        <Card className={cn("shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-300", 
                       !isFormEnabled && "opacity-50 blur-sm pointer-events-none")}>
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b p-5">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <FileSignature className="w-6 h-6 text-teal-700" />
              2. Modify Details
            </CardTitle>
             <CardDescription className="text-gray-600">
              Only the fields below can be modified.
            </CardDescription>
          </CardHeader>
          <fieldset disabled={!isFormEnabled} className="p-6 space-y-6">
            
            <div className="border-b border-gray-200 pb-6">
               <h3 className="text-lg font-medium text-gray-700 mb-4">Duration & Contractor</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                   <InputGroup>
                    <Label htmlFor="startDate">Start Date</Label>
                    <InputWithIcon id="startDate" name="startDate" type="date" value={formData.startDate || ""} onChange={handleChange} icon={CalendarDays} />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="endDate">End Date</Label>
                    <InputWithIcon id="endDate" name="endDate" type="date" value={formData.endDate || ""} onChange={handleChange} icon={CalendarDays} />
                  </InputGroup>
                   <InputGroup className="md:col-span-2">
                    <Label htmlFor="contractor">Contractor (NSKC Verified Only)</Label>
                    <Select name="contractor" value={formData.contractor || ""} onValueChange={handleContractorChange}>
                      <SelectTrigger className="focus:ring-2 focus:ring-teal-300">
                         <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <SelectValue placeholder="Select a verified contractor..." />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CleanForce Pvt Ltd">CleanForce Pvt Ltd</SelectItem>
                        <SelectItem value="UrbanClean Services">UrbanClean Services</SelectItem>
                        <SelectItem value="EcoSan Solutions">EcoSan Solutions</SelectItem>
                        <SelectItem value="Pragati SHG">Pragati SHG (SHG)</SelectItem>
                      </SelectContent>
                    </Select>
                  </InputGroup>
               </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
               <h3 className="text-lg font-medium text-gray-700 mb-4">Workforce Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-5">
                    <InputGroup className="md:col-span-4">
                        <Label htmlFor="totalWorkers">Total Number of Workers</Label>
                        <InputWithIcon id="totalWorkers" name="totalWorkers" type="number" value={formData.totalWorkers || ""} onChange={handleChange} icon={Users} />
                    </InputGroup>
                    <Label className="md:col-span-4 text-sm font-medium text-gray-700 -mb-2">Worker Category Breakdown</Label>
                    <InputGroup><Label htmlFor="catManualScavenging">Manual Scavenging</Label><InputWithIcon id="catManualScavenging" name="catManualScavenging" type="number" value={formData.catManualScavenging || ""} onChange={handleChange} icon={AlertTriangle} /></InputGroup>
                    <InputGroup><Label htmlFor="catRagpickers">Ragpickers</Label><InputWithIcon id="catRagpickers" name="catRagpickers" type="number" value={formData.catRagpickers || ""} onChange={handleChange} icon={Trash2} /></InputGroup>
                    <InputGroup><Label htmlFor="catHazardous">Hazardous</Label><InputWithIcon id="catHazardous" name="catHazardous" type="number" value={formData.catHazardous || ""} onChange={handleChange} icon={ShieldAlert} /></InputGroup>
                    <InputGroup><Label htmlFor="catOrdinarySKs">Ordinary SKs</Label><InputWithIcon id="catOrdinarySKs" name="catOrdinarySKs" type="number" value={formData.catOrdinarySKs || ""} onChange={handleChange} icon={UserCheck} /></InputGroup>
               </div>
            </div>
            
             <div>
               <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600"/> 3. Change Justification (Mandatory)
               </h3>
               <InputGroup>
                <Label htmlFor="justification">Please explain the reason for this modification.</Label>
                <Textarea
                  id="justification"
                  name="justification"
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="e.g., 'Extended project scope requires 10 additional ordinary workers and 5 more days...'"
                  className="focus:ring-2 focus:ring-red-300 border-gray-300"
                  rows={4}
                />
              </InputGroup>
            </div>

            {/* --- Alerts --- */}
            {alerts.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-md" role="alert">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-base">Please correct the following errors:</p>
                  </div>
                  <ul className="list-disc pl-7 text-sm space-y-1">
                    {alerts.map((msg, i) => ( <li key={i}>{msg}</li> ))}
                  </ul>
                </div>
            )}
            
            {/* --- Success Message --- */}
            {submitted && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md shadow-md" role="alert">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Success!</p>
                      <p className="text-sm">Work Assignment {selectedWorkId} has been modified.</p>
                    </div>
                  </div>
                </div>
            )}

          </fieldset>
          <CardFooter className="bg-gray-50/70 p-4 flex justify-end">
             <motion.div
                whileHover={{ scale: isFormEnabled ? 1.03 : 1 }}
                whileTap={{ scale: isFormEnabled ? 0.98 : 1 }}
             >
                <Button 
                    onClick={handleSubmit} 
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormEnabled}
                >
                    <Save className="w-4 h-4 mr-2" /> Submit Modification
                </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.form>
    </div>
  );
}

// --- Reusable Helper Components ---

function InputGroup({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`space-y-1.5 ${className || ''}`}>{children}</div>;
}

function InputWithIcon({
  id, name, type = "text", value, placeholder, onChange, readOnly = false, className, icon: Icon,
}: {
  id: string; name?: string; type?: string; value: string | number; placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; className?: string; icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        id={id} name={name} type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange}
        className={`block w-full pl-10 p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 ${
          readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-teal-300 focus:border-teal-500 hover:border-gray-400"
        } ${className || ''}`}
      />
    </div>
  );
}