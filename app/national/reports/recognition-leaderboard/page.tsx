'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatCard from "@/components/ui/stat-card";
import { Trophy, Star, BarChart2, Award, Users, Building } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RecognitionLeaderboardPage() {

    // Mock Data (Unchanged)
    const topWorkers = [
        { rank: 1, name: "Ram Singh", district: "East Delhi", awards: 5 },
        { rank: 2, name: "Sita Devi", district: "Mumbai Central", awards: 4 },
        { rank: 3, name: "Arjun Kumar", district: "Bangalore South", awards: 4 },
    ];

    const topContractors = [
        { rank: 1, name: "ABC Sanitation", state: "Maharashtra", awards: 12 },
        { rank: 2, name: "City Maintenance", state: "Delhi", awards: 10 },
        { rank: 3, name: "Urban Clean Co.", state: "Karnataka", awards: 9 },
    ];
    const topstate = [
        { rank: 1, name: "Uttar Pradesh", Score: "94.5", awards: 5 },
        { rank: 2, name: "Maharashtra", Score: "92.5", awards: 4 },
        { rank: 3, name: "Karnataka", Score: "89.7", awards: 4 },
    ];

    const topdistrict = [
        { rank: 1, name: "Mumbai", state: "Maharashtra", awards: 12 },
        { rank: 2, name: "Lucknow", state: "Uttar Pradesh", awards: 10 },
        { rank: 3, name: "Kolkata", state: "West Bengal", awards: 9 },
    ];
    
    
    const nationalAwards = [
        { category: "Best Performing State", winner: "State of Kerala" },
        { category: "Most Improved State", winner: "State of West Bengal" },
        { category: "Best District (Innovation)", winner: "Pune District, Maharashtra" },
        { category: "National Safai Karmachari of the Year", winner: "Ram Singh (East Delhi)" },
    ];

    // --- Logic for Chart Gradient ---
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<any>({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;
        const ctx = chart.ctx;
        const canvas = chart.canvas;
        if (!ctx || !canvas) return;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.8)');
        setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Awards Granted',
                data: [65, 59, 80, 81, 56, 55, 40, 92],
                backgroundColor: gradient,
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 5,
                hoverBackgroundColor: 'rgba(59, 130, 246, 1)'
            }],
        });
    }, []);

    const renderRank = (rank: number) => {
        switch (rank) {
            case 1: return <span className="text-yellow-500 font-bold text-lg">1 🥇</span>;
            case 2: return <span className="text-gray-400 font-bold text-lg">2 🥈</span>;
            case 3: return <span className="text-orange-400 font-bold text-lg">3 🥉</span>;
            default: return <span className="font-bold text-lg">{rank}</span>;
        }
    };

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 flex items-center gap-4">
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                                    Recognition & Leaderboards
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg">
                                    Analytics and rankings for worker, contractor, and state recognition programs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Recognition KPIs -- Now Activated and Styled */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Awards Granted"
                    value="532"
                    subtitle="Nationwide this year"
                    icon={Trophy}
                    color="amber"
                />
                <StatCard
                    title="Recognized Workers"
                    value="350+"
                    subtitle="Individuals awarded"
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Recognized Contractors"
                    value="85"
                    subtitle="Companies awarded"
                    icon={Building}
                    color="purple"
                />
                <StatCard
                    title="States with Programs"
                    value="28"
                    subtitle="Actively participating"
                    icon={BarChart2}
                    color="green"
                />
            </div>

            {/* Custom 4 Cards Row (from image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Top State"
                    value="West Bengal"
                    icon={Trophy}
                    color="amber"
                />
                <StatCard
                    title="Top District"
                    value="Hooghly"
                    icon={Award}
                    color="blue"
                />
                <StatCard
                    title="Gold Tier Users"
                    value="1,247"
                    subtitle="Total users with exceptional performance"
                    icon={Trophy}
                    color="amber"
                />
                <StatCard
                    title="Silver Tier Users"
                    value="2,389"
                    subtitle="Total users with high performance"
                    icon={Award}
                    color="blue"
                />
            </div>

            {/* National Awards Roster */}
            <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white p-4 sm:p-6 md:p-8">
                    <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                        <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300"/>
                        National Award Winners
                    </CardTitle>
                    <CardDescription className="text-white/80 text-sm sm:text-base">Official roster of the highest national-level awards for the current year.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <Table className="w-full min-w-[600px]">
                        <TableHeader className="bg-slate-50">
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Award Category</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Winner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nationalAwards.map(award => (
                                <TableRow key={award.category} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">{award.category}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-purple-700 text-sm sm:text-base">{award.winner}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Top Recognized Workers */}
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-200"/>
                            State Leaderboard
                        </CardTitle>
                        <CardDescription className="text-white/80 text-sm sm:text-base">Top workers with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-100 dark:bg-slate-800">
                                <TableRow>
                                    <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Rank</TableHead>
                                    <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Name & District</TableHead>
                                    <TableHead className="text-center text-blue-700 dark:text-blue-300 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {topstate.map(worker => (
                                    <TableRow key={worker.rank} className="hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors duration-200">
                                        <TableCell>{renderRank(worker.rank)}</TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-200">{worker.name}{'district' in worker ? <p className="text-xs text-gray-500 dark:text-gray-400">{(worker as any).district}</p> : null}</TableCell>
                                        <TableCell className="text-center font-bold text-xl text-blue-600 dark:text-blue-300">{worker.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Top Performing Contractors */}
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200"/>
                            District Leaderboard
                        </CardTitle>
                        <CardDescription className="text-white/80 text-sm sm:text-base">Top contractors with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-100 dark:bg-slate-800">
                                <TableRow>
                                    <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">Rank</TableHead>
                                    <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">Name & State</TableHead>
                                    <TableHead className="text-center text-purple-700 dark:text-purple-300 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {topdistrict.map(contractor => (
                                    <TableRow key={contractor.rank} className="hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-colors duration-200">
                                        <TableCell>{renderRank(contractor.rank)}</TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-200">{contractor.name}<p className="text-xs text-gray-500 dark:text-gray-400">{contractor.state}</p></TableCell>
                                        <TableCell className="text-center font-bold text-xl text-purple-600 dark:text-purple-300">{contractor.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Top Recognized Workers */}
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-200"/>
                            Worker Leaderboard
                        </CardTitle>
                        <CardDescription className="text-white/80 text-sm sm:text-base">Top workers with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-100 dark:bg-slate-800">
                                <TableRow>
                                    <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Rank</TableHead>
                                    <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Name & District</TableHead>
                                    <TableHead className="text-center text-blue-700 dark:text-blue-300 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {topWorkers.map(worker => (
                                    <TableRow key={worker.rank} className="hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors duration-200">
                                        <TableCell>{renderRank(worker.rank)}</TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-200">{worker.name}<p className="text-xs text-gray-500 dark:text-gray-400">{worker.district}</p></TableCell>
                                        <TableCell className="text-center font-bold text-xl text-blue-600 dark:text-blue-300">{worker.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Top Performing Contractors */}
                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200"/>
                            Contractor Leaderboard
                        </CardTitle>
                        <CardDescription className="text-white/80 text-sm sm:text-base">Top contractors with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-100 dark:bg-slate-800">
                                <TableRow>
                                    <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">Rank</TableHead>
                                    <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">Name & State</TableHead>
                                    <TableHead className="text-center text-purple-700 dark:text-purple-300 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {topContractors.map(contractor => (
                                    <TableRow key={contractor.rank} className="hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-colors duration-200">
                                        <TableCell>{renderRank(contractor.rank)}</TableCell>
                                        <TableCell className="text-gray-800 dark:text-gray-200">{contractor.name}<p className="text-xs text-gray-500 dark:text-gray-400">{contractor.state}</p></TableCell>
                                        <TableCell className="text-center font-bold text-xl text-purple-600 dark:text-purple-300">{contractor.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

        {/* Awards Distribution Chart */}
        <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                <CardTitle className="flex items-center text-xl sm:text-2xl font-bold gap-3">
                    <BarChart2 className="h-6 w-6 sm:h-8 sm:w-8"/>
                    Monthly Awards Distribution
                </CardTitle>
                <CardDescription className="text-white/80 text-sm sm:text-base">Number of awards granted nationwide per month.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
                <div className="h-80 relative">
                    <Bar
                        ref={chartRef}
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: {
                                    grid: { color: 'rgba(200, 200, 200, 0.2)' },
                                    ticks: { color: '#6b7280' }
                                },
                                x: {
                                    grid: { color: 'rgba(200, 200, 200, 0.1)' },
                                    ticks: { color: '#6b7280' }
                                },
                            }
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    </div>
    );
}