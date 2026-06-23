"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { demoUser } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Share2, Users, TrendingUp, Gift } from "lucide-react"

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)

  const referralLink = `https://sportstream.com/ref/${demoUser.referralCode}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { label: "Total Referrals", value: demoUser.referralCount, icon: Users },
    { label: "Total Earnings", value: `GHS ${demoUser.referralEarnings.toFixed(2)}`, icon: TrendingUp },
    { label: "Pending", value: "GHS 0.00", icon: Gift },
  ]

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold">Referral Program</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <Icon className="h-5 w-5 mx-auto text-red-600 mb-2" />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 text-sm break-all">
                {referralLink}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={copyLink}
              >
                {copied ? <span className="text-green-600">✓</span> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Share2 className="h-4 w-4 mr-2" /> Share with Friends
            </Button>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { step: "1", title: "Share Your Link", desc: "Send your unique referral link to friends" },
              { step: "2", title: "They Join", desc: "Friends sign up using your referral code" },
              { step: "3", title: "You Earn", desc: "Get GHS 20 for each successful referral" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No referrals yet. Start sharing!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}
