'use client';

import { contractorTheme } from "@/lib/theme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Star, BarChart2, Filter, Award } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RecognitionLeaderboardPage() {

    // Mock Data
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
    
    const nationalAwards = [
        { category: "Best Performing State", winner: "State of Kerala" },
        { category: "Most Improved State", winner: "State of West Bengal" },
        { category: "Best District (Innovation)", winner: "Pune District, Maharashtra" },
        { category: "National Safai Karmachari of the Year", winner: "Ram Singh (East Delhi)" },
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Awards Granted',
            data: [65, 59, 80, 81, 56, 55, 40, 92],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
        }],
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-blue-700 mb-1">Recognition & Leaderboards</h2>
                <p className="text-base text-gray-600 dark:text-gray-300">Analytics and rankings for worker, contractor, and state recognition programs.</p>
            </div>

            {/* Recognition KPIs */}
            {/*
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="rounded-xl shadow-lg bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-50 text-gray-900 dark:text-white border-0">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Awards Granted</CardTitle>
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">532</div>
                    <p className="text-xs text-gray-500">Nationwide this year</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-lg bg-gradient-to-br from-blue-100 via-blue-50 to-accent-50 text-gray-900 dark:text-white border-0">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">Recognized Workers</CardTitle>
                    <Star className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">350+</div>
                    <p className="text-xs text-gray-500">Individuals awarded</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-lg bg-gradient-to-br from-purple-100 via-purple-50 to-accent-50 text-gray-900 dark:text-white border-0">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">Recognized Contractors</CardTitle>
                    <Award className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">85</div>
                    <p className="text-xs text-gray-500">Contractors awarded</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-lg bg-gradient-to-br from-green-100 via-green-50 to-accent-50 text-gray-900 dark:text-white border-0">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500">States with Programs</CardTitle>
                    <BarChart2 className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">28</div>
                    <p className="text-xs text-gray-500">Actively participating</p>
                  </CardContent>
                </Card>
            </div>
            */}

            {/* National Awards Roster */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-50 text-gray-900 dark:text-white">
                <CardHeader className="bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 rounded-t-lg text-white">
                    <CardTitle className="flex items-center text-blue-600 drop-shadow"><Trophy className="h-5 w-5 mr-2 text-amber-300"/>National Award Winners (Current Year)</CardTitle>
                    <CardDescription className="text-white/90">Official roster of the highest national-level awards.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table className="rounded-b-lg overflow-hidden">
                        <TableHeader className="bg-gradient-to-r from-primary-200 via-secondary-100 to-accent-100">
                            <TableRow>
                                <TableHead className="text-primary-700 font-semibold">Award Category</TableHead>
                                <TableHead className="text-primary-700 font-semibold">Winner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nationalAwards.map(award => (
                                <TableRow key={award.category} className="hover:bg-accent-50/60 transition">
                                    <TableCell className="font-medium">{award.category}</TableCell>
                                    <TableCell className="font-bold">{award.winner}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Recognized Workers */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100 via-blue-50 to-accent-50 text-gray-900 dark:text-white">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-lg text-white">
                        <CardTitle className="flex items-center text-blue-200 drop-shadow"><Star className="h-5 w-5 mr-2 text-amber-200"/>Worker Leaderboard</CardTitle>
                        <CardDescription className="text-white/90">Top 3 workers with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table className="rounded-b-lg overflow-hidden">
                            <TableHeader className="bg-gradient-to-r from-blue-200 via-blue-50 to-accent-100">
                                <TableRow>
                                    <TableHead className="text-blue-700 font-semibold">Rank</TableHead>
                                    <TableHead className="text-blue-700 font-semibold">Name & District</TableHead>
                                    <TableHead className="text-center text-blue-700 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topWorkers.map(worker => (
                                    <TableRow key={worker.rank} className="hover:bg-blue-50/60 transition">
                                        <TableCell className="font-bold">{worker.rank}</TableCell>
                                        <TableCell>{worker.name}<p className="text-xs text-gray-500">{worker.district}</p></TableCell>
                                        <TableCell className="text-center font-semibold">{worker.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Top Performing Contractors */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-100 via-purple-50 to-accent-50 text-gray-900 dark:text-white">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-t-lg text-white">
                        <CardTitle className="flex items-center text-blue-200 drop-shadow"><Award className="h-5 w-5 mr-2 text-purple-200"/>Contractor Leaderboard</CardTitle>
                        <CardDescription className="text-white/90">Top 3 contractors with the most awards nationwide.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table className="rounded-b-lg overflow-hidden">
                            <TableHeader className="bg-gradient-to-r from-purple-200 via-purple-50 to-accent-100">
                                <TableRow>
                                    <TableHead className="text-purple-700 font-semibold">Rank</TableHead>
                                    <TableHead className="text-purple-700 font-semibold">Name & State</TableHead>
                                    <TableHead className="text-center text-purple-700 font-semibold">Total Awards</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topContractors.map(contractor => (
                                    <TableRow key={contractor.rank} className="hover:bg-purple-50/60 transition">
                                        <TableCell className="font-bold">{contractor.rank}</TableCell>
                                        <TableCell>{contractor.name}<p className="text-xs text-gray-500">{contractor.state}</p></TableCell>
                                        <TableCell className="text-center font-semibold">{contractor.awards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Awards Distribution Chart */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-50 text-gray-900 dark:text-white">
                <CardHeader className="bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 rounded-t-lg text-white">
                    <CardTitle className="flex items-center text-blue-200 drop-shadow"><BarChart2 className="h-5 w-5 mr-2"/>Monthly Awards Distribution</CardTitle>
                    <CardDescription className="text-white/90">Number of awards granted nationwide per month.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-80 p-6">
                        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}