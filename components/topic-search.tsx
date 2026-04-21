"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Play,
  Clock,
  ThumbsUp,
  ExternalLink,
  X,
  BookOpen,
  Sparkles,
  Filter,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoSuggestion {
  id: string
  title: string
  channel: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
}

// Pre-defined video suggestions for different topics
const videoDatabase: Record<string, VideoSuggestion[]> = {
  calculus: [
    {
      id: "calc1",
      title: "Calculus 1 - Full Course for Beginners",
      channel: "freeCodeCamp.org",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=320&h=180&fit=crop",
      duration: "11:53:23",
      views: "8.2M",
      likes: "245K",
      description: "Learn Calculus 1 in this complete course. Covers limits, derivatives, and integrals.",
      level: "Beginner",
    },
    {
      id: "calc2",
      title: "Essence of Calculus - 3Blue1Brown",
      channel: "3Blue1Brown",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=320&h=180&fit=crop",
      duration: "17:04",
      views: "12.4M",
      likes: "421K",
      description: "A visual introduction to derivatives and the fundamental theorem of calculus.",
      level: "Beginner",
    },
    {
      id: "calc3",
      title: "Calculus: Integration Techniques",
      channel: "Khan Academy",
      thumbnail: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=320&h=180&fit=crop",
      duration: "32:15",
      views: "2.1M",
      likes: "89K",
      description: "Master integration by parts, substitution, and partial fractions.",
      level: "Intermediate",
    },
  ],
  physics: [
    {
      id: "phys1",
      title: "Physics 101 - Complete Mechanics Course",
      channel: "Professor Dave Explains",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=320&h=180&fit=crop",
      duration: "4:32:18",
      views: "5.6M",
      likes: "178K",
      description: "Everything you need to know about classical mechanics for Physics 101.",
      level: "Beginner",
    },
    {
      id: "phys2",
      title: "Quantum Physics Made Simple",
      channel: "Veritasium",
      thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=320&h=180&fit=crop",
      duration: "21:47",
      views: "18.2M",
      likes: "567K",
      description: "An intuitive explanation of quantum mechanics and wave-particle duality.",
      level: "Intermediate",
    },
  ],
  programming: [
    {
      id: "prog1",
      title: "Python Full Course for Beginners",
      channel: "Programming with Mosh",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=320&h=180&fit=crop",
      duration: "6:14:07",
      views: "35.2M",
      likes: "892K",
      description: "Learn Python programming from scratch. No prior experience needed.",
      level: "Beginner",
    },
    {
      id: "prog2",
      title: "JavaScript Crash Course",
      channel: "Traversy Media",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop",
      duration: "1:40:29",
      views: "4.8M",
      likes: "156K",
      description: "Learn JavaScript fundamentals including variables, loops, functions, and DOM manipulation.",
      level: "Beginner",
    },
    {
      id: "prog3",
      title: "React JS Full Course 2024",
      channel: "Academind",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop",
      duration: "8:45:32",
      views: "2.1M",
      likes: "98K",
      description: "Complete React course covering hooks, context, routing, and modern patterns.",
      level: "Intermediate",
    },
  ],
  chemistry: [
    {
      id: "chem1",
      title: "Organic Chemistry Fundamentals",
      channel: "The Organic Chemistry Tutor",
      thumbnail: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=320&h=180&fit=crop",
      duration: "3:28:45",
      views: "7.3M",
      likes: "234K",
      description: "Master organic chemistry with this comprehensive video on reactions and mechanisms.",
      level: "Intermediate",
    },
    {
      id: "chem2",
      title: "Introduction to Chemistry",
      channel: "CrashCourse",
      thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=320&h=180&fit=crop",
      duration: "11:24",
      views: "9.8M",
      likes: "312K",
      description: "A fun and engaging introduction to the world of chemistry.",
      level: "Beginner",
    },
  ],
  mathematics: [
    {
      id: "math1",
      title: "Linear Algebra Full Course",
      channel: "MIT OpenCourseWare",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=320&h=180&fit=crop",
      duration: "5:45:12",
      views: "4.2M",
      likes: "145K",
      description: "Complete linear algebra course covering vectors, matrices, and eigenvalues.",
      level: "Intermediate",
    },
    {
      id: "math2",
      title: "Statistics Made Easy",
      channel: "StatQuest",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=180&fit=crop",
      duration: "45:23",
      views: "6.7M",
      likes: "287K",
      description: "Understand statistics concepts with clear, simple explanations and examples.",
      level: "Beginner",
    },
  ],
  biology: [
    {
      id: "bio1",
      title: "Cell Biology Complete Course",
      channel: "Amoeba Sisters",
      thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=320&h=180&fit=crop",
      duration: "2:15:34",
      views: "3.4M",
      likes: "112K",
      description: "Everything about cells, organelles, and cellular processes.",
      level: "Beginner",
    },
    {
      id: "bio2",
      title: "Genetics and DNA Explained",
      channel: "Khan Academy",
      thumbnail: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=320&h=180&fit=crop",
      duration: "1:28:19",
      views: "5.1M",
      likes: "198K",
      description: "Understand DNA replication, transcription, and genetic inheritance.",
      level: "Intermediate",
    },
  ],
  english: [
    {
      id: "eng1",
      title: "English Grammar Complete Course",
      channel: "English with Lucy",
      thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=320&h=180&fit=crop",
      duration: "2:45:12",
      views: "8.9M",
      likes: "267K",
      description: "Master English grammar from basic to advanced level.",
      level: "Beginner",
    },
    {
      id: "eng2",
      title: "Academic Writing Tips",
      channel: "Wordvice",
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=320&h=180&fit=crop",
      duration: "28:45",
      views: "1.2M",
      likes: "45K",
      description: "Learn how to write compelling essays and research papers.",
      level: "Intermediate",
    },
  ],
}

const trendingTopics = [
  "Calculus",
  "Python",
  "Physics",
  "Chemistry",
  "React",
  "Statistics",
  "Biology",
  "JavaScript",
]

const levelColors = {
  Beginner: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Intermediate: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Advanced: "bg-chart-1/10 text-chart-1 border-chart-1/20",
}

export function TopicSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<VideoSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [savedVideos, setSavedVideos] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const searchVideos = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    // Simulate API delay
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase().trim()
      let results: VideoSuggestion[] = []

      // Search through all topics
      Object.keys(videoDatabase).forEach((topic) => {
        if (topic.includes(normalizedQuery) || normalizedQuery.includes(topic)) {
          results = [...results, ...videoDatabase[topic]]
        }
      })

      // If no exact match, do fuzzy search
      if (results.length === 0) {
        Object.keys(videoDatabase).forEach((topic) => {
          videoDatabase[topic].forEach((video) => {
            if (
              video.title.toLowerCase().includes(normalizedQuery) ||
              video.description.toLowerCase().includes(normalizedQuery)
            ) {
              results.push(video)
            }
          })
        })
      }

      // If still no results, show some default suggestions
      if (results.length === 0) {
        results = [
          ...videoDatabase.programming.slice(0, 2),
          ...videoDatabase.mathematics.slice(0, 1),
        ]
      }

      // Apply level filter
      if (selectedLevel) {
        results = results.filter((v) => v.level === selectedLevel)
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 800)
  }

  const handleSearch = () => {
    searchVideos(searchQuery)
  }

  const handleTrendingClick = (topic: string) => {
    setSearchQuery(topic)
    searchVideos(topic)
  }

  const toggleSaveVideo = (videoId: string) => {
    setSavedVideos((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    )
  }

  // Filter results when level changes
  useEffect(() => {
    if (hasSearched) {
      searchVideos(searchQuery)
    }
  }, [selectedLevel])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Learn with Videos</h1>
        <p className="text-muted-foreground mt-1">
          Search any topic and find the best YouTube tutorials to help you learn.
        </p>
      </div>

      {/* Search Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Search for a topic (e.g., Calculus, Python, Physics)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-11 h-12 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSearchResults([])
                    setHasSearched(false)
                    inputRef.current?.focus()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button onClick={handleSearch} disabled={isSearching} size="lg" className="h-12 px-6">
              {isSearching ? (
                <>
                  <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Find Videos
                </>
              )}
            </Button>
          </div>

          {/* Trending Topics */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Trending topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTrendingClick(topic)}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      {hasSearched && (
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by level:</span>
          <div className="flex gap-2">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-full border transition-all",
                  selectedLevel === level
                    ? levelColors[level as keyof typeof levelColors]
                    : "bg-background hover:bg-muted border-border"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {isSearching
                ? "Searching..."
                : searchResults.length > 0
                ? `Found ${searchResults.length} video${searchResults.length !== 1 ? "s" : ""}`
                : "No videos found"}
            </h2>
            {savedVideos.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {savedVideos.length} saved
              </span>
            )}
          </div>

          {/* Video Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((video) => (
                <Card
                  key={video.id}
                  className="group border-0 shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="size-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                        <Play className="size-5 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                      {video.duration}
                    </div>
                    <div
                      className={cn(
                        "absolute top-2 left-2 px-2 py-0.5 text-xs rounded-full border",
                        levelColors[video.level]
                      )}
                    >
                      {video.level}
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{video.channel}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {video.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="size-3" />
                          {video.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => toggleSaveVideo(video.id)}
                          className={cn(
                            savedVideos.includes(video.id) && "text-primary"
                          )}
                        >
                          <BookOpen className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                                video.title
                              )}`,
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            !isSearching && (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium mb-1">No videos found for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-muted-foreground">
                    Try searching for a different topic or check the trending topics above.
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}

      {/* Empty State */}
      {!hasSearched && (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <div className="size-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <Play className="size-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Discover Learning Videos</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search for any topic you want to learn and we will suggest the best YouTube videos
              to help you master it.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
