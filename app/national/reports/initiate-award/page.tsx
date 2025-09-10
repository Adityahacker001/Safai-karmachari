import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import React from 'react';
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function InitiateAwardPage() {
  // Mock data for national-level nominations
  const nominations = [
    { id: 'NOM-NAT-01', nominee: "State of Kerala", category: "Best Performing State", nominator: "NCSK (Auto-generated)", status: "Approved" },
    { id: 'NOM-NAT-02', nominee: "State of West Bengal", category: "Most Improved State", nominator: "NCSK (Self-Nominated)", status: "Pending Final Vote" },
    { id: 'NOM-ST-WB-01', nominee: "Abishek Das (WB)", category: "National Safai Karmachari of the Year", nominator: "Escalated from West Bengal", status: "Approved" },
    { id: 'NOM-ST-TN-01', nominee: "Priya Krishnan (TN)", category: "National Safai Karmachari of the Year", nominator: "Escalated from Tamil Nadu", status: "Pending Final Vote" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-400 bg-clip-text text-transparent">Initiate Award</h1>
      <p className="text-base text-gray-600 dark:text-gray-300">This is the Initiate Award page. Add your award initiation workflow here.</p>
      <Card className="shadow-lg border-0 mt-8 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-50 text-gray-900 dark:text-white"> 
        <CardHeader className="bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 rounded-t-lg text-blue">
          <CardTitle className="text-lg font-semibold text-white">National Review Inbox</CardTitle>
          <CardDescription className="text-white/90">
            Final review and ratification of all national-level nominations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="rounded-b-lg overflow-hidden">
            <TableHeader className="bg-gradient-to-r from-primary-200 via-secondary-100 to-accent-100">
              <TableRow>
                <TableHead className="text-primary-700 font-semibold">Nominee</TableHead>
                <TableHead className="text-primary-700 font-semibold">Category</TableHead>
                <TableHead className="text-primary-700 font-semibold">Origin</TableHead>
                <TableHead className="text-primary-700 font-semibold">Status</TableHead>
                <TableHead className="text-right text-primary-700 font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nominations.map((nom) => (
                <TableRow key={nom.id} className="hover:bg-accent-50/60 transition">
                  <TableCell className="font-medium">{nom.nominee}</TableCell>
                  <TableCell>{nom.category}</TableCell>
                  <TableCell className="text-sm text-gray-500 dark:text-gray-300">{nom.nominator}</TableCell>
                  <TableCell>
                    {/* Colorful badge logic */}
                    {nom.status === 'Approved' && (
                      <Badge className="bg-green-500 text-white">{nom.status}</Badge>
                    )}
                    {nom.status === 'Pending Final Vote' && (
                      <Badge className="bg-blue-500 text-white">{nom.status}</Badge>
                    )}
                    {/* Add more status color logic as needed */}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={nom.status === 'Pending Final Vote' ? 'default' : 'outline'}
                          size="sm"
                          className={nom.status === 'Pending Final Vote' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'border-primary-200 text-primary-700'}
                          disabled={nom.status !== 'Pending Final Vote'}
                        >
                          {nom.status === 'Pending Final Vote' ? 'Review & Vote' : 'View'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-xl p-0 overflow-hidden">
                        <DialogHeader className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
                          <DialogTitle>Final Ratification: {nom.nominee}</DialogTitle>
                          <DialogDescription>Category: {nom.category}</DialogDescription>
                        </DialogHeader>
                        <div className="py-6 px-6 space-y-2 bg-white dark:bg-gray-900">
                          <p className="text-sm font-semibold">Summary Justification:</p>
                          <p className="text-sm p-3 bg-accent-50 dark:bg-gray-800 rounded-md border border-accent-200 dark:border-gray-700">"Nominated by the State of Tamil Nadu for exceptional bravery and consistent high performance."</p>
                        </div>
                        <DialogFooter className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex gap-2">
                          <DialogClose asChild>
                            <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">Approve & Confer Award</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
