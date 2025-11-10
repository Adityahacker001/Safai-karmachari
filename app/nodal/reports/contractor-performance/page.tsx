'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ContractorPerformanceReportPage() {
  const contractors = [
    { 
      name: "ABC Sanitation", 
      avgGrievanceResponse: "18 Hours", 
      ppeRequestFulfilled: "98%", 
      overdueTasks: 2, 
      lastLogin: "Today, 9:15 AM",
      status: "Highly Responsive"
    },
    { 
      name: "Rail Clean Services", 
      avgGrievanceResponse: "26 Hours", 
      ppeRequestFulfilled: "95%", 
      overdueTasks: 1, 
      lastLogin: "Today, 11:30 AM",
      status: "Consistent"
    },
    { 
      name: "Municipal Services", 
      avgGrievanceResponse: "38 Hours", 
      ppeRequestFulfilled: "90%", 
      overdueTasks: 5, 
      lastLogin: "Yesterday, 4:00 PM",
      status: "Needs Follow-up"
    },
    { 
      name: "City Maintenance", 
      avgGrievanceResponse: "52 Hours (SLA Miss)", 
      ppeRequestFulfilled: "85%", 
      overdueTasks: 8, 
      lastLogin: "3 days ago",
      status: "Unresponsive"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Contractor Performance
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Analyze contractor responsiveness and administrative consistency
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="text-xl font-bold">Contractor Responsiveness Roster</CardTitle>
          <CardDescription className="text-blue-100">
            This data is compiled from system logs and their actions on the grievance and PPE modules
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                  <TableHead className="text-gray-700 font-semibold py-4 px-6">Contractor</TableHead>
                  <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Overdue Tasks</TableHead>
                  <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Last System Login</TableHead>
                  <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Responsiveness Status</TableHead>
                  <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractors.map((c, index) => (
                  <TableRow 
                    key={c.name} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-l-4 ${
                      c.status === 'Unresponsive' ? "border-l-red-400 hover:border-l-red-500" :
                      c.status === 'Highly Responsive' ? "border-l-green-400 hover:border-l-green-500" :
                      "border-l-yellow-400 hover:border-l-yellow-500"
                    } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar><AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">{c.name.substring(0, 2)}</AvatarFallback></Avatar>
                        <span className="font-medium text-gray-900">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className={cn("text-center py-4 px-6 font-bold", c.overdueTasks > 4 ? 'text-red-600' : 'text-gray-700')}>
                      {c.overdueTasks}
                    </TableCell>
                    <TableCell className="text-center text-gray-600 py-4 px-6">{c.lastLogin}</TableCell>
                    <TableCell className="text-center py-4 px-6">
                      <Badge 
                        className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                          c.status === 'Unresponsive' ? "bg-red-100 text-red-800 hover:bg-red-200" :
                          c.status === 'Highly Responsive' ? "bg-green-100 text-green-800 hover:bg-green-200" :
                          c.status === 'Needs Follow-up' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                          "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        )}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-4 px-6">
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Eye className="h-4 w-4 mr-2"/>
                        View Dashboard
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
