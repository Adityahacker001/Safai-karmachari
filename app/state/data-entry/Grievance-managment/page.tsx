"use client";
import React, { useState } from "react";
import { Upload, Send, User, MapPin, FileText, Flag } from "lucide-react";

function IntegratedLoader() {
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

const StateGrievanceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    grievanceType: "",
    description: "",
    complainantName: "",
    contactNumber: "",
    district: "",
    address: "",
    assignedOfficer: "",
    priority: "",
    attachments: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Grievance submitted successfully!");
  };

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  return (
    <div className="min-h-screen p-6">
      {/* Header (District-style banner) */}
      <div className="w-full rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12" aria-hidden />
            <div>
              <h1 className="text-3xl font-bold">State Grievance Resolution Form</h1>
              <p className="mt-1 text-sm opacity-90">For registering and monitoring grievances at the State level</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-indigo-100 space-y-6"
        >
          {/* Grievance Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grievance Type</label>
            <select
              name="grievanceType"
              value={formData.grievanceType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Type</option>
              <option value="manual_scavenging">Manual Scavenging</option>
              <option value="safety_violation">Safety Violation</option>
              <option value="ppe_noncompliance">PPE Non-Compliance</option>
              <option value="training_gap">Training Gap</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400"
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grievance Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter detailed description of the grievance..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Complainant Details */}
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" /> Complainant Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="complainantName"
            value={formData.complainantName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Officer Assignment */}
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Flag className="w-5 h-5 text-red-500" /> Officer Assignment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="assignedOfficer"
            value={formData.assignedOfficer}
            onChange={handleChange}
            placeholder="Assign to Officer/Department"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
          <input
            type="date"
            name="deadline"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          <div className="flex items-center space-x-4 border border-dashed border-gray-400 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <Upload className="w-5 h-5 text-indigo-500" />
            <input type="file" name="attachments" onChange={handleChange} />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Submit Grievance
        </button>
      </form>
    </div>
    {/* Closing wrapper div for min-h-screen */}
    </div>
  );
};

export default StateGrievanceForm;
