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

export default function TrainingAssignmentPage() {
    const [step, setStep] = useState<'list' | 'assign'>("list");
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedCount, setSelectedCount] = useState(0);

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
        <div className="min-h-screen w-full max-w-full sm:max-w-full md:max-w-7xl mx-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 md:space-y-10">
            <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Assign Training</h2>
                <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg md:text-xl">Browse modules and assign to workers.</p>
            </div>

            {step === "list" && (
                <Card className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
                    <CardHeader className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                            <span className="break-words">Available Training Modules</span>
                        </CardTitle>
                        <CardDescription className="text-blue-100 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
                            Click a module to assign it to workers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 md:p-8">
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
                <Card className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
                    <CardHeader className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-700 text-white shadow-lg flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                                <span className="break-words">Assign: {selectedModule.name}</span>
                            </CardTitle>
                            <CardDescription className="text-purple-100 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
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
                    <CardContent className="p-4 sm:p-6 md:p-8">
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