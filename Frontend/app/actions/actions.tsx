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

        // Immediately fetch updated transactions after adding a new one
        const updatedTransactions = await client.getTransactions(data.userId);

        return {
            success: true,
            data: updatedTransactions
        };
    } catch (error) {
        console.error("Failed to add transaction:", error);
        return { success: false, error: "Failed to add transaction", details: error };
    }
}