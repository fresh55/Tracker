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
            {currentUser && currentUser.email ? (
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">Welcome, {currentUser.email.split('@')[0]}</span>
                </div>
            ) : (
                <Skeleton className="h-8 w-32" />
            )}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    <Card className="bg-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Balance</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(balance.totalAmount)}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">
                +20.1% from last month
            </p>
        </CardContent>
    </Card>
    <Card className="bg-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Incomes</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(balance.totalIncomesAmount)}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">
                +20.1% from last month
            </p>
        </CardContent>
    </Card>
    <Card className="bg-white shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expenses</CardTitle>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(balance.totalExpensesAmount)}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">
                +20.1% from last month
            </p>
        </CardContent>
    </Card>
</div>
            <TransactionsPage onTransactionAdded={handleTransactionAdded} />
        </>
    );
}