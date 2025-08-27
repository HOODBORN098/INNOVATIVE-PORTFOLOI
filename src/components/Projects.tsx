import { useState } from "react";
import { Eye } from "./Eye";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ProjectModal, ProjectData } from "./ProjectModal";
import { ExternalLink, Github, Eye as EyeIcon, Calendar, Users, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "portfolio",
      title: "Interactive Portfolio Website",
      description: "A responsive portfolio website with interactive eyes that follow the cursor, built with React and TypeScript.",
      longDescription: "This portfolio website represents the culmination of my web development skills, featuring a unique interactive design where animated eyes follow the user's cursor throughout the site. Built using modern React with TypeScript, it demonstrates my ability to create engaging user experiences while maintaining professional standards. The site includes dark/light mode theming, responsive design, and smooth animations that work across all devices.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "Figma"],
      features: [
        "Interactive cursor-following eyes throughout the site",
        "Dark/Light mode theme switching with system preference detection",
        "Fully responsive design optimized for all devices",
        "Smooth scroll navigation and section transitions",
        "Interactive chatbot for visitor engagement",
        "Real-time form validation and submission",
        "Professional project showcase with modal views",
        "Optimized performance with lazy loading"
      ],
      challenges: [
        "Implementing smooth cursor tracking for the eyes while maintaining performance across different devices and screen sizes",
        "Creating a cohesive design system that works equally well in both light and dark modes",
        "Ensuring the playful interactive elements don't compromise the professional appearance needed for employer viewing"
      ],
      learnings: [
        "Advanced React hooks for complex state management",
        "CSS animations and transforms for interactive elements",
        "TypeScript best practices for large applications",
        "Performance optimization techniques for smooth animations",
        "Responsive design principles for cross-device compatibility",
        "User experience design balancing creativity with professionalism"
      ],
      githubUrl: "https://github.com/ericwambua/portfolio",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4b4173?w=800&h=600&fit=crop"
      ],
      category: "Web Development",
      status: "completed",
      duration: "3 weeks",
      teamSize: 1
    },
    {
      id: "student-management",
      title: "Student Management System",
      description: "A comprehensive web application for managing student records, grades, and course enrollment with role-based authentication.",
      longDescription: "A full-stack web application designed to streamline academic administration at educational institutions. The system provides comprehensive tools for managing student information, course enrollment, grade tracking, and academic reporting. Built with a focus on security and user experience, it features role-based authentication allowing students, teachers, and administrators different levels of access and functionality.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Material-UI"],
      features: [
        "Role-based authentication (Student, Teacher, Administrator)",
        "Student profile management with photo uploads",
        "Course enrollment and schedule management",
        "Grade entry and transcript generation",
        "Real-time notifications for important updates",
        "Advanced search and filtering capabilities",
        "Report generation with PDF export",
        "Data visualization for academic performance trends"
      ],
      challenges: [
        "Implementing secure role-based access control with JWT authentication",
        "Designing an efficient database schema to handle complex relationships between users, courses, and grades",
        "Creating an intuitive interface that serves three different user types with varying technical expertise"
      ],
      learnings: [
        "Full-stack development with React and Node.js",
        "Database design and optimization with MongoDB",
        "Authentication and authorization best practices",
        "API design and RESTful architecture",
        "File upload handling and cloud storage integration",
        "Real-time communication with WebSockets"
      ],
      githubUrl: "https://github.com/ericwambua/student-management",
      images: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ],
      category: "Full Stack",
      status: "completed",
      duration: "6 weeks",
      teamSize: 2
    },
    {
      id: "algorithm-visualizer",
      title: "Algorithm Visualizer",
      description: "Interactive tool for visualizing sorting and pathfinding algorithms with step-by-step animations.",
      longDescription: "An educational web application that brings computer science algorithms to life through interactive visualizations. Users can watch sorting algorithms like Quick Sort, Merge Sort, and Bubble Sort operate on data sets in real-time, with adjustable speed controls and step-by-step breakdowns. The application also features pathfinding algorithms like Dijkstra's and A* on customizable grids, making complex algorithmic concepts accessible and engaging for students and enthusiasts.",
      technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "D3.js", "Web Workers"],
      features: [
        "Interactive sorting algorithm visualizations (Quick, Merge, Bubble, Heap Sort)",
        "Pathfinding algorithms with obstacle placement on grid",
        "Real-time speed control and step-by-step execution",
        "Customizable data sets and grid sizes",
        "Performance metrics and complexity analysis display",
        "Educational explanations for each algorithm",
        "Export functionality for sharing visualizations",
        "Mobile-responsive design with touch controls"
      ],
      challenges: [
        "Optimizing canvas rendering performance for smooth animations with large data sets",
        "Implementing accurate algorithm step visualization without losing educational value",
        "Creating intuitive controls that work equally well on desktop and mobile devices"
      ],
      learnings: [
        "HTML5 Canvas API and advanced drawing techniques",
        "Algorithm implementation and optimization",
        "Animation timing and performance optimization",
        "Data structure manipulation and visualization",
        "Educational content design and user experience",
        "Cross-browser compatibility and mobile optimization"
      ],
      githubUrl: "https://github.com/ericwambua/algorithm-visualizer",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop"
      ],
      category: "Educational",
      status: "completed",
      duration: "4 weeks",
      teamSize: 1
    },
    {
      id: "campus-events",
      title: "Campus Event Tracker",
      description: "Mobile-first web app for discovering and managing campus events with real-time notifications.",
      longDescription: "A mobile-first progressive web application designed specifically for university students to discover, track, and participate in campus events. The application features real-time event updates, location-based recommendations, and social features that allow students to connect with others attending similar events. Built with offline-first architecture, it ensures students can access event information even with poor campus connectivity.",
      technologies: ["PWA", "Vue.js", "Firebase", "Tailwind CSS", "Service Workers"],
      features: [
        "Real-time event discovery and notifications",
        "Location-based event recommendations using GPS",
        "Social features for connecting with other attendees",
        "Offline functionality with service workers",
        "Event calendar integration with personal devices",
        "Photo sharing and event reviews",
        "Push notifications for event reminders",
        "QR code generation for event check-ins"
      ],
      challenges: [
        "Implementing reliable offline functionality for a real-time social application",
        "Optimizing location-based features while maintaining user privacy and battery life",
        "Creating a seamless experience across different mobile browsers and devices"
      ],
      learnings: [
        "Progressive Web App development and service workers",
        "Firebase real-time database and authentication",
        "Geolocation APIs and location-based services",
        "Mobile-first design principles",
        "Push notification implementation",
        "Offline-first architecture design"
      ],
      githubUrl: "https://github.com/ericwambua/campus-events",
      images: [
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
      ],
      category: "Mobile App",
      status: "in-progress",
      duration: "5 weeks",
      teamSize: 3
    },
    {
      id: "book-recommender",
      title: "Library Book Recommendation Engine",
      description: "AI-powered system that recommends books based on reading history and preferences using machine learning.",
      longDescription: "An intelligent book recommendation system developed for the university library that uses machine learning algorithms to suggest relevant books to students and faculty. The system analyzes reading history, borrowing patterns, academic field of study, and user ratings to provide personalized recommendations. It integrates with the existing library management system and includes features for discovering new authors and genres based on collaborative filtering and content-based recommendations.",
      technologies: ["Python", "Scikit-learn", "Flask", "PostgreSQL", "React", "Pandas"],
      features: [
        "Personalized book recommendations using collaborative filtering",
        "Content-based filtering using book metadata and descriptions",
        "Integration with library catalog and borrowing system",
        "Academic field-specific recommendations for students",
        "Popular and trending books discovery",
        "User rating and review system",
        "Reading list creation and management",
        "Advanced search with filters and faceted navigation"
      ],
      challenges: [
        "Handling sparse data in the recommendation matrix due to limited user-book interactions",
        "Balancing between popular recommendations and diverse, serendipitous discoveries",
        "Integrating machine learning models with the existing library management infrastructure"
      ],
      learnings: [
        "Machine learning algorithm implementation from scratch",
        "Collaborative and content-based filtering techniques",
        "Data preprocessing and feature engineering",
        "Model evaluation and performance optimization",
        "Integration of ML models with web applications",
        "Database design for recommendation systems"
      ],
      githubUrl: "https://github.com/ericwambua/book-recommender",
      images: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ],
      category: "Machine Learning",
      status: "completed",
      duration: "8 weeks",
      teamSize: 2
    },
    {
      id: "network-scanner",
      title: "Network Security Scanner",
      description: "Command-line tool for network vulnerability assessment and port scanning with detailed reporting.",
      longDescription: "A comprehensive network security assessment tool designed for educational purposes and legitimate security testing. The scanner performs automated vulnerability assessments, port scanning, and network mapping while generating detailed reports for system administrators. Built with a focus on ethical hacking principles and responsible disclosure, it includes features for detecting common vulnerabilities and misconfigurations in network infrastructure.",
      technologies: ["Python", "Nmap", "Scapy", "SQLite", "Matplotlib", "Threading"],
      features: [
        "Multi-threaded port scanning with service detection",
        "Vulnerability assessment against CVE database",
        "Network topology mapping and visualization",
        "Automated report generation with risk scoring",
        "Custom scan profiles for different assessment types",
        "Integration with popular security tools and APIs",
        "Command-line interface with extensive configuration options",
        "Database storage for historical scan comparisons"
      ],
      challenges: [
        "Implementing efficient multi-threaded scanning without overwhelming target networks",
        "Ensuring accurate vulnerability detection while minimizing false positives",
        "Balancing comprehensive scanning with ethical considerations and legal compliance"
      ],
      learnings: [
        "Network protocols and security fundamentals",
        "Python networking libraries and socket programming",
        "Multi-threading and concurrent programming techniques",
        "Cybersecurity best practices and ethical hacking principles",
        "Report generation and data visualization",
        "Command-line interface design and usability"
      ],
      githubUrl: "https://github.com/ericwambua/network-scanner",
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      category: "Cybersecurity",
      status: "completed",
      duration: "6 weeks",
      teamSize: 1
    }
  ];

  const openProjectModal = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800';
      case 'planning': return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--cookie-monster-blue)] mb-6">
              My Projects
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-card border border-border p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex gap-1">
                  <Eye className="!size-16" isRightEye={false} />
                  <Eye className="!size-16" isRightEye={true} />
                </div>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A collection of projects showcasing my journey in computer science, 
              from web development to machine learning and cybersecurity.
            </p>
            <div className="mt-8 p-4 bg-[var(--cookie-monster-blue)]/10 border border-[var(--cookie-monster-blue)]/20 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Rocket className="w-5 h-5 text-[var(--cookie-monster-blue)]" />
                <span className="font-semibold text-[var(--cookie-monster-blue)]">Interactive Live Demos Available!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Click on any project card to see the actual working application - no setup required!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden border-border hover:border-[var(--cookie-monster-blue)]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {project.images && project.images[0] && (
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-white/90 text-[var(--cookie-monster-blue)] hover:bg-white shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project);
                          }}
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          {project.liveUrl ? 'Try Live Demo' : 'Preview Project'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="group-hover:bg-[var(--cookie-monster-blue)]/10 transition-colors">
                      {project.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{project.duration}</span>
                      <Users className="w-3 h-3" />
                      <span>{project.teamSize}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3 group-hover:text-[var(--cookie-monster-blue)]/80 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs group-hover:border-[var(--cookie-monster-blue)]/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-border">
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className="flex-1 hover:bg-[var(--cookie-monster-blue)]/10 hover:border-[var(--cookie-monster-blue)]/50 transition-all duration-300 hover:scale-105"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl ? (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, '_blank');
                        }}
                        className="flex-1 bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectModal(project);
                        }}
                        className="flex-1 bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Want to see more projects or collaborate on something new?
            </p>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
}