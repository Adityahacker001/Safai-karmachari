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
    // State to manage which nomination is currently being reviewed
    const [selectedNomination, setSelectedNomination] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for nominations received from Nodal Officers
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
    <div className={cn("space-y-8", theme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Recognition Review</h2>
        <p className="text-gray-600 mt-1">Review and approve or reject award nominations submitted by Nodal Officers.</p>
      </div>

      <Card className={theme.card.container}>
        <CardHeader className={theme.card.header}>
          <CardTitle className={theme.card.title}>Nomination Inbox</CardTitle>
          <CardDescription className={theme.card.description}>
            {nominations.filter(n => n.status === 'Pending Review').length} nominations awaiting review.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Nominee</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Category</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Nominator</TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Status</TableHead>
                <TableHead className="text-right px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nominations.map((nom) => (
                <TableRow key={nom.id} className="border-t border-gray-100">
                  <TableCell className="px-6 py-4 font-medium text-gray-800">{nom.nominee}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">{nom.category}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">{nom.nominator}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                        nom.status === 'Approved' ? "bg-green-100 text-green-800 border border-green-200" : 
                        nom.status === 'Pending Review' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : 
                        "bg-red-100 text-red-800 border border-red-200"
                    )}>{nom.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right px-6 py-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReviewClick(nom)}
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
          <DialogContent className="sm:max-w-[625px] bg-white rounded-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">Review Form: {selectedNomination.id}</DialogTitle>
              <DialogDescription className="text-gray-500 pt-1">
                Reviewing nomination for <span className="font-semibold text-gray-700">{selectedNomination.nominee}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="font-semibold mb-2 text-sm text-gray-700">Nodal Officer's Justification</h3>
                <div className="text-sm p-4 bg-slate-50 rounded-lg border">
                  <p className="text-gray-700">"{selectedNomination.justification}"</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                 <h3 className="font-semibold text-sm text-gray-700">District Administrator's Review</h3>
                 <div>
                    <Label htmlFor="review-comments" className={theme.form.label}>Review Comments & Decision Rationale</Label>
                    <Textarea 
                      id="review-comments" 
                      placeholder="Provide the official rationale for your decision (e.g., 'Approved. Acknowledging exemplary proactive safety measures.')"
                      disabled={selectedNomination.status !== 'Pending Review'}
                      className={theme.form.input}
                    />
                 </div>
              </div>
            </div>
            <DialogFooter>
               {selectedNomination.status === 'Pending Review' ? (
                   <div className="flex justify-end space-x-3 w-full">
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold">
                          <X className="h-4 w-4 mr-2" />
                          Reject
                      </Button>
                      <Button className={cn(theme.button.primary, "py-2 px-6 text-base")}>
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                      </Button>
                   </div>
               ) : (
                    <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-center font-medium w-full text-sm border border-blue-200">
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