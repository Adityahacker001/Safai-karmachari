"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress"; // Assuming Shadcn Progress
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
  FileUp, // Icon for Upload
  Save, // Icon for Save
  XCircle, // Icon for Cancel
  Activity, // Icon for Activity Log
  LifeBuoy, // Icon for Support
  FileBadge, // Icon for Documents
} from "lucide-react";

// --- Interfaces (remain the same) ---
interface ProfileInfo { name: string; jurisdiction: string; email: string; phone: string; avatarUrl: string; isVerified: boolean; }
interface VerificationInfo { status: string; role: string; jurisdictionAccess: string; lastSynced: string; }
interface PoliceStation { name: string; incidents: number; active: number; pending: number; completed: number; compensation: string; }
interface ProfileSettings { alternateContact: string; language: string; notificationType: string; }
interface AccountSettings { email: string; }
interface ActivityLog { label: string; value: string; }
interface ComplianceMetric { label: string; value: number; }
interface DocumentInfo { name: string; type: string; verifiedBy: string; status: string; }

// Inline IntegratedLoader (same JSX/CSS as components/IntegratedLoader.tsx)
const IntegratedLoader: React.FC = () => (
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

// --- Main Page Component ---
export default function SPProfilePage() {
    // --- User Role Detection with URL Sync ---
    const [userRole, setUserRole] = useState<'SP' | 'CP'>('SP');
  const [loading, setLoading] = useState(true);
    
    // Get URL search params to sync with layout
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get('role');
        if (roleParam === 'sp' || roleParam === 'cp') {
            setUserRole(roleParam.toUpperCase() as 'SP' | 'CP');
        } else {
            // Set default role in URL if not present
            const url = new URL(window.location.href);
            url.searchParams.set('role', 'sp');
            window.history.replaceState({}, '', url.toString());
        }
    }, []);
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(t);
    }, []);
    
    const router = useRouter();
    
    // Update URL when role changes
    const handleRoleChange = (newRole: 'SP' | 'CP') => {
        setUserRole(newRole);
        const url = new URL(window.location.href);
        url.searchParams.set('role', newRole.toLowerCase());
        window.history.replaceState({}, '', url.toString());
        // Refresh to update the layout
        router.refresh();
    };
    
    // --- State Variables (dynamic based on role) ---
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({ 
        name: userRole === 'SP' ? "Superintendent of Police, Lucknow" : "Commissioner of Police, Mumbai", 
        jurisdiction: userRole === 'SP' ? "Lucknow Urban District" : "Mumbai Police Zone", 
        email: userRole === 'SP' ? "sp.lucknow@police.gov.in" : "cp.mumbai@police.gov.in", 
        phone: "+91 98765 43210", 
        avatarUrl: userRole === 'SP' ? "/sp-avatar.png" : "/cp-avatar.png", 
        isVerified: true, 
    });
    const [verificationInfo, setVerificationInfo] = useState<VerificationInfo>({ 
        status: "Verified", 
        role: userRole === 'SP' ? "Superintendent of Police" : "Commissioner of Police", 
        jurisdictionAccess: userRole === 'SP' ? "6 Police Stations" : "12 Police Stations", 
        lastSynced: "22 Oct 2025, 10:15 AM", 
    });
    const [stations, setStations] = useState<PoliceStation[]>([ { name: "Central PS", incidents: 10, active: 6, pending: 2, completed: 2, compensation: "₹1.2L" }, { name: "South PS", incidents: 7, active: 4, pending: 1, completed: 2, compensation: "₹85K" }, { name: "East PS", incidents: 5, active: 2, pending: 2, completed: 1, compensation: "₹1.5L" }, ]);
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>({ alternateContact: "+91 99888 11223", language: "English", notificationType: "Email + SMS", });
    const [accountSettings, setAccountSettings] = useState<AccountSettings>({ email: "sp.lucknow@police.gov.in", });
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([ { label: "Last Login", value: "23 Oct 2025, 05:30 PM" }, { label: "Reports Approved", value: "5" }, { label: "Grievance Replies", value: "2" }, { label: "Directions Replied", value: "3" }, ]);
    const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetric[]>([ { label: "Directions Replied vs Received", value: 80 }, { label: "Avg Investigation Time Compliance", value: 72 }, { label: "Pending FIR Reviews Resolved", value: 65 }, { label: "Compensation Approval Rate", value: 90 }, ]);
    const [documents, setDocuments] = useState<DocumentInfo[]>([ { name: "Posting Order", type: "PDF", verifiedBy: "DGP Office", status: "✅ Verified" }, { name: "NSKC Authorization", type: "PDF", verifiedBy: "NSKC Panel", status: "✅ Verified" }, { name: "ID Proof", type: "JPG", verifiedBy: "NSKC", status: "⏳ Pending" }, ]);

    // --- Placeholder Event Handlers (remain the same) ---
    const handleUploadSignature = () => console.log("Upload Signature clicked");
    const handleSaveChanges = () => console.log("Save Changes clicked");
    const handleContactDGP = () => console.log("Contact DGP clicked");
    const handleMailSupport = () => console.log("Mail Support clicked");
    const handleViewLogs = () => console.log("View Logs clicked");

    // --- Effect for role change and dynamic updates ---
    useEffect(() => {
        // Update profile info when role changes
        setProfileInfo({
            name: userRole === 'SP' ? "Superintendent of Police, Lucknow" : "Commissioner of Police, Mumbai", 
            jurisdiction: userRole === 'SP' ? "Lucknow Urban District" : "Mumbai Police Zone", 
            email: userRole === 'SP' ? "sp.lucknow@police.gov.in" : "cp.mumbai@police.gov.in", 
            phone: "+91 98765 43210", 
            avatarUrl: userRole === 'SP' ? "/sp-avatar.png" : "/cp-avatar.png", 
            isVerified: true,
        });
        
        setVerificationInfo({
            status: "Verified", 
            role: userRole === 'SP' ? "Superintendent of Police" : "Commissioner of Police", 
            jurisdictionAccess: userRole === 'SP' ? "6 Police Stations" : "12 Police Stations", 
            lastSynced: "22 Oct 2025, 10:15 AM",
        });

        // Update station data based on role
        if (userRole === 'SP') {
            setStations([
                { name: "Central PS", incidents: 10, active: 6, pending: 2, completed: 2, compensation: "₹1.2L" },
                { name: "South PS", incidents: 7, active: 4, pending: 1, completed: 2, compensation: "₹85K" },
                { name: "East PS", incidents: 5, active: 2, pending: 2, completed: 1, compensation: "₹1.5L" },
            ]);
        } else {
            setStations([
                { name: "Andheri PS", incidents: 15, active: 8, pending: 3, completed: 4, compensation: "₹2.1L" },
                { name: "Bandra PS", incidents: 12, active: 6, pending: 2, completed: 4, compensation: "₹1.8L" },
                { name: "Colaba PS", incidents: 8, active: 3, pending: 1, completed: 4, compensation: "₹1.2L" },
                { name: "Worli PS", incidents: 10, active: 5, pending: 2, completed: 3, compensation: "₹1.5L" },
            ]);
        }
        
        // Update activity logs with current time (excluding Last Login as it's moved to header)
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        setActivityLogs([
            { label: "Last Login", value: `${formattedDate}, ${formattedTime}` }, // Keep for header reference
            { label: "Reports Approved", value: "5" },
            { label: "Grievance Replies", value: "2" },
            { label: "Directions Replied", value: "3" },
        ]);
    }, [userRole]);

  if (loading) return <IntegratedLoader />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen w-full">
      {/* District-style title banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">{userRole} Profile Management</h1>
            <p className="text-sm text-white/90">Overview, Settings, and Compliance Status</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white/90 font-medium">Last Login: {activityLogs.find(log => log.label === "Last Login")?.value || "N/A"}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      <ProfileHeader info={profileInfo} userRole={userRole} />
      <VerificationCard info={verificationInfo} />
      <PoliceStationsTable stations={stations} />
      <ProfileTabs
        profileSettings={profileSettings}
        accountSettings={accountSettings}
        onUploadSignature={handleUploadSignature}
        onSaveChanges={handleSaveChanges}
      />
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityLogCard logs={activityLogs} />
        <ComplianceSummary metrics={complianceMetrics} />
      </div> */}
      <SupportSection
        onContactDGP={handleContactDGP}
        onMailSupport={handleMailSupport}
        onViewLogs={handleViewLogs}
      />
      <DocumentsTable documents={documents} />
    </div>
  );
}

// --- Child Components (Enhanced Styling) ---

function ProfileHeader({ info, userRole }: { info: ProfileInfo; userRole: 'SP' | 'CP' }) {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg border-none bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-xl">
      <img
        src={info.avatarUrl}
        alt={`${userRole} Avatar`}
        className="w-28 h-28 rounded-full object-cover border-4 border-white/50 shadow-md flex-shrink-0"
      />
      <div className="space-y-1.5 text-center md:text-left">
        <h2 className="text-2xl font-semibold">{info.name}</h2>
        <p className="text-sm text-indigo-200">Jurisdiction: {info.jurisdiction}</p>
        <p className="text-sm flex items-center justify-center md:justify-start gap-2 text-indigo-100 hover:text-white transition-colors">
          <Mail className="w-4 h-4" /> {info.email}
        </p>
        <p className="text-sm flex items-center justify-center md:justify-start gap-2 text-indigo-100 hover:text-white transition-colors">
          <Phone className="w-4 h-4" /> {info.phone}
        </p>
        <div className="pt-2">
          {info.isVerified ? (
            <Badge variant="secondary" className="bg-green-500/80 text-white border-none text-xs font-medium">
              <CheckCircle className="w-3 h-3 mr-1.5"/> Verified {userRole} (NSKC Authorized)
            </Badge>
          ) : (
             <Badge variant="destructive" className="text-xs font-medium">
                <AlertTriangle className="w-3 h-3 mr-1.5"/> Verification Pending
             </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

function VerificationCard({ info }: { info: VerificationInfo }) {
  const items = [
      { icon: ShieldCheck, label: "Verification Status", value: info.status, color: "text-green-600", bgColor: "bg-green-50" },
      { icon: User, label: "Role", value: info.role, color: "text-blue-600", bgColor: "bg-blue-50" },
      { icon: Building2, label: "Jurisdiction Access", value: info.jurisdictionAccess, color: "text-purple-600", bgColor: "bg-purple-50" },
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

function ActivityLogCard({ logs }: { logs: ActivityLog[] }) {
  // Filter out "Last Login" as it's now shown in the header
  const filteredLogs = logs.filter(log => log.label !== "Last Login");
  
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
           <Activity className="h-5 w-5 text-indigo-600"/>
           <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {filteredLogs.map((log, i) => (
          <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0">
            <span className="text-gray-600">{log.label}</span>
            <span className="font-medium text-gray-800 bg-gray-100 px-2.5 py-1 rounded-full text-xs">{log.value}</span>
          </div>
        ))}
         {filteredLogs.length === 0 && (<p className="text-center text-gray-500 py-4">No recent activity logged.</p>)}
      </CardContent>
    </Card>
  );
}

// function ComplianceSummary({ metrics }: { metrics: ComplianceMetric[] }) {
//   return (
//     // <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
//     //   <CardHeader className="flex flex-row items-center gap-2">
//     //         <CheckCircle className="h-5 w-5 text-indigo-600"/>
//     //         <CardTitle className="text-lg font-semibold text-gray-800">Compliance & Performance</CardTitle>
//     //   </CardHeader>
//     //   <CardContent className="space-y-5 pt-4">
//     //     {metrics.map((metric, i) => (
//     //       <Metric key={i} label={metric.label} value={metric.value} />
//     //     ))}
//     //     {metrics.length === 0 && (<p className="text-center text-gray-500 py-4">No compliance data available.</p>)}
//     //   </CardContent>
//     // </Card>
//   );
// }

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

function SupportSection({ onContactDGP, onMailSupport, onViewLogs }: {
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

function DocumentsTable({ documents }: { documents: DocumentInfo[] }) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-2">
          <FileBadge className="h-5 w-5 text-indigo-600"/>
          <CardTitle className="text-lg font-semibold text-gray-800">Document Verification Status</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
           <table className="w-full text-sm text-left border-collapse min-w-[600px]">
            <thead className="text-gray-600 border-b-2 border-gray-200 bg-gray-50/70">
              <tr>
                <th className="p-3 font-semibold text-left">Document</th>
                <th className="p-3 font-semibold text-center">Type</th>
                <th className="p-3 font-semibold text-left">Verified By</th>
                <th className="p-3 font-semibold text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors duration-150 last:border-b-0">
                  <td className="p-3 font-medium text-gray-800">{doc.name}</td>
                  <td className="p-3 text-center"><Badge variant="secondary">{doc.type}</Badge></td>
                  <td className="p-3 text-gray-600">{doc.verifiedBy}</td>
                  <td className={`p-3 font-medium flex items-center gap-1.5 ${doc.status.includes('Verified') ? 'text-green-600' : 'text-orange-600'}`}>
                      {doc.status.includes('Verified') ? <CheckCircle className="w-4 h-4"/> : <Clock className="w-4 h-4"/>}
                      {doc.status.replace('✅','').replace('⏳','').trim()}
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (<tr><td colSpan={4} className="p-4 text-center text-gray-500">No documents uploaded or required.</td></tr>)}
            </tbody>
          </table>
      </CardContent>
    </Card>
  );
}

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
// Dummy BellRing icon - Replace with actual import if available
const BellRing = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);