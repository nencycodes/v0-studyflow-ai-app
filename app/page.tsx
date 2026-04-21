"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Dashboard } from "@/components/dashboard"
import { StudyPlanner } from "@/components/study-planner"
import { ProgressTracker } from "@/components/progress-tracker"
import { LoginScreen } from "@/components/login-screen"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Search, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UserData {
  email: string
  name: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState<UserData | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name })
  }

  const handleLogout = () => {
    setUser(null)
    setActiveTab("dashboard")
  }

  // Show login screen if not logged in
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userName={user.name}
        onLogout={handleLogout}
      />

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
              {/* Notifications */}
              <NotificationsDropdown />
              
              {/* User Menu */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 rounded-full pl-2 pr-3 h-10"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="size-7 rounded-full bg-primary flex items-center justify-center">
                    <User className="size-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
                
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border rounded-xl shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b bg-muted/30">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors">
                          Profile Settings
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors">
                          Preferences
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors">
                          Help & Support
                        </button>
                      </div>
                      <div className="border-t py-1">
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
