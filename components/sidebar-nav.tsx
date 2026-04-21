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
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userName?: string
  onLogout?: () => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "planner", label: "Study Planner", icon: CalendarDays },
  { id: "progress", label: "Progress", icon: BarChart3 },
]

export function SidebarNav({ activeTab, onTabChange, userName, onLogout }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

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
            <div className="flex items-center justify-center size-10 rounded-xl bg-sidebar-primary">
              <Sparkles className="size-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">StudyFlow</h1>
              <p className="text-xs text-sidebar-muted">AI-Powered Learning</p>
            </div>
          </div>

          {/* User info */}
          {userName && (
            <div className="px-6 py-4 border-b border-sidebar-border">
              <p className="text-xs text-sidebar-muted uppercase tracking-wider mb-1">Welcome back</p>
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
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
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-sidebar-border">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <Settings className="size-5" />
              Settings
            </button>
            
            {/* Settings submenu */}
            {showSettings && (
              <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                  Profile Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                  Notifications
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                  Appearance
                </button>
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
