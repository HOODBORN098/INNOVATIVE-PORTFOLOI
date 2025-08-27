import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Filter,
  Search,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  Bell,
  Settings,
  User,
  Tag,
  Ticket,
  CreditCard,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Music,
  Camera,
  Mic,
  Trophy,
  Coffee,
  BookOpen,
  Dumbbell,
  Palette,
  Code,
  Briefcase,
  GraduationCap,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  ThumbsUp,
  MessageCircle,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Zap,
  Target,
  Award,
  Flame,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  MoreVertical,
  ExternalLink,
  QrCode,
  Smartphone,
  Wifi,
  Car,
  Utensils,
  Shield,
  Video,
  Headphones,
  GameController2
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  venue: string;
  organizer: string;
  organizerAvatar: string;
  image: string;
  price: number;
  capacity: number;
  attendees: string[];
  interested: string[];
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isOnline: boolean;
  meetingLink?: string;
  requirements: string[];
  amenities: string[];
  socialLinks: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sold: number;
    description: string;
  }[];
  schedule?: {
    time: string;
    activity: string;
    speaker?: string;
  }[];
  sponsors: string[];
  rating: number;
  reviews: {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'faculty' | 'admin' | 'organizer';
  department: string;
  year?: number;
  interests: string[];
  eventsAttended: string[];
  eventsOrganized: string[];
  eventsInterested: string[];
  badges: string[];
  points: number;
  level: number;
}

interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
  qrCode: string;
}

export function LiveCampusEventsProject() {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [sortBy, setSortBy] = useState("date");

  const [currentUser] = useState<User>({
    id: "user-001",
    name: "Alex Student",
    email: "alex@university.edu",
    avatar: "AS",
    role: "student",
    department: "Computer Science",
    year: 3,
    interests: ["Technology", "Music", "Sports", "Arts"],
    eventsAttended: ["event-001", "event-003", "event-005"],
    eventsOrganized: ["event-007"],
    eventsInterested: ["event-002", "event-004", "event-006"],
    badges: ["Early Bird", "Social Butterfly", "Tech Enthusiast", "Event Creator"],
    points: 850,
    level: 8
  });

  const [events] = useState<Event[]>([
    {
      id: "event-001",
      title: "Annual Tech Summit 2024",
      description: "Join us for the biggest technology conference of the year! Featuring keynote speakers from major tech companies, interactive workshops, networking opportunities, and the latest innovations in AI, blockchain, and quantum computing.",
      category: "Technology",
      date: "2024-03-15",
      time: "09:00",
      endTime: "17:00",
      location: "Main Auditorium",
      venue: "University Conference Center",
      organizer: "Dr. Sarah Johnson",
      organizerAvatar: "SJ",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      price: 25,
      capacity: 500,
      attendees: ["user-001", "user-002", "user-003"],
      interested: ["user-004", "user-005"],
      tags: ["AI", "Blockchain", "Networking", "Innovation", "Keynote"],
      status: "upcoming",
      isOnline: false,
      requirements: ["Student ID", "Laptop recommended"],
      amenities: ["WiFi", "Lunch included", "Parking", "Live streaming"],
      socialLinks: {
        website: "https://techsummit2024.edu",
        twitter: "@TechSummit2024",
        facebook: "TechSummit2024"
      },
      ticketTypes: [
        {
          id: "early-bird",
          name: "Early Bird",
          price: 15,
          quantity: 100,
          sold: 85,
          description: "Limited time offer with breakfast included"
        },
        {
          id: "regular",
          name: "Regular",
          price: 25,
          quantity: 300,
          sold: 120,
          description: "Standard admission with lunch"
        },
        {
          id: "vip",
          name: "VIP",
          price: 50,
          quantity: 100,
          sold: 45,
          description: "Premium seating, networking dinner, and exclusive content"
        }
      ],
      schedule: [
        { time: "09:00", activity: "Registration & Welcome Coffee" },
        { time: "10:00", activity: "Keynote: The Future of AI", speaker: "Dr. Emily Chen" },
        { time: "11:30", activity: "Workshop: Building with React", speaker: "Mark Thompson" },
        { time: "13:00", activity: "Networking Lunch" },
        { time: "14:30", activity: "Panel: Blockchain Revolution" },
        { time: "16:00", activity: "Startup Pitch Competition" },
        { time: "17:00", activity: "Closing & Awards" }
      ],
      sponsors: ["TechCorp", "InnovateLab", "StartupHub"],
      rating: 4.8,
      reviews: [
        {
          id: "review-001",
          user: "Emma Wilson",
          avatar: "EW",
          rating: 5,
          comment: "Amazing event! The keynote speakers were inspiring and the networking opportunities were invaluable.",
          date: "2024-01-20"
        },
        {
          id: "review-002",
          user: "Michael Brown",
          avatar: "MB",
          rating: 4,
          comment: "Great content and well organized. The workshops were particularly helpful.",
          date: "2024-01-22"
        }
      ]
    },
    {
      id: "event-002",
      title: "Spring Music Festival",
      description: "Get ready for an unforgettable evening of live music featuring local bands, DJ sets, food trucks, and a spectacular light show. This outdoor festival celebrates the diverse musical talents of our campus community.",
      category: "Music",
      date: "2024-04-20",
      time: "18:00",
      endTime: "23:00",
      location: "Campus Green",
      venue: "Outdoor Stage",
      organizer: "Music Society",
      organizerAvatar: "MS",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      price: 15,
      capacity: 1000,
      attendees: [],
      interested: ["user-001"],
      tags: ["Live Music", "Festival", "Outdoor", "Food", "Dancing"],
      status: "upcoming",
      isOnline: false,
      requirements: ["Student ID", "Age 18+"],
      amenities: ["Food trucks", "Bar", "Seating area", "Coat check"],
      socialLinks: {
        instagram: "@CampusMusicFest",
        facebook: "SpringMusicFestival"
      },
      ticketTypes: [
        {
          id: "general",
          name: "General Admission",
          price: 15,
          quantity: 800,
          sold: 234,
          description: "Access to main stage and food area"
        },
        {
          id: "vip",
          name: "VIP Experience",
          price: 35,
          quantity: 200,
          sold: 89,
          description: "Front stage access, complimentary drinks, VIP lounge"
        }
      ],
      schedule: [
        { time: "18:00", activity: "Gates Open & Sound Check" },
        { time: "19:00", activity: "Opening Act: Campus Jazz Band" },
        { time: "20:00", activity: "Main Performance: The Wavelengths" },
        { time: "21:30", activity: "DJ Set: Electronic Beats" },
        { time: "22:30", activity: "Closing Performance: Acoustic Hour" },
        { time: "23:00", activity: "Event Ends" }
      ],
      sponsors: ["Student Union", "Local Radio Station"],
      rating: 4.6,
      reviews: []
    },
    {
      id: "event-003",
      title: "Career Fair 2024",
      description: "Connect with top employers, explore career opportunities, and network with industry professionals. Over 100 companies will be present offering internships, full-time positions, and career guidance.",
      category: "Career",
      date: "2024-03-25",
      time: "10:00",
      endTime: "16:00",
      location: "Sports Complex",
      venue: "Exhibition Hall",
      organizer: "Career Services",
      organizerAvatar: "CS",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      price: 0,
      capacity: 2000,
      attendees: ["user-001"],
      interested: ["user-002", "user-003"],
      tags: ["Networking", "Jobs", "Internships", "Professional", "Free"],
      status: "upcoming",
      isOnline: false,
      requirements: ["Resume copies", "Professional attire", "Student ID"],
      amenities: ["Resume review station", "Mock interviews", "Refreshments", "Networking lounge"],
      socialLinks: {
        website: "https://careers.university.edu",
        facebook: "UniversityCareers"
      },
      ticketTypes: [
        {
          id: "free",
          name: "Free Registration",
          price: 0,
          quantity: 2000,
          sold: 567,
          description: "Free access to all career fair activities"
        }
      ],
      schedule: [
        { time: "10:00", activity: "Registration & Welcome" },
        { time: "10:30", activity: "Company Booths Open" },
        { time: "12:00", activity: "Lunch & Networking" },
        { time: "13:00", activity: "Industry Panel Discussion" },
        { time: "14:30", activity: "Resume Review Sessions" },
        { time: "15:30", activity: "Final Networking" },
        { time: "16:00", activity: "Event Closes" }
      ],
      sponsors: ["Microsoft", "Google", "Amazon", "Local Startups"],
      rating: 4.7,
      reviews: []
    },
    {
      id: "event-004",
      title: "Art Exhibition: Digital Dreams",
      description: "Explore the intersection of technology and creativity in this stunning digital art exhibition. Featuring interactive installations, VR experiences, and works from renowned digital artists.",
      category: "Arts",
      date: "2024-04-05",
      time: "14:00",
      endTime: "20:00",
      location: "Art Gallery",
      venue: "Modern Art Wing",
      organizer: "Art Department",
      organizerAvatar: "AD",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=400&fit=crop",
      price: 8,
      capacity: 200,
      attendees: [],
      interested: ["user-001"],
      tags: ["Digital Art", "VR", "Interactive", "Technology", "Creative"],
      status: "upcoming",
      isOnline: false,
      requirements: ["None"],
      amenities: ["Audio guide", "VR headsets", "Artist meet & greet", "Catalog"],
      socialLinks: {
        instagram: "@CampusArt",
        website: "https://art.university.edu"
      },
      ticketTypes: [
        {
          id: "student",
          name: "Student",
          price: 5,
          quantity: 150,
          sold: 23,
          description: "Discounted rate for students"
        },
        {
          id: "general",
          name: "General",
          price: 8,
          quantity: 50,
          sold: 12,
          description: "Standard admission"
        }
      ],
      schedule: [
        { time: "14:00", activity: "Gallery Opens" },
        { time: "15:00", activity: "Artist Talk: Digital Creativity" },
        { time: "16:30", activity: "VR Experience Sessions" },
        { time: "18:00", activity: "Interactive Workshop" },
        { time: "19:30", activity: "Closing Reception" },
        { time: "20:00", activity: "Gallery Closes" }
      ],
      sponsors: ["Adobe", "Local Art Collectors"],
      rating: 4.9,
      reviews: []
    },
    {
      id: "event-005",
      title: "Fitness Challenge Week",
      description: "Join our week-long fitness challenge with daily workouts, nutrition workshops, wellness seminars, and group activities. Win prizes and improve your health!",
      category: "Sports",
      date: "2024-03-18",
      time: "07:00",
      endTime: "19:00",
      location: "Recreation Center",
      venue: "Multiple Locations",
      organizer: "Fitness Club",
      organizerAvatar: "FC",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      price: 10,
      capacity: 300,
      attendees: ["user-001"],
      interested: ["user-002"],
      tags: ["Fitness", "Health", "Challenge", "Group", "Wellness"],
      status: "upcoming",
      isOnline: false,
      requirements: ["Workout clothes", "Water bottle", "Towel"],
      amenities: ["Equipment provided", "Locker rooms", "Showers", "Protein shakes"],
      socialLinks: {
        instagram: "@CampusFitness",
        facebook: "FitnessChallenge2024"
      },
      ticketTypes: [
        {
          id: "full-week",
          name: "Full Week Pass",
          price: 10,
          quantity: 300,
          sold: 89,
          description: "Access to all week activities"
        }
      ],
      schedule: [
        { time: "07:00", activity: "Morning Yoga" },
        { time: "12:00", activity: "HIIT Workout" },
        { time: "14:00", activity: "Nutrition Workshop" },
        { time: "16:00", activity: "Group Challenge" },
        { time: "18:00", activity: "Cool Down Session" }
      ],
      sponsors: ["Nike", "Local Gyms", "Nutrition Store"],
      rating: 4.5,
      reviews: []
    },
    {
      id: "event-006",
      title: "Virtual Reality Gaming Tournament",
      description: "Experience the future of gaming in our VR tournament! Compete in multiple games, win awesome prizes, and test the latest VR technology from leading brands.",
      category: "Gaming",
      date: "2024-04-10",
      time: "12:00",
      endTime: "18:00",
      location: "Computer Lab",
      venue: "VR Gaming Arena",
      organizer: "Gaming Society",
      organizerAvatar: "GS",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=400&fit=crop",
      price: 12,
      capacity: 80,
      attendees: [],
      interested: ["user-001"],
      tags: ["VR", "Gaming", "Tournament", "Technology", "Competition"],
      status: "upcoming",
      isOnline: false,
      requirements: ["None - equipment provided"],
      amenities: ["VR headsets", "Gaming snacks", "Prize pool", "Live streaming"],
      socialLinks: {
        twitch: "CampusGaming",
        discord: "VR Tournament 2024"
      },
      ticketTypes: [
        {
          id: "participant",
          name: "Tournament Entry",
          price: 12,
          quantity: 64,
          sold: 31,
          description: "Compete in the tournament"
        },
        {
          id: "spectator",
          name: "Spectator",
          price: 5,
          quantity: 16,
          sold: 8,
          description: "Watch and cheer"
        }
      ],
      schedule: [
        { time: "12:00", activity: "Registration & Setup" },
        { time: "13:00", activity: "Qualifying Rounds" },
        { time: "15:00", activity: "Semi-Finals" },
        { time: "16:30", activity: "Finals" },
        { time: "17:30", activity: "Awards Ceremony" },
        { time: "18:00", activity: "Tournament Ends" }
      ],
      sponsors: ["Oculus", "HTC", "Gaming Store"],
      rating: 4.8,
      reviews: []
    },
    {
      id: "event-007",
      title: "Startup Pitch Night",
      description: "Watch aspiring entrepreneurs present their innovative ideas to a panel of investors and industry experts. Network with founders, learn about startup culture, and get inspired!",
      category: "Business",
      date: "2024-03-22",
      time: "19:00",
      endTime: "22:00",
      location: "Business School",
      venue: "Innovation Hub",
      organizer: "Alex Student",
      organizerAvatar: "AS",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      price: 5,
      capacity: 150,
      attendees: [],
      interested: ["user-002", "user-003"],
      tags: ["Startups", "Entrepreneurship", "Pitch", "Networking", "Innovation"],
      status: "upcoming",
      isOnline: true,
      meetingLink: "https://zoom.us/j/123456789",
      requirements: ["Business attire encouraged"],
      amenities: ["Networking reception", "Live Q&A", "Recording available", "Refreshments"],
      socialLinks: {
        website: "https://startup.university.edu",
        linkedin: "Campus Entrepreneurs"
      },
      ticketTypes: [
        {
          id: "in-person",
          name: "In-Person",
          price: 5,
          quantity: 100,
          sold: 34,
          description: "Attend in person with networking"
        },
        {
          id: "virtual",
          name: "Virtual",
          price: 0,
          quantity: 50,
          sold: 12,
          description: "Join online via Zoom"
        }
      ],
      schedule: [
        { time: "19:00", activity: "Welcome & Networking" },
        { time: "19:30", activity: "Startup Pitches Begin" },
        { time: "21:00", activity: "Investor Q&A" },
        { time: "21:30", activity: "Awards & Winners" },
        { time: "22:00", activity: "Closing Reception" }
      ],
      sponsors: ["Venture Capital Fund", "Business Incubator"],
      rating: 4.6,
      reviews: []
    },
    {
      id: "event-008",
      title: "Cultural Food Festival",
      description: "Celebrate diversity through food! Taste authentic dishes from around the world prepared by international students and local chefs. Live cultural performances throughout the day.",
      category: "Cultural",
      date: "2024-04-15",
      time: "11:00",
      endTime: "17:00",
      location: "Student Plaza",
      venue: "Outdoor Pavilion",
      organizer: "International Student Association",
      organizerAvatar: "ISA",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
      price: 0,
      capacity: 1500,
      attendees: [],
      interested: ["user-001", "user-002"],
      tags: ["Food", "Culture", "International", "Free", "Family-friendly"],
      status: "upcoming",
      isOnline: false,
      requirements: ["None"],
      amenities: ["Food vendors", "Cultural performances", "Kids area", "Photo booth"],
      socialLinks: {
        facebook: "CulturalFoodFest",
        instagram: "@FoodFestival2024"
      },
      ticketTypes: [
        {
          id: "free-entry",
          name: "Free Entry",
          price: 0,
          quantity: 1500,
          sold: 456,
          description: "Free admission - pay per food item"
        }
      ],
      schedule: [
        { time: "11:00", activity: "Festival Opens" },
        { time: "12:00", activity: "Cultural Dance Performance" },
        { time: "13:30", activity: "Cooking Demonstration" },
        { time: "15:00", activity: "Music from Around the World" },
        { time: "16:00", activity: "Traditional Costume Show" },
        { time: "17:00", activity: "Festival Closes" }
      ],
      sponsors: ["Local Restaurants", "Cultural Center"],
      rating: 4.7,
      reviews: []
    }
  ]);

  const categories = useMemo(() => {
    const allCategories = events.map(event => event.category);
    return [...new Set(allCategories)].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      const matchesDate = !selectedDate || event.date === selectedDate;
      
      return matchesSearch && matchesCategory && matchesDate;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popularity':
          return (b.attendees.length + b.interested.length) - (a.attendees.length + a.interested.length);
        case 'price':
          return a.price - b.price;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
  }, [events, searchTerm, selectedCategory, selectedDate, sortBy]);

  const joinEvent = (eventId: string) => {
    // In a real app, this would make an API call
    console.log(`Joined event: ${eventId}`);
  };

  const toggleInterested = (eventId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggled interest for event: ${eventId}`);
  };

  const EventCard = ({ event }: { event: Event }) => {
    const isAttending = event.attendees.includes(currentUser.id);
    const isInterested = event.interested.includes(currentUser.id);
    const availableTickets = event.ticketTypes.reduce((sum, ticket) => sum + (ticket.quantity - ticket.sold), 0);
    
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="relative">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge className={`${
              event.status === 'upcoming' ? 'bg-green-500/90 text-white' :
              event.status === 'ongoing' ? 'bg-blue-500/90 text-white' :
              event.status === 'completed' ? 'bg-gray-500/90 text-white' :
              'bg-red-500/90 text-white'
            }`}>
              {event.status}
            </Badge>
            {event.isOnline && (
              <Badge className="bg-purple-500/90 text-white">
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                <Calendar className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <Clock className="w-3 h-3 text-white ml-2" />
                <span className="text-white text-xs">{event.time}</span>
              </div>
              <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-white text-xs font-medium">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {event.title}
            </h3>
            <Badge variant="outline" className="ml-2 flex-shrink-0">
              {event.category}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{event.attendees.length}/{event.capacity}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {event.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">
                {event.organizerAvatar}
              </div>
              <span>{event.organizer}</span>
            </div>
            {event.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{event.rating}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => {
                setSelectedEvent(event);
                setIsEventDetailsOpen(true);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
            <Button 
              size="sm" 
              variant={isInterested ? "default" : "outline"}
              onClick={() => toggleInterested(event.id)}
            >
              <Heart className={`w-4 h-4 ${isInterested ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              disabled={availableTickets === 0 || isAttending}
            >
              {isAttending ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : availableTickets === 0 ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <Ticket className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-purple-900/10 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CampusEvents
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Discover & Join Campus Activities
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">Level:</span>
                  <span className="font-semibold">{currentUser.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Points:</span>
                  <span className="font-semibold">{currentUser.points}</span>
                </div>
              </div>
              
              <Button size="sm" variant="outline">
                <Bell className="w-4 h-4" />
                <Badge className="ml-2 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.avatar}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 capitalize">{currentUser.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 rounded-none h-12">
              <TabsTrigger 
                value="discover" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20"
              >
                <Search className="w-4 h-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger 
                value="my-events" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20"
              >
                <User className="w-4 h-4" />
                My Events
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20"
              >
                <Plus className="w-4 h-4" />
                Create Event
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20"
              >
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} className="h-full">
            
            {/* Discover Tab */}
            <TabsContent value="discover" className="h-full mt-0 p-6">
              
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search events, organizers, or topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      onClick={() => setViewMode('grid')}
                    >
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      onClick={() => setViewMode('list')}
                    >
                      <div className="w-4 h-4 flex flex-col gap-0.5">
                        <div className="bg-current h-0.5 rounded-sm"></div>
                        <div className="bg-current h-0.5 rounded-sm"></div>
                        <div className="bg-current h-0.5 rounded-sm"></div>
                      </div>
                    </Button>
                  </div>
                  
                  <Badge variant="outline">
                    {filteredEvents.length} events found
                  </Badge>
                </div>
              </div>

              {/* Events Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}

              {/* Events List */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                              {event.title}
                            </h3>
                            <Badge variant="outline">{event.category}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees.length}/{event.capacity}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className="text-center">
                            {event.price === 0 ? 'Free' : `$${event.price}`}
                          </Badge>
                          <Button size="sm" onClick={() => {
                            setSelectedEvent(event);
                            setIsEventDetailsOpen(true);
                          }}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {filteredEvents.length === 0 && (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No events found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* My Events Tab */}
            <TabsContent value="my-events" className="h-full mt-0 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Attending Events */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Attending ({currentUser.eventsAttended.length})
                  </h3>
                  <div className="space-y-3">
                    {events.filter(event => currentUser.eventsAttended.includes(event.id)).map(event => (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{event.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Interested Events */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Interested ({currentUser.eventsInterested.length})
                  </h3>
                  <div className="space-y-3">
                    {events.filter(event => currentUser.eventsInterested.includes(event.id)).map(event => (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{event.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString()} • ${event.price === 0 ? 'Free' : event.price}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {event.category}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* My Organized Events */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    Organized ({currentUser.eventsOrganized.length})
                  </h3>
                  <div className="space-y-3">
                    {events.filter(event => currentUser.eventsOrganized.includes(event.id)).map(event => (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{event.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {event.attendees.length} attendees • {event.interested.length} interested
                          </p>
                          <Badge 
                            className={`text-xs mt-1 ${
                              event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                              event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* User Stats */}
                <Card className="p-6 lg:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    My Activity Stats
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{currentUser.eventsAttended.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Events Attended</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{currentUser.eventsOrganized.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Events Organized</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{currentUser.points}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Points Earned</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{currentUser.level}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Achievement Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.badges.map(badge => (
                        <Badge key={badge} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          <Award className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Create Event Tab */}
            <TabsContent value="create" className="h-full mt-0 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Event</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your event with the campus community
                  </p>
                </div>

                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event Title
                      </label>
                      <Input placeholder="Enter event title" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <Input type="date" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time
                      </label>
                      <Input type="time" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <Input placeholder="Event location" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Capacity
                      </label>
                      <Input type="number" placeholder="Maximum attendees" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <Textarea 
                        placeholder="Describe your event..."
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price ($)
                      </label>
                      <Input type="number" step="0.01" placeholder="0.00" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event Image
                      </label>
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Publish Event</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <CalendarIcon className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Calendar View
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Interactive calendar view with event scheduling and management features coming soon!
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="h-full mt-0 p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event Analytics</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Insights into campus event trends and participation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{events.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {events.reduce((sum, event) => sum + event.attendees.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Attendees</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(events.reduce((sum, event) => sum + event.rating, 0) / events.filter(e => e.rating > 0).length * 10) / 10}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Activity className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {events.filter(e => e.status === 'upcoming').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Category Distribution */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Events by Category
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category, index) => {
                        const categoryEvents = events.filter(event => event.category === category).length;
                        const percentage = Math.round((categoryEvents / events.length) * 100);
                        
                        return (
                          <div key={category}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Popular Events */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      Most Popular Events
                    </h3>
                    <div className="space-y-3">
                      {events
                        .sort((a, b) => (b.attendees.length + b.interested.length) - (a.attendees.length + a.interested.length))
                        .slice(0, 5)
                        .map((event, index) => (
                          <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <ImageWithFallback
                              src={event.image}
                              alt={event.title}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{event.title}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {event.attendees.length + event.interested.length} interested
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>

                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl mb-2">{selectedEvent.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedEvent.time} - {selectedEvent.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${
                    selectedEvent.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    selectedEvent.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedEvent.status}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <ImageWithFallback
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">About this event</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Event Schedule</h3>
                      <div className="space-y-3">
                        {selectedEvent.schedule.map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded text-sm font-medium text-indigo-700 dark:text-indigo-300">
                              {item.time}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                              {item.speaker && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">by {item.speaker}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.amenities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedEvent.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <Card className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Starting price</div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Attendees:</span>
                        <span className="font-medium">{selectedEvent.attendees.length}/{selectedEvent.capacity}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Interested:</span>
                        <span className="font-medium">{selectedEvent.interested.length}</span>
                      </div>
                      {selectedEvent.rating > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{selectedEvent.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <Ticket className="w-4 h-4 mr-2" />
                        Get Tickets
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Wishlist
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Event
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Organized by</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedEvent.organizerAvatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedEvent.organizer}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {selectedEvent.tags.length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}

                  {Object.keys(selectedEvent.socialLinks).length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Social Links</h3>
                      <div className="space-y-2">
                        {selectedEvent.socialLinks.website && (
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Globe className="w-4 h-4 mr-2" />
                            Website
                          </Button>
                        )}
                        {selectedEvent.socialLinks.facebook && (
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                        )}
                        {selectedEvent.socialLinks.twitter && (
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                          </Button>
                        )}
                        {selectedEvent.socialLinks.instagram && (
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                          </Button>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}