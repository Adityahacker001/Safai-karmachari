"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Upload,
  Save,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  X,
  FileCheck,
  Image as ImageIcon,
  Calendar,
  User,
  ClipboardList,
  Shield,
  Activity,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Interfaces ---
interface InvestigationForm {
  recordId: string;
  recordType: "incident" | "grievance" | "";
  investigatorId: string;
  investigatorName: string;
  progressStatus: string;
  resolutionNotes: string;
  dateTime: string;
  associatedMedia: File[];
}

interface RecordInfo {
  id: string;
  type: string;
  title: string;
  reportedBy: string;
  reportedDate: string;
  currentStatus: string;
  location: string;
}

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-gray-500" },
  { value: "received", label: "Received", color: "bg-blue-500" },
  { value: "acknowledged", label: "Acknowledged", color: "bg-indigo-500" },
  { value: "under_investigation", label: "Under Investigation", color: "bg-yellow-500" },
  { value: "action_taken", label: "Action Taken", color: "bg-orange-500" },
  { value: "resolved", label: "Resolved", color: "bg-green-500" },
  { value: "overdue", label: "Overdue", color: "bg-red-500" },
];

export default function InvestigationProgressPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InvestigationForm>({
    recordId: "",
    recordType: "",
    investigatorId: "DGP001",
    investigatorName: "Dr. Rajesh Kumar Singh",
    progressStatus: "",
    resolutionNotes: "",
    dateTime: new Date().toISOString().slice(0, 16),
    associatedMedia: [],
  });

  const [recordInfo, setRecordInfo] = useState<RecordInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number; preview?: string }>>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mock function to search for record
  const handleSearchRecord = async () => {
    if (!formData.recordId || !formData.recordType) {
      setErrors({ recordId: "Please enter Record ID and select Record Type" });
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter Record ID and select Record Type to search.",
      });
      return;
    }

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setRecordInfo({
        id: formData.recordId,
        type: formData.recordType,
        title: formData.recordType === "incident" 
          ? "Manual Scavenging Incident - Sewer Death"
          : "Worker Safety Equipment Grievance",
        reportedBy: formData.recordType === "incident" ? "Citizen Alert System" : "Ramesh Kumar (Worker ID: SK-2345)",
        reportedDate: "15 Oct 2025, 10:30 AM",
        currentStatus: "Under Investigation",
        location: "Lucknow, Ward 12, MG Road",
      });
      setIsSearching(false);
      setErrors({});
      toast({
        title: "Record Found",
        description: `Successfully retrieved ${formData.recordType} record: ${formData.recordId}`,
      });
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file size (max 10MB)
    const invalidFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: `${invalidFiles.length} file(s) exceed 10MB limit. Please choose smaller files.`,
      });
      return;
    }

    const newFiles = files.map(file => ({
      name: file.name,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setFormData({ ...formData, associatedMedia: [...formData.associatedMedia, ...files] });
    
    toast({
      title: "Files Added",
      description: `${files.length} file(s) uploaded successfully.`,
    });
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newMedia = formData.associatedMedia.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    setFormData({ ...formData, associatedMedia: newMedia });
    
    toast({
      title: "File Removed",
      description: "File has been removed from the upload list.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.recordId) newErrors.recordId = "Record ID is required";
    if (!formData.recordType) newErrors.recordType = "Record Type is required";
    if (!formData.progressStatus) newErrors.progressStatus = "Progress Status is required";
    if (!formData.resolutionNotes.trim()) newErrors.resolutionNotes = "Resolution Notes are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields before submitting.",
      });
      return;
    }

    console.log("Submitting Investigation Progress:", formData);
    
    // Simulate successful submission
    toast({
      title: "✅ Successfully Submitted!",
      description: `Investigation progress for ${formData.recordType} ${formData.recordId} has been updated successfully.`,
      duration: 5000,
    });
    
    // Reset form after successful submission
    setTimeout(() => {
      handleReset();
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      recordId: "",
      recordType: "",
      investigatorId: "DGP001",
      investigatorName: "Dr. Rajesh Kumar Singh",
      progressStatus: "",
      resolutionNotes: "",
      dateTime: new Date().toISOString().slice(0, 16),
      associatedMedia: [],
    });
    setRecordInfo(null);
    setUploadedFiles([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      {/* Header */}
      <div className="animate-slideUp bg-white/60 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-gray-100/50 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Investigation Progress Entry
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Update investigation status and resolution details for incidents and grievances
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none shadow-sm">
            DGP Dashboard
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {/* Record Search Section */}
        <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm card-hover animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Record Identification
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Search for the incident or grievance record to update
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Record Type */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="recordType" className="text-sm font-medium flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-gray-500" />
                  Record Type *
                </Label>
                <Select
                  value={formData.recordType}
                  onValueChange={(value) => setFormData({ ...formData, recordType: value as any })}
                >
                  <SelectTrigger className={cn(
                    "w-full transition-all duration-300 hover:border-blue-300",
                    errors.recordType && "border-red-500"
                  )}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incident">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Incident Report
                      </div>
                    </SelectItem>
                    <SelectItem value="grievance">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-blue-500" />
                        Grievance
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.recordType && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-slideInLeft">
                    <AlertCircle className="h-3 w-3" />
                    {errors.recordType}
                  </p>
                )}
              </div>

              {/* Record ID */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.25s' }}>
                <Label htmlFor="recordId" className="text-sm font-medium flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-gray-500" />
                  Record ID *
                </Label>
                <Input
                  id="recordId"
                  placeholder="e.g., INC-2024-001"
                  value={formData.recordId}
                  onChange={(e) => setFormData({ ...formData, recordId: e.target.value })}
                  className={cn(
                    "transition-all duration-300 hover:border-blue-300 focus:ring-blue-300",
                    errors.recordId && "border-red-500"
                  )}
                />
                {errors.recordId && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-slideInLeft">
                    <AlertCircle className="h-3 w-3" />
                    {errors.recordId}
                  </p>
                )}
              </div>

              {/* Investigator ID */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="investigatorId" className="text-sm font-medium flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-gray-500" />
                  Investigator ID
                </Label>
                <Input
                  id="investigatorId"
                  value={formData.investigatorId}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* Search Button */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.35s' }}>
                <Label className="text-sm font-medium opacity-0">Action</Label>
                <Button
                  type="button"
                  onClick={handleSearchRecord}
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {isSearching ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search Record
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Record Information Display */}
            {recordInfo && (
              <div className="mt-4 p-3 sm:p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-lg border border-blue-200/50 animate-slideUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">Record Details</h3>
                  </div>
                  <Badge className={cn(
                    "text-xs",
                    recordInfo.currentStatus === "Resolved" ? "bg-green-500" :
                    recordInfo.currentStatus === "Under Investigation" ? "bg-yellow-500" :
                    "bg-blue-500"
                  )}>
                    {recordInfo.currentStatus}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                    <p className="text-gray-500 font-medium">Title</p>
                    <p className="text-gray-800 font-semibold">{recordInfo.title}</p>
                  </div>
                  <div className="animate-slideInRight" style={{ animationDelay: '0.15s' }}>
                    <p className="text-gray-500 font-medium">Reported By</p>
                    <p className="text-gray-800">{recordInfo.reportedBy}</p>
                  </div>
                  <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                    <p className="text-gray-500 font-medium">Reported Date</p>
                    <p className="text-gray-800">{recordInfo.reportedDate}</p>
                  </div>
                  <div className="animate-slideInRight" style={{ animationDelay: '0.25s' }}>
                    <p className="text-gray-500 font-medium">Location</p>
                    <p className="text-gray-800">{recordInfo.location}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Investigation Progress Section */}
        <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm card-hover animate-slideInRight" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Investigation Progress Update
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Update the current status and add detailed notes about the investigation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Progress Status */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="progressStatus" className="text-sm font-medium flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-gray-500" />
                  Progress/Resolution Status *
                </Label>
                <Select
                  value={formData.progressStatus}
                  onValueChange={(value) => setFormData({ ...formData, progressStatus: value })}
                >
                  <SelectTrigger className={cn(
                    "w-full transition-all duration-300 hover:border-blue-300",
                    errors.progressStatus && "border-red-500"
                  )}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", status.color)} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.progressStatus && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-slideInLeft">
                    <AlertCircle className="h-3 w-3" />
                    {errors.progressStatus}
                  </p>
                )}
              </div>

              {/* Date/Time of Entry */}
              <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.35s' }}>
                <Label htmlFor="dateTime" className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  Date/Time of Entry
                </Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  className="transition-all duration-300 hover:border-blue-300 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Resolution Notes */}
            <div className="space-y-2 animate-scaleIn" style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="resolutionNotes" className="text-sm font-medium flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-gray-500" />
                Resolution Notes / Remarks *
              </Label>
              <Textarea
                id="resolutionNotes"
                placeholder="Enter detailed findings, steps taken, and resolution outcome..."
                value={formData.resolutionNotes}
                onChange={(e) => setFormData({ ...formData, resolutionNotes: e.target.value })}
                rows={6}
                className={cn(
                  "transition-all duration-300 hover:border-blue-300 focus:ring-blue-300 resize-none",
                  errors.resolutionNotes && "border-red-500"
                )}
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formData.resolutionNotes.length} characters</span>
                {errors.resolutionNotes && (
                  <p className="text-red-500 flex items-center gap-1 animate-slideInRight">
                    <AlertCircle className="h-3 w-3" />
                    {errors.resolutionNotes}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-3 animate-scaleIn" style={{ animationDelay: '0.45s' }}>
              <Label htmlFor="mediaUpload" className="text-sm font-medium flex items-center gap-1">
                
              
              </Label>
              
              <div className="flex items-center gap-3">
                <input
                  id="mediaUpload"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="mediaUpload">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group"
                    asChild
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <Paperclip className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      Attach Files
                    </span>
                  </Button>
                </label>
                <span className="text-xs text-gray-500">PNG, JPG, PDF, DOC (max 10MB)</span>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files ({uploadedFiles.length})</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:bg-gray-100 transition-all duration-300 animate-slideInLeft"
                        style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                      >
                        {file.preview ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors group"
                        >
                          <X className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
          >
            <X className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Save className="h-4 w-4 mr-2" />
            Submit Progress Update
          </Button>
        </div>
      </form>
    </div>
  );
}