"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Dashboard } from "@/components/dashboard"
import { StudyPlanner } from "@/components/study-planner"
import { ProgressTracker } from "@/components/progress-tracker"
import { LoginScreen } from "@/components/login-screen"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ProfileSettings } from "@/components/profile-settings"
import { Preferences } from "@/components/preferences"
import { HelpSupport } from "@/components/help-support"
import { GamificationWidget } from "@/components/gamification-widget"
import { TopicSearch } from "@/components/topic-search"
import { AIChatbot } from "@/components/ai-chatbot"
import { Search, User, ChevronDown, Sun, Moon } from "lucide-react"
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
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Gamification state
  const [xp, setXp] = useState(475)
  const [level, setLevel] = useState(4)
  const [streak, setStreak] = useState(7)
  const maxXp = 600

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name })
    // Award XP for logging in
    setXp(prev => Math.min(prev + 10, maxXp))
  }

  const handleLogout = () => {
    setUser(null)
    setActiveTab("dashboard")
    setShowUserMenu(false)
  }

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleUpdateUser = (name: string, email: string) => {
    setUser({ name, email })
  }

  // Show login screen if not logged in
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Render profile/preferences/help pages
  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "planner":
        return <StudyPlanner />
      case "learn":
        return <TopicSearch />
      case "progress":
        return <ProgressTracker />
      case "profile":
        return (
          <ProfileSettings 
            user={user} 
            onUpdateUser={handleUpdateUser}
            onClose={() => setActiveTab("dashboard")}
          />
        )
      case "preferences":
        return (
          <Preferences 
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onClose={() => setActiveTab("dashboard")}
          />
        )
      case "help":
        return <HelpSupport onClose={() => setActiveTab("dashboard")} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <SidebarNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userName={user.name}
        onLogout={handleLogout}
        level={level}
        xp={xp}
        maxXp={maxXp}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b transition-colors duration-300">
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
              {/* Gamification Widget */}
              <GamificationWidget 
                xp={xp} 
                maxXp={maxXp} 
                level={level} 
                streak={streak} 
              />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleTheme}
                className="rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="size-5 text-chart-5" />
                ) : (
                  <Moon className="size-5 text-chart-4" />
                )}
              </Button>
              
              {/* Notifications */}
              <NotificationsDropdown />
              
              {/* User Menu */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 rounded-full pl-2 pr-3 h-10"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="size-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
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
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border rounded-xl shadow-lg overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b bg-muted/30">
                        <div className="flex items-center gap-2">
                          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <User className="size-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">Level {level}</span>
                          <span className="text-xs font-medium text-primary">{xp} / {maxXp} XP</span>
                        </div>
                      </div>
                      <div className="py-1">
                        <button 
                          onClick={() => { setActiveTab("profile"); setShowUserMenu(false) }}
                          className="w-full px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors flex items-center gap-2"
                        >
                          Profile Settings
                        </button>
                        <button 
                          onClick={() => { setActiveTab("preferences"); setShowUserMenu(false) }}
                          className="w-full px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors flex items-center gap-2"
                        >
                          Preferences
                        </button>
                        <button 
                          onClick={() => { setActiveTab("help"); setShowUserMenu(false) }}
                          className="w-full px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors flex items-center gap-2"
                        >
                          Help & Support
                        </button>
                        <button 
                          onClick={handleToggleTheme}
                          className="w-full px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors flex items-center justify-between"
                        >
                          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                          {isDarkMode ? (
                            <Sun className="size-4 text-chart-5" />
                          ) : (
                            <Moon className="size-4 text-chart-4" />
                          )}
                        </button>
                      </div>
                      <div className="border-t py-1">
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-sm text-left text-destructive hover:bg-destructive/10 transition-colors"
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
          {renderActiveTab()}
        </main>
      </div>

      {/* AI Chatbot - available on all pages */}
      <AIChatbot />
    </div>
  )
}
