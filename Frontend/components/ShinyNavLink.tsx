"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Crown, Loader2, type LucideIcon } from "lucide-react"
import { useTransition } from "react"
import { useState } from "react"

export type NavItem = {
    title: string;
    disabled?: boolean;
    href: string;
    icon: LucideIcon;
};

export const ShinyNavLink: React.FC<{ item: NavItem; isActive: boolean }> = ({ item, isActive }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        startTransition(() => {
            router.push(item.href);
        });
    };

    return (
        <Link
            href={item.href}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative overflow-hidden",
                isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                item.disabled && "pointer-events-none opacity-50"
            )}
            aria-current={isActive ? "page" : undefined}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-50"
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <span className={cn(
                "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
                isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            )}>
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                )}
            </span>
            <span className="relative z-10 truncate">
                {item.title}
                {item.title.toLowerCase().includes('add invoice') && (
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                        AI
                        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                )}
            </span>
            <span className="relative z-10 ml-auto text-xs font-semibold text-yellow-600">Premium</span>
            {isHovered && (
                <motion.div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 220 220"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M220,98.865c0-12.728-10.355-23.083-23.083-23.083s-23.083,10.355-23.083,23.083c0,5.79,2.148,11.084,5.681,15.14l-23.862,21.89L125.22,73.002l17.787-20.892l-32.882-38.623L77.244,52.111l16.995,19.962l-30.216,63.464l-23.527-21.544c3.528-4.055,5.671-9.344,5.671-15.128c0-12.728-10.355-23.083-23.083-23.083C10.355,75.782,0,86.137,0,98.865c0,11.794,8.895,21.545,20.328,22.913l7.073,84.735H192.6l7.073-84.735C211.105,120.41,220,110.659,220,98.865z"
                            stroke="#F59E0B"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.svg>
                </motion.div>
            )}
        </Link>
    );
};