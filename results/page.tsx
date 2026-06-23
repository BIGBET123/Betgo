"use client"

import MobileLayout from "@/components/MobileLayout"
import { finishedMatches } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function ResultsPage() {
  // Group by date
  const grouped = finishedMatches.reduce((acc: any, match) => {
    if (!acc[match.date]) acc[match.date] = []
    acc[match.date].push(match)
    return acc
  }, {})

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Results</h1>
            <p className="text-sm text-gray-500">Completed matches</p>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([date, matches]: [string, any]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <div className="space-y-3">
                {matches.map((match: any) => (
                  <Card key={match.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{match.league}</span>
                        <span className="text-xs font-medium text-green-600">FT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm">
                                {match.homeTeam[0]}
                              </div>
                              <span className="font-medium">{match.homeTeam}</span>
                            </div>
                            <span className="font-bold text-lg">{match.homeScore}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm">
                                {match.awayTeam[0]}
                              </div>
                              <span className="font-medium">{match.awayTeam}</span>
                            </div>
                            <span className="font-bold text-lg">{match.awayScore}</span>
                          </div>
                        </div>
                      </div>
                      {match.events && (
                        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                          {match.events.filter((e: any) => e.type === "GOAL").length} goals
                          {match.events.filter((e: any) => e.type === "YELLOW_CARD").length > 0 && 
                            ` • ${match.events.filter((e: any) => e.type === "YELLOW_CARD").length} yellow cards`}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
