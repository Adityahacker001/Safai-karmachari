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
  FileText,
  AlertTriangle,
  CheckCircle,
  Save,
  Send,
  CalendarDays,
  Upload,
  ClipboardList,
  Building, // For Authority
  Clock, // For Status
  Info, // For ID
  Gavel, // Page Header
  FileIcon, // For File List
  X, // For Remove File
  ChevronDown, // For Select
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
interface DirectionFormState {
  directionId: string;
  issuingAuthority: string;
  directionSummary: string;
  dateReceived: string;
  replySubmitted: string;
  files: File[];
  status: string;
}

// --- Main Page Component ---
export default function DirectionInputPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-indigo-100/80"
      >
        {/* Header */}
        <header className="text-center mb-10 pb-6 border-b border-indigo-200/80">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 tracking-tight"
          >
            Direction Input Form
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.4 }}
             className="text-sm text-gray-600 mt-2 max-w-xl mx-auto"
           >
            Log and track official directions received from higher authorities (ULB, District, State, NSKC).
          </motion.p>
        </header>

        <DirectionForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */

function DirectionForm() {
  const [formData, setFormData] = useState<DirectionFormState>({
    directionId: "DIR-LOADING...", // Auto-generated
    issuingAuthority: "",
    directionSummary: "",
    dateReceived: "",
    replySubmitted: "",
    files: [],
    status: "Pending", // Default status
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Generate Direction ID on mount
  useEffect(() => {
    const year = new Date().getFullYear();
    const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    setFormData(prev => ({ ...prev, directionId: `DIR-${year}-${randomNum}` }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSelectChange = (name: keyof DirectionFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles].slice(0, 5), // Limit to 5 files
      }));
      if (submitted) setSubmitted(false);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, files: updatedFiles });
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.issuingAuthority) errors.push("Issuing Authority is required.");
    if (!data.dateReceived) errors.push("Date Received is required.");
    if (data.directionSummary.trim().length < 20) errors.push("Direction Summary must be at least 20 characters.");
    if (data.replySubmitted.trim().length < 20) errors.push("Reply Submitted details must be at least 20 characters.");
    if (data.status === "Complied" && data.files.length === 0) {
        errors.push("Supporting Documents are required if status is 'Complied'.");
    }
    if (!data.status) errors.push("Status must be selected.");

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting Direction:", {
          ...formData,
          files: formData.files.map(f => f.name) // Log file names
      });
      alert("Direction Logged Successfully (Simulation)!");
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
      {/* SECTION 1: Direction Details */}
      <ColorSection
        title="Direction Details"
        icon={<Gavel className="w-5 h-5 text-indigo-700" />}
        color="indigo"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <InputField label="Direction ID" value={formData.directionId} readOnly icon={Info} />
          
          <SelectField
            label="Issuing Authority"
            name="issuingAuthority"
            value={formData.issuingAuthority}
            options={["", "ULB", "District", "State", "NSKC"]}
            onChange={(e) => handleSelectChange("issuingAuthority", e.target.value)}
            color="indigo"
            icon={Building}
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
             <label className="text-sm font-medium text-gray-700 block mb-1.5">Direction Summary</label>
             <Textarea
                name="directionSummary"
                value={formData.directionSummary}
                onChange={handleChange}
                placeholder="Enter the full summary of the direction received..."
                rows={4}
                className="focus:ring-indigo-300 focus:border-indigo-500"
             />
          </div>
        </div>
      </ColorSection>

      {/* SECTION 2: Compliance Response */}
      <ColorSection
        title="Compliance Response"
        icon={<CheckCircle className="w-5 h-5 text-green-700" />}
        color="green"
      >
        <div className="space-y-6">
           <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Reply Submitted</label>
              <Textarea
                  name="replySubmitted"
                  value={formData.replySubmitted}
                  onChange={handleChange}
                  placeholder="Describe the action taken or response provided..."
                  rows={4}
                  className="focus:ring-green-300 focus:border-green-500"
              />
            </div>

            {/* File Upload */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents (If any)
                </label>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/70 hover:bg-gray-100 transition text-center cursor-pointer"
                >
                  <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" id="fileUpload" />
                  <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-600 font-medium">
                    <Upload className="w-8 h-8 text-gray-500" />
                    Click to Upload or Drag & Drop Files
                    <span className="text-xs text-gray-400">PDF, DOC, JPG, PNG (Max 5 files)</span>
                  </label>
                </motion.div>

                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                     <p className="text-xs font-medium text-gray-600">Uploaded Files ({formData.files.length}/5):</p>
                     {formData.files.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm hover:shadow-md"
                      >
                         <div className="flex items-center gap-2 overflow-hidden">
                             <FileIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                             <span className="text-sm text-gray-700 truncate" title={file.name}>
                               {file.name}
                             </span>
                             <span className="text-xs text-gray-400 flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                         </div>
                         <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                            title="Remove File"
                         >
                            <X className="w-4 h-4" />
                         </button>
                      </motion.div>
                    ))}
                  </div>
                )}
            </div>
            
            <SelectField
                label="Current Status"
                name="status"
                value={formData.status}
                options={["Pending", "Complied"]}
                onChange={(e) => handleSelectChange("status", e.target.value)}
                color="green"
                icon={formData.status === 'Complied' ? CheckCircle : Clock}
            />
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
            <p className="font-bold">Direction Logged!</p>
            <p className="text-sm">The direction (ID: {formData.directionId}) has been successfully recorded.</p>
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
          <Send className="w-4 h-4" /> Log Direction
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ---------- Reusable Components (Enhanced) ---------- */

function ColorSection({ title, icon, children, color, }: { title: string; icon: React.ReactNode; children: React.ReactNode; color: "indigo" | "pink" | "green" | "yellow" | "orange"; }) {
  const colorMap: Record<string, { border: string, bg: string, text: string, iconBg: string }> = {
    indigo: { border: "border-indigo-200/80", bg: "bg-indigo-50/50",   text: "text-indigo-800", iconBg: "bg-indigo-100" },
    pink:   { border: "border-pink-200/80",   bg: "bg-pink-50/50",     text: "text-pink-800",   iconBg: "bg-pink-100" },
    green:  { border: "border-green-200/80",  bg: "bg-green-50/50",    text: "text-green-800",  iconBg: "bg-green-100" },
    yellow: { border: "border-yellow-200/80", bg: "bg-yellow-50/50",   text: "text-yellow-800", iconBg: "bg-yellow-100" },
    orange: { border: "border-orange-200/80", bg: "bg-orange-50/50",   text: "text-orange-800", iconBg: "bg-orange-100" },
  };
  const styles = colorMap[color as keyof typeof colorMap] || colorMap.indigo;

  return (
    <motion.div
       initial={{ opacity: 0, y: 15 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.3 }}
       transition={{ duration: 0.4, ease: "easeOut" }}
       className={`p-5 rounded-xl ${styles.bg} border ${styles.border} shadow-sm space-y-4`}
     >
      <h2 className={`text-lg font-semibold flex items-center gap-3 ${styles.text}`}>
         <span className={`p-1.5 rounded-lg ${styles.iconBg}`}>{icon}</span>
         {title}
      </h2>
      <div className="pl-1">{children}</div>
    </motion.div>
  );
}

function InputField({ label, name, type = "text", value, placeholder, onChange, readOnly = false, icon: Icon, }: { label: string; name?: string; type?: string; value: string | number; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; icon?: React.ElementType; }) {
  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
      <div className="relative rounded-lg shadow-sm">
           {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <Input
              id={name || label} name={name} type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange}
              className={`block w-full pl-10 p-2.5 border-gray-300 rounded-lg text-sm transition duration-150 ${
                readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 hover:border-gray-400"
              }`}
            />
       </div>
    </div>
  );
}

function SelectField({ label, name, value, options, onChange, color, icon: Icon, }: { label: string; name: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; color: string; icon?: React.ElementType; }) {
   const focusRingColor =
    color === "green"  ? "focus:ring-green-200 focus:border-green-400"
   : "focus:ring-indigo-200 focus:border-indigo-400"; // Default indigo

  return (
    <div className="relative">
      <Label htmlFor={name || label} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</Label>
       <div className="relative rounded-lg shadow-sm">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
            <select
              id={name || label} name={name} value={value} onChange={onChange}
              className={`appearance-none block w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 ${focusRingColor} transition duration-150 ${Icon ? 'pl-10' : 'pl-3'} pr-8 hover:border-gray-400`}
            >
              {options.map((opt, i) => ( <option key={i} value={opt} disabled={opt === ""}> {opt === "" ? "-- Select an Option --" : opt} </option> ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <ChevronDown className="h-4 w-4 text-gray-400"/> </div>
        </div>
    </div>
  );
}