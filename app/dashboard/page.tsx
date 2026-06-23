"use client"

import { useState } from "react"
import Link from "next/link"
import MobileLayout from "@/components/MobileLayout"
import { demoUser, transactions, bookingCodes } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Copy, 
  Share2, 
  User, 
  Settings,
  Bell,
  Shield
} from "lucide-react"

export default function DashboardPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const stats = [
    { label: "Balance", value: `GHS ${demoUser.balance.toFixed(2)}`, icon: Wallet, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Referrals", value: demoUser.referralCount.toString(), icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { label: "Earnings", value: `GHS ${demoUser.referralEarnings.toFixed(2)}`, icon: TrendingDown, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-red-600">
            <AvatarFallback className="bg-red-600 text-white text-xl font-bold">
              {demoUser.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{demoUser.name}</h1>
            <p className="text-sm text-gray-500">{demoUser.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">Member since {new Date(demoUser.joinedDate).toLocaleDateString()}</Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Referral Code */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">My Referral Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 font-mono text-sm">
                {demoUser.referralCode}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(demoUser.referralCode)}
              >
                {copiedCode === demoUser.referralCode ? (
                  <span className="text-green-600 text-xs">✓</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Share your code and earn GHS 20 for each friend who joins!
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="bookings">Booking Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-3 mt-4">
            {transactions.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t.type}</span>
                        <Badge 
                          variant={t.status === "APPROVED" ? "success" : t.status === "PENDING" ? "warning" : "destructive"}
                          className="text-[10px]"
                        >
                          {t.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t.method} • {t.date}</p>
                    </div>
                    <span className={`font-bold ${t.type === "DEPOSIT" ? "text-green-600" : "text-red-600"}`}>
                      {t.type === "DEPOSIT" ? "+" : "-"}GHS {t.amount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-3 mt-4">
            {bookingCodes.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-red-600">{booking.code}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {booking.matches.length} matches • {booking.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={booking.status === "ACTIVE" ? "success" : "secondary"}
                        className="text-[10px]"
                      >
                        {booking.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(booking.code)}
                      >
                        {copiedCode === booking.code ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/deposit">
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Wallet className="h-4 w-4 mr-2" /> Deposit
            </Button>
          </Link>
          <Link href="/withdraw">
            <Button variant="outline" className="w-full">
              <TrendingDown className="h-4 w-4 mr-2" /> Withdraw
            </Button>
          </Link>
        </div>

        {/* Settings Links */}
        <Card>
          <CardContent className="p-0">
            {[
              { icon: User, label: "Edit Profile", href: "/profile" },
              { icon: Bell, label: "Notifications", href: "/notifications" },
              { icon: Shield, label: "Security", href: "/security" },
              { icon: Settings, label: "Settings", href: "/settings" },
            ].map((item, index, arr) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index !== arr.length - 1 ? "border-b" : ""
                  }`}>
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-gray-400">›</span>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}
