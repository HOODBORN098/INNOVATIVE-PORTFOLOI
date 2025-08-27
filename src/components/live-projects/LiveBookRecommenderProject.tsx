import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  BookOpen, 
  Star, 
  Heart, 
  Filter, 
  TrendingUp,
  User,
  Settings,
  Library,
  Target,
  Award,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Users,
  Zap,
  Brain,
  Sparkles,
  Calendar,
  Tag,
  Globe,
  Coffee,
  Moon,
  Sun,
  Flame,
  TrendingDown,
  Activity,
  MessageCircle,
  Plus,
  X,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Layers,
  Database,
  Cpu,
  BookMarked,
  GraduationCap,
  Languages,
  MapPin,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  rating: number;
  totalRatings: number;
  description: string;
  pages: number;
  publishYear: number;
  language: string;
  isbn: string;
  cover: string;
  price: number;
  inStock: boolean;
  tags: string[];
  series?: string;
  seriesNumber?: number;
  publisher: string;
  awards: string[];
  popularity: number;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ageGroup: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favoriteGenres: string[];
  readBooks: string[];
  wishlist: string[];
  ratings: { [bookId: string]: number };
  reviews: { [bookId: string]: string };
  readingGoal: number;
  booksReadThisYear: number;
  joinDate: string;
  badges: string[];
  level: number;
  experience: number;
  streak: number;
  preferences: {
    language: string[];
    difficulty: string[];
    length: 'Short' | 'Medium' | 'Long' | 'Any';
    themes: string[];
  };
}

interface Recommendation {
  book: Book;
  score: number;
  reason: string;
  similarity: number;
  tags: string[];
}

export function LiveBookRecommenderProject() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [filterRating, setFilterRating] = useState([0]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "user-001",
    name: "Alex Reader",
    email: "alex@bookworm.com",
    avatar: "AR",
    favoriteGenres: ["Science Fiction", "Mystery", "Non-Fiction"],
    readBooks: ["book-001", "book-003", "book-005", "book-008", "book-012"],
    wishlist: ["book-002", "book-007", "book-015"],
    ratings: {
      "book-001": 5,
      "book-003": 4,
      "book-005": 5,
      "book-008": 3,
      "book-012": 4
    },
    reviews: {
      "book-001": "Absolutely mind-blowing! The world-building is incredible and the characters are so well-developed.",
      "book-003": "Great mystery with unexpected twists. Kept me guessing until the end.",
      "book-005": "Essential reading for anyone interested in personal development. Life-changing insights."
    },
    readingGoal: 24,
    booksReadThisYear: 18,
    joinDate: "2023-01-15",
    badges: ["Early Bird", "Speed Reader", "Genre Explorer", "Reviewer"],
    level: 12,
    experience: 2450,
    streak: 15,
    preferences: {
      language: ["English", "Spanish"],
      difficulty: ["Intermediate", "Advanced"],
      length: "Any",
      themes: ["Technology", "Human Nature", "Adventure", "Mystery"]
    }
  });

  const [books] = useState<Book[]>([
    {
      id: "book-001",
      title: "The Neural Frontier",
      author: "Dr. Sarah Chen",
      genre: ["Science Fiction", "Technology"],
      rating: 4.8,
      totalRatings: 1247,
      description: "A gripping tale of artificial intelligence and human consciousness in the near future. When Dr. Elena Rodriguez creates the first truly sentient AI, she must navigate the ethical implications and corporate interests that threaten to destroy everything she's worked for.",
      pages: 384,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-123456-78-9",
      cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=450&fit=crop",
      price: 19.99,
      inStock: true,
      tags: ["AI", "Ethics", "Future", "Technology", "Consciousness"],
      publisher: "TechnoBooks",
      awards: ["Hugo Award Nominee 2024", "Nebula Award Winner"],
      popularity: 95,
      readingTime: "6-8 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-002",
      title: "Midnight at the Library",
      author: "Eleanor Blackwood",
      genre: ["Mystery", "Thriller"],
      rating: 4.6,
      totalRatings: 2156,
      description: "When librarian Margaret finds a coded message in a rare manuscript, she's drawn into a centuries-old mystery that puts her life in danger. A perfect blend of historical intrigue and modern suspense.",
      pages: 298,
      publishYear: 2023,
      language: "English",
      isbn: "978-0-987654-32-1",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
      price: 16.99,
      inStock: true,
      tags: ["Library", "History", "Code", "Suspense", "Female Protagonist"],
      publisher: "Mystery House",
      awards: ["Edgar Award Nominee"],
      popularity: 88,
      readingTime: "5-7 hours",
      difficulty: "Beginner",
      ageGroup: "Adult"
    },
    {
      id: "book-003",
      title: "The Productivity Paradox",
      author: "Marcus Johnson",
      genre: ["Non-Fiction", "Self-Help", "Business"],
      rating: 4.7,
      totalRatings: 3421,
      description: "Why working harder isn't working. A revolutionary approach to productivity that focuses on working smarter, not harder. Based on extensive research and real-world case studies.",
      pages: 256,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-555666-77-8",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
      price: 22.99,
      inStock: true,
      tags: ["Productivity", "Business", "Efficiency", "Work-Life Balance", "Psychology"],
      publisher: "Success Publications",
      awards: ["Wall Street Journal Bestseller"],
      popularity: 92,
      readingTime: "4-6 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-004",
      title: "Dragons of the Northern Realm",
      author: "Aria Stormwind",
      genre: ["Fantasy", "Adventure"],
      rating: 4.5,
      totalRatings: 1876,
      description: "In a world where dragons have returned, young Kael must master ancient magic to save his village from an approaching darkness. The first book in an epic fantasy series.",
      pages: 445,
      publishYear: 2023,
      language: "English",
      isbn: "978-0-444555-66-7",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      price: 18.99,
      inStock: true,
      tags: ["Dragons", "Magic", "Coming of Age", "Epic Fantasy", "Adventure"],
      series: "Northern Realm Chronicles",
      seriesNumber: 1,
      publisher: "Fantasy Worlds",
      awards: [],
      popularity: 85,
      readingTime: "8-10 hours",
      difficulty: "Beginner",
      ageGroup: "Young Adult"
    },
    {
      id: "book-005",
      title: "The Art of Deep Learning",
      author: "Prof. David Kim",
      genre: ["Technology", "Non-Fiction", "Education"],
      rating: 4.9,
      totalRatings: 987,
      description: "A comprehensive guide to understanding and implementing deep learning algorithms. From neural networks to transformers, this book covers it all with practical examples and code.",
      pages: 512,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-777888-99-0",
      cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=450&fit=crop",
      price: 39.99,
      inStock: true,
      tags: ["Machine Learning", "AI", "Programming", "Neural Networks", "Python"],
      publisher: "Tech Education Press",
      awards: ["ACM Best Technical Book 2024"],
      popularity: 79,
      readingTime: "12-15 hours",
      difficulty: "Advanced",
      ageGroup: "Adult"
    },
    {
      id: "book-006",
      title: "Love in the Time of Algorithms",
      author: "Isabella Martinez",
      genre: ["Romance", "Contemporary"],
      rating: 4.3,
      totalRatings: 2890,
      description: "When software engineer Maya creates a dating app algorithm, she never expects it to match her with her biggest rival. A modern romance about love, technology, and second chances.",
      pages: 312,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-222333-44-5",
      cover: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=300&h=450&fit=crop",
      price: 15.99,
      inStock: true,
      tags: ["Romance", "Technology", "Second Chances", "Contemporary", "Enemies to Lovers"],
      publisher: "Heartstrings Publishing",
      awards: [],
      popularity: 90,
      readingTime: "5-6 hours",
      difficulty: "Beginner",
      ageGroup: "Adult"
    },
    {
      id: "book-007",
      title: "The History of Tomorrow",
      author: "Dr. Rachel Thompson",
      genre: ["History", "Non-Fiction", "Science"],
      rating: 4.4,
      totalRatings: 1543,
      description: "How past predictions about the future shaped our present reality. A fascinating exploration of futurism, technology, and human imagination throughout history.",
      pages: 367,
      publishYear: 2023,
      language: "English",
      isbn: "978-0-111222-33-4",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
      price: 24.99,
      inStock: false,
      tags: ["History", "Future", "Technology", "Society", "Predictions"],
      publisher: "Academic Press",
      awards: ["History Book of the Year Nominee"],
      popularity: 72,
      readingTime: "7-9 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-008",
      title: "Quantum Hearts",
      author: "James Liu",
      genre: ["Science Fiction", "Romance"],
      rating: 4.2,
      totalRatings: 1234,
      description: "In a universe where parallel realities collide, physicist Dr. Emma Chen discovers that love might be the only constant across infinite dimensions.",
      pages: 289,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-888999-00-1",
      cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=450&fit=crop",
      price: 17.99,
      inStock: true,
      tags: ["Quantum Physics", "Romance", "Parallel Worlds", "Science", "Love"],
      publisher: "Cosmos Books",
      awards: [],
      popularity: 76,
      readingTime: "5-7 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-009",
      title: "The Minimalist Mind",
      author: "Zen Walker",
      genre: ["Self-Help", "Philosophy", "Lifestyle"],
      rating: 4.6,
      totalRatings: 2765,
      description: "Discover the power of simplicity in a complex world. A practical guide to decluttering not just your space, but your mind and life.",
      pages: 198,
      publishYear: 2023,
      language: "English",
      isbn: "978-0-666777-88-9",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
      price: 14.99,
      inStock: true,
      tags: ["Minimalism", "Mindfulness", "Simplicity", "Lifestyle", "Peace"],
      publisher: "Zen Publications",
      awards: ["Mindfulness Book Award"],
      popularity: 89,
      readingTime: "3-4 hours",
      difficulty: "Beginner",
      ageGroup: "Adult"
    },
    {
      id: "book-010",
      title: "Code Breakers",
      author: "Anna Cipher",
      genre: ["Thriller", "Technology", "Espionage"],
      rating: 4.7,
      totalRatings: 1998,
      description: "When a team of ethical hackers discovers a government conspiracy, they must use their skills to expose the truth before they become the next targets.",
      pages: 356,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-333444-55-6",
      cover: "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=300&h=450&fit=crop",
      price: 19.99,
      inStock: true,
      tags: ["Hacking", "Conspiracy", "Technology", "Thriller", "Government"],
      publisher: "Cyber Thrillers",
      awards: [],
      popularity: 84,
      readingTime: "6-8 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-011",
      title: "Cooking with Chemistry",
      author: "Chef Molecular",
      genre: ["Cooking", "Science", "Non-Fiction"],
      rating: 4.8,
      totalRatings: 876,
      description: "Understand the science behind great cooking. From the Maillard reaction to molecular gastronomy, discover how chemistry makes food delicious.",
      pages: 234,
      publishYear: 2024,
      language: "English",
      isbn: "978-0-555444-33-2",
      cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=450&fit=crop",
      price: 29.99,
      inStock: true,
      tags: ["Cooking", "Science", "Chemistry", "Food", "Recipes"],
      publisher: "Culinary Science",
      awards: ["James Beard Award Nominee"],
      popularity: 67,
      readingTime: "4-6 hours",
      difficulty: "Intermediate",
      ageGroup: "Adult"
    },
    {
      id: "book-012",
      title: "The Time Traveler's Cookbook",
      author: "Chronos Chef",
      genre: ["Fantasy", "Cooking", "Adventure"],
      rating: 4.4,
      totalRatings: 1567,
      description: "Recipes and stories from across time and space. Join our time-traveling chef as they collect culinary treasures from different eras and civilizations.",
      pages: 278,
      publishYear: 2023,
      language: "English",
      isbn: "978-0-777666-55-4",
      cover: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=450&fit=crop",
      price: 21.99,
      inStock: true,
      tags: ["Time Travel", "Cooking", "Fantasy", "History", "Adventure"],
      publisher: "Temporal Tales",
      awards: [],
      popularity: 73,
      readingTime: "5-7 hours",
      difficulty: "Beginner",
      ageGroup: "Young Adult"
    }
  ]);

  const genres = useMemo(() => {
    const allGenres = books.flatMap(book => book.genre);
    return [...new Set(allGenres)].sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesGenre = !selectedGenre || book.genre.includes(selectedGenre);
      const matchesRating = book.rating >= filterRating[0];
      
      return matchesSearch && matchesGenre && matchesRating;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'year':
          return b.publishYear - a.publishYear;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [books, searchTerm, selectedGenre, filterRating, sortBy]);

  // AI-powered recommendation algorithm
  const generateRecommendations = (): Recommendation[] => {
    const userReadBooks = books.filter(book => currentUser.readBooks.includes(book.id));
    const userGenres = currentUser.favoriteGenres;
    const userRatings = currentUser.ratings;
    
    // Books not read by user
    const unreadBooks = books.filter(book => !currentUser.readBooks.includes(book.id));
    
    const recommendations: Recommendation[] = unreadBooks.map(book => {
      let score = 0;
      let reasons: string[] = [];
      
      // Genre matching (40% weight)
      const genreMatches = book.genre.filter(genre => userGenres.includes(genre)).length;
      const genreScore = (genreMatches / userGenres.length) * 40;
      score += genreScore;
      
      if (genreMatches > 0) {
        reasons.push(`Matches your favorite genres: ${book.genre.filter(g => userGenres.includes(g)).join(', ')}`);
      }
      
      // Author similarity (15% weight)
      const sameAuthorBooks = userReadBooks.filter(readBook => readBook.author === book.author);
      if (sameAuthorBooks.length > 0) {
        const avgAuthorRating = sameAuthorBooks.reduce((sum, b) => sum + (userRatings[b.id] || 0), 0) / sameAuthorBooks.length;
        score += (avgAuthorRating / 5) * 15;
        reasons.push(`You enjoyed other books by ${book.author}`);
      }
      
      // Rating similarity (20% weight)
      const ratingScore = (book.rating / 5) * 20;
      score += ratingScore;
      
      if (book.rating >= 4.5) {
        reasons.push('Highly rated by other readers');
      }
      
      // Popularity (10% weight)
      const popularityScore = (book.popularity / 100) * 10;
      score += popularityScore;
      
      // Tags similarity (15% weight)
      const userTags = userReadBooks.flatMap(b => b.tags);
      const tagMatches = book.tags.filter(tag => userTags.includes(tag)).length;
      const tagScore = Math.min(tagMatches / 3, 1) * 15;
      score += tagScore;
      
      if (tagMatches > 0) {
        reasons.push(`Similar themes to books you've enjoyed`);
      }
      
      // Random factor to add variety
      score += Math.random() * 5;
      
      return {
        book,
        score: Math.min(score, 100),
        reason: reasons.join(' • ') || 'Recommended based on your reading history',
        similarity: Math.min(score / 100, 1),
        tags: book.tags.filter(tag => userTags.includes(tag))
      };
    });
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  };

  const recommendations = useMemo(() => generateRecommendations(), [currentUser, books]);

  const addToWishlist = (bookId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      wishlist: prev.wishlist.includes(bookId) 
        ? prev.wishlist.filter(id => id !== bookId)
        : [...prev.wishlist, bookId]
    }));
  };

  const rateBook = (bookId: string, rating: number) => {
    setCurrentUser(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [bookId]: rating }
    }));
  };

  const markAsRead = (bookId: string) => {
    if (!currentUser.readBooks.includes(bookId)) {
      setCurrentUser(prev => ({
        ...prev,
        readBooks: [...prev.readBooks, bookId],
        booksReadThisYear: prev.booksReadThisYear + 1,
        experience: prev.experience + 50,
        streak: prev.streak + 1
      }));
    }
  };

  const getReadingProgress = () => {
    return Math.min((currentUser.booksReadThisYear / currentUser.readingGoal) * 100, 100);
  };

  const BookCard = ({ book, showRecommendationScore = false, recommendationData }: { 
    book: Book; 
    showRecommendationScore?: boolean;
    recommendationData?: Recommendation;
  }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="relative">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {!book.inStock && (
            <Badge className="bg-red-500/90 text-white">Out of Stock</Badge>
          )}
          {showRecommendationScore && recommendationData && (
            <Badge className="bg-purple-500/90 text-white flex items-center gap-1">
              <Brain className="w-3 h-3" />
              {Math.round(recommendationData.score)}%
            </Badge>
          )}
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white"
            onClick={() => addToWishlist(book.id)}
          >
            <Heart 
              className={`w-4 h-4 ${currentUser.wishlist.includes(book.id) ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-medium">{book.rating}</span>
            <span className="text-white/70 text-xs">({book.totalRatings})</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>
          <Badge variant="outline" className="ml-2 flex-shrink-0">
            ${book.price}
          </Badge>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genre.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
          {book.genre.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{book.genre.length - 2}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {book.description}
        </p>
        
        {showRecommendationScore && recommendationData && (
          <div className="mb-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-xs text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3 h-3 inline mr-1" />
              {recommendationData.reason}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {book.pages} pages
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {book.readingTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {book.publishYear}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setSelectedBook(book);
              setIsBookDetailsOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Details
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => markAsRead(book.id)}
            disabled={currentUser.readBooks.includes(book.id)}
          >
            {currentUser.readBooks.includes(book.id) ? (
              <>
                <BookMarked className="w-4 h-4 mr-1" />
                Read
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Mark as Read
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-orange-900/10 dark:to-red-900/10 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  BookSage AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Intelligent Book Recommendations
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Goal:</span>
                  <span className="font-semibold">{currentUser.booksReadThisYear}/{currentUser.readingGoal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                  <span className="font-semibold">{currentUser.streak} days</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.avatar}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">Level {currentUser.level}</div>
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
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20"
              >
                <Sparkles className="w-4 h-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger 
                value="recommendations" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20"
              >
                <Brain className="w-4 h-4" />
                AI Recommendations
              </TabsTrigger>
              <TabsTrigger 
                value="library" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20"
              >
                <Library className="w-4 h-4" />
                My Library
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20"
              >
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-900/20"
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
                      placeholder="Search books, authors, or topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Genres</SelectItem>
                      {genres.map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min Rating:</span>
                    <div className="w-32">
                      <Slider
                        value={filterRating}
                        onValueChange={setFilterRating}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{filterRating[0]}</span>
                  </div>
                  
                  <Badge variant="outline" className="ml-auto">
                    {filteredBooks.length} books found
                  </Badge>
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No books found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* AI Recommendations Tab */}
            <TabsContent value="recommendations" className="h-full mt-0 p-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Personalized Recommendations
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on your reading history, favorite genres, and ratings, here are books we think you'll love.
                </p>
                
                <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100">AI Recommendation Engine</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Using machine learning to analyze your preferences and reading patterns
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendations.map(recommendation => (
                  <BookCard 
                    key={recommendation.book.id} 
                    book={recommendation.book} 
                    showRecommendationScore={true}
                    recommendationData={recommendation}
                  />
                ))}
              </div>
            </TabsContent>

            {/* My Library Tab */}
            <TabsContent value="library" className="h-full mt-0 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Reading Progress */}
                <div className="lg:col-span-3">
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reading Goal Progress</h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {Math.round(getReadingProgress())}% Complete
                      </Badge>
                    </div>
                    <Progress value={getReadingProgress()} className="mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentUser.booksReadThisYear} of {currentUser.readingGoal} books read this year
                    </p>
                  </Card>
                </div>

                {/* Read Books */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-green-600" />
                    Read Books ({currentUser.readBooks.length})
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {books.filter(book => currentUser.readBooks.includes(book.id)).map(book => (
                      <div key={book.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ImageWithFallback
                          src={book.cover}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{book.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-3 h-3 cursor-pointer ${
                                  star <= (currentUser.ratings[book.id] || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                onClick={() => rateBook(book.id, star)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Wishlist */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Wishlist ({currentUser.wishlist.length})
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {books.filter(book => currentUser.wishlist.includes(book.id)).map(book => (
                      <div key={book.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ImageWithFallback
                          src={book.cover}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{book.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
                          <p className="text-xs font-medium text-green-600 dark:text-green-400">${book.price}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => addToWishlist(book.id)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Badges & Achievements */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Badges & Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentUser.badges.map(badge => (
                      <Badge key={badge} className="justify-center p-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Experience</span>
                      <span className="text-sm text-blue-600">{currentUser.experience} XP</span>
                    </div>
                    <Progress value={(currentUser.experience % 500) / 5} />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {500 - (currentUser.experience % 500)} XP to next level
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="h-full mt-0 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Profile Header */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {currentUser.avatar}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Level {currentUser.level}
                        </Badge>
                        <Badge variant="outline">
                          Member since {new Date(currentUser.joinDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{currentUser.streak}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Reading Stats */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Reading Statistics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Books Read This Year</span>
                        <span className="font-semibold text-lg">{currentUser.booksReadThisYear}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total Books Read</span>
                        <span className="font-semibold text-lg">{currentUser.readBooks.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Books in Wishlist</span>
                        <span className="font-semibold text-lg">{currentUser.wishlist.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Average Rating Given</span>
                        <span className="font-semibold text-lg flex items-center gap-1">
                          {Object.values(currentUser.ratings).length > 0 
                            ? (Object.values(currentUser.ratings).reduce((a, b) => a + b, 0) / Object.values(currentUser.ratings).length).toFixed(1)
                            : 'N/A'
                          }
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Favorite Genres */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Favorite Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.favoriteGenres.map(genre => (
                        <Badge key={genre} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reading Preferences</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Languages:</span>
                          <span>{currentUser.preferences.language.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                          <span>{currentUser.preferences.difficulty.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Preferred Length:</span>
                          <span>{currentUser.preferences.length}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Recent Reviews */}
                  <Card className="p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Recent Reviews
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(currentUser.reviews).map(([bookId, review]) => {
                        const book = books.find(b => b.id === bookId);
                        if (!book) return null;
                        
                        return (
                          <div key={bookId} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start gap-3">
                              <ImageWithFallback
                                src={book.cover}
                                alt={book.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white">{book.title}</h4>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= (currentUser.ratings[bookId] || 0)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{review}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="h-full mt-0 p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reading Analytics</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed insights into your reading patterns and preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.readBooks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Books Read</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(books.filter(b => currentUser.readBooks.includes(b.id)).reduce((sum, b) => sum + b.pages, 0) / 250)}h
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Object.values(currentUser.ratings).length > 0 
                        ? (Object.values(currentUser.ratings).reduce((a, b) => a + b, 0) / Object.values(currentUser.ratings).length).toFixed(1)
                        : '0'
                      }
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating Given</div>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.streak}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Genre Distribution */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Genre Distribution
                    </h3>
                    <div className="space-y-3">
                      {currentUser.favoriteGenres.map((genre, index) => {
                        const genreBooks = books.filter(book => 
                          currentUser.readBooks.includes(book.id) && book.genre.includes(genre)
                        ).length;
                        const percentage = Math.round((genreBooks / currentUser.readBooks.length) * 100);
                        
                        return (
                          <div key={genre}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{genre}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Reading Goals */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Reading Goals
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">2024 Reading Goal</span>
                          <span className="text-sm text-blue-600">{currentUser.booksReadThisYear}/{currentUser.readingGoal}</span>
                        </div>
                        <Progress value={getReadingProgress()} className="mb-2" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {Math.round(getReadingProgress())}% complete • {currentUser.readingGoal - currentUser.booksReadThisYear} books remaining
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900 dark:text-blue-100">Progress Insights</span>
                        </div>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• You're {getReadingProgress() > 75 ? 'ahead of' : getReadingProgress() > 50 ? 'on track with' : 'behind'} your reading goal</li>
                          <li>• Average rating: {Object.values(currentUser.ratings).length > 0 
                            ? (Object.values(currentUser.ratings).reduce((a, b) => a + b, 0) / Object.values(currentUser.ratings).length).toFixed(1)
                            : 'N/A'} stars</li>
                          <li>• {currentUser.streak} day reading streak!</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>

      {/* Book Details Modal */}
      <Dialog open={isBookDetailsOpen} onOpenChange={setIsBookDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedBook && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBook.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-1">
                  <ImageWithFallback
                    src={selectedBook.cover}
                    alt={selectedBook.title}
                    className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      by {selectedBook.author}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{selectedBook.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">({selectedBook.totalRatings} ratings)</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        ${selectedBook.price}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedBook.genre.map((genre, index) => (
                      <Badge key={index} variant="secondary">{genre}</Badge>
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedBook.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Pages:</span>
                      <span className="ml-2 font-medium">{selectedBook.pages}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Published:</span>
                      <span className="ml-2 font-medium">{selectedBook.publishYear}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Language:</span>
                      <span className="ml-2 font-medium">{selectedBook.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Reading Time:</span>
                      <span className="ml-2 font-medium">{selectedBook.readingTime}</span>
                    </div>
                  </div>

                  {selectedBook.awards.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Awards</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBook.awards.map((award, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            <Award className="w-3 h-3 mr-1" />
                            {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="flex-1"
                      disabled={!selectedBook.inStock}
                    >
                      {selectedBook.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => addToWishlist(selectedBook.id)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${currentUser.wishlist.includes(selectedBook.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {currentUser.wishlist.includes(selectedBook.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => markAsRead(selectedBook.id)}
                      disabled={currentUser.readBooks.includes(selectedBook.id)}
                    >
                      {currentUser.readBooks.includes(selectedBook.id) ? 'Read' : 'Mark as Read'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}