'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Client, BalanceDto } from '@/lib/clientApi';
import { useEffect, useState } from "react";
import TransactionsPage from "./components/Invoices";
import { useUser } from '@/context/UserContext';
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from '@/lib/utils';
import { useCallback } from "react";
export default function Home() {
    const [balance, setBalance] = useState<BalanceDto>(new BalanceDto());
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useUser();

    const fetchBalance = useCallback(async () => {
        if (currentUser && currentUser.id) {
            setIsLoading(true);
            try {
                const client = new Client();
                const data = await client.getBalance(currentUser.id);
                setBalance(data);
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    const handleTransactionAdded = () => {
        fetchBalance();
    };

    return (
        <>
            {currentUser ? (
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">Welcome, {currentUser.email}</span>
                </div>
            ) : (
                <Skeleton className="h-8 w-32" />
            )}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-24 bg-white/20" />
                        ) : (
                            <div className="text-2xl font-bold">{formatCurrency(balance.totalAmount)}</div>
                        )}
                        <p className="text-xs text-white">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Incomes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold">{formatCurrency(balance.totalIncomesAmount)}</div>
                        )}
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Expenses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold">{formatCurrency(balance.totalExpensesAmount)}</div>
                        )}
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <TransactionsPage onTransactionAdded={handleTransactionAdded} />
        </>
    );
}