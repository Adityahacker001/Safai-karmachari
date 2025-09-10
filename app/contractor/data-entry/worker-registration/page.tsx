'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, User, Briefcase, Shield } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function WorkerRegistrationPage() {
  return (
    // Main container with a vibrant, modern background gradient
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 space-y-10">
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">Worker Registration</h2>
        <p className="text-gray-600 mt-3 text-xl">Enter the new worker's details to add them to the system roster.</p>
      </div>

      <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
        <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
          <CardTitle className="flex items-center space-x-4 text-3xl md:text-4xl font-bold">
            <UserPlus className="h-9 w-9 text-white" />
            <span>New Safai Karmachari Registration Form</span>
          </CardTitle>
          <CardDescription className="text-indigo-100 mt-3 text-lg">
            This will create their digital ID and enroll them in the monitoring and welfare ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 md:p-10">
          <form className="space-y-12">
            {/* Section 1: Personal & Identity Information */}
            <div className="p-8 border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-lg">
              <div className="flex items-center space-x-4 mb-8 pb-5 border-b border-blue-200">
                <User className="h-7 w-7 text-blue-700"/>
                <h3 className="text-2xl font-bold text-gray-800">Personal & Identity Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-semibold mb-2 block">Full Name</Label>
                  <Input id="fullName" placeholder="As per Aadhaar card" required className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="aadhaar" className="text-gray-700 font-semibold mb-2 block">Aadhaar Number</Label>
                  <Input id="aadhaar" placeholder="XXXX-XXXX-XXXX" required className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="dob" className="text-gray-700 font-semibold mb-2 block">Date of Birth</Label>
                  <Input id="dob" type="date" required className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-gray-700 font-semibold mb-2 block">Gender</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5"><SelectValue placeholder="Select gender..." /></SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="profilePhoto" className="text-gray-700 font-semibold mb-2 block">Upload Profile Photo</Label>
                  <Input id="profilePhoto" type="file" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl file:text-blue-700 file:bg-blue-100 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-3 hover:file:bg-blue-200 cursor-pointer" />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <Label htmlFor="address" className="text-gray-700 font-semibold mb-2 block">Residential Address</Label>
                  <Textarea id="address" placeholder="Enter full current address" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl min-h-[100px] px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="emergencyContactName" className="text-gray-700 font-semibold mb-2 block">Emergency Contact Name</Label>
                  <Input id="emergencyContactName" placeholder="e.g., Spouse, Parent" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="emergencyContactPhone" className="text-gray-700 font-semibold mb-2 block">Emergency Contact Phone</Label>
                  <Input id="emergencyContactPhone" placeholder="+91 XXXXX XXXXX" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
              </div>
            </div>

            {/* Section 2: Employment & Financial Details */}
            <div className="p-8 border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-purple-50 shadow-lg">
              <div className="flex items-center space-x-4 mb-8 pb-5 border-b border-purple-200">
                <Briefcase className="h-7 w-7 text-purple-700"/>
                <h3 className="text-2xl font-bold text-gray-800">Employment & Financial Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
                <div>
                  <Label htmlFor="dateOfJoining" className="text-gray-700 font-semibold mb-2 block">Date of Joining</Label>
                  <Input id="dateOfJoining" type="date" required className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="employmentType" className="text-gray-700 font-semibold mb-2 block">Employment Type</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5"><SelectValue placeholder="Select type..." /></SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Contractual">Contractual</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignedZone" className="text-gray-700 font-semibold mb-2 block">Assigned Zone</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5"><SelectValue placeholder="Select zone..." /></SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      <SelectItem value="Zone 1">Zone 1</SelectItem>
                      <SelectItem value="Zone 2">Zone 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="primaryRole" className="text-gray-700 font-semibold mb-2 block">Primary Role / Work Type</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5"><SelectValue placeholder="Select role..." /></SelectTrigger>
                    <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                      <SelectItem value="Sewer Cleaning">Sewer Cleaning</SelectItem>
                      <SelectItem value="Septic Tank Cleaning">Septic Tank Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="monthlySalary" className="text-gray-700 font-semibold mb-2 block">Monthly Salary (₹)</Label>
                  <Input id="monthlySalary" type="number" placeholder="e.g., 15000" className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="bankAccount" className="text-gray-700 font-semibold mb-2 block">Bank Account Number</Label>
                  <Input id="bankAccount" placeholder="For salary disbursement" className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <Label htmlFor="bankIfsc" className="text-gray-700 font-semibold mb-2 block">Bank IFSC Code</Label>
                  <Input id="bankIfsc" placeholder="e.g., SBIN0001234" className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                </div>
              </div>
            </div>

            {/* SMS Notification */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center">
              <p className="text-blue-800 font-medium">
                An SMS with login details will be sent to the registered phone number once the worker is registered.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-5 sm:space-y-0 sm:space-x-6 pt-10 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 px-8 py-3.5 rounded-xl text-lg transition-all duration-300 font-medium">Reset Form</Button>
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-xl py-3.5 px-10 rounded-xl shadow-xl transition-all duration-400 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                Register Worker
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}