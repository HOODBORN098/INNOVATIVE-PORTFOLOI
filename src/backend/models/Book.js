const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reported: {
    type: Boolean,
    default: false
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  isbn13: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  publisher: {
    type: String,
    trim: true,
    maxlength: 200
  },
  publicationDate: Date,
  language: {
    type: String,
    default: 'English'
  },
  pages: {
    type: Number,
    min: 1
  },
  categories: [{
    type: String,
    trim: true
  }],
  genres: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    url: String,
    thumbnail: String,
    alt: String
  },
  price: {
    hardcover: Number,
    paperback: Number,
    ebook: Number,
    audiobook: Number
  },
  availability: {
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    format: [{
      type: String,
      enum: ['hardcover', 'paperback', 'ebook', 'audiobook']
    }]
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  reviews: [reviewSchema],
  series: {
    name: String,
    number: Number,
    total: Number
  },
  awards: [{
    name: String,
    year: Number,
    category: String
  }],
  readingStats: {
    averageReadingTime: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    ageGroup: String
  },
  metadata: {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedDate: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    viewCount: {
      type: Number,
      default: 0
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    wishlistCount: {
      type: Number,
      default: 0
    }
  },
  externalIds: {
    goodreads: String,
    amazon: String,
    googleBooks: String,
    openlibrary: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  }
});

// Update average rating when reviews change
bookSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.ratings.average = (totalRating / this.reviews.length).toFixed(1);
    this.ratings.count = this.reviews.length;
    
    // Update distribution
    this.ratings.distribution = {
      five: this.reviews.filter(r => r.rating === 5).length,
      four: this.reviews.filter(r => r.rating === 4).length,
      three: this.reviews.filter(r => r.rating === 3).length,
      two: this.reviews.filter(r => r.rating === 2).length,
      one: this.reviews.filter(r => r.rating === 1).length
    };
  }
  
  this.metadata.lastUpdated = Date.now();
  next();
});

// Text search index
bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text',
  categories: 'text',
  genres: 'text',
  tags: 'text'
});

// Additional indexes
bookSchema.index({ 'ratings.average': -1 });
bookSchema.index({ 'metadata.addedDate': -1 });
bookSchema.index({ categories: 1 });
bookSchema.index({ genres: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ isbn: 1 });
bookSchema.index({ isbn13: 1 });

module.exports = mongoose.model('Book', bookSchema);