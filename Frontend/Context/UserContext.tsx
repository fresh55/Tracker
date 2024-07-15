import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, ApplicationUser } from '@/lib/clientApi';

type UserContextType = {
    currentUser: ApplicationUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<ApplicationUser | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<ApplicationUser | null>(null);
    const client = new Client();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await client.getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};