import { Eye } from "./Eye";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Code, Database, Globe, Cpu, Smartphone, GitBranch } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 85 },
        { name: "JavaScript/TypeScript", level: 80 },
        { name: "C++", level: 75 },
        { name: "HTML/CSS", level: 85 },
      ]
    },
    {
      title: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: "React", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "Tailwind CSS", level: 85 },
        { name: "REST APIs", level: 70 },
        { name: "Responsive Design", level: 80 },
      ]
    },
    {
      title: "Database & Backend",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MySQL", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 65 },
        { name: "Express.js", level: 70 },
        { name: "Firebase", level: 60 },
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        { name: "Git/GitHub", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "Linux", level: 70 },
        { name: "Docker", level: 60 },
        { name: "AWS Basics", level: 55 },
      ]
    }
  ];

  const additionalSkills = [
    "Object-Oriented Programming",
    "Data Structures & Algorithms",
    "Software Engineering",
    "Database Design",
    "UI/UX Principles",
    "Agile Methodology",
    "Problem Solving",
    "Team Collaboration",
    "Technical Documentation",
    "Code Review",
    "Testing & Debugging",
    "Version Control"
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--cookie-monster-blue)] mb-6">
              Technical Skills
            </h2>
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                <Eye className="!size-16" isRightEye={false} />
                <Eye className="!size-16" isRightEye={true} />
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's a comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-[var(--cookie-monster-blue)]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-[var(--cookie-monster-blue)]">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)]">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-[var(--cream-background)] border-[var(--cookie-monster-blue)]/20">
            <h3 className="text-2xl font-bold text-[var(--cookie-monster-blue)] mb-6 text-center">
              Additional Competencies
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {additionalSkills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-[var(--cookie-monster-blue)] text-white hover:bg-[var(--cookie-monster-blue)]/90 text-sm py-2 px-4"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}