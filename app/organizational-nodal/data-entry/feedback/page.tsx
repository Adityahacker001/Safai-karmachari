"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription, // Added for subtitle
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
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import {
  MessageSquareHeart, // Page Header
  Users, // Source: Staff/Public
  Building, // Source: Authority
  ThumbsUp, // Type: Appreciation
  MessageSquare, // Type: Suggestion
  AlertTriangle, // Type: Complaint, Alert Icon
  CalendarDays, // Date Icon
  ClipboardList, // Description Icon
  CheckCircle, // Action Taken Icon
  ListFilter, // Status Icon
  Send, // For Submit button
  Check, // For Success
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// --- Interfaces ---
interface FeedbackFormState {
  feedbackSource: string;
  feedbackType: string;
  feedbackDescription: string;
  dateReceived: string;
  actionTaken: string;
  status: string;
}

// --- Main Page Component ---
export default function FeedbackInputPage() {
  // --- State for Form Data ---
  const [formData, setFormData] = useState<FeedbackFormState>({
    feedbackSource: "",
    feedbackType: "",
    feedbackDescription: "",
    dateReceived: "",
    actionTaken: "",
    status: "Pending", // Default status
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  // Handle select changes
  const handleSelectChange = (name: keyof FeedbackFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const errors: string[] = [];
    const data = formData;

    if (!data.feedbackSource) errors.push("Feedback Source is required.");
    if (!data.feedbackType) errors.push("Feedback Type is required.");
    if (!data.dateReceived) errors.push("Date Received is required.");
    if (data.feedbackDescription.trim().length < 20) {
        errors.push("Feedback Description must be at least 20 characters.");
    }
    if (data.status === "Resolved" && data.actionTaken.trim().length < 10) {
        errors.push("Action Taken details (min 10 chars) are required if status is 'Resolved'.");
    }
    if (!data.status) errors.push("Status is required.");

    setAlerts(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setAlerts([]);
      console.log("Submitting Feedback:", formData);
      alert("Feedback Logged Successfully (Simulation)!");
      // API call to submit data would go here
    } else {
      setSubmitted(false);
    }
  };

  // --- Dynamic Icon Logic ---
  const SourceIcon =
    formData.feedbackSource === "Authority"
      ? Building
      : formData.feedbackSource === "Staff"
      ? Users
      : formData.feedbackSource === "Public"
      ? Users
      : Users; // Default

  const TypeIcon =
    formData.feedbackType === "Appreciation"
      ? ThumbsUp
      : formData.feedbackType === "Complaint"
      ? AlertTriangle
      : MessageSquare; // Default

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-100 min-h-screen">
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Feedback Input Form
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Log feedback received from Public, Staff, or other Authorities.
        </p>
      </motion.div>

      {/* 🔹 Main Form Card */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        <Card className="shadow-xl border border-gray-100 rounded-lg bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b p-5">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <MessageSquareHeart className="w-6 h-6 text-pink-600" />
              Log New Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* --- Section 1: Core Details --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputGroup>
                <Label htmlFor="feedbackSource">Feedback Source</Label>
                <Select name="feedbackSource" value={formData.feedbackSource} onValueChange={(value) => handleSelectChange("feedbackSource", value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-purple-300">
                     <div className="flex items-center gap-2">
                        <SourceIcon className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select a source..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Authority">Authority</SelectItem>
                  </SelectContent>
                </Select>
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select name="feedbackType" value={formData.feedbackType} onValueChange={(value) => handleSelectChange("feedbackType", value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-purple-300">
                     <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select a type..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Complaint">Complaint (Shikayat)</SelectItem>
                    <SelectItem value="Suggestion">Suggestion (Sujhav)</SelectItem>
                    <SelectItem value="Appreciation">Appreciation (Taareef)</SelectItem>
                  </SelectContent>
                </Select>
              </InputGroup>

              <InputGroup className="md:col-span-2">
                <Label htmlFor="dateReceived">Date Received</Label>
                <InputWithIcon
                  id="dateReceived" name="dateReceived" type="date"
                  value={formData.dateReceived} onChange={handleChange}
                  icon={CalendarDays}
                />
              </InputGroup>
            </div>
            
            {/* --- Section 2: Description --- */}
            <div className="border-t border-gray-200 pt-6">
               <InputGroup>
                <Label htmlFor="feedbackDescription" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-gray-500" /> Feedback Description
                </Label>
                <Textarea
                  id="feedbackDescription"
                  name="feedbackDescription"
                  value={formData.feedbackDescription}
                  onChange={handleChange}
                  placeholder="Enter the full description of the feedback received..."
                  className="focus:ring-2 focus:ring-purple-300 min-h-[100px]"
                  rows={4}
                />
              </InputGroup>
            </div>

            {/* --- Section 3: Action & Status --- */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Response & Resolution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputGroup className="md:col-span-2">
                        <Label htmlFor="actionTaken" className="flex items-center gap-2">
                           <CheckCircle className="w-5 h-5 text-gray-500" /> Action Taken
                        </Label>
                        <Textarea
                          id="actionTaken"
                          name="actionTaken"
                          value={formData.actionTaken}
                          onChange={handleChange}
                          placeholder="Describe the action taken in response to this feedback..."
                          className="focus:ring-2 focus:ring-purple-300"
                          rows={3}
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                          <SelectTrigger className="focus:ring-2 focus:ring-purple-300">
                             <div className="flex items-center gap-2">
                                <ListFilter className="w-4 h-4 text-gray-400" />
                                <SelectValue placeholder="Select a status..." />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                    </InputGroup>

                </div>
            </div>
            
            {/* --- Alerts --- */}
            {alerts.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-md" role="alert">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-base">Please correct the following errors:</p>
                  </div>
                  <ul className="list-disc pl-7 text-sm space-y-1">
                    {alerts.map((msg, i) => ( <li key={i}>{msg}</li> ))}
                  </ul>
                </div>
            )}
            
            {/* --- Success Message --- */}
            {submitted && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md shadow-md" role="alert">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Success!</p>
                      <p className="text-sm">Feedback has been successfully logged.</p>
                    </div>
                  </div>
                </div>
            )}

          </CardContent>
          <CardFooter className="bg-gray-50/70 p-4 flex justify-end">
             <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
             >
                <Button 
                    onClick={handleSubmit} 
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Send className="w-4 h-4 mr-2" /> Log Feedback
                </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.form>
    </div>
  );
}

// --- Reusable Helper Components ---

function InputGroup({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`space-y-1.5 ${className || ''}`}>{children}</div>;
}

// Custom Input with Icon
function InputWithIcon({
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
  icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        className={`block w-full pl-10 p-2.5 border border-gray-300 rounded-lg text-sm transition duration-150 ${
          readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed focus:ring-0 focus:border-gray-300" : "bg-white focus:ring-2 focus:ring-purple-300 focus:border-purple-500 hover:border-gray-400"
        } ${className || ''}`}
      />
    </div>
  );
}