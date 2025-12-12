"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DataTable from "@/components/ui/data-table";
import StatCard from "@/components/ui/stat-card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const DEFAULT_USERS = [
  {
    userId: "USR-001",
    name: "Abishek Kumar",
    role: "Contractor",
    company: "ABC Cleaning Services",
    status: "Active",
    lastLogin: "2024-01-27",
    joinDate: "2023-06-15",
  },
  {
    userId: "USR-003",
    name: "Amit Singh",
    role: "Contractor",
    company: "Metro Clean Solutions",
    status: "Pending Approval",
    lastLogin: "Never",
    joinDate: "2024-01-25",
  },
  {
    userId: "USR-005",
    name: "Mohd. Ali",
    role: "Contractor",
    company: "Green Earth Services",
    status: "Suspended",
    lastLogin: "2024-01-20",
    joinDate: "2023-04-18",
  },
];

export default function UserManagementReportPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [users, setUsers] = useState(DEFAULT_USERS);

  const userColumns = [
    { key: "userId", header: "User ID" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "company", header: "Company" },
    { key: "status", header: "Status" },
    { key: "lastLogin", header: "Last Login" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              User Management
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Manage contractor and supervisor accounts
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Add New Worker</span>
                  <span className="sm:hidden">Add Worker</span>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-t-xl p-4">
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription className="text-black">
                      Fill in the details to create a new user account.
                    </DialogDescription>
                  </DialogHeader>

                <AddWorkerForm
                  id="createUserForm"
                  onSubmit={(newUser) => {
                    // stub submit handler: add to local list, show toast
                    setUsers((prev) => [newUser, ...prev]);
                    toast({ title: "User created", description: "New user has been created successfully." });
                    // close dialog
                    setIsDialogOpen(false);
                  }}
                />

                <DialogFooter className="mt-4 flex items-center justify-end space-x-3">
                  <DialogClose asChild>
                    <button className="px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-100">Cancel</button>
                  </DialogClose>

                  <button form="createUserForm" type="submit" className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                    <UserPlus className="w-4 h-4" />
                    <span>Create User</span>
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Pending Approval"
          value={users.filter((u) => u.status === "Pending Approval").length}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Suspended Users"
          value={users.filter((u) => u.status === "Suspended").length}
          icon={UserX}
          color="red"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">User List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-400">
              <tr>
                {userColumns.map((col, idx) => (
                  <th
                    key={idx}
                    className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, rowIdx) => (
                <tr
                  key={user.userId}
                  className={`$${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 transition`}
                >
                  {userColumns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {(user as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Add Worker Form Component ---
function AddWorkerForm({ id, onSubmit }: { id?: string; onSubmit: (u: any) => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Contractor");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Please provide Full Name, Email and Password");
      return;
    }
    // validate email format
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 700));

    const newUser = {
      userId: `USR-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: fullName,
      email,
      role,
      state: stateName || "-",
      district: district || "-",
      status: "Active",
      lastLogin: "Never",
      joinDate: new Date().toISOString().slice(0, 10),
    };

    onSubmit(newUser);
    setSubmitting(false);
    // reset
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("Contractor");
    setStateName("");
    setDistrict("");
  };

  return (
    <form id={id ?? "createUserForm"} onSubmit={handleSubmit} className="space-y-4 mt-3">
      <div>
        <label className="text-sm font-medium text-slate-700">Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Anjali Verma" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);
              const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (v === "" || re.test(v)) setEmailError("");
              else setEmailError("Enter a valid email address");
            }}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., sp99@gmail.com"
          />
          {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Contractor</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">State</label>
          <select value={stateName} onChange={(e) => setStateName(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select State</option>
            <option>Uttar Pradesh</option>
            <option>Bihar</option>
            <option>Maharashtra</option>
            <option>Kerala</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">District</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select District</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Bengaluru Urban</option>
            <option>Lucknow</option>
            <option>Kanpur</option>
            <option>Varanasi</option>
            <option>Ahmedabad</option>
            <option>Surat</option>
            <option>Vadodara</option>
            <option>Thane</option>
            <option>Nagpur</option>
            <option>Nashik</option>
          </select>
        </div>
      </div>

      <input type="hidden" name="_dummy" />
    </form>
  );
}
