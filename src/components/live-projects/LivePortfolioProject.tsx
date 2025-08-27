import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Eye } from "../Eye";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Award,
  Code,
  Database,
  Smartphone,
  Globe,
  Send,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Coffee,
  Star,
  Heart,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function LivePortfolioProject() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const typingTexts = [
    "Full Stack Developer",
    "React Specialist", 
    "Problem Solver",
    "Tech Enthusiast",
    "Code Craftsman"
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[currentTextIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          setTypedText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  // Download CV function
  const downloadCV = () => {
    // Create a comprehensive CV content
    const cvContent = `
ERIC WAMBUA
Computer Science Student & Full Stack Developer
Phone: 0112394362 | Email: ericwambua098@gmail.com
Location: Nairobi, Kenya | LinkedIn: /in/ericwambua | GitHub: /ericwambua

PROFESSIONAL SUMMARY
Passionate computer science student at Egerton University with expertise in full-stack development, 
specializing in React, TypeScript, and Node.js. Proven track record of building innovative web 
applications with a focus on user experience and modern development practices.

TECHNICAL SKILLS
Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Motion/Framer Motion
Backend: Node.js, Express.js, Python, FastAPI, RESTful APIs
Databases: MongoDB, PostgreSQL, SQLite, Firebase
DevOps: Docker, AWS, Vercel, GitHub Actions, Nginx
Tools: Git, Figma, VS Code, Postman, Jest

EDUCATION
Bachelor of Science in Computer Science
Egerton University | 2021 - 2025
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, 
Network Security, Machine Learning

PROJECTS
Interactive Portfolio Website (2024)
• Built responsive portfolio with cursor-following animations using React & TypeScript
• Implemented dark/light mode theming and smooth scroll navigation
• Optimized for performance across all devices with lazy loading

Student Management System (2024)
• Developed full-stack application with role-based authentication using JWT
• Created comprehensive dashboard for managing student records and grades
• Integrated real-time notifications and PDF report generation

Algorithm Visualizer (2024)
• Built educational tool for visualizing sorting and pathfinding algorithms
• Implemented real-time animations using HTML5 Canvas and D3.js
• Added performance metrics and complexity analysis features

EXPERIENCE
Frontend Developer Intern | TechCorp Kenya | Jun 2023 - Aug 2023
• Developed responsive web applications using React and TypeScript
• Collaborated with design team to implement user interfaces
• Improved application performance by 25% through optimization techniques

Freelance Web Developer | Self-Employed | Jan 2023 - Present
• Built custom websites for local businesses using modern frameworks
• Managed full project lifecycle from requirements to deployment
• Maintained 100% client satisfaction rate across 15+ projects

ACHIEVEMENTS
• Dean's List - Egerton University (2022, 2023)
• Winner - University Hackathon 2023
• Contributing member - Open Source projects on GitHub
• Technical mentor for junior students

LANGUAGES
English (Fluent), Swahili (Native)
`;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Eric_Wambua_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simulate form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const skills = [
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 88, category: "Backend" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "AWS", level: 75, category: "DevOps" },
    { name: "Docker", level: 78, category: "DevOps" },
    { name: "Git", level: 92, category: "Tools" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment processing and inventory management",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      status: "Live",
      url: "https://ecommerce-demo.ericwambua.dev",
      stars: 4.9,
      downloads: "2.3K"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management with real-time updates and team features",
      tech: ["Vue.js", "Firebase", "Socket.io", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      status: "Live",
      url: "https://taskmanager-demo.ericwambua.dev",
      stars: 4.7,
      downloads: "1.8K"
    },
    {
      id: 3,
      title: "Weather Analytics Dashboard",
      description: "Data visualization dashboard for weather patterns with ML predictions",
      tech: ["React", "D3.js", "Python", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
      status: "Development",
      url: "#",
      stars: 4.6,
      downloads: "892"
    }
  ];

  const experience = [
    {
      role: "Frontend Developer Intern",
      company: "TechCorp Kenya",
      period: "Jun 2023 - Aug 2023",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement user interfaces and improved performance by 25%.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
      achievements: [
        "Improved app performance by 25%",
        "Delivered 8 major features on time",
        "Mentored 2 junior developers"
      ]
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed", 
      period: "Jan 2023 - Present",
      description: "Built custom websites for local businesses. Managed full project lifecycle from requirements gathering to deployment with 100% client satisfaction.",
      skills: ["WordPress", "PHP", "MySQL", "JavaScript", "React"],
      achievements: [
        "15+ successful projects delivered",
        "100% client satisfaction rate",
        "Generated $12K+ in revenue"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Lead at TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "Eric's attention to detail and technical skills are outstanding. He consistently delivered high-quality code and was a pleasure to work with.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Exceptional problem-solving abilities and great team player. Eric's React expertise helped us ship features 30% faster.",
      rating: 5
    },
    {
      name: "Dr. Jane Smith",
      role: "CS Professor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "One of the most dedicated students I've taught. Eric's passion for technology and continuous learning is truly inspiring.",
      rating: 5
    }
  ];

  return (
    <div className="w-full h-[800px] bg-white dark:bg-gray-900 rounded-lg overflow-hidden border shadow-2xl">
      <div className={`h-full transition-colors duration-500 ${isDark ? 'dark bg-gray-900' : 'bg-white'} flex flex-col`}>
        
        {/* Enhanced Navigation */}
        <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                  <div className="flex gap-1">
                    <Eye className="!size-8" isRightEye={false} />
                    <Eye className="!size-8" isRightEye={true} />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Eric Wambua</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{typedText}<span className="animate-pulse">|</span></p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCurrentSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      currentSection === item.toLowerCase()
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsDark(!isDark)}
                  className="w-9 h-9 p-0 hover:scale-110 transition-transform duration-300"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="md:hidden w-9 h-9 p-0"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 border-t shadow-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCurrentSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Enhanced Content */}
        <div className="flex-1 overflow-auto">
          {currentSection === "home" && (
            <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
              </div>

              <div className="text-center max-w-5xl mx-auto px-6 relative z-10">
                <div className="mb-8 animate-fade-in">
                  <div className="w-40 h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500 animate-bounce">
                    <div className="flex gap-2">
                      <Eye className="!size-20" isRightEye={false} />
                      <Eye className="!size-20" isRightEye={true} />
                    </div>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-up">
                    Eric Wambua
                  </h1>
                  <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 h-16 flex items-center justify-center">
                    <span className="border-r-2 border-blue-600 pr-1 animate-pulse">
                      {typedText}
                    </span>
                  </div>
                  <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-delayed leading-relaxed">
                    Passionate about creating innovative web applications and exploring the intersection 
                    of technology and user experience. Currently studying Computer Science at Egerton University.
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years Coding</div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-pink-600">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-green-600">4.8/5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
                  </div>
                </div>

                {/* Enhanced Tech Stack */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {["React", "TypeScript", "Node.js", "Python", "MongoDB", "AWS", "Docker", "Figma"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm hover:scale-110 transition-transform duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => setCurrentSection("contact")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={downloadCV}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => window.open("https://github.com/ericwambua", "_blank")}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          )}
          {currentSection === "about" && (
            <div className="py-20 px-6 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                      I'm a passionate computer science student at Egerton University with a deep love for 
                      technology and innovation. My journey in programming started during high school, and 
                      I've been constantly learning and building ever since.
                    </p>
                    <p>
                      I specialize in full-stack web development, with expertise in modern frameworks like 
                      React and Node.js. I'm particularly interested in creating user-friendly applications 
                      that solve real-world problems.
                    </p>
                    <p>
                      When I'm not coding, you can find me exploring new technologies, contributing to 
                      open-source projects, or mentoring fellow students. I believe in continuous learning 
                      and sharing knowledge with the community.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h4>
                      <p className="text-gray-600 dark:text-gray-300">BSc Computer Science</p>
                      <p className="text-gray-500 dark:text-gray-400">Egerton University</p>
                      <p className="text-gray-500 dark:text-gray-400">2021 - 2025</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Code className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Development</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Building scalable web applications with modern technologies and best practices.
                    </p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-6 h-6 text-green-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Data Science</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Analyzing data to derive meaningful insights and build intelligent systems.
                    </p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="w-6 h-6 text-purple-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Mobile Dev</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Creating cross-platform mobile applications with React Native and Flutter.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentSection === "skills" && (
            <div className="py-20 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  A comprehensive overview of my technical skills and the technologies I work with.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Skill Categories */}
                <div className="space-y-6">
                  {["Frontend", "Backend", "Database", "DevOps"].map((category) => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    return (
                      <Card key={category} className="p-6 hover:shadow-xl transition-all duration-300">
                        <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          {category === "Frontend" && <Globe className="w-5 h-5 text-blue-500" />}
                          {category === "Backend" && <Database className="w-5 h-5 text-green-500" />}
                          {category === "Database" && <Database className="w-5 h-5 text-purple-500" />}
                          {category === "DevOps" && <Zap className="w-5 h-5 text-orange-500" />}
                          {category}
                        </h3>
                        <div className="space-y-4">
                          {categorySkills.map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Additional Skills Info */}
                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Currently Learning</h4>
                    </div>
                    <div className="space-y-2">
                      {["GraphQL", "Kubernetes", "Machine Learning", "Web3"].map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-green-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Certifications</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">React Developer Certification</span>
                        <Badge variant="secondary">2024</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">AWS Cloud Practitioner</span>
                        <Badge variant="secondary">2023</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">MongoDB Developer</span>
                        <Badge variant="secondary">2023</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Soft Skills</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["Leadership", "Team Work", "Communication", "Problem Solving", "Creativity", "Time Management"].map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentSection === "projects" && (
            <div className="py-20 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Some of my recent work and personal projects with real impact
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    <div className="relative group">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge 
                          className={`${
                            project.status === 'Live' 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-yellow-500/90 text-white'
                          } shadow-lg`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-between items-center text-white">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              <span className="text-sm">{project.downloads}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 px-2 py-1 rounded-full">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-700 dark:text-green-400">Popular</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                        <Button 
                          size="sm" 
                          className={`flex-1 ${project.status === 'Live' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gray-400 cursor-not-allowed'} text-white`}
                          disabled={project.status !== 'Live'}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {project.status === 'Live' ? 'Live Demo' : 'Coming Soon'}
                        </Button>
                      </div>
                      
                      {project.status === 'Live' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>Active Users: 1.2K+</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Updated: 2 days ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Testimonials Section */}
              <div className="mt-16">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What People Say</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Feedback from colleagues, mentors, and clients
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="flex items-center gap-3 mb-4">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === "experience" && (
            <div className="py-20 px-6 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  My professional journey and work experience
                </p>
              </div>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="self-start md:self-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentSection === "contact" && (
            <div className="py-20 px-6 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Let's discuss opportunities or just say hello!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">ericwambua098@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">0112394362</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">Nairobi, Kenya</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button size="sm" variant="outline">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>

                <Card className="p-6">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-6">Send Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  {submitStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}