import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Client, AddIncomeCommand, AddExpenseCommand } from '@/lib/clientApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/context/UserContext';

const transactionSchema = z.object({
    amount: z.number().positive({ message: "Amount must be positive" }),
    dateAdded: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.enum(['income', 'expense'], { required_error: "Transaction type is required" }),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const TransactionForm = ({ onTransactionAdded }: { onTransactionAdded: (data: any) => Promise<void> }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { currentUser } = useUser();

    const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
        if (!currentUser) {
            setSubmitError("User not authenticated");
            return;
        }

        try {
            await onTransactionAdded({
                amount: data.amount,
                dateAdded: new Date(data.dateAdded),
                description: data.description,
                userId: currentUser.id,
                type: data.type
            });
            reset();
            setSubmitError(null);
        } catch (error) {
            console.error("Failed to add transaction", error);
            setSubmitError("Failed to add transaction. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="m-2">
                <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>Enter the details of your new transaction.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Transaction Type</Label>
                        <RadioGroup defaultValue="income" className="flex">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="income" id="income" {...register("type")} />
                                <Label htmlFor="income">Income</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="expense" id="expense" {...register("type")} />
                                <Label htmlFor="expense">Expense</Label>
                            </div>
                        </RadioGroup>
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
                        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dateAdded">Date</Label>
                        <Input id="dateAdded" type="date" {...register("dateAdded")} />
                        {errors.dateAdded && <p className="text-red-500">{errors.dateAdded.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="text" {...register("description")} />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Transaction'}
                    </Button>
                </CardFooter>
                {submitError && <p className="text-red-500 text-center">{submitError}</p>}
            </Card>
        </form>
    );
};

export default TransactionForm;