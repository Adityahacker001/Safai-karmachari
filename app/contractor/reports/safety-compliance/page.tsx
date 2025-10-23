'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Shield, CheckCircle, AlertTriangle, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartData, ScriptableContext } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ALL_PPE_ITEMS = ["Helmet", "Gloves", "Boots", "Jacket", "Goggles"];

export default function SafetyComplianceReportPage() {

    // Mock data
    const complianceLogs = [
        { worker: "Ravi Kumar", time: "08:10 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Sunita Yadav", time: "08:12 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Amit Patel", time: "08:15 AM", status: "Non-Compliant", missing: "Gloves", remarks: "Forgot to bring gloves" },
        { worker: "Priya Sharma", time: "08:18 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Mohan Singh", time: "08:20 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Abishek Verma", time: "08:22 AM", status: "Non-Compliant", missing: "Helmet", remarks: "Helmet damaged" },
        { worker: "Anita Das", time: "08:25 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Vijay Kumar", time: "08:28 AM", status: "Compliant", missing: "", remarks: "-" },
        { worker: "Pooja Singh", time: "08:30 AM", status: "Not Submitted", missing: "", remarks: "On leave" },
    ];

    const workerScores = [
        { name: "Ravi Kumar", score: 98 },
        { name: "Sunita Yadav", score: 97 },
        { name: "Priya Sharma", score: 96 },
        { name: "Amit Patel", score: 85 },
        { name: "Mohan Singh", score: 92 },
        { name: "Abishek Verma", score: 78 },
        { name: "Anita Das", score: 95 },
        { name: "Vijay Kumar", score: 90 },
        { name: "Pooja Singh", score: 80 },
    ];

    // Modern chart data and options for a "3D" gradient effect
    const chartData: ChartData<'bar'> = {
        labels: [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
        ],
        datasets: [
            {
                label: 'Compliance Rate (%)',
                data: [93, 95, 92, 96, 94, 97, 94],
                backgroundColor: (context: ScriptableContext<'bar'>) => {
                    const colors = [
                        'rgba(16, 185, 129, 0.8)', // green
                        'rgba(59, 130, 246, 0.8)', // blue
                        'rgba(239, 68, 68, 0.8)',  // red
                        'rgba(139, 92, 246, 0.8)', // purple
                        'rgba(251, 191, 36, 0.8)', // yellow
                        'rgba(236, 72, 153, 0.8)', // pink
                        'rgba(34, 197, 94, 0.8)',  // emerald
                    ];
                    return colors[context.dataIndex % colors.length];
                },
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 80,
                max: 100,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                    color: '#64748b',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                    color: '#334155',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 12,
                },
                padding: 12,
                cornerRadius: 8,
                boxPadding: 4,
            },
        },
    };

    // Helper function for status badge styling
    const getStatusBadgeClasses = (status: string) => {
        switch (status) {
            case 'Compliant':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Non-Compliant':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Not Submitted':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        // Main container with a vibrant, modern background gradient
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Safety Compliance Report</h1>
                    <p className="text-gray-600 mt-3 text-xl">Analyze daily PPE checklist submissions and track worker safety scores.</p>
                </div>
                <div className="flex items-center space-x-4 mt-6 sm:mt-0">
                    <Button
                        variant="outline"
                        className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all duration-200"
                    >
                        <Download className="h-5 w-5 mr-2" />Export Report (PDF)
                    </Button>
                </div>
            </div>

            {/* Safety Compliance KPIs */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-green-100">Monthly Compliance Rate</CardTitle>
                        <Shield className="h-6 w-6 text-green-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">94.2%</div>
                        <p className="text-sm text-green-100 mt-1">Average across all workers</p>
                    </CardContent>
                </Card>
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-blue-100">Checklists Submitted Today</CardTitle>
                        <CheckCircle className="h-6 w-6 text-blue-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">140 / 142</div>
                        <p className="text-sm text-blue-100 mt-1">From active workforce</p>
                    </CardContent>
                </Card>
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-red-100">Non-Compliant Today</CardTitle>
                        <AlertTriangle className="h-6 w-6 text-red-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{complianceLogs.filter(l => l.status === 'Non-Compliant').length}</div>
                        <p className="text-sm text-red-100 mt-1">Workers with missing PPE</p>
                    </CardContent>
                </Card>
            </div> */}

            {/* Compliance Trend Chart and Worker Leaderboard */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3 bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                    <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg">
                        <CardTitle className="text-3xl font-bold">Daily Compliance Trend (Last 7 Days)</CardTitle>
                        <CardDescription className="text-teal-100 mt-2 text-lg">Percentage of compliant checklist submissions each day.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 h-80">
                        <Bar data={chartData} options={chartOptions as any} />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                    <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-purple-600 to-pink-700 text-white shadow-lg">
                        <CardTitle className="text-3xl font-bold">Worker Safety Leaderboard</CardTitle>
                        <CardDescription className="text-purple-100 mt-2 text-lg">Ranked by individual safety compliance score.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="space-y-5">
                            {workerScores.map((w, index) => (
                                <div key={w.name} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className={`w-8 text-center font-bold text-lg ${index < 3? 'text-yellow-500' : 'text-gray-500'}`}>#{index + 1}</span>
                                        <span className="font-medium text-base text-gray-800 ml-3">{w.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                                            <div className={`${w.score < 80? 'bg-red-500' : 'bg-green-500'} h-2.5 rounded-full`} style={{ width: `${w.score}%` }}></div>
                                        </div>
                                        <span className={`font-bold text-base w-12 text-right ${w.score < 80? 'text-red-600' : 'text-green-600'}`}>{w.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div> */}

            <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-600 via-purple-500 via-pink-500 via-rose-400 to-yellow-400 text-white shadow-lg">
                    <CardTitle className="text-3xl md:text-4xl font-bold">Daily Compliance Log</CardTitle>
                    <CardDescription className="text-white-300 mt-2 text-lg">
                        Detailed log of today's checklist submissions. Non-compliant entries are highlighted.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-10 bg-gradient-to-br from-white via-blue-50 via-pink-50 to-yellow-50">
                    <Table>
                        <TableHeader className="bg-gray-50 rounded-t-xl">
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="py-4 px-6 text-gray-700 font-bold text-base">Worker</TableHead>
                                <TableHead className="py-4 px-6 text-gray-700 font-bold text-base">Submission Time</TableHead>
                                <TableHead className="py-4 px-6 text-gray-700 font-bold text-base">Provided Items</TableHead>
                                <TableHead className="py-4 px-6 text-gray-700 font-bold text-base">Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complianceLogs.map((log) => {
                                const providedItems = log.status === 'Compliant' 
                                    ? ALL_PPE_ITEMS 
                                    : ALL_PPE_ITEMS.filter(item => item !== log.missing);

                                return (
                                <TableRow key={log.worker} className={`border-b border-gray-100 transition-colors duration-150 ${log.status!== 'Compliant'? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                                    <TableCell className="py-4 px-6 font-semibold text-gray-800 text-base">{log.worker}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{log.time}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">
                                        {log.status === 'Not Submitted' ? 'N/A' : providedItems.join(', ')}
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{log.remarks}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}