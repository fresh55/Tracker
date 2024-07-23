import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TransactionDto } from '@/lib/clientApi';

interface TransactionChartsProps {
    transactions: TransactionDto[];
}

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const TransactionCharts: React.FC<TransactionChartsProps> = ({ transactions }) => {
    const categoryData = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.category!]) {
            acc[transaction.category!] = 0;
        }
        acc[transaction.category!] += transaction.amount!;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(categoryData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Only show top 5 categories

    const totalAmount = pieChartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className="h-48 w-full">
            <h3 className="text-sm font-semibold mb-2">Top 5 Expense Categories</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="50%"
                        outerRadius="80%"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => `$${value.toFixed(2)} (${((value / totalAmount) * 100).toFixed(1)}%)`}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionCharts;