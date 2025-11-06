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
    <div className={cn("min-h-screen p-6 md:p-12 space-y-8", theme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">Contractor Performance</h2>
          <p className="text-gray-600 mt-1">Analyze contractor responsiveness and administrative consistency.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={theme.button.secondary}><Download className="h-4 w-4 mr-2" />Export Report</Button>
        </div>
      </div>

      <Card className={theme.card.container}>
        <CardHeader className={theme.card.header}>
          <CardTitle className={theme.card.title}>Contractor Responsiveness Roster</CardTitle>
          <CardDescription className={theme.card.description}>
            This data is compiled from system logs and their actions on the grievance and PPE modules.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase border border-gray-300 text-center">Contractor</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase border border-gray-300 text-center">Projects Completed</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase border border-gray-300 text-center">Last System Login</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase border border-gray-300 text-center">Responsiveness Status</TableHead>
                <TableHead className="text-center px-6 py-4 text-sm font-semibold text-gray-700 uppercase border border-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c, index) => (
                <TableRow 
                  key={c.name} 
                  className={cn(
                    "border border-gray-300 hover:bg-blue-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}
                >
                  <TableCell className="px-6 py-4 border border-gray-300">
                    <div className="flex items-center space-x-3">
                      <Avatar><AvatarFallback>{c.name.substring(0, 2)}</AvatarFallback></Avatar>
                      <span className="font-medium text-gray-800">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn("px-6 py-4 border border-gray-300 font-bold text-center", c.overdueTasks > 4 ? 'text-red-600' : 'text-gray-700')}>
                    {c.overdueTasks}
                  </TableCell>
                  <TableCell className="px-6 py-4 border border-gray-300 text-gray-600 text-center">{c.lastLogin}</TableCell>
                  <TableCell className="px-6 py-4 border border-gray-300 text-center">
                    <Badge 
                      className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                        c.status === 'Unresponsive' ? "bg-red-100 text-red-800 border border-red-200" :
                        c.status === 'Highly Responsive' ? "bg-green-100 text-green-800 border border-green-200" :
                        "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      )}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 border border-gray-300 text-center">
                    <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2"/>View Dashboard</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
