import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  BookOpen, 
  GraduationCap, 
  Settings,
  Download,
  Upload,
  Filter,
  MoreVertical,
  Bell,
  LogOut,
  UserCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
  Users,
  BookMinus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Star,
  Zap,
  PieChart,
  Activity
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: number;
  gpa: number;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  enrollmentDate: string;
  avatar?: string;
  guardian: string;
  address: string;
  bloodType: string;
  emergencyContact: string;
  scholarshipStatus: boolean;
  attendanceRate: number;
  totalCredits: number;
  completedCredits: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  students: number;
  semester: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  description: string;
  prerequisites: string[];
  schedule: string;
  room: string;
  capacity: number;
  enrolledStudents: string[];
}

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  grade: string;
  points: number;
  semester: string;
  dateRecorded: string;
  instructor: string;
  category: 'Assignment' | 'Quiz' | 'Midterm' | 'Final' | 'Project';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  target: 'All' | 'Students' | 'Faculty';
}

export function LiveStudentManagementProject() {
  const [currentUser] = useState({
    name: "Dr. Sarah Johnson",
    role: "administrator",
    avatar: "SJ",
    department: "Computer Science",
    id: "ADMIN001"
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewingStudent, setIsViewingStudent] = useState(false);

  const [students, setStudents] = useState<Student[]>([
    {
      id: "STU001",
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      phone: "+254701234567",
      course: "Computer Science",
      year: 3,
      gpa: 3.8,
      status: "Active",
      enrollmentDate: "2022-09-01",
      guardian: "Robert Johnson",
      address: "123 Nairobi Street, Nairobi",
      bloodType: "O+",
      emergencyContact: "+254700123456",
      scholarshipStatus: true,
      attendanceRate: 92,
      totalCredits: 120,
      completedCredits: 85
    },
    {
      id: "STU002",
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      phone: "+254702345678",
      course: "Mathematics",
      year: 2,
      gpa: 3.6,
      status: "Active",
      enrollmentDate: "2023-09-01",
      guardian: "Mary Smith",
      address: "456 Campus Road, Nakuru",
      bloodType: "A+",
      emergencyContact: "+254700234567",
      scholarshipStatus: false,
      attendanceRate: 88,
      totalCredits: 80,
      completedCredits: 45
    },
    {
      id: "STU003",
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      phone: "+254703456789",
      course: "Physics",
      year: 4,
      gpa: 3.9,
      status: "Active",
      enrollmentDate: "2021-09-01",
      guardian: "James Davis",
      address: "789 University Ave, Eldoret",
      bloodType: "B+",
      emergencyContact: "+254700345678",
      scholarshipStatus: true,
      attendanceRate: 95,
      totalCredits: 140,
      completedCredits: 125
    },
    {
      id: "STU004",
      name: "David Wilson",
      email: "david.wilson@university.edu",
      phone: "+254704567890",
      course: "Chemistry",
      year: 1,
      gpa: 3.7,
      status: "Active",
      enrollmentDate: "2024-09-01",
      guardian: "Linda Wilson",
      address: "321 College Street, Mombasa",
      bloodType: "AB+",
      emergencyContact: "+254700456789",
      scholarshipStatus: false,
      attendanceRate: 85,
      totalCredits: 40,
      completedCredits: 15
    },
    {
      id: "STU005",
      name: "Eva Brown",
      email: "eva.brown@university.edu",
      phone: "+254705678901",
      course: "Computer Science",
      year: 4,
      gpa: 3.5,
      status: "Graduated",
      enrollmentDate: "2020-09-01",
      guardian: "Paul Brown",
      address: "654 Alumni Road, Kisumu",
      bloodType: "O-",
      emergencyContact: "+254700567890",
      scholarshipStatus: true,
      attendanceRate: 90,
      totalCredits: 140,
      completedCredits: 140
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "CS101",
      name: "Introduction to Programming",
      code: "CS101",
      instructor: "Dr. Smith",
      credits: 3,
      students: 45,
      semester: "Fall 2024",
      status: "Active"
    },
    {
      id: "CS201",
      name: "Data Structures",
      code: "CS201",
      instructor: "Dr. Johnson",
      credits: 4,
      students: 38,
      semester: "Fall 2024",
      status: "Active"
    },
    {
      id: "MATH101",
      name: "Calculus I",
      code: "MATH101",
      instructor: "Dr. Brown",
      credits: 4,
      students: 62,
      semester: "Fall 2024",
      status: "Active"
    },
    {
      id: "PHYS101",
      name: "General Physics",
      code: "PHYS101",
      instructor: "Dr. Davis",
      credits: 3,
      students: 28,
      semester: "Fall 2024",
      status: "Active"
    }
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "GR001",
      studentId: "STU001",
      studentName: "Alice Johnson",
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      grade: "A",
      points: 4.0,
      semester: "Fall 2024",
      dateRecorded: "2024-01-15",
      instructor: "Dr. Smith",
      category: 'Assignment'
    },
    {
      id: "GR002",
      studentId: "STU002",
      studentName: "Bob Smith",
      courseCode: "MATH101",
      courseName: "Calculus I",
      grade: "B+",
      points: 3.3,
      semester: "Fall 2024",
      dateRecorded: "2024-01-14",
      instructor: "Dr. Brown",
      category: 'Quiz'
    },
    {
      id: "GR003",
      studentId: "STU003",
      studentName: "Carol Davis",
      courseCode: "PHYS101",
      courseName: "General Physics",
      grade: "A-",
      points: 3.7,
      semester: "Fall 2024",
      dateRecorded: "2024-01-13",
      instructor: "Dr. Davis",
      category: 'Midterm'
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    year: 1
  });

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    instructor: "",
    credits: 3,
    semester: "Fall 2024"
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.course) {
      const student: Student = {
        id: `STU${String(students.length + 1).padStart(3, '0')}`,
        ...newStudent,
        gpa: 0,
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      };
      setStudents([...students, student]);
      setNewStudent({ name: "", email: "", course: "", year: 1 });
      setIsAddingStudent(false);
    }
  };

  const addCourse = () => {
    if (newCourse.name && newCourse.code && newCourse.instructor) {
      const course: Course = {
        id: newCourse.code,
        ...newCourse,
        students: 0,
        status: 'Active'
      };
      setCourses([...courses, course]);
      setNewCourse({ name: "", code: "", instructor: "", credits: 3, semester: "Fall 2024" });
      setIsAddingCourse(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'A-': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400';
      case 'B+': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'B': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400';
      case 'C+': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'C': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="w-full h-[800px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">EduManage Pro</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Student Information System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline">
                <Bell className="w-4 h-4" />
                <Badge className="ml-2 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.avatar}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 capitalize">{currentUser.role}</div>
                </div>
              </div>

              <Button size="sm" variant="outline">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 rounded-none">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                <User className="w-4 h-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="grades" className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                <GraduationCap className="w-4 h-4" />
                Grades
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                <FileText className="w-4 h-4" />
                Reports
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} className="w-full">
            
            {/* Dashboard */}
            <TabsContent value="dashboard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{students.length}</p>
                    </div>
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Courses</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-600">+3</span> new this semester
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average GPA</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
                      </p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-600">+0.2</span> from last semester
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Graduation Rate</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">94%</p>
                    </div>
                    <Settings className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-600">+2%</span> from last year
                  </p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Enrollments</h3>
                  <div className="space-y-3">
                    {students.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{student.course}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{student.status}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Enrollment</h3>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{course.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{course.code} • {course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">{course.students}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <Button onClick={() => setIsAddingStudent(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </div>

              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Student</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Course</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Year</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">GPA</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{student.course}</td>
                          <td className="p-4 text-gray-900 dark:text-white">Year {student.year}</td>
                          <td className="p-4">
                            <span className="font-medium text-gray-900 dark:text-white">{student.gpa.toFixed(2)}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={
                              student.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              student.status === 'Graduated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }>
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h2>
                <Button onClick={() => setIsAddingCourse(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
              </div>

              <div className="grid gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{course.code} • Instructor: {course.instructor}</p>
                          </div>
                          <Badge className={
                            course.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            course.status === 'Completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }>
                            {course.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Credits:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{course.credits}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Students:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{course.students}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Semester:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{course.semester}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Grade Management</h2>
                <div className="flex items-center gap-3">
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Courses</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.code}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Grades
                  </Button>
                </div>
              </div>

              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Student</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Course</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Grade</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Points</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Date</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades
                        .filter(grade => !selectedCourse || grade.courseCode === selectedCourse)
                        .map((grade) => (
                        <tr key={grade.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="p-4 text-gray-900 dark:text-white font-medium">{grade.studentName}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{grade.courseName}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{grade.courseCode}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getGradeColor(grade.grade)}>
                              {grade.grade}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{grade.points.toFixed(1)}</td>
                          <td className="p-4 text-gray-600 dark:text-gray-400">{grade.dateRecorded}</td>
                          <td className="p-4">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reports & Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">Generate comprehensive reports and insights</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Student Report</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Individual student performance</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Course Analytics</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Course performance metrics</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-purple-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Graduation Report</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Graduation statistics</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={newStudent.email}
              onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              placeholder="Course/Program"
              value={newStudent.course}
              onChange={(e) => setNewStudent(prev => ({ ...prev, course: e.target.value }))}
            />
            <Select value={String(newStudent.year)} onValueChange={(value) => setNewStudent(prev => ({ ...prev, year: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={addStudent} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Student
              </Button>
              <Button onClick={() => setIsAddingStudent(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Course Dialog */}
      <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              placeholder="Course Code"
              value={newCourse.code}
              onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
            />
            <Input
              placeholder="Instructor Name"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Credits"
              value={newCourse.credits}
              onChange={(e) => setNewCourse(prev => ({ ...prev, credits: parseInt(e.target.value) || 3 }))}
            />
            <div className="flex gap-2">
              <Button onClick={addCourse} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Course
              </Button>
              <Button onClick={() => setIsAddingCourse(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}