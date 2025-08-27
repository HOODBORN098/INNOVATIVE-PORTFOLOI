import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Star, BookOpen, TrendingUp, User, Heart, Filter, Sparkles } from "lucide-react";

export function BookRecommenderDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [userProfile] = useState({
    name: "Alex Student",
    field: "Computer Science",
    readingLevel: "Advanced",
    preferences: ["Technology", "Science Fiction", "Programming"]
  });

  const books = [
    {
      id: "1",
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "programming",
      rating: 4.8,
      pages: 464,
      description: "A handbook of agile software craftsmanship",
      coverColor: "bg-blue-500",
      matchScore: 95,
      reasons: ["Matches your CS field", "Popular in your area", "High rating"]
    },
    {
      id: "2",
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      genre: "programming",
      rating: 4.7,
      pages: 352,
      description: "Your journey to mastery",
      coverColor: "bg-green-500",
      matchScore: 92,
      reasons: ["Perfect for CS students", "Recommended by peers", "Career focused"]
    },
    {
      id: "3",
      title: "Dune",
      author: "Frank Herbert",
      genre: "science-fiction",
      rating: 4.6,
      pages: 688,
      description: "Epic science fiction masterpiece",
      coverColor: "bg-orange-500",
      matchScore: 87,
      reasons: ["Matches sci-fi preference", "Award winning", "Popular choice"]
    },
    {
      id: "4",
      title: "Algorithms to Live By",
      author: "Brian Christian",
      genre: "science",
      rating: 4.5,
      pages: 368,
      description: "Computer science applied to everyday life",
      coverColor: "bg-purple-500",
      matchScore: 89,
      reasons: ["Perfect CS blend", "Real-world applications", "Trending now"]
    },
    {
      id: "5",
      title: "The Foundation Trilogy",
      author: "Isaac Asimov",
      genre: "science-fiction",
      rating: 4.4,
      pages: 784,
      description: "Classic science fiction epic",
      coverColor: "bg-red-500",
      matchScore: 85,
      reasons: ["Classic sci-fi", "Intellectual challenge", "Series available"]
    }
  ];

  const genres = [
    { id: "all", name: "All Genres" },
    { id: "programming", name: "Programming" },
    { id: "science-fiction", name: "Science Fiction" },
    { id: "science", name: "Science" },
    { id: "mathematics", name: "Mathematics" },
    { id: "history", name: "History" }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    if (score >= 80) return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300";
    return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300";
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">BookMind AI</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Personalized Reading Recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {userProfile.field}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      {/* User Profile Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Welcome back, {userProfile.name}!</h2>
            <p className="text-sm opacity-90">
              Based on your {userProfile.field} studies and reading history
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Reading Level</div>
            <div className="font-semibold">{userProfile.readingLevel}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search books by title, author, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Preferences */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Your interests:</span>
          {userProfile.preferences.map((pref, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {pref}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-[400px] overflow-auto">
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="recommendations">For You</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="similar">Similar Reads</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-0">
            <div className="space-y-4">
              {filteredBooks.sort((a, b) => b.matchScore - a.matchScore).map((book) => (
                <Card key={book.id} className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <div className="flex gap-4">
                    {/* Book Cover */}
                    <div className={`w-16 h-20 ${book.coverColor} rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md`}>
                      📚
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            by {book.author}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                            {book.description}
                          </p>
                        </div>
                        <Badge className={`${getMatchColor(book.matchScore)} font-semibold`}>
                          {book.matchScore}% match
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating)}
                          <span className="ml-1">{book.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {book.pages} pages
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {book.genre.replace('-', ' ')}
                        </Badge>
                      </div>

                      {/* AI Reasons */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Why we recommend this:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {book.reasons.slice(0, 2).map((reason, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                          ✓ Available in Library
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Reserve Book
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
              <div className="text-4xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending Books</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Most popular books this week in your field
              </p>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">Updated every Monday</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="mt-0">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Similar Reads</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Books similar to ones you've enjoyed
              </p>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-0">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">❤️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Your Wishlist</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Books you've saved for later
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Browse Catalog
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}