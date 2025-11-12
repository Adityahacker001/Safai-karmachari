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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
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
  CheckSquare, // For selected workers
  Square, // For unselected workers
  Search, // For worker search
  ChevronDown, // For dropdown
  X, // For remove badge
} from "lucide-react";
import { motion } from "framer-motion";

// --- Interfaces ---
interface Worker {
  id: number;
  name: string;
  category: 'manualScavenging' | 'ragpickers' | 'hazardous' | 'ordinarySKs';
  isSelected: boolean;
  contractorId: string;
}

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
  selectedWorkers: number[];
  remarks: string;
}

// --- Mock Worker Data ---
const MOCK_WORKERS: Worker[] = [
  { id: 1, name: 'Aditya Kumar', category: 'hazardous', isSelected: false, contractorId: 'CleanForce Pvt Ltd' },
  { id: 2, name: 'Amit Singh', category: 'hazardous', isSelected: false, contractorId: 'CleanForce Pvt Ltd' },
  { id: 3, name: 'Priya Sharma', category: 'ordinarySKs', isSelected: false, contractorId: 'CleanForce Pvt Ltd' },
  { id: 4, name: 'Suresh Yadav', category: 'ordinarySKs', isSelected: false, contractorId: 'CleanForce Pvt Ltd' },
  { id: 5, name: 'Meera Devi', category: 'ragpickers', isSelected: false, contractorId: 'CleanForce Pvt Ltd' },
  { id: 6, name: 'Dr. Anil Verma', category: 'hazardous', isSelected: false, contractorId: 'UrbanClean Services' },
  { id: 7, name: 'Sita Ram', category: 'hazardous', isSelected: false, contractorId: 'UrbanClean Services' },
  { id: 8, name: 'Mohan Lal', category: 'ordinarySKs', isSelected: false, contractorId: 'UrbanClean Services' },
  { id: 9, name: 'Geeta Devi', category: 'ragpickers', isSelected: false, contractorId: 'UrbanClean Services' },
  { id: 10, name: 'Ram Prasad', category: 'ordinarySKs', isSelected: false, contractorId: 'EcoSan Solutions' },
  { id: 11, name: 'Shyam Babu', category: 'hazardous', isSelected: false, contractorId: 'EcoSan Solutions' },
  { id: 12, name: 'Lata Kumari', category: 'ragpickers', isSelected: false, contractorId: 'EcoSan Solutions' },
  { id: 13, name: 'Vinod Kumar', category: 'ordinarySKs', isSelected: false, contractorId: 'Pragati SHG' },
  { id: 14, name: 'Sunita Devi', category: 'ragpickers', isSelected: false, contractorId: 'Pragati SHG' },
  { id: 15, name: 'Manoj Tiwari', category: 'hazardous', isSelected: false, contractorId: 'Pragati SHG' },
];

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
    selectedWorkers: [],
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [workerSearch, setWorkerSearch] = useState("");
  const [showWorkerSelection, setShowWorkerSelection] = useState(false);

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
    
    // Show worker selection when contractor is selected
    if (name === 'contractor' && value) {
      setShowWorkerSelection(true);
      // Reset worker selections when contractor changes
      setFormData(prev => ({ ...prev, selectedWorkers: [] }));
      setWorkers(prev => prev.map(worker => ({ ...worker, isSelected: false })));
    } else if (name === 'contractor' && !value) {
      setShowWorkerSelection(false);
    }
  };

  // Handle worker selection
  const handleWorkerToggle = (workerId: number) => {
    setWorkers(prev => 
      prev.map(worker => 
        worker.id === workerId 
          ? { ...worker, isSelected: !worker.isSelected }
          : worker
      )
    );
    
    setFormData(prev => {
      const updatedSelectedWorkers = prev.selectedWorkers.includes(workerId)
        ? prev.selectedWorkers.filter(id => id !== workerId)
        : [...prev.selectedWorkers, workerId];
      
      return { ...prev, selectedWorkers: updatedSelectedWorkers };
    });
    
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
      {/* Title Section - add gradient background color to match reference image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="rounded-2xl shadow-lg px-8 py-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow">
            New Work Assignment
          </h1>
          <p className="text-lg text-indigo-100 font-medium">
            Register a new work assignment for NSKC-verified contractors or SHGs.
          </p>
        </div>
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
                    <Input
                      id="workTitle" name="workTitle"
                      value={formData.workTitle} onChange={handleChange}
                      placeholder="e.g., T1 Airport Deep Cleaning"
                      className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="contractor">Contractor (NSKC Verified Only)</Label>
                    <Select name="contractor" value={formData.contractor} onValueChange={(value) => handleSelectChange("contractor", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-teal-300">
                        <SelectValue placeholder="Select a verified contractor..." />
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
                    <Input
                      id="startDate" name="startDate" type="date"
                      value={formData.startDate} onChange={handleChange}
                      className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate" name="endDate" type="date"
                      value={formData.endDate} onChange={handleChange}
                      className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                    />
                  </InputGroup>

                  <InputGroup className="md:col-span-2">
                    <Label htmlFor="location">Location (with Geo-tag)</Label>
                    <div className="flex gap-2">
                       <Input
                        id="location" name="location"
                        value={formData.location} onChange={handleChange}
                        placeholder="Enter full address of worksite"
                        className="flex-grow focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
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
                        <Input
                          id="totalWorkers" name="totalWorkers" type="number"
                          value={formData.totalWorkers} onChange={handleChange}
                          placeholder="e.g., 50"
                          className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                        />
                    </InputGroup>
                    
                    <Label className="md:col-span-4 text-sm font-medium text-gray-700 -mb-2">Worker Category Breakdown (must sum to total)</Label>
                    <InputGroup>
                        <Label htmlFor="catManualScavenging">Manual Scavenging</Label>
                        <Input id="catManualScavenging" name="catManualScavenging" type="number" value={formData.catManualScavenging} onChange={handleChange} className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500" />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="catRagpickers">Ragpickers</Label>
                        <Input id="catRagpickers" name="catRagpickers" type="number" value={formData.catRagpickers} onChange={handleChange} className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500" />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="catHazardous">Hazardous</Label>
                        <Input id="catHazardous" name="catHazardous" type="number" value={formData.catHazardous} onChange={handleChange} className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500" />
                    </InputGroup>
                     <InputGroup>
                        <Label htmlFor="catOrdinarySKs">Ordinary SKs</Label>
                        <Input id="catOrdinarySKs" name="catOrdinarySKs" type="number" value={formData.catOrdinarySKs} onChange={handleChange} className="focus:ring-2 focus:ring-teal-300 focus:border-teal-500" />
                    </InputGroup>

                    {/* Individual Worker Selection Dropdown */}
                    {formData.contractor && (
                      <div className="md:col-span-4 mt-6">
                        <InputGroup>
                          <Label htmlFor="workerSelection">Select Individual Workers</Label>
                          <WorkerDropdownSelector
                            workers={workers.filter(w => w.contractorId === formData.contractor)}
                            selectedWorkers={formData.selectedWorkers}
                            onWorkerSelect={handleWorkerToggle}
                            onRemoveWorker={handleWorkerToggle}
                          />
                        </InputGroup>
                      </div>
                    )}

                    {/* Worker Selection Panel */}
                    {showWorkerSelection && formData.contractor && (
                      <div className="md:col-span-4 mt-6">
                        <WorkerSelectionPanel
                          workers={workers.filter(w => w.contractorId === formData.contractor)}
                          onWorkerToggle={handleWorkerToggle}
                          workerSearch={workerSearch}
                          onSearchChange={setWorkerSearch}
                          selectedCount={formData.selectedWorkers.length}
                        />
                      </div>
                    )}
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

// Worker Selection Panel Component
function WorkerSelectionPanel({
  workers,
  onWorkerToggle,
  workerSearch,
  onSearchChange,
  selectedCount,
}: {
  workers: Worker[];
  onWorkerToggle: (workerId: number) => void;
  workerSearch: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'manualScavenging': return 'bg-red-100 text-red-700 border-red-200';
      case 'ragpickers': return 'bg-green-100 text-green-700 border-green-200';
      case 'hazardous': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ordinarySKs': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'manualScavenging': return 'Manual Scavenging';
      case 'ragpickers': return 'Ragpickers';
      case 'hazardous': return 'Hazardous';
      case 'ordinarySKs': return 'Ordinary SKs';
      default: return 'Other';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'manualScavenging': return AlertTriangle;
      case 'ragpickers': return Trash2;
      case 'hazardous': return ShieldAlert;
      case 'ordinarySKs': return UserCheck;
      default: return Users;
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(workerSearch.toLowerCase())
  );

  return (
    <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-teal-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Select Workers for Assignment
          {selectedCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-teal-600 text-white text-sm rounded-full">
              {selectedCount} selected
            </span>
          )}
        </CardTitle>
        
        {/* Search Box */}
        <div className="relative mt-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search workers by name..."
            value={workerSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-teal-200 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => {
              const CategoryIcon = getCategoryIcon(worker.category);
              return (
                <motion.div
                  key={worker.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 
                    ${worker.isSelected 
                      ? 'border-teal-500 bg-teal-100 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                    }
                  `}
                  onClick={() => onWorkerToggle(worker.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {worker.isSelected ? (
                        <CheckSquare className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-gray-900 truncate">{worker.name}</p>
                      </div>
                      
                      <span className={`
                        inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
                        ${getCategoryColor(worker.category)}
                      `}>
                        {getCategoryLabel(worker.category)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No workers found matching your search.</p>
            </div>
          )}
        </div>
        
        {filteredWorkers.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{filteredWorkers.length}</span> workers available • 
              <span className="font-medium text-teal-600 ml-1">{selectedCount}</span> selected
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Worker Dropdown Selector Component
function WorkerDropdownSelector({
  workers,
  selectedWorkers,
  onWorkerSelect,
  onRemoveWorker,
}: {
  workers: Worker[];
  selectedWorkers: number[];
  onWorkerSelect: (workerId: number) => void;
  onRemoveWorker: (workerId: number) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'manualScavenging': return 'bg-red-100 text-red-700';
      case 'ragpickers': return 'bg-green-100 text-green-700';
      case 'hazardous': return 'bg-yellow-100 text-yellow-700';
      case 'ordinarySKs': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'manualScavenging': return 'MS';
      case 'ragpickers': return 'RP';
      case 'hazardous': return 'HZ';
      case 'ordinarySKs': return 'OS';
      default: return 'Other';
    }
  };

  const selectedWorkerData = workers.filter(worker => 
    selectedWorkers.includes(worker.id)
  );

  const availableWorkers = workers.filter(worker => 
    !selectedWorkers.includes(worker.id) &&
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Dropdown Trigger */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto min-h-[42px] px-3 py-2 focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-gray-500">
              {selectedWorkerData.length > 0 
                ? `${selectedWorkerData.length} worker${selectedWorkerData.length > 1 ? 's' : ''} selected`
                : "Select workers for assignment..."
              }
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {availableWorkers.length > 0 ? (
              availableWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    onWorkerSelect(worker.id);
                    setSearchTerm("");
                  }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{worker.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-0.5 ${getCategoryColor(worker.category)}`}
                      >
                        {getCategoryLabel(worker.category)}
                      </Badge>
                    </div>
                  </div>
                  <Square className="w-4 h-4 text-gray-400" />
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchTerm ? "No workers found matching your search." : "No more workers available."}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected Workers Badges */}
      {selectedWorkerData.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-teal-50 rounded-lg border border-teal-200">
          <p className="text-sm font-medium text-teal-800 w-full mb-2">
            Selected Workers ({selectedWorkerData.length}):
          </p>
          {selectedWorkerData.map((worker) => (
            <Badge
              key={worker.id}
              variant="secondary"
              className="bg-white border-teal-300 text-teal-800 flex items-center gap-2 px-3 py-1"
            >
              <span className="text-sm font-medium">{worker.name}</span>
              <Badge 
                variant="outline" 
                className={`text-xs px-1.5 py-0.5 ${getCategoryColor(worker.category)}`}
              >
                {getCategoryLabel(worker.category)}
              </Badge>
              <button
                onClick={() => onRemoveWorker(worker.id)}
                className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                type="button"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}