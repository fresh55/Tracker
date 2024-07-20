'use client'

import Header from "@/components/Header";
import { SidebarNavigation } from "../../components/SideBarNavigation";
import { Client, ApplicationUser } from '@/lib/clientApi';
import { useEffect, useState } from "react";
import { UserProvider } from '@/context/UserContext';

export default function HomeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
    }) {
    

    return (
        <UserProvider>

        <div className="flex flex-col ">
            
            <div className="flex flex-3  w-full ">

            <aside className="relative top-0  flex h-screen w-[320px] flex-col gap-3 border-r  transition-transform duration-75 max-lg:fixed lg:w-[340px] max-lg:-translate-x-full pt-3 lg:pt-3">
               

                        <SidebarNavigation />
                    
                </aside>
                <div className="flex flex-1 flex-col w-full">
                  
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-12 lg:p-12">
                    {children}
                    </main>
                </div>
               
            </div>
           

        </div>
        </UserProvider>
    );
}