"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Edit, Trash2, CheckCircle, Clock, XCircle, Save, X, User, Calendar, CreditCard, Briefcase, GraduationCap, Building2 } from "lucide-react";

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
  // Optional extended profile fields
  fatherSpouseName?: string;
  dob?: string;
  address?: string;
  phone?: string;
  pan?: string;
  voterId?: string;
  rationCard?: string;
  maritalStatus?: string;
  dependents?: number;
  nomineeName?: string;
  nomineeRelation?: string;
  bloodGroup?: string;
  identificationMark?: string;
  profilePhotoName?: string;
}

interface NewMemberForm extends Partial<SHGMember> {
  profilePhoto?: File | null;
}

export default function MyShgMembersPage() {
  const [members, setMembers] = useState<SHGMember[]>([
    { id: "M001", name: "Sunita Devi", age: 35, gender: "Female", caste: "SC", aadhaar: "XXXX-XXXX-1234", role: "President", trainingCompleted: true, bankLinked: true, joinedDate: "15 Jan 2020" },
    { id: "M002", name: "Kavita Sharma", age: 32, gender: "Female", caste: "SC", aadhaar: "XXXX-XXXX-5678", role: "Secretary", trainingCompleted: true, bankLinked: true, joinedDate: "15 Jan 2020" },
    { id: "M003", name: "Meena Kumari", age: 28, gender: "Female", caste: "SC", aadhaar: "XXXX-XXXX-9012", role: "Treasurer", trainingCompleted: true, bankLinked: true, joinedDate: "20 Feb 2020" },
    { id: "M004", name: "Rekha Devi", age: 40, gender: "Female", caste: "SC", aadhaar: "XXXX-XXXX-3456", role: "Member", trainingCompleted: false, bankLinked: true, joinedDate: "10 Mar 2020" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState<NewMemberForm>({
    name: "",
    fatherSpouseName: "",
    dob: "",
    age: 18,
    gender: "Female",
    caste: "SC",
    aadhaar: "",
    role: "Member",
    address: "",
    phone: "",
    pan: "",
    voterId: "",
    rationCard: "",
    maritalStatus: "",
    dependents: 0,
    nomineeName: "",
    nomineeRelation: "",
    bloodGroup: "",
    identificationMark: "",
    profilePhoto: null,
    trainingCompleted: false,
    bankLinked: false,
  });

  const addMember = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveMember = () => {
    if (!newMember.name || !newMember.aadhaar) {
      alert("Please fill in all required fields");
      return;
    }

    const id = `M${String(members.length + 1).padStart(3, "0")}`;
    const memberToAdd: SHGMember = {
      id,
      name: newMember.name || "",
      age: newMember.age || 18,
      gender: newMember.gender || "Female",
      caste: newMember.caste || "SC",
      aadhaar: newMember.aadhaar || "",
      role: newMember.role || "Member",
      trainingCompleted: newMember.trainingCompleted || false,
      bankLinked: newMember.bankLinked || false,
      joinedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    
    setMembers((m) => [memberToAdd, ...m]);
    setIsAddModalOpen(false);
    
    // Reset form
    setNewMember({
      name: "",
      age: 18,
      gender: "Female",
      caste: "SC",
      aadhaar: "",
      role: "Member",
      trainingCompleted: false,
      bankLinked: false,
    });
  };

  const editMember = (id: string) => {
    // placeholder: open edit UI
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, name: x.name + " (edited)" } : x)));
  };

  const deleteMember = (id: string) => {
    if (!confirm("Delete member? This action cannot be undone.")) return;
    setMembers((m) => m.filter((x) => x.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Top header styled like attachment: icon + title on left, Add Member on right */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-violet-100 text-violet-700 rounded-md p-2 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">SHG Members <span className="text-sm text-gray-500">({members.length})</span></h1>
            <p className="text-sm text-gray-600">Manage group members, training and bank linkage.</p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={addMember}
            aria-label="Add Member"
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center"
            size="sm"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <Card className="shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead className="text-gray-600 border-b bg-gray-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3 text-center">Age</th>
                <th className="p-3 text-center">Gender</th>
                <th className="p-3 text-center">Caste</th>
                <th className="p-3">Aadhaar</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Training</th>
                <th className="p-3 text-center">Bank</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{member.name}</td>
                  <td className="p-3 text-center">{member.age}</td>
                  <td className="p-3 text-center">{member.gender}</td>
                  <td className="p-3 text-center"><Badge variant="secondary">{member.caste}</Badge></td>
                  <td className="p-3">{member.aadhaar}</td>
                  <td className="p-3">{member.role}</td>
                  <td className="p-3 text-center">
                    {member.trainingCompleted ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <Clock className="w-5 h-5 text-orange-500 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {member.bankLinked ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => editMember(member.id)} className="text-blue-600 border-blue-300 hover:bg-blue-50"><Edit className="w-3 h-3" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteMember(member.id)} className="text-red-600 border-red-300 hover:bg-red-50"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Member Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-violet-600" />
              Add New Member
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new member to your SHG
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-violet-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter member name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-violet-600" />
                    Age <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    min="18"
                    max="100"
                    value={newMember.age}
                    onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) || 18 })}
                    className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select value={newMember.gender} onValueChange={(val) => setNewMember({ ...newMember, gender: val })}>
                    <SelectTrigger className="border-slate-300 focus:border-violet-500 focus:ring-violet-500">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caste" className="text-sm font-medium text-slate-700">
                    Caste Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={newMember.caste} onValueChange={(val) => setNewMember({ ...newMember, caste: val })}>
                    <SelectTrigger className="border-slate-300 focus:border-violet-500 focus:ring-violet-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                      <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                      <SelectItem value="OBC">OBC (Other Backward Class)</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Identity & Role */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-violet-600" />
                Identity & Role
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="text-sm font-medium text-slate-700">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="aadhaar"
                    placeholder="XXXX-XXXX-1234"
                    value={newMember.aadhaar}
                    onChange={(e) => setNewMember({ ...newMember, aadhaar: e.target.value })}
                    className="border-slate-300 focus:border-violet-500 focus:ring-violet-500"
                    maxLength={14}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-violet-600" />
                    Role
                  </Label>
                  <Select value={newMember.role} onValueChange={(val) => setNewMember({ ...newMember, role: val })}>
                    <SelectTrigger className="border-slate-300 focus:border-violet-500 focus:ring-violet-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Treasurer">Treasurer</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Status Toggles */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-violet-600" />
                Status
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-violet-600" />
                    <Label htmlFor="training" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Training Completed
                    </Label>
                  </div>
                  <input
                    id="training"
                    type="checkbox"
                    checked={newMember.trainingCompleted}
                    onChange={(e) => setNewMember({ ...newMember, trainingCompleted: e.target.checked })}
                    className="w-4 h-4 text-violet-600 border-slate-300 rounded focus:ring-violet-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-violet-600" />
                    <Label htmlFor="bank" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Bank Account Linked
                    </Label>
                  </div>
                  <input
                    id="bank"
                    type="checkbox"
                    checked={newMember.bankLinked}
                    onChange={(e) => setNewMember({ ...newMember, bankLinked: e.target.checked })}
                    className="w-4 h-4 text-violet-600 border-slate-300 rounded focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 border-slate-300 hover:bg-slate-100"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSaveMember}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Single-page export above (MyShgMembersPage). Removed stray duplicate default export.