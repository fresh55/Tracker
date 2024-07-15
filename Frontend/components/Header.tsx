'use client'

import React from 'react';
import { User } from 'lucide-react';
import Container from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/UserContext';

const Header: React.FC = () => {
    const { currentUser } = useUser();

    return (
        <header className="w-full mt-8">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-medium">Welcome, {currentUser.email}</span>
                            </div>
                        ) : (
                            <Skeleton className="h-8 w-32" />
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;