import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    title: z.string().min(1, { message: "Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    type: z.enum(['income', 'expense'], { required_error: "Transaction type is required" }),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

const TransactionForm = ({ onTransactionAdded }: { onTransactionAdded: (data: any) => Promise<void> }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
    });
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { currentUser } = useUser();
const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    console.log('Transaction data:', data);
    if (!currentUser) {
        setSubmitError("User not authenticated");
        return;
    }

    const client = new Client();
    try {
        const baseTransactionData = {
            amount: data.amount,
            dateAdded: new Date(data.date), // Convert string to Date object
            userId: currentUser.id,
            title: data.title,
            category: data.category
        };

        if (data.type === 'income') {
            const command = new AddIncomeCommand(baseTransactionData);
            await client.addIncome(command);
        } else {
            const command = new AddExpenseCommand(baseTransactionData);
            await client.addExpense(command);
        }
        reset();
        setSubmitError(null);
        await onTransactionAdded(data);
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
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="income" id="income" />
                                        <Label htmlFor="income">Income</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="expense" id="expense" />
                                        <Label htmlFor="expense">Expense</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
                        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" {...register("date")} />
                        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" type="text" {...register("title")} />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" type="text" {...register("category")} />
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
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