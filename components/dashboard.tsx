"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  Calendar,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const initialStats = [
  {
    id: "hours",
    label: "Hours Studied",
    value: "24.5",
    change: "+12%",
    trend: "up",
    icon: Clock,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    id: "tasks",
    label: "Tasks Completed",
    value: "18/25",
    completedCount: 18,
    totalCount: 25,
    change: "+8%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: "streak",
    label: "Current Streak",
    value: "7 days",
    change: "+2",
    trend: "up",
    icon: Target,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: "subjects",
    label: "Subjects Active",
    value: "5",
    change: "Same",
    trend: "neutral",
    icon: BookOpen,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 2.5 },
  { day: "Sun", hours: 2.5 },
]

const subjectDistribution = [
  { name: "Mathematics", value: 30, color: "var(--chart-1)" },
  { name: "Physics", value: 25, color: "var(--chart-2)" },
  { name: "Chemistry", value: 20, color: "var(--chart-3)" },
  { name: "Biology", value: 15, color: "var(--chart-4)" },
  { name: "English", value: 10, color: "var(--chart-5)" },
]

const initialTasks = [
  {
    id: 1,
    title: "Complete Calculus Chapter 5",
    subject: "Mathematics",
    dueDate: "Today",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Tomorrow",
    completed: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Review Organic Chemistry Notes",
    subject: "Chemistry",
    dueDate: "In 2 days",
    completed: true,
    priority: "low",
  },
  {
    id: 4,
    title: "Essay Draft - Shakespeare",
    subject: "English",
    dueDate: "In 3 days",
    completed: false,
    priority: "medium",
  },
]

const initialGoals = [
  { id: "studyHours", label: "Study Hours", current: 24.5, target: 30, unit: "hrs" },
  { id: "tasksCompleted", label: "Tasks Completed", current: 18, target: 25, unit: "tasks" },
  { id: "problems", label: "Practice Problems", current: 45, target: 50, unit: "problems" },
  { id: "pages", label: "Reading Pages", current: 120, target: 200, unit: "pages" },
]

export function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [goals, setGoals] = useState(initialGoals)

  const toggleTaskComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
    
    // Update the tasks goal when a task is toggled
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === "tasksCompleted") {
          const currentTask = tasks.find((t) => t.id === taskId)
          const delta = currentTask?.completed ? -1 : 1
          return { ...goal, current: Math.max(0, goal.current + delta) }
        }
        return goal
      })
    )
  }

  const completedTasksCount = tasks.filter((t) => t.completed).length
  const totalTasksCount = tasks.length

  // Calculate dynamic stats
  const dynamicStats = initialStats.map((stat) => {
    if (stat.id === "tasks") {
      return {
        ...stat,
        value: `${completedTasksCount}/${totalTasksCount}`,
      }
    }
    return stat
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s your study progress overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3 text-chart-2" />
                      <span className="text-xs text-chart-2 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Weekly Study Activity</CardTitle>
            <CardDescription>Hours studied per day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
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
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [`${value} hours`, "Study Time"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Study Distribution</CardTitle>
            <CardDescription>Time spent per subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Time"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {subjectDistribution.slice(0, 3).map((subject) => (
                <div key={subject.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-muted-foreground">{subject.name}</span>
                  </div>
                  <span className="font-medium">{subject.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
                <CardDescription>
                  {completedTasksCount} of {totalTasksCount} completed
                </CardDescription>
              </div>
              <Calendar className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => toggleTaskComplete(task.id)}
                >
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => toggleTaskComplete(task.id)}
                    className="mt-0.5" 
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium transition-all ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{task.subject}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span
                        className={`text-xs font-medium ${
                          task.completed
                            ? "text-muted-foreground"
                            : task.dueDate === "Today"
                            ? "text-destructive"
                            : task.dueDate === "Tomorrow"
                            ? "text-chart-5"
                            : "text-muted-foreground"
                        }`}
                      >
                        {task.completed ? "Completed" : task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Weekly Goals Progress</CardTitle>
            <CardDescription>Track your weekly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {goals.map((goal) => {
                const percentage = Math.round((goal.current / goal.target) * 100)
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{goal.label}</span>
                      <span className="font-medium">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
