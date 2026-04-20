"use client"

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

const stats = [
  {
    label: "Hours Studied",
    value: "24.5",
    change: "+12%",
    trend: "up",
    icon: Clock,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    label: "Tasks Completed",
    value: "18/25",
    change: "+8%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    label: "Current Streak",
    value: "7 days",
    change: "+2",
    trend: "up",
    icon: Target,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
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

const upcomingTasks = [
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

export function Dashboard() {
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
        {stats.map((stat) => {
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
                <CardDescription>Your next study assignments</CardDescription>
              </div>
              <Calendar className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Checkbox checked={task.completed} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
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
                          task.dueDate === "Today"
                            ? "text-destructive"
                            : task.dueDate === "Tomorrow"
                            ? "text-chart-5"
                            : "text-muted-foreground"
                        }`}
                      >
                        {task.dueDate}
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
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Study Hours</span>
                  <span className="font-medium">24.5 / 30 hrs</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">18 / 25 tasks</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Practice Problems</span>
                  <span className="font-medium">45 / 50 problems</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reading Pages</span>
                  <span className="font-medium">120 / 200 pages</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
