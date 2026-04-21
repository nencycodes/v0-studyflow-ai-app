"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Flame,
  Star,
  Zap,
  ChevronUp,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GamificationWidgetProps {
  xp: number
  maxXp: number
  level: number
  streak: number
}

export function GamificationWidget({ xp, maxXp, level, streak }: GamificationWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = (xp / maxXp) * 100

  const recentAchievements = [
    { id: 1, title: "Task Master", icon: Trophy, xp: 50, time: "2h ago" },
    { id: 2, title: "Streak Keeper", icon: Flame, xp: 25, time: "Today" },
  ]

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
          "bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20",
          "border border-primary/20"
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="size-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground">{level}</span>
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs font-semibold text-foreground">{xp} XP</span>
            <div className="w-16 h-1 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-chart-5">
          <Flame className="size-4" />
          <span className="text-xs font-bold">{streak}</span>
        </div>
      </button>

      {/* Expanded Dropdown */}
      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsExpanded(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-card border rounded-xl shadow-lg overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-primary-foreground">{level}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Level {level}</p>
                    <p className="text-xs text-muted-foreground">Scholar</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>
              
              {/* XP Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress to Level {level + 1}</span>
                  <span className="font-medium">{xp} / {maxXp} XP</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{maxXp - xp} XP needed</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x border-b">
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-chart-5 mb-1">
                  <Flame className="size-4" />
                  <span className="font-bold">{streak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-chart-1 mb-1">
                  <Star className="size-4" />
                  <span className="font-bold">4</span>
                </div>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-chart-2 mb-1">
                  <Zap className="size-4" />
                  <span className="font-bold">475</span>
                </div>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="p-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Recent Rewards
              </p>
              <div className="space-y-2">
                {recentAchievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                    >
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.time}</p>
                      </div>
                      <span className="text-xs font-bold text-chart-2">+{achievement.xp} XP</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Level Up Preview */}
            <div className="p-3 bg-muted/30 border-t">
              <div className="flex items-center gap-2 text-sm">
                <ChevronUp className="size-4 text-primary" />
                <span className="text-muted-foreground">Next unlock:</span>
                <span className="font-medium text-primary">Night Owl Badge</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
