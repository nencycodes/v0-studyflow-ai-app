"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  MessageCircle,
  Book,
  Video,
  ChevronRight,
  ChevronDown,
  Search,
  Mail,
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HelpSupportProps {
  onClose: () => void
}

const faqs = [
  {
    id: 1,
    question: "How does the AI study planner work?",
    answer: "Our AI analyzes your subjects, deadlines, and learning patterns to create an optimized study schedule. It considers your preferred study times, breaks, and distributes topics evenly to maximize retention.",
  },
  {
    id: 2,
    question: "How do I earn XP and level up?",
    answer: "You earn XP by completing tasks, maintaining study streaks, hitting daily goals, and unlocking achievements. Each level requires more XP, and leveling up unlocks new badges and features.",
  },
  {
    id: 3,
    question: "Can I customize my study schedule?",
    answer: "Absolutely! After generating a plan, you can drag and drop tasks, adjust times, mark items as complete, or add new subjects. The AI learns from your changes to improve future recommendations.",
  },
  {
    id: 4,
    question: "What happens if I miss a day?",
    answer: "Don&apos;t worry! Missing a day resets your streak but keeps all your progress and XP. The AI will automatically reschedule missed tasks and help you get back on track.",
  },
  {
    id: 5,
    question: "How are achievements unlocked?",
    answer: "Achievements are earned by reaching specific milestones like studying for 7 consecutive days, completing a certain number of tasks, or mastering a subject. Check your profile to see all available badges.",
  },
]

const resources = [
  { id: 1, title: "Getting Started Guide", description: "Learn the basics in 5 minutes", icon: Book, type: "article" },
  { id: 2, title: "Video Tutorials", description: "Watch step-by-step walkthroughs", icon: Video, type: "video" },
  { id: 3, title: "Study Tips & Tricks", description: "Boost your productivity", icon: Sparkles, type: "article" },
  { id: 4, title: "Community Forum", description: "Connect with other learners", icon: MessageCircle, type: "link" },
]

export function HelpSupport({ onClose }: HelpSupportProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [ticketSent, setTicketSent] = useState(false)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmitTicket = () => {
    if (ticketSubject && ticketMessage) {
      setTicketSent(true)
      setTicketSubject("")
      setTicketMessage("")
      setTimeout(() => setTicketSent(false), 3000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground mt-1">
            Find answers or get in touch with our team
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="size-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 text-base bg-muted/50 border-0"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-lg border bg-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-sm">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="size-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="size-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No results found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="size-5 text-primary" />
              <CardTitle className="text-base font-semibold">Resources</CardTitle>
            </div>
            <CardDescription>Learn more about StudyFlow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources.map((resource) => {
                const Icon = resource.icon
                return (
                  <button
                    key={resource.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-primary" />
            <CardTitle className="text-base font-semibold">Contact Support</CardTitle>
          </div>
          <CardDescription>Can&apos;t find what you&apos;re looking for? Send us a message</CardDescription>
        </CardHeader>
        <CardContent>
          {ticketSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="size-16 rounded-full bg-chart-2/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="size-8 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold">Message Sent!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We&apos;ll get back to you within 24 hours
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="What do you need help with?"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  placeholder="Describe your issue or question in detail..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={4}
                  className={cn(
                    "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmitTicket} disabled={!ticketSubject || !ticketMessage}>
                  <Mail className="size-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
