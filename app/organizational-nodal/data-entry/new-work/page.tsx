"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import {
  FileText, // For Work Title
  Building, // For Contractor
  CalendarDays, // For Dates
  MapPin, // For Location
  Users, // For Number of Workers
  ShieldAlert, // For Hazardous
  Trash2, // For Ragpickers
  UserCheck, // For Ordinary SKs
  AlertTriangle, // For Manual Scavenging
  Globe, // For Geo-tag button
  Send, // For Submit button
  ClipboardPlus, // For Page Header
  CheckCircle, // For Success Message
} from "lucide-react";
import { motion } from "framer-motion";

// --- Interfaces ---
interface WorkAssignmentForm {
  workTitle: string;
  contractor: string;
  startDate: string;
  endDate: string;
  location: string;
  totalWorkers: string; // Use string for numeric fields to handle empty state
  catManualScavenging: string;
  catRagpickers: string;
  catHazardous: string;
  catOrdinarySKs: string;
  remarks: string;
}

// --- Main Page Component ---
export default function NewWorkAssignmentPage() {
  // --- State for Form Data ---
  const [formData, setFormData] = useState<WorkAssignmentForm>({
    workTitle: "",
    contractor: "",
    startDate: "",
    endDate: "",
    location: "",
    totalWorkers: "",
    catManualScavenging: "0",
    catRagpickers: "0",
    catHazardous: "0",
    catOrdinarySKs: "0",
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // Allow only numbers for numeric fields
    if (type === 'number') {
      if (/^\d*$/.test(value)) { // Regex to allow only digits (or empty string)
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (submitted) setSubmitted(false);
  };

  // Handle select changes
  const handleSelectChange = (name: keyof WorkAssignmentForm, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.workTitle.trim()) errors.push("Work Title is required.");
    if (!data.contractor) errors.push("Please select a Contractor.");
    if (!data.startDate) errors.push("Start Date is required.");
    if (!data.endDate) errors.push("End Date is required.");
    if (!data.location.trim()) errors.push("Location is required.");
    
    const total = parseInt(data.totalWorkers) || 0;
    if (total <= 0) errors.push("Number of Workers must be greater than 0.");
    
    const catMS = parseInt(data.catManualScavenging) || 0;
    const catRag = parseInt(data.catRagpickers) || 0;
    const catHaz = parseInt(data.catHazardous) || 0;
    const catOrd = parseInt(data.catOrdinarySKs) || 0;
    const breakdownTotal = catMS + catRag + catHaz + catOrd;

    if (breakdownTotal !== total) {
        errors.push(`Worker category breakdown (${breakdownTotal}) does not match the Total Number of Workers (${total}).`);
    }

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting New Work Assignment:", formData);
      alert("New Work Assignment Submitted Successfully (Simulation)!");
      // Here you would send the data to your API
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
          New Work Assignment
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Register a new work assignment for NSKC-verified contractors or SHGs.
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
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b p-5">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <ClipboardPlus className="w-6 h-6 text-teal-700" />
              Assignment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* --- Section 1: Core Details --- */}
            <div className="border-b border-gray-200 pb-6">
               <h3 className="text-lg font-medium text-gray-700 mb-4">Core Information</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <InputGroup>
                    <Label htmlFor="workTitle">Work Title</Label>
                    <InputWithIcon
                      id="workTitle" name="workTitle"
                      value={formData.workTitle} onChange={handleChange}
                      placeholder="e.g., T1 Airport Deep Cleaning"
                      icon={FileText}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="contractor">Contractor (NSKC Verified Only)</Label>
                    <Select name="contractor" value={formData.contractor} onValueChange={(value) => handleSelectChange("contractor", value)}>
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

                  <InputGroup>
                    <Label htmlFor="startDate">Start Date</Label>
                    <InputWithIcon
                      id="startDate" name="startDate" type="date"
                      value={formData.startDate} onChange={handleChange}
                      icon={CalendarDays}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="endDate">End Date</Label>
                    <InputWithIcon
                      id="endDate" name="endDate" type="date"
                      value={formData.endDate} onChange={handleChange}
                      icon={CalendarDays}
                    />
                  </InputGroup>

                  <InputGroup className="md:col-span-2">
                    <Label htmlFor="location">Location (with Geo-tag)</Label>
                    <div className="flex gap-2">
                       <InputWithIcon
                        id="location" name="location"
                        value={formData.location} onChange={handleChange}
                        placeholder="Enter full address of worksite"
                        icon={MapPin}
                        className="flex-grow"
                      />
                      <Button variant="outline" size="icon" className="border-gray-300 flex-shrink-0" onClick={() => alert("Geo-tagging map (simulation)")}>
                          <Globe className="w-4 h-4 text-gray-600"/>
                      </Button>
                    </div>
                  </InputGroup>
                </div>
            </div>

            {/* --- Section 2: Workforce Details --- */}
            <div className="border-b border-gray-200 pb-6">
               <h3 className="text-lg font-medium text-gray-700 mb-4">Workforce Deployment</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-5">
                    <InputGroup className="md:col-span-4">
                        <Label htmlFor="totalWorkers">Total Number of Workers</Label>
                        <InputWithIcon
                          id="totalWorkers" name="totalWorkers" type="number"
                          value={formData.totalWorkers} onChange={handleChange}
                          placeholder="e.g., 50"
                          icon={Users}
                        />
                    </InputGroup>
                    
                    <Label className="md:col-span-4 text-sm font-medium text-gray-700 -mb-2">Worker Category Breakdown (must sum to total)</Label>
                    <InputGroup>
                        <Label htmlFor="catManualScavenging">Manual Scavenging</Label>
                        <InputWithIcon id="catManualScavenging" name="catManualScavenging" type="number" value={formData.catManualScavenging} onChange={handleChange} icon={AlertTriangle} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="catRagpickers">Ragpickers</Label>
                        <InputWithIcon id="catRagpickers" name="catRagpickers" type="number" value={formData.catRagpickers} onChange={handleChange} icon={Trash2} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="catHazardous">Hazardous</Label>
                        <InputWithIcon id="catHazardous" name="catHazardous" type="number" value={formData.catHazardous} onChange={handleChange} icon={ShieldAlert} />
                    </InputGroup>
                     <InputGroup>
                        <Label htmlFor="catOrdinarySKs">Ordinary SKs</Label>
                        <InputWithIcon id="catOrdinarySKs" name="catOrdinarySKs" type="number" value={formData.catOrdinarySKs} onChange={handleChange} icon={UserCheck} />
                    </InputGroup>
               </div>
            </div>

            {/* --- Section 3: Remarks --- */}
            <div>
               <h3 className="text-lg font-medium text-gray-700 mb-4">Remarks</h3>
               <InputGroup>
                <Label htmlFor="remarks">Additional Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Add any additional notes, instructions, or requirements for this work assignment..."
                  className="focus:ring-2 focus:ring-teal-300"
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
                      <p className="text-sm">New work assignment (ID: {formData.workTitle}) has been created.</p>
                    </div>
                  </div>
                </div>
            )}

          </CardContent>
          <CardFooter className="bg-gray-50/70 p-4 flex justify-end">
             <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
             >
                <Button 
                    onClick={handleSubmit} 
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Send className="w-4 h-4 mr-2" /> Submit Work Assignment
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

// Custom Input with Icon
function InputWithIcon({
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  readOnly = false,
  className,
  icon: Icon,
}: {
  id: string;
  name?: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        className={`block w-full pl-10 p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 ${
          readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-teal-300 focus:border-teal-500 hover:border-gray-400"
        } ${className || ''}`}
      />
    </div>
  );
}