"use client";

import { useState, useEffect } from 'react';
import { TransactionDto, Client } from '@/lib/clientApi';  // Adjust the import path to where your Client class is located
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
import { useUser } from '../../../context/UserContext';


const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);
    const [open, setOpen] = useState(false);
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchTransactions = async () => {
            const client = new Client();
            try {
                const data = await client.getTransactions(currentUser?.id);
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    if (transactions.length === 0) {
        return (
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon />
                <EmptyPlaceholder.Title>No transactions</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    Add a new transaction to get started
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
                    <CardDescription>Recent expenses and transactions</CardDescription>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button> Add new transaction </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                            
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(transaction => (
                                <TableRow key={transaction.type}>
                                    <TableCell className="font-bold">{transaction.type}</TableCell>
                                    <TableCell> {transaction.dateAdded ? new Date(transaction.dateAdded).toDateString() : 'N/A'}</TableCell>
                                    <TableCell className="text-right">{transaction.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline">Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your transaction here. Click save when you are done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            defaultValue={transaction.type}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="amount" className="text-right">
                                                            Amount
                                                        </Label>
                                                        <Input
                                                            id="amount"
                                                            defaultValue={transaction.amount}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    {/* <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Delete</Button> */}
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
            </Card>
        </div>
    );
};

export default TransactionsPage;
