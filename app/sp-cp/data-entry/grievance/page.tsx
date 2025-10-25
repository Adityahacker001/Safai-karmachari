"use client";

import React, { useState, useEffect } from "react"; // Added useEffect for potential future use
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Save,
  Send,
  ArrowUpCircle,
  CalendarDays,      // For dates
  HelpCircle,        // For Type/Source
  ClipboardList,     // For Description/Action
  Layers,            // For Status Tracking
  Fingerprint,       // For IDs
  User,              // For Source (Worker)
  Users,             // For Source (SHG)
  Globe,             // For Source (Public)
  Info,              // For Remarks
  ChevronDown,
  Hammer,
  Clock
} from "lucide-react";

import { Button } from "@/components/ui/button";

// --- Main Page Component ---
export default function GrievanceEntryPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Grievance Feedback Entry
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Record and manage grievances related to police conduct involving
          Safai Karmacharis.
        </p>
      </header>

      <GrievanceForm />
    </div>
  );
}

/* ------------------------------
    FORM COMPONENT
--------------------------------*/

function GrievanceForm() {
  const [formData, setFormData] = useState({ // Renamed state variable
    grievanceId: "GRV-2025-001", // Usually generated/fetched
    linkedCaseId: "",
    source: "",
    type: "",
    dateReceived: "",
    description: "",
    actionTaken: "",
    dateOfAction: "",
    status: "",
    escalatedTo: "",
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isEscalated = formData.status === "Escalated";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
     // Clear submitted status on change
    if (submitted) {
        setSubmitted(false);
    }
  };

  const validateForm = () => {
    const errs: string[] = [];
    const data = formData; // Use current state data

    if (!data.source) errs.push("Source of grievance is required.");
    if (!data.type) errs.push("Type of complaint is required.");
    if (!data.dateReceived) errs.push("Date Received is required.");
    if (data.description.trim().length < 30) // Trim description
      errs.push("Description must be at least 30 characters long.");
    if (!data.actionTaken.trim()) // Trim action taken
      errs.push("Action Taken details must be provided.");
    if (!data.dateOfAction)
      errs.push("Date of Action must be provided.");
    if (!data.status) errs.push("Please select the current grievance status.");
    if (data.status === "Escalated" && !data.escalatedTo)
      errs.push("Please specify where the grievance was escalated to.");

    setAlerts(errs);
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      setAlerts([]);
       // Replace console.log with actual API call
      console.log("Submitted grievance:", formData);
      alert("Grievance Update Submitted Successfully (Simulated)!");
    } else {
        setSubmitted(false); // Ensure submitted is false if validation fails
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 space-y-8 shadow-lg bg-gradient-to-br from-white via-white to-indigo-50/30" // Enhanced styling
    >
      {/* Section A: Basic Info */}
      <Section title="Grievance Metadata" icon={FileText}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"> {/* Adjusted gap */}
          <FormField label="Grievance ID" value={formData.grievanceId} readOnly icon={Fingerprint} />
          <FormField
            label="Linked Case ID (Optional)"
            name="linkedCaseId"
            placeholder="Link related Case ID if applicable"
            value={formData.linkedCaseId}
            onChange={handleChange}
            icon={Hammer} // Icon for legal case
          />
          <SelectField
            label="Source"
            name="source"
            value={formData.source}
            options={["", "Worker", "SHG (Self Help Group)", "Public"]}
            onChange={handleChange}
            icon={User} // Generic user/source icon
          />
          <SelectField
            label="Complaint Type"
            name="type"
            value={formData.type}
            options={[ "", "Police Inaction", "Delay", "Harassment", "Other", ]}
            onChange={handleChange}
            icon={HelpCircle} // Icon for type/query
          />
          <FormField
            label="Date Received"
            name="dateReceived"
            type="date"
            value={formData.dateReceived}
            onChange={handleChange}
            icon={CalendarDays}
          />
        </div>
      </Section>

      {/* Section B: Description */}
      <Section title="Grievance Description" icon={ClipboardList}>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide a detailed description of the grievance, including specific events, dates, and individuals involved..." // More descriptive placeholder
          rows={5} // Increased rows
          className="w-full border border-slate-300 rounded-md p-3 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150" // Enhanced styling
        />
      </Section>

      {/* Section C: Action Taken */}
      <Section title="Action Taken" icon={CheckCircle}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
           <div className="sm:col-span-2"> {/* Textarea spanning full width */}
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Action Details</label>
              <textarea
                  name="actionTaken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  placeholder="Describe the action taken, steps initiated, communication made, or resolution offered..." // More descriptive placeholder
                  rows={4} // Adjusted rows
                  className="w-full border border-slate-300 rounded-md p-3 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150"
              />
            </div>
          <FormField
            label="Date of Action / Update" // Clarified label
            name="dateOfAction"
            type="date"
            value={formData.dateOfAction}
            onChange={handleChange}
            icon={CalendarDays}
          />
        </div>
      </Section>

      {/* Section D: Status Tracking */}
      <Section title="Status Tracking & Remarks" icon={Layers}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <SelectField
            label="Current Status"
            name="status"
            value={formData.status}
            options={["", "Pending", "Resolved", "Escalated"]}
            onChange={handleChange}
            icon={Clock} // Icon for status/time
          />
          {isEscalated && (
            <SelectField
              label="Escalated To"
              name="escalatedTo"
              value={formData.escalatedTo}
              options={["", "DGP", "NSKC", "Judiciary"]}
              onChange={handleChange}
              icon={ArrowUpCircle} // Icon for escalation
            />
          )}
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-slate-700 block mb-1.5">
            Internal Remarks / Notes (Optional)
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Add any internal comments, follow-up reminders, or observations..."
            rows={3}
             className="w-full border border-slate-300 rounded-md p-3 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150"
          />
        </div>
      </Section>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert"> {/* Enhanced styling */}
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-bold text-base">Validation Errors Found:</p>
          </div>
          <ul className="list-disc pl-7 text-sm space-y-1">
            {alerts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-end pt-6 border-t border-slate-200"> {/* Use flex-wrap */}
        <Button
          type="button"
          variant="outline"
          onClick={() => alert("Saved as Draft (simulation)")}
          className="flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-100 shadow-sm hover:shadow"
        >
          <Save className="w-4 h-4" /> Save as Draft
        </Button>

        <Button
          type="button"
          onClick={() => {
            setFormData({ ...formData, status: "Escalated" }); // Update state directly
            alert("Grievance marked as Escalated. Fill 'Escalated To' and Submit.");
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg" // Gradient button
        >
          <ArrowUpCircle className="w-4 h-4" /> Escalate
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-4 h-4" /> Submit Update
        </Button>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-6 flex items-center gap-3 shadow-sm transition-opacity duration-300" role="alert"> {/* Enhanced styling */}
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-bold">Success!</p>
            <p className="text-sm">Grievance update successfully submitted and logged.</p>
          </div>
        </div>
      )}
    </form>
  );
}

/* ---------- Reusable Components ---------- */

// Section component with Icon
function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType, children: React.ReactNode }) {
  return (
    <div className="space-y-4 border-b border-gray-200 pb-6 last:border-b-0">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3 border-l-4 border-indigo-600 pl-3 py-1 bg-indigo-50/50 rounded-r-md"> {/* Enhanced Section Header */}
        <Icon className="w-5 h-5 text-indigo-700" /> {title}
      </h2>
      <div className="pl-4"> {/* Indent content */}
        {children}
      </div>
    </div>
  );
}

// FormField component (Enhanced with Icon)
function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  readOnly = false,
  icon: Icon,
}: {
  label: string;
  name?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  icon?: React.ElementType; // Corrected type for `Icon`
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full p-2.5 border border-slate-300 rounded-lg text-sm transition duration-150 ${Icon ? "pl-10" : "pl-3"} ${
            readOnly
              ? "bg-slate-100 text-slate-500 cursor-not-allowed"
              : "bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 hover:border-slate-400"
          }`}
        />
      </div>
    </div>
  );
}

// SelectField component (Enhanced with Icon)
function SelectField({
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
  icon?: React.ElementType; // Corrected type for `Icon`
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`appearance-none w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150 ${Icon ? "pl-10" : "pl-3"} pr-8 hover:border-slate-400`}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt} disabled={opt === ""}>
              {opt === "" ? "-- Select an Option --" : opt}
            </option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// RadioField component (Enhanced styling)
function RadioField({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 block mb-2">{label}</label> {/* Adjusted margin */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-indigo-50 transition-colors"> {/* Added hover */}
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="h-4 w-4 accent-indigo-600 border-gray-300 focus:ring-indigo-500" // Styled radio with accent color
            />
            <span className="text-slate-800">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}