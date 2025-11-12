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
import StatCard from "@/components/ui/stat-card";

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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      {/* Title Section - add gradient background color to match reference image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="rounded-2xl shadow-lg px-8 py-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-white drop-shadow">
            Organizational Profile Management
          </h1>
          <p className="text-lg text-indigo-100 font-medium">
            Overview, Settings, and Compliance Status
          </p>
        </div>
        {/* Profile Header Card */}
        <Card className="shadow-2xl border-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden mb-8 mt-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6 text-white">
              {/* Avatar Circle */}
              <div className="relative">
                <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white/30">
                  ON
                </div>
                <span className="absolute -top-1 -right-1 text-xs bg-white text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                  Avatar
                </span>
              </div>
              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {profile.nodalOfficerName}, {profile.orgName}
                </h2>
                <p className="text-blue-100 mb-3">
                  Jurisdiction: {profile.jurisdiction}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{profile.contactNumber}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified SP (NSKC Authorized)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification & Role Info Cards */}
        
      </motion.div>

      {/* 🔹 Profile Form in Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* --- Section 1: Organizational Details --- */}
          <Card className="shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur-lg overflow-hidden hover:shadow-3xl transition-all duration-300 ring-1 ring-white/20">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 border-b p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20" />
              <CardTitle className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-emerald-50 bg-clip-text text-transparent">
                  Organizational Details
                </span>
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
                  className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 shadow-sm hover:shadow-md transition-all"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="orgType">Organization Type</Label>
                <Select
                  name="orgType"
                  value={profile.orgType}
                  onValueChange={(value) => handleSelectChange("orgType", value)}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 shadow-sm hover:shadow-md transition-all">
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
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 shadow-sm hover:shadow-md transition-all"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 shadow-sm hover:shadow-md transition-all"
                    onClick={() => alert("Geo-location tagging (simulation)")}
                  >
                    <Globe className="w-4 h-4 text-emerald-600" />
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
          <Card className="shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur-lg overflow-hidden hover:shadow-3xl transition-all duration-300 ring-1 ring-white/20">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 border-b p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20" />
              <CardTitle className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-blue-50 bg-clip-text text-transparent">
                  Nodal Officer Details
                </span>
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
                  className="focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
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
                  className="focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
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
                  className="focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
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
                  className="focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
                  icon={Mail}
                />
              </InputGroup>
            </CardContent>
          </Card>

          {/* --- Section 3: Workforce Metrics (Auto-Calculated) --- */}
          <Card className="shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur-lg overflow-hidden hover:shadow-3xl transition-all duration-300 ring-1 ring-white/20">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 border-b p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20" />
              <CardTitle className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-purple-50 bg-clip-text text-transparent">
                  Workforce Metrics (Auto-Calculated)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label>Contractors Assigned (NSKC Verified)</Label>
                {/* Simulating a multi-select display */}
                <div className="flex flex-wrap gap-2 p-3 border border-purple-200 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 min-h-[50px] shadow-inner">
                  {metrics.contractorsAssigned.map((name) => (
                    <Badge key={name} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm hover:shadow-md transition-all">
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
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 cursor-not-allowed text-xl font-bold text-purple-900 shadow-inner"
                  icon={Users}
                />
              </InputGroup>

              <div className="md:col-span-2 mt-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Breakdown (Auto-Calculated)
                </Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={ShieldAlert}
                    title="Hazardous Workers"
                    value={metrics.hazardous}
                    color="red"
                  />
                  <StatCard
                    icon={AlertTriangle}
                    title="Manual Scavenging"
                    value={metrics.manualScavenging}
                    color="orange"
                  />
                  <StatCard
                    icon={Trash2}
                    title="Ragpickers"
                    value={metrics.ragpickers}
                    color="amber"
                  />
                  <StatCard
                    icon={UserCheck}
                    title="Ordinary SKs"
                    value={metrics.ordinarySKs}
                    color="green"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-slate-50 to-purple-50/50 p-6 flex justify-end border-t border-purple-100">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-3 rounded-xl font-semibold"
              >
                <Save className="w-5 h-5 mr-2" /> Save Profile Changes
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
  return <div className={`space-y-2 ${className || ""}`}>{children}</div>;
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