const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  assignment: String,
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']
  },
  semester: String,
  year: Number,
  dateRecorded: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  academicInfo: {
    program: String,
    major: String,
    minor: String,
    year: {
      type: Number,
      min: 1,
      max: 4
    },
    semester: String,
    gpa: {
      type: Number,
      min: 0,
      max: 4.0
    },
    credits: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'graduated', 'withdrawn', 'suspended'],
      default: 'active'
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    graduationDate: Date
  },
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    semester: String,
    year: Number,
    grade: String,
    credits: Number,
    status: {
      type: String,
      enum: ['enrolled', 'completed', 'dropped', 'failed'],
      default: 'enrolled'
    }
  }],
  grades: [gradeSchema],
  attendance: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    date: Date,
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused']
    },
    notes: String
  }],
  fees: {
    tuition: Number,
    paid: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    paymentHistory: [{
      amount: Number,
      date: Date,
      method: String,
      reference: String
    }]
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  profilePhoto: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate GPA before saving
studentSchema.pre('save', function(next) {
  if (this.grades && this.grades.length > 0) {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    this.grades.forEach(grade => {
      if (grade.grade && gradePoints[grade.grade] !== undefined) {
        totalPoints += gradePoints[grade.grade] * 3; // Assuming 3 credits per course
        totalCredits += 3;
      }
    });
    
    this.academicInfo.gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  }
  
  this.updatedAt = Date.now();
  next();
});

// Indexes
studentSchema.index({ studentId: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ 'academicInfo.program': 1 });
studentSchema.index({ 'academicInfo.year': 1 });
studentSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model('Student', studentSchema);