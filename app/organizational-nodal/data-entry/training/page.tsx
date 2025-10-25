"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
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
  GraduationCap, // Page Header
  User,            // Worker Name
  BookOpen,        // Training Module
  CalendarDays,    // Date Icon
  UserCheck,       // Trainer Name
  FileText,        // Remarks
  AlertTriangle,   // Alert Icon
  CheckCircle,     // Success Icon
  Save,            // Button Icon
  Send,            // Button Icon
  ChevronDown,     // For Select
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
interface TrainingFormState {
  workerName: string;
  trainingModule: string;
  completionDate: string;
  trainerName: string;
  remarks: string;
}

// --- Mock Data for Dropdowns ---
const mockWorkers = [
  { id: "WKR-001", name: "Rakesh Kumar (CW-01)" },
  { id: "WKR-002", name: "Sita Sharma (CW-02)" },
  { id: "WKR-003", name: "Amit Singh (CW-03)" },
];
const mockModules = [
  { id: "MOD-01", name: "Safe Sewer Entry Practices" },
  { id: "MOD-02", name: "PPE Usage and Maintenance" },
  { id: "MOD-03", name: "Hazardous Waste Handling" },
  { id: "MOD-04", name: "First-Aid for Sanitation Workers" },
];

// --- Main Page Component ---
export default function TrainingCompletionInputPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-cyan-100/80"
      >
        {/* Header */}
        <header className="text-center mb-10 pb-6 border-b border-cyan-200/80">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 tracking-tight"
          >
            Training Completion Input
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.4 }}
             className="text-sm text-gray-600 mt-2 max-w-xl mx-auto"
           >
            Log a worker's completed training module, trainer, and completion date.
          </motion.p>
        </header>

        <TrainingForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */

function TrainingForm() {
  const [formData, setFormData] = useState<TrainingFormState>({
    workerName: "",
    trainingModule: "",
    completionDate: "",
    trainerName: "",
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSelectChange = (name: keyof TrainingFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.workerName) errors.push("Please select the Worker Name.");
    if (!data.trainingModule) errors.push("Please select the Training Module.");
    if (!data.completionDate) errors.push("Completion Date is required.");
    if (data.trainerName.trim().length < 3) errors.push("Trainer Name must be at least 3 characters.");

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting Training Record:", formData);
      alert("Training Record Logged Successfully (Simulation)!");
      // API call to submit data would go here
    } else {
      setSubmitted(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6"
    >
        <Card className="shadow-xl border border-gray-100 rounded-lg bg-white/90 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b p-5">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-cyan-700" />
              Log Training Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* --- Section 1: Core Details --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label htmlFor="workerName">Worker Name</Label>
                <Select name="workerName" value={formData.workerName} onValueChange={(value) => handleSelectChange("workerName", value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-cyan-300">
                     <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select a worker..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {mockWorkers.map(w => (
                        <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="trainingModule">Training Module</Label>
                <Select name="trainingModule" value={formData.trainingModule} onValueChange={(value) => handleSelectChange("trainingModule", value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-cyan-300">
                     <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select a module..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {mockModules.map(m => (
                         <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="completionDate">Completion Date</Label>
                <InputWithIcon
                  id="completionDate" name="completionDate" type="date"
                  value={formData.completionDate} onChange={handleChange}
                  icon={CalendarDays}
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="trainerName">Trainer Name / Organization</Label>
                <InputWithIcon
                  id="trainerName" name="trainerName"
                  value={formData.trainerName} onChange={handleChange}
                  placeholder="e.g., Mr. Sharma / UrbanTech NGO"
                  icon={UserCheck}
                />
              </InputGroup>
            </div>
            
            {/* --- Section 2: Remarks --- */}
            <div className="border-t border-gray-200 pt-6">
               <InputGroup>
                <Label htmlFor="remarks" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" /> Remarks (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Add any additional notes, observations, or comments about the training..."
                  className="focus:ring-2 focus:ring-cyan-300 min-h-[100px]"
                  rows={3}
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
                      <p className="text-sm">Training record for {formData.workerName} has been saved.</p>
                    </div>
                  </div>
                </div>
            )}

          </CardContent>
          <CardFooter className="bg-gray-50/70 p-4 flex justify-end gap-3">
             <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
             >
                <Button 
                    type="button"
                    variant="outline"
                    onClick={() => alert("Draft saved (simulation)")}
                    className="flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-100 shadow-sm"
                >
                    <Save className="w-4 h-4" /> Save as Draft
                </Button>
            </motion.button>
             <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
             >
                <Button 
                    onClick={handleSubmit} 
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Send className="w-4 h-4 mr-2" /> Submit Training Record
                </Button>
            </motion.button>
          </CardFooter>
      </Card>
    </motion.form>
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
        className={cn(
          `block w-full pl-10 p-2.5 border-gray-300 rounded-lg text-sm transition duration-150`,
          readOnly
            ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300"
            : "bg-white focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 hover:border-gray-400",
          className
        )}
      />
    </div>
  );
}

// Custom Select with Icon
function SelectWithIcon({
  label,
  name,
  value,
  options,
  onChange,
  icon: Icon,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
       <div className="relative rounded-lg shadow-sm">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <select
              id={name || label} name={name} value={value} onChange={onChange}
              className={cn(`appearance-none block w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 transition duration-150 pl-10 pr-8 hover:border-gray-400`)}
            >
              {options.map((opt, i) => ( <option key={i} value={opt} disabled={opt === ""}> {opt === "" ? "-- Select an Option --" : opt} </option> ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <ChevronDown className="h-4 w-4 text-gray-400"/> </div>
        </div>
    </div>
  );
}