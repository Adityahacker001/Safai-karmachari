"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter, // Added CardFooter for the save button
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  ShieldAlert, // For Hazardous
  Trash2, // For Ragpickers
  UserCheck, // For Ordinary SKs
  FileText, // For Jurisdiction
  Save, // For Save button
  Globe, // Placeholder for Geo-location button
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion"; // For eye-catchy animations
import { Badge } from "@/components/ui/badge";

// --- Interfaces ---
interface OrgProfile {
  orgName: string;
  orgType: string;
  address: string;
  jurisdiction: string; // Read-only
  nodalOfficerName: string;
  designation: string;
  contactNumber: string;
  email: string;
}

interface WorkforceMetrics {
  contractorsAssigned: string[]; // List of names
  totalWorkers: number;
  manualScavenging: number;
  ragpickers: number;
  hazardous: number;
  ordinarySKs: number;
}

// --- Main Page Component ---
export default function OrganizationalNodalProfilePage() {
  // --- State for Form Data ---
  const [profile, setProfile] = useState<OrgProfile>({
    orgName: "Lucknow International Airport",
    orgType: "Airport",
    address: "Amausi, Lucknow, Uttar Pradesh 226009",
    jurisdiction: "Lucknow Nagar Nigam (ULB)", // Auto-linked
    nodalOfficerName: "Mr. Alok Verma",
    designation: "Senior Operations Manager",
    contactNumber: "+91 98765 43210",
    email: "alok.verma@lucknowairport.com",
  });

  // --- State for Auto-Calculated Data (Simulated) ---
  const [metrics, setMetrics] = useState<WorkforceMetrics>({
    contractorsAssigned: ["CleanForce Pvt Ltd", "UrbanClean Services"],
    totalWorkers: 150,
    manualScavenging: 5,
    ragpickers: 20,
    hazardous: 30,
    ordinarySKs: 95,
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: keyof OrgProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Profile Updated (Simulation)!");
    console.log("Saving data:", profile);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Organizational Profile
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your organization's details, officer information, and workforce
          metrics.
        </p>
      </motion.div>

      {/* 🔹 Profile Form in Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* --- Section 1: Organizational Details --- */}
          <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b p-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Building className="w-5 h-5 text-teal-700" />
                1. Organizational Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label htmlFor="orgName">Organization Name</Label>
                <LocalInput
                  id="orgName"
                  name="orgName"
                  value={profile.orgName}
                  onChange={handleChange}
                  placeholder="e.g., Lucknow International Airport"
                  className="focus:ring-2 focus:ring-teal-300"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="orgType">Organization Type</Label>
                <Select
                  name="orgType"
                  value={profile.orgType}
                  onValueChange={(value) => handleSelectChange("orgType", value)}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-teal-300">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Airport">Airport</SelectItem>
                    <SelectItem value="Railway Station">Railway Station</SelectItem>
                    <SelectItem value="Bus Station">Bus Station</SelectItem>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="School/College">School/College</SelectItem>
                    <SelectItem value="Govt Office">Govt Office</SelectItem>
                    <SelectItem value="Private Office">Private Office</SelectItem>
                    <SelectItem value="Mall">Mall</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </InputGroup>

              <InputGroup className="md:col-span-2">
                <Label htmlFor="address">Address (with Geo-location)</Label>
                <div className="flex gap-2">
                  <LocalInput
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    className="focus:ring-2 focus:ring-teal-300"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300"
                    onClick={() => alert("Geo-location tagging (simulation)")}
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="jurisdiction">Jurisdiction (Linked ULB/RLB)</Label>
                <LocalInput
                  id="jurisdiction"
                  name="jurisdiction"
                  value={profile.jurisdiction}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                  icon={FileText}
                />
              </InputGroup>
            </CardContent>
          </Card>

          {/* --- Section 2: Nodal Officer Details --- */}
          <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b p-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-700" />
                2. Nodal Officer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label htmlFor="nodalOfficerName">Nodal Officer Name</Label>
                <LocalInput
                  id="nodalOfficerName"
                  name="nodalOfficerName"
                  value={profile.nodalOfficerName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="focus:ring-2 focus:ring-indigo-300"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="designation">Designation</Label>
                <LocalInput
                  id="designation"
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  placeholder="e.g., Senior Manager"
                  className="focus:ring-2 focus:ring-indigo-300"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <LocalInput
                  id="contactNumber"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="focus:ring-2 focus:ring-indigo-300"
                  icon={Phone}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">Email ID</Label>
                <LocalInput
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="officer@example.com"
                  className="focus:ring-2 focus:ring-indigo-300"
                  icon={Mail}
                />
              </InputGroup>
            </CardContent>
          </Card>

          {/* --- Section 3: Workforce Metrics (Auto-Calculated) --- */}
          <Card className="shadow-lg border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-lime-50 border-b p-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-700" />
                3. Workforce Metrics (Auto-Calculated)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label>Contractors Assigned (NSKC Verified)</Label>
                {/* Simulating a multi-select display */}
                <div className="flex flex-wrap gap-2 p-2.5 border border-gray-300 rounded-lg bg-gray-100 min-h-[40px]">
                  {metrics.contractorsAssigned.map((name) => (
                    <Badge key={name} variant="secondary" className="bg-gray-200 text-gray-700">
                      {name}
                    </Badge>
                  ))}
                </div>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="totalWorkers">Total Workers Deployed</Label>
                <LocalInput
                  id="totalWorkers"
                  value={metrics.totalWorkers}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed text-lg font-bold text-gray-900"
                  icon={Users}
                />
              </InputGroup>

              <div className="md:col-span-2 mt-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Breakdown (Auto-Calculated)
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricDisplay
                    icon={ShieldAlert}
                    label="Hazardous Workers"
                    value={metrics.hazardous}
                    color="text-red-600 bg-red-50"
                  />
                  <MetricDisplay
                    icon={AlertTriangle}
                    label="Manual Scavenging"
                    value={metrics.manualScavenging}
                    color="text-orange-600 bg-orange-50"
                  />
                  <MetricDisplay
                    icon={Trash2}
                    label="Ragpickers"
                    value={metrics.ragpickers}
                    color="text-yellow-600 bg-yellow-50"
                  />
                  <MetricDisplay
                    icon={UserCheck}
                    label="Ordinary SKs"
                    value={metrics.ordinarySKs}
                    color="text-green-600 bg-green-50"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50/50 p-4 flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Save className="w-4 h-4 mr-2" /> Save Profile Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  );
}

// --- Reusable Helper Components ---

// A simple wrapper for Label + Input
function InputGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-1.5 ${className || ""}`}>{children}</div>;
}

// Re-styled MetricDisplay for workforce breakdown
function MetricDisplay({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg ${color} border-gray-200`}
    >
      <div className="p-2 rounded-full">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="font-bold text-xl text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// Renamed local Input component to avoid conflict
function LocalInput({
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  readOnly = false,
  className,
  icon: Icon,
}: {
  id: string;
  name?: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400" /></div>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        className={`block w-full p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 ${Icon ? 'pl-10' : 'pl-3'} ${
          readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:border-indigo-500 hover:border-gray-400"
        } ${className || ''}`}
      />
    </div>
  );
}