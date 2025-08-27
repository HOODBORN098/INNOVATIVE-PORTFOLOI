import { Eye } from "./Eye";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

export function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Computer Networks",
    "Software Engineering",
    "Operating Systems",
    "Web Development",
    "Machine Learning Fundamentals",
    "Cybersecurity Principles",
    "Human-Computer Interaction",
    "Systems Analysis & Design",
    "Computer Graphics"
  ];

  const achievements = [
    {
      title: "Dean's List Recognition",
      description: "Maintained high academic performance with consistent excellence in coursework",
      year: "2023-2024"
    },
    {
      title: "Programming Competition Participant",
      description: "Participated in regional coding competitions, developing problem-solving skills",
      year: "2023"
    },
    {
      title: "Computer Science Society Member",
      description: "Active member contributing to tech workshops and student mentoring programs",
      year: "2022-Present"
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--cookie-monster-blue)] mb-6">
              Education & Academic Journey
            </h2>
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                <Eye className="!size-16" isRightEye={false} />
                <Eye className="!size-16" isRightEye={true} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <Card className="p-8 border-[var(--cookie-monster-blue)]/20 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[var(--cookie-monster-blue)] p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--cookie-monster-blue)]">
                      Bachelor of Science in Computer Science
                    </h3>
                    <p className="text-lg text-gray-600">Egerton University</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-[var(--cookie-monster-blue)]" />
                    <span>2022 - 2026 (Expected)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-[var(--cookie-monster-blue)]" />
                    <span>Njoro, Kenya</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Award className="w-5 h-5 text-[var(--cookie-monster-blue)]" />
                    <span>Current GPA: 3.7/4.0</span>
                  </div>
                </div>

                <div className="bg-[var(--cream-background)] p-4 rounded-lg">
                  <h4 className="font-bold text-[var(--cookie-monster-blue)] mb-2">Focus Areas</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Software Development & Engineering</li>
                    <li>• Web & Mobile Application Development</li>
                    <li>• Data Science & Machine Learning</li>
                    <li>• Cybersecurity & Network Administration</li>
                  </ul>
                </div>
              </Card>
            </div>

            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU1OTQ1NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="University Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 border-[var(--cookie-monster-blue)]/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
                <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)]">
                  Relevant Coursework
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {coursework.map((course, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="justify-start border-[var(--cookie-monster-blue)]/30 text-[var(--cookie-monster-blue)] py-2"
                  >
                    {course}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[var(--cookie-monster-blue)] flex items-center gap-3">
                <Award className="w-6 h-6" />
                Academic Achievements
              </h3>
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 border-l-4 border-l-[var(--cookie-monster-blue)] border-[var(--cookie-monster-blue)]/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[var(--cookie-monster-blue)]">
                      {achievement.title}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.year}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-[var(--cookie-monster-blue)] text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Why Egerton University?</h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              Egerton University's Computer Science program provides a comprehensive foundation in 
              both theoretical concepts and practical applications. The program emphasizes hands-on 
              learning, industry collaboration, and research opportunities that prepare students for 
              successful careers in technology. The supportive academic environment and modern 
              facilities create the perfect setting for innovation and growth.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}