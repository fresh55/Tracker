'use server'
import { Client, TransactionDto, AddIncomeCommand, AddExpenseCommand } from '@/lib/clientApi';
import { revalidatePath } from 'next/cache';


export async function fetchTransactions(userId: string | undefined): Promise<any[]> {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const client = new Client();
    try {
        const data = await client.getTransactions(userId);
        return data.map(transaction => ({
            amount: transaction.amount,
            dateAdded: transaction.dateAdded ? transaction.dateAdded.toISOString() : null,
            type: transaction.type,
            id: transaction.id,
            description: transaction.description
        }));
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw new Error("Failed to fetch transactions");
    }
}

export async function addTransaction(data: any) {
    const client = new Client();
    try {
        const baseTransactionData = {
            amount: data.amount,
            dateAdded: new Date(data.dateAdded),
            description: data.description,
            userId: data.userId
        };

        let result;
        if (data.type === 'income') {
            const incomeCommand = new AddIncomeCommand(baseTransactionData);
            result = await client.addIncome(incomeCommand);
        } else {
            const expenseCommand = new AddExpenseCommand(baseTransactionData);
            result = await client.addExpense(expenseCommand);
        }

        revalidatePath('/');
        return {
            success: true,
            data: {
                id: result.id,
                amount: result.amount,
                description: result.description,
                date: result.date ? result.date.toISOString() : null
            }
        };
    } catch (error) {
        console.error("Failed to add transaction:", error);
        return { success: false, error: "Failed to add transaction", details: error };
    }
}
export async function deleteTransaction(id: number, userId: string, transactionType: string) {
    const client = new Client();
    try {
        await client.deleteTransaction({ id, userId, transactionType });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete transaction:", error);
        return { success: false, error: "Failed to delete transaction", details: error };
    }
}