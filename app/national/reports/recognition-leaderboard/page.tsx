'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

    // --- Data for the new KPI Cards ---
    const kpiData = [
        { title: "Total Awards Granted", value: "532", description: "Nationwide this year", Icon: Trophy, color: "from-yellow-400 to-orange-500", iconColor: "text-yellow-400" },
        { title: "Recognized Workers", value: "350+", description: "Individuals awarded", Icon: Users, color: "from-sky-400 to-blue-500", iconColor: "text-sky-400" },
        { title: "Recognized Contractors", value: "85", description: "Companies awarded", Icon: Building, color: "from-purple-400 to-indigo-500", iconColor: "text-purple-400" },
        { title: "States with Programs", value: "28", description: "Actively participating", Icon: BarChart2, color: "from-green-400 to-emerald-500", iconColor: "text-green-400" }
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
        <div className="space-y-8 p-4 md:p-6 bg-slate-50 dark:bg-gray-900 rounded-lg">
            <div>
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Recognition & Leaderboards
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400">Analytics and rankings for worker, contractor, and state recognition programs.</p>
            </div>

            {/* Recognition KPIs -- Now Activated and Styled */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <Card key={index} className={`rounded-xl shadow-lg border-0 text-white overflow-hidden bg-gradient-to-br ${kpi.color} transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium text-white/80">{kpi.title}</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <kpi.Icon className={`h-5 w-5 ${kpi.iconColor} drop-shadow-lg`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold drop-shadow-md">{kpi.value}</div>
                            <p className="text-xs text-white/70">{kpi.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Custom 4 Cards Row (from image) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
                {/* Top State */}
                <Card className="rounded-xl border-0 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex flex-col justify-between">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-yellow-800">Top State</CardTitle>
                        <div className="p-2 bg-yellow-100 rounded-full">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-extrabold text-yellow-900">UP</div>
                    </CardContent>
                </Card>
                {/* Top District */}
                <Card className="rounded-xl border-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col justify-between">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-blue-800">Top District</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Award className="h-5 w-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-extrabold text-blue-900">Mumbai</div>
                    </CardContent>
                </Card>
                {/* Gold Tier */}
                <Card className="rounded-xl border-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex flex-col justify-between">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-yellow-800">Gold Tier</CardTitle>
                        <div className="p-2 bg-yellow-50 rounded-full">
                            <Trophy className="h-5 w-5 text-yellow-700" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-yellow-900">1,247</div>
                        <p className="text-sm text-yellow-800">Exceptional Performance</p>
                    </CardContent>
                </Card>
                {/* Silver Tier */}
                <Card className="rounded-xl border-0 bg-gradient-to-br from-blue-100 via-blue-200 to-gray-100 flex flex-col justify-between">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-blue-900">Silver Tier</CardTitle>
                        <div className="p-2 bg-blue-50 rounded-full">
                            <Award className="h-5 w-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-blue-900">2,389</div>
                        <p className="text-sm text-blue-900">High Performance</p>
                    </CardContent>
                </Card>
            </div>

            {/* National Awards Roster */}
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <CardTitle className="flex items-center text-2xl drop-shadow">
                        <Trophy className="h-7 w-7 mr-3 text-yellow-300"/>National Award Winners
                    </CardTitle>
                    <CardDescription className="text-white/80">Official roster of the highest national-level awards for the current year.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-100 dark:bg-slate-800">
                            <TableRow>
                                <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Award Category</TableHead>
                                <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Winner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white dark:bg-gray-800">
                            {nationalAwards.map(award => (
                                <TableRow key={award.category} className="hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-colors duration-200 border-b dark:border-gray-700">
                                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">{award.category}</TableCell>
                                    <TableCell className="font-bold text-purple-700 dark:text-purple-300">{award.winner}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Recognized Workers */}
                <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                        <CardTitle className="flex items-center text-2xl drop-shadow"><Star className="h-7 w-7 mr-3 text-yellow-200"/>State Leaderboard</CardTitle>
                        <CardDescription className="text-white/80">Top workers with the most awards nationwide.</CardDescription>
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
                <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-500 text-white">
                        <CardTitle className="flex items-center text-2xl drop-shadow"><Award className="h-7 w-7 mr-3 text-purple-200"/>District Leaderboard</CardTitle>
                        <CardDescription className="text-white/80">Top contractors with the most awards nationwide.</CardDescription>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Recognized Workers */}
                <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                        <CardTitle className="flex items-center text-2xl drop-shadow"><Star className="h-7 w-7 mr-3 text-yellow-200"/>Worker Leaderboard</CardTitle>
                        <CardDescription className="text-white/80">Top workers with the most awards nationwide.</CardDescription>
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
                <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-500 text-white">
                        <CardTitle className="flex items-center text-2xl drop-shadow"><Award className="h-7 w-7 mr-3 text-purple-200"/>Contractor Leaderboard</CardTitle>
                        <CardDescription className="text-white/80">Top contractors with the most awards nationwide.</CardDescription>
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
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 via-blue-100 to-emerald-100">
            <CardHeader className="bg-gradient-to-r from-fuchsia-500 via-blue-600 to-emerald-500 text-white">
                <CardTitle className="flex items-center text-2xl drop-shadow"><BarChart2 className="h-7 w-7 mr-3"/>Monthly Awards Distribution</CardTitle>
                <CardDescription className="text-white/80">Number of awards granted nationwide per month.</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-br from-white via-blue-50 to-emerald-50 dark:bg-gray-800 p-4">
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