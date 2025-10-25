"use client";

import React, { useState, useEffect } from "react"; // Added useEffect for potential future use
import { motion } from "framer-motion";
import {
  FileText,          // Section Icon, Document Icon
  CalendarDays,      // Date Icon
  Upload,            // Button Icon
  Send,              // Button Icon
  Save,              // Button Icon
  CheckCircle2,      // Section Icon
  AlertTriangle,     // Alert Icon, Status Icon
  ClipboardList,     // Section Icon
  FolderUp,          // Section Icon
  Clock,             // Status Icon
  Info,              // ID Icon
  Building,          // Authority Icon
  User,              // Officer Icon
  X,                 // Remove File Icon
  FileIcon,          // File List Icon
  ChevronDown        // Added ChevronDown icon
} from "lucide-react";

// --- Main Page Component ---
export default function DirectionCompliancePage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8"> {/* Removed gradient background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-indigo-100/80" // Refined container
      >
        {/* Header */}
        <header className="text-center mb-10 pb-6 border-b border-indigo-200/80">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 tracking-tight" // Adjusted Gradient
          >
            Direction Compliance Entry
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.4 }}
             className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto" // Centered and constrained width
           >
            Record, track, and manage the compliance status of official directions received
            from higher authorities like NSKC, DGP, or Judiciary.
          </motion.p>
        </header>

        <ComplianceForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */

interface FormData {
    directionId: string;
    issuingAuthority: string;
    dateReceived: string;
    subject: string;
    complianceSummary: string;
    dateOfCompliance: string;
    responsibleOfficer: string;
    files: File[];
    status: string;
    remarks: string;
}

function ComplianceForm() {
  const [formData, setFormData] = useState<FormData>({
    directionId: "", // Start empty, selected from dropdown
    issuingAuthority: "", // Auto-filled
    dateReceived: "",
    subject: "", // Auto-filled
    complianceSummary: "",
    dateOfCompliance: "",
    responsibleOfficer: "",
    files: [],
    status: "",
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Derive issuingAuthority and subject based on selected directionId (simulated)
  useEffect(() => {
    let authority = "";
    let subj = "";
    switch (formData.directionId) {
        case "DIR-2025-001": authority = "NSKC"; subj = "Report on Sewer Worker Fatality"; break;
        case "DIR-2025-002": authority = "DGP Office"; subj = "Compliance on Safety Protocols"; break;
        case "DIR-2025-003": authority = "Judiciary"; subj = "Follow-up on Worker Compensation"; break;
        case "DIR-2025-004": authority = "NSKC"; subj = "Monthly Compliance Data Submission"; break;
    }
    setFormData(prev => ({ ...prev, issuingAuthority: authority, subject: subj }));
  }, [formData.directionId]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (submitted) setSubmitted(false); // Reset submission status on change
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Optional: Add checks for file size, type, or number of files
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles].slice(0, 5), // Limit to 5 files example
      }));
    }
     if (submitted) setSubmitted(false);
  };

  const removeFile = (index: number) => {
    const updated = [...formData.files];
    updated.splice(index, 1);
    setFormData({ ...formData, files: updated });
     if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;
    if (!data.directionId) errors.push("Please select the Direction ID you are responding to.");
    if (!data.dateReceived) errors.push("Date Received for the direction is required.");
    if (data.complianceSummary.trim().length < 50) // Increased minimum length
        errors.push("Compliance Summary must be detailed (at least 50 characters).");
    if (!data.dateOfCompliance) errors.push("Date of Compliance action is required.");
    if (!data.responsibleOfficer.trim()) errors.push("Responsible Officer name is required.");
    if (!data.status) errors.push("Compliance Status must be selected ('Complied' or 'Pending').");
    if (data.status === 'Pending' && !data.remarks.trim()) errors.push("Remarks are required if the status is 'Pending'.")
     // Optional: Check if files are uploaded if status is 'Complied'
    // if (data.status === 'Complied' && data.files.length === 0) errors.push("Supporting documents are usually required for 'Complied' status.")

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitted Direction Compliance:", {
        ...formData,
        files: formData.files.map((f) => f.name),
      });
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
      {/* SECTION 1: Direction Metadata */}
      <ColorSection title="Direction Metadata" icon={<ClipboardList className="w-5 h-5 text-indigo-700"/>} color="indigo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <SelectField
            label="Select Received Direction ID" // Clarified Label
            name="directionId" value={formData.directionId}
            options={[ "", "DIR-2025-001", "DIR-2025-002", "DIR-2025-003", "DIR-2025-004", ]}
            onChange={handleChange}
            color="indigo"
            icon={Info}
          />
          <InputField label="Issuing Authority" value={formData.issuingAuthority} readOnly icon={Building}/>
          <InputField label="Date Received" name="dateReceived" type="date" value={formData.dateReceived} onChange={handleChange} icon={CalendarDays}/>
          <InputField label="Subject / Summary" value={formData.subject} readOnly placeholder="Auto-filled after selecting ID" icon={FileText} />
        </div>
      </ColorSection>

      {/* SECTION 2: Compliance Summary */}
      <ColorSection title="Compliance Summary & Details" icon={<FileText className="w-5 h-5 text-emerald-700"/>} color="emerald">
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Compliance Actions Summary</label>
        <textarea
            name="complianceSummary" value={formData.complianceSummary} onChange={handleChange}
            placeholder="Describe actions taken or steps completed to comply with this direction..."
            rows={5} // Increased rows
            className="w-full border border-emerald-200/80 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-lg p-3 text-sm bg-white shadow-inner transition duration-150" // Enhanced styling
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mt-4">
          <InputField label="Date of Compliance Action" name="dateOfCompliance" type="date" value={formData.dateOfCompliance} onChange={handleChange} icon={CalendarDays}/>
          <InputField label="Officer Responsible for Compliance" name="responsibleOfficer" value={formData.responsibleOfficer} onChange={handleChange} placeholder="Enter officer's full name" icon={User}/>
        </div>
      </ColorSection>

      {/* SECTION 3: Supporting Documents */}
      <ColorSection title="Supporting Documents" icon={<FolderUp className="w-5 h-5 text-pink-600"/>} color="pink">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Relevant Files (Max 5, PDF/DOC/JPG/PNG)
        </label>
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-pink-300 rounded-xl p-6 bg-pink-50/70 hover:bg-pink-100 transition text-center cursor-pointer"
        >
          <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2 text-pink-700 font-medium">
            <Upload className="w-8 h-8 animate-bounce" /> {/* Added animation */}
            Click to Upload or Drag & Drop Files Here
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
                className="flex items-center justify-between bg-white border border-pink-200 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow duration-150"
              >
                 <div className="flex items-center gap-2 overflow-hidden">
                     <FileIcon className="w-5 h-5 text-pink-500 flex-shrink-0" /> {/* Generic File Icon */}
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
                    <X className="w-4 h-4" /> {/* Use X icon */}
                 </button>
              </motion.div>
            ))}
          </div>
        )}
      </ColorSection>

      {/* SECTION 4: Status */}
      <ColorSection title="Compliance Status & Remarks" icon={<Clock className="w-5 h-5 text-amber-600"/>} color="amber">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <SelectField
              label="Select Current Status" name="status" value={formData.status}
              options={["", "Complied", "Pending"]} onChange={handleChange}
              color="amber" icon={formData.status === 'Complied' ? CheckCircle2 : Clock}
            />
             <div className="sm:col-span-2"> {/* Textarea spanning full width */}
                 <label className="text-sm font-medium text-gray-700 block mb-1.5">Remarks / Follow-up Notes</label>
                  <textarea
                    name="remarks" value={formData.remarks} onChange={handleChange}
                    placeholder="Add mandatory remarks if status is Pending, or optional notes..."
                    rows={3}
                    className="w-full border border-amber-200/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-lg p-3 text-sm bg-white shadow-inner transition duration-150"
                  />
            </div>
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
            <p className="font-bold text-base">Please address the following:</p>
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
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
             <p className="font-bold">Submission Successful!</p>
             <p className="text-sm">Direction compliance status has been updated and logged.</p>
           </div>
        </motion.div>
      )}

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-gray-200/80">
        <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => alert("Draft saved successfully (simulation)")}
            className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium text-sm shadow-sm transition-all duration-200"
          >
          <Save className="w-4 h-4" /> Save Draft
        </motion.button>

        <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
          >
          <Send className="w-4 h-4" /> Submit Compliance
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ---------- Reusable Components (Enhanced) ---------- */

// ColorSection with refined styling
function ColorSection({ title, icon, children, color }: { title: string; icon: React.ReactNode; children: React.ReactNode; color: "indigo" | "emerald" | "pink" | "amber"; }) {
  const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
    indigo: { border: "border-indigo-200/80", bg: "bg-indigo-50/60", text: "text-indigo-800", iconBg: "bg-indigo-100" },
    emerald: { border: "border-emerald-200/80", bg: "bg-emerald-50/60", text: "text-emerald-800", iconBg: "bg-emerald-100" },
    pink: { border: "border-pink-200/80", bg: "bg-pink-50/60", text: "text-pink-800", iconBg: "bg-pink-100" },
    amber: { border: "border-amber-200/80", bg: "bg-amber-50/60", text: "text-amber-800", iconBg: "bg-amber-100" },
  };

  const styles = colorMap[color];

  return (
    <div className={`p-5 rounded-xl ${styles.bg} border ${styles.border} shadow-sm space-y-4`}>
      <h2 className={`text-lg font-semibold flex items-center gap-3 ${styles.text}`}>
        <span className={`p-1.5 rounded-md ${styles.iconBg}`}>{icon}</span>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

// FormField component (Enhanced with Icon)
function InputField({ label, name, type = "text", value, placeholder, onChange, readOnly = false, icon: Icon, }: { label: string; name?: string; type?: string; value: string; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; icon?: React.ElementType; }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative rounded-lg shadow-sm">
           {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>} {/* Increased Icon size */}
            <input
              name={name} type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange}
              className={`block w-full p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 ${Icon ? 'pl-10' : 'pl-3'} ${
                readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 hover:border-gray-400"
              }`}
            />
       </div>
    </div>
  );
}

// SelectField component (Enhanced with Icon)
function SelectField({ label, name, value, options, onChange, color, icon: Icon, }: { label: string; name: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; color: string; icon?: React.ElementType; }) {
   const focusRingColor =
    color === "pink"   ? "focus:ring-pink-200 focus:border-pink-400"
   : color === "emerald" ? "focus:ring-emerald-200 focus:border-emerald-400" // Corrected color name
   : color === "amber"   ? "focus:ring-amber-200 focus:border-amber-400" // Corrected color name
   : "focus:ring-indigo-200 focus:border-indigo-400"; // Default indigo

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
       <div className="relative rounded-lg shadow-sm">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>} {/* Increased Icon size */}
            <select
              name={name} value={value} onChange={onChange}
              className={`appearance-none block w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 ${focusRingColor} transition duration-150 ${Icon ? 'pl-10' : 'pl-3'} pr-8 hover:border-gray-400`}
            >
              {options.map((opt, i) => ( <option key={i} value={opt} disabled={opt === ""}> {opt === "" ? "-- Select an Option --" : opt} </option> ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <ChevronDown className="h-4 w-4 text-gray-400"/> </div>
        </div>
    </div>
  );
}

// --- Dummy Icons (Remove if using actual imports) ---
// const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const CheckBadge = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const Lock = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const Globe = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const BellRing = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const Info = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const Building = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const FileIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const X = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const MessageCircleWarning = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );
// const ThumbsUp = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props}>...</svg> );