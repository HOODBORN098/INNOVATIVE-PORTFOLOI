const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
require('dotenv').config();

// Import models
const Book = require('../models/Book');
const Student = require('../models/Student');
const Contact = require('../models/Contact');

// Sample data
const sampleBooks = [
  {
    title: "The Neural Frontier",
    author: "Dr. Sarah Chen",
    isbn: "978-0-123456-78-9",
    isbn13: "9780123456789",
    description: "A gripping tale of artificial intelligence and human consciousness in the near future. When Dr. Elena Rodriguez creates the first truly sentient AI, she must navigate the ethical implications and corporate interests that threaten to destroy everything she's worked for.",
    publisher: "TechBooks Publishing",
    publicationDate: new Date("2024-01-15"),
    language: "English",
    pages: 384,
    categories: ["Science Fiction", "Technology"],
    genres: ["Science Fiction", "Technology", "Thriller"],
    tags: ["AI", "Ethics", "Future", "Technology", "Consciousness"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=450&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=150&h=225&fit=crop",
      alt: "The Neural Frontier book cover"
    },
    price: {
      paperback: 19.99,
      ebook: 9.99,
      hardcover: 29.99
    },
    availability: {
      inStock: true,
      quantity: 50,
      format: ["paperback", "ebook", "hardcover"]
    },
    ratings: {
      average: 4.8,
      count: 1247,
      distribution: {
        five: 950,
        four: 200,
        three: 75,
        two: 15,
        one: 7
      }
    },
    awards: [
      { name: "Hugo Award Nominee", year: 2024, category: "Best Novel" }
    ],
    readingStats: {
      averageReadingTime: "6-8 hours",
      difficulty: "intermediate",
      ageGroup: "Adult"
    },
    metadata: {
      viewCount: 2543,
      downloadCount: 156,
      wishlistCount: 456
    },
    status: "active"
  },
  {
    title: "Midnight at the Library",
    author: "Eleanor Blackwood",
    isbn: "978-0-987654-32-1",
    isbn13: "9780987654321",
    description: "When librarian Margaret finds a coded message in a rare manuscript, she's drawn into a centuries-old mystery that puts her life in danger. A perfect blend of historical intrigue and modern suspense.",
    publisher: "Mystery House Press",
    publicationDate: new Date("2023-08-22"),
    language: "English",
    pages: 298,
    categories: ["Mystery", "Thriller"],
    genres: ["Mystery", "Thriller", "Historical Fiction"],
    tags: ["Library", "History", "Code", "Suspense", "Female Protagonist"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=225&fit=crop",
      alt: "Midnight at the Library book cover"
    },
    price: {
      paperback: 16.99,
      ebook: 7.99
    },
    availability: {
      inStock: true,
      quantity: 32,
      format: ["paperback", "ebook"]
    },
    ratings: {
      average: 4.6,
      count: 2156,
      distribution: {
        five: 1500,
        four: 500,
        three: 120,
        two: 30,
        one: 6
      }
    },
    readingStats: {
      averageReadingTime: "5-7 hours",
      difficulty: "beginner",
      ageGroup: "Adult"
    },
    metadata: {
      viewCount: 1876,
      downloadCount: 89,
      wishlistCount: 234
    },
    status: "active"
  },
  {
    title: "The Productivity Paradox",
    author: "Marcus Johnson",
    isbn: "978-0-555666-77-8",
    isbn13: "9780555666778",
    description: "Why working harder isn't working. A revolutionary approach to productivity that focuses on working smarter, not harder. Based on extensive research and real-world case studies.",
    publisher: "Business Insights Publishing",
    publicationDate: new Date("2024-02-10"),
    language: "English",
    pages: 256,
    categories: ["Non-Fiction", "Self-Help", "Business"],
    genres: ["Non-Fiction", "Self-Help", "Business", "Psychology"],
    tags: ["Productivity", "Business", "Efficiency", "Work-Life Balance", "Psychology"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=225&fit=crop",
      alt: "The Productivity Paradox book cover"
    },
    price: {
      paperback: 22.99,
      ebook: 12.99,
      hardcover: 32.99
    },
    availability: {
      inStock: true,
      quantity: 78,
      format: ["paperback", "ebook", "hardcover"]
    },
    ratings: {
      average: 4.7,
      count: 3421,
      distribution: {
        five: 2400,
        four: 800,
        three: 180,
        two: 35,
        one: 6
      }
    },
    awards: [
      { name: "Wall Street Journal Bestseller", year: 2024, category: "Business" }
    ],
    readingStats: {
      averageReadingTime: "4-6 hours",
      difficulty: "intermediate",
      ageGroup: "Adult"
    },
    metadata: {
      viewCount: 3421,
      downloadCount: 201,
      wishlistCount: 567
    },
    status: "active"
  },
  {
    title: "Digital Renaissance",
    author: "Prof. Anna Martinez",
    isbn: "978-0-111222-33-4",
    isbn13: "9780111222334",
    description: "Exploring how technology is reshaping creativity, art, and human expression in the 21st century. A comprehensive look at the intersection of digital innovation and artistic creation.",
    publisher: "Digital Arts Press",
    publicationDate: new Date("2023-11-05"),
    language: "English",
    pages: 412,
    categories: ["Art", "Technology", "Culture"],
    genres: ["Non-Fiction", "Art", "Technology", "Cultural Studies"],
    tags: ["Digital Art", "Creativity", "Innovation", "Culture", "Technology"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=225&fit=crop",
      alt: "Digital Renaissance book cover"
    },
    price: {
      paperback: 28.99,
      ebook: 15.99,
      hardcover: 39.99
    },
    availability: {
      inStock: true,
      quantity: 25,
      format: ["paperback", "ebook", "hardcover"]
    },
    ratings: {
      average: 4.5,
      count: 892,
      distribution: {
        five: 580,
        four: 200,
        three: 85,
        two: 20,
        one: 7
      }
    },
    readingStats: {
      averageReadingTime: "8-10 hours",
      difficulty: "advanced",
      ageGroup: "Adult"
    },
    metadata: {
      viewCount: 1234,
      downloadCount: 67,
      wishlistCount: 189
    },
    status: "active"
  }
];

const sampleStudents = [
  {
    studentId: "STU001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dateOfBirth: new Date("2000-05-15"),
    address: {
      street: "123 Main St",
      city: "Nakuru",
      state: "Rift Valley",
      zipCode: "20100",
      country: "Kenya"
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+1234567891",
      email: "jane.doe@example.com"
    },
    academicInfo: {
      program: "Computer Science",
      major: "Software Engineering",
      minor: "Mathematics",
      year: 3,
      semester: "Fall 2024",
      gpa: 3.7,
      credits: 95,
      status: "active",
      enrollmentDate: new Date("2022-09-01")
    },
    grades: [
      {
        assignment: "Data Structures Final",
        score: 92,
        grade: "A",
        semester: "Spring 2024",
        year: 2024
      },
      {
        assignment: "Algorithm Analysis Midterm",
        score: 88,
        grade: "B+",
        semester: "Fall 2024",
        year: 2024
      }
    ],
    fees: {
      tuition: 15000,
      paid: 12000,
      balance: 3000
    }
  },
  {
    studentId: "STU002",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    phone: "+1234567892",
    dateOfBirth: new Date("1999-12-20"),
    address: {
      street: "456 Oak Ave",
      city: "Eldoret",
      state: "Rift Valley",
      zipCode: "30100",
      country: "Kenya"
    },
    emergencyContact: {
      name: "Bob Smith",
      relationship: "Father",
      phone: "+1234567893",
      email: "bob.smith@example.com"
    },
    academicInfo: {
      program: "Business Administration",
      major: "Marketing",
      minor: "Psychology",
      year: 2,
      semester: "Fall 2024",
      gpa: 3.9,
      credits: 65,
      status: "active",
      enrollmentDate: new Date("2023-01-15")
    },
    grades: [
      {
        assignment: "Marketing Strategy Project",
        score: 95,
        grade: "A+",
        semester: "Spring 2024",
        year: 2024
      }
    ],
    fees: {
      tuition: 12000,
      paid: 12000,
      balance: 0
    }
  }
];

const sampleContacts = [
  {
    name: "Tech Recruiter",
    email: "recruiter@techcorp.com",
    subject: "Job Opportunity",
    message: "Hi Eric, we're impressed with your portfolio and would like to discuss a software engineering position at our company.",
    timestamp: new Date("2024-03-01T10:30:00Z"),
    status: "new"
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Collaboration Inquiry",
    message: "Hello! I came across your portfolio and I'm interested in collaborating on a machine learning project. Would you be available for a brief call?",
    timestamp: new Date("2024-03-02T14:15:00Z"),
    status: "new"
  },
  {
    name: "Mike Chen",
    email: "mike.chen@startup.io",
    subject: "Freelance Project",
    message: "We have an exciting web development project and would love to work with you. The project involves building a real-time analytics dashboard.",
    timestamp: new Date("2024-02-28T09:45:00Z"),
    status: "read"
  }
];

async function seedDatabase() {
  try {
    console.log(chalk.blue('🌱 Starting database seeding...'));

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_projects');
    console.log(chalk.green('✅ Connected to MongoDB'));

    // Clear existing data
    console.log(chalk.yellow('🧹 Clearing existing data...'));
    await Promise.all([
      Book.deleteMany({}),
      Student.deleteMany({}),
      Contact.deleteMany({})
    ]);
    console.log(chalk.green('✅ Existing data cleared'));

    // Seed Books
    console.log(chalk.blue('📚 Seeding books...'));
    const books = await Book.insertMany(sampleBooks);
    console.log(chalk.green(`✅ Created ${books.length} books`));

    // Seed Students
    console.log(chalk.blue('🎓 Seeding students...'));
    const students = await Student.insertMany(sampleStudents);
    console.log(chalk.green(`✅ Created ${students.length} students`));

    // Seed Contacts
    console.log(chalk.blue('📧 Seeding contacts...'));
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(chalk.green(`✅ Created ${contacts.length} contacts`));

    // Create indexes
    console.log(chalk.blue('🔍 Creating database indexes...'));
    await Promise.all([
      Book.createIndexes(),
      Student.createIndexes(),
      Contact.createIndexes()
    ]);
    console.log(chalk.green('✅ Database indexes created'));

    console.log(chalk.green.bold('🎉 Database seeding completed successfully!'));
    console.log(chalk.cyan(`
📊 Summary:
• Books: ${books.length}
• Students: ${students.length}
• Contacts: ${contacts.length}
    `));

  } catch (error) {
    console.error(chalk.red('❌ Error seeding database:'), error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log(chalk.blue('👋 Database connection closed'));
    process.exit(0);
  }
}

// Add some reviews to books after creation
async function addSampleReviews() {
  // This would be called after creating a User model
  // For now, we'll skip this part
}

// Check if script is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleBooks, sampleStudents, sampleContacts };