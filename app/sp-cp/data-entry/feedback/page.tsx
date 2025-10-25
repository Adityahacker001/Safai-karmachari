"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion"; // Import framer-motion
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Save,
  Send,
  Star,
  Users,
  Globe,
  CalendarDays,
  ThumbsUp,
  MessageSquare,
  MessageCircleWarning,
  Info,
  Smile,
  Lock,
  ChevronDown,
  User
} from "lucide-react";

import { Button } from "@/components/ui/button";

// --- Interfaces (remain the same) ---
interface FormData {
    feedbackId: string;
    source: string;
    type: string;
    dateReceived: string;
    description: string;
    actionTaken: string;
    dateOfAction: string;
    status: string;
}

// --- Main Page Component ---
export default function GeneralFeedbackPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8"> {/* Removed gradient background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-indigo-100/80" // Refined container style
      >
        {/* HEADER */}
        <header className="text-center mb-10 pb-6 border-b border-indigo-200/80"> {/* Increased bottom margin */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight"
          >
            General Feedback Entry
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.4 }}
             className="text-sm text-gray-600 mt-2 max-w-xl mx-auto"
           >
            Submit, track, and respond to general feedback — suggestions,
            appreciation, or complaints related to Safai Karmachari operations.
          </motion.p>
        </header>

        <FeedbackForm />
      </motion.div>
    </div>
  );
}

/* ----------------------------- FORM ----------------------------- */
function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    feedbackId: "FDBK-LOADING...", // Initial placeholder
    source: "",
    type: "",
    dateReceived: "",
    description: "",
    actionTaken: "",
    dateOfAction: "",
    status: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Generate Feedback ID on mount
  useEffect(() => {
    const year = new Date().getFullYear();
    const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    setFormData(prev => ({ ...prev, feedbackId: `FDBK-${year}-${randomNum}` }));
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

  const validate = () => {
    const errors: string[] = [];
    const data = formData;
    if (!data.source) errors.push("Please select the Source of the feedback.");
    if (!data.type) errors.push("Please select the Feedback Type.");
    if (!data.dateReceived) errors.push("Date Received is required.");
    if (data.description.trim().length < 30) errors.push("Description must be at least 30 characters long.");
    if (data.status === "Resolved") {
        if(!data.actionTaken.trim()) errors.push("Action Taken details are required when status is Resolved.");
        if(!data.dateOfAction) errors.push("Date of Action is required when status is Resolved.");
    }
    if (!data.status) errors.push("Please select the current feedback status.");
    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Feedback submitted:", formData);
      // alert("Feedback Submitted Successfully (Simulated)!"); // Optional feedback
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
      {/* SECTION: Metadata */}
      <ColorSection
        title="Feedback Metadata"
        icon={<FileText className="w-5 h-5 text-indigo-700" />}
        color="indigo"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <InputField label="Feedback ID" value={formData.feedbackId} readOnly icon={Info} />
          <SelectField
            label="Source" name="source" value={formData.source}
            options={["", "Staff", "Public", "NSKC"]} onChange={handleChange}
            color="indigo" icon={formData.source === 'NSKC' ? Globe : formData.source === 'Public' ? Users : User}
          />
          <SelectField
            label="Feedback Type" name="type" value={formData.type}
            options={["", "Suggestion", "Appreciation", "Complaint"]} onChange={handleChange}
            color="indigo" icon={formData.type === 'Appreciation' ? ThumbsUp : formData.type === 'Complaint' ? MessageCircleWarning : MessageSquare}
          />
          <InputField
            label="Date Received" name="dateReceived" type="date"
            value={formData.dateReceived} onChange={handleChange}
            icon={CalendarDays}
          />
        </div>
      </ColorSection>

      {/* SECTION: Description */}
      <ColorSection
        title="Feedback Description"
        icon={<Star className="w-5 h-5 text-pink-600" />}
        color="pink"
      >
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Detailed Feedback</label>
        <textarea
          name="description" value={formData.description} onChange={handleChange}
          placeholder="Write detailed feedback, suggestion, or appreciation here. Include specifics where possible..."
          rows={5}
          className="w-full border border-pink-200/80 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-lg p-3 text-sm bg-white shadow-inner transition duration-150"
        />
      </ColorSection>

      {/* SECTION: Action Taken */}
      <ColorSection
        title="Action Taken / Response"
        icon={<CheckCircle2 className="w-5 h-5 text-green-700" />}
        color="green" // Changed color name for consistency
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
           <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Action / Response Details</label>
              <textarea
                  name="actionTaken" value={formData.actionTaken} onChange={handleChange}
                  placeholder="Record what action or response was taken regarding this feedback..."
                  rows={4}
                  className="w-full border border-green-200/80 focus:border-green-400 focus:ring-2 focus:ring-green-100 rounded-lg p-3 text-sm bg-white shadow-inner transition duration-150"
              />
            </div>
          <InputField
            label="Date of Action / Update" name="dateOfAction" type="date"
            value={formData.dateOfAction} onChange={handleChange}
            icon={CalendarDays}
          />
        </div>
      </ColorSection>

      {/* SECTION: Status */}
      <ColorSection
        title="Feedback Status"
        icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
        color="yellow" // Changed color name for consistency
      >
        <SelectField
          label="Current Status" name="status" value={formData.status}
          options={["", "Pending", "Resolved"]} onChange={handleChange}
          color="yellow" icon={formData.status === 'Resolved' ? CheckCircle2 : Lock}
        />
      </ColorSection>

      {/* VALIDATION ALERTS */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-md my-6" role="alert" // Enhanced styling
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="font-bold text-base">Please correct the following errors:</p>
          </div>
          <ul className="list-disc pl-7 text-sm space-y-1">
            {alerts.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* SUCCESS ALERT */}
      {submitted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md mt-6 flex items-center gap-3 shadow-md" role="alert" // Enhanced styling
        >
          <Smile className="w-6 h-6 text-green-600 flex-shrink-0 animate-pulse" /> {/* Added pulse animation */}
          <div>
            <p className="font-bold">Feedback Submitted!</p>
            <p className="text-sm">Thank you, the feedback has been successfully logged.</p>
          </div>
        </motion.div>
      )}

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-gray-200/80">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => alert("Feedback saved as draft (simulation)")}
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
          <Send className="w-4 h-4" /> Submit Feedback
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ---------- Reusable Components (Enhanced) ---------- */

// ColorSection with refined styling
function ColorSection({
  title,
  icon,
  children,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  color: "indigo" | "pink" | "green" | "yellow"; // Corrected color names
}) {
  const colorMap: Record<string, { border: string, bg: string, text: string, iconBg: string }> = {
    indigo: { border: "border-indigo-200/80", bg: "bg-indigo-50/50",   text: "text-indigo-800", iconBg: "bg-indigo-100" },
    pink:   { border: "border-pink-200/80",   bg: "bg-pink-50/50",     text: "text-pink-800",   iconBg: "bg-pink-100" },
    green:  { border: "border-green-200/80",  bg: "bg-green-50/50",    text: "text-green-800",  iconBg: "bg-green-100" },
    yellow: { border: "border-yellow-200/80", bg: "bg-yellow-50/50",   text: "text-yellow-800", iconBg: "bg-yellow-100" },
  };
  const styles = colorMap[color];

  return (
    <motion.div
       initial={{ opacity: 0, y: 15 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% visible
       transition={{ duration: 0.4, ease: "easeOut" }}
       className={`p-5 rounded-xl ${styles.bg} border ${styles.border} shadow-sm space-y-4`} // Enhanced styling
     >
      <h2 className={`text-lg font-semibold flex items-center gap-3 ${styles.text}`}>
         <span className={`p-1.5 rounded-md ${styles.iconBg}`}>{icon}</span> {/* Icon background */}
         {title}
      </h2>
      <div className="pl-1">{children}</div>
    </motion.div>
  );
}

// FormField component (Enhanced styling, Icon)
function InputField({ label, name, type = "text", value, placeholder, onChange, readOnly = false, icon: Icon, }: { label: string; name?: string; type?: string; value: string; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; icon?: React.ElementType; }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative rounded-lg shadow-sm">
           {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
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

// SelectField component (Enhanced styling, Icon)
function SelectField({ label, name, value, options, onChange, color, icon: Icon, }: { label: string; name: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; color: string; icon?: React.ElementType; }) {
   const focusRingColor =
    color === "pink"   ? "focus:ring-pink-200 focus:border-pink-400"
   : color === "green"  ? "focus:ring-green-200 focus:border-green-400"
   : color === "yellow" ? "focus:ring-yellow-200 focus:border-yellow-400"
   : "focus:ring-indigo-200 focus:border-indigo-400";

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
       <div className="relative rounded-lg shadow-sm">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
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