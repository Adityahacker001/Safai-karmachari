"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  FileUp,
  Save,
  XCircle,
  Activity,
  LifeBuoy,
  FileBadge,
  Edit,
  Plus,
  Trash2,
  DollarSign,
  Briefcase,
  ClipboardList,
  TrendingUp,
  UserPlus,
  Download,
  Send,
  MessageSquare,
  BellRing,
} from "lucide-react";

// --- Interfaces ---
interface SHGInfo {
  groupName: string;
  shgId: string;
  district: string;
  state: string;
  village: string;
  email: string;
  phone: string;
  memberCount: number;
  formationDate: string;
  isVerified: boolean;
}

interface SHGMember {
  id: string;
  name: string;
  age: number;
  gender: string;
  caste: string;
  aadhaar: string;
  role: string;
  trainingCompleted: boolean;
  bankLinked: boolean;
  joinedDate: string;
}

interface Project {
  id: string;
  title: string;
  scheme: string;
  loanAmount: number;
  status: string;
  startDate: string;
  expectedCompletion: string;
  disbursedAmount: number;
}

interface Application {
  id: string;
  schemeName: string;
  appliedDate: string;
  status: string;
  eligibilityScore: number;
  remarks: string;
}

interface FinancialSummary {
  totalLoans: number;
  totalDisbursed: number;
  totalRepaid: number;
  pendingRepayment: number;
  savingsBalance: number;
}

interface DocumentInfo {
  name: string;
  type: string;
  verifiedBy: string;
  status: string;
  uploadedDate: string;
}

interface ActivityLog {
  label: string;
  value: string;
}

interface ComplianceMetric {
  label: string;
  value: number;
}

/**
 * Additional lightweight interfaces to satisfy references used later in this file.
 * These are minimal shapes; expand as needed for stricter typing.
 */
interface ProfileSettings {
  alternateContact: string;
  language: string;
  notificationType: string;
}

interface AccountSettings {
  email: string;
  username?: string;
  phone?: string;
}

interface VerificationInfo {
  status: string;
  role: string;
  jurisdictionAccess: string;
  lastSynced: string;
}

interface PoliceStation {
  name: string;
  incidents: number;
  active: number;
  pending: number;
  completed: number;
  compensation: string;
}

// --- Main Page Component ---
export default function SHGProfilePage() {
  // --- State Variables ---
  const [shgInfo, setShgInfo] = useState<SHGInfo>({
    groupName: "Mahila Vikas SHG",
    shgId: "SHG-2024-001234",
    district: "Lucknow",
    state: "Uttar Pradesh",
    village: "Rampur Kalan",
    email: "mahilavikas.shg@gmail.com",
    phone: "+91 98765 43210",
    memberCount: 12,
    formationDate: "15 Jan 2020",
    isVerified: true,
  });

  const [members, setMembers] = useState<SHGMember[]>([
    {
      id: "M001",
      name: "Sunita Devi",
      age: 35,
      gender: "Female",
      caste: "SC",
      aadhaar: "XXXX-XXXX-1234",
      role: "President",
      trainingCompleted: true,
      bankLinked: true,
      joinedDate: "15 Jan 2020",
    },
    {
      id: "M002",
      name: "Kavita Sharma",
      age: 32,
      gender: "Female",
      caste: "SC",
      aadhaar: "XXXX-XXXX-5678",
      role: "Secretary",
      trainingCompleted: true,
      bankLinked: true,
      joinedDate: "15 Jan 2020",
    },
    {
      id: "M003",
      name: "Meena Kumari",
      age: 28,
      gender: "Female",
      caste: "SC",
      aadhaar: "XXXX-XXXX-9012",
      role: "Treasurer",
      trainingCompleted: true,
      bankLinked: true,
      joinedDate: "20 Feb 2020",
    },
    {
      id: "M004",
      name: "Rekha Devi",
      age: 40,
      gender: "Female",
      caste: "SC",
      aadhaar: "XXXX-XXXX-3456",
      role: "Member",
      trainingCompleted: false,
      bankLinked: true,
      joinedDate: "10 Mar 2020",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "P001",
      title: "Tailoring Unit",
      scheme: "NSFDC Microcredit",
      loanAmount: 500000,
      status: "Active",
      startDate: "01 Apr 2024",
      expectedCompletion: "31 Mar 2025",
      disbursedAmount: 500000,
    },
    {
      id: "P002",
      title: "Grocery Shop",
      scheme: "NSKFDC Term Loan",
      loanAmount: 300000,
      status: "Completed",
      startDate: "15 Jan 2023",
      expectedCompletion: "15 Jan 2024",
      disbursedAmount: 300000,
    },
  ]);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP001",
      schemeName: "Skill Development Training",
      appliedDate: "10 Nov 2024",
      status: "Under Review",
      eligibilityScore: 85,
      remarks: "Pending district approval",
    },
    {
      id: "APP002",
      schemeName: "NSFDC Term Loan",
      appliedDate: "05 Oct 2024",
      status: "Approved",
      eligibilityScore: 92,
      remarks: "Disbursement pending",
    },
  ]);

  const [financials, setFinancials] = useState<FinancialSummary>({
    totalLoans: 800000,
    totalDisbursed: 800000,
    totalRepaid: 450000,
    pendingRepayment: 350000,
    savingsBalance: 125000,
  });

  const [documents, setDocuments] = useState<DocumentInfo[]>([
    {
      name: "SHG Registration Certificate",
      type: "PDF",
      verifiedBy: "District Office",
      status: "Verified",
      uploadedDate: "15 Jan 2020",
    },
    {
      name: "Bank Account Proof",
      type: "PDF",
      verifiedBy: "NSKFDC",
      status: "Verified",
      uploadedDate: "20 Jan 2020",
    },
    {
      name: "Group Photo",
      type: "JPG",
      verifiedBy: "Nodal Officer",
      status: "Verified",
      uploadedDate: "25 Jan 2020",
    },
    {
      name: "Aadhaar Cards (All Members)",
      type: "PDF",
      verifiedBy: "System",
      status: "Pending",
      uploadedDate: "10 Nov 2024",
    },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { label: "Last Login", value: "23 Nov 2024, 05:30 PM" },
    { label: "Total Projects", value: "2" },
    { label: "Applications Submitted", value: "2" },
    { label: "Documents Uploaded", value: "4" },
  ]);

  // --- Placeholder Event Handlers ---
  const handleAddMember = () => console.log("Add Member clicked");
  const handleEditMember = (id: string) => console.log("Edit Member:", id);
  const handleDeleteMember = (id: string) => console.log("Delete Member:", id);
  const handleUploadDocument = () => console.log("Upload Document clicked");
  const handleDownloadReport = () => console.log("Download Report clicked");
  const handleContactSupport = () => console.log("Contact Support clicked");
  const handleSaveChanges = () => console.log("Save Changes clicked");
  const handleRequestDisbursement = () => console.log("Request Disbursement clicked");

  // --- Effect for dynamic updates ---
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setActivityLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.label === "Last Login"
          ? { ...log, value: `${formattedDate}, ${formattedTime}` }
          : log
      )
    );
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          SHG Profile Management
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your Self Help Group details, members, and activities
        </p>
      </div>

      {/* SHG Identity Card */}
      <SHGIdentityCard info={shgInfo} />

      {/* Financial Summary */}
      <FinancialSummaryCard financials={financials} />

      {/* Members section removed as requested */}

      {/* Projects and Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsCard projects={projects} />
        <ApplicationsCard applications={applications} />
      </div>

      {/* Activity and Admin Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityLogCard logs={activityLogs} />
        <AdminControlsCard
          onRequestDisbursement={handleRequestDisbursement}
          onDownloadReport={handleDownloadReport}
        />
      </div>

      {/* Support Section */}
      <SupportSection onContactSupport={handleContactSupport} />

      {/* Documents Table */}
      <DocumentsTable
        documents={documents}
        onUploadDocument={handleUploadDocument}
      />
    </div>
  );
}

// --- Child Components ---

function SHGIdentityCard({ info }: { info: SHGInfo }) {
  return (
    <Card className="p-6 shadow-lg border-none bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Group Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">Group Name</p>
              <p className="text-lg font-bold">{info.groupName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileBadge className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">SHG ID</p>
              <p className="font-semibold">{info.shgId}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">Location</p>
              <p className="font-semibold">{info.village}</p>
              <p className="text-sm text-indigo-200">
                {info.district}, {info.state}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">Formation Date</p>
              <p className="font-semibold">{info.formationDate}</p>
            </div>
          </div>
        </div>

        {/* Contact & Status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">Email</p>
              <p className="text-sm font-medium break-all">{info.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200 uppercase tracking-wider">Phone</p>
              <p className="font-semibold">{info.phone}</p>
            </div>
          </div>
          <div className="pt-2">
            {info.isVerified ? (
              <Badge variant="secondary" className="bg-green-500/80 text-white border-none text-xs font-medium">
                <CheckCircle className="w-3 h-3 mr-1.5" /> Verified SHG
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs font-medium">
                <AlertTriangle className="w-3 h-3 mr-1.5" /> Verification Pending
              </Badge>
            )}
            <Badge variant="secondary" className="ml-2 bg-indigo-500/80 text-white border-none text-xs font-medium">
              <Users className="w-3 h-3 mr-1.5" /> {info.memberCount} Members
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FinancialSummaryCard({ financials }: { financials: FinancialSummary }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const items = [
    {
      icon: DollarSign,
      label: "Total Loans",
      value: formatCurrency(financials.totalLoans),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      label: "Total Disbursed",
      value: formatCurrency(financials.totalDisbursed),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CheckCircle,
      label: "Total Repaid",
      value: formatCurrency(financials.totalRepaid),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: AlertTriangle,
      label: "Pending Repayment",
      value: formatCurrency(financials.pendingRepayment),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: DollarSign,
      label: "Savings Balance",
      value: formatCurrency(financials.savingsBalance),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          Financial Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 border rounded-lg ${item.bgColor} border-gray-200`}
          >
            <div className={`${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {item.label}
              </p>
              <p className={`font-bold ${item.color}`}>{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Members section removed

function ProjectsCard({ projects }: { projects: Project[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          Active Projects ({projects.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{project.title}</h3>
              <Badge
                variant={project.status === "Active" ? "default" : "secondary"}
                className={
                  project.status === "Active"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Scheme:</span> {project.scheme}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  Loan Amount
                </p>
                <p className="font-bold text-indigo-700">
                  {formatCurrency(project.loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  Disbursed
                </p>
                <p className="font-bold text-green-600">
                  {formatCurrency(project.disbursedAmount)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  Start Date
                </p>
                <p className="text-gray-700">{project.startDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  Expected Completion
                </p>
                <p className="text-gray-700">{project.expectedCompletion}</p>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-4">No active projects.</p>
        )}
      </CardContent>
    </Card>
  );
}

function ApplicationsCard({ applications }: { applications: Application[] }) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-indigo-600" />
          Recent Applications ({applications.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{app.schemeName}</h3>
              <Badge
                variant={
                  app.status === "Approved"
                    ? "default"
                    : app.status === "Under Review"
                    ? "secondary"
                    : "destructive"
                }
                className={
                  app.status === "Approved"
                    ? "bg-green-500"
                    : app.status === "Under Review"
                    ? "bg-orange-500"
                    : "bg-red-500"
                }
              >
                {app.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Applied:</span> {app.appliedDate}
            </p>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">Eligibility Score</span>
                <span className="font-semibold text-indigo-700">
                  {app.eligibilityScore}%
                </span>
              </div>
              <Progress
                value={app.eligibilityScore}
                className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-purple-500"
              />
            </div>
            <p className="text-xs text-gray-500 italic">{app.remarks}</p>
          </div>
        ))}
        {applications.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No applications submitted yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityLogCard({ logs }: { logs: ActivityLog[] }) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
        <Activity className="h-5 w-5 text-indigo-600" />
        <CardTitle className="text-lg font-semibold text-gray-800">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0"
          >
            <span className="text-gray-600">{log.label}</span>
            <span className="font-medium text-gray-800 bg-gray-100 px-2.5 py-1 rounded-full text-xs">
              {log.value}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No recent activity logged.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function AdminControlsCard({
  onRequestDisbursement,
  onDownloadReport,
}: {
  onRequestDisbursement: () => void;
  onDownloadReport: () => void;
}) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-indigo-600" />
        <CardTitle className="text-lg font-semibold text-gray-800">
          Admin Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onRequestDisbursement}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="w-4 h-4 mr-2" />
          Request Disbursement
        </Button>
        <Button
          onClick={onDownloadReport}
          variant="outline"
          className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Financial Report
        </Button>
      </CardContent>
    </Card>
  );
}

function SupportSection({
  onContactSupport,
}: {
  onContactSupport: () => void;
}) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-indigo-600" />
        <CardTitle className="text-lg font-semibold text-gray-800">
          Support & Help
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={onContactSupport}
          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
        <Button
          variant="outline"
          onClick={onContactSupport}
          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
        >
          <Mail className="w-4 h-4 mr-2" />
          Mail NSKFDC
        </Button>
        <Button
          variant="outline"
          onClick={onContactSupport}
          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Guidelines
        </Button>
      </CardContent>
    </Card>
  );
}

function DocumentsTable({
  documents,
  onUploadDocument,
}: {
  documents: DocumentInfo[];
  onUploadDocument: () => void;
}) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileBadge className="h-5 w-5 text-indigo-600" />
          <CardTitle className="text-lg font-semibold text-gray-800">
            Document Verification Status
          </CardTitle>
        </div>
        <Button
          onClick={onUploadDocument}
          className="bg-indigo-600 hover:bg-indigo-700"
          size="sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead className="text-gray-600 border-b-2 border-gray-200 bg-gray-50/70">
            <tr>
              <th className="p-3 font-semibold text-left">Document</th>
              <th className="p-3 font-semibold text-center">Type</th>
              <th className="p-3 font-semibold text-left">Uploaded</th>
              <th className="p-3 font-semibold text-left">Verified By</th>
              <th className="p-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150 last:border-b-0"
              >
                <td className="p-3 font-medium text-gray-800">{doc.name}</td>
                <td className="p-3 text-center">
                  <Badge variant="secondary">{doc.type}</Badge>
                </td>
                <td className="p-3 text-gray-600">{doc.uploadedDate}</td>
                <td className="p-3 text-gray-600">{doc.verifiedBy}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    {doc.status === "Verified" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-500" />
                    )}
                    <span
                      className={`font-medium ${
                        doc.status === "Verified"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
// removed stray/unmatched JSX block (was an accidental duplicate/fragment)

function VerificationCard({ info }: { info: VerificationInfo }) {
  const items = [
      { icon: ShieldCheck, label: "Verification Status", value: info.status, color: "text-green-600", bgColor: "bg-green-50" },
      { icon: UserPlus, label: "Role", value: info.role, color: "text-blue-600", bgColor: "bg-blue-50" },
      { icon: MapPin, label: "Jurisdiction Access", value: info.jurisdictionAccess, color: "text-purple-600", bgColor: "bg-purple-50" },
      { icon: Clock, label: "Last Synced with NSKC", value: info.lastSynced, color: "text-gray-600", bgColor: "bg-gray-50" },
  ];
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Verification & Role Info</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        {items.map((item, i) => (
             <div key={i} className={`flex items-center gap-3 p-3 border rounded-lg ${item.bgColor} border-gray-200`}>
               <div className={`${item.color}`}>{<item.icon className="w-6 h-6"/>}</div>
               <div>
                 <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                 <p className={`font-semibold ${item.label === "Verification Status" && info.status === "Verified" ? "text-green-700" : "text-gray-800"}`}>{item.value}</p>
               </div>
             </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PoliceStationsTable({ stations }: { stations: PoliceStation[] }) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Assigned Police Stations Summary</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead className="text-gray-600 border-b-2 border-gray-200 bg-gray-50/70">
            <tr>
              <th className="p-3 font-semibold text-left">Police Station</th>
              <th className="p-3 font-semibold text-center">Total Incidents</th>
              <th className="p-3 font-semibold text-center">Active Cases</th>
              <th className="p-3 font-semibold text-center">Pending Cases</th>
              <th className="p-3 font-semibold text-center">Completed</th>
              <th className="p-3 font-semibold text-right">Compensation Paid</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((st, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150 last:border-b-0">
                <td className="p-3 font-medium text-gray-800">{st.name}</td>
                <td className="p-3 text-center text-gray-700">{st.incidents}</td>
                <td className="p-3 text-center text-gray-700">{st.active}</td>
                <td className={`p-3 text-center font-bold ${st.pending > 0 ? 'text-orange-600' : 'text-gray-500'}`}>{st.pending}</td>
                <td className="p-3 text-center font-semibold text-green-600">{st.completed}</td>
                <td className="p-3 text-right font-medium text-gray-700">{st.compensation}</td>
              </tr>
            ))}
            {stations.length === 0 && (<tr><td colSpan={6} className="p-4 text-center text-gray-500">No stations assigned or data unavailable.</td></tr>)}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ProfileTabs({ profileSettings, accountSettings, onUploadSignature, onSaveChanges }: {
    profileSettings: ProfileSettings;
    accountSettings: AccountSettings;
    onUploadSignature: () => void;
    onSaveChanges: () => void;
}) {
    const [altContact, setAltContact] = useState(profileSettings.alternateContact);
    const [language, setLanguage] = useState(profileSettings.language);
    const [notificationType, setNotificationType] = useState(profileSettings.notificationType);
    const [email, setEmail] = useState(accountSettings.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-200/70 rounded-lg p-1">
        <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-200">My Profile</TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-200">Account Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">My Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputItem label="Alternate Contact" value={altContact} onChange={(e) => setAltContact(e.target.value)} icon={<Phone className="h-4 w-4 text-gray-400"/>} />
            <InputItem label="Language Preference" value={language} onChange={(e) => setLanguage(e.target.value)} icon={<Globe className="h-4 w-4 text-gray-400"/>} /> {/* Added Globe Icon */}
            <InputItem label="Notification Type" value={notificationType} onChange={(e) => setNotificationType(e.target.value)} icon={<BellRing className="h-4 w-4 text-gray-400"/>} /> {/* Added Bell Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Signature Upload</label>
              <div className="mt-1 flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onUploadSignature} className="text-gray-700 border-gray-300 hover:bg-gray-100">
                  <FileUp className="w-4 h-4 mr-2" /> Upload Signature
                </Button>
              </div>
            </div>
             <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
              <Button variant="default" onClick={onSaveChanges} className="bg-indigo-600 hover:bg-indigo-700"><Save className="w-4 h-4 mr-2"/> Save Profile</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputItem label="Change Email Address" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="h-4 w-4 text-gray-400"/>} />
            <div></div> {/* Spacer */}
            <InputItem label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" icon={<Lock className="h-4 w-4 text-gray-400"/>} /> {/* Added Lock Icon */}
            <InputItem label="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" icon={<Lock className="h-4 w-4 text-gray-400"/>} />
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
               <Button variant="outline" onClick={() => { setNewPassword(''); setConfirmPassword(''); }}> <XCircle className="w-4 h-4 mr-2"/> Cancel</Button>
               <Button variant="default" onClick={onSaveChanges} className="bg-indigo-600 hover:bg-indigo-700"><Save className="w-4 h-4 mr-2"/> Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Updated InputItem with icon
function InputItem({ label, value, onChange, type = "text", icon }: {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: JSX.Element;
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
         {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{React.cloneElement(icon, { className: "h-4 w-4 text-gray-400" })}</div>}
         <input
            type={type}
            className={`w-full mt-1 p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 ${icon ? 'pl-9' : 'pl-3'}`} // Added padding left if icon exists
            value={value}
            onChange={onChange}
          />
      </div>
    </div>
  );
}

// Duplicate ActivityLogCard removed (use the earlier implementation above).

function ComplianceSummary({ metrics }: { metrics: ComplianceMetric[] }) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
            <CheckCircle className="h-5 w-5 text-indigo-600"/>
            <CardTitle className="text-lg font-semibold text-gray-800">Compliance & Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        {metrics.map((metric, i) => (
          <Metric key={i} label={metric.label} value={metric.value} />
        ))}
        {metrics.length === 0 && (<p className="text-center text-gray-500 py-4">No compliance data available.</p>)}
      </CardContent>
    </Card>
  );
}

// Updated Metric component with styled progress bar
function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="font-semibold text-indigo-700">{value}%</span>
      </div>
      <Progress value={value} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-purple-500"/>
    </div>
  );
}

function SupportLogsSection({ onContactDGP, onMailSupport, onViewLogs }: {
    onContactDGP: () => void;
    onMailSupport: () => void;
    onViewLogs: () => void;
}) {
  return (
     <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
        <CardHeader className="flex flex-row items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-indigo-600"/>
            <CardTitle className="text-lg font-semibold text-gray-800">Support & Logs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
             <Button variant="outline" onClick={onContactDGP} className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
               <Phone className="w-4 h-4 mr-2" /> Contact DGP Office
             </Button>
             <Button variant="outline" onClick={onMailSupport} className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
               <Mail className="w-4 h-4 mr-2" /> Mail NSKC Support
             </Button>
             <Button variant="outline" onClick={onViewLogs} className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
               <FileText className="w-4 h-4 mr-2" /> View Communication Logs
             </Button>
       </CardContent>
    </Card>
  );
}

/* Removed the broken duplicate DocumentsTable and fixed icon helpers below. 
   Use the earlier DocumentsTable implementation (which accepts onUploadDocument). */

// Dummy LocalPolice icon - Remove if imported elsewhere
const LocalPolice = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

// Dummy Lock icon - Replace with actual import if available
const Lock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

// Dummy Globe icon - Replace with actual import if available
const Globe = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a9 9 0 005.657-15.343M2.697 16.126a9 9 0 0118.606 0" />
  </svg>
);
