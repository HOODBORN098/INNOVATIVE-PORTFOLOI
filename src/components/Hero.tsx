import { Button } from "./ui/button";
import { ArrowDown, Download, ExternalLink, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "./utils/useScrollAnimation";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/eric-wambua-cv.pdf';
    link.download = 'Eric-Wambua-CV.pdf';
    link.click();
  };

  const handleConnect = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      ref={elementRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: 0 
            }}
            animate={{ 
              y: -100,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}

        {/* Dynamic Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--cookie-monster-blue) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}
          animate={{
            backgroundPosition: `${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px`
          }}
          transition={{ type: "spring", damping: 30 }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Main Heading with Staggered Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <span className="text-lg font-medium text-muted-foreground">Welcome to my portfolio</span>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              <Zap className="w-8 h-8 text-blue-500" />
            </motion.div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <motion.span
              className="inline-block animate-text-gradient"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Eric
            </motion.span>
            <motion.span
              className="inline-block ml-4 text-foreground"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Wambua
            </motion.span>
          </h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4">
            Computer Science Student & 
            <motion.span
              className="inline-block ml-2 text-[var(--cookie-monster-blue)]"
              animate={{ 
                scale: [1, 1.05, 1],
                color: ["var(--cookie-monster-blue)", "#4A9EFF", "var(--cookie-monster-blue)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Full-Stack Developer
            </motion.span>
          </h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Passionate about creating innovative digital solutions that make a difference. 
            Specializing in modern web technologies, AI integration, and user-centered design.
          </motion.p>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={handleConnect}
              className="animate-button-hover animate-glow bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Let's Connect
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              onClick={downloadCV}
              className="animate-button-hover px-8 py-6 text-lg font-semibold rounded-full border-2 border-[var(--cookie-monster-blue)] text-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)] hover:text-white shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            { number: "7+", label: "Projects Completed", delay: 0 },
            { number: "3+", label: "Years Experience", delay: 0.2 },
            { number: "100%", label: "Dedication", delay: 0.4 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: 1.8 + stat.delay }}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-card-hover"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[var(--cookie-monster-blue)] mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 + index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={scrollToAbout}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm text-muted-foreground mb-2 font-medium">Discover more</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <ArrowDown className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full opacity-20 animate-float"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ animationDelay: "1s" }}
      />
    </motion.section>
  );
}