"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sun,
  Moon,
  Bell,
  Volume2,
  Clock,
  Calendar,
  Palette,
  Globe,
  X,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PreferencesProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  onClose: () => void
}

const studyGoalOptions = [
  { id: "1hr", label: "1 hour/day", value: 1 },
  { id: "2hr", label: "2 hours/day", value: 2 },
  { id: "3hr", label: "3 hours/day", value: 3 },
  { id: "4hr", label: "4+ hours/day", value: 4 },
]

const reminderTimeOptions = [
  { id: "morning", label: "Morning (8 AM)", time: "08:00" },
  { id: "afternoon", label: "Afternoon (2 PM)", time: "14:00" },
  { id: "evening", label: "Evening (6 PM)", time: "18:00" },
  { id: "night", label: "Night (9 PM)", time: "21:00" },
]

export function Preferences({ isDarkMode, onToggleTheme, onClose }: PreferencesProps) {
  const [selectedGoal, setSelectedGoal] = useState("2hr")
  const [selectedReminder, setSelectedReminder] = useState("evening")
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    streakAlerts: true,
    achievements: true,
    weeklyReport: true,
    soundEffects: false,
  })
  const [weekStartsOn, setWeekStartsOn] = useState("monday")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Preferences</h1>
          <p className="text-muted-foreground mt-1">
            Customize your study experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave}>
            {saved ? <Check className="size-4 mr-2" /> : null}
            {saved ? "Saved!" : "Save Preferences"}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Appearance</CardTitle>
            </div>
            <CardDescription>Choose your preferred theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <button
                onClick={() => { if (isDarkMode) onToggleTheme() }}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 transition-all",
                  !isDarkMode 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="size-12 rounded-full bg-background border flex items-center justify-center shadow-sm">
                    <Sun className="size-6 text-chart-5" />
                  </div>
                  <span className="text-sm font-medium">Light Mode</span>
                </div>
              </button>
              <button
                onClick={() => { if (!isDarkMode) onToggleTheme() }}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 transition-all",
                  isDarkMode 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="size-12 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center">
                    <Moon className="size-6 text-chart-4" />
                  </div>
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Study Goals */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Daily Study Goal</CardTitle>
            </div>
            <CardDescription>Set your daily study target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {studyGoalOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedGoal(option.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 text-sm font-medium transition-all",
                    selectedGoal === option.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Task Reminders</p>
                  <p className="text-xs text-muted-foreground">Get notified about upcoming tasks</p>
                </div>
                <Checkbox 
                  checked={notifications.taskReminders}
                  onCheckedChange={() => toggleNotification("taskReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Streak Alerts</p>
                  <p className="text-xs text-muted-foreground">Remind me to maintain my streak</p>
                </div>
                <Checkbox 
                  checked={notifications.streakAlerts}
                  onCheckedChange={() => toggleNotification("streakAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Achievement Unlocked</p>
                  <p className="text-xs text-muted-foreground">Notify when I earn badges</p>
                </div>
                <Checkbox 
                  checked={notifications.achievements}
                  onCheckedChange={() => toggleNotification("achievements")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Weekly Report</p>
                  <p className="text-xs text-muted-foreground">Get a summary of your progress</p>
                </div>
                <Checkbox 
                  checked={notifications.weeklyReport}
                  onCheckedChange={() => toggleNotification("weeklyReport")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Sound Effects</p>
                  <p className="text-xs text-muted-foreground">Play sounds for achievements</p>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="size-4 text-muted-foreground" />
                  <Checkbox 
                    checked={notifications.soundEffects}
                    onCheckedChange={() => toggleNotification("soundEffects")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reminder Time */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Study Reminder</CardTitle>
            </div>
            <CardDescription>When should we remind you to study?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminderTimeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedReminder(option.id)}
                  className={cn(
                    "w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between",
                    selectedReminder === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  {selectedReminder === option.id && (
                    <Check className="size-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locale Settings */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Regional Settings</CardTitle>
            </div>
            <CardDescription>Customize calendar and language preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Week Starts On</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWeekStartsOn("sunday")}
                    className={cn(
                      "flex-1 p-2 rounded-lg border-2 text-sm font-medium transition-all",
                      weekStartsOn === "sunday"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    Sunday
                  </button>
                  <button
                    onClick={() => setWeekStartsOn("monday")}
                    className={cn(
                      "flex-1 p-2 rounded-lg border-2 text-sm font-medium transition-all",
                      weekStartsOn === "monday"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    Monday
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Format</label>
                <div className="flex gap-2">
                  <button className="flex-1 p-2 rounded-lg border-2 border-primary bg-primary/5 text-sm font-medium text-primary">
                    12-hour
                  </button>
                  <button className="flex-1 p-2 rounded-lg border-2 border-border text-sm font-medium hover:border-muted-foreground/50 transition-all">
                    24-hour
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
