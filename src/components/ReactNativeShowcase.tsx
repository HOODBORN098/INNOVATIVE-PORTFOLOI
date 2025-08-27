import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Smartphone, 
  Zap, 
  Users, 
  Shield, 
  Download, 
  Star,
  Play,
  Github,
  ExternalLink
} from "lucide-react";

const reactNativeProjects = [
  {
    name: "Task Manager Pro",
    description: "A productivity app with offline sync and real-time collaboration",
    features: ["Offline Support", "Push Notifications", "Real-time Sync", "Biometric Auth"],
    tech: ["React Native", "Redux Toolkit", "AsyncStorage", "Firebase"],
    image: "📱",
    downloads: "Coming Soon",
    rating: 0,
    status: "In Development"
  },
  {
    name: "Fitness Tracker",
    description: "Track workouts, set goals, and monitor progress with beautiful charts",
    features: ["Health Kit Integration", "Custom Workouts", "Progress Charts", "Social Sharing"],
    tech: ["React Native", "Expo", "React Native Charts", "SQLite"],
    image: "🏃",
    downloads: "Coming Soon",
    rating: 0,
    status: "In Development"
  },
  {
    name: "Food Delivery",
    description: "On-demand food delivery with real-time tracking and payments",
    features: ["GPS Tracking", "Payment Gateway", "Order Management", "Rating System"],
    tech: ["React Native", "Maps API", "Stripe", "WebSockets"],
    image: "🍕",
    downloads: "Coming Soon",
    rating: 0,
    status: "In Development"
  }
];

const capabilities = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Cross-Platform Development",
    description: "Single codebase for iOS and Android with native performance"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Development",
    description: "Hot reload and rapid prototyping for faster time-to-market"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Native Experience",
    description: "Platform-specific UI components that feel native to each OS"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Scalable",
    description: "Enterprise-grade security with scalable architecture"
  }
];

export function ReactNativeShowcase() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            📱
          </motion.div>
          <h3 className="text-3xl font-bold">React Native Development</h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Building powerful cross-platform mobile applications with React Native, 
          delivering native performance and user experience on both iOS and Android.
        </p>
      </motion.div>

      {/* Capabilities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilities.map((capability, index) => (
          <motion.div
            key={capability.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="text-center h-full hover:shadow-lg transition-all duration-300 animate-card-hover">
              <CardContent className="p-6">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {capability.icon}
                </motion.div>
                <h4 className="font-semibold mb-2">{capability.title}</h4>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Projects Showcase */}
      <div className="space-y-8">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center"
        >
          Featured Mobile Projects
        </motion.h4>

        <div className="grid lg:grid-cols-3 gap-6">
          {reactNativeProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 animate-card-hover group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="text-4xl mb-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.image}
                    </motion.div>
                    <Badge 
                      variant={project.status === "Live on App Stores" ? "default" : 
                              project.status === "In Development" ? "secondary" : "outline"}
                      className="ml-2"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="group-hover:text-[var(--cookie-monster-blue)] transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">
                      Expected launch: Q2 2025
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Key Features:</p>
                    <div className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 animate-button-hover">
                      <Play className="w-4 h-4 mr-2" />
                      Preview Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl mb-4"
            >
              🚀
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Ready to Go Mobile?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's bring your app idea to life with React Native development
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="animate-button-hover"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your Mobile Project
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}