'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import  { Client, BalanceDto  } from '@/lib/clientApi';
import { useEffect, useState } from "react";
import TransactionsPage from "./components/Invoices"; 
import { useUser } from '@/context/UserContext';

export default function Home() {
    const [balance, setBalance] = useState<BalanceDto>(new BalanceDto());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const client = new Client();
    const { currentUser } = useUser();

    useEffect(() => {
        if (currentUser) {
            console.log('Fetching balance for user:', currentUser.id);
            client.getBalance(currentUser.id)
                .then(data => {
                    setBalance(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching balance:', err);
                    setError('Error fetching balance');
                    setLoading(false);
                });
        }
    }, [currentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
   
    
  
    return (
        <>
      
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Balance 
                        </CardTitle>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{balance.totalAmount}</div>
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
                        <div className="text-2xl font-bold">€{balance.totalIncomesAmount}</div>
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
                        <div className="text-2xl font-bold">€{balance.totalExpensesAmount}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
</div>
        
            <TransactionsPage/>
        </>
       
    );

     
}