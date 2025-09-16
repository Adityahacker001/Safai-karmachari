'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Shield, CheckCircle, CalendarDays, UserRound, BriefcaseBusiness } from "lucide-react"; // Added more specific icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AttendancePpePage() {
    return (
        // Main container with a soft, inviting background gradient
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 space-y-10">
            <div>
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Attendance & PPE Log</h2>
                <p className="text-gray-600 mt-3 text-xl">Log daily worker attendance and record the distribution of safety equipment.</p>
            </div>

            <Tabs defaultValue="attendance" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <TabsTrigger
                        value="attendance"
                        className="flex items-center justify-center space-x-2 text-lg font-semibold text-white data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out"
                    >
                        <Clock className="h-5 w-5" />
                        <span>Daily Attendance Log</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="ppe"
                        className="flex items-center justify-center space-x-2 text-lg font-semibold text-white data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md data-[state=active]:rounded-lg transition-all duration-300 ease-in-out"
                    >
                        <Shield className="h-5 w-5" />
                        <span>Log PPE Distribution</span>
                    </TabsTrigger>
                </TabsList>

                {/* Attendance Log Tab Content */}
                <TabsContent value="attendance" className="mt-8">
                    <Card className="bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
                            <CardTitle className="flex items-center space-x-3 text-2xl md:text-3xl font-bold">
                                <CalendarDays className="h-7 w-7 text-white" />
                                <span>Log Worker Attendance</span>
                            </CardTitle>
                            <CardDescription className="text-blue-100 mt-2 text-base">
                                Manually log a worker's check-in and check-out times for a specific day.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <form className="max-w-3xl mx-auto space-y-8">
                                {/* Attendance Form */}
                                <div className="p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-md">
                                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-blue-200">
                                        <UserRound className="h-6 w-6 text-blue-700"/>
                                        <h3 className="text-xl font-bold text-gray-800">Attendance Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="attendance-worker" className="text-gray-700 font-semibold mb-2 block">Select Worker</Label>
                                            <Select>
                                                <SelectTrigger className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5">
                                                    <SelectValue placeholder="Choose a worker..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                                                    <SelectItem value="W-C123-001">Biplob Haldar</SelectItem>
                                                    <SelectItem value="W-C123-002">Sita Devi</SelectItem>
                                                    <SelectItem value="W-C123-003">Mohan Singh</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="attendance-date" className="text-gray-700 font-semibold mb-2 block">Date</Label>
                                            <Input id="attendance-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                                        </div>
                                        <div>
                                            <Label htmlFor="check-in" className="text-gray-700 font-semibold mb-2 block">Check-In Time</Label>
                                            <Input id="check-in" type="time" defaultValue="08:00" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                                        </div>
                                        <div>
                                            <Label htmlFor="check-out" className="text-gray-700 font-semibold mb-2 block">Check-Out Time</Label>
                                            <Input id="check-out" type="time" defaultValue="17:00" className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="work-type" className="text-gray-700 font-semibold mb-2 block">Work Type</Label>
                                            <Select>
                                                <SelectTrigger className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-2.5">
                                                    <SelectValue placeholder="Select work type..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                                                    <SelectItem value="Sewer Cleaning">Sewer Cleaning</SelectItem>
                                                    <SelectItem value="Public Sanitation">Public Sanitation</SelectItem>
                                                    <SelectItem value="Septic Tank Cleaning">Septic Tank Cleaning</SelectItem>
                                                    <SelectItem value="Drainage Maintenance">Drainage Maintenance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="attendance-remarks" className="text-gray-700 font-semibold mb-2 block">Remarks</Label>
                                            <Textarea id="attendance-remarks" placeholder="e.g., Half-day due to personal emergency." className="border-gray-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-200 transition-all duration-300 rounded-xl min-h-[100px] px-4 py-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-8">
                                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-lg py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                            <CheckCircle className="h-5 w-5 mr-2" /> Log Attendance
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PPE Log Tab Content */}
                <TabsContent value="ppe" className="mt-8">
                    <Card className="bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-700 text-white shadow-lg">
                            <CardTitle className="flex items-center space-x-3 text-2xl md:text-3xl font-bold">
                                <Shield className="h-7 w-7 text-white" />
                                <span>Log PPE Distribution</span>
                            </CardTitle>
                            <CardDescription className="text-purple-100 mt-2 text-base">
                                Record the issuance of new or replacement safety gear to a worker. This creates an auditable safety record.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <form className="max-w-3xl mx-auto space-y-8">
                                <div className="p-6 border border-purple-200 rounded-xl bg-gradient-to-br from-white to-purple-50 shadow-md">
                                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-purple-200">
                                        <BriefcaseBusiness className="h-6 w-6 text-purple-700"/>
                                        <h3 className="text-xl font-bold text-gray-800">PPE Distribution Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="ppe-worker" className="text-gray-700 font-semibold mb-2 block">Select Worker</Label>
                                            <Select>
                                                <SelectTrigger className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5">
                                                    <SelectValue placeholder="Choose a worker..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                                                    <SelectItem value="W-C123-001">Biplob Haldar</SelectItem>
                                                    <SelectItem value="W-C123-002">Sita Devi</SelectItem>
                                                    <SelectItem value="W-C123-003">Mohan Singh</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="ppe-date" className="text-gray-700 font-semibold mb-2 block">Date of Distribution</Label>
                                            <Input id="ppe-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl px-4 py-2.5" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="text-gray-700 font-semibold mb-2 block">PPE Items Distributed</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 p-5 border border-purple-200 rounded-xl bg-purple-50/50 shadow-inner">
                                                {["Gloves", "Boots", "Mask", "Apron", "Gas Detector", "Helmet", "Safety Goggles", "Reflective Vest"].map((item) => (
                                                    <div key={item} className="flex items-center space-x-2">
                                                        <Checkbox id={`ppe-${item}`} className="h-5 w-5 border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-md" />
                                                        <Label htmlFor={`ppe-${item}`} className="font-normal text-gray-700 cursor-pointer">{item}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="ppe-remarks" className="text-gray-700 font-semibold mb-2 block">Remarks</Label>
                                            <Textarea id="ppe-remarks" placeholder="e.g., Replacement for damaged boots, new standard issue helmet." className="border-gray-300 focus:border-purple-600 focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-xl min-h-[100px] px-4 py-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-8">
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-lg py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                            <CheckCircle className="h-5 w-5 mr-2" /> Log PPE Distribution
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}