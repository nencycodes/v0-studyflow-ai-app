"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

const dailyHours = [
  { date: "Apr 14", hours: 3.5 },
  { date: "Apr 15", hours: 4.2 },
  { date: "Apr 16", hours: 2.8 },
  { date: "Apr 17", hours: 5.1 },
  { date: "Apr 18", hours: 3.9 },
  { date: "Apr 19", hours: 2.5 },
  { date: "Apr 20", hours: 2.5 },
]

const initialSubjectProgress = [
  { id: "math", name: "Mathematics", completed: 75, total: 100, hours: 32, color: "var(--chart-1)" },
  { id: "physics", name: "Physics", completed: 60, total: 100, hours: 28, color: "var(--chart-2)" },
  { id: "chem", name: "Chemistry", completed: 45, total: 100, hours: 20, color: "var(--chart-3)" },
  { id: "bio", name: "Biology", completed: 80, total: 100, hours: 18, color: "var(--chart-4)" },
  { id: "eng", name: "English", completed: 90, total: 100, hours: 12, color: "var(--chart-5)" },
]

const initialCompletedTasks = [
  { id: 1, title: "Calculus Chapter 4 - Derivatives", subject: "Mathematics", completedAt: "Today, 10:30 AM", duration: "2h 15m", checked: true },
  { id: 2, title: "Thermodynamics Problems Set", subject: "Physics", completedAt: "Today, 2:45 PM", duration: "1h 30m", checked: true },
  { id: 3, title: "Organic Chemistry Notes Review", subject: "Chemistry", completedAt: "Yesterday, 4:00 PM", duration: "45m", checked: true },
  { id: 4, title: "Cell Biology Quiz Prep", subject: "Biology", completedAt: "Yesterday, 11:00 AM", duration: "1h", checked: true },
  { id: 5, title: "Shakespeare Essay Outline", subject: "English", completedAt: "2 days ago", duration: "1h 45m", checked: true },
  { id: 6, title: "Linear Algebra Practice", subject: "Mathematics", completedAt: "2 days ago", duration: "2h", checked: true },
]

const initialPendingTasks = [
  { id: 1, title: "Integration Techniques", subject: "Mathematics", dueDate: "Tomorrow", priority: "high", completed: false },
  { id: 2, title: "Waves & Optics Lab Report", subject: "Physics", dueDate: "In 2 days", priority: "medium", completed: false },
  { id: 3, title: "Periodic Table Memorization", subject: "Chemistry", dueDate: "In 3 days", priority: "low", completed: false },
  { id: 4, title: "Genetics Problem Set", subject: "Biology", dueDate: "In 4 days", priority: "medium", completed: false },
]

const initialAchievements = [
  { id: 1, title: "7-Day Streak", description: "Studied every day for a week", icon: Flame, unlocked: true },
  { id: 2, title: "Math Master", description: "Completed 50 math problems", icon: Trophy, unlocked: true },
  { id: 3, title: "Early Bird", description: "Started studying before 8 AM", icon: Target, unlocked: true },
  { id: 4, title: "Consistent Learner", description: "Study 30+ hours this month", icon: TrendingUp, unlocked: false },
]

const subjectColors: Record<string, string> = {
  Mathematics: "bg-chart-1/10 text-chart-1",
  Physics: "bg-chart-2/10 text-chart-2",
  Chemistry: "bg-chart-3/10 text-chart-3",
  Biology: "bg-chart-4/10 text-chart-4",
  English: "bg-chart-5/10 text-chart-5",
}

export function ProgressTracker() {
  const [subjectProgress, setSubjectProgress] = useState(initialSubjectProgress)
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks)
  const [pendingTasks, setPendingTasks] = useState(initialPendingTasks)
  const [achievements, setAchievements] = useState(initialAchievements)

  const totalHours = subjectProgress.reduce((acc, s) => acc + s.hours, 0)
  const avgCompletion = Math.round(
    subjectProgress.reduce((acc, s) => acc + s.completed, 0) / subjectProgress.length
  )
  const totalCompletedTasks = completedTasks.filter((t) => t.checked).length
  const totalPendingCompleted = pendingTasks.filter((t) => t.completed).length

  // Toggle pending task completion
  const togglePendingTask = (taskId: number) => {
    setPendingTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed
          // If completing a task, add to completed list
          if (newCompleted) {
            setCompletedTasks((completedPrev) => [
              {
                id: Date.now(),
                title: task.title,
                subject: task.subject,
                completedAt: "Just now",
                duration: "N/A",
                checked: true,
              },
              ...completedPrev,
            ])
            // Update subject progress
            setSubjectProgress((subjects) =>
              subjects.map((s) => {
                if (s.name === task.subject) {
                  const newCompleted = Math.min(s.completed + 5, 100)
                  return { ...s, completed: newCompleted }
                }
                return s
              })
            )
            // Check for achievements
            const newTotalCompleted = totalCompletedTasks + totalPendingCompleted + 1
            if (newTotalCompleted >= 10) {
              setAchievements((prev) =>
                prev.map((a) =>
                  a.id === 4 ? { ...a, unlocked: true } : a
                )
              )
            }
          }
          return { ...task, completed: newCompleted }
        }
        return task
      })
    )
  }

  // Toggle completed task (uncheck to remove from completed)
  const toggleCompletedTask = (taskId: number) => {
    setCompletedTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    )
  }

  const displayCompletedCount = totalCompletedTasks + totalPendingCompleted

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Progress Tracker</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your study progress and celebrate your achievements.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-chart-1/10">
                <Clock className="size-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{totalHours}h</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-chart-2/10">
                <CheckCircle2 className="size-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{displayCompletedCount}</p>
                <p className="text-sm text-muted-foreground">Tasks Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-chart-3/10">
                <Target className="size-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{avgCompletion}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-chart-5/10">
                <Flame className="size-6 text-chart-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">7 days</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Study Hours Trend</CardTitle>
            <CardDescription>Daily study hours for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyHours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} hours`, "Study Time"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "var(--chart-1)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Hours Bar Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Hours by Subject</CardTitle>
            <CardDescription>Time invested in each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectProgress} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} hours`, "Time Spent"]}
                  />
                  <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                    {subjectProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Subject Progress</CardTitle>
          <CardDescription>Course completion status for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectProgress.map((subject) => (
              <div key={subject.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-muted-foreground">{subject.completed}%</span>
                </div>
                <Progress value={subject.completed} className="h-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{subject.hours} hours studied</span>
                  <span>{100 - subject.completed}% remaining</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completed Tasks */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Completed Tasks</CardTitle>
            <CardDescription>Recently finished study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer",
                    task.checked ? "bg-muted/30" : "bg-muted/50 opacity-50"
                  )}
                  onClick={() => toggleCompletedTask(task.id)}
                >
                  <Checkbox 
                    checked={task.checked} 
                    onCheckedChange={() => toggleCompletedTask(task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium line-clamp-1",
                      !task.checked && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          subjectColors[task.subject]
                        )}
                      >
                        {task.subject}
                      </span>
                      <span className="text-xs text-muted-foreground">{task.completedAt}</span>
                      <span className="text-xs text-muted-foreground">• {task.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Pending Tasks</CardTitle>
            <CardDescription>
              {pendingTasks.filter((t) => !t.completed).length} remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer",
                    task.completed
                      ? "bg-muted/30 opacity-60"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                  onClick={() => togglePendingTask(task.id)}
                >
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => togglePendingTask(task.id)}
                    className="mt-0.5" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium line-clamp-1",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          subjectColors[task.subject]
                        )}
                      >
                        {task.subject}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          task.completed
                            ? "text-chart-2"
                            : task.priority === "high"
                            ? "text-destructive"
                            : task.priority === "medium"
                            ? "text-chart-5"
                            : "text-muted-foreground"
                        )}
                      >
                        {task.completed ? "Completed!" : task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Achievements</CardTitle>
          <CardDescription>Your learning milestones and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "flex flex-col items-center text-center p-4 rounded-xl border transition-all",
                    achievement.unlocked
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/30 border-transparent opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "size-12 rounded-full flex items-center justify-center mb-3",
                      achievement.unlocked ? "bg-primary/10" : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-6",
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <p className="text-sm font-medium">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
