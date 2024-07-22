'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {Client } from '@/lib/clientApi';
import AIProcessingModal from './components/AIProcessingModal';
const invoiceSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    totalAmount: z.number().positive({ message: "Total Amount must be positive" }),
    dateAdded: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    category: z.string().min(1, { message: "Category is required" }),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const AddInvoice: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema),
    });
    const [file, setFile] = useState<File | null>(null);
    const [isAiGenerated, setIsAiGenerated] = useState({ title: false, totalAmount: false, category: false, dateAdded: false });
    const [isAiProcessing, setIsAiProcessing] = useState(false);
    const onSubmit: SubmitHandler<InvoiceFormData> = async (data) => {
        try {
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create invoice');
            }

            alert('Invoice created successfully!');
            // Reset form or redirect user
        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('Failed to create invoice');
        }
    };

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change event triggered");
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        console.log("File selected:", selectedFile.name);
        setFile(selectedFile);
        setIsAiProcessing(true);
        console.log("isAiProcessing set to true");
        try {
            console.log("Sending file for analysis");
            const client = new Client();
            const response = await client.postApiInvoicesAnalyze({ data: selectedFile, fileName: selectedFile.name });

            console.log("Analysis response:", response);
            if (response) {
                setValue('title', response.title || '');
                setValue('totalAmount', response.totalAmount || 0);
                setValue('category', response.category || '');
                setValue('dateAdded', response.date instanceof Date
                    ? response.date.toISOString().split('T')[0]
                    : typeof response.date === 'string'
                        ? response.date.split('T')[0]
                        : new Date().toISOString().split('T')[0]
                );
                setIsAiGenerated({ title: true, totalAmount: true, category: true, dateAdded: true });
            } else {
                throw new Error('Failed to analyze invoice');
            }
        } catch (error) {
            console.error('Error analyzing invoice:', error);
            alert('Failed to analyze invoice');
        } finally {
            setIsAiProcessing(false);
        }
    }
};

    return (
        <>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add Invoice</CardTitle>
                <CardDescription>Upload an invoice or enter details manually.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">Upload Invoice</Label>
                        <Input id="file" type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="title">Invoice Title</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.title ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <Input id="title" {...register("title")} className={isAiGenerated.title ? "border-blue-500 bg-blue-50" : ""} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="totalAmount">Total Amount</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.totalAmount ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <Input
                            id="totalAmount"
                            type="number"
                            step="0.01"
                            {...register("totalAmount", { valueAsNumber: true })}
                            className={isAiGenerated.totalAmount ? "border-blue-500 bg-blue-50" : ""}
                        />
                        {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="category">Category</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.category ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <Input
                            id="category"
                            {...register("category")}
                            className={isAiGenerated.category ? "border-blue-500 bg-blue-50" : ""}
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dateAdded">Date Added</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.dateAdded ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <Input
                            id="dateAdded"
                            type="date"
                            {...register("dateAdded")}
                            className={isAiGenerated.dateAdded ? "border-blue-500 bg-blue-50" : ""}
                        />
                        {errors.dateAdded && <p className="text-red-500 text-sm">{errors.dateAdded.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Invoice'}
                    </Button>
                </CardFooter>
            </form>
           
        </Card>
         <AIProcessingModal isOpen={isAiProcessing} />
         </>
    );
};

export default AddInvoice;