import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { ThemeProvider } from "./components/ThemeProvider";
import { useState, useEffect } from "react";
import { DemoShowcase } from "./components/DemoShowcase";
import { FloatingEyes } from "./components/FloatingEyes";
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Code } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'demos'>('portfolio');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleViewChange = (view: 'portfolio' | 'demos') => {
    setCurrentView(view);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          {/* Loading Animation */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 border-4 border-blue-200 rounded-full"></div>
            <div className="w-24 h-24 border-4 border-[var(--cookie-monster-blue)] border-t-transparent rounded-full absolute top-0 left-0"></div>
          </motion.div>

          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 bg-clip-text text-transparent">
                Eric Wambua
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                <Code className="w-8 h-8 text-blue-500" />
              </motion.div>
            </div>
            <p className="text-muted-foreground">Loading portfolio...</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.round(loadingProgress)}%
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20"
      >
        {/* Floating Eyes only on portfolio view */}
        <AnimatePresence>
          {currentView === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FloatingEyes />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative z-10">
          {/* Enhanced View Toggle */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed top-4 right-4 z-50"
          >
            <motion.div
              className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant={currentView === 'portfolio' ? 'default' : 'outline'}
                  onClick={() => handleViewChange('portfolio')}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    currentView === 'portfolio' 
                      ? 'bg-[var(--cookie-monster-blue)] text-white shadow-lg' 
                      : 'hover:bg-[var(--cookie-monster-blue)]/10'
                  }`}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Portfolio
                  </motion.span>
                  {currentView === 'portfolio' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600"
                      layoutId="activeViewBg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant={currentView === 'demos' ? 'default' : 'outline'}
                  onClick={() => handleViewChange('demos')}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    currentView === 'demos' 
                      ? 'bg-[var(--cookie-monster-blue)] text-white shadow-lg' 
                      : 'hover:bg-[var(--cookie-monster-blue)]/10'
                  }`}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <Code className="w-4 h-4" />
                    Live Demos
                  </motion.span>
                  {currentView === 'demos' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600"
                      layoutId="activeViewBg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Content with Page Transitions */}
          <AnimatePresence mode="wait">
            {currentView === 'portfolio' ? (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Navigation />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Hero />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <About />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Skills />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Services />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <Projects />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Education />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <Contact />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <Footer />
                </motion.div>
                <Chatbot />
              </motion.div>
            ) : (
              <motion.div
                key="demos"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="min-h-screen"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <DemoShowcase />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[var(--cookie-monster-blue)]/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Dynamic Background Gradient */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(600px circle at 50% 50%, rgba(0, 98, 173, 0.05), transparent)",
              "radial-gradient(600px circle at 80% 20%, rgba(74, 158, 255, 0.05), transparent)",
              "radial-gradient(600px circle at 20% 80%, rgba(0, 98, 173, 0.05), transparent)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </ThemeProvider>
  );
}