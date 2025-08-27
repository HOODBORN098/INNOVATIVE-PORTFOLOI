import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Home, User, Code, GraduationCap, Mail, Eye, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navigationItems = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#services", label: "Services", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Code },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="text-white font-bold text-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                E
              </motion.span>
            </motion.div>
            <motion.span
              className="font-bold text-xl bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Eric Wambua
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${
                      isActive
                        ? "text-[var(--cookie-monster-blue)] bg-[var(--cookie-monster-blue)]/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                    
                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-[var(--cookie-monster-blue)]/10 rounded-full border border-[var(--cookie-monster-blue)]/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--cookie-monster-blue)]/0 via-[var(--cookie-monster-blue)]/10 to-[var(--cookie-monster-blue)]/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50"
          >
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full justify-start text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-[var(--cookie-monster-blue)] bg-[var(--cookie-monster-blue)]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600"
        style={{
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "left"
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
}