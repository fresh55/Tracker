'use server'

import { Client } from '@/lib/clientApi';

export async function fetchTransactions(userId: string) {
    const client = new Client();
    try {
        const data = await client.getTransactions(userId);
        return data.map(transaction => ({
            amount: transaction.amount,
            dateAdded: transaction.dateAdded?.toISOString(),
            type: transaction.type,
            description: transaction.amount
        }));
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw new Error("Failed to fetch transactions");
    }
}

export async function addTransaction(data: any) {
    const client = new Client();
    try {
        if (data.type === 'income') {
            await client.addIncome(data);
        } else {
            await client.addExpense(data);
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to add transaction:", error);
        return { success: false, error: "Failed to add transaction" };
    }
}