'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Send, FileText } from "lucide-react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for directives sent
const sentDirectives = [
	{
		id: "DIR-101",
		to: "State, District, Nodal",
		subject: "Quarterly Safety Audit Mandate",
		date: "2025-09-01",
		deadline: "2025-10-15",
		status: "In Progress",
		priority: "High",
		moca: "MOCA-2025-01",
	},
	{
		id: "DIR-102",
		to: "State, District",
		subject: "Mechanization Progress Submission",
		date: "2025-08-10",
		deadline: "2025-08-31",
		status: "Overdue",
		priority: "Medium",
		moca: "MOCA-2025-02",
	},
	{
		id: "DIR-103",
		to: "All States",
		subject: "Annual Safety Equipment Distribution",
		date: "2025-07-01",
		deadline: "2025-07-31",
		status: "Completed",
		priority: "High",
		moca: "MOCA-2025-03",
	},
	{
		id: "DIR-104",
		to: "Lagging States (12)",
		subject: "Implementation of New Compensation Guidelines",
		date: "2025-06-15",
		deadline: "2025-08-15",
		status: "In Progress",
		priority: "High",
		moca: "MOCA-2025-04",
	},
	{
		id: "DIR-105",
		to: "All States",
		subject: "MS Act 2013 - Section 14 Compliance",
		date: "2025-05-01",
		deadline: "2025-06-01",
		status: "Completed",
		priority: "Medium",
		moca: "MOCA-2025-05",
	},
	{
		id: "DIR-106",
		to: "District, Nodal",
		subject: "Monthly Grievance Redressal Report",
		date: "2025-09-20",
		deadline: "2025-10-05",
		status: "Pending",
		priority: "High",
		moca: "MOCA-2025-06",
	},
];

export default function DirectiveTrackingReportPage() {
	const [showModal, setShowModal] = useState(false);

	// Summary counts
	const highPriorityCount = sentDirectives.filter((d) => d.priority === "High").length;

	return (
		<div className="space-y-8 p-6 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 rounded-xl shadow-lg min-h-screen">
			<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">
						Directive Tracking Report
					</h1>
					<p className="text-gray-700 mt-2">
						Track issued directives to lower hierarchy, with MOCA data alignment
					</p>
				</div>
				<div className="flex flex-col gap-4">
					{/* <Button
						className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
						onClick={() => setShowModal(true)}
					>
						<Plus className="w-5 h-5" />
						Issue New Directive
					</Button> */}
					{showModal && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
							<div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 relative">
								<div
									className="-mx-8 -mt-8 mb-8 rounded-t-2xl px-8 py-4"
									style={{
										background:
											"linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)",
									}}
								>
									<h2 className="text-2xl font-bold text-black text-center">
										Issue New Directive
									</h2>
								</div>
								<form className="space-y-5">
									<div>
										<label className="block text-gray-700 font-medium mb-1">
											Recipients
										</label>
										<select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
											<option>All States</option>
											<option>State 1</option>
											<option>State 2</option>
										</select>
									</div>
									<div>
										<label className="block text-gray-700 font-medium mb-1">
											Title
										</label>
										<input
											type="text"
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
											placeholder="Enter directive title"
										/>
									</div>
									<div>
										<label className="block text-gray-700 font-medium mb-1">
											Message
										</label>
										<textarea
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
											rows={4}
											placeholder="Enter directive message"
										/>
									</div>
									<div>
										<label className="block text-gray-700 font-medium mb-1">
											Priority
										</label>
										<select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
											<option>High</option>
											<option>Medium</option>
											<option>Low</option>
										</select>
									</div>
									<div className="flex justify-end gap-3 pt-2">
										<button
											type="button"
											className="px-5 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100"
											onClick={() => setShowModal(false)}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow hover:from-blue-500 hover:to-blue-700"
										>
											Send Directive
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl shadow-lg text-white">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium">Issued Directives</p>
							<p className="text-3xl font-bold">{sentDirectives.length}</p>
							<p className="text-sm opacity-90">
								Pending: {sentDirectives.filter((d) => d.status === "Pending" || d.status === "In Progress").length}
							</p>
						</div>
						<Send className="w-10 h-10 opacity-90" />
					</div>
				</div>
				<div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl shadow-lg text-white">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium">High Priority</p>
							<p className="text-3xl font-bold">{highPriorityCount}</p>
							<p className="text-sm opacity-90">Requiring attention</p>
						</div>
						<FileText className="w-10 h-10 opacity-90" />
					</div>
				</div>
			</div>

			{/* Issued Directives Table */}
			<div className="bg-white rounded-xl shadow-xl overflow-hidden">
				<div className="border-b border-gray-200 bg-gradient-to-r from-pink-50 to-yellow-50">
					<nav className="-mb-px flex">
						<span className="py-4 px-6 text-sm font-medium border-b-4 border-pink-500 text-pink-700 bg-pink-50">
							Directives Issued
						</span>
					</nav>
				</div>
				<div className="p-4 overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gradient-to-r from-purple-400 to-pink-500">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Directive ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									To
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Subject
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Deadline
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Priority
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
									MOCA
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100">
							{sentDirectives.map((d, index) => (
								<tr key={d.id} className={index % 2 === 0 ? "bg-purple-50/50 hover:bg-purple-100/70" : "hover:bg-purple-100/70"}>
									<td className="px-6 py-4 whitespace-nowrap font-semibold text-purple-800">
										{d.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-gray-700">{d.to}</td>
									<td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{d.subject}</td>
									<td className="px-6 py-4 whitespace-nowrap text-gray-600">{d.date}</td>
									<td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">{d.deadline}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
											d.priority === "High"
												? "bg-red-100 text-red-800 border border-red-300"
												: d.priority === "Medium"
												? "bg-yellow-100 text-yellow-900 border border-yellow-300"
												: "bg-green-100 text-green-800 border border-green-300"
										}`}>{d.priority}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
											d.status === "Active"
											? "bg-blue-100 text-blue-800 border border-blue-300"
											: d.status === "Completed"
											? "bg-green-100 text-green-800 border border-green-300"
											: d.status === "Pending"
											? "bg-yellow-100 text-yellow-800 border border-yellow-300"
											: d.status === "In Progress"
											? "bg-orange-100 text-orange-800 border border-orange-300"
											: d.status === "Overdue"
											? "bg-red-100 text-red-800 border border-red-300"
											: "bg-gray-100 text-gray-800 border border-gray-300"
										}`}>{d.status}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="px-2 py-1 rounded bg-gray-200 text-xs font-mono text-gray-700">{d.moca}</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<Dialog>
											<DialogTrigger asChild>
												<Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View</Button>
											</DialogTrigger>
											<DialogContent className="max-w-2xl">
												<DialogHeader>
													<DialogTitle>Directive Details</DialogTitle>
													<DialogDescription>More info about this directive and MOCA data.</DialogDescription>
												</DialogHeader>
												<div className="py-4">
													<div className="rounded-2xl shadow-lg bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-2">
														<p className="font-semibold">Directive: {d.subject}</p>
														<p>MOCA: {d.moca}</p>
														{/* Add more details as needed */}
													</div>
												</div>
												<DialogFooter><Button className={cn(contractorTheme.button.secondary)}>Close</Button></DialogFooter>
											</DialogContent>
										</Dialog>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}