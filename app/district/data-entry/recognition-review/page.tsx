'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search } from "lucide-react";
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
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
              <style jsx>{`
                .loader {
                  --c: no-repeat linear-gradient(#4f46e5 0 0);
                  background: 
                    var(--c),var(--c),var(--c),
                    var(--c),var(--c),var(--c),
                    var(--c),var(--c),var(--c);
                  background-size: 16px 16px;
                  animation: 
                    l32-1 1s infinite,
                    l32-2 1s infinite;
                }
                @keyframes l32-1 {
                  0%,100% {width:45px;height: 45px}
                  35%,65% {width:65px;height: 65px}
                }
                @keyframes l32-2 {
                  0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
                  60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
                }
              `}</style>
              <div className="loader"></div>
            </div>
        );
    }

    const nominations = [
        { id: 'NOM-003', nominee: "Priya Sharma", category: "Safety Champion", nominator: "P. Sharma (Central Zone B)", justification: "Identified and reported a critical equipment failure, preventing a potential accident.", status: "Pending Review" },
        { id: 'NOM-004', nominee: "Citizen Reporter #C-4567", category: "Civic Engagement Award", nominator: "A. Singh (North Zone A)", justification: "Provided timely and accurate reports that led to the prevention of 3 major incidents.", status: "Pending Review" },
        { id: 'NOM-001', nominee: "Abishek Das", category: "Best Safai Karmachari", nominator: "B. Adhikari (Central Zone A)", justification: "Consistently high performance (96% score) and has mentored new workers.", status: "Approved" },
        { id: 'NOM-002', nominee: "North Zone B Team", category: "Best ULB/Zone", nominator: "S. Devi (North Zone B)", justification: "Achieved zero MS incidents for two consecutive quarters.", status: "Approved" },
        { id: 'NOM-005', nominee: "Rail Clean Services", category: "Best Contractor", nominator: "B. Adhikari (Central Zone A)", justification: "Nomination was premature, performance has since declined.", status: "Rejected" },
    ];

    // Filter nominations based on search term
    const filteredNominations = nominations.filter(nomination => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            nomination.id.toLowerCase().includes(searchLower) ||
            nomination.nominee.toLowerCase().includes(searchLower) ||
            nomination.category.toLowerCase().includes(searchLower) ||
            nomination.nominator.toLowerCase().includes(searchLower) ||
            nomination.status.toLowerCase().includes(searchLower) ||
            nomination.justification.toLowerCase().includes(searchLower)
        );
    });

    const handleReviewClick = (nomination: any) => {
        setSelectedNomination(nomination);
        setIsModalOpen(true);
    };

    return (
      <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6"> 
        {/* Professional Header */}
        <header className="bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
              Recognition Review
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg">
              Review and approve or reject award nominations submitted by Nodal Officers
            </p>
          </div>
        </header>

        <Card className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
          <CardHeader className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl sm:rounded-t-2xl border-b border-blue-100">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Nomination Inbox</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
              {nominations.filter(n => n.status === 'Pending Review').length} nominations awaiting review.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 md:p-6">
            {/* Global Search and Export */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search nominations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base font-medium">
                  Export Excel
                </button>
                <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base font-medium">
                  Export PDF
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                  <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Nominee</TableHead>
                  <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Category</TableHead>
                  <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Nominator</TableHead>
                  <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Status</TableHead>
                  <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white/50 backdrop-blur-sm">
                {filteredNominations.map((nom, idx) => (
                  <TableRow key={nom.id} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                    <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-800">{nom.nominee}</TableCell>
                    <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{nom.category}</TableCell>
                    <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{nom.nominator}</TableCell>
                    <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                      <Badge className={cn("font-semibold text-xs py-1 px-2 sm:px-3 rounded-full",
                          nom.status === 'Approved' ? "bg-green-100 text-green-800 border border-green-200" : 
                          nom.status === 'Pending Review' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : 
                          "bg-red-100 text-red-800 border border-red-200"
                      )}>{nom.status}</Badge>
                    </TableCell>
                    <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReviewClick(nom)}
                        className="hover:bg-blue-200 hover:text-blue-900 transition-colors text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

        {selectedNomination && (
  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent
      hideClose
      style={{ background: 'white', border: '0' }}
      className="max-w-2xl p-0 shadow-2xl rounded-3xl overflow-hidden max-h-[95vh] overflow-y-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 border-0 bg-transparent ring-0 mx-0 my-0 outline-none"
    >
        {/* Modal Header (grievance-style) */}
        <DialogClose asChild>
          <button className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white hover:bg-gray-200 focus:outline-none shadow">
            <X className="h-6 w-6 text-gray-800" />
          </button>
        </DialogClose>
        <DialogHeader className="relative p-0 w-full rounded-t-3xl shadow-lg mb-0">
          {/* background layer extended slightly to cover outer rounded corners */}
          <div className="absolute -left-2 -right-2 -top-2 bottom-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-3xl" />
          <div className="relative p-8 text-white z-20">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-md">{`Review Form: ${selectedNomination.id}`}</DialogTitle>
            <DialogDescription className="text-white/90 pt-1 text-xs sm:text-sm">
              Reviewing nomination for <span className="font-semibold">{selectedNomination.nominee}</span>.
            </DialogDescription>
          </div>
        </DialogHeader>
        {/* Thin white strip beneath the gradient header to match grievance appearance */}
        <div className="h-3 bg-white w-full" />

      <div className="space-y-4 sm:space-y-6 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6">
        {/* Justification Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/30 border-l-4 border-l-purple-500">
          <h3 className="font-bold mb-2 text-purple-800 text-xs sm:text-sm uppercase tracking-wide">Nodal Officer's Justification</h3>
          <div className="text-xs sm:text-sm p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-800 italic">"{selectedNomination.justification}"</p>
          </div>
        </div>

        {/* Admin Review Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/30 border-l-4 border-l-blue-500">
          <h3 className="font-bold text-xs sm:text-sm text-blue-800 mb-2 uppercase tracking-wide">District Administrator's Review</h3>
          <div className="space-y-2">
            <Label htmlFor="review-comments" className="text-blue-700 font-semibold text-xs sm:text-sm">Review Comments & Decision Rationale</Label>
            <Textarea
              id="review-comments"
              placeholder="Provide the official rationale for your decision..."
              disabled={selectedNomination.status !== 'Pending Review'}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <DialogFooter className="bg-gray-50 p-3 sm:p-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-gray-200 rounded-b-xl sm:rounded-b-2xl">
        {selectedNomination.status === 'Pending Review' ? (
          <>
            <Button variant="outline" className="border-red-400 text-red-700 hover:bg-red-100 hover:text-red-900 font-semibold flex items-center justify-center py-2 px-3 sm:px-4 md:px-5 rounded-lg sm:rounded-xl shadow-sm transition-all text-xs sm:text-sm">
              <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Reject
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold flex items-center justify-center py-2 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl shadow-lg transition-all text-xs sm:text-sm">
              <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Approve
            </Button>
          </>
        ) : (
          <div className="p-2 sm:p-3 bg-blue-100 text-blue-900 rounded-lg sm:rounded-xl text-center font-semibold w-full text-xs sm:text-sm border border-blue-200 shadow-sm">
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
