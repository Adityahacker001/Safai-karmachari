"use client";

import React, { useState, useMemo } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Helper for dynamic Tailwind class generation ---
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
  // --- STATE MANAGEMENT for Dynamic Functionality ---
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "Contractor",
    zone: "North Zone",
    status: "Active"
  });
  const [addUserSuccess, setAddUserSuccess] = useState(false);

  // Mock Users
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

  // --- FILTERING LOGIC ---
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter) &&
      (statusFilter === "All" || user.status === statusFilter)
    );
  }, [searchTerm, roleFilter, statusFilter, users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 p-4 md:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            District User Management
          </h1>
          <p className="text-gray-600 mt-1">Oversee, manage, and audit all user accounts under district jurisdiction.</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0 flex-col md:flex-row">
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transform transition-transform duration-300 hover:scale-105"
            onClick={() => setShowAddUserForm((v) => !v)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <Button variant="outline" className="bg-white shadow-md transform transition-transform duration-300 hover:scale-105">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
        </div>

        {/* Add User Form */}
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
                    setNewUser({ name: "", role: "Contractor", zone: "North Zone", status: "Active" });
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold mb-2 text-blue-900">Role</label>
                      <Select value={newUser.role} onValueChange={val => setNewUser({ ...newUser, role: val })}>
                        <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"><SelectValue placeholder="Select role" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Contractor">Contractor</SelectItem>
                          <SelectItem value="Nodal Officer">Nodal Officer</SelectItem>
                          <SelectItem value="Supervisor">Supervisor</SelectItem>
                          <SelectItem value="Worker">Worker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-base font-semibold mb-2 text-blue-900">Zone</label>
                      <Select value={newUser.zone} onValueChange={val => setNewUser({ ...newUser, zone: val })}>
                        <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"><SelectValue placeholder="Select zone" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North Zone">North Zone</SelectItem>
                          <SelectItem value="South Zone">South Zone</SelectItem>
                          <SelectItem value="East Zone">East Zone</SelectItem>
                          <SelectItem value="West Zone">West Zone</SelectItem>
                          <SelectItem value="Central Zone">Central Zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-2 text-blue-900">Status</label>
                    <Select value={newUser.status} onValueChange={val => setNewUser({ ...newUser, status: val })}>
                      <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 text-lg"><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const colors = colorMap[s.color as keyof typeof colorMap];
          return (
            <Card
              key={idx}
              className={`rounded-xl shadow-lg border-l-4 ${colors.border} bg-gradient-to-br ${colors.from} ${colors.to} transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">{s.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                </div>
                <s.icon className={`w-10 h-10 ${colors.text}`} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters Card */}
      <Card className="shadow-lg border rounded-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by user name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select onValueChange={setRoleFilter} defaultValue="All">
            <SelectTrigger><SelectValue placeholder="Filter by Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Contractor">Contractor</SelectItem>
              <SelectItem value="Nodal Officer">Nodal Officer</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Worker">Worker</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatusFilter} defaultValue="All">
            <SelectTrigger><SelectValue placeholder="Filter by Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending Approval">Pending Approval</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* --- MODIFIED USER TABLE --- */}
      <Card className="shadow-2xl border-t-4 border-blue-600 rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-800">User Accounts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            {/* 🎨 New Excel-style Header with blue-cyan gradient and white text */}
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400">
                <TableHead className="text-white font-bold">User ID</TableHead>
                <TableHead className="text-white font-bold">Name</TableHead>
                <TableHead className="text-white font-bold">Role</TableHead>
                <TableHead className="text-white font-bold">Zone</TableHead>
                <TableHead className="text-white font-bold">Status</TableHead>
                <TableHead className="text-white font-bold">Last Login</TableHead>
                <TableHead className="text-right text-white font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                // 🎨 New Zebra-striped Rows and Grid Lines
                filteredUsers.map((u) => (
                  <TableRow key={u.id} className="even:bg-slate-50 odd:bg-white hover:bg-sky-100/70 transition-colors duration-200">
                    <TableCell className="font-mono text-xs text-gray-600 border-r">{u.id}</TableCell>
                    <TableCell className="font-medium border-r">{u.name}</TableCell>
                    <TableCell className="border-r">
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-semibold">
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 border-r">{u.zone}</TableCell>
                    <TableCell className="border-r bg-inherit hover:bg-inherit">
                      <Badge className={statusBadgeVariant[u.status as keyof typeof statusBadgeVariant]}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 border-r">{u.lastLogin}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" className="transform transition-transform duration-200 hover:scale-105">
                        <UserCog className="w-4 h-4 mr-1" /> Manage
                      </Button>
                      {u.status === "Pending Approval" && (
                        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 transform transition-transform duration-200 hover:scale-105">
                          Approve
                        </Button>
                      )}
                      {u.status === "Active" && (
                        <Button size="sm" variant="destructive" className="bg-red-600 text-white hover:bg-red-700 transform transition-transform duration-200 hover:scale-105">
                          Suspend
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}