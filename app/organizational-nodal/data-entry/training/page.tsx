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
  AlertTriangle,   // Alert Icon
  CheckCircle,     // Success Icon
  Save,            // Button Icon
  Send,            // Button Icon
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
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
        <style jsx>{`
          .loader {
            --c: no-repeat linear-gradient(#4f46e5 0 0);
            background: 
              var(--c),var(--c),var(--c),
              var(--c),var(--c),var(--c),
              var(--c),var(--c),var(--c);
            background-size: 16px 16px;
            animation: 
              l32-1 1s infinite,
              l32-2 1s infinite;
          }
          @keyframes l32-1 {
            0%,100% {width:45px;height: 45px}
            35%,65% {width:65px;height: 65px}
          }
          @keyframes l32-2 {
            0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
            60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
          }
        `}</style>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full rounded-2xl shadow-xl p-0"
      >
        {/* Header */}
        <header className="w-full mb-10 pb-6">
          <div className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 shadow-lg px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow tracking-tight">Training Completion Input</h1>
              <p className="text-sm text-white/90 mt-2 max-w-xl">Log a worker's completed training module, trainer, and completion date.</p>
            </div>
          </div>
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
        <div className="p-6 sm:p-8 rounded-2xl mb-6 w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 border border-blue-200 shadow-lg">
          <h2 className="text-xl font-bold text-blue-700 mb-6">Log Training Completion</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <InputGroup>
              <Label htmlFor="workerName">Worker Name</Label>
              <Select name="workerName" value={formData.workerName} onValueChange={(value) => handleSelectChange("workerName", value)}>
                <SelectTrigger className="focus:ring-2 focus:ring-blue-300">
                  <SelectValue placeholder="Select a worker..." />
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
                <SelectTrigger className="focus:ring-2 focus:ring-blue-300">
                  <SelectValue placeholder="Select a module..." />
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
              <Input
                id="completionDate" name="completionDate" type="date"
                value={formData.completionDate} onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-300"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="trainerName">Trainer Name / Organization</Label>
              <Input
                id="trainerName" name="trainerName"
                value={formData.trainerName} onChange={handleChange}
                placeholder="e.g., Mr. Sharma / UrbanTech NGO"
                className="focus:ring-2 focus:ring-blue-300"
              />
            </InputGroup>
            <div className="lg:col-span-4 sm:col-span-2 col-span-1 border-t border-gray-200 pt-6">
              <InputGroup>
                <Label htmlFor="remarks" className="text-base font-medium text-gray-700">
                  Remarks (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Add any additional notes, observations, or comments about the training..."
                  className="focus:ring-2 focus:ring-blue-300 min-h-[100px]"
                  rows={3}
                />
              </InputGroup>
            </div>
          </div>
          {/* --- Alerts --- */}
          {alerts.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-md mt-6" role="alert">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="font-bold text-base">Please correct the following errors:</p>
              </div>
              <ul className="list-disc pl-7 text-sm space-y-1">
                {alerts.map((msg, i) => (<li key={i}>{msg}</li>))}
              </ul>
            </div>
          )}
          {/* --- Success Message --- */}
          {submitted && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md shadow-md mt-6" role="alert">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-bold">Success!</p>
                  <p className="text-sm">Training record for {formData.workerName} has been saved.</p>
                </div>
              </div>
            </div>
          )}
          {/* --- Buttons --- */}
          <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-gray-200/80 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => alert("Draft saved (simulation)")}
              className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium text-sm shadow-sm transition-all duration-200"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send className="w-4 h-4" /> Submit Training Record
            </motion.button>
          </div>
        </div>
    </motion.form>
  );
}

// --- Reusable Helper Components ---

function InputGroup({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`space-y-1.5 ${className || ''}`}>{children}</div>;
}

