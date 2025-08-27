import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye } from "./Eye";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Eric's AI assistant. Ask me anything about his skills, projects, or education!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('skill') || message.includes('programming') || message.includes('language')) {
      return "Eric is proficient in Python, Java, JavaScript/TypeScript, C++, and web technologies like React, Node.js, and Tailwind CSS. He's also experienced with databases like MySQL and PostgreSQL, and tools like Git and VS Code.";
    }
    
    if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return "Eric has worked on several interesting projects including an Interactive Portfolio Website, Student Management System, Algorithm Visualizer, Campus Event Tracker, Library Book Recommendation Engine, and a Network Security Scanner. Each project showcases different aspects of his programming skills!";
    }
    
    if (message.includes('education') || message.includes('university') || message.includes('egerton') || message.includes('degree')) {
      return "Eric is currently pursuing a Bachelor of Science in Computer Science at Egerton University (2022-2026). He maintains a 3.7/4.0 GPA and focuses on Software Development, Web & Mobile Development, Data Science & Machine Learning, and Cybersecurity.";
    }
    
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
      return "You can contact Eric at ericwambua098@gmail.com or call him at 0112394362. He's also available on WhatsApp and you can find his GitHub and LinkedIn profiles in the contact section!";
    }
    
    if (message.includes('experience') || message.includes('internship') || message.includes('job')) {
      return "Eric is actively seeking internship opportunities in software development, open source collaborations, and mentorship opportunities. He's passionate about learning and contributing to meaningful projects!";
    }
    
    if (message.includes('location') || message.includes('where') || message.includes('kenya')) {
      return "Eric is based in Njoro, Kenya, where he studies at Egerton University. He's open to both local and remote opportunities!";
    }
    
    if (message.includes('hobby') || message.includes('interest') || message.includes('fun')) {
      return "When Eric isn't coding, he enjoys exploring the latest tech trends, contributing to open-source projects, and working on personal programming challenges. He's also passionate about creative programming - like those interactive eyes you see throughout his portfolio!";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! It's great to meet you! I'm here to help you learn more about Eric Wambua and his work in computer science. What would you like to know?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Feel free to ask me anything else about Eric's background, projects, or skills. I'm here to help!";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! Eric is passionate about computer science and always eager to discuss technology. You might want to reach out to him directly for more detailed information.",
      "I'd love to help you with that! Eric has extensive experience in various programming languages and technologies. What specific area interests you most?",
      "Great question! Eric is always working on new projects and learning new technologies. Feel free to ask about his skills, education, or projects!",
      "Eric would be happy to discuss that with you! You can contact him directly through the contact form or via email at ericwambua098@gmail.com."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]">
          <Card className="bg-white border-[var(--cookie-monster-blue)]/20 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-[var(--cookie-monster-blue)] text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <Eye className="!size-6" isRightEye={false} />
                  <Eye className="!size-6" isRightEye={true} />
                </div>
                <div>
                  <h3 className="font-bold">Eric's AI Assistant</h3>
                  <p className="text-xs text-white/80">Ask me about Eric's work!</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-[var(--cookie-monster-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[var(--cookie-monster-blue)] text-white ml-auto'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-[var(--cookie-monster-blue)] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Eric's skills, projects, education..."
                  className="flex-1 border-[var(--cookie-monster-blue)]/20 focus:border-[var(--cookie-monster-blue)]"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}