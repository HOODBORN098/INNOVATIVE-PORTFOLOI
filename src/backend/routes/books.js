const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Recommendation algorithm
const generateRecommendations = async (userId, limit = 10) => {
  try {
    const user = await User.findById(userId).populate('readBooks wishlist ratings.book');
    if (!user) return [];

    // Get user's reading history and preferences
    const userGenres = [];
    const userAuthors = [];
    const userRatings = user.ratings || [];

    // Extract preferences from read books
    for (const book of user.readBooks || []) {
      if (book.genres) userGenres.push(...book.genres);
      if (book.author) userAuthors.push(book.author);
    }

    // Get books user hasn't read
    const readBookIds = (user.readBooks || []).map(book => book._id);
    const wishlistIds = (user.wishlist || []).map(book => book._id);
    const excludeIds = [...readBookIds, ...wishlistIds];

    // Find similar books based on genres and authors
    const similarBooks = await Book.find({
      _id: { $nin: excludeIds },
      $or: [
        { genres: { $in: userGenres } },
        { author: { $in: userAuthors } },
        { 'ratings.average': { $gte: 4.0 } }
      ],
      status: 'active'
    })
    .sort({ 'ratings.average': -1, 'ratings.count': -1 })
    .limit(limit);

    // Score recommendations based on similarity
    const recommendations = similarBooks.map(book => {
      let score = 0;
      
      // Genre matching (40% weight)
      const genreMatches = book.genres.filter(genre => userGenres.includes(genre)).length;
      score += (genreMatches / Math.max(userGenres.length, 1)) * 40;
      
      // Author matching (20% weight)
      if (userAuthors.includes(book.author)) {
        score += 20;
      }
      
      // Rating score (30% weight)
      score += (book.ratings.average / 5) * 30;
      
      // Popularity score (10% weight)
      score += Math.min(book.ratings.count / 100, 1) * 10;
      
      return {
        book,
        score: Math.round(score),
        reasons: [
          genreMatches > 0 ? `Matches ${genreMatches} of your favorite genres` : null,
          userAuthors.includes(book.author) ? `You've enjoyed other books by ${book.author}` : null,
          book.ratings.average >= 4.5 ? 'Highly rated by other readers' : null,
          book.ratings.count > 50 ? 'Popular among readers' : null
        ].filter(Boolean)
      };
    });

    return recommendations.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Recommendation error:', error);
    return [];
  }
};

// GET /api/books - Get all books with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      genre,
      author,
      minRating,
      maxPrice,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    const query = { status: 'active' };

    // Build search query
    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.categories = { $in: [category] };
    }

    if (genre) {
      query.genres = { $in: [genre] };
    }

    if (author) {
      query.author = new RegExp(author, 'i');
    }

    if (minRating) {
      query['ratings.average'] = { $gte: parseFloat(minRating) };
    }

    if (maxPrice) {
      query.$or = [
        { 'price.paperback': { $lte: parseFloat(maxPrice) } },
        { 'price.ebook': { $lte: parseFloat(maxPrice) } }
      ];
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === 'rating') {
      sortOptions['ratings.average'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'date') {
      sortOptions['metadata.addedDate'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'popularity') {
      sortOptions['ratings.count'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-reviews'); // Exclude reviews for performance

    const total = await Book.countDocuments(query);

    res.json({
      books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Books fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/recommendations/:userId - Get personalized recommendations
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const recommendations = await generateRecommendations(userId, parseInt(limit));

    res.json({
      recommendations,
      total: recommendations.length,
      generatedAt: new Date()
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/:id - Get book details
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('reviews.user', 'name email profilePhoto');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Increment view count
    book.metadata.viewCount += 1;
    await book.save();

    res.json(book);
  } catch (error) {
    console.error('Book fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/books - Add new book
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').optional().isISBN().withMessage('Invalid ISBN format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      book,
      message: 'Book added successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Book with this ISBN already exists' });
    }
    console.error('Book creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/books/:id/reviews - Add book review
router.post('/:id/reviews', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 1000 }).withMessage('Comment too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;
    const userId = req.user?.id || req.body.userId; // Temporary for demo

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user already reviewed this book
    const existingReview = book.reviews.find(review => review.user.toString() === userId);
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }

    book.reviews.push({
      user: userId,
      rating,
      comment,
      date: new Date()
    });

    await book.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      review: book.reviews[book.reviews.length - 1]
    });
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/books/:id - Update book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, 'metadata.lastUpdated': new Date() },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      success: true,
      book,
      message: 'Book updated successfully'
    });
  } catch (error) {
    console.error('Book update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/books/:id - Delete book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Book deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/analytics/stats - Get book analytics
router.get('/analytics/stats', async (req, res) => {
  try {
    const [
      totalBooks,
      totalReviews,
      avgRating,
      topGenres,
      recentBooks,
      topRatedBooks
    ] = await Promise.all([
      Book.countDocuments({ status: 'active' }),
      Book.aggregate([
        { $match: { status: 'active' } },
        { $project: { reviewCount: { $size: '$reviews' } } },
        { $group: { _id: null, total: { $sum: '$reviewCount' } } }
      ]),
      Book.aggregate([
        { $match: { status: 'active', 'ratings.count': { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: '$ratings.average' } } }
      ]),
      Book.aggregate([
        { $match: { status: 'active' } },
        { $unwind: '$genres' },
        { $group: { _id: '$genres', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Book.find({ status: 'active' })
        .sort({ 'metadata.addedDate': -1 })
        .limit(5)
        .select('title author metadata.addedDate'),
      Book.find({ status: 'active', 'ratings.count': { $gte: 5 } })
        .sort({ 'ratings.average': -1 })
        .limit(5)
        .select('title author ratings')
    ]);

    res.json({
      totalBooks,
      totalReviews: totalReviews[0]?.total || 0,
      averageRating: avgRating[0]?.avgRating || 0,
      topGenres,
      recentBooks,
      topRatedBooks,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;