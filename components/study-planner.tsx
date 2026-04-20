"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
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

const generateScheduleFromSubjects = (subjects: Subject[]): Record<string, ScheduleItem[]> => {
  const schedule: Record<string, ScheduleItem[]> = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  }

  const times = ["09:00", "11:00", "14:00", "16:00", "19:00"]
  const durations = ["1h", "1.5h", "2h"]
  let timeIndex = 0
  let dayIndex = 0

  subjects.forEach((subject) => {
    subject.topics.forEach((topic, topicIndex) => {
      const day = weekDays[dayIndex % 7]
      schedule[day].push({
        id: `${subject.id}-${topicIndex}`,
        time: times[timeIndex % times.length],
        subject: subject.name,
        topic: topic,
        duration: durations[topicIndex % durations.length],
        completed: false,
      })
      timeIndex++
      if (timeIndex % 2 === 0) dayIndex++
    })
  })

  return schedule
}

const subjectColors: Record<string, string> = {
  Mathematics: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Physics: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Chemistry: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Biology: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  English: "bg-chart-5/10 text-chart-5 border-chart-5/20",
}

const getSubjectColor = (subjectName: string): string => {
  if (subjectColors[subjectName]) return subjectColors[subjectName]
  const colors = Object.values(subjectColors)
  const hash = subjectName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export function StudyPlanner() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [newTopic, setNewTopic] = useState("")
  const [newDeadline, setNewDeadline] = useState("")
  const [schedule, setSchedule] = useState<Record<string, ScheduleItem[]>>({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  })
  const [selectedDay, setSelectedDay] = useState("Mon")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [planGenerated, setPlanGenerated] = useState(false)

  const addSubject = () => {
    if (newSubject.trim()) {
      const topics = newTopic.trim() 
        ? newTopic.split(",").map((t) => t.trim()).filter(Boolean)
        : ["General Study"]
      
      setSubjects([
        ...subjects,
        {
          id: Date.now().toString(),
          name: newSubject.trim(),
          topics: topics,
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
    if (planGenerated) {
      setPlanGenerated(false)
      setSchedule({
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
      })
    }
  }

  const generatePlan = () => {
    if (subjects.length === 0) return
    
    setIsGenerating(true)
    setTimeout(() => {
      const newSchedule = generateScheduleFromSubjects(subjects)
      setSchedule(newSchedule)
      setPlanGenerated(true)
      setIsGenerating(false)
    }, 1500)
  }

  const toggleTaskComplete = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }))
  }

  const removeTask = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
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

  // Calculate overall progress
  const allTasks = Object.values(schedule).flat()
  const completedTasks = allTasks.filter((t) => t.completed).length
  const totalTasks = allTasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

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
                onKeyDown={(e) => e.key === "Enter" && addSubject()}
              />
              <Input
                placeholder="Topics (comma-separated, optional)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubject()}
              />
              <Input
                type="date"
                placeholder="Deadline"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
              <Button 
                onClick={addSubject} 
                className="w-full" 
                size="sm"
                disabled={!newSubject.trim()}
              >
                <Plus className="size-4" />
                Add Subject
              </Button>
            </div>

            {/* Subject List */}
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm font-medium text-muted-foreground">
                Your Subjects ({subjects.length})
              </p>
              {subjects.length === 0 ? (
                <div className="py-8 text-center">
                  <BookOpen className="size-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No subjects added yet</p>
                  <p className="text-xs text-muted-foreground">Add a subject above to get started</p>
                </div>
              ) : (
                subjects.map((subject) => (
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
                ))
              )}
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
                  {planGenerated ? "Regenerate Plan" : "Generate Plan"}
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
                <CardDescription>
                  {planGenerated 
                    ? "AI-generated study plan for the week" 
                    : "Add subjects and generate a plan to see your schedule"
                  }
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setCurrentWeek((w) => w - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm font-medium px-2 min-w-[80px] text-center">
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
            {/* Progress Bar */}
            {planGenerated && totalTasks > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Weekly Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedTasks} / {totalTasks} tasks ({progressPercentage}%)
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            {/* Day Selector */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {weekDays.map((day, index) => {
                const isSelected = selectedDay === day
                const tasksForDay = schedule[day] || []
                const completedForDay = tasksForDay.filter((t) => t.completed).length
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
                      {tasksForDay.slice(0, 3).map((task, i) => (
                        <div
                          key={i}
                          className={cn(
                            "size-1.5 rounded-full",
                            isSelected
                              ? "bg-primary-foreground/50"
                              : task.completed
                              ? "bg-chart-2"
                              : "bg-muted-foreground/30"
                          )}
                        />
                      ))}
                      {tasksForDay.length > 3 && (
                        <span className={cn(
                          "text-[8px] ml-0.5",
                          isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          +{tasksForDay.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Day Schedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{fullDays[weekDays.indexOf(selectedDay)]}</h3>
                {planGenerated && (schedule[selectedDay]?.length || 0) > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {schedule[selectedDay]?.filter((t) => t.completed).length || 0} /{" "}
                    {schedule[selectedDay]?.length || 0} completed
                  </span>
                )}
              </div>

              {!planGenerated ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Sparkles className="size-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-1">No plan generated yet</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Add your subjects on the left and click &quot;Generate Plan&quot; to create your personalized study schedule
                  </p>
                </div>
              ) : schedule[selectedDay]?.length > 0 ? (
                schedule[selectedDay].map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "group flex items-start gap-4 p-4 rounded-xl border transition-all",
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
                              getSubjectColor(task.subject)
                            )}
                          >
                            {task.subject}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeTask(selectedDay, task.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                        >
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <BookOpen className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No tasks scheduled for this day</p>
                  <p className="text-sm text-muted-foreground">Enjoy your day off!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
