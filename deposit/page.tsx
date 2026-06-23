"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Copy, Check, Smartphone } from "lucide-react"

export default function DepositPage() {
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const copyNumber = () => {
    navigator.clipboard.writeText("0541799703")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = () => {
    setUploaded(true)
    setTimeout(() => setUploaded(false), 3000)
  }

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold">Deposit Funds</h1>

        {/* Payment Info Card */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile Money Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Money Number</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 font-mono text-lg font-bold">
                  0541799703
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={copyNumber}
                  className="h-12 w-12"
                >
                  {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Name</label>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 font-medium">
                Alfred Addo
              </div>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
              <p>1. Send money to the number above</p>
              <p>2. Upload your payment screenshot</p>
              <p>3. Wait for admin approval</p>
            </div>
          </CardContent>
        </Card>

        {/* Deposit Form */}
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Screenshot</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-red-400 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload screenshot</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <Button 
              className="w-full bg-red-600 hover:bg-red-700 h-12"
              onClick={handleSubmit}
              disabled={!amount}
            >
              {uploaded ? "Request Submitted!" : "Submit Deposit Request"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Deposits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Deposit Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { amount: 500, date: "2026-06-20", status: "APPROVED" },
              { amount: 300, date: "2026-06-23", status: "PENDING" },
              { amount: 1000, date: "2026-06-15", status: "APPROVED" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">GHS {d.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{d.date}</p>
                </div>
                <Badge 
                  variant={d.status === "APPROVED" ? "success" : "warning"}
                  className="text-[10px]"
                >
                  {d.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}
