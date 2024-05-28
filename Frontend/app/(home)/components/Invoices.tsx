// Assuming this code resides in app/invoices/page.tsx to align with the Next.js App Router convention.
"use client";

import { useState, useEffect } from 'react';
import { InvoiceDto, Client } from '@/lib/clientApi';  // Adjust the import path to where your Client class is located
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EmptyPlaceholder } from "@/app/(home)/components/EmptyPlaceholder";
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateInvoicePage from '@/components/InputInvoice';

interface InvoicesPageProps {
    invoices: InvoiceDto[];
}

const InvoicesPage = ({ invoices }: InvoicesPageProps) => {
    const [invoiceList, setInvoiceList] = useState(invoices);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id: number | undefined) => {
        if (id !== undefined) {
            const client = new Client();
            try {
                await client.deleteInvoices(id);
                setInvoiceList(invoiceList.filter(invoice => invoice.id !== id));
                setOpen(false); // Close the dialog
                console.log(`Deleted invoice with id: ${id}`);
            } catch (error) {
                console.error("Failed to delete invoice:", error);
            }
        }
    };
    if (invoices.length === 0) {
        return (
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon />
                <EmptyPlaceholder.Title>No invoices</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    Add a new invoice to get started
                </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
        );
    }


    function handleEdit(id: number | undefined): void {
        throw new Error('Function not implemented.');
    }

  
    return (
        <div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>History</CardTitle>
                    <CardDescription>Recent expenses and invoices</CardDescription>
                    <div className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button> Add new invoice </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">

                           

                                    <CreateInvoicePage />
                         

                        </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {invoices.map(invoice => (
                            <TableRow key={invoice.id}>
                    
                                <TableCell className="font-bold">{invoice.invoiceName}</TableCell>
                                <TableCell>{invoice.date.toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">Edit</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        defaultValue="Pedro Duarte"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">
                                                        Username
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        defaultValue="@peduarte"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="destructive" onClick={() => handleDelete(invoice.id)}>Delete</Button>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                </TableRow>
                    
                        ))}
                        </TableBody>
                 </Table>
        </CardContent>
    </Card >
        </div>
    );
};

export default InvoicesPage;