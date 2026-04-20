"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Dashboard } from "@/components/dashboard"
import { StudyPlanner } from "@/components/study-planner"
import { ProgressTracker } from "@/components/progress-tracker"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Search - hidden on mobile to leave room for menu button */}
            <div className="hidden sm:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks, subjects..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile spacer */}
            <div className="sm:hidden w-10" />

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                <User className="size-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "planner" && <StudyPlanner />}
          {activeTab === "progress" && <ProgressTracker />}
        </main>
      </div>
    </div>
  )
}
