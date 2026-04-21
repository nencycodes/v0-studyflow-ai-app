"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Camera,
  Mail,
  BookOpen,
  Trophy,
  Flame,
  Star,
  Zap,
  Target,
  Award,
  Crown,
  Shield,
  X,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileSettingsProps {
  user: { email: string; name: string }
  onUpdateUser: (name: string, email: string) => void
  onClose: () => void
}

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first task", icon: Star, unlocked: true, xp: 50 },
  { id: 2, title: "7-Day Streak", description: "Study 7 days in a row", icon: Flame, unlocked: true, xp: 100 },
  { id: 3, title: "Math Master", description: "Complete 50 math problems", icon: Trophy, unlocked: true, xp: 150 },
  { id: 4, title: "Early Bird", description: "Study before 8 AM", icon: Zap, unlocked: true, xp: 75 },
  { id: 5, title: "Night Owl", description: "Study after 10 PM", icon: Shield, unlocked: false, xp: 75 },
  { id: 6, title: "Marathon", description: "Study 5+ hours in one day", icon: Target, unlocked: false, xp: 200 },
  { id: 7, title: "Perfectionist", description: "100% on any subject", icon: Award, unlocked: false, xp: 250 },
  { id: 8, title: "Legend", description: "Reach level 10", icon: Crown, unlocked: false, xp: 500 },
]

export function ProfileSettings({ user, onUpdateUser, onClose }: ProfileSettingsProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  // Gamification stats
  const currentXP = 475
  const maxXP = 600
  const level = 4
  const xpProgress = (currentXP / maxXP) * 100
  const unlockedCount = achievements.filter(a => a.unlocked).length

  const handleSave = () => {
    onUpdateUser(name, email)
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and view your achievements
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative">
                <div className="size-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-background shadow-lg">
                  <User className="size-12 text-primary-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 size-8 rounded-full bg-card border-2 border-background shadow-md flex items-center justify-center hover:bg-muted transition-colors">
                  <Camera className="size-4 text-muted-foreground" />
                </button>
                {/* Level Badge */}
                <div className="absolute -top-1 -right-1 size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
                  {level}
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-4">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>

              {/* XP Progress */}
              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level {level}</span>
                  <span className="font-medium text-primary">{currentXP} / {maxXP} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3" />
                <p className="text-xs text-muted-foreground">{maxXP - currentXP} XP to Level {level + 1}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-chart-1">7</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-chart-2">{unlockedCount}</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-chart-3">24.5h</p>
                  <p className="text-xs text-muted-foreground">Studied</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Account Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    {saved ? <Check className="size-4 mr-1" /> : null}
                    {saved ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Education Level</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value="University - Undergraduate"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back.
              </p>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Achievements & Badges</CardTitle>
          <CardDescription>{unlockedCount} of {achievements.length} unlocked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "relative flex flex-col items-center text-center p-4 rounded-xl border transition-all group",
                    achievement.unlocked
                      ? "bg-gradient-to-b from-primary/5 to-transparent border-primary/20 hover:border-primary/40"
                      : "bg-muted/30 border-transparent opacity-50 grayscale"
                  )}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-2 right-2 text-xs font-bold text-primary">
                      +{achievement.xp} XP
                    </div>
                  )}
                  <div
                    className={cn(
                      "size-14 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110",
                      achievement.unlocked 
                        ? "bg-gradient-to-br from-primary/20 to-accent/20" 
                        : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-7",
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <p className="text-sm font-semibold">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
