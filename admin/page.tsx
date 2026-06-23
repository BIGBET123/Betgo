"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Wallet, 
  ArrowUpRight, 
  Check, 
  X,
  TrendingUp,
  BarChart3
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("deposits")

  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-600" },
    { label: "Today's Deposits", value: "GHS 45,600", icon: Wallet, color: "text-green-600" },
    { label: "Today's Withdrawals", value: "GHS 12,300", icon: ArrowUpRight, color: "text-red-600" },
    { label: "Active Now", value: "89", icon: TrendingUp, color: "text-purple-600" },
  ]

  const pendingDeposits = [
    { id: "D001", user: "John Doe", amount: 500, date: "2026-06-23 14:30", status: "PENDING" },
    { id: "D002", user: "Jane Smith", amount: 1000, date: "2026-06-23 13:15", status: "PENDING" },
    { id: "D003", user: "Mike Johnson", amount: 250, date: "2026-06-23 12:00", status: "PENDING" },
  ]

  const pendingWithdrawals = [
    { id: "W001", user: "Sarah Wilson", amount: 300, date: "2026-06-23 11:00", status: "PENDING" },
    { id: "W002", user: "Tom Brown", amount: 150, date: "2026-06-23 10:30", status: "PENDING" },
  ]

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Badge variant="secondary">Admin</Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <Icon className={`h-5 w-5 ${stat.color} mb-2`} />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Pending Requests Tabs */}
        <Tabs defaultValue="deposits" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposits">
              Deposits ({pendingDeposits.length})
            </TabsTrigger>
            <TabsTrigger value="withdrawals">
              Withdrawals ({pendingWithdrawals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposits" className="space-y-3 mt-4">
            {pendingDeposits.map((deposit) => (
              <Card key={deposit.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{deposit.user}</p>
                      <p className="text-sm text-gray-500">ID: {deposit.id}</p>
                      <p className="text-xs text-gray-400">{deposit.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+GHS {deposit.amount}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-3 mt-4">
            {pendingWithdrawals.map((withdrawal) => (
              <Card key={withdrawal.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{withdrawal.user}</p>
                      <p className="text-sm text-gray-500">ID: {withdrawal.id}</p>
                      <p className="text-xs text-gray-400">{withdrawal.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">-GHS {withdrawal.amount}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Users className="h-4 w-4 mr-2" /> Manage Users
            </Button>
            <Button variant="outline" className="h-12">
              <BarChart3 className="h-4 w-4 mr-2" /> View Reports
            </Button>
            <Button variant="outline" className="h-12">
              <Wallet className="h-4 w-4 mr-2" /> All Transactions
            </Button>
            <Button variant="outline" className="h-12">
              <TrendingUp className="h-4 w-4 mr-2" /> Referrals
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}
