// Assuming this code resides in app/invoices/create/page.tsx to align with the Next.js App Router convention.
"use client";

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Client, CreateInvoiceCommand } from '@/lib/clientApi'; // Adjust the import path as needed
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

// Define a schema for the form's data using Zod
const invoiceSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    totalAmount: z.number().positive({ message: "Total Amount must be positive" }),
    dateAdded: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }), // Ensure it's a valid date string
});

// Type for the form's data, inferred from the schema
type InvoiceFormData = z.infer<typeof invoiceSchema>;

const CreateInvoicePage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema),
    });

    const onSubmit: SubmitHandler<InvoiceFormData> = async (data) => {
        try {
            const client = new Client(); // Assuming the base URL and fetch implementation are set by default
            await client.createInvoice(new CreateInvoiceCommand({
                title: data.title,
                totalAmount: data.totalAmount,
                dateAdded: new Date(data.dateAdded), // Convert string to Date object
            }));
            alert("Invoice created successfully!");
        } catch (error) {
            console.error("Failed to create invoice", error);
            alert("Failed to create invoice");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className=" m-2">
                <CardHeader>
                    <CardTitle>Add Expense</CardTitle>
                    <CardDescription>Enter the details of your new expense.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Expense Name</Label>
                        <Input id="title"
                            {...register("title")}
                            type="text"
                            placeholder="Enter invoice title" />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount"
                            {...register("totalAmount", { valueAsNumber: true })}
                            type="number"
                            placeholder="Enter total amount" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dateAdded">Date</Label>
                        <Input id="dateAdded"
                            {...register("dateAdded")}
                            type="date" />
                        {errors.dateAdded && <p>{errors.dateAdded.message}</p>} </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Invoice'}
                    </Button>
                </CardFooter>
            </Card>
          
        
        </form>
    );
};

export default CreateInvoicePage;