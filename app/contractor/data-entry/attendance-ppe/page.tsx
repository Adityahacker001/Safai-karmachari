'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Shield, CheckCircle, CalendarDays, UserRound, BriefcaseBusiness, Edit2, Trash2, PlusCircle } from "lucide-react"; // Added more specific icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

export default function AttendancePpePage() {
    const [loading, setLoading] = React.useState(true);

    // PPE items state and modal states
    // default order requested; UI will display items sorted alphabetically
    const [ppeItems, setPpeItems] = React.useState<string[]>([
        'Gloves',
        'Boots',
        'Safety Goggles',
        'Gas Detector',
        'Reflective Vest',
        'Mask',
        'Helmet',
    ]);

    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const [addValue, setAddValue] = React.useState('');
    const [editSelected, setEditSelected] = React.useState<string | null>(ppeItems[0] ?? null);
    const [editValue, setEditValue] = React.useState('');
    const [deleteSelected, setDeleteSelected] = React.useState<string | null>(ppeItems[0] ?? null);

    const { toast } = useToast();

    React.useEffect(() => {
        // keep edit/delete selected values in sync if items change
        if (ppeItems.length > 0) {
            setEditSelected((s) => (s && ppeItems.includes(s) ? s : ppeItems[0]));
            setDeleteSelected((s) => (s && ppeItems.includes(s) ? s : ppeItems[0]));
        } else {
            setEditSelected(null);
            setDeleteSelected(null);
        }
    }, [ppeItems]);

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
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative rounded-xl sm:rounded-2xl overflow-hidden">
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
                        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white rounded-t-xl sm:rounded-t-2xl rounded-b-xl sm:rounded-b-2xl">
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
                    <Card className="relative z-0 w-full bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden relative z-10 mb-6">
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
                                    <div className="flex items-center justify-between space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <BriefcaseBusiness className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700"/>
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">PPE Distribution Details</h3>
                                        </div>
                                        <div className="ml-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="text-sm px-2 py-1">
                                                        Manage Items ▾
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent sideOffset={6} align="end" className="w-80 max-h-64 overflow-auto p-2 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/10 shadow-xl ring-1 ring-white/10">
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold px-3 py-2">
                                                        <div className="flex-1">PPE Item</div>
                                                        <div className="w-28 text-right">Actions</div>
                                                    </div>
                                                    <div className="mt-1 divide-y divide-white/10 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-purple-300/40">
                                                        {[...ppeItems].sort((a,b) => a.localeCompare(b)).map((it) => (
                                                            <div
                                                                key={it}
                                                                className="flex items-center justify-between px-3 py-2 transition-transform duration-200 rounded-lg hover:translate-y-0.5 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-50/40 hover:to-pink-50/30 hover:ring-1 hover:ring-purple-200/30"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <div className="flex items-center flex-1 min-w-0">
                                                                    <span className="inline-flex h-2.5 w-2.5 rounded-full mr-3 flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-500" aria-hidden />
                                                                    <div className="truncate text-sm font-medium text-purple-900">{it}</div>
                                                                </div>
                                                                <div className="flex items-center space-x-2 ml-3">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-purple-200 text-purple-700 hover:shadow-md hover:bg-gradient-to-r hover:from-purple-50/60 hover:to-pink-50/40 transition"
                                                                        onClick={(e) => { e.stopPropagation(); setEditSelected(it); setEditValue(it); setEditOpen(true); }}
                                                                    >
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-red-200 text-red-600 hover:shadow-md hover:bg-red-50/40 transition"
                                                                        onClick={(e) => { e.stopPropagation(); setDeleteSelected(it); setDeleteOpen(true); }}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-3 px-2">
                                                        <Button
                                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                                                            size="sm"
                                                            onClick={(e) => { e.stopPropagation(); setAddOpen(true); }}
                                                        >
                                                            Add PPE Item
                                                        </Button>
                                                    </div>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
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
                                                {[...ppeItems].sort((a,b) => a.localeCompare(b)).map((item) => {
                                                    const id = `ppe-${item.replace(/\s+/g, '-').toLowerCase()}`;
                                                    return (
                                                        <div key={item} className="flex items-center space-x-2">
                                                            <Checkbox id={id} className="h-5 w-5 border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white focus:ring-3 focus:ring-purple-200 transition-all duration-300 rounded-md" />
                                                            <Label htmlFor={id} className="font-normal text-gray-700 cursor-pointer">{item}</Label>
                                                        </div>
                                                    );
                                                })}
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
                        {/* Dialogs moved here so they're always mounted (Add / Edit / Delete) */}
                        <Dialog open={addOpen} onOpenChange={setAddOpen}>
                            <DialogContent className="bg-white/80 backdrop-blur-md rounded-xl border border-purple-100/30 shadow-xl p-6">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-purple-700 font-bold text-lg">
                                            <PlusCircle className="h-5 w-5 text-purple-600" />
                                            Add PPE Item
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <Label className="text-sm text-purple-800 font-semibold mb-2 block">Item name</Label>
                                        <Input
                                            placeholder="e.g., Ear Plugs"
                                            value={addValue}
                                            onChange={(e) => setAddValue(e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 transition px-3 py-2"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <div className="flex items-center justify-end space-x-3 mt-4">
                                            <Button
                                                size="sm"
                                                className="text-gray-600 hover:text-gray-900 bg-white/60 border border-gray-300 hover:bg-gray-200 transition-all rounded-lg"
                                                onClick={() => { setAddValue(''); setAddOpen(false); }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="rounded-lg px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
                                                size="sm"
                                                onClick={() => {
                                                    const v = addValue.trim();
                                                    if (v) {
                                                        setPpeItems((prev) => [...prev, v]);
                                                        setAddValue('');
                                                        toast({
                                                            title: 'PPE Item Added',
                                                            description: <div className="font-semibold">{v}</div>,
                                                            variant: 'default',
                                                        });
                                                    }
                                                    setAddOpen(false);
                                                }}
                                            >
                                                <PlusCircle className="h-4 w-4" />
                                                <span>Add</span>
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                </DialogContent>
                        </Dialog>

                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                            <DialogContent className="bg-white/80 backdrop-blur-md rounded-xl border border-purple-100/30 shadow-xl p-6">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-purple-700 font-bold text-lg">
                                            <Edit2 className="h-5 w-5 text-purple-600" />
                                            Edit PPE Item
                                        </DialogTitle>
                                        <DialogDescription className="mt-1 text-sm text-muted-foreground">Select an item to rename.</DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <Label className="text-sm text-purple-800 font-semibold mb-2 block">Item</Label>
                                            <Select value={editSelected ?? undefined} onValueChange={(v) => setEditSelected(v)}>
                                                <SelectTrigger className="w-full rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 transition px-3 py-2.5">
                                                    <SelectValue placeholder="Select item" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ppeItems.map((it) => (
                                                        <SelectItem key={it} value={it}>{it}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-sm text-purple-800 font-semibold mb-2 block">New name</Label>
                                            <Input placeholder="New name" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 transition px-3 py-2" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <div className="flex items-center justify-end space-x-3 mt-4">
                                            <Button
                                                size="sm"
                                                className="text-gray-600 hover:text-gray-900 bg-white/60 border border-gray-300 hover:bg-gray-200 transition-all rounded-lg"
                                                onClick={() => { setEditValue(''); setEditOpen(false); }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="rounded-lg px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
                                                size="sm"
                                                onClick={() => {
                                                    const sel = editSelected;
                                                    const v = editValue.trim();
                                                    if (sel && v) {
                                                        setPpeItems((prev) => prev.map((it) => it === sel ? v : it));
                                                        setEditValue('');
                                                        toast({
                                                            title: 'PPE Item Updated',
                                                            description: <div><div className="font-semibold">{sel}</div><div className="text-sm text-muted-foreground">renamed to <span className="font-semibold">{v}</span></div></div>,
                                                            variant: 'default',
                                                        });
                                                    }
                                                    setEditOpen(false);
                                                }}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span>Save</span>
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                </DialogContent>
                        </Dialog>

                        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <DialogContent className="bg-white/80 backdrop-blur-md rounded-xl border border-red-100/20 shadow-xl p-6">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2 text-red-600 font-bold text-lg">
                                            <Trash2 className="h-5 w-5 text-red-600" />
                                            Delete PPE Item
                                        </DialogTitle>
                                        <DialogDescription className="mt-1 text-sm text-muted-foreground">Choose an item to delete. This action cannot be undone.</DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <Label className="text-sm text-purple-800 font-semibold mb-2 block">Item to delete</Label>
                                        <Select value={deleteSelected ?? undefined} onValueChange={(v) => setDeleteSelected(v)}>
                                            <SelectTrigger className="w-full rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 transition px-3 py-2.5">
                                                <SelectValue placeholder="Select item" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ppeItems.map((it) => (
                                                    <SelectItem key={it} value={it}>{it}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <DialogFooter>
                                        <div className="flex items-center justify-end space-x-3 mt-4">
                                            <Button
                                                size="sm"
                                                className="text-gray-600 hover:text-gray-900 bg-white/60 border border-gray-300 hover:bg-gray-200 transition-all rounded-lg"
                                                onClick={() => setDeleteOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="rounded-lg px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold flex items-center space-x-2 shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
                                                size="sm"
                                                onClick={() => {
                                                    const sel = deleteSelected;
                                                    if (sel) {
                                                        setPpeItems((prev) => prev.filter((it) => it !== sel));
                                                        toast({
                                                            title: 'PPE Item Deleted',
                                                            description: <div className="text-sm">{sel} removed</div>,
                                                            variant: 'destructive',
                                                        });
                                                        setDeleteSelected(null);
                                                    }
                                                    setDeleteOpen(false);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                                <span>Delete</span>
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                </DialogContent>
                        </Dialog>

        </div>
    );
}