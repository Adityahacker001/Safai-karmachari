'use client';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  Building, 
  Shield, 
  GraduationCap, 
  DollarSign,
  MapPin,
  Award,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DistrictDashboard() {
  const expenditureByCategory = {
    labels: ["Mechanization", "Welfare", "Training", "PPE"],
    data: [180, 75, 45, 85] // in Lakhs
  };

  const chartColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316']; // blue, purple, green, orange

  return (
    <div className={cn("p-6 md:p-8 space-y-6 md:space-y-8", contractorTheme.page.gradientBackground)}>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Units"
            value="156"
            icon={Building}
            color="blue"
            description="Active operational units"
          />
          <DashboardCard
            title="PPE Compliance"
            value="93.8%"
            icon={Shield}
            color="green"
            description="District average"
          />
          <DashboardCard
            title="Training Coverage"
            value="88.5%"
            icon={GraduationCap}
            color="orange"
            description="Workforce trained"
          />
          <DashboardCard
            title="Budget Utilization"
            value="72.3%"
            icon={DollarSign}
            color="purple"
            description="FY 2024-25"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Zone Performance"
            value="8.4"
            icon={BarChart3}
            color="indigo"
            description="Average score out of 10"
          />
          <DashboardCard
            title="Recognition Awards"
            value="47"
            icon={Award}
            color="green"
            description="Total recognitions"
          />
          <DashboardCard
            title="Coverage Areas"
            value="24"
            icon={MapPin}
            color="blue"
            description="Zones monitored"
          />
          <DashboardCard
            title="Efficiency Trend"
            value="Rising"
            icon={TrendingUp}
            color="green"
            description="Overall performance"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column: Budget Overview & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Overview */}
            <div className={cn(contractorTheme.card.container, "p-6")}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹3.87Cr</div>
                  <div className="text-sm text-gray-600">Total Allocated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₹2.80Cr</div>
                  <div className="text-sm text-gray-600">Utilized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">₹1.07Cr</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={cn(contractorTheme.card.container, "p-6")}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Tasks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className={cn(contractorTheme.button.secondary, "p-4 text-left text-sm w-full")}>
                  <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-blue-900">Compliance Summary</p>
                  <p className="text-sm text-blue-700">Generate monthly report</p>
                </button>
                <button className={cn(contractorTheme.button.secondary, "p-4 text-left text-sm w-full")}>
                  <DollarSign className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-green-900">Update Budget</p>
                  <p className="text-sm text-green-700">Record utilization data</p>
                </button>
                <button className={cn(contractorTheme.button.secondary, "p-4 text-left text-sm w-full")}>
                  <Award className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="font-medium text-purple-900">Review Recognitions</p>
                  <p className="text-sm text-purple-700">Process nominations</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Expenditure Chart */}
          <div className="lg:col-span-1">
            <Card className={cn(contractorTheme.card.container, "h-full")}>
                <CardHeader>
                    <CardTitle className="text-gray-800">Expenditure by Category</CardTitle>
                    <CardDescription className="text-gray-600">Visual breakdown of all spending.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                   <Pie
                      data={{
                        labels: expenditureByCategory.labels,
                        datasets: [{
                            label: 'Amount (in ₹ Lakhs)',
                            data: expenditureByCategory.data,
                            backgroundColor: chartColors,
                          }],
                      }}
                      options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                    />
                </CardContent>
            </Card>
          </div>
        </div>
        </div>
      
  );
}