"use client"

import MobileLayout from "@/components/MobileLayout"
import { notifications } from "@@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Info, AlertTriangle, Gift } from "lucide-react"

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "SUCCESS": return <Check className="h-5 w-5 text-green-600" />
      case "WARNING": return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "PROMO": return <Gift className="h-5 w-5 text-purple-600" />
      default: return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "SUCCESS": return "bg-green-100 text-green-800"
      case "WARNING": return "bg-yellow-100 text-yellow-800"
      case "PROMO": return "bg-purple-100 text-purple-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Notifications</h1>
          <Badge variant="secondary">{notifications.filter(n => !n.read).length} unread</Badge>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={!notification.read ? "border-l-4 border-l-red-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBadgeColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
