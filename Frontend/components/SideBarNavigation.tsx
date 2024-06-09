"use client"

import Link from "next/link"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"

import { cn } from "@/lib/utils"
import {
    Home,
    Plus,
    Code,
    Crown,
    Loader2,
    Settings,
    type LucideIcon,
} from "lucide-react";
import Logo from "./Logo";
export type NavItem = {
    title: string;
    disabled?: boolean;
    href: string;
    active?: boolean;
    icon: LucideIcon;
};
import { useTransition } from "react"
  import { useRouter } from "next/navigation"
export function SidebarDashboard() {
    const segments = useSelectedLayoutSegments()
    const items: NavItem[] = [
        {
            title: "Dashboard",
            href: "/",
           icon: Home,
            active: segments.length === 0 || (segments.length === 1 && segments[0] === "")

            
        },
        {
            title: "Add invoice",
            href: "/Add-invoice",

    icon: Plus,
            active: segments.at(0) === "nastavitve"
        },
        {
            title: "Settings",
            href: "/dashboard/billing",
            icon: Settings,
            
        },
    ];

    return (
        <nav className="flex flex-col flex-1 flex-grow mt-4 mx-4">
            <ul className="flex flex-col flex-1 gap-y-7">
                <li>
                    <h2 className="text-xs font-semibold leading-6 text-content">My tracker</h2>
                    <ul className="mt-2 -mx-2 space-y-1">
                        {items.map((item) => (
                            <li key={item.title}>
                                <NavLink item={item} />
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>

    )
}

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <Link
            onClick={() => {
              
                    startTransition(() => {
                        router.push(item.href);
                    });
                
            }}
            href={item.href}
            className={cn(
            "group flex gap-x-2 rounded-md  py-1 text-sm  font-medium leading-6 items-center hover:bg-gray-200 dark:hover:bg-gray-800 justify-between",
            {
                "bg-gray-200 dark:bg-gray-800": item.active,
                "text-content-subtle pointer-events-none": item.disabled,
            },
        )}>
            <div className="flex group gap-x-2 mx-2">
                <span className="text-content-subtle border-border group-hover:shadow  flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                    {isPending ? (
                        <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                    ) : (
                        <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    )}
                </span>
                <p className="truncate whitespace-nowrap">{item.title}</p>
            </div>
            
        </Link>


    )



}