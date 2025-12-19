"use client";
import React from "react";
import DataTable from "@/components/ui/data-table";
import StatCard from "@/components/ui/stat-card";
import { Users, Plus, CheckCircle, XCircle, Clock, Eye, X } from "lucide-react";

// Copied from previous location: app/state/reports/User-Management/page.tsx
const UserManagement = () => {
  const userData = [
    { id: "USR001", name: "Abishek Kumar", role: "District Officer", district: "Mumbai", status: "Active", lastLogin: "2024-01-20 10:30 AM", email: "abishek.kumar@gov.in" },
    { id: "USR002", name: "Priya Sharma", role: "Nodal Officer", district: "Pune", status: "Active", lastLogin: "2024-01-20 09:15 AM", email: "priya.sharma@gov.in" },
    { id: "USR003", name: "Amit Patel", role: "Contractor", district: "Nagpur", status: "Pending", lastLogin: "Never", email: "amit.patel@contractor.com" },
    { id: "USR004", name: "Sunita Desai", role: "Nodal Officer", district: "Nashik", status: "Active", lastLogin: "2024-01-19 04:45 PM", email: "sunita.desai@gov.in" },
    { id: "USR005", name: "Mohammed Ali", role: "District Officer", district: "Aurangabad", status: "Inactive", lastLogin: "2024-01-15 11:20 AM", email: "mohammed.ali@gov.in" },
    { id: "USR006", name: "Kavita Singh", role: "Contractor", district: "Kolhapur", status: "Active", lastLogin: "2024-01-20 08:30 AM", email: "kavita.singh@contractor.com" },
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      "District Officer": "bg-blue-100 text-blue-800",
      "Nodal Officer": "bg-green-100 text-green-800",
      Contractor: "bg-purple-100 text-purple-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Modal + form state (declare hooks before any early returns)
  const [showModal, setShowModal] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("District Officer");
  const [stateSel, setStateSel] = React.useState("");
  const [districtSel, setDistrictSel] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);

  const resetForm = () => { setFullName(""); setEmail(""); setPassword(""); setRole("District Officer"); setStateSel(""); setDistrictSel(""); };

  const handleCreateUser = (e?: React.FormEvent) => {
    e?.preventDefault();
    // placeholder: in future submit to API
    console.log({ fullName, email, role, state: stateSel, district: districtSel });
    setShowModal(false);
    resetForm();
  };

  const IntegratedLoader: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
        .loader { --c: no-repeat linear-gradient(#4f46e5 0 0); background: var(--c),var(--c),var(--c),var(--c),var(--c),var(--c),var(--c),var(--c),var(--c); background-size: 16px 16px; animation: l32-1 1s infinite, l32-2 1s infinite; }
        @keyframes l32-1 { 0%,100% {width:45px;height:45px} 35%,65% {width:65px;height:65px} }
        @keyframes l32-2 { 0%,40% {background-position: 0 0,0 50%,0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,50% 50%} 60%,100%{background-position:0 50%,0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,50% 50%} }
      `}</style>
      <div className="loader"></div>
    </div>
  );

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  if (loading) return <IntegratedLoader />;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Inactive": return <XCircle className="w-4 h-4 text-red-600" />;
      case "Pending": return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const columns = [
    { key: "id", header: "User ID", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true, render: (value: string) => (<span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(value)}`}>{value}</span>) },
    { key: "district", header: "District", sortable: true },
    { key: "status", header: "Status", render: (value: string) => (<div className="flex items-center space-x-2">{getStatusIcon(value)}<span className={`text-sm font-medium ${ value === "Active" ? "text-green-600" : value === "Inactive" ? "text-red-600" : "text-yellow-600" }`}>{value}</span></div>) },
    { key: "lastLogin", header: "Last Login", sortable: true },
    { key: "action", header: "Actions", render: (_value: any, row: any) => (
      <div className="flex space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg" onClick={() => setSelectedUser(row)}><Eye className="w-3 h-3"/><span>View</span></button>
        <button className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg" onClick={() => alert(`Editing user: ${row.name}`)}><span>Edit</span></button>
      </div>
    ) },
  ];

  const actionButton = (
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white border border-white/20 hover:bg-white/30 rounded-lg"
      onClick={() => setShowModal(true)}
    >
      <Plus className="w-4 h-4" />
      <span>Add User</span>
    </button>
  );

  return (
    <div className="space-y-6 min-h-screen w-full p-6 md:p-10">
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">User Management</h1>
            <p className="text-sm text-white/90">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
            <div className="hidden md:flex items-start">
              {actionButton}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl mx-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between bg-gradient-to-r from-blue-400 to-violet-500 p-5">
                <div>
                  <h2 className="text-xl font-bold text-white">Add New User</h2>
                  <p className="text-sm text-white/90">Fill in the details to create a new user account.</p>
                </div>
                <button className="text-white/90 p-1 rounded-full hover:bg-white/10" onClick={() => setShowModal(false)} aria-label="Close modal">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="p-6 bg-white">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g., Anjali Verma" className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300" />
                      {/* simple validation message shown only when invalid */}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Role</label>
                      <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300">
                        <option>District Officer</option>
                        <option>Nodal Officer</option>
                        <option>Organizational Nodal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <select value={stateSel} onChange={(e) => setStateSel(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300">
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Gujarat">Gujarat</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">District</label>
                      {/** District options: show state-specific list when stateSel is chosen, otherwise show a default popular list with a disabled header */}
                      <select value={districtSel} onChange={(e) => setDistrictSel(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-300">
                        <option value="" disabled>{stateSel ? "Select District" : "Select State first"}</option>
                        {
                          (() => {
                            const districtsByState: Record<string, string[]> = {
                              "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
                              "Karnataka": ["Bengaluru Urban", "Mysuru", "Mangalore"],
                              "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
                              "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
                            };
                            const popular = ["Mumbai", "Pune", "Bengaluru Urban", "Lucknow", "Kanpur", "Varanasi"];
                            const list = stateSel && districtsByState[stateSel] ? districtsByState[stateSel] : popular;
                            return list.map((d) => (<option key={d} value={d}>{d}</option>));
                          })()
                        }
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-4">
                    <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 rounded-md border border-gray-200 text-gray-700">Cancel</button>
                    <button type="submit" className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400 text-white"> <Plus className="w-4 h-4"/> <span>Create User</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={userData.length} icon={Users} color="indigo" />
        <StatCard title="Active Users" value={userData.filter((user) => user.status === "Active").length} icon={CheckCircle} color="emerald" />
        <StatCard title="Pending Approval" value={userData.filter((user) => user.status === "Pending").length} icon={Clock} color="amber" />
        <StatCard title="Inactive Users" value={userData.filter((user) => user.status === "Inactive").length} icon={XCircle} color="red" />
      </div>
      <div className="excel-table">
        <DataTable title="User Management" columns={columns} data={userData} tableClassName="excel-table" />
      </div>
      {/* Centered modal details for selected user */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedUser(null)} />
          <div className="relative w-full max-w-2xl mx-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between bg-gradient-to-r from-indigo-600 to-violet-500 p-5">
                <div>
                  <h2 className="text-xl font-bold text-white">User Details</h2>
                  <p className="text-sm text-white/90">{selectedUser.id}</p>
                </div>
                <button className="text-white/90 p-1 rounded-full hover:bg-white/10" onClick={() => setSelectedUser(null)} aria-label="Close details">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-500">Name</label>
                    <div className="mt-1 text-sm font-medium text-slate-800">{selectedUser.name}</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Email</label>
                    <div className="mt-1 text-sm text-slate-800">{selectedUser.email}</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Role</label>
                    <div className="mt-1 text-sm text-slate-800">{selectedUser.role}</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">District</label>
                    <div className="mt-1 text-sm text-slate-800">{selectedUser.district}</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Status</label>
                    <div className="mt-1 text-sm text-slate-800">{selectedUser.status}</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Last Login</label>
                    <div className="mt-1 text-sm text-slate-800">{selectedUser.lastLogin}</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setSelectedUser(null)} className="px-4 py-2 rounded-md border border-gray-200 text-gray-700">Close</button>
                  <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">Reset Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
