

"use client";

import { useState, useEffect, useCallback } from 'react';
import { TransactionDto } from '@/lib/clientApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyPlaceholder } from "@/app/(home)/components/EmptyPlaceholder";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; 
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { useUser } from '../../../context/UserContext';
import TransactionForm from './TransactionForm';
import { fetchTransactions, addTransaction, deleteTransaction } from '../../actions/actions';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import TransactionsSkeleton from './TransactionsSkeleton';
interface Transaction {
    amount: number;
    dateAdded: string;
    type: string;
    description: string;
}

const TransactionsPage = ({ onTransactionAdded }: { onTransactionAdded: () => void }) => {
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useUser();

    const fetchTransactionsData = useCallback(async () => {
        if (currentUser?.id) {
            setIsLoading(true);
            try {
                const data = await fetchTransactions(currentUser.id as string);
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        fetchTransactionsData();
    }, [fetchTransactionsData]);

    const handleTransactionAdded = async (data: any) => {
        const result = await addTransaction(data);
        if (result.success) {
            setIsDialogOpen(false);
            fetchTransactionsData();
            onTransactionAdded();
        } else {
            console.error(result.error);
        }
    };

    const handleDelete = async (id: number, transactionType: string) => {
        if (!currentUser?.id) return;
        const result = await deleteTransaction(id, currentUser.id, transactionType);
        if (result.success) {
            fetchTransactionsData();
            onTransactionAdded();
        } else {
            console.error(result.error);
        }
    };

    if (isLoading) {
        return <TransactionsSkeleton />;
    }


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

  

    return (
        <div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>History</CardTitle>
                    <CardDescription>Recent expenses and transactions</CardDescription>
                    <div className="flex justify-end">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button> Add new transaction </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <TransactionForm onTransactionAdded={handleTransactionAdded} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction</TableHead>
                                <TableHead >Type</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(transaction => (
                                
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-bold">{transaction.description}</TableCell>
                                    <TableCell className="">{transaction.type}</TableCell>
                                    <TableCell>{transaction.dateAdded ? new Date(transaction.dateAdded).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell className="text-right">{transaction.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline">Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Transaction</DialogTitle>
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
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="ml-2"
                                                    size="sm"
                                                    variant="destructive"
                                                >
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Confirm Delete</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to delete this transaction? This action cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleDelete(transaction.id, transaction.type)}
                                                    >
                                                        Delete
                                                    </Button>
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
