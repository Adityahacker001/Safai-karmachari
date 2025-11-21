'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, GraduationCap, Target, AlertTriangle, CheckCircle, Loader, Clock, XCircle, Eye } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import StatCard from "@/components/ui/stat-card";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartData, ScriptableContext } from "chart.js";
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TrainingCoverageReportPage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <IntegratedLoader />;
    }

    // Mock data for training coverage by module (fixed)
    const trainingCoverage = [
        {
            module: "Safety Procedures",
            enrolled: 45,
            completed: 40,
            inProgress: 3,
            overdue: 2,
            completionRate: 89,
            workers: {
                completed: ["Ravi Kumar", "Sunita Yadav", "Amit Patel", "Priya Sharma", "Mohan Singh", "Abishek Verma", "Anita Das", "Vijay Kumar", "Pooja Singh", "Rahul Mehra", "Deepak Joshi", "Kiran Bala", "Sanjay Gupta", "Meena Kumari", "Abishek Lal", "Geeta Devi", "Arun Kumar", "Seema Yadav", "Nitin Sharma", "Kavita Joshi"],
                inProgress: ["Abishek Verma", "Anita Das", "Vijay Kumar"],
                overdue: ["Pooja Singh", "Rahul Mehra"]
            }
        },
        {
            module: "Equipment Handling",
            enrolled: 40,
            completed: 32,
            inProgress: 8,
            overdue: 0,
            completionRate: 80,
            workers: {
                completed: ["Ravi Kumar", "Sunita Yadav", "Amit Patel", "Priya Sharma", "Mohan Singh", "Abishek Verma", "Anita Das", "Vijay Kumar", "Pooja Singh", "Rahul Mehra", "Deepak Joshi", "Kiran Bala", "Sanjay Gupta", "Meena Kumari", "Abishek Lal", "Geeta Devi"],
                inProgress: ["Arun Kumar", "Seema Yadav", "Nitin Sharma", "Kavita Joshi", "Ajay Singh", "Preeti Sharma", "Manoj Kumar", "Shalini Gupta"],
                overdue: []
            }
        },
        {
            module: "First Aid Basics",
            enrolled: 60,
            completed: 55,
            inProgress: 1,
            overdue: 4,
            completionRate: 92,
            workers: {
                completed: ["Ravi Kumar", "Sunita Yadav", "Amit Patel", "Priya Sharma", "Mohan Singh", "Abishek Verma", "Anita Das", "Vijay Kumar", "Pooja Singh", "Rahul Mehra", "Deepak Joshi", "Kiran Bala", "Sanjay Gupta", "Meena Kumari", "Abishek Lal", "Geeta Devi", "Arun Kumar", "Seema Yadav", "Nitin Sharma", "Kavita Joshi", "Ajay Singh", "Preeti Sharma", "Manoj Kumar", "Shalini Gupta", "Rohit Sinha", "Neha Kumari", "Asha Devi", "Suman Yadav", "Pallab Das", "Sangeeta Sharma", "Vikas Gupta", "Pankaj Singh", "Ritu Sharma", "Amit Saini", "Sonia Mehra", "Dinesh Kumar", "Kusum Lata", "Rakesh Yadav", "Sushma Devi", "Vinod Kumar", "Meera Sharma", "Sanjana Singh", "Rohit Verma", "Nisha Kumari", "Kamal Singh", "Rina Das", "Abishek Kumar", "Anjali Sharma", "Ravi Saini", "Priya Mehra", "Deepa Kumari"],
                inProgress: ["Abishek Lal"],
                overdue: ["Geeta Devi", "Arun Kumar", "Seema Yadav", "Nitin Sharma"]
            }
        },
        {
            module: "Confined Space Entry",
            enrolled: 50,
            completed: 48,
            inProgress: 2,
            overdue: 0,
            completionRate: 96,
            workers: {
                completed: ["Ravi Kumar", "Sunita Yadav", "Amit Patel", "Priya Sharma", "Mohan Singh", "Abishek Verma", "Anita Das", "Vijay Kumar", "Pooja Singh", "Rahul Mehra", "Deepak Joshi", "Kiran Bala", "Sanjay Gupta", "Meena Kumari", "Abishek Lal", "Geeta Devi", "Arun Kumar", "Seema Yadav", "Nitin Sharma", "Kavita Joshi", "Ajay Singh", "Preeti Sharma", "Manoj Kumar", "Shalini Gupta", "Rohit Sinha", "Neha Kumari", "Asha Devi", "Suman Yadav", "Pallab Das", "Sangeeta Sharma", "Vikas Gupta", "Pankaj Singh", "Ritu Sharma", "Amit Saini", "Sonia Mehra", "Dinesh Kumar", "Kusum Lata", "Rakesh Yadav", "Sushma Devi", "Vinod Kumar", "Meera Sharma", "Sanjana Singh", "Rohit Verma", "Nisha Kumari", "Kamal Singh", "Rina Das", "Abishek Kumar", "Anjali Sharma", "Ravi Saini", "Priya Mehra"],
                inProgress: ["Deepa Kumari", "Rohit Sinha"],
                overdue: []
            }
        },
    ];

    const trainingRecords = [
        { worker: "Abishek Kumar", module: "Sewer Safety", status: "Completed", score: 85, certificate: true },
        { worker: "Sita Devi", module: "PPE Usage", status: "Pending", score: null, certificate: false },
        { worker: "Amit Patel", module: "Sewer Safety", status: "Completed", score: 92, certificate: true },
        { worker: "Priya Sharma", module: "First Aid Basics", status: "In Progress", score: null, certificate: false },
        { worker: "Mohan Singh", module: "Equipment Handling", status: "Completed", score: 78, certificate: true },
        { worker: "Sunita Yadav", module: "Confined Space Entry", status: "Overdue", score: null, certificate: false },
    ];

    const totalTrainings = trainingCoverage.reduce((sum, t) => sum + t.enrolled, 0);
    const totalCompleted = trainingCoverage.reduce((sum, t) => sum + t.completed, 0);
    const totalInProgress = trainingCoverage.reduce((sum, t) => sum + t.inProgress, 0);
    const totalOverdue = trainingCoverage.reduce((sum, t) => sum + t.overdue, 0);

    // Modern chart data and options for a "3D" gradient effect
    const chartData: ChartData<'bar'> = {
        labels: trainingCoverage.map(t => t.module),
        datasets: [
            {
                label: 'Completion Rate (%)',
                data: trainingCoverage.map(t => t.completionRate),
                backgroundColor: (context: ScriptableContext<'bar'>) => {
                    const colors = [
                        'rgba(16, 185, 129, 0.8)', // green
                        'rgba(59, 130, 246, 0.8)', // blue
                        'rgba(239, 68, 68, 0.8)',  // red
                        'rgba(139, 92, 246, 0.8)', // purple
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
                min: 50,
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

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative z-20 rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                                Training Coverage Report
                            </h1>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                                Analyze workforce skill development and certification status by module
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
                            >
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Export Report (CSV)</span>
                                <span className="sm:hidden">Export</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Training Coverage KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Training"
                    value={totalTrainings}
                    subtitle="Total training assigned"
                    icon={Target}
                    color="purple"
                />
                
                <StatCard
                    title="Complete training"
                    value={totalCompleted}
                    subtitle="Trainings successfully completed"
                    icon={CheckCircle}
                    color="green"
                />
                
                <StatCard
                    title="Overdue"
                    value={totalOverdue}
                    subtitle="Require immediate follow-up"
                    icon={AlertTriangle}
                    color="amber"
                />
                
                <StatCard
                    title="In Progress"
                    value={totalInProgress}
                    subtitle="Currently in progress"
                    icon={Loader}
                    color="blue"
                />
            </div>

            {/* <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg">
                    <CardTitle className="text-3xl md:text-4xl font-bold">Module Completion Rates</CardTitle>
                    <CardDescription className="text-teal-100 mt-2 text-lg">
                        Visual comparison of the completion rate for each training module.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 h-96">
                    <Bar data={chartData} options={chartOptions as any} />
                </CardContent>
            </Card> */}

            <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg">
                    <CardTitle className="text-3xl md:text-4xl font-bold">Training Records</CardTitle>
                    <CardDescription className="text-gray-300 mt-2 text-lg">
                        Individual worker training status and certification.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</TableHead>
                                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</TableHead>
                                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</TableHead>
                                <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</TableHead>
                                <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trainingRecords.map((record, index) => (
                                <TableRow key={index} className="border-b hover:bg-gray-50">
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.worker}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.module}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            record.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.score !== null ? `${record.score}%` : '—'}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        {record.certificate ? (
                                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                                <Download className="h-4 w-4 mr-1" /> Download
                                            </Button>
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            onClick={() => alert(`Viewing details for ${record.worker} - ${record.module}`)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" /> View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-purple-600 to-pink-700 text-white shadow-lg">
                    <CardTitle className="text-3xl md:text-4xl font-bold">Training Module Breakdown</CardTitle>
                    <CardDescription className="text-purple-100 mt-2 text-lg">
                        Detailed status for each training module. Click a row to see assigned workers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-10">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {trainingCoverage.map((t) => (
                            <AccordionItem value={t.module} key={t.module} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                <AccordionTrigger className="p-6 hover:no-underline text-left">
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <p className="font-bold text-lg text-gray-800">{t.module}</p>
                                        <div className="flex items-center space-x-6 text-base flex-shrink-0">
                                            <div className="text-center text-green-600">
                                                <p className="font-bold text-xl">{t.completed}</p>
                                                <p className="text-xs font-medium">Completed</p>
                                            </div>
                                            <div className="text-center text-blue-600">
                                                <p className="font-bold text-xl">{t.inProgress}</p>
                                                <p className="text-xs font-medium">In Progress</p>
                                            </div>
                                            <div className="text-center text-red-600">
                                                <p className="font-bold text-xl">{t.overdue}</p>
                                                <p className="text-xs font-medium">Overdue</p>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 pt-2">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                                        <h4 className="font-semibold text-gray-700 mb-2">Worker Status for "{t.module}"</h4>
                                        {t.overdue > 0 && (
                                            <div className="flex items-center text-sm text-red-700">
                                                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <b>Overdue:</b><span className="ml-1">{t.workers.overdue.join(', ')}</span>
                                            </div>
                                        )}
                                        {t.inProgress > 0 && (
                                            <div className="flex items-center text-sm text-blue-700">
                                                <Loader className="h-4 w-4 mr-2 flex-shrink-0 animate-spin" />
                                                <b>In Progress:</b><span className="ml-1">{t.workers.inProgress.join(', ')}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center text-sm text-green-700">
                                            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <b>Completed:</b><span className="ml-1">{t.workers.completed.join(', ')} and {t.completed - t.workers.completed.length} others.</span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}