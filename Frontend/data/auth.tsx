import { Client } from '@/lib/clientApi';
import { cookies} from 'next/headers'
// Helper method to get the current user
export const getCurrentUser = async () => {
    const client = new Client();

    try {
        const user = fetch("https://localhost:5093/api/User/getCurrentUserId", {
            method: 'GET',
            headers: {
                Authorization: token
            }
           
        });
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; // Handle error appropriately
    }
};