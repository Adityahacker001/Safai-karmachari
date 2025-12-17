// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// aur lucide-react (npm install lucide-react) install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useRef, useEffect, useState } from 'react';
import {
  User,
  ShieldCheck,
  FileText,
  History,
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  KeyRound,
  FileStack,
  FileUp,
  ChevronsRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  UploadCloud,
  CheckSquare,
  BadgeCheck,
  UserCheck,
  Lock,
  Link as LinkIcon,
  Fingerprint,
  CalendarDays,
  ArrowRight,
  Star,
  Activity,
  LogIn,
} from 'lucide-react';

// --- 1. Profile Header Component ---
// Sabse upar wala colorful card
const ProfileHeader = () => (
  <div className="relative rounded-xl shadow-xl overflow-hidden p-6 md:p-8 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-sans">
    {/* Status Badge */}
    <span className="absolute top-5 right-5 flex items-center py-1.5 px-3 rounded-full text-xs font-bold bg-green-400/90 text-green-900 shadow-md animate-pulse">
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-800"></span>
      </span>
      Active
    </span>

    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
      {/* Profile Picture */}
      <div className="relative group flex-shrink-0">
        <img
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
          src="https://via.placeholder.com/112/B0E0E6/1E90FF?text=RP" // Placeholder image
          alt="Ravi Prakash Sharma"
        />
        {/* Animated Glow on Hover */}
        <span className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-0 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow"></span>
      </div>

      {/* User Info */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Ravi Prakash Sharma
        </h1>
        <p className="text-xl text-indigo-100 font-light mt-1">
          Deputy Manager – Project Sanctioning
        </p>
        <p className="text-sm text-indigo-200 mt-3">
          <Briefcase className="w-4 h-4 inline-block mr-1.5 opacity-80" />
          Finance & Project Monitoring Division
        </p>
        <p className="text-sm text-indigo-200">
          <Building className="w-4 h-4 inline-block mr-1.5 opacity-80" />
          National Safai Karamchari Finance & Development Corporation (NSKFDC)
        </p>
      </div>

      {/* Role & Login Info */}
      <div className="flex-shrink-0 text-center md:text-right">
        <span className="inline-block py-2 px-4 rounded-lg bg-white/20 text-white text-sm font-semibold backdrop-blur-sm shadow">
          <UserCheck className="w-4 h-4 inline-block mr-1.5" />
          Officer Role
        </span>
        <p className="text-xs text-indigo-100 mt-4">
          <LogIn className="w-3 h-3 inline-block mr-1.5" />
          Last Login: 25 Oct 2025, 09:00 AM
        </p>
      </div>
    </div>
  </div>
);

// --- 2. Navigation Tabs Component ---
// Sticky navigation bar jo sections tak scroll karega
type NavigationTabsProps = {
  onScrollTo: (ref: React.RefObject<HTMLElement>) => void;
  refs: {
    profileRef: React.RefObject<HTMLElement>;
    accessRef: React.RefObject<HTMLElement>;
    docsRef: React.RefObject<HTMLElement>;
    activityRef: React.RefObject<HTMLElement>;
  };
};

type NavigationTabsProps2 = NavigationTabsProps & { activeTab: string; onActivate: (name: string) => void };

const NavigationTabs: React.FC<NavigationTabsProps2> = ({ onScrollTo, refs, activeTab, onActivate }) => {
  const tabs = [
    { name: 'Profile Info', icon: User, ref: refs.profileRef },
    { name: 'Access Rights', icon: ShieldCheck, ref: refs.accessRef },
    // { name: 'Documents', icon: FileText, ref: refs.docsRef },
    { name: 'Activity Log', icon: History, ref: refs.activityRef },
  ];

  return (
    <div className="sticky top-4 z-50">
      <nav className="flex items-center justify-around bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => { onActivate(tab.name); onScrollTo(tab.ref); }}
            aria-current={activeTab === tab.name ? 'true' : undefined}
            className={`flex-1 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 p-3 md:p-4 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:z-10 ${activeTab === tab.name ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            <tab.icon className="w-5 h-5 mb-1 md:mb-0" />
            <span className="text-xs md:text-sm">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// --- 3. Reusable Card Component ---
// Har section ke liye base card
type CardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, icon: Icon, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden ${className}`}>
    {/* Card Header */}
    <div className="p-4 md:p-5 border-b border-slate-200 bg-gradient-to-r from-white to-sky-50/50">
      <h2 className="flex items-center text-xl font-semibold text-indigo-700">
        <span className="p-2 bg-indigo-100 rounded-lg mr-3">
          <Icon className="w-6 h-6 text-indigo-600" />
        </span>
        {title}
      </h2>
    </div>
    {/* Card Body */}
    <div className="p-4 md:p-6">
      {children}
    </div>
  </div>
);

// --- 4. Reusable DetailRow Component ---
// Key-value pairs ke liye
type DetailRowProps = {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
};

const DetailRow: React.FC<DetailRowProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 py-3.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 -mx-3 px-3 rounded-lg transition-colors">
    <Icon className="w-5 h-5 mt-1 text-indigo-400 flex-shrink-0" />
    <div className="flex-1">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-base font-semibold text-slate-800 break-words">{value}</dd>
    </div>
  </div>
);

// --- 5. Reusable DocumentCard Component ---
// Documents section ke liye
type DocumentCardProps = {
  title: string;
  status: 'Verified' | 'Pending' | 'Rejected';
};

const DocumentCard: React.FC<DocumentCardProps> = ({ title, status }) => {
  const statusConfig = {
    Verified: {
      icon: CheckCircle2,
      label: 'Verified',
      colorClasses: 'border-green-500 bg-green-50/70 text-green-700',
      iconColor: 'text-green-500',
    },
    Pending: {
      icon: AlertCircle,
      label: 'Pending',
      colorClasses: 'border-amber-500 bg-amber-50/70 text-amber-700',
      iconColor: 'text-amber-500',
    },
    Rejected: {
      icon: XCircle,
      label: 'Rejected',
      colorClasses: 'border-red-500 bg-red-50/70 text-red-700',
      iconColor: 'text-red-500',
    },
  };
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border-l-4 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${config.colorClasses}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-semibold text-slate-800">{title}</p>
          <span className={`flex items-center text-sm font-medium mt-1 ${config.iconColor}`}>
            <Icon className="w-4 h-4 mr-1.5" />
            {config.label}
          </span>
        </div>
        <button className="flex-shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
          View
        </button>
      </div>
    </div>
  );
};

// --- 6. Reusable ActivityItem Component ---
// Activity log ke liye
type ActivityItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({ icon: Icon, title, description, time }) => (
  <div className="relative flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50/70 transition-colors">
    {/* Vertical line connector */}
    <div className="absolute left-[20px] top-10 h-full border-l-2 border-dashed border-slate-200"></div>
    
    {/* Icon */}
    <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 ring-8 ring-white">
      <Icon className="w-5 h-5" />
    </span>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500 mt-0.5">{description}</p>
    </div>
    
    {/* Time */}
    <time className="flex-shrink-0 text-xs text-slate-400 whitespace-nowrap pt-1">
      {time}
    </time>
  </div>
);


// --- 7. Main Page Component ---
// Sab components ko ek saath laane wala main component

const NskfdcProfilePage = () => {
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = useState('Profile Info');

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  // Sections ke liye Refs
  const profileRef = useRef<HTMLElement>(null);
  const accessRef = useRef<HTMLElement>(null);
  const docsRef = useRef<HTMLElement>(null);
  const activityRef = useRef<HTMLElement>(null);

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Track which section is in view and update activeTab
  useEffect(() => {
    const sections: { ref: React.RefObject<HTMLElement>; name: string }[] = [
      { ref: profileRef, name: 'Profile Info' },
      { ref: accessRef, name: 'Access Rights' },
      { ref: activityRef, name: 'Activity Log' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sections.find(s => s.ref.current === entry.target);
            if (found) setActiveTab(found.name);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(s => { if (s.ref.current) observer.observe(s.ref.current); });
    return () => { sections.forEach(s => { if (s.ref.current) observer.unobserve(s.ref.current); }); };
  }, []);

  // Mock Data
  const accessRightsData = [
    { module: 'Scheme Management', access: 'Create / Edit / Approve', reports: 'View / Download' },
    { module: 'Fund Disbursement', access: 'Approve / Audit', reports: 'View / Download' },
    { module: 'Grievance Module', access: 'View / Respond', reports: 'View Only' },
    { module: 'Direction Compliance', access: 'Respond / Upload Documents', reports: 'View Only' },
    { module: 'Annual Report Module', access: 'Generate / Submit', reports: 'View / Download' },
    { module: 'User Management', access: 'View Only', reports: 'N/A' },
  ];

  if (loading) {
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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* --- 1. Profile Header --- */}
        <ProfileHeader />

        {/* --- 2. Navigation Tabs --- */}
        <NavigationTabs
          onScrollTo={scrollToSection}
          refs={{ profileRef, accessRef, docsRef, activityRef }}
          activeTab={activeTab}
          onActivate={setActiveTab}
        />

        {/* --- 3. Profile Info Section --- */}
        <section ref={profileRef} className="scroll-mt-24">
          <Card title="Organizational & Personal Details" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              
              {/* Left Column: Organizational Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-sky-700 border-b-2 border-sky-200 pb-2 mb-3">
                  Organizational Info
                </h3>
                <dl>
                  <DetailRow icon={Fingerprint} label="Office Code" value="NSKFDC-UP-002" />
                  <DetailRow icon={MapPin} label="Nodal State / District" value="Uttar Pradesh / Lucknow" />
                  <DetailRow icon={UserCheck} label="Reporting Authority" value="Sanjay Mehra – General Manager" />
                  <DetailRow icon={Building} label="Office Address" value="2nd Floor, NSKFDC Office Complex, Gomti Nagar, Lucknow – 226010" />
                  <DetailRow icon={Mail} label="Office Email" value={<a href="mailto:up.nskfdc@gov.in" className="text-blue-600 hover:underline">up.nskfdc@gov.in</a>} />
                  <DetailRow icon={Phone} label="Office Contact" value="0522-2457896" />
                </dl>
              </div>

              {/* Right Column: Personal Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-sky-700 border-b-2 border-sky-200 pb-2 mb-3">
                  Personal Info
                </h3>
                <dl>
                  <DetailRow icon={Mail} label="Personal Email" value={<a href="mailto:ravi.sharma@nskfdc.in" className="text-blue-600 hover:underline">ravi.sharma@nskfdc.in</a>} />
                  <DetailRow icon={Phone} label="Mobile Number" value="+91 98765 43210" />
                  <DetailRow icon={Phone} label="Alternate Contact" value="+91 91234 56789" />
                  <DetailRow icon={MapPin} label="Communication Address" value="C-12, Sector 9, Lucknow – 226010" />
                  <DetailRow icon={BadgeCheck} label="Digital Signature" value={
                    <span className="flex items-center font-semibold text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Uploaded & Verified
                    </span>
                  } />
                </dl>
              </div>

            </div>
          </Card>
        </section>

        {/* --- 4. Access Rights Section --- */}
        <section ref={accessRef} className="scroll-mt-24">
          <Card title="Access Rights & Privileges" icon={ShieldCheck}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                <thead className="bg-sky-100/70">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 text-left text-sm font-semibold text-sky-800">Module Name</th>
                    <th scope="col" className="px-5 py-3.5 text-left text-sm font-semibold text-sky-800">Access Type</th>
                    <th scope="col" className="px-5 py-3.5 text-left text-sm font-semibold text-sky-800">Reports & Analytics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {accessRightsData.map((row) => (
                    <tr key={row.module} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{row.module}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">{row.access}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">{row.reports}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              <Star className="w-3 h-3 inline-block mr-1" />
              Last Role Update: 14 Oct 2025 • Assigned by: <strong>Admin User</strong>
            </p>
          </Card>
        </section>

        {/* --- 5. Activity Log Section --- */}
        <section ref={activityRef} className="scroll-mt-24">
          <Card title="Activity Log" icon={History}>
            <div className="flow-root">
              <div className="-mb-4">
                <ActivityItem
                  icon={LogIn}
                  title="Login Activity"
                  description="Logged in successfully"
                  time="25 Oct 2025, 9:02 AM"
                />
                <ActivityItem
                  icon={User}
                  title="Profile Update"
                  description="Changed personal email"
                  time="15 Oct 2025, 10:12 AM"
                />
                <ActivityItem
                  icon={ShieldCheck}
                  title="Role Change"
                  description="Access modified by Admin"
                  time="14 Oct 2025, 2:43 PM"
                />
                <ActivityItem
                  icon={FileUp}
                  title="Document Upload"
                  description="Uploaded Office Authorization Letter"
                  time="12 Oct 2025, 5:09 PM"
                />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default NskfdcProfilePage;