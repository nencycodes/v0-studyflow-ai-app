"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  BookOpen,
  Target,
  Clock,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuickAction {
  label: string
  prompt: string
  icon: React.ElementType
}

const quickActions: QuickAction[] = [
  { label: "Study tips", prompt: "Give me some effective study tips", icon: Lightbulb },
  { label: "Create schedule", prompt: "Help me create a study schedule", icon: Clock },
  { label: "Stay motivated", prompt: "How can I stay motivated while studying?", icon: Target },
  { label: "Learn faster", prompt: "What are the best techniques to learn faster?", icon: BookOpen },
]

// AI responses based on keywords
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("study tip") || lowerMessage.includes("study tips")) {
    return `Here are some effective study tips:

1. **Use Active Recall** - Test yourself instead of just re-reading notes. Create flashcards or practice problems.

2. **Spaced Repetition** - Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks).

3. **Pomodoro Technique** - Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break.

4. **Teach Others** - Explaining concepts to someone else helps solidify your understanding.

5. **Create a Dedicated Study Space** - A consistent, distraction-free environment improves focus.

Would you like me to explain any of these techniques in more detail?`
  }

  if (lowerMessage.includes("schedule") || lowerMessage.includes("plan")) {
    return `I'd be happy to help you create a study schedule! Here's a template to get started:

**Morning Block (8-12):**
- Focus on your most challenging subjects
- Your brain is freshest in the morning
- Include a 15-min break every 45 mins

**Afternoon Block (1-5):**
- Review morning material
- Work on practice problems
- Take a 30-min break for lunch

**Evening Block (6-8):**
- Light review and flashcards
- Plan tomorrow's sessions
- Avoid learning new complex topics

**Pro Tips:**
- Study your weakest subject when you have the most energy
- Include buffer time for unexpected tasks
- Be realistic - don't over-schedule!

Would you like me to help you customize this for your specific subjects?`
  }

  if (lowerMessage.includes("motivated") || lowerMessage.includes("motivation")) {
    return `Staying motivated can be challenging! Here are some strategies that really work:

1. **Set SMART Goals** - Specific, Measurable, Achievable, Relevant, Time-bound goals give you clear direction.

2. **Track Your Progress** - Use the Progress Tracker to see how far you've come. Small wins build momentum!

3. **Reward Yourself** - After completing study sessions, treat yourself to something you enjoy.

4. **Study with Purpose** - Remember WHY you're studying. Connect it to your bigger goals.

5. **Find a Study Buddy** - Accountability partners can help keep you on track.

6. **Break Down Big Tasks** - Large projects feel less overwhelming when divided into smaller chunks.

7. **Celebrate Streaks** - You're on a streak! Keep it going to earn bonus XP.

What specific aspect of motivation are you struggling with?`
  }

  if (lowerMessage.includes("learn faster") || lowerMessage.includes("faster")) {
    return `Great question! Here are proven techniques to accelerate your learning:

1. **Interleaving** - Mix different topics in one session instead of blocking one subject. This improves retention.

2. **Elaborative Interrogation** - Ask "why" and "how" about concepts to understand deeper.

3. **Mind Mapping** - Visual connections between concepts help memory and understanding.

4. **Chunking** - Group related information together (like how phone numbers are grouped).

5. **Use Multiple Senses** - Read, listen, write, and speak the material for better encoding.

6. **Sleep Well** - Your brain consolidates memories during sleep. Aim for 7-9 hours.

7. **Practice Retrieval** - Testing yourself is more effective than re-reading.

Which subject are you trying to learn faster? I can give more specific advice!`
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return `Hello! 👋 I'm your AI study assistant. I'm here to help you:

- **Plan your studies** - Create effective schedules
- **Stay motivated** - Tips and encouragement
- **Learn efficiently** - Study techniques and strategies
- **Track progress** - Understand your learning patterns

What would you like help with today?`
  }

  if (lowerMessage.includes("thank")) {
    return `You're welcome! 😊 Remember, consistent effort leads to great results. Keep up the amazing work with your studies!

Is there anything else I can help you with?`
  }

  if (lowerMessage.includes("exam") || lowerMessage.includes("test")) {
    return `Exam preparation is crucial! Here's a strategy:

**One Week Before:**
- Review all material and identify weak areas
- Create a study schedule prioritizing weaknesses
- Make summary notes and flashcards

**2-3 Days Before:**
- Do practice problems and past papers
- Focus on understanding, not memorizing
- Get good sleep (7-9 hours)

**Night Before:**
- Light review only - no new material
- Prepare everything you need
- Relax and go to bed early

**Exam Day:**
- Eat a good breakfast
- Arrive early
- Read all questions first before answering

Good luck! You've got this! 💪`
  }

  if (lowerMessage.includes("focus") || lowerMessage.includes("concentrate") || lowerMessage.includes("distract")) {
    return `Struggling with focus is common! Here are techniques to improve concentration:

**Environment:**
- Find a quiet, dedicated study space
- Put your phone on Do Not Disturb
- Use website blockers for distracting sites

**Techniques:**
- **Pomodoro** - 25 min work, 5 min break
- **Time blocking** - Schedule specific tasks
- **Single-tasking** - One thing at a time

**Physical:**
- Stay hydrated
- Take short movement breaks
- Get enough sleep

**Mental:**
- Start with the hardest task first
- Break large tasks into smaller chunks
- Write down distracting thoughts to address later

Would you like me to elaborate on any of these?`
  }

  // Default response for other messages
  return `That's an interesting question! While I'm specifically trained to help with study-related topics, I can offer some general guidance.

Here's what I can help you with:
- Creating effective study schedules
- Learning techniques and strategies
- Motivation and productivity tips
- Exam preparation advice
- Focus and concentration techniques

Feel free to ask about any of these topics, or click one of the quick action buttons below!`
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI study assistant. How can I help you today? You can ask me about study tips, scheduling, motivation, or learning techniques!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
        >
          <MessageCircle className="size-6" />
          <span className="absolute -top-2 -right-2 size-5 bg-chart-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 bg-card border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300",
            isExpanded
              ? "inset-4 lg:inset-8"
              : "bottom-6 right-6 w-[calc(100%-3rem)] sm:w-96 h-[500px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Study Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Powered by AI</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
            className={cn(
              "overflow-y-auto p-4 space-y-4 bg-background",
              isExpanded ? "h-[calc(100%-140px)]" : "h-[calc(100%-180px)]"
            )}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-full flex-shrink-0 flex items-center justify-center",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary/20 to-accent/20 text-primary"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="size-4" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={cn(
                      "text-[10px] mt-2 opacity-70",
                      message.role === "user" ? "text-right" : ""
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="size-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  <Sparkles className="size-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t bg-background">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 whitespace-nowrap transition-colors"
                    >
                      <Icon className="size-3" />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask me anything about studying..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
