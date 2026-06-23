"use client"

import MobileLayout from "@/components/MobileLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Shield, 
  Users, 
  UserPlus, 
  Settings, 
  BarChart3, 
  Wallet,
  Bell
} from "lucide-react"

export default function SuperAdminPage() {
  const systemStats = [
    { label: "Total Users", value: "5,678", change: "+12%" },
    { label: "Total Deposits", value: "GHS 234,500", change: "+8%" },
    { label: "Total Withdrawals", value: "GHS 89,200", change: "+5%" },
    { label: "Revenue", value: "GHS 45,300", change: "+15%" },
  ]

  const admins = [
    { id: 1, name: "Admin One", email: "admin1@email.com", role: "Subscriber", users: 450, status: "Active" },
    { id: 2, name: "Admin Two", email: "admin2@email.com", role: "Subscriber", users: 320, status: "Active" },
    { id: 3, name: "Admin Three", email: "admin3@email.com", role: "Subscriber", users: 0, status: "Inactive" },
  ]

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Super Admin</h1>
              <p className="text-sm text-gray-500">Full system control</p>
            </div>
          </div>
          <Badge className="bg-red-600">Super Admin</Badge>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 gap-3">
          {systemStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="admins" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="admins" className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Subscriber Admins</h2>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <UserPlus className="h-4 w-4 mr-2" /> Add Admin
              </Button>
            </div>
            {admins.map((admin) => (
              <Card key={admin.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{admin.role}</Badge>
                        <span className="text-xs text-gray-400">{admin.users} users</span>
                      </div>
                    </div>
                    <Badge 
                      variant={admin.status === "Active" ? "success" : "secondary"}
                      className="text-[10px]"
                    >
                      {admin.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-3 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Minimum Deposit", value: "GHS 10" },
                  { label: "Minimum Withdrawal", value: "GHS 50" },
                  { label: "Referral Bonus", value: "GHS 20" },
                  { label: "Maintenance Mode", value: "Off" },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{setting.label}</span>
                    <span className="font-medium text-sm">{setting.value}</span>
                  </div>
                ))}
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Settings className="h-4 w-4 mr-2" /> Save Changes
