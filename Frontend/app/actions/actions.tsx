import { Client, AddIncomeCommand, AddExpenseCommand, DeleteTransactionCommand } from '@/lib/clientApi';
import { revalidatePath } from 'next/cache';
export async function fetchTransactions(userId: string): Promise<any[]> {
    const client = new Client();
    try {
        const data = await client.getTransactions(userId);
        return data.map(transaction => ({
            amount: transaction.amount,
            dateAdded: transaction.dateAdded ? transaction.dateAdded.toISOString() : null,
            type: transaction.type,
            id: transaction.id,
            title: transaction.title,
            category: transaction.category
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
            dateAdded: new Date(data.date),
            title: data.title,
            category: data.category,
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
                title: result.title,
                category: result.category,
                date: result.date ? result.date.toISOString() : null,
                type: data.type
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
        const command = new DeleteTransactionCommand({
            id: id,
            userId: userId,
            transactionType: transactionType
        });
        await client.deleteTransaction(command);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete transaction:", error);
        return { success: false, error: "Failed to delete transaction", details: error };
    }
}