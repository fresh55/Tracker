"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Plus, Settings, BarChart2, Wallet, type LucideIcon, Loader2 } from "lucide-react";
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "./ui/badge";
import { ShinyNavLink } from "./ShinyNavLink"; 

export type NavItem = {
    title: string;
    disabled?: boolean;
    href: string;
    icon: LucideIcon;
};

export function SidebarNavigation() {
    const pathname = usePathname()
    const items: NavItem[] = [
        {
            title: "Dashboard",
            href: "/",
            icon: Home,
        },
        {
            title: "Transactions",
            href: "/transactions",
            icon: BarChart2,
        },
        {
            title: "Add Invoice",
            href: "/Add-invoice",
            icon: Plus,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ];

    return (
        <nav className="flex flex-col h-full  border-r" aria-label="Sidebar">
            <div className="flex items-center justify-center p-6 border-b">
                
                <Badge className="text-lg" variant="secondary"> <Wallet className="h-4 w-4 mr-2 " /> My Tracker</Badge>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {items.map((item) => (
                        <li key={item.title}>
                            {item.title === "Add Invoice" ? (
                                <ShinyNavLink item={item} isActive={pathname === item.href} />
                            ) : (
                                <NavLink item={item} isActive={pathname === item.href} />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

const NavLink: React.FC<{ item: NavItem; isActive: boolean }> = ({ item, isActive }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <Link
            href={item.href}
            onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                    router.push(item.href);
                });
            }}
            className={cn(
                "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                item.disabled && "pointer-events-none opacity-50"
            )}
            aria-current={isActive ? "page" : undefined}
        >
            <span className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
                isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            )}>
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                )}
            </span>
            <span className="truncate">{item.title}</span>
        </Link>
    )
}

export default SidebarNavigation;