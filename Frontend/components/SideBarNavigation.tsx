"use client"

import Link from "next/link"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"

import { cn } from "@/lib/utils"

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    active?: boolean

} & (
        | {
            href: string;
            items?: never;
        }
        | {
            href?: string;
            items: NavItem[];
        }
    );
export function SidebarDashboard() {
    const segments = useSelectedLayoutSegments()
    const items: SidebarNavItem[] = [
        {
            title: "Nadzorna ploca",
            href: "/dashboard",
            
        },
        {
            title: "Nastavitve",
            href: "/dashboard/nastavitve",
            
            active: segments.at(0) === "nastavitve"
        },
        {
            title: "Status",
            href: "/dashboard/billing",
            
        },
        {
            title: "Vasi oglasi",
            href: "/dashboard/posts",
          
            active: segments.at(0) === "posts"
        },
    ];

    return (
        <nav className="flex flex-col gap-0.5 px-3 font-medium">
          
               
                <span className="ml-2 text-lg font-semibold">Bank App</span>
           
            <div></div>
            {items.map((item, index) => {
              
                return (
                    item.href && (
                        <Link key={index} href={item.disabled ? "/" : item.href}>
                            <span className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                item.active ? "bg-accent" : "transparent",
                                item.disabled && "cursor-not-allowed opacity-80"
                            )}>
                                
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    )
                )
            })}
        </nav>
    )
}