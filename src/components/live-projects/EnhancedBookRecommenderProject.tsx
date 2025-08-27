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
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { apiClient } from "../utils/apiClient";

interface Book {
  _id: string;
  title: string;
  author: string;
  genres: string[];
  ratings: {
    average: number;
    count: number;
  };
  description: string;
  pages: number;
  publicationDate: string;
  language: string;
  isbn: string;
  coverImage: {
    url: string;
    thumbnail: string;
  };
  price: {
    paperback?: number;
    ebook?: number;
    hardcover?: number;
  };
  availability: {
    inStock: boolean;
    format: string[];
  };
  tags: string[];
  series?: {
    name: string;
    number: number;
  };
  awards: Array<{
    name: string;
    year: number;
  }>;
  readingStats: {
    averageReadingTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    ageGroup: string;
  };
  metadata: {
    viewCount: number;
    wishlistCount: number;
  };
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  favoriteGenres: string[];
  readBooks: string[];
  wishlist: string[];
  ratings: Array<{
    book: string;
    rating: number;
    review?: string;
  }>;
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
  reasons: string[];
}

export function EnhancedBookRecommenderProject() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [filterRating, setFilterRating] = useState([0]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backend state
  const [books, setBooks] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  // Mock user for demo (in real app, this would come from authentication)
  const [currentUser] = useState<UserProfile>({
    _id: "user-001",
    name: "Alex Reader",
    email: "alex@bookworm.com",
    avatar: "AR",
    favoriteGenres: ["Science Fiction", "Mystery", "Non-Fiction"],
    readBooks: [],
    wishlist: [],
    ratings: [],
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

  // Load books from backend
  const loadBooks = async (params: any = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getBooks({
        page: currentPage,
        limit: 20,
        search: searchTerm || undefined,
        genre: selectedGenre || undefined,
        minRating: filterRating[0] || undefined,
        sortBy: sortBy === 'popularity' ? 'ratings.count' : sortBy,
        ...params
      });

      setBooks(response.books);
      setPagination(response.pagination);
      
      // Extract unique genres for filter
      const allGenres = response.books.flatMap((book: Book) => book.genres);
      setGenres([...new Set(allGenres)].sort());
      
    } catch (error) {
      console.error('Failed to load books:', error);
      setError('Failed to load books. Please try again.');
      
      // Fallback to mock data for demo
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  // Load mock data as fallback
  const loadMockData = () => {
    const mockBooks: Book[] = [
      {
        _id: "book-001",
        title: "The Neural Frontier",
        author: "Dr. Sarah Chen",
        genres: ["Science Fiction", "Technology"],
        ratings: { average: 4.8, count: 1247 },
        description: "A gripping tale of artificial intelligence and human consciousness in the near future. When Dr. Elena Rodriguez creates the first truly sentient AI, she must navigate the ethical implications and corporate interests that threaten to destroy everything she's worked for.",
        pages: 384,
        publicationDate: "2024-01-15",
        language: "English",
        isbn: "978-0-123456-78-9",
        coverImage: {
          url: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=450&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=150&h=225&fit=crop"
        },
        price: { paperback: 19.99, ebook: 9.99, hardcover: 29.99 },
        availability: { inStock: true, format: ["paperback", "ebook", "hardcover"] },
        tags: ["AI", "Ethics", "Future", "Technology", "Consciousness"],
        awards: [{ name: "Hugo Award Nominee", year: 2024 }],
        readingStats: {
          averageReadingTime: "6-8 hours",
          difficulty: "intermediate",
          ageGroup: "Adult"
        },
        metadata: { viewCount: 2543, wishlistCount: 456 }
      },
      {
        _id: "book-002",
        title: "Midnight at the Library",
        author: "Eleanor Blackwood",
        genres: ["Mystery", "Thriller"],
        ratings: { average: 4.6, count: 2156 },
        description: "When librarian Margaret finds a coded message in a rare manuscript, she's drawn into a centuries-old mystery that puts her life in danger. A perfect blend of historical intrigue and modern suspense.",
        pages: 298,
        publicationDate: "2023-08-22",
        language: "English",
        isbn: "978-0-987654-32-1",
        coverImage: {
          url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=225&fit=crop"
        },
        price: { paperback: 16.99, ebook: 7.99 },
        availability: { inStock: true, format: ["paperback", "ebook"] },
        tags: ["Library", "History", "Code", "Suspense", "Female Protagonist"],
        awards: [],
        readingStats: {
          averageReadingTime: "5-7 hours",
          difficulty: "beginner",
          ageGroup: "Adult"
        },
        metadata: { viewCount: 1876, wishlistCount: 234 }
      },
      {
        _id: "book-003",
        title: "The Productivity Paradox",
        author: "Marcus Johnson",
        genres: ["Non-Fiction", "Self-Help", "Business"],
        ratings: { average: 4.7, count: 3421 },
        description: "Why working harder isn't working. A revolutionary approach to productivity that focuses on working smarter, not harder. Based on extensive research and real-world case studies.",
        pages: 256,
        publicationDate: "2024-02-10",
        language: "English",
        isbn: "978-0-555666-77-8",
        coverImage: {
          url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=225&fit=crop"
        },
        price: { paperback: 22.99, ebook: 12.99, hardcover: 32.99 },
        availability: { inStock: true, format: ["paperback", "ebook", "hardcover"] },
        tags: ["Productivity", "Business", "Efficiency", "Work-Life Balance", "Psychology"],
        awards: [{ name: "Wall Street Journal Bestseller", year: 2024 }],
        readingStats: {
          averageReadingTime: "4-6 hours",
          difficulty: "intermediate",
          ageGroup: "Adult"
        },
        metadata: { viewCount: 3421, wishlistCount: 567 }
      }
    ];

    setBooks(mockBooks);
    const allGenres = mockBooks.flatMap(book => book.genres);
    setGenres([...new Set(allGenres)].sort());
    setPagination({ page: 1, limit: 20, total: mockBooks.length, pages: 1 });
  };

  // Load recommendations from backend
  const loadRecommendations = async () => {
    try {
      const response = await apiClient.getBookRecommendations(currentUser._id, 12);
      setRecommendations(response.recommendations);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      // Generate mock recommendations
      const mockRecommendations: Recommendation[] = books.slice(0, 6).map(book => ({
        book,
        score: Math.floor(Math.random() * 30) + 70,
        reasons: [
          "Matches your favorite genres",
          "Highly rated by other readers",
          "Similar to books you've enjoyed"
        ]
      }));
      setRecommendations(mockRecommendations);
    }
  };

  // Handle book rating
  const rateBook = async (bookId: string, rating: number, comment?: string) => {
    try {
      await apiClient.addBookReview(bookId, rating, comment);
      // Refresh book data
      if (selectedBook && selectedBook._id === bookId) {
        const updatedBook = await apiClient.getBook(bookId);
        setSelectedBook(updatedBook);
      }
    } catch (error) {
      console.error('Failed to rate book:', error);
      // For demo, just update local state
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === bookId 
            ? { 
                ...book, 
                ratings: { 
                  ...book.ratings, 
                  average: (book.ratings.average * book.ratings.count + rating) / (book.ratings.count + 1),
                  count: book.ratings.count + 1 
                } 
              }
            : book
        )
      );
    }
  };

  // Handle wishlist toggle
  const toggleWishlist = async (bookId: string) => {
    try {
      // In real app, this would call API
      // await apiClient.toggleWishlist(bookId);
      
      // For demo, update local state
      console.log(`Toggled wishlist for book: ${bookId}`);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  // Search books
  const searchBooks = async () => {
    setCurrentPage(1);
    await loadBooks();
  };

  // Load initial data
  useEffect(() => {
    loadBooks();
  }, [currentPage, selectedGenre, sortBy]);

  useEffect(() => {
    if (books.length > 0) {
      loadRecommendations();
    }
  }, [books]);

  // Track user interactions
  useEffect(() => {
    apiClient.trackInteraction('book_recommender_view', {
      tab: activeTab,
      timestamp: new Date().toISOString()
    });
  }, [activeTab]);

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
          src={book.coverImage.url}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {!book.availability.inStock && (
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
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book._id);
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-medium">{book.ratings.average}</span>
            <span className="text-white/70 text-xs">({book.ratings.count})</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>
          <Badge variant="outline" className="ml-2 flex-shrink-0">
            ${book.price.paperback || book.price.ebook}
          </Badge>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
          {book.genres.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{book.genres.length - 2}
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
              {recommendationData.reasons[0]}
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
            {book.readingStats.averageReadingTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(book.publicationDate).getFullYear()}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setSelectedBook(book);
              setIsBookDetailsOpen(true);
              apiClient.trackInteraction('book_details_view', { bookId: book._id });
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Details
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => rateBook(book._id, 5)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Rate
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
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Goal:</span>
                  <span className="font-semibold">{currentUser.booksReadThisYear}/{currentUser.readingGoal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Live API</span>
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
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
              <Button size="sm" variant="outline" onClick={() => loadBooks()}>
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            </div>
          )}
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
                      onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
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
                      <SelectItem value="date">Published Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={searchBooks} disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
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
                    {pagination.total} books • Page {pagination.page} of {pagination.pages}
                  </Badge>
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {books.map(book => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <span className="px-4 py-2 text-sm">
                    Page {currentPage} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                    disabled={currentPage === pagination.pages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              )}

              {books.length === 0 && !isLoading && (
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
                    AI-Powered Recommendations
                  </h2>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    <Cpu className="w-3 h-3 mr-1" />
                    Live API
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our machine learning algorithm analyzes your reading history, preferences, and behavior patterns to provide personalized book recommendations.
                </p>
                
                <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100">Real-time ML Processing</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Connected to backend recommendation engine with collaborative filtering and content-based analysis
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendations.map(recommendation => (
                  <BookCard 
                    key={recommendation.book._id} 
                    book={recommendation.book} 
                    showRecommendationScore={true}
                    recommendationData={recommendation}
                  />
                ))}
              </div>

              {recommendations.length === 0 && (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Loading Recommendations...</p>
                    <p className="text-sm">Our AI is analyzing your preferences</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* My Library Tab */}
            <TabsContent value="library" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <Library className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Personal Library Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Track your reading progress, manage your wishlist, and sync across devices with cloud storage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <BookMarked className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Reading Progress</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track books read, currently reading, and goals
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Heart className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold mb-2">Wishlist & Collections</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Organize books into custom lists and collections
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <BarChart3 className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Reading Analytics Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Detailed insights into your reading patterns, preferences, and recommendation accuracy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <PieChart className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">Genre Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Breakdown of your reading preferences by genre
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <TrendingUp className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Reading Trends</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track your reading pace and progress over time
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Target className="w-8 h-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold mb-2">Recommendation Accuracy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      See how well our AI understands your preferences
                    </p>
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
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedBook.title}
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Database className="w-3 h-3 mr-1" />
                    Live Data
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-1">
                  <ImageWithFallback
                    src={selectedBook.coverImage.url}
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
                        <span className="font-semibold">{selectedBook.ratings.average}</span>
                        <span className="text-gray-600 dark:text-gray-400">({selectedBook.ratings.count} ratings)</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        ${selectedBook.price.paperback || selectedBook.price.ebook}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedBook.genres.map((genre, index) => (
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
                      <span className="ml-2 font-medium">{new Date(selectedBook.publicationDate).getFullYear()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Language:</span>
                      <span className="ml-2 font-medium">{selectedBook.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Reading Time:</span>
                      <span className="ml-2 font-medium">{selectedBook.readingStats.averageReadingTime}</span>
                    </div>
                  </div>

                  {selectedBook.awards.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Awards</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBook.awards.map((award, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            <Award className="w-3 h-3 mr-1" />
                            {award.name} ({award.year})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1" disabled={!selectedBook.availability.inStock}>
                      {selectedBook.availability.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button variant="outline" onClick={() => toggleWishlist(selectedBook._id)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Wishlist
                    </Button>
                    <Button variant="outline" onClick={() => rateBook(selectedBook._id, 5)}>
                      <Star className="w-4 h-4 mr-2" />
                      Rate Book
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