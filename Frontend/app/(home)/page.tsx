'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Client, InvoiceDto } from '@/lib/clientApi';
import { useEffect, useState } from "react";
import InvoicesPage from "@/app/(home)/components/Invoices";
export default function Home() {
    const [invoices, setInvoices] = useState<InvoiceDto[]>([]);
    const [totalAmount, setTotalAmount] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const client = new Client();
        // Load all invoices
        client.getAllInvoices()
            .then(data => {
                setInvoices(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch invoices", error);
                setLoading(false);
            });

        // Load total invoice amount
        client.getTotalInvoiceAmount()
            .then(total => {
                setTotalAmount(`€${total.toLocaleString()}`);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch total invoice amount", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
                        <div className="text-2xl font-bold">{totalAmount}</div>
                        <p className="text-xs text-white">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Income
                        </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
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
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
</div>
        
            <InvoicesPage invoices={invoices} />
        </>
       
    );

     
}