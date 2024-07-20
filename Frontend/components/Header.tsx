'use client'

import React from 'react';
import { User } from 'lucide-react';
import Container from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/UserContext';

const Header: React.FC = () => {


    return (
        <header className="w-full">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                       
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;