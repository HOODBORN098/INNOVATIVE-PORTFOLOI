// Utility function for downloading CV
export const downloadCV = () => {
  // Create a comprehensive CV content
  const cvContent = `
ERIC WAMBUA
Computer Science Student & Full Stack Developer
Phone: 0112394362 | Email: ericwambua098@gmail.com
Location: Nairobi, Kenya | LinkedIn: /in/ericwambua | GitHub: /ericwambua

PROFESSIONAL SUMMARY
Passionate computer science student at Egerton University with expertise in full-stack development, 
specializing in React, TypeScript, and Node.js. Proven track record of building innovative web 
applications with a focus on user experience and modern development practices.

TECHNICAL SKILLS
Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Motion/Framer Motion
Backend: Node.js, Express.js, Python, FastAPI, RESTful APIs
Databases: MongoDB, PostgreSQL, SQLite, Firebase
DevOps: Docker, AWS, Vercel, GitHub Actions, Nginx
Tools: Git, Figma, VS Code, Postman, Jest

EDUCATION
Bachelor of Science in Computer Science
Egerton University | 2021 - 2025
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, 
Network Security, Machine Learning

PROJECTS
Interactive Portfolio Website (2024)
• Built responsive portfolio with cursor-following animations using React & TypeScript
• Implemented dark/light mode theming and smooth scroll navigation
• Optimized for performance across all devices with lazy loading

Student Management System (2024)
• Developed full-stack application with role-based authentication using JWT
• Created comprehensive dashboard for managing student records and grades
• Integrated real-time notifications and PDF report generation

Algorithm Visualizer (2024)
• Built educational tool for visualizing sorting and pathfinding algorithms
• Implemented real-time animations using HTML5 Canvas and D3.js
• Added performance metrics and complexity analysis features

Campus Event Tracker (2024)
• Mobile-first PWA for discovering and managing campus events with real-time notifications
• Implemented offline functionality with service workers and location-based recommendations
• Built social features for connecting with other attendees

Book Recommendation Engine (2024)
• AI-powered system using machine learning algorithms for personalized book recommendations
• Integrated collaborative and content-based filtering techniques
• Developed for university library with academic field-specific recommendations

Network Security Scanner (2024)
• Comprehensive network security assessment tool for educational purposes
• Multi-threaded port scanning with service detection and vulnerability assessment
• Automated report generation with risk scoring and CVE database integration

EXPERIENCE
Frontend Developer Intern | TechCorp Kenya | Jun 2023 - Aug 2023
• Developed responsive web applications using React and TypeScript
• Collaborated with design team to implement user interfaces
• Improved application performance by 25% through optimization techniques

Freelance Web Developer | Self-Employed | Jan 2023 - Present
• Built custom websites for local businesses using modern frameworks
• Managed full project lifecycle from requirements to deployment
• Maintained 100% client satisfaction rate across 15+ projects

ACHIEVEMENTS
• Dean's List - Egerton University (2022, 2023)
• Winner - University Hackathon 2023
• Contributing member - Open Source projects on GitHub
• Technical mentor for junior students
• React Developer Certification (2024)
• AWS Cloud Practitioner (2023)
• MongoDB Developer Certification (2023)

LANGUAGES
English (Fluent), Swahili (Native)

INTERESTS
Open Source Development, Machine Learning, Cybersecurity Research, 
Mobile App Development, Tech Community Building
`;

  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Eric_Wambua_CV.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};