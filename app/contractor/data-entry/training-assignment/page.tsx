'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpenText, CalendarCheck, ArrowLeft, Users, GraduationCap, UserRoundCog, Filter, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import React from 'react';

export default function TrainingAssignmentPage() {
    const [step, setStep] = useState<'list' | 'assign'>("list");
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <IntegratedLoader />;
    }

    // Mock data
    const workers = [
        { id: "W-C123-001", name: "Biplob Haldar", zone: "Zone 1" },
        { id: "W-C123-002", name: "Sita Devi", zone: "Zone 1" },
        { id: "W-C123-004", name: "Priya Sharma", zone: "Zone 2" },
        { id: "W-C123-005", name: "Mohan Singh", zone: "Zone 1" },
        { id: "W-C123-006", name: "Anjali Rao", zone: "Zone 2" },
        { id: "W-C123-007", name: "Pallab Das", zone: "Zone 1" },
        { id: "W-C123-008", name: "Deepa Singh", zone: "Zone 2" },
    ];
    const trainingModules = [
        { id: "adv-sewer", name: "Advanced Sewer Safety", duration: "4 hours", description: "In-depth training on modern sewer safety protocols and emergency procedures, focusing on confined space entry and gas detection." },
        { id: "equip-handle", name: "Equipment Handling & Maintenance", duration: "3 hours", description: "Covers safe operation, routine maintenance, and troubleshooting of cleaning equipment and machinery." },
        { id: "first-aid", name: "First Aid & Emergency Response", duration: "2 hours", description: "Essential first aid skills for common workplace injuries and basic emergency response protocols." },
        { id: "waste-seg", name: "Waste Segregation Best Practices", duration: "2.5 hours", description: "Training on proper waste segregation techniques, environmental impact, and regulatory compliance." },
    ];

    const selectedModule = trainingModules.find(m => m.id === selectedModuleId);

    // Selection logic (for demo, just count)
    const handleWorkerCheckboxChange = (checked: boolean) => {
        setSelectedCount(prev => checked ? prev + 1 : prev - 1);
    };
    const handleZoneCheckboxChange = (zone: string, checked: boolean) => {
        const zoneWorkers = workers.filter(worker => worker.zone === zone);
        if (checked) setSelectedCount(prev => prev + zoneWorkers.length);
        else setSelectedCount(prev => prev - zoneWorkers.length);
    };

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                        Assign Training
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                        Browse modules and assign to workers
                    </p>
                </div>
            </header>

            {step === "list" && (
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <BookOpenText className="h-6 w-6 sm:h-8 sm:w-8" />
                            Available Training Modules
                        </CardTitle>
                        <CardDescription className="text-emerald-100 mt-2 text-sm sm:text-base md:text-lg">
                            Click a module to assign it to workers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 md:p-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs sm:text-sm">Module</TableHead>
                                        <TableHead className="hidden md:table-cell text-xs sm:text-sm">Description</TableHead>
                                        <TableHead className="text-xs sm:text-sm">Duration</TableHead>
                                        <TableHead className="text-xs sm:text-sm"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {trainingModules.map(module => (
                                        <TableRow key={module.id}>
                                            <TableCell className="font-bold text-xs sm:text-sm">{module.name}</TableCell>
                                            <TableCell className="hidden md:table-cell text-xs sm:text-sm">{module.description}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-blue-500 text-white text-xs">
                                                    <CalendarCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> {module.duration}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                                                    onClick={() => { setSelectedModuleId(module.id); setStep("assign"); setSelectedCount(0); }}
                                                >
                                                    Assign
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {step === "assign" && selectedModule && (
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white p-4 sm:p-6 md:p-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3">
                                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                                Assign: {selectedModule.name}
                            </CardTitle>
                            <CardDescription className="text-purple-100 mt-2 text-sm sm:text-base md:text-lg">
                                Select workers for this training.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
                            <Button variant="outline" onClick={() => setStep("list")} className="text-gray-700 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-gray-300 text-sm sm:text-base">
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                <span className="hidden sm:inline">Back to Modules</span>
                                <span className="sm:hidden">Back</span>
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-base sm:text-xl py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg"
                                disabled={selectedCount === 0}
                            >
                                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                                <span className="hidden sm:inline">Confirm & Assign Training</span>
                                <span className="sm:hidden">Assign Training</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 md:p-6">
                        <div className="mb-4 sm:mb-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
                            <div className="flex-1 p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300">
                                <Label className="text-gray-700 font-semibold mb-2 block">Completion Deadline</Label>
                                <Input type="date" className="border-gray-300 focus:border-blue-600 rounded-xl px-4 py-2.5" />
                                <div className="mt-6">
                                    <p className="text-base text-gray-700 mb-4 leading-relaxed">{selectedModule.description}</p>
                                    <Badge className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                                        <CalendarCheck className="h-4 w-4 mr-2" /> Duration: {selectedModule.duration}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200 mb-6 shadow-inner">
                                    <Search className="h-5 w-5 text-purple-600 flex-shrink-0"/>
                                    <Input placeholder="Search worker by name or ID..." className="flex-grow bg-white border-gray-300 rounded-lg px-4 py-2.5"/>
                                    <Filter className="h-5 w-5 text-purple-600 flex-shrink-0"/>
                                    <Select>
                                        <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 rounded-lg px-4 py-2.5">
                                            <SelectValue placeholder="Filter by Zone" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-xl rounded-lg border-gray-200">
                                            <SelectItem value="all">All Zones</SelectItem>
                                            <SelectItem value="Zone 1">Zone 1</SelectItem>
                                            <SelectItem value="Zone 2">Zone 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <ScrollArea className="h-80 rounded-xl border border-gray-200 bg-white shadow-inner">
                                    <div className="p-6 space-y-5">
                                        {/* Zone 1 Section */}
                                        <div className="flex items-center space-x-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
                                            <Checkbox id="all-zone1" className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-600"
                                                onCheckedChange={(checked: boolean) => handleZoneCheckboxChange('Zone 1', checked)}
                                            />
                                            <Label htmlFor="all-zone1" className="font-bold text-blue-800 text-lg cursor-pointer">Assign to ALL in Zone 1</Label>
                                        </div>
                                        {workers.filter(w => w.zone === 'Zone 1').map(worker => (
                                            <div key={worker.id} className="flex items-center space-x-3 ml-6 p-2 hover:bg-gray-50 rounded-md">
                                                <Checkbox id={worker.id} className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-600"
                                                    onCheckedChange={handleWorkerCheckboxChange}
                                                />
                                                <Label htmlFor={worker.id} className="font-medium text-gray-700 text-base cursor-pointer">{worker.name} ({worker.id})</Label>
                                            </div>
                                        ))}
                                        {/* Zone 2 Section */}
                                        <div className="flex items-center space-x-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-sm mt-8">
                                            <Checkbox id="all-zone2" className="h-5 w-5 border-gray-300 data-[state=checked]:bg-green-600"
                                                onCheckedChange={(checked: boolean) => handleZoneCheckboxChange('Zone 2', checked)}
                                            />
                                            <Label htmlFor="all-zone2" className="font-bold text-green-800 text-lg cursor-pointer">Assign to ALL in Zone 2</Label>
                                        </div>
                                        {workers.filter(w => w.zone === 'Zone 2').map(worker => (
                                            <div key={worker.id} className="flex items-center space-x-3 ml-6 p-2 hover:bg-gray-50 rounded-md">
                                                <Checkbox id={worker.id} className="h-5 w-5 border-gray-300 data-[state=checked]:bg-green-600"
                                                    onCheckedChange={handleWorkerCheckboxChange}
                                                />
                                                <Label htmlFor={worker.id} className="font-medium text-gray-700 text-base cursor-pointer">{worker.name} ({worker.id})</Label>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <div className="flex items-center space-x-3 mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                                    <UserRoundCog className="h-6 w-6 text-gray-700"/>
                                    <span className="font-bold text-gray-800 text-xl">{selectedCount} workers selected</span>
                                    <Badge className="ml-auto bg-purple-500 text-white text-sm px-4 py-1.5 rounded-full">
                                        <BookOpenText className="h-4 w-4 mr-2" /> Module: {selectedModule.name}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}