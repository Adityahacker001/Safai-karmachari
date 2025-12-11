"use client";

import React, { useState, useMemo, useEffect } from "react";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
import {
  Users,
  UserCheck,
  UserX,
  UserCog,
  Shield,
  Clock,
  PlusCircle,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatCard from "@/components/ui/stat-card";

const colorMap = {
  blue: { border: "border-blue-500", from: "from-sky-100", to: "to-blue-200", text: "text-blue-600" },
  green: { border: "border-green-500", from: "from-teal-50", to: "to-green-200", text: "text-green-600" },
  yellow: { border: "border-yellow-500", from: "from-amber-50", to: "to-yellow-200", text: "text-yellow-600" },
  red: { border: "border-red-500", from: "from-rose-50", to: "to-red-200", text: "text-red-600" },
};

const statusBadgeVariant = {
  Active: "bg-green-100 text-green-800 border-green-200",
  "Pending Approval": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Suspended: "bg-red-100 text-red-800 border-red-200",
};

export default function DistrictUserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Nodal Officer",
    state: "",
    district: "",
  });
  const [addUserSuccess, setAddUserSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const users = [
    { id: "USR-101", name: "Abishek Kumar", role: "Contractor", zone: "North Zone", status: "Active", lastLogin: "2024-01-27" },
    { id: "USR-102", name: "Priya Sharma", role: "Nodal Officer", zone: "South Zone", status: "Active", lastLogin: "2024-01-26" },
    { id: "USR-103", name: "Amit Singh", role: "Supervisor", zone: "East Zone", status: "Pending Approval", lastLogin: "Never" },
    { id: "USR-104", name: "Sunita Devi", role: "Worker", zone: "West Zone", status: "Suspended", lastLogin: "2024-01-20" },
    { id: "USR-105", name: "Anil Kapoor", role: "Nodal Officer", zone: "Central Zone", status: "Active", lastLogin: "2024-01-28" },
    { id: "USR-106", name: "Deepika Mehta", role: "Contractor", zone: "South Zone", status: "Pending Approval", lastLogin: "Never" },
  ];

  const stats = [
    { title: "Total Users", value: 246, icon: Users, color: "blue" },
    { title: "Active Users", value: 198, icon: UserCheck, color: "green" },
    { title: "Pending Approvals", value: 12, icon: Clock, color: "yellow" },
    { title: "Suspended Users", value: 6, icon: UserX, color: "red" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter) &&
      (statusFilter === "All" || user.status === statusFilter)
    );
  }, [searchTerm, roleFilter, statusFilter, users]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  return (
    <div className="min-h-screen space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-sm text-white/90 font-bold mb-2">Administration</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
              User Management
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
              Oversee, manage, and audit all user accounts under district jurisdiction
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all border border-white/30 text-sm sm:text-base md:text-lg font-medium"
              onClick={() => setShowAddUserForm((v) => !v)}
            >
              <PlusCircle className="w-4 w-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
              <span>Add User</span>
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all border border-white/30 text-sm sm:text-base md:text-lg font-medium">
              <Upload className="w-4 w-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
              <span>Import CSV</span>
            </Button>
          </div>
        </div>
      </header>

      {showAddUserForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 p-1 rounded-2xl animate-fadeIn">
            <CardHeader className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-t-2xl p-6 shadow-md">
              <CardTitle className="text-2xl text-white font-extrabold drop-shadow">Add New User</CardTitle>
              <CardDescription className="text-white/90 font-medium">Fill in the details to create a new user account.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form
                className="space-y-6"
                onSubmit={e => {
                  e.preventDefault();
                  setAddUserSuccess(true);
                  setTimeout(() => setAddUserSuccess(false), 2000);
                  setShowAddUserForm(false);
                  setNewUser({ name: "", email: "", password: "", role: "Nodal Officer", state: "", district: "" });
                }}
              >
                <div>
                  <label className="block text-base font-semibold mb-2 text-blue-900">Name</label>
                  <Input
                    required
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter user name"
                    className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold mb-2 text-blue-900">Email</label>
                  <Input
                    required
                    type="email"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                    className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold mb-2 text-blue-900">Password</label>
                  <Input
                    required
                    type="password"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Enter password"
                    className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold mb-2 text-blue-900">Role</label>
                    <Select value={newUser.role} onValueChange={val => setNewUser({ ...newUser, role: val })}>
                      <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nodal Officer">Nodal Officer</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-2 text-blue-900">State</label>
                    <Select value={newUser.state} onValueChange={val => setNewUser({ ...newUser, state: val, district: "" })}>
                      <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none">Select State</SelectItem>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* District selector — disabled until a state is chosen */}
                <div>
                  <label className="block text-base font-semibold mb-2 text-blue-900">District</label>
                  <Select
                    value={newUser.district}
                    onValueChange={(val) => {
                      // Ignore the placeholder sentinel so users can't select it
                      if (val === "__none-district") return;
                      setNewUser({ ...newUser, district: val });
                    }}
                  >
                    <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg">
                      <SelectValue placeholder={newUser.state ? "Select District" : "Select State first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Placeholder/sentinel — always non-empty value for Radix */}
                      <SelectItem value="__none-district">{newUser.state ? "Select District" : "Select State first"}</SelectItem>

                      {/* If no state is selected, show a helpful default list so users can still choose */}
                      {!newUser.state && (
                        <>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Pune">Pune</SelectItem>
                          <SelectItem value="Bengaluru Urban">Bengaluru Urban</SelectItem>
                          <SelectItem value="Lucknow">Lucknow</SelectItem>
                          <SelectItem value="Kanpur">Kanpur</SelectItem>
                          <SelectItem value="Varanasi">Varanasi</SelectItem>
                        </>
                      )}

                      {newUser.state === "Maharashtra" && (
                        <>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Pune">Pune</SelectItem>
                          <SelectItem value="Nagpur">Nagpur</SelectItem>
                        </>
                      )}
                      {newUser.state === "Karnataka" && (
                        <>
                          <SelectItem value="Bengaluru Urban">Bengaluru Urban</SelectItem>
                          <SelectItem value="Mysuru">Mysuru</SelectItem>
                          <SelectItem value="Mangaluru">Mangaluru</SelectItem>
                        </>
                      )}
                      {newUser.state === "Uttar Pradesh" && (
                        <>
                          <SelectItem value="Lucknow">Lucknow</SelectItem>
                          <SelectItem value="Kanpur">Kanpur</SelectItem>
                          <SelectItem value="Varanasi">Varanasi</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {/* Status is managed elsewhere; removed from Add User modal to match design */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" className="px-6 py-2 text-lg" onClick={() => setShowAddUserForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-6 py-2 text-lg shadow-lg">
                      Create User
                    </Button>
                  </div>
                  {addUserSuccess && <div className="text-green-600 font-semibold text-center mt-2">User added successfully!</div>}
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <StatCard
          title="Total Users"
          value={246}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={198}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Pending Approvals"
          value={12}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Suspended Users"
          value={6}
          icon={UserX}
          color="red"
        />
      </div>

      <Card className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <CardContent className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400" />
            <Input
              placeholder="Search by user name..."
              className="pl-10 sm:pl-12 md:pl-14 text-sm sm:text-base font-medium py-3 sm:py-4 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select onValueChange={setRoleFilter} defaultValue="All">
            <SelectTrigger className="text-sm sm:text-base font-medium py-3 sm:py-4 rounded-xl"><SelectValue placeholder="Filter by Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Contractor">Contractor</SelectItem>
              <SelectItem value="Nodal Officer">Nodal Officer</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Worker">Worker</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatusFilter} defaultValue="All">
            <SelectTrigger className="text-sm sm:text-base font-medium py-3 sm:py-4 rounded-xl"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending Approval">Pending Approval</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="relative z-0 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border-b border-gray-200/50 p-4 sm:p-6 md:p-8 rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden relative z-10">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800">User Accounts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400">
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">User ID</TableHead>
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Name</TableHead>
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Role</TableHead>
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Zone</TableHead>
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Status</TableHead>
                  <TableHead className="text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Last Login</TableHead>
                  <TableHead className="text-right text-white font-bold text-xs sm:text-sm px-2 sm:px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <TableRow key={u.id} className="even:bg-blue-50/30 odd:bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors duration-200">
                    <TableCell className="font-mono text-xs sm:text-sm text-gray-600 px-2 sm:px-4 py-3">{u.id}</TableCell>
                    <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 py-3">{u.name}</TableCell>
                    <TableCell className="px-2 sm:px-4 py-3">
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-semibold text-xs">
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 text-xs sm:text-sm px-2 sm:px-4 py-3">{u.zone}</TableCell>
                    <TableCell className="px-2 sm:px-4 py-3">
                      <Badge className={statusBadgeVariant[u.status as keyof typeof statusBadgeVariant] + " text-xs"}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 text-xs sm:text-sm px-2 sm:px-4 py-3">{u.lastLogin}</TableCell>
                    <TableCell className="text-right px-2 sm:px-4 py-3">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          <UserCog className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" /> 
                          <span className="hidden sm:inline">Manage</span>
                        </Button>
                        {u.status === "Pending Approval" && (
                          <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 text-xs px-2 py-1">
                            <span className="hidden sm:inline">Approve</span>
                            <span className="sm:hidden">✓</span>
                          </Button>
                        )}
                        {u.status === "Active" && (
                          <Button size="sm" variant="destructive" className="bg-red-600 text-white hover:bg-red-700 text-xs px-2 py-1">
                            <span className="hidden sm:inline">Suspend</span>
                            <span className="sm:hidden">✕</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-gray-500 text-sm">
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
