"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Sparkles,
  X,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Subject {
  id: string
  name: string
  topics: string[]
  deadline: string
}

interface ScheduleItem {
  id: string
  time: string
  subject: string
  topic: string
  duration: string
  completed: boolean
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const initialSchedule: Record<string, ScheduleItem[]> = {
  Mon: [
    { id: "m1", time: "09:00", subject: "Mathematics", topic: "Calculus - Integration", duration: "2h", completed: true },
    { id: "m2", time: "14:00", subject: "Physics", topic: "Thermodynamics", duration: "1.5h", completed: false },
    { id: "m3", time: "19:00", subject: "Chemistry", topic: "Organic Reactions", duration: "1h", completed: false },
  ],
  Tue: [
    { id: "t1", time: "10:00", subject: "Biology", topic: "Cell Division", duration: "1.5h", completed: false },
    { id: "t2", time: "15:00", subject: "English", topic: "Essay Writing", duration: "2h", completed: false },
    { id: "t3", time: "20:00", subject: "Mathematics", topic: "Linear Algebra", duration: "1h", completed: false },
  ],
  Wed: [
    { id: "w1", time: "09:00", subject: "Physics", topic: "Waves & Optics", duration: "2h", completed: false },
    { id: "w2", time: "14:00", subject: "Chemistry", topic: "Equilibrium", duration: "1.5h", completed: false },
  ],
  Thu: [
    { id: "th1", time: "10:00", subject: "Mathematics", topic: "Probability", duration: "2h", completed: false },
    { id: "th2", time: "15:00", subject: "Biology", topic: "Genetics", duration: "1.5h", completed: false },
    { id: "th3", time: "19:00", subject: "English", topic: "Literature Analysis", duration: "1h", completed: false },
  ],
  Fri: [
    { id: "f1", time: "09:00", subject: "Chemistry", topic: "Atomic Structure", duration: "1.5h", completed: false },
    { id: "f2", time: "14:00", subject: "Physics", topic: "Mechanics Review", duration: "2h", completed: false },
  ],
  Sat: [
    { id: "s1", time: "10:00", subject: "Mathematics", topic: "Practice Problems", duration: "3h", completed: false },
    { id: "s2", time: "15:00", subject: "Biology", topic: "Revision", duration: "2h", completed: false },
  ],
  Sun: [
    { id: "su1", time: "11:00", subject: "All Subjects", topic: "Weekly Review", duration: "2h", completed: false },
    { id: "su2", time: "16:00", subject: "English", topic: "Reading", duration: "1.5h", completed: false },
  ],
}

const subjectColors: Record<string, string> = {
  Mathematics: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Physics: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Chemistry: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Biology: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  English: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  "All Subjects": "bg-primary/10 text-primary border-primary/20",
}

export function StudyPlanner() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Mathematics", topics: ["Calculus", "Linear Algebra", "Probability"], deadline: "2025-05-15" },
    { id: "2", name: "Physics", topics: ["Thermodynamics", "Waves", "Mechanics"], deadline: "2025-05-20" },
    { id: "3", name: "Chemistry", topics: ["Organic", "Inorganic", "Physical"], deadline: "2025-05-18" },
  ])
  const [newSubject, setNewSubject] = useState("")
  const [newTopic, setNewTopic] = useState("")
  const [newDeadline, setNewDeadline] = useState("")
  const [schedule, setSchedule] = useState(initialSchedule)
  const [selectedDay, setSelectedDay] = useState("Mon")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)

  const addSubject = () => {
    if (newSubject.trim() && newTopic.trim()) {
      setSubjects([
        ...subjects,
        {
          id: Date.now().toString(),
          name: newSubject,
          topics: newTopic.split(",").map((t) => t.trim()),
          deadline: newDeadline,
        },
      ])
      setNewSubject("")
      setNewTopic("")
      setNewDeadline("")
    }
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  const generatePlan = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const toggleTaskComplete = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }))
  }

  const getWeekDates = () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7)

    return weekDays.map((_, index) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + index)
      return date.getDate()
    })
  }

  const weekDates = getWeekDates()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Study Planner</h1>
        <p className="text-muted-foreground mt-1">
          Add your subjects and let AI generate an optimized study schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Add Subjects</CardTitle>
            <CardDescription>Enter your subjects, topics, and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Subject name (e.g., Mathematics)"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <Input
                placeholder="Topics (comma-separated)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
              <Input
                type="date"
                placeholder="Deadline"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
              <Button onClick={addSubject} className="w-full" size="sm">
                <Plus className="size-4" />
                Add Subject
              </Button>
            </div>

            {/* Subject List */}
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm font-medium text-muted-foreground">Your Subjects</p>
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {subject.topics.join(", ")}
                    </p>
                    {subject.deadline && (
                      <p className="text-xs text-chart-1">Due: {subject.deadline}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeSubject(subject.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePlan}
              disabled={subjects.length === 0 || isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Weekly Schedule</CardTitle>
                <CardDescription>AI-generated study plan for the week</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setCurrentWeek((w) => w - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm font-medium px-2">
                  {currentWeek === 0 ? "This Week" : currentWeek > 0 ? `+${currentWeek} Week` : `${currentWeek} Week`}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setCurrentWeek((w) => w + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Selector */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {weekDays.map((day, index) => {
                const isSelected = selectedDay === day
                const tasksForDay = schedule[day] || []
                const completedTasks = tasksForDay.filter((t) => t.completed).length
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "flex-1 min-w-[60px] flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted text-foreground"
                    )}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    <span className={cn("text-lg font-semibold", isSelected ? "" : "text-muted-foreground")}>
                      {weekDates[index]}
                    </span>
                    <div className="flex gap-0.5">
                      {tasksForDay.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "size-1.5 rounded-full",
                            isSelected
                              ? "bg-primary-foreground/50"
                              : i < completedTasks
                              ? "bg-chart-2"
                              : "bg-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Day Schedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{fullDays[weekDays.indexOf(selectedDay)]}</h3>
                <span className="text-sm text-muted-foreground">
                  {schedule[selectedDay]?.filter((t) => t.completed).length || 0} /{" "}
                  {schedule[selectedDay]?.length || 0} completed
                </span>
              </div>

              {schedule[selectedDay]?.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border transition-all",
                    task.completed ? "bg-muted/30 opacity-60" : "bg-card hover:shadow-sm"
                  )}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskComplete(selectedDay, task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.topic}
                        </p>
                        <span
                          className={cn(
                            "inline-block mt-1 text-xs px-2 py-0.5 rounded-full border",
                            subjectColors[task.subject] || "bg-muted text-muted-foreground"
                          )}
                        >
                          {task.subject}
                        </span>
                      </div>
                      <button className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {task.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="size-3.5" />
                        {task.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {(!schedule[selectedDay] || schedule[selectedDay].length === 0) && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <BookOpen className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No tasks scheduled for this day</p>
                  <p className="text-sm text-muted-foreground">Add subjects and generate a plan</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
