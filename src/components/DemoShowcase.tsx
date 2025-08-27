import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Code, 
  Database, 
  Globe, 
  Zap,
  Brain,
  BarChart3,
  BookOpen,
  Calendar,
  Shield,
  CloudRain,
  User,
  CheckCircle,
  ExternalLink,
  GraduationCap,
  Play,
  Eye
} from "lucide-react";
import { PortfolioDemo } from "./demos/PortfolioDemo";
import { StudentManagementDemo } from "./demos/StudentManagementDemo";
import { AlgorithmVisualizerDemo } from "./demos/AlgorithmVisualizerDemo";
import { BookRecommenderDemo } from "./demos/BookRecommenderDemo";
import { CampusEventsDemo } from "./demos/CampusEventsDemo";
import { NetworkScannerDemo } from "./demos/NetworkScannerDemo";

interface DemoProject {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  backendFeatures: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: React.ComponentType<any>;
  status: 'Interactive Demo' | 'Concept' | 'Full Design';
  hasInteractiveDemo: boolean;
  githubUrl: string;
  demoComponent?: React.ComponentType;
}

const demoProjects: DemoProject[] = [
  {
    id: "portfolio",
    name: "Interactive Portfolio Website",
    description: "A responsive portfolio with interactive cursor-following eyes and comprehensive professional features including downloadable CV, contact forms, and real-time analytics.",
    category: "Web Development",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "Figma"],
    features: [
      "Interactive cursor-following eyes throughout the site",
      "Dark/Light mode with system preference detection", 
      "Downloadable CV with multiple formats (PDF, DOC, JSON)",
      "Real-time contact form with validation",
      "Professional project showcase with live demos",
      "Interactive chatbot for visitor engagement",
      "Responsive design optimized for all devices",
      "Smooth animations and transitions"
    ],
    backendFeatures: [
      "Contact form submissions with email notifications",
      "CV download tracking and analytics",
      "Visitor analytics and engagement metrics",
      "Content management system for projects",
      "Real-time chat support integration",
      "SEO optimization and meta tag management"
    ],
    complexity: "Intermediate",
    icon: User,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/interactive-portfolio",
    demoComponent: PortfolioDemo
  },
  {
    id: "student-management",
    name: "Student Management System",
    description: "A comprehensive academic management platform with role-based authentication, grade tracking, course enrollment, and administrative tools for educational institutions.",
    category: "Full Stack Application",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Material-UI"],
    features: [
      "Role-based authentication (Student, Teacher, Administrator)",
      "Student profile management with photo uploads",
      "Course enrollment and schedule management",
      "Grade entry and transcript generation", 
      "Real-time notifications and messaging",
      "Advanced search and filtering capabilities",
      "Report generation with PDF export",
      "Data visualization for academic performance"
    ],
    backendFeatures: [
      "RESTful API with JWT authentication",
      "MongoDB database with optimized schemas",
      "File upload handling for documents and photos",
      "Email notification system",
      "Real-time messaging with WebSockets",
      "Automated backup and data recovery",
      "API rate limiting and security middleware"
    ],
    complexity: "Expert",
    icon: GraduationCap,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/student-management-system",
    demoComponent: StudentManagementDemo
  },
  {
    id: "algorithm-visualizer",
    name: "Algorithm Visualizer Pro",
    description: "An interactive educational platform for visualizing sorting algorithms, pathfinding algorithms, and data structures with real-time performance analytics and step-by-step explanations.",
    category: "Educational Technology",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "D3.js", "Web Workers"],
    features: [
      "Interactive sorting algorithms (Bubble, Quick, Merge, Heap Sort)",
      "Pathfinding algorithms (Dijkstra, A*, BFS, DFS)",
      "Real-time speed control and step-by-step execution",
      "Customizable data sets and grid sizes",
      "Performance metrics and complexity analysis",
      "Educational explanations for each algorithm",
      "Data structure visualizations (Trees, Graphs, Hash Tables)",
      "Mobile-responsive with touch controls"
    ],
    backendFeatures: [
      "User progress tracking and learning analytics",
      "Custom algorithm sharing and community features",
      "Performance benchmarking across devices",
      "Educational content management system",
      "Integration with learning management systems",
      "Real-time collaboration for classroom use"
    ],
    complexity: "Advanced",
    icon: Brain,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/algorithm-visualizer-pro",
    demoComponent: AlgorithmVisualizerDemo
  },
  {
    id: "book-recommender", 
    name: "BookSage AI - Intelligent Recommender",
    description: "An AI-powered book recommendation system using machine learning algorithms for personalized suggestions, user profiles, reading analytics, and social features.",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "Flask", "PostgreSQL", "React", "Pandas"],
    features: [
      "AI-powered recommendations using collaborative filtering",
      "Content-based filtering with book metadata analysis",
      "Personalized user profiles with reading history",
      "Reading goal tracking and achievement badges",
      "Social features for book clubs and discussions",
      "Advanced search with multiple filters",
      "Book ratings and review system",
      "Reading analytics and insights dashboard"
    ],
    backendFeatures: [
      "Machine learning pipeline for recommendation engine",
      "Real-time recommendation API with caching",
      "Natural language processing for book descriptions",
      "User behavior analytics and A/B testing",
      "Integration with external book databases",
      "Recommendation model retraining automation"
    ],
    complexity: "Expert",
    icon: BookOpen,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/booksage-ai-recommender",
    demoComponent: BookRecommenderDemo
  },
  {
    id: "campus-events",
    name: "CampusEvents - Event Management Platform", 
    description: "A comprehensive event management platform with ticketing, real-time notifications, social features, and analytics for campus activities and community events.",
    category: "Event Management",
    technologies: ["Vue.js", "Firebase", "PWA", "Tailwind CSS", "Service Workers"],
    features: [
      "Real-time event discovery and notifications",
      "Advanced ticketing system with QR codes",
      "Social features for attendee networking",
      "Event creation tools with rich media support",
      "Location-based event recommendations",
      "Calendar integration and reminder system",
      "Event analytics and attendance tracking",
      "Mobile-first Progressive Web App"
    ],
    backendFeatures: [
      "Real-time database with live updates",
      "Payment processing integration",
      "Email and SMS notification system",
      "Event analytics and reporting dashboard",
      "Integration with calendar applications",
      "Geolocation services for event mapping"
    ],
    complexity: "Advanced",
    icon: Calendar,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/campus-events-platform",
    demoComponent: CampusEventsDemo
  },
  {
    id: "network-scanner",
    name: "NetScan Pro - Network Security Scanner",
    description: "A professional network security assessment tool with vulnerability scanning, device discovery, real-time monitoring, and comprehensive security reporting.",
    category: "Cybersecurity",
    technologies: ["Python", "Nmap", "Scapy", "SQLite", "React", "WebSockets"],
    features: [
      "Multi-threaded network device discovery",
      "Vulnerability assessment with CVE database",
      "Real-time network monitoring dashboard",
      "Security report generation with risk scoring",
      "Custom scan profiles and scheduling",
      "Network topology visualization",
      "Device fingerprinting and OS detection",
      "Historical scan comparison and trending"
    ],
    backendFeatures: [
      "Distributed scanning across multiple nodes",
      "Integration with vulnerability databases",
      "Automated security alerting system",
      "API for third-party security tool integration",
      "Compliance reporting (NIST, ISO 27001)",
      "Network traffic analysis and logging"
    ],
    complexity: "Expert",
    icon: Shield,
    status: "Interactive Demo",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ericwambua/netscan-pro",
    demoComponent: NetworkScannerDemo
  },
  {
    id: "weather-analytics",
    name: "WeatherScope AI - Weather Analytics",
    description: "An advanced weather analytics platform with real-time forecasting, historical analysis, weather station monitoring, and AI-powered predictions.",
    category: "Data Analytics",
    technologies: ["Python", "TensorFlow", "Flask", "PostgreSQL", "React", "D3.js"],
    features: [
      "Real-time weather data visualization",
      "AI-powered weather predictions and alerts",
      "Historical weather analysis and trends",
      "Weather station network monitoring",
      "Interactive weather maps and overlays",
      "Custom weather alerts and notifications",
      "Agricultural and business weather insights",
      "Mobile app with offline capabilities"
    ],
    backendFeatures: [
      "Integration with multiple weather APIs",
      "Machine learning models for prediction",
      "Time-series database for historical data",
      "Real-time data processing pipeline",
      "Geospatial analysis and mapping services",
      "API for third-party integrations"
    ],
    complexity: "Expert", 
    icon: CloudRain,
    status: "Concept",
    hasInteractiveDemo: false,
    githubUrl: "https://github.com/ericwambua/weatherscope-ai"
  }
];

export function DemoShowcase() {
  const [selectedDemo, setSelectedDemo] = useState<string>("portfolio");
  const [activeTab, setActiveTab] = useState("overview");
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false);

  const currentDemo = demoProjects.find(demo => demo.id === selectedDemo);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interactive Demo': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Full Design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Concept': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Remove fullscreen mode since we're using external links

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Interactive Project Showcase
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore detailed project breakdowns and interact with live demo components. 
          Each project showcases different technologies and approaches to solve real-world problems.
        </p>
        
        {/* Demo Instructions Card */}
        <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🎯 Interactive Project Exploration
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                Dive deep into each project with interactive demonstrations, detailed technical breakdowns, 
                and comprehensive feature showcases. Experience the user interfaces and functionality 
                through embedded demos and rich project documentation.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 text-white">✅ Interactive Demos</Badge>
                <Badge className="bg-green-600 text-white">✅ Technical Details</Badge>
                <Badge className="bg-purple-600 text-white">✅ Feature Showcase</Badge>
                <Badge className="bg-orange-600 text-white">✅ Code Examples</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {demoProjects.map((demo) => {
          const Icon = demo.icon;
          return (
            <Card 
              key={demo.id} 
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                selectedDemo === demo.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              onClick={() => setSelectedDemo(demo.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight mb-1">{demo.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{demo.category}</p>
                  <div className="flex items-center gap-1">
                    <Badge className={getStatusColor(demo.status)} size="sm">
                      {demo.status}
                    </Badge>
                    <Badge className={getComplexityColor(demo.complexity)} size="sm">
                      {demo.complexity}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Demo Details */}
      {currentDemo && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <currentDemo.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{currentDemo.name}</h2>
                  <p className="text-muted-foreground mb-3">{currentDemo.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getStatusColor(currentDemo.status)}>
                      {currentDemo.status}
                    </Badge>
                    <Badge className={getComplexityColor(currentDemo.complexity)}>
                      {currentDemo.complexity}
                    </Badge>
                    <Badge variant="outline">{currentDemo.category}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {currentDemo.hasInteractiveDemo && (
                  <Button 
                    onClick={() => setShowInteractiveDemo(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try Interactive Demo
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(currentDemo.githubUrl, '_blank');
                  }}
                >
                  <Code className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="preview">Interactive Demo</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                    <p className="text-muted-foreground mb-4">{currentDemo.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Category: {currentDemo.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          Complexity: {currentDemo.complexity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Status: {currentDemo.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Features:</span>
                        <span className="font-medium">{currentDemo.features.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Technologies:</span>
                        <span className="font-medium">{currentDemo.technologies.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Backend APIs:</span>
                        <span className="font-medium">{currentDemo.backendFeatures.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <h3 className="text-lg font-semibold">Core Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDemo.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tech-stack" className="space-y-4">
                <h3 className="text-lg font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {currentDemo.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="backend" className="space-y-4">
                <h3 className="text-lg font-semibold">Backend Features & APIs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDemo.backendFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Database className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Project Experience</h3>
                  <div className="flex gap-2">
                    {currentDemo.hasInteractiveDemo && (
                      <Button 
                        onClick={() => setShowInteractiveDemo(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Try Demo
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(currentDemo.githubUrl, '_blank');
                      }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  </div>
                </div>
                
                {currentDemo.hasInteractiveDemo ? (
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="p-6 text-center border-2 border-dashed border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer"
                          onClick={() => setShowInteractiveDemo(true)}>
                      <Play className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-2">Interactive Demo</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Experience the core functionality through an interactive demonstration
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Launch Interactive Demo
                      </Button>
                    </Card>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-6 rounded-lg border">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Interactive Project Preview</h4>
                          <p className="text-muted-foreground mb-4">
                            This interactive demo showcases the key features and user interface of the project. 
                            While not a full deployment, it demonstrates the core functionality and design principles 
                            that would be implemented in a production environment.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">✅ Interactive UI</Badge>
                            <Badge variant="secondary">✅ Core Features</Badge>
                            <Badge variant="secondary">✅ Design System</Badge>
                            <Badge variant="secondary">✅ User Experience</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Conceptual Project</h4>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      This project is currently in conceptual phase. View the source code and technical 
                      specifications to understand the planned implementation.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(currentDemo.githubUrl, '_blank');
                      }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      View Project Plans
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
      
      {/* Interactive Demo Modal */}
      {showInteractiveDemo && currentDemo?.demoComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {currentDemo.name} - Interactive Demo
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowInteractiveDemo(false)}
              >
                Close
              </Button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <currentDemo.demoComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}