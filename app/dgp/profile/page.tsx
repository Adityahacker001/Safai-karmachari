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
import StatCard from "@/components/ui/stat-card";

import {
  User,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  FileText,
  Upload,
  Settings,
  CheckCircle,
  AlertTriangle,
  FileUp,
  Save,
  XCircle,
  Activity,
  LifeBuoy,
  FileBadge,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  Shield,
  Globe,
  Lock,
  BellRing,
} from "lucide-react";
import { cn } from "@/lib/utils";
import IntegratedLoader from "@/components/layout/IntegratedLoader";

// --- Interfaces ---
interface ProfileInfo {
  name: string;
  designation: string;
  state: string;
  contactNumber: string;
  email: string;
  reportingTo: string;
  accessLevel: string;
  avatarUrl: string;
  isVerified: boolean;
}

interface StateStats {
  totalDistricts: number;
  spCpUnitsOnboarded: string;
  totalIncidents: number;
  activeCases: number;
  completedInvestigations: number;
  totalCompensation: string;
}

interface DistrictInfo {
  name: string;
  spCpName: string;
  incidents: number;
  firsField: number;
  pending: number;
  completed: number;
  compensation: string;
  complianceScore: number;
}

interface ProfileSettings {
  alternateContact: string;
  language: string;
  notificationType: string;
}

interface AccountSettings {
  email: string;
}

interface ActivityLog {
  label: string;
  value: string;
}

interface ComplianceMetric {
  label: string;
  value: number;
}

interface DocumentInfo {
  name: string;
  type: string;
  verifiedBy: string;
  status: string;
}

// --- Main Page Component ---
export default function DGPProfilePage() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: "Dr. Subham Singh",
    designation: "Director General of Police",
    state: "Uttar Pradesh",
    contactNumber: "+91 98765 12345",
    email: "dgp.up@police.gov.in",
    reportingTo: "Ministry of Home Affairs / NSKC",
    accessLevel: "Full access to all SK-related cases statewide",
    avatarUrl: "/dgp-avatar.png",
    isVerified: true,
  });

  const [stateStats, setStateStats] = useState<StateStats>({
    totalDistricts: 75,
    spCpUnitsOnboarded: "68/75",
    totalIncidents: 342,
    activeCases: 124,
    completedInvestigations: 218,
    totalCompensation: "₹8 Cr",
  });

  const [districts, setDistricts] = useState<DistrictInfo[]>([
    { name: "Lucknow", spCpName: "SP Lucknow", incidents: 28, firsField: 24, pending: 4, completed: 20, compensation: "₹5.2 Cr", complianceScore: 88 },
    { name: "Kanpur", spCpName: "CP Kanpur", incidents: 35, firsField: 30, pending: 8, completed: 22, compensation: "₹6.8 Cr", complianceScore: 82 },
    { name: "Agra", spCpName: "SP Agra", incidents: 22, firsField: 20, pending: 3, completed: 17, compensation: "₹4.1 Cr", complianceScore: 92 },
    { name: "Varanasi", spCpName: "CP Varanasi", incidents: 18, firsField: 16, pending: 2, completed: 14, compensation: "₹3.5 Cr", complianceScore: 90 },
    { name: "Prayagraj", spCpName: "SP Prayagraj", incidents: 24, firsField: 21, pending: 5, completed: 16, compensation: "₹4.6 Cr", complianceScore: 85 },
  ]);

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    alternateContact: "+91 99888 11223",
    language: "English",
    notificationType: "Email + SMS",
  });

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    email: "dgp.up@police.gov.in",
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { label: "Last Login", value: "28 Oct 2025, 09:45 AM" },
    { label: "Statewide Reports Generated", value: "12" },
    { label: "NSKC Directions Received", value: "8" },
    { label: "District Compliance Reviews", value: "15" },
    { label: "SP/CP Communications", value: "42" },
  ]);

  const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetric[]>([
    { label: "Statewide FIR Filing Rate", value: 87 },
    { label: "Investigation Completion Rate", value: 64 },
    { label: "NSKC Direction Compliance", value: 92 },
    { label: "Compensation Disbursement Rate", value: 78 },
    { label: "SP/CP Onboarding Progress", value: 91 },
  ]);

  const [documents, setDocuments] = useState<DocumentInfo[]>([
    { name: "DGP Appointment Order", type: "PDF", verifiedBy: "Ministry of Home Affairs", status: "✅ Verified" },
    { name: "NSKC Authorization", type: "PDF", verifiedBy: "NSKC Panel", status: "✅ Verified" },
    { name: "State Police Manual", type: "PDF", verifiedBy: "State Government", status: "✅ Verified" },
    { name: "ID & Security Clearance", type: "PDF", verifiedBy: "MHA", status: "✅ Verified" },
  ]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleUploadSignature = () => console.log("Upload Signature clicked");
  const handleSaveChanges = () => console.log("Save Changes clicked");
  const handleContactNSKC = () => console.log("Contact NSKC clicked");
  const handleContactMHA = () => console.log("Contact MHA clicked");
  const handleViewLogs = () => console.log("View Logs clicked");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setActivityLogs(prevLogs => 
      prevLogs.map(log => 
        log.label === "Last Login" 
          ? { ...log, value: `${formattedDate}, ${formattedTime}` } 
          : log
      )
    );
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <IntegratedLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 md:space-y-4 lg:space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-3 md:mb-4 lg:mb-6 animate-slideUp bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
          DGP Profile Management
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium drop-shadow-md mt-1">State Police Nodal - Overview, Settings & Statewide Compliance</p>
      </div>

      <ProfileHeader info={profileInfo} />
      <StateStatistics stats={stateStats} />
      <DistrictOverviewTable districts={districts} />
      
      <ProfileTabs
        profileSettings={profileSettings}
        accountSettings={accountSettings}
        onUploadSignature={handleUploadSignature}
        onSaveChanges={handleSaveChanges}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <ActivityLogCard logs={activityLogs} />
        <ComplianceSummary metrics={complianceMetrics} />
      </div>
      
      <SupportSection
        onContactNSKC={handleContactNSKC}
        onContactMHA={handleContactMHA}
        onViewLogs={handleViewLogs}
      />
      
      <DocumentsTable documents={documents} />
    </div>
  );
}

// --- Child Components ---

function ProfileHeader({ info }: { info: ProfileInfo }) {
  return (
    <Card className="overflow-hidden animate-slideInLeft card-hover border-0 shadow-lg" style={{ animationDelay: '0.1s' }}>
      <div className="relative p-3 sm:p-4 md:p-6 flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-400/10 to-transparent blur-3xl rounded-full" />
        
        <div className="relative group">
          <img
            src={info.avatarUrl}
            alt="DGP Avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white/30 shadow-2xl flex-shrink-0 transform transition-all duration-500 group-hover:scale-110 group-hover:border-white/50"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-2 border-white shadow-lg animate-pulse">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
        
        <div className="space-y-1.5 sm:space-y-2 text-center md:text-left flex-1 relative z-10">
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              {info.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-blue-100 font-medium animate-slideInRight" style={{ animationDelay: '0.25s' }}>
              {info.designation}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1 sm:pt-2 text-xs sm:text-sm">
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 hover:text-white transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.3s' }}>
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
              <span>State: {info.state}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 hover:text-white transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.35s' }}>
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
              <span className="truncate text-xs sm:text-sm">{info.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 hover:text-white transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.4s' }}>
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-xs sm:text-sm">{info.contactNumber}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100 hover:text-white transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.45s' }}>
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
              <span className="truncate text-xs sm:text-sm">Reports to: {info.reportingTo}</span>
            </div>
          </div>
          
          <div className="pt-2 sm:pt-3 flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start animate-slideInRight" style={{ animationDelay: '0.5s' }}>
            {info.isVerified ? (
              <Badge className="bg-green-500/90 hover:bg-green-500 text-white border-none text-xs font-medium backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
                <CheckCircle className="w-3 h-3 mr-1.5"/> NSKC Authorized
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs font-medium transform hover:scale-105 transition-all duration-300">
                <AlertTriangle className="w-3 h-3 mr-1.5"/> Verification Pending
              </Badge>
            )}
            <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white border-none text-xs font-medium backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
              <Shield className="w-3 h-3 mr-1.5"/> State Police Nodal
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StateStatistics({ stats }: { stats: StateStats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      <StatCard title="Total Districts" value={stats.totalDistricts.toString()} icon={MapPin} color="blue" />
      <StatCard title="SP/CP Onboarded" value={stats.spCpUnitsOnboarded} icon={Users} color="indigo" />
      <StatCard title="Total Incidents" value={stats.totalIncidents.toString()} icon={AlertTriangle} color="red" />
      <StatCard title="Active Cases" value={stats.activeCases.toString()} icon={Activity} color="purple" />
      <StatCard title="Completed Investigations" value={stats.completedInvestigations.toString()} icon={CheckCircle} color="green" />
      <StatCard title="Total Compensation" value={stats.totalCompensation} icon={TrendingUp} color="emerald" />
    </div>
  );
}

function DistrictOverviewTable({ districts }: { districts: DistrictInfo[] }) {
  return (
    <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm animate-slideUp card-hover" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              District Performance Overview
            </CardTitle>
          </div>
          <Badge className="text-xs">Top 5 Districts</Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
              <th className="p-2.5 sm:p-3 text-left font-semibold text-gray-700">District</th>
              <th className="p-2.5 sm:p-3 text-left font-semibold text-gray-700">SP/CP Name</th>
              <th className="p-2.5 sm:p-3 text-center font-semibold text-gray-700">Incidents</th>
              <th className="p-2.5 sm:p-3 text-center font-semibold text-gray-700 hidden sm:table-cell">FIRs Filed</th>
              <th className="p-2.5 sm:p-3 text-center font-semibold text-gray-700">Pending</th>
              <th className="p-2.5 sm:p-3 text-center font-semibold text-gray-700 hidden md:table-cell">Completed</th>
              <th className="p-2.5 sm:p-3 text-right font-semibold text-gray-700 hidden lg:table-cell">Compensation</th>
              <th className="p-2.5 sm:p-3 text-left font-semibold text-gray-700">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-300 group animate-slideInLeft"
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              >
                <td className="p-2.5 sm:p-3">
                  <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{district.name}</span>
                </td>
                <td className="p-2.5 sm:p-3 text-gray-600 group-hover:text-gray-900 transition-colors text-xs sm:text-sm">
                  {district.spCpName}
                </td>
                <td className="p-2.5 sm:p-3 text-center text-gray-700 font-medium">{district.incidents}</td>
                <td className="p-2.5 sm:p-3 text-center text-gray-700 hidden sm:table-cell">{district.firsField}</td>
                <td className="p-2.5 sm:p-3 text-center">
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105',
                    district.pending > 5
                      ? 'bg-gradient-to-r from-red-100/80 to-rose-100/80 text-red-700'
                      : 'bg-gradient-to-r from-green-100/80 to-emerald-100/80 text-green-700'
                  )}>
                    {district.pending}
                  </span>
                </td>
                <td className="p-2.5 sm:p-3 text-center font-semibold text-green-700 hidden md:table-cell">{district.completed}</td>
                <td className="p-2.5 sm:p-3 text-right font-medium text-gray-700 hidden lg:table-cell">{district.compensation}</td>
                <td className="p-2.5 sm:p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          district.complianceScore >= 85
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : district.complianceScore >= 70
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                            : 'bg-gradient-to-r from-red-500 to-rose-500'
                        )}
                        style={{ width: `${district.complianceScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 min-w-[2.5rem] text-right">
                      {district.complianceScore}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ProfileTabs({
  profileSettings,
  accountSettings,
  onUploadSignature,
  onSaveChanges,
}: {
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
    <Tabs defaultValue="profile" className="w-full animate-slideUp" style={{ animationDelay: '0.4s' }}>
      <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 bg-gray-100 rounded-lg p-1">
        <TabsTrigger
          value="profile"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-300 text-sm"
        >
          My Profile
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-300 text-sm"
        >
          Account Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm card-hover">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputItem
              label="Alternate Contact"
              value={altContact}
              onChange={(e) => setAltContact(e.target.value)}
              icon={<Phone className="h-4 w-4 text-gray-400" />}
            />
            <InputItem
              label="Language Preference"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              icon={<Globe className="h-4 w-4 text-gray-400" />}
            />
            <InputItem
              label="Notification Type"
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              icon={<BellRing className="h-4 w-4 text-gray-400" />}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature</label>
              <div className="mt-1 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onUploadSignature}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:scale-105 transition-transform"
                >
                  <FileUp className="w-4 h-4 mr-2" /> Upload Signature
                </Button>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
              <Button
                variant="default"
                onClick={onSaveChanges}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" /> Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm card-hover">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputItem
              label="Change Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4 text-gray-400" />}
            />
            <div></div>
            <InputItem
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              icon={<Lock className="h-4 w-4 text-gray-400" />}
            />
            <InputItem
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              icon={<Lock className="h-4 w-4 text-gray-400" />}
            />
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="hover:scale-105 transition-transform"
              >
                <XCircle className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button
                variant="default"
                onClick={onSaveChanges}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" /> Update Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function InputItem({
  label,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: JSX.Element;
}) {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, { className: "h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" })}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full mt-1 p-2.5 border border-gray-200 rounded-lg text-sm bg-white",
            "focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300",
            "hover:border-gray-300",
            icon ? "pl-10" : "pl-3"
          )}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function ActivityLogCard({ logs }: { logs: ActivityLog[] }) {
  return (
    <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm animate-slideInLeft card-hover" style={{ animationDelay: '0.5s' }}>
      <CardHeader className="flex flex-row items-center gap-2">
        <Activity className="h-5 w-5 text-blue-600" />
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-gray-100 pb-2.5 last:border-b-0 group hover:bg-blue-50/30 -mx-3 px-3 rounded-lg transition-all duration-300 animate-scaleIn"
            style={{ animationDelay: `${0.6 + i * 0.05}s` }}
          >
            <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{log.label}</span>
            <span className="font-medium text-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 px-2.5 py-1 rounded-full text-xs group-hover:scale-105 transition-transform">
              {log.value}
            </span>
          </div>
        ))}
        {logs.length === 0 && <p className="text-center text-gray-500 py-4">No recent activity logged.</p>}
      </CardContent>
    </Card>
  );
}

function ComplianceSummary({ metrics }: { metrics: ComplianceMetric[] }) {
  return (
    <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm animate-slideInRight card-hover" style={{ animationDelay: '0.5s' }}>
      <CardHeader className="flex flex-row items-center gap-2">
        <Target className="h-5 w-5 text-blue-600" />
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Statewide Compliance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-5 pt-4">
        {metrics.map((metric, i) => (
          <div key={i} className="animate-scaleIn" style={{ animationDelay: `${0.6 + i * 0.05}s` }}>
            <Metric label={metric.label} value={metric.value} />
          </div>
        ))}
        {metrics.length === 0 && <p className="text-center text-gray-500 py-4">No compliance data available.</p>}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="group">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{label}</span>
        <span className={cn(
          "font-semibold transition-colors",
          value >= 85 ? "text-green-600" : value >= 70 ? "text-yellow-600" : "text-red-600"
        )}>
          {value}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden group-hover:bg-gray-200 transition-colors">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 group-hover:scale-x-105 origin-left",
            value >= 85
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : value >= 70
              ? "bg-gradient-to-r from-yellow-500 to-amber-500"
              : "bg-gradient-to-r from-red-500 to-rose-500"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function SupportSection({
  onContactNSKC,
  onContactMHA,
  onViewLogs,
}: {
  onContactNSKC: () => void;
  onContactMHA: () => void;
  onViewLogs: () => void;
}) {
  return (
    <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm animate-slideUp card-hover" style={{ animationDelay: '0.6s' }}>
      <CardHeader className="flex flex-row items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-blue-600" />
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Support & Communication
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onContactNSKC}
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Shield className="w-4 h-4 mr-2" /> Contact NSKC
        </Button>
        <Button
          variant="outline"
          onClick={onContactMHA}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Building2 className="w-4 h-4 mr-2" /> Contact MHA
        </Button>
        <Button
          variant="outline"
          onClick={onViewLogs}
          className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <FileText className="w-4 h-4 mr-2" /> View Communication Logs
        </Button>
      </CardContent>
    </Card>
  );
}

function DocumentsTable({ documents }: { documents: DocumentInfo[] }) {
  return (
    <Card className="shadow-md border border-gray-100/50 rounded-xl bg-white/80 backdrop-blur-sm animate-slideUp card-hover" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="flex flex-row items-center gap-2">
        <FileBadge className="h-5 w-5 text-blue-600" />
        <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Document Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[600px]">
          <thead className="text-gray-600 border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
            <tr>
              <th className="p-2.5 sm:p-3 font-semibold text-left">Document</th>
              <th className="p-2.5 sm:p-3 font-semibold text-center">Type</th>
              <th className="p-2.5 sm:p-3 font-semibold text-left">Verified By</th>
              <th className="p-2.5 sm:p-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-300 last:border-b-0 group animate-slideInLeft"
                style={{ animationDelay: `${0.8 + index * 0.05}s` }}
              >
                <td className="p-2.5 sm:p-3 font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{doc.name}</td>
                <td className="p-2.5 sm:p-3 text-center">
                  <Badge variant="secondary" className="group-hover:scale-105 transition-transform">{doc.type}</Badge>
                </td>
                <td className="p-2.5 sm:p-3 text-gray-600 group-hover:text-gray-900 transition-colors">{doc.verifiedBy}</td>
                <td className={cn(
                  "p-2.5 sm:p-3 font-medium flex items-center gap-1.5",
                  doc.status.includes("Verified") ? "text-green-600" : "text-orange-600"
                )}>
                  {doc.status.includes("Verified") ? (
                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  {doc.status.replace("✅", "").replace("⏳", "").trim()}
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No documents uploaded or required.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
