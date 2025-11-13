"use client";

import React, { useState, useEffect } from "react"; // Added useEffect for potential future use
import {
  FileText,
  CalendarDays,
  ShieldCheck, // Placeholder icon for Categorization/Officer
  AlertTriangle,
  CheckCircle,
  Save,
  Send,
  Building, // Placeholder for Police Station
  Fingerprint, // Placeholder for Incident ID
  ClipboardList, // Placeholder icon for FIR Details
  SearchCheck, // Placeholder icon for Investigation Progress
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Main Page Component ---
export default function InvestigationEntryPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 min-h-screen w-full">
      {/* District-style title banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">Investigation Progress Entry</h1>
            <p className="text-sm text-white/90 mt-1">Fill or update investigation details for a linked incident.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      <InvestigationForm />
    </div>
  );
}

/* ------------------------------
    FORM COMPONENT
--------------------------------*/

function InvestigationForm() {
  const [formData, setFormData] = useState({ // Renamed state variable
    caseId: "CASE-2025-001", // Usually generated/fetched
    incidentId: "",
    dateOfIncident: "",
    policeStation: "",
    category: "",
    officer: "",
    firFiled: "No",
    firNo: "",
    firDate: "",
    sectionsInvoked: "",
    investigationStatus: "",
    findings: "",
    chargeSheetFiled: "No",
    chargeSheetDate: "",
    remarks: "",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // conditional fields
  const firVisible = formData.firFiled === "Yes";
  const chargeSheetVisible = formData.chargeSheetFiled === "Yes";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear submitted status on change after successful submission
    if (submitted) {
        setSubmitted(false);
    }
  };

  const validateForm = () => {
    const newAlerts: string[] = [];
    const data = formData; // Use current state data

    if (!data.incidentId) newAlerts.push("Incident ID is required.");
    if (!data.policeStation) newAlerts.push("Please select Police Station.");
    if (!data.category) newAlerts.push("Incident category is required.");
    if (!data.officer) newAlerts.push("Investigation Officer name required.");

    if (data.firFiled === "Yes") {
      if (!data.firNo) newAlerts.push("FIR Number is required when FIR is filed.");
      if (!data.firDate) newAlerts.push("FIR Date is required when FIR is filed.");
      if (!data.sectionsInvoked) newAlerts.push("Sections Invoked are required when FIR is filed.");
    }

    if (!data.investigationStatus)
      newAlerts.push("Select investigation status.");
    if (data.investigationStatus === "Completed" && !data.findings.trim()) // Check trimmed findings
      newAlerts.push("Findings summary required for completed cases.");

    if (data.chargeSheetFiled === "Yes" && !data.chargeSheetDate)
      newAlerts.push("Please provide date of Charge Sheet filed.");

    setAlerts(newAlerts);
    return newAlerts.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      setAlerts([]);
      // Replace console.log with actual API call
      console.log("Form submitted successfully:", formData);
      alert("Form Submitted Successfully (Simulated)!");
    } else {
        setSubmitted(false); // Ensure submitted is false if validation fails
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-8 bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-lg" // Enhanced styling
    >
      {/* 🧾 Section 1: Case & Incident Details */}
      <Section title="Case & Incident Details" icon={FileText}>
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-5"> {/* Mobile: 2 columns, preserve larger breakpoints */}
          <FormField label="Case ID" value={formData.caseId} readOnly icon={Fingerprint} />
          <FormField
            label="Incident ID"
            name="incidentId"
            value={formData.incidentId}
            placeholder="Link Incident ID (e.g., INC-001)"
            onChange={handleChange}
            icon={AlertTriangle} // Example icon
          />
          <FormField
            label="Date of Incident"
            name="dateOfIncident"
            type="date"
            value={formData.dateOfIncident}
            onChange={handleChange}
            icon={CalendarDays}
          />
          <SelectField
            label="Police Station"
            name="policeStation"
            value={formData.policeStation}
            options={[ "", "Central PS", "North PS", "South PS", "East PS", "West PS" ]}
            onChange={handleChange}
            icon={Building} // Example icon
          />
        </div>
      </Section>

      {/* 🔹 Section 2: Categorization */}
      <Section title="Incident Categorization & Officer" icon={ShieldCheck}>
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
          <SelectField
            label="Incident Category"
            name="category"
            value={formData.category}
            options={[ "", "Manual Scavenging Death", "Sewer Injury", "Hazardous Exposure", "Other" ]}
            onChange={handleChange}
            icon={AlertTriangle} // Example icon matching category
          />
          <FormField
            label="Investigation Officer"
            name="officer"
            value={formData.officer}
            placeholder="Enter assigned officer's name"
            onChange={handleChange}
            icon={User} // Example icon
          />
        </div>
      </Section>

      {/* ⚖️ Section 3: FIR Details */}
      <Section title="FIR Registration Details" icon={ClipboardList}>
        <div className="space-y-4"> {/* Increased spacing */}
          <RadioField
            label="FIR Filed?"
            name="firFiled"
            value={formData.firFiled}
            options={["Yes", "No"]}
            onChange={handleChange}
          />

          {firVisible && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-dashed border-slate-300 pt-4 mt-4 bg-slate-50 p-4 rounded-md"> {/* Mobile: 2 columns, desktop still 3 */}
              <FormField
                label="FIR Number"
                name="firNo"
                value={formData.firNo}
                placeholder="Enter FIR No."
                onChange={handleChange}
              />
              <FormField
                label="Date Filed"
                name="firDate"
                type="date"
                value={formData.firDate}
                onChange={handleChange}
              />
              <FormField
                label="Sections Invoked"
                name="sectionsInvoked"
                value={formData.sectionsInvoked}
                placeholder="E.g. IPC 304A, MS Act S.9" // Updated placeholder
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </Section>

      {/* 🔍 Section 4: Investigation Progress */}
      <Section title="Investigation Progress" icon={SearchCheck}>
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
          <SelectField
            label="Investigation Status"
            name="investigationStatus"
            value={formData.investigationStatus}
            options={["", "Initiated", "In Progress", "Completed", "Closed"]} // Added Closed
            onChange={handleChange}
          />
          <RadioField
            label="Charge Sheet Filed?"
            name="chargeSheetFiled"
            value={formData.chargeSheetFiled}
            options={["Yes", "No"]}
            onChange={handleChange}
          />
          {chargeSheetVisible && (
             <div className="sm:col-span-2 bg-slate-50 p-4 rounded-md border-t border-dashed border-slate-300"> {/* Visual grouping */}
                <FormField
                  label="Date of Charge Sheet"
                  name="chargeSheetDate"
                  type="date"
                  value={formData.chargeSheetDate}
                  onChange={handleChange}
                />
            </div>
          )}
        </div>

        <div className="mt-5"> {/* Increased margin */}
          <label className="text-sm font-medium text-slate-700 block mb-1.5"> {/* Adjusted styling */}
            Findings Summary
          </label>
          <textarea
            name="findings"
            value={formData.findings}
            onChange={handleChange}
            placeholder="Enter summary of findings, observations, evidence collected, witness statements..." // More descriptive placeholder
            rows={4}
            className="w-full border border-slate-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150" // Enhanced styling
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Additional notes, comments, challenges faced, or next steps..." // More descriptive placeholder
            rows={3}
            className="w-full border border-slate-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150"
          />
        </div>
      </Section>

      {/* ⚠️ Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-300 text-red-800 rounded-lg p-4 shadow-sm"> {/* Enhanced styling */}
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-base">Please address the following:</span>
          </div>
          <ul className="list-disc pl-7 text-sm space-y-1"> {/* Increased spacing */}
            {alerts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Submission Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-end pt-6 border-t border-slate-200"> {/* Stack on mobile, keep row on sm+ */}
        <Button
          type="button"
          variant="outline"
          onClick={() => alert("Saved as Draft (simulation)")}
          className="w-full sm:w-auto flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-100"
        >
          <Save className="w-4 h-4" /> Save as Draft
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-4 h-4" /> Submit for Review
        </Button>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-lg mt-6 flex items-center gap-3 shadow-sm transition-opacity duration-300"> {/* Enhanced styling */}
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm">Form submitted successfully for review.</p>
          </div>
        </div>
      )}
    </form>
  );
}

/* ------------------------------
    SMALL REUSABLE COMPONENTS
--------------------------------*/

// Section component with Icon
function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType, children: React.ReactNode }) {
  return (
    <div className="space-y-4 border-b border-slate-200 pb-6 last:border-b-0"> {/* Add padding bottom */}
      <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 border-l-4 border-indigo-600 pl-2"> {/* Accent border */}
        <Icon className="w-5 h-5 text-indigo-600" /> {title}
      </h2>
      <div className="pl-2"> {/* Indent content slightly */}
        {children}
      </div>
    </div>
  );
}

// FormField component (Added Icon prop)
function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  readOnly = false,
  icon: Icon, // Add icon prop
}: {
  label: string;
  name?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  icon?: React.ElementType; // Icon component type
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label> {/* Adjusted spacing */}
      <div className="relative">
           {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-4 w-4 text-gray-400" /></div>}
            <input
              name={name}
              type={type}
              value={value}
              readOnly={readOnly}
              placeholder={placeholder}
              onChange={onChange}
              className={`w-full p-2 border border-slate-300 rounded-md text-sm transition duration-150 ${Icon ? 'pl-9' : 'pl-3'} ${
                readOnly ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500" // Enhanced focus and readOnly style
              }`}
            />
       </div>
    </div>
  );
}

// SelectField component (Added Icon prop)
function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  icon: Icon, // Add icon prop
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ElementType;
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
       <div className="relative">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-4 w-4 text-gray-400" /></div>}
            <select
              name={name}
              value={value}
              onChange={onChange}
              className={`appearance-none w-full p-2 border border-slate-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-150 ${Icon ? 'pl-9' : 'pl-3'} pr-8`} // Added padding for icon and arrow
            >
              {options.map((opt, i) => (
                <option key={i} value={opt} disabled={opt === ""}> {/* Disable default option */}
                  {opt === "" ? "-- Select an Option --" : opt}
                </option>
              ))}
            </select>
            {/* Dropdown arrow */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400"/>
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
      <label className="text-sm font-medium text-slate-700 block mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2"> {/* Use flex-wrap */}
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" // Styled radio
            />
            <span className="text-slate-800">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// --- Dummy Icons (Remove if imported) ---
// const Globe = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} /> );
// const BellRing = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} /> );
// const Lock = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} /> );
// const CheckBadge = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} /> );