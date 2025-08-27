import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Eye } from "./Eye";
import { ExternalLink, Github, Play, Code, Zap, Users, Monitor, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Import demo components
import { PortfolioDemo } from "./demos/PortfolioDemo";
import { StudentManagementDemo } from "./demos/StudentManagementDemo";
import { AlgorithmVisualizerDemo } from "./demos/AlgorithmVisualizerDemo";
import { CampusEventsDemo } from "./demos/CampusEventsDemo";
import { BookRecommenderDemo } from "./demos/BookRecommenderDemo";
import { NetworkScannerDemo } from "./demos/NetworkScannerDemo";

// Import live project components
import { LiveProjectDeployer } from "./LiveProjectDeployer";
import { LivePortfolioProject } from "./live-projects/LivePortfolioProject";
import { LiveStudentManagementProject } from "./live-projects/LiveStudentManagementProject";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  category: string;
  status: "completed" | "in-progress" | "planning";
  duration: string;
  teamSize: number;
}

interface ProjectModalProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeployer, setShowDeployer] = useState(false);

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planning': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Function to render the appropriate demo component
  const renderDemo = () => {
    switch (project.id) {
      case "portfolio":
        return <PortfolioDemo />;
      case "student-management":
        return <StudentManagementDemo />;
      case "algorithm-visualizer":
        return <AlgorithmVisualizerDemo />;
      case "campus-events":
        return <CampusEventsDemo />;
      case "book-recommender":
        return <BookRecommenderDemo />;
      case "network-scanner":
        return <NetworkScannerDemo />;
      default:
        return (
          <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Demo Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Interactive demo is being prepared for this project.
              </p>
            </div>
          </div>
        );
    }
  };

  // Function to render the live working project
  const renderLiveProject = () => {
    switch (project.id) {
      case "portfolio":
        return <LivePortfolioProject />;
      case "student-management":
        return <LiveStudentManagementProject />;
      case "algorithm-visualizer":
        return <AlgorithmVisualizerDemo />; // Use demo for now
      case "campus-events":
        return <CampusEventsDemo />; // Use demo for now
      case "book-recommender":
        return <BookRecommenderDemo />; // Use demo for now  
      case "network-scanner":
        return <NetworkScannerDemo />; // Use demo for now
      default:
        return renderDemo();
    }
  };

  if (showDeployer) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-background">
          <LiveProjectDeployer
            projectId={project.id}
            projectName={project.title}
            onClose={() => setShowDeployer(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-background">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[var(--cookie-monster-blue)]/10 p-4 rounded-2xl">
              <div className="flex gap-1">
                <Eye className="!size-12" isRightEye={false} />
                <Eye className="!size-12" isRightEye={true} />
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-[var(--cookie-monster-blue)] mb-2">
                {project.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detailed information about {project.title}, including project overview, technologies used, key features, challenges, and learnings.
              </DialogDescription>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={`${getStatusColor(project.status)} text-white`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {project.duration} • {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Live Demo
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Process
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="live" className="mt-0">
              <Card className="p-4 border-[var(--cookie-monster-blue)]/20 hover:border-[var(--cookie-monster-blue)]/40 transition-colors">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-2 flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Live Working Demo
                      </h3>
                      <p className="text-muted-foreground">
                        This is the actual working application - interact with it as if it were deployed live!
                      </p>
                    </div>
                    <Button 
                      onClick={() => setShowDeployer(true)}
                      variant="outline"
                      className="border-[var(--cookie-monster-blue)] text-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/10"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy to Server
                    </Button>
                  </div>
                </div>
                {renderLiveProject()}
              </Card>
            </TabsContent>

            <TabsContent value="demo" className="mt-0">
              <Card className="p-4 border-[var(--cookie-monster-blue)]/20 hover:border-[var(--cookie-monster-blue)]/40 transition-colors">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-2 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Interactive Preview
                  </h3>
                  <p className="text-muted-foreground">
                    Quick preview of the project's interface and core functionality.
                  </p>
                </div>
                {renderDemo()}
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                {/* Project Description */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Project Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies Used */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="hover:bg-[var(--cookie-monster-blue)]/10 hover:text-[var(--cookie-monster-blue)] transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              {/* Key Features */}
              <div>
                <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full mt-2 group-hover:scale-125 transition-transform" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="mt-0">
              <div className="space-y-6">
                {/* Challenges & Solutions */}
                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3">
                      Challenges & Solutions
                    </h3>
                    <div className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <Card 
                          key={index} 
                          className="p-4 bg-muted/50 hover:bg-muted transition-colors border-l-4 border-[var(--cookie-monster-blue)]"
                        >
                          <p className="text-sm text-muted-foreground">{challenge}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Learnings */}
                {project.learnings && project.learnings.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] mb-3">
                      Key Learnings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.learnings.map((learning, index) => (
                        <Card 
                          key={index} 
                          className="p-3 bg-[var(--cookie-monster-blue)]/5 hover:bg-[var(--cookie-monster-blue)]/10 transition-colors"
                        >
                          <p className="text-sm">{learning}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-0">
              {/* Project Images Carousel */}
              {project.images && project.images.length > 0 && (
                <Card className="p-4 border-[var(--cookie-monster-blue)]/20 hover:border-[var(--cookie-monster-blue)]/40 transition-colors">
                  <div className="relative">
                    <ImageWithFallback
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    {project.images.length > 1 && (
                      <>
                        <Button
                          onClick={() => handleImageNavigation('prev')}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          size="sm"
                        >
                          ←
                        </Button>
                        <Button
                          onClick={() => handleImageNavigation('next')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          size="sm"
                        >
                          →
                        </Button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {project.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border mt-6">
            <Button
              onClick={() => setShowDeployer(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Live Version
            </Button>
            {project.githubUrl && (
              <Button
                onClick={() => window.open(project.githubUrl, '_blank')}
                variant="outline"
                className="border-[var(--cookie-monster-blue)] text-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/10 hover:scale-105 transition-all duration-300"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                onClick={() => window.open(project.liveUrl, '_blank')}
                variant="outline"
                className="border-[var(--cookie-monster-blue)] text-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/10 hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                External Demo
              </Button>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}