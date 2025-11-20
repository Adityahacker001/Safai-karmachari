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
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import React from 'react';

export default function AttendancePpePage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <IntegratedLoader />;
    }

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                        Attendance & PPE Log
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                        Log daily worker attendance and record the distribution of safety equipment.
                    </p>
                </div>
            </header>

            <Tabs defaultValue="attendance" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 p-1 bg-white/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
                    <TabsTrigger
                        value="attendance"
                        className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-lg font-medium sm:font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md data-[state=active]:rounded-md sm:data-[state=active]:rounded-lg transition-all duration-300 ease-in-out py-2 px-2 sm:px-3 md:px-4"
                    >
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        <span className="hidden sm:inline">Daily Attendance Log</span>
                        <span className="sm:hidden text-xs">Attendance</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="ppe"
                        className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-lg font-medium sm:font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md data-[state=active]:rounded-md sm:data-[state=active]:rounded-lg transition-all duration-300 ease-in-out py-2 px-2 sm:px-3 md:px-4"
                    >
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        <span className="hidden sm:inline">Log PPE Distribution</span>
                        <span className="sm:hidden text-xs">PPE Log</span>
                    </TabsTrigger>
                </TabsList>

                {/* Attendance Log Tab Content */}
                <TabsContent value="attendance" className="mt-6 sm:mt-8">
                    <Card className="w-full bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white">
                            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                                <span className="break-words">Log Worker Attendance</span>
                            </CardTitle>
                            <CardDescription className="text-blue-100 mt-2 text-sm sm:text-base">
                                Manually log a worker's check-in and check-out times for a specific day.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            <form className="space-y-6 sm:space-y-8">
                                {/* Attendance Form */}
                                <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
                                    <div className="flex items-center space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <UserRound className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600"/>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Attendance Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                                    <div className="flex justify-center mt-6 sm:mt-8">
                                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium sm:font-bold text-sm sm:text-base md:text-lg py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> 
                                            <span className="hidden sm:inline">Log Attendance</span>
                                            <span className="sm:hidden">Log Attendance</span>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PPE Log Tab Content */}
                <TabsContent value="ppe" className="mt-6 sm:mt-8">
                    <Card className="w-full bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white">
                            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                                <span className="break-words">Log PPE Distribution</span>
                            </CardTitle>
                            <CardDescription className="text-purple-100 mt-2 text-sm sm:text-base">
                                Record the issuance of new or replacement safety gear to a worker. This creates an auditable safety record.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            <form className="space-y-6 sm:space-y-8">
                                <div className="p-4 sm:p-6 border border-gray-200 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                                    <div className="flex items-center space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <BriefcaseBusiness className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700"/>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">PPE Distribution Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                                        <div className="sm:col-span-2">
                                            <Label className="text-gray-700 font-semibold mb-2 block text-sm sm:text-base">PPE Items Distributed</Label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-2 p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
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
                                    <div className="flex justify-center mt-6 sm:mt-8">
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium sm:font-bold text-sm sm:text-base md:text-lg py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> 
                                            <span className="hidden sm:inline">Log PPE Distribution</span>
                                            <span className="sm:hidden">Log PPE</span>
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