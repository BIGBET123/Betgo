"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Radio, Calendar, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/live", label: "Live", icon: Radio },
    { href: "/matches", label: "Matches", icon: Calendar },
    { href: "/standings", label: "Tables", icon: Trophy },
    { href: "/dashboard", label: "Me", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t dark:bg-gray-900 dark:border-gray-800 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-red-600"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-8 bg-red-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
