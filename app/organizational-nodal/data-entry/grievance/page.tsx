"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Save,
  Send,
  User, // For Worker Name
  CalendarDays, // For Date
  ClipboardList, // For Description/Action
  Layers, // For Status
  ArrowUpCircle, // For Escalation
  Building, // For ULB
  Shield, // For Contractor
  UserCheck, // For District Nodal
  Info, // For Grievance ID
  MessageSquareWarning, // Page Header
  CheckCircle, // For Success
  ChevronDown, // For Select
  Clock, // For Pending Status
} from "lucide-react";

import { Input } from "@/components/ui/input"; // Importing Input component
import { cn } from "@/lib/utils"; // Importing cn utility

// --- Interfaces ---
interface GrievanceFormData {
  grievanceId: string;
  workerName: string;
  grievanceType: string;
  description: string;
  dateReceived: string;
  actionTaken: string;
  status: string;
  escalatedTo: string;
}

// --- Mock Data for Dropdowns ---
const mockWorkers = [
  { id: "WKR-001", name: "Rakesh Kumar (CW-01)" },
  { id: "WKR-002", name: "Sita Sharma (CW-02)" },
  { id: "WKR-003", name: "Amit Singh (CW-03)" },
];

// --- Main Page Component ---
export default function GrievanceFeedbackInputPage() {
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
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow tracking-tight">Grievance Feedback Entry</h1>
              <p className="text-sm text-white/90 mt-2 max-w-xl">Log and manage grievances from workers regarding safety, payment, harassment, or other issues.</p>
            </div>
          </div>
        </header>
        <GrievanceForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */

function GrievanceForm() {
  const [formData, setFormData] = useState<GrievanceFormData>({
    grievanceId: "GRV-LOADING...", // Auto-generated ID
    workerName: "",
    grievanceType: "",
    description: "",
    dateReceived: "",
    actionTaken: "",
    status: "Pending", // Default status
    escalatedTo: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Generate Grievance ID on mount
  useEffect(() => {
    const year = new Date().getFullYear();
    const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    setFormData(prev => ({ ...prev, grievanceId: `GRV-${year}-${randomNum}` }));
  }, []);

  // --- DYNAMIC LOGIC ---
  // Show the 'Escalated To' field only if status is "Escalated"
  const isEscalated = formData.status === "Escalated";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (submitted) setSubmitted(false);
  };

   const handleSelectChange = (name: keyof GrievanceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.workerName) errors.push("Please select the Worker Name.");
    if (!data.grievanceType) errors.push("Please select a Grievance Type.");
    if (!data.dateReceived) errors.push("Date Received is required.");
    if (data.description.trim().length < 20) errors.push("Description must be at least 20 characters.");
    if (!data.actionTaken.trim()) errors.push("Action Taken details must be provided.");
    if (!data.status) errors.push("Status must be selected.");
    
    // --- Conditional Validation ---
    if (data.status === "Escalated" && !data.escalatedTo) {
      errors.push("Please select where this grievance was Escalated To.");
    }

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitted Grievance Data:", formData);
      // alert("Grievance Logged Successfully (Simulated)!"); // Optional
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
      {/* SECTION 1: Grievance Details */}
      <ColorSection
        title="Grievance Details"
        icon={<MessageSquareWarning className="w-5 h-5 text-indigo-700" />}
        color="indigo"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <InputField label="Grievance ID" value={formData.grievanceId} readOnly icon={Info} />
          <SelectField
            label="Worker Name"
            name="workerName"
            value={formData.workerName}
            options={["", ...mockWorkers.map(w => w.name)]} // Using mock data
            onChange={(e) => handleSelectChange("workerName", e.target.value)}
            color="indigo"
            icon={User}
          />
          <SelectField
            label="Grievance Type"
            name="grievanceType"
            value={formData.grievanceType}
            options={["", "Safety", "Payment", "Harassment", "Equipment", "Other"]}
            onChange={(e) => handleSelectChange("grievanceType", e.target.value)}
            color="indigo"
            icon={AlertTriangle}
          />
          <InputField
            label="Date Received"
            name="dateReceived"
            type="date"
            value={formData.dateReceived}
            onChange={handleChange}
            icon={CalendarDays}
          />
          <div className="sm:col-span-2">
             <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
             <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter the full description of the worker's grievance..."
                rows={4}
                className="focus:ring-indigo-300 focus:border-indigo-500"
             />
          </div>
        </div>
      </ColorSection>

      {/* SECTION 2: Action & Status */}
      <ColorSection
        title="Resolution & Status"
        icon={<CheckCircle2 className="w-5 h-5 text-green-700" />}
        color="green"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
           <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Action Taken</label>
              <Textarea
                  name="actionTaken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  placeholder="Describe the action taken to resolve this grievance..."
                  rows={4}
                  className="focus:ring-green-300 focus:border-green-500"
              />
            </div>
            
          <SelectField
            label="Current Status"
            name="status"
            value={formData.status}
            options={["Pending", "Resolved", "Escalated"]} // Removed "" to force a default
            onChange={(e) => handleSelectChange("status", e.target.value)}
            color="green"
            icon={formData.status === 'Resolved' ? CheckCircle : (formData.status === 'Escalated' ? ArrowUpCircle : Clock)}
          />
          
          {/* --- DYNAMIC FIELD --- */}
          {isEscalated && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
              <SelectField
                label="Escalated To"
                name="escalatedTo"
                value={formData.escalatedTo}
                options={["", "Contractor", "ULB", "District Nodal"]}
                onChange={(e) => handleSelectChange("escalatedTo", e.target.value)}
                color="green"
                icon={formData.escalatedTo === 'Contractor' ? Shield : formData.escalatedTo === 'ULB' ? Building : UserCheck}
              />
            </motion.div>
          )}
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
            <p className="font-bold">Grievance Logged!</p>
            <p className="text-sm">The grievance (ID: {formData.grievanceId}) has been successfully recorded.</p>
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
          className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-4 h-4" /> Log Grievance
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ---------- Reusable Components (Enhanced) ---------- */

// ColorSection with refined styling
function ColorSection({ title, icon, children, color, }: { title: string; icon: React.ReactNode; children: React.ReactNode; color: "indigo" | "pink" | "green" | "yellow" | "orange"; }) { // Added orange
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
function InputField({ label, name, type = "text", value, placeholder, onChange, readOnly = false, icon: Icon, }: { label: string; name?: string; type?: string; value: string | number; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; icon?: React.ElementType; }) {
  // Don't show icon for date inputs (they have native icons)
  const showIcon = Icon && type !== "date";
  
  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
      <div className="relative rounded-lg shadow-sm">
           {showIcon && <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <Input
              id={name || label} name={name} type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange}
              className={`block w-full ${showIcon ? 'pl-11' : 'pl-3'} pr-3 py-2.5 border-gray-300 rounded-lg text-sm transition duration-150 ${
                readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 hover:border-gray-400"
              }`}
            />
       </div>
    </div>
  );
}

// SelectField component (Enhanced styling, Icon)
function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  color,
  icon: Icon,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  color: string;
  icon?: React.ElementType;
}) {
  const focusRingColor =
    color === "green"
      ? "focus:ring-green-200 focus:border-green-400"
      : "focus:ring-indigo-200 focus:border-indigo-400"; // Default indigo

  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </Label>
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          id={name || label}
          name={name}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 ${focusRingColor} transition duration-150 ${Icon ? "pl-10" : "pl-3"} pr-8 hover:border-gray-400`}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt} disabled={opt === ""}>
              {opt === "" ? "-- Select an Option --" : opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Reusable Label
const Label = React.forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-medium text-gray-700 mb-1.5", className)}
    {...props}
  />
));
Label.displayName = "Label";

// Reusable Textarea
const Textarea = React.forwardRef<
  React.ElementRef<"textarea">,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "block w-full p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 bg-white shadow-inner",
      "focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 hover:border-gray-400",
      "disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";