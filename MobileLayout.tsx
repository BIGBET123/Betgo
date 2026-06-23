import Header from "./Header"
import BottomNav from "./BottomNav"

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="pb-20 lg:pb-0 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
