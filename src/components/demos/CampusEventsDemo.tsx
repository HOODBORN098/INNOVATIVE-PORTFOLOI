import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, MapPin, Users, Search, Bell, Heart, Share2, Clock, Filter } from "lucide-react";

export function CampusEventsDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedEvents, setLikedEvents] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: "1",
      title: "Tech Talk: AI in Healthcare",
      date: "2024-01-20",
      time: "14:00",
      location: "Computer Science Auditorium",
      category: "academic",
      attendees: 45,
      maxAttendees: 100,
      description: "Join us for an insightful discussion on the applications of AI in modern healthcare systems.",
      organizer: "CS Department",
      image: "🤖"
    },
    {
      id: "2",
      title: "Campus Music Festival",
      date: "2024-01-22",
      time: "18:00",
      location: "Main Quadrangle",
      category: "entertainment",
      attendees: 234,
      maxAttendees: 500,
      description: "Annual music festival featuring local bands and student performers.",
      organizer: "Student Union",
      image: "🎵"
    },
    {
      id: "3",
      title: "Career Fair 2024",
      date: "2024-01-25",
      time: "10:00",
      location: "Sports Complex",
      category: "career",
      attendees: 156,
      maxAttendees: 300,
      description: "Meet with top employers and explore internship and job opportunities.",
      organizer: "Career Services",
      image: "💼"
    },
    {
      id: "4",
      title: "Basketball vs Rivals",
      date: "2024-01-18",
      time: "19:00",
      location: "University Gym",
      category: "sports",
      attendees: 89,
      maxAttendees: 150,
      description: "Cheer on our team in this exciting match against our biggest rivals!",
      organizer: "Athletics Department",
      image: "🏀"
    },
    {
      id: "5",
      title: "Study Group: Data Structures",
      date: "2024-01-19",
      time: "16:00",
      location: "Library Study Room 3",
      category: "academic",
      attendees: 12,
      maxAttendees: 20,
      description: "Collaborative study session for Data Structures exam preparation.",
      organizer: "CS Student Association",
      image: "📚"
    }
  ];

  const categories = [
    { id: "all", name: "All Events", icon: "📅" },
    { id: "academic", name: "Academic", icon: "🎓" },
    { id: "entertainment", name: "Entertainment", icon: "🎭" },
    { id: "career", name: "Career", icon: "💼" },
    { id: "sports", name: "Sports", icon: "⚽" }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (eventId: string) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "entertainment": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "career": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "sports": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Campus Events</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Discover what's happening on campus</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Badge variant="secondary">
              📍 On Campus
            </Badge>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search events, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button size="sm" variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              size="sm"
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 h-[450px] overflow-auto">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <div className="flex gap-4">
                    {/* Event Icon/Image */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center text-2xl shrink-0">
                      {event.image}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.maxAttendees} attending</span>
                          <div className="ml-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleLike(event.id)}
                            className={`${likedEvents.includes(event.id) ? 'text-red-500 border-red-200' : ''}`}
                          >
                            <Heart className={`w-4 h-4 ${likedEvents.includes(event.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Join Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Events with the highest engagement and attendance rates
              </p>
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="mt-0">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">My Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Events you've joined or created
              </p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Create New Event
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}