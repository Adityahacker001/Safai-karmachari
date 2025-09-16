'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function RecognitionReviewPage() {
    const [selectedNomination, setSelectedNomination] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nominations = [
        { id: 'NOM-003', nominee: "Priya Sharma", category: "Safety Champion", nominator: "P. Sharma (Central Zone B)", justification: "Identified and reported a critical equipment failure, preventing a potential accident.", status: "Pending Review" },
        { id: 'NOM-004', nominee: "Citizen Reporter #C-4567", category: "Civic Engagement Award", nominator: "A. Singh (North Zone A)", justification: "Provided timely and accurate reports that led to the prevention of 3 major incidents.", status: "Pending Review" },
        { id: 'NOM-001', nominee: "Abishek Das", category: "Best Safai Karmachari", nominator: "B. Adhikari (Central Zone A)", justification: "Consistently high performance (96% score) and has mentored new workers.", status: "Approved" },
        { id: 'NOM-002', nominee: "North Zone B Team", category: "Best ULB/Zone", nominator: "S. Devi (North Zone B)", justification: "Achieved zero MS incidents for two consecutive quarters.", status: "Approved" },
        { id: 'NOM-005', nominee: "Rail Clean Services", category: "Best Contractor", nominator: "B. Adhikari (Central Zone A)", justification: "Nomination was premature, performance has since declined.", status: "Rejected" },
    ];

    const handleReviewClick = (nomination: any) => {
        setSelectedNomination(nomination);
        setIsModalOpen(true);
    };

    return (
      <div className={cn("min-h-screen w-full p-6 md:p-12 space-y-8", theme.page?.gradientBackground || "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50")}> 
        <div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Recognition Review</h2>
          <p className="text-gray-600 mt-1">Review and approve or reject award nominations submitted by Nodal Officers.</p>
        </div>

        <Card className={theme.card.container}>
          <CardHeader className={theme.card.header}>
            <CardTitle className={theme.card.title}>Nomination Inbox</CardTitle>
            <CardDescription className={theme.card.description}>
              {nominations.filter(n => n.status === 'Pending Review').length} nominations awaiting review.
            </CardDescription>
          </CardHeader>

          {/* Excel-style Table - Improved Colorful Look */}
          <style>{`
            .excel-nomination-table {
              border-radius: 12px;
              overflow: hidden;
              border: 1.5px solid #c7d2fe;
              box-shadow: 0 4px 16px 0 rgba(99,102,241,0.10);
            }
            .excel-nomination-table thead tr {
              background: linear-gradient(90deg, #a5b4fc 0%, #f0abfc 100%);
            }
            .excel-nomination-table th {
              font-weight: 700;
              color: #374151;
              border-bottom: 2px solid #c7d2fe;
              padding: 14px 18px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .excel-nomination-table td {
              padding: 14px 18px;
              border-bottom: 1px solid #f3f4f6;
              background: #fff;
            }
            .excel-nomination-table tbody tr:nth-child(even) td {
              background: #f9fafb;
            }
            .excel-nomination-table tbody tr:nth-child(odd) td {
              background: #fff;
            }
            .excel-nomination-table tbody tr:hover td {
              background: #e0e7ff;
              color: #1e293b;
              transition: background 0.2s, color 0.2s;
            }
            /* Prevent badge color from changing on row hover or badge hover/focus for status badges */
            .excel-nomination-table .badge.bg-yellow-100,
            .excel-nomination-table .badge.bg-yellow-100:hover,
            .excel-nomination-table .badge.bg-yellow-100:focus,
            .excel-nomination-table tbody tr:hover .badge.bg-yellow-100 {
              background-color: #fef9c3 !important;
              color: #a16207 !important;
              border-color: #fde68a !important;
            }
            .excel-nomination-table .badge.bg-green-100,
            .excel-nomination-table .badge.bg-green-100:hover,
            .excel-nomination-table .badge.bg-green-100:focus,
            .excel-nomination-table tbody tr:hover .badge.bg-green-100 {
              background-color: #dcfce7 !important;
              color: #166534 !important;
              border-color: #bbf7d0 !important;
            }
            .excel-nomination-table .badge.bg-red-100,
            .excel-nomination-table .badge.bg-red-100:hover,
            .excel-nomination-table .badge.bg-red-100:focus,
            .excel-nomination-table tbody tr:hover .badge.bg-red-100 {
              background-color: #fee2e2 !important;
              color: #991b1b !important;
              border-color: #fecaca !important;
            }
            .excel-nomination-table td, .excel-nomination-table th {
              border-right: 1px solid #e0e7ff;
            }
            .excel-nomination-table td:last-child, .excel-nomination-table th:last-child {
              border-right: none;
            }
          `}</style>
          <CardContent className="p-0">
            <Table className="excel-nomination-table w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nominee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Nominator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nominations.map((nom, idx) => (
                  <TableRow key={nom.id}>
                    <TableCell className="font-medium text-gray-800">{nom.nominee}</TableCell>
                    <TableCell className="text-gray-700">{nom.category}</TableCell>
                    <TableCell className="text-gray-700">{nom.nominator}</TableCell>
                    <TableCell>
                      <Badge className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                          nom.status === 'Approved' ? "bg-green-100 text-green-800 border border-green-200" : 
                          nom.status === 'Pending Review' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : 
                          "bg-red-100 text-red-800 border border-red-200"
                      )}>{nom.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReviewClick(nom)}
                        className="hover:bg-blue-200 hover:text-blue-900 transition-colors"
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedNomination && (
  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent className="sm:max-w-[625px] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl border border-purple-300 overflow-hidden animate-fadeIn">
      
      {/* Modal Header */}
      <DialogHeader className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-5 rounded-t-3xl shadow-lg">
        <DialogTitle className="text-2xl font-extrabold text-white drop-shadow-md">{`Review Form: ${selectedNomination.id}`}</DialogTitle>
        <DialogDescription className="text-white/90 pt-1 text-sm">
          Reviewing nomination for <span className="font-semibold">{selectedNomination.nominee}</span>.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-6 px-6">
        {/* Justification Section */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 rounded-2xl p-4 shadow-inner border-l-8 border-pink-400 hover:scale-[1.02] transition-transform">
          <h3 className="font-bold mb-2 text-purple-800 text-sm uppercase tracking-wide">Nodal Officer's Justification</h3>
          <div className="text-sm p-4 bg-white/80 rounded-xl border border-purple-200 shadow-sm">
            <p className="text-purple-900 italic">"{selectedNomination.justification}"</p>
          </div>
        </div>

        {/* Admin Review Section */}
        <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-blue-100 rounded-2xl p-4 shadow-inner border-l-8 border-blue-400 hover:scale-[1.02] transition-transform">
          <h3 className="font-bold text-sm text-blue-800 mb-2 uppercase tracking-wide">District Administrator's Review</h3>
          <div className="space-y-2">
            <Label htmlFor="review-comments" className="text-blue-700 font-semibold">Review Comments & Decision Rationale</Label>
            <Textarea
              id="review-comments"
              placeholder="Provide the official rationale for your decision..."
              disabled={selectedNomination.status !== 'Pending Review'}
              className="bg-blue-50 border-2 border-blue-300 text-blue-900 placeholder-blue-500 rounded-lg shadow-inner focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <DialogFooter className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-4 flex justify-end space-x-3 border-t-2 border-purple-300 rounded-b-3xl">
        {selectedNomination.status === 'Pending Review' ? (
          <>
            <Button variant="outline" className="border-red-400 text-red-700 hover:bg-red-100 hover:text-red-900 font-bold flex items-center py-2 px-5 rounded-xl shadow-md transition-all transform hover:scale-105">
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button className="bg-gradient-to-r from-green-400 via-lime-400 to-green-500 hover:from-green-500 hover:to-lime-400 text-white font-bold flex items-center py-2 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105">
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </>
        ) : (
          <div className="p-3 bg-blue-200 text-blue-900 rounded-xl text-center font-bold w-full text-sm border border-blue-300 shadow-md">
            This nomination has already been {selectedNomination.status.toLowerCase()}. No further action is required.
          </div>
        )}
      </DialogFooter>

    </DialogContent>
  </Dialog>
)}

      </div>
    );
}
