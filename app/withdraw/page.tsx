"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { demoUser } from "@/lib/data"
import { Wallet, Smartphone, ArrowUpRight } from "lucide-react"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold">Withdraw Funds</h1>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-red-600 to-red-800 text-white">
          <CardContent className="p-6">
            <p className="text-red-100 text-sm mb-1">Available Balance</p>
            <p className="text-3xl font-bold">GHS {demoUser.balance.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (GHS)</label>
              <Input 
                type="number" 
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Minimum: GHS 50 • Maximum: GHS 10,000
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Money Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="tel" 
                  placeholder="e.g. 0541234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
              <p className="font-medium mb-1">Withdrawal Process:</p>
              <ol className="text-gray-500 space-y-1 list-decimal list-inside">
                <li>Submit your withdrawal request</li>
                <li>Admin reviews and approves</li>
                <li>Money sent to your mobile money</li>
                <li>Receive confirmation notification</li>
              </ol>
            </div>

            <Button 
              className="w-full bg-red-600 hover:bg-red-700 h-12"
              onClick={handleSubmit}
              disabled={!amount || !phoneNumber}
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" /> Request Submitted!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5" /> Request Withdrawal
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Withdrawals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Withdrawals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { amount: 200, date: "2026-06-18", status: "APPROVED" },
              { amount: 150, date: "2026-06-10", status: "REJECTED" },
            ].map((w, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-red-600">-GHS {w.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{w.date}</p>
                </div>
                <Badge 
                  variant={w.status === "APPROVED" ? "success" : "destructive"}
                  className="text-[10px]"
                >
                  {w.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}
