"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { premierLeagueStandings, leagues } from "@/lib/data"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function StandingsPage() {
  const [selectedLeague, setSelectedLeague] = useState("pl")

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <h1 className="text-xl font-bold">League Tables</h1>

        {/* League Selector */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {leagues.slice(0, 5).map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedLeague === league.id
                  ? "bg-red-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              {league.name}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                    <th className="px-3 py-3 text-left font-medium text-gray-500 w-10">#</th>
                    <th className="px-3 py-3 text-left font-medium text-gray-500">Team</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-10">P</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-10">W</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-10">D</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-10">L</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-12">GD</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 w-12">Pts</th>
                    <th className="px-3 py-3 text-center font-medium text-gray-500 hidden sm:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {premierLeagueStandings.map((team, index) => (
                    <tr 
                      key={team.position} 
                      className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                        index < 4 ? "bg-green-50/50 dark:bg-green-900/10" : 
                        index === 4 ? "bg-blue-50/50 dark:bg-blue-900/10" :
                        index >= premierLeagueStandings.length - 3 ? "bg-red-50/50 dark:bg-red-900/10" : ""
                      }`}
                    >
                      <td className="px-3 py-3 font-medium">{team.position}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                            {team.team[0]}
                          </div>
                          <span className="font-medium whitespace-nowrap">{team.team}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">{team.played}</td>
                      <td className="px-3 py-3 text-center">{team.won}</td>
                      <td className="px-3 py-3 text-center">{team.drawn}</td>
                      <td className="px-3 py-3 text-center">{team.lost}</td>
                      <td className={`px-3 py-3 text-center font-medium ${
                        team.goalDifference > 0 ? "text-green-600" : 
                        team.goalDifference < 0 ? "text-red-600" : ""
                      }`}>
                        {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                      </td>
                      <td className="px-3 py-3 text-center font-bold">{team.points}</td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <div className="flex gap-1 justify-center">
                          {team.form.map((result, i) => (
                            <span 
                              key={i}
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                                result === "W" ? "bg-green-500" : 
                                result === "D" ? "bg-gray-400" : "bg-red-500"
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500/20" />
            <span>Champions League</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500/20" />
            <span>Europa League</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500/20" />
            <span>Relegation</span>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
