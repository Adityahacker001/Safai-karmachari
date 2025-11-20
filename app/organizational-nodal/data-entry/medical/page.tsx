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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // For Yes/No
import {
  HeartPulse,      // Page Header
  User,              // Worker Name
  CalendarDays,      // Date Icon
  ClipboardList,     // Findings Summary
  AlertTriangle,     // Alert Icon
  CheckCircle,       // Success Icon
  Save,              // Button Icon
  Send,              // Button Icon
  FilePlus,          // Section Icon
  ChevronDown,       // For Select
  HelpCircle,        // For Follow-up
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
interface MedicalFormState {
  workerName: string;
  dateOfExamination: string;
  findingsSummary: string;
  followUpRequired: "Yes" | "No"; // Use specific string union
  nextExamDue: string;
}

// --- Mock Data for Dropdowns ---
const mockWorkers = [
  { id: "WKR-001", name: "Rakesh Kumar (CW-01)" },
  { id: "WKR-002", name: "Sita Sharma (CW-02)" },
  { id: "WKR-003", name: "Amit Singh (CW-03)" },
  { id: "WKR-004", name: "Vikas Mehra (CW-04)" },
  { id: "WKR-005", name: "Pooja Devi (CW-05)" },
];

// --- Main Page Component ---
export default function MedicalExaminationInputPage() {
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
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow tracking-tight">Medical Examination Input</h1>
              <p className="text-sm text-white/90 mt-2 max-w-xl">Log and track health checkups for all deployed Safai Karmacharis.</p>
            </div>
          </div>
        </header>
        <MedicalForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */

function MedicalForm() {
  const [formData, setFormData] = useState<MedicalFormState>({
    workerName: "",
    dateOfExamination: "",
    findingsSummary: "",
    followUpRequired: "No", // Default to "No"
    nextExamDue: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // --- DYNAMIC LOGIC ---
  // Show "Next Exam Due" field only if "Follow-up Required" is "Yes"
  const isFollowUpVisible = formData.followUpRequired === "Yes";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSelectChange = (name: keyof MedicalFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };
  
  const handleRadioChange = (name: keyof MedicalFormState, value: "Yes" | "No") => {
     setFormData((prev) => ({
        ...prev,
        [name]: value,
        // Reset next exam date if follow-up is set to "No"
        nextExamDue: value === "No" ? "" : prev.nextExamDue
     }));
     if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.workerName) errors.push("Please select the Worker Name.");
    if (!data.dateOfExamination) errors.push("Date of Examination is required.");
    if (data.findingsSummary.trim().length < 15) {
        errors.push("Findings Summary must be at least 15 characters.");
    }
    if (data.followUpRequired === "Yes" && !data.nextExamDue) {
      errors.push("Please specify the 'Next Exam Due' date if follow-up is required.");
    }

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting Medical Record:", formData);
      alert("Medical Record Logged Successfully (Simulation)!");
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
      className="space-y-8"
    >
      {/* SECTION 1: Examination Details */}
      <ColorSection
        title="Examination Details"
        icon={<HeartPulse className="w-5 h-5 text-green-700" />}
        color="green"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <SelectField
            label="Worker Name"
            name="workerName"
            value={formData.workerName}
            options={["", ...mockWorkers.map(w => w.name)]} // Using mock data
            onChange={(e) => handleSelectChange("workerName", e.target.value)}
            color="green"
            icon={User}
          />
          
          <InputField
            label="Date of Examination"
            name="dateOfExamination"
            type="date"
            value={formData.dateOfExamination}
            onChange={handleChange}
            icon={CalendarDays}
            color="green"
          />
          
           <div className="sm:col-span-2">
             <Label htmlFor="findingsSummary" className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-gray-500" />
                Findings Summary
             </Label>
             <Textarea
                id="findingsSummary"
                name="findingsSummary"
                value={formData.findingsSummary}
                onChange={handleChange}
                placeholder="Enter doctor's findings, observations, and health status..."
                rows={4}
                className="focus:ring-green-300 focus:border-green-500"
             />
          </div>
        </div>
      </ColorSection>

      {/* SECTION 2: Follow-up & Next Steps */}
      <ColorSection
        title="Follow-up & Next Steps"
        icon={<CheckCircle className="w-5 h-5 text-blue-700" />}
        color="blue" // Using blue for follow-up actions
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <RadioField
                label="Follow-up Required?"
                name="followUpRequired"
                value={formData.followUpRequired}
                onChange={(value) => handleRadioChange("followUpRequired", value as "Yes" | "No")}
            />
            
            {/* --- DYNAMIC FIELD --- */}
            <motion.div
                key="nextExamDue"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isFollowUpVisible ? 1 : 0, height: isFollowUpVisible ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(!isFollowUpVisible && "hidden")} // Hide when not visible
            >
                <InputField
                    label="Next Exam Due Date"
                    name="nextExamDue"
                    type="date"
                    value={formData.nextExamDue}
                    onChange={handleChange}
                    icon={CalendarDays}
                    color="blue"
                />
            </motion.div>
             {/* --- END DYNAMIC FIELD --- */}
        </div>
      </ColorSection>


      {/* ALERTS */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-md my-6" role="alert"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="font-bold text-base">Please correct the following errors:</p>
          </div>
          <ul className="list-disc pl-7 text-sm space-y-1">
            {alerts.map((msg, i) => ( <li key={i}>{msg}</li> ))}
          </ul>
        </motion.div>
      )}

      {/* SUCCESS */}
      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md mt-6 flex items-center gap-3 shadow-md" role="alert"
        >
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-bold">Record Logged!</p>
            <p className="text-sm">The medical examination record for {formData.workerName} has been saved.</p>
          </div>
        </motion.div>
      )}

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-gray-200/80">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => alert("Draft saved (simulation)")}
          className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium text-sm shadow-sm transition-all duration-200"
        >
          <Save className="w-4 h-4" /> Save as Draft
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleSubmit}
          className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-4 h-4" /> Submit Medical Record
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ---------- Reusable Components (Enhanced) ---------- */

// ColorSection with refined styling
function ColorSection({ title, icon, children, color, }: { title: string; icon: React.ReactNode; children: React.ReactNode; color: "indigo" | "pink" | "green" | "yellow" | "orange" | "blue"; }) {
  return (
    <motion.div
       initial={{ opacity: 0, y: 15 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.3 }}
       transition={{ duration: 0.4, ease: "easeOut" }}
       className={`p-5 rounded-xl border shadow-sm space-y-4`}
     >
      <h2 className={`text-lg font-semibold flex items-center gap-3`}>
         {/* Icon removed from title side, only text remains */}
         {title}
      </h2>
      <div className="pl-1">{children}</div>
    </motion.div>
  );
}

// FormField component (Enhanced styling, Icon)
function InputField({ label, name, type = "text", value, placeholder, onChange, readOnly = false, icon: Icon, color = "indigo" }: { label: string; name?: string; type?: string; value: string | number; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; icon?: React.ElementType; color?: string; }) {
  const focusRingColor = `focus:ring-${color}-300 focus:border-${color}-500`;
  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
      <div className="relative rounded-lg shadow-sm">
           {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <Input
              id={name || label} name={name} type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange}
              className={cn(`block w-full pl-10 p-2.5 border-gray-300 rounded-lg text-sm transition duration-150`,
                readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : `bg-white focus:ring-2 ${focusRingColor} hover:border-gray-400`,
                Icon ? 'pl-10' : 'pl-3'
              )}
            />
       </div>
    </div>
  );
}

// SelectField component (Enhanced styling, Icon)
function SelectField({ label, name, value, options, onChange, color, icon: Icon, }: { label: string; name: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; color: string; icon?: React.ElementType; }) {
   const focusRingColor = `focus:ring-${color}-200 focus:border-${color}-400`;
  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
       <div className="relative rounded-lg shadow-sm">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <select
              id={name || label} name={name} value={value} onChange={onChange}
              className={cn(`appearance-none block w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 transition duration-150 pr-8 hover:border-gray-400`,
                  focusRingColor,
                  Icon ? 'pl-10' : 'pl-3'
              )}
            >
              {options.map((opt, i) => ( <option key={i} value={opt} disabled={opt === ""}> {opt === "" ? "-- Select an Option --" : opt} </option> ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <ChevronDown className="h-4 w-4 text-gray-400"/> </div>
        </div>
    </div>
  );
}

// RadioField component
function RadioField({ label, name, value, onChange, }: { label: string; name: string; value: "Yes" | "No"; onChange: (value: "Yes" | "No") => void; }) {
  return (
    <div>
      <Label className="text-sm font-medium text-slate-700 block mb-2">{label}</Label>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className="flex gap-6 mt-2"
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="Yes" id={`${name}-yes`} />
          <Label htmlFor={`${name}-yes`} className="cursor-pointer">Yes</Label>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="No" id={`${name}-no`} />
          <Label htmlFor={`${name}-no`} className="cursor-pointer">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
}