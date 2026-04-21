"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  HelpCircle,
  Sliders,
  Trophy,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SidebarNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userName?: string
  onLogout?: () => void
  level?: number
  xp?: number
  maxXp?: number
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "planner", label: "Study Planner", icon: CalendarDays },
  { id: "progress", label: "Progress", icon: BarChart3 },
]

const settingsItems = [
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "preferences", label: "Preferences", icon: Sliders },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export function SidebarNav({ 
  activeTab, 
  onTabChange, 
  userName, 
  onLogout,
  level = 4,
  xp = 475,
  maxXp = 600,
}: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const xpProgress = (xp / maxXp) * 100

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-accent">
              <Sparkles className="size-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">StudyFlow</h1>
              <p className="text-xs text-sidebar-muted">AI-Powered Learning</p>
            </div>
          </div>

          {/* User info with Gamification */}
          {userName && (
            <div className="px-6 py-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="size-10 rounded-full bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
                    <User className="size-5 text-sidebar-primary-foreground" />
                  </div>
                  {/* Level badge */}
                  <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-sidebar-primary flex items-center justify-center text-[10px] font-bold text-sidebar-primary-foreground ring-2 ring-sidebar">
                    {level}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
                  <p className="text-xs text-sidebar-muted">Level {level} Scholar</p>
                </div>
              </div>
              {/* XP Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sidebar-muted">XP Progress</span>
                  <span className="text-sidebar-primary font-medium">{xp} / {maxXp}</span>
                </div>
                <Progress value={xpProgress} className="h-1.5 bg-sidebar-accent" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Icon className={cn("size-5", isActive && "text-sidebar-primary")} />
                    {item.label}
                    {item.id === "progress" && (
                      <Trophy className="size-4 ml-auto text-chart-5" />
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-sidebar-border">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                showSettings 
                  ? "bg-sidebar-accent/50 text-sidebar-foreground" 
                  : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Settings className={cn("size-5", showSettings && "text-sidebar-primary")} />
              Settings
            </button>
            
            {/* Settings submenu */}
            {showSettings && (
              <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {settingsItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button 
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id)
                        setMobileOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 ml-2 rounded-lg text-xs transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <Icon className={cn("size-4", isActive && "text-sidebar-primary")} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            )}
            
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-muted hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1"
            >
              <LogOut className="size-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
