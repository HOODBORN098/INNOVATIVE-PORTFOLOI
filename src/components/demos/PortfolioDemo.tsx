import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Eye } from "../Eye";
import { Moon, Sun, Menu, X } from "lucide-react";

export function PortfolioDemo() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  const sections = ["Home", "About", "Projects", "Contact"];

  return (
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 rounded-lg overflow-hidden border">
      <div className={`h-full transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <div className="flex gap-1">
                <Eye className="!size-6" isRightEye={false} />
                <Eye className="!size-6" isRightEye={true} />
              </div>
            </div>
            <span className="font-bold text-blue-600">Eric Wambua</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section.toLowerCase())}
                className={`text-sm font-medium transition-colors ${
                  currentSection === section.toLowerCase()
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsDark(!isDark)}
              className="w-8 h-8 p-0"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="md:hidden w-8 h-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-b p-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setCurrentSection(section.toLowerCase());
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                {section}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 h-[calc(100%-80px)] overflow-auto">
          {currentSection === "home" && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Eye className="!size-12" isRightEye={false} />
                    <Eye className="!size-12" isRightEye={true} />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Eric Wambua
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Computer Science Student & Full Stack Developer
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["React", "TypeScript", "Node.js", "Python"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="justify-center py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View My Work
              </Button>
            </div>
          )}

          {currentSection === "about" && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a passionate computer science student at Egerton University with a focus on 
                web development, machine learning, and cybersecurity. I love creating 
                interactive experiences that combine functionality with creativity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Computer Science</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Egerton University</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interests</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Web Development</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Machine Learning</p>
                </div>
              </div>
            </Card>
          )}

          {currentSection === "projects" && (
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6">Featured Projects</h2>
              <div className="grid gap-4">
                {[
                  { title: "Algorithm Visualizer", tech: "JavaScript, Canvas" },
                  { title: "Student Management", tech: "React, Node.js" },
                  { title: "Book Recommender", tech: "Python, ML" }
                ].map((project, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{project.tech}</p>
                      </div>
                      <Badge variant="outline">View</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentSection === "contact" && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Get In Touch</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Your message..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}