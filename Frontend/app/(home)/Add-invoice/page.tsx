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
    const [isAiGenerated, setIsAiGenerated] = useState({ totalAmount: false, category: false });

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
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('/api/analyze-invoice', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to analyze invoice');
                }

                const data = await response.json();
                setValue('totalAmount', data.totalAmount);
                setValue('category', data.category);
                setIsAiGenerated({ totalAmount: true, category: true });
            } catch (error) {
                console.error('Error analyzing invoice:', error);
                alert('Failed to analyze invoice');
            }
        }
    };

    return (
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
                        <Label htmlFor="title">Invoice Title</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="totalAmount">Total Amount</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.totalAmount ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <div className="relative">
                            <Input
                                id="totalAmount"
                                type="number"
                                step="0.01"
                                {...register("totalAmount", { valueAsNumber: true })}
                                className={`${isAiGenerated.totalAmount ? "pr-10 border-blue-500 bg-blue-50" : "pr-10 border-gray-300"}`}
                            />
                            <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isAiGenerated.totalAmount ? "text-blue-500" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="category">Category</Label>
                            <Badge variant="secondary" className={`bg-gray-100 text-gray-800 ${isAiGenerated.category ? "bg-blue-100 text-blue-800" : ""}`}>
                                AI Powered
                            </Badge>
                        </div>
                        <div className="relative">
                            <Input
                                id="category"
                                {...register("category")}
                                className={`${isAiGenerated.category ? "pr-10 border-blue-500 bg-blue-50" : "pr-10 border-gray-300"}`}
                            />
                            <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isAiGenerated.category ? "text-blue-500" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateAdded">Date Added</Label>
                        <Input id="dateAdded" type="date" {...register("dateAdded")} />
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
    );
};

export default AddInvoice;