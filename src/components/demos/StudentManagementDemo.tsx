import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Plus, Edit, Trash2, User, BookOpen, GraduationCap, Settings } from "lucide-react";

export function StudentManagementDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");

  const students = [
    { id: "STU001", name: "Alice Johnson", email: "alice@university.edu", course: "Computer Science", gpa: 3.8, status: "Active" },
    { id: "STU002", name: "Bob Smith", email: "bob@university.edu", course: "Mathematics", gpa: 3.6, status: "Active" },
    { id: "STU003", name: "Carol Davis", email: "carol@university.edu", course: "Physics", gpa: 3.9, status: "Active" },
    { id: "STU004", name: "David Wilson", email: "david@university.edu", course: "Chemistry", gpa: 3.7, status: "Inactive" }
  ];

  const courses = [
    { id: "CS101", name: "Intro to Programming", instructor: "Dr. Smith", students: 45, credits: 3 },
    { id: "CS201", name: "Data Structures", instructor: "Dr. Johnson", students: 38, credits: 4 },
    { id: "CS301", name: "Database Systems", instructor: "Dr. Brown", students: 32, credits: 3 },
    { id: "CS401", name: "Software Engineering", instructor: "Dr. Davis", students: 28, credits: 4 }
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">EduManage</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Student Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-b-0">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Grades
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <div className="p-4 h-[480px] overflow-auto">
            <TabsContent value="students" className="mt-0">
              {/* Search and Actions */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search students by name, email, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </div>

              {/* Students List */}
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{student.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{student.course}</Badge>
                            <span className="text-xs text-gray-500">GPA: {student.gpa}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={student.status === "Active" ? "default" : "secondary"}
                          className={student.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {student.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Course Management</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
              </div>

              <div className="grid gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{course.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {course.id} • Instructor: {course.instructor}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">{course.students} students enrolled</span>
                          <Badge variant="outline">{course.credits} credits</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grades" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Grade Management</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">Import Grades</Button>
                </div>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Recent Grade Entries</h3>
                  <div className="space-y-2">
                    {[
                      { student: "Alice Johnson", course: "CS101", grade: "A", date: "2024-01-15" },
                      { student: "Bob Smith", course: "CS201", grade: "B+", date: "2024-01-14" },
                      { student: "Carol Davis", course: "CS301", grade: "A-", date: "2024-01-13" }
                    ].map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                        <div>
                          <span className="font-medium">{entry.student}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">• {entry.course}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{entry.grade}</Badge>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Reports & Analytics</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Enrollment Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Students</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Active Courses</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Average GPA</span>
                        <span className="font-semibold">3.72</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">New enrollments:</span>
                        <span className="font-semibold ml-1">8 this week</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Grades submitted:</span>
                        <span className="font-semibold ml-1">42 today</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Reports generated:</span>
                        <span className="font-semibold ml-1">15 this month</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Generate Full Report
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}