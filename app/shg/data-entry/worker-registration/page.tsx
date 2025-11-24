'use client';

import IntegratedLoader from '@/components/layout/IntegratedLoader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Briefcase, Shield } from "lucide-react";
import React from "react";

export default function ShgMemberRegistrationPage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative z-50 rounded-3xl sm:rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-3xl sm:rounded-3xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-3xl sm:rounded-3xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            SHG Member Registration
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Add a new member to the Self Help Group for welfare, monitoring and project allocation.
          </p>
        </div>
      </header>

      <Card className="relative z-0 w-full bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
    <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-green-600/90 to-blue-600/90 text-white rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden relative z-10 mb-4">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold">
            <span className="break-words">New SHG Member Registration Form</span>
          </CardTitle>
          <CardDescription className="text-white/90 mt-2 text-sm sm:text-base">
            This will create their digital member ID and enroll them into the SHG-based welfare ecosystem.
          </CardDescription>
        </CardHeader>

        {/* 🔥 THE FULL FORM STARTS HERE — NOTHING REMOVED */}
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6 sm:space-y-8">

            {/* Section 1: Personal & Identity Information */}
            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Personal & Identity Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="As per Aadhaar card" required />
                </div>
                <div>
                  <Label htmlFor="fatherSpouseName">Father's/Spouse's Name</Label>
                  <Input id="fatherSpouseName" placeholder="Enter name" required />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select gender..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <Input id="address" placeholder="Enter full current address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input id="aadhaar" placeholder="XXXX-XXXX-XXXX" required />
                </div>
                <div>
                  <Label htmlFor="pan">PAN Card Number</Label>
                  <Input id="pan" placeholder="ABCDE1234F" />
                </div>
                <div>
                  <Label htmlFor="voterId">Voter ID</Label>
                  <Input id="voterId" placeholder="Enter Voter ID" />
                </div>
                <div>
                  <Label htmlFor="rationCard">Ration Card Number</Label>
                  <Input id="rationCard" placeholder="Enter Ration Card No." />
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Unmarried">Unmarried</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dependents">No. of Dependents</Label>
                  <Input id="dependents" type="number" placeholder="e.g., 4" />
                </div>
                <div>
                  <Label htmlFor="nomineeName">Nominee Name</Label>
                  <Input id="nomineeName" placeholder="For insurance/PF" />
                </div>
                <div>
                  <Label htmlFor="nomineeRelation">Nominee Relationship</Label>
                  <Input id="nomineeRelation" placeholder="e.g., Spouse, Son" />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select group..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="casteCategory">Caste Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="identificationMark">Visible Identification Mark</Label>
                  <Input id="identificationMark" placeholder="e.g., a mole on the right hand" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="profilePhoto">Upload Profile Photo</Label>
                  <Input id="profilePhoto" type="file" />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:border-purple-300 transition-all">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                <Shield className="h-5 w-5 text-red-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Emergency Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input id="emergencyContactName" placeholder="e.g., Abhishek Kumar" />
                </div>
                <div>
                  <Label htmlFor="emergencyContactRelation">Relationship</Label>
                  <Input id="emergencyContactRelation" placeholder="e.g., Spouse, Parent" />
                </div>
                <div>
                  <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                  <Input id="emergencyContactPhone" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            </div>

            {/* Employment & Financial Details */}
            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:border-green-300 transition-all">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-200">
                <Briefcase className="h-6 w-6 text-purple-700" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Employment & Financial Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="dateOfJoining">Date of Joining</Label>
                  <Input id="dateOfJoining" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Contractual">Contractual</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignedZone">Assigned Zone</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select zone..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zone 1">Zone 1</SelectItem>
                      <SelectItem value="Zone 2">Zone 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="primaryRole">Primary Role / Work Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select role..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sewer Cleaning">Sewer Cleaning</SelectItem>
                      <SelectItem value="Septic Tank Cleaning">Septic Tank Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="monthlySalary">Monthly Salary (₹)</Label>
                  <Input id="monthlySalary" type="number" placeholder="e.g., 15000" />
                </div>
                <div>
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input id="bankAccount" placeholder="For salary disbursement" />
                </div>
                <div>
                  <Label htmlFor="bankIfsc">Bank IFSC Code</Label>
                  <Input id="bankIfsc" placeholder="e.g., SBIN0001234" />
                </div>
                <div>
                  <Label htmlFor="esiNumber">ESI Number</Label>
                  <Input id="esiNumber" placeholder="Enter ESI Number" />
                </div>
                <div>
                  <Label htmlFor="pfUanNumber">PF / UAN Number</Label>
                  <Input id="pfUanNumber" placeholder="Enter UAN Number" />
                </div>
              </div>
            </div>

            {/* SMS Notification */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-100 border border-yellow-200 rounded-xl flex items-start space-x-3">
              <Checkbox id="smsNotify" />
              <label htmlFor="smsNotify" className="text-yellow-900 font-medium text-sm">
                An SMS with login details will be sent to the registered phone number once the member is registered.
              </label>
            </div>

            {/* Declaration */}
            <div className="p-3 sm:p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-start space-x-3">
              <Checkbox id="declaration" required />
              <div>
                <Label htmlFor="declaration" className="font-medium">Declaration & Consent</Label>
                <p className="text-sm text-gray-600">
                  I hereby declare that all information provided is true and correct and consent to the use of this data for official welfare purposes.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 px-6 py-2.5 rounded-xl">
                Reset Form
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-lg px-10 py-3 rounded-xl shadow-xl hover:scale-105 transition-all">
                Register SHG Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
