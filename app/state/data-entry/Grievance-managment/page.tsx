"use client";
import React, { useState } from "react";
import { Upload, Send, User, MapPin, FileText, Flag } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 p-6">
      {/* Header at top left, separate from form */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          State Grievance Resolution Form
        </h1>
        <p className="text-gray-600 mt-1">For registering and monitoring grievances at the State level</p>
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
