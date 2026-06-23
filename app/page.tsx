"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Flame, 
  ChevronRight, 
  Clock, 
  TrendingUp,
  Star,
  Play
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import MobileLayout from "@/components/MobileLayout"
import { liveMatches, upcomingMatches, sportCategories } from "@/lib/data"

export default function HomePage() {
  return (
    <MobileLayout>
      <div className="space-y-6 p-4 lg:p-6">
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white p-6"
        >
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-3">
              <Flame className="h-3 w-3 mr-1" /> Featured Match
            </Badge>
            <h1 className="text-2xl font-bold mb-1">Man City vs Arsenal</h1>
            <p className="text-red-100 text-sm mb-4">Premier League • Live Now</p>
            <div className="flex items-center gap-4 text-3xl font-bold">
              <span>2</span>
              <span className="text-red-200">-</span>
              <span>1</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                67'
              </span>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] bg-contain bg-no-repeat bg-center" />
          </div>
        </motion.div>

        {/* Sport Categories */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {sportCategories.map((cat) => (
            <button
              key={cat.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                cat.active 
                  ? "bg-red-600 text-white" 
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Live Matches Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live Matches
            </h2>
            <Link href="/live" className="text-red-600 text-sm font-medium flex items-center">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {liveMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              Upcoming
            </h2>
            <Link href="/matches" className="text-red-600 text-sm font-medium flex items-center">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {upcomingMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Trending Leagues */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-500" />
            Trending Leagues
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {["Premier League", "La Liga", "Bundesliga", "Serie A"].map((league) => (
              <Card key={league} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-lg">
                      🏆
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{league}</p>
                      <p className="text-xs text-gray-500">12 matches today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}

function MatchCard({ match }: { match: any }) {
  const isLive = match.status === "LIVE"
  const isUpcoming = match.status === "UPCOMING"
  const isFinished = match.status === "FINISHED"

  return (
    <Link href={`/match/${match.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{match.league}</span>
              {isLive && (
                <Badge variant="live" className="text-[10px] h-5">
                  LIVE {match.minute}'
                </Badge>
              )}
              {isFinished && (
                <Badge variant="secondary" className="text-[10px] h-5">FT</Badge>
              )}
              {isUpcoming && (
                <span className="text-xs text-gray-500">{match.time}</span>
              )}
            </div>
            <Star className="h-4 w-4 text-gray-300" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                  {match.homeTeam[0]}
                </div>
                <span className="font-medium text-sm">{match.homeTeam}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                  {match.awayTeam[0]}
                </div>
                <span className="font-medium text-sm">{match.awayTeam}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold mb-1">
                {isLive || isFinished ? (
                  <span>{match.homeScore} - {match.awayScore}</span>
                ) : (
                  <span className="text-gray-400">vs</span>
                )}
              </div>
              {match.odds && (
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{match.odds.home}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{match.odds.draw}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{match.odds.away}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
