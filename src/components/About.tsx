import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Brain, 
  Users, 
  Trophy,
  Target,
  Lightbulb,
  Heart,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { useScrollAnimation, useStaggeredAnimation } from "./utils/useScrollAnimation";

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Developer",
    description: "Proficient in modern web technologies including React, Node.js, and Python",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Brain,
    title: "AI Enthusiast",
    description: "Passionate about machine learning and artificial intelligence applications",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Database,
    title: "Database Expert",
    description: "Experienced in designing and optimizing database systems for performance",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Developer",
    description: "Creating responsive and native mobile applications for iOS and Android",
    color: "from-orange-500 to-red-500"
  }
];

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "Constantly exploring new technologies and approaches"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams to achieve common goals"
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Finding creative solutions to complex challenges"
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by genuine love for technology and development"
  }
];

export function About() {
  const { elementRef: mainRef, isVisible: mainVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: highlightsRef, visibleItems: visibleHighlights } = useStaggeredAnimation(highlights.length, 150);
  const { elementRef: valuesRef, visibleItems: visibleValues } = useStaggeredAnimation(values.length, 100);

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={mainRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: mainVisible ? 1 : 0, scale: mainVisible ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cookie-monster-blue)]/10 text-[var(--cookie-monster-blue)] font-medium mb-6"
          >
            <User className="w-5 h-5" />
            About Me
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="animate-text-gradient">Passionate Developer</span>
            <br />
            <span className="text-muted-foreground">& Problem Solver</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm a dedicated Computer Science student at Egerton University with a passion for 
            creating innovative digital solutions. My journey in technology has been driven by 
            curiosity and a desire to make a meaningful impact through code.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: mainVisible ? 1 : 0, x: mainVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            <Card className="p-8 animate-card-hover bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 border-2 border-transparent hover:border-[var(--cookie-monster-blue)]/20">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[var(--cookie-monster-blue)]">My Journey</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    My journey into technology began with a simple fascination for how things work. 
                    This curiosity led me to pursue Computer Science at Egerton University, where 
                    I've been honing my skills in software development, data structures, and algorithms.
                  </p>
                  <p>
                    I believe in the power of technology to solve real-world problems and improve 
                    people's lives. Whether it's building efficient web applications, exploring 
                    machine learning algorithms, or designing user-friendly interfaces, I approach 
                    each project with enthusiasm and attention to detail.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to 
                    open-source projects, or mentoring fellow students in their programming journey.
                  </p>
                </div>
              </motion.div>
            </Card>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Projects", value: "15+", icon: Code },
                { label: "Technologies", value: "12+", icon: Globe },
                { label: "Experience", value: "3 Years", icon: Trophy },
                { label: "Learning", value: "Always", icon: Brain }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 text-center animate-card-hover"
                  >
                    <Icon className="w-8 h-8 text-[var(--cookie-monster-blue)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--cookie-monster-blue)]">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Skills Highlights */}
          <motion.div
            ref={highlightsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: mainVisible ? 1 : 0, x: mainVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">What I Do Best</h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                const isVisible = visibleHighlights.includes(index);
                
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group"
                  >
                    <Card className="p-6 animate-card-hover bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 border-l-4 border-l-transparent group-hover:border-l-[var(--cookie-monster-blue)] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-r ${highlight.color} text-white flex-shrink-0`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-[var(--cookie-monster-blue)] transition-colors">
                            {highlight.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          ref={valuesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Core Values</h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The principles that guide my work and drive my continuous growth as a developer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isVisible = visibleValues.includes(index);
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    y: isVisible ? 0 : 30,
                    scale: isVisible ? 1 : 0.8
                  }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <Card className="p-6 h-full text-center animate-card-hover bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 border-2 border-transparent group-hover:border-[var(--cookie-monster-blue)]/30">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 flex items-center justify-center text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-[var(--cookie-monster-blue)] transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mainVisible ? 1 : 0, y: mainVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-20"
        >
          <Card className="p-8 bg-gradient-to-r from-[var(--cookie-monster-blue)]/10 to-blue-600/10 border-2 border-[var(--cookie-monster-blue)]/20">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-[var(--cookie-monster-blue)]">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative projects and explore new opportunities. 
                Whether you have a project in mind or just want to connect, I'd love to hear from you.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[var(--cookie-monster-blue)] text-white rounded-full font-semibold hover:bg-[var(--cookie-monster-blue)]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}