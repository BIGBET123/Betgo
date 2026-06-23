"use client"

import { useState } from "react"
import MobileLayout from "@/components/MobileLayout"
import { upcomingMatches, finishedMatches } from "@/lib/data"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <MobileLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <h1 className="text-xl font-bold">Matches</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3 mt-4">
            {upcomingMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </TabsContent>

          <TabsContent value="finished" className="space-y-3 mt-4">
            {finishedMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

function MatchRow({ match }: { match: any }) {
  const isUpcoming = match.status === "UPCOMING"
  const isFinished = match.status === "FINISHED"

  return (
    <Link href={`/match/${match.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">{match.league}</span>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {match.date}
              {isUpcoming && <Clock className="h-3 w-3 ml-1" />}
              {isUpcoming && match.time}
              {isFinished && <span className="text-green-600 font-medium">FT</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold">
                  {match.homeTeam[0]}
                </div>
                <span className="font-medium">{match.homeTeam}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold">
                  {match.awayTeam[0]}
                </div>
                <span className="font-medium">{match.awayTeam}</span>
              </div>
            </div>

            <div className="text-center px-4">
              {isFinished ? (
                <div className="text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div className="text-lg text-gray-400">vs</div>
              )}
              {match.odds && (
                <div className="flex gap-1 mt-2 text-[10px]">
                  <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{match.odds.home}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{match.odds.draw}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{match.odds.away}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
