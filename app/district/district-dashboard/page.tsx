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
  TrendingUp,
  // NEW: Added icons for the new cards
  Briefcase,
  Users,
  UserCog
} from 'lucide-react';
// REMOVED: Chart.js imports are no longer needed
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

// REMOVED: Chart.js registration is no longer needed
// ChartJS.register(ArcElement, Tooltip, Legend);

export default function DistrictDashboard() {
  // REMOVED: Chart data is no longer needed
  // const expenditureByCategory = { ... };
  // const chartColors = [...];

  return (
    <div className={cn("p-6 md:p-8 space-y-6 md:space-y-8 min-h-screen", contractorTheme.page.gradientBackground)}>
        {/* All Dashboard Cards in a single wrapping grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-10 flex-wrap">
          <DashboardCard
            title="Total Units"
            value="156"
            icon={Building}
            color="blue"
            description="Active operational units"
          />
          <DashboardCard
            title="Total Contractors"
            value="12"
            icon={Briefcase}
            color="indigo"
            description="Registered agencies"
          />
          <DashboardCard
            title="Total Workers"
            value="1,842"
            icon={Users}
            color="blue"
            description="Enrolled workforce"
          />
          <DashboardCard
            title="Nodal Officers"
            value="8"
            icon={UserCog}
            color="indigo"
            description="District officials assigned"
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
        </div>

        {/* UPDATED: Layout is now a single column as the chart was removed */}
        <div className="grid grid-cols-1 gap-8 mt-6">
          <div className="space-y-6">
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

          {/* REMOVED: The chart component was here */}
        </div>
    </div>
  );
}