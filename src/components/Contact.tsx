import { Eye } from "./Eye";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Linkedin, Github, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Create email content
    const emailBody = `
New Contact Form Submission

From: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject || 'General Inquiry'}

Message:
${formData.message}

---
This message was sent from your portfolio website contact form.
    `.trim();

    const subject = `Portfolio Contact: ${formData.subject || 'General Inquiry'} from ${formData.firstName}`;
    const mailtoUrl = `mailto:ericwambua098@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoUrl;
    
    // Show success message
    toast.success("Email opened! Please send the email to complete your message.");
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "254112394362"; // Kenya country code + your number without leading 0
    const message = "Hi Eric! I found your portfolio and would like to connect.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[var(--cookie-monster-blue)]/10 via-background to-[var(--cookie-monster-blue)]/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--cookie-monster-blue)] mb-6">
              Let's Connect
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-card border border-border p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex gap-1">
                  <Eye className="!size-16" isRightEye={false} />
                  <Eye className="!size-16" isRightEye={true} />
                </div>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm always excited to discuss new opportunities, collaborate on projects, 
              or just have a conversation about technology and innovation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="p-6 bg-card/90 backdrop-blur-sm border-border text-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-6 text-[var(--cookie-monster-blue)]">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group hover:bg-muted/20 p-3 rounded-lg transition-colors">
                    <div className="bg-[var(--cookie-monster-blue)]/20 p-3 rounded-full group-hover:bg-[var(--cookie-monster-blue)]/30 transition-colors">
                      <Mail className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:ericwambua098@gmail.com"
                        className="text-muted-foreground hover:text-[var(--cookie-monster-blue)] transition-colors underline"
                      >
                        ericwambua098@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group hover:bg-muted/20 p-3 rounded-lg transition-colors">
                    <div className="bg-[var(--cookie-monster-blue)]/20 p-3 rounded-full group-hover:bg-[var(--cookie-monster-blue)]/30 transition-colors">
                      <Phone className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+254112394362"
                        className="text-muted-foreground hover:text-[var(--cookie-monster-blue)] transition-colors"
                      >
                        +254 112 394 362
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group hover:bg-muted/20 p-3 rounded-lg transition-colors">
                    <div className="bg-[var(--cookie-monster-blue)]/20 p-3 rounded-full group-hover:bg-green-500/30 transition-colors">
                      <MessageCircle className="w-6 h-6 text-[var(--cookie-monster-blue)] group-hover:text-green-600 transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <button 
                        onClick={handleWhatsApp}
                        className="text-muted-foreground hover:text-green-600 transition-colors underline"
                      >
                        Chat on WhatsApp
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group hover:bg-muted/20 p-3 rounded-lg transition-colors">
                    <div className="bg-[var(--cookie-monster-blue)]/20 p-3 rounded-full group-hover:bg-[var(--cookie-monster-blue)]/30 transition-colors">
                      <MapPin className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Njoro, Kenya</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/90 backdrop-blur-sm border-border text-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-[var(--cookie-monster-blue)]">Follow Me</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-border hover:bg-[var(--cookie-monster-blue)]/10 hover:text-[var(--cookie-monster-blue)] hover:border-[var(--cookie-monster-blue)] transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('https://github.com/ericwambua', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-border hover:bg-[var(--cookie-monster-blue)]/10 hover:text-[var(--cookie-monster-blue)] hover:border-[var(--cookie-monster-blue)] transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('https://linkedin.com/in/ericwambua', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-border hover:bg-green-500/10 hover:text-green-600 hover:border-green-500 transition-all duration-300 hover:scale-105"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/90 backdrop-blur-sm border-border text-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-[var(--cookie-monster-blue)]">What I'm Looking For</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full group-hover:scale-125 transition-transform"></div>
                    Internship opportunities in software development
                  </li>
                  <li className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full group-hover:scale-125 transition-transform"></div>
                    Open source collaboration projects
                  </li>
                  <li className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full group-hover:scale-125 transition-transform"></div>
                    Mentorship in advanced computer science topics
                  </li>
                  <li className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full group-hover:scale-125 transition-transform"></div>
                    Networking with industry professionals
                  </li>
                  <li className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[var(--cookie-monster-blue)] rounded-full group-hover:scale-125 transition-transform"></div>
                    Hackathon team partnerships
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[var(--cookie-monster-blue)] mb-6">
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      First Name
                    </label>
                    <Input 
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="border-border focus:border-[var(--cookie-monster-blue)] bg-background hover:border-[var(--cookie-monster-blue)]/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="border-border focus:border-[var(--cookie-monster-blue)] bg-background hover:border-[var(--cookie-monster-blue)]/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-border focus:border-[var(--cookie-monster-blue)] bg-background hover:border-[var(--cookie-monster-blue)]/50 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Input 
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="border-border focus:border-[var(--cookie-monster-blue)] bg-background hover:border-[var(--cookie-monster-blue)]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-border focus:border-[var(--cookie-monster-blue)] bg-background hover:border-[var(--cookie-monster-blue)]/50 transition-colors resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90 text-white text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 pulse-glow"
                >
                  <Send className="w-5 h-5 mr-3" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground text-lg">
              Thanks for taking the time to visit my portfolio. I look forward to hearing from you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}