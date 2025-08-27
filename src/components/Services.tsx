import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Code, 
  Smartphone, 
  Camera, 
  Video, 
  Palette, 
  Globe, 
  Zap, 
  Star, 
  Check, 
  Sparkles,
  Monitor,
  ShoppingCart,
  Database,
  Users,
  Play,
  Image,
  Layers,
  Rocket
} from "lucide-react";
import { useState } from "react";
import { ReactNativeShowcase } from "./ReactNativeShowcase";
import { ServiceBookingForm } from "./ServiceBookingForm";

const websitePackages = [
  {
    name: "Basic",
    price: "KES 15,000",
    duration: "1-2 weeks",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    features: [
      "Responsive Design (Mobile & Desktop)",
      "Up to 5 Pages",
      "Contact Form Integration",
      "Basic SEO Optimization",
      "Professional Typography",
      "Image Optimization",
      "Cross-browser Compatibility",
      "1 Month Free Support"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    bestFor: "Small businesses, personal portfolios, landing pages"
  },
  {
    name: "Premium",
    price: "KES 35,000",
    duration: "2-3 weeks",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    popular: true,
    features: [
      "Everything in Basic",
      "Up to 10 Pages",
      "Interactive UI Components",
      "Advanced Animations",
      "Content Management System",
      "E-commerce Integration",
      "Advanced SEO & Analytics",
      "Social Media Integration",
      "3 Months Free Support",
      "Performance Optimization"
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
    bestFor: "Growing businesses, e-commerce stores, professional services"
  },
  {
    name: "Enterprise",
    price: "KES 75,000+",
    duration: "4-6 weeks",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-amber-500 to-amber-600",
    features: [
      "Everything in Premium",
      "Unlimited Pages",
      "Custom Web Applications",
      "Database Integration",
      "User Authentication",
      "Admin Dashboard",
      "API Development",
      "Third-party Integrations",
      "Advanced Security Features",
      "6 Months Free Support",
      "Dedicated Project Manager"
    ],
    technologies: ["Full-Stack Development", "Node.js", "MongoDB", "PostgreSQL"],
    bestFor: "Large enterprises, complex web applications, SaaS platforms"
  }
];

const otherServices = [
  {
    category: "Videography & Film Production",
    icon: <Video className="w-8 h-8" />,
    color: "from-red-500 to-pink-600",
    services: [
      {
        name: "Corporate Video Production",
        price: "KES 25,000 - 100,000",
        description: "Professional corporate videos that tell your brand story",
        priceBreakdown: "Basic corporate video (25,000) | Full production with graphics (60,000) | Premium with drone & extras (100,000)",
        features: ["4K Recording", "Professional Editing", "Color Grading", "Motion Graphics", "Drone Footage", "Script Writing"]
      },
      {
        name: "Wedding & Event Videography",
        price: "KES 20,000 - 80,000",
        description: "Cinematic coverage of your special moments",
        priceBreakdown: "Basic ceremony coverage (20,000) | Full day with highlights (50,000) | Premium cinematic package (80,000)",
        features: ["Multi-camera Setup", "Live Streaming", "Highlight Reels", "Same-day Delivery", "Raw Footage", "Music Licensing"]
      },
      {
        name: "Commercial & Promotional Videos",
        price: "KES 15,000 - 60,000",
        description: "Engaging promotional content for marketing",
        priceBreakdown: "Simple promo video (15,000) | Professional commercial (35,000) | Full campaign package (60,000)",
        features: ["Studio Setup", "Professional Lighting", "Brand Integration", "Social Media Versions", "Testimonial Videos", "Product Demos"]
      },
      {
        name: "Documentary & Short Films",
        price: "KES 30,000 - 150,000",
        description: "Compelling storytelling through film",
        priceBreakdown: "Short documentary (30,000) | Medium-length film (80,000) | Feature-length production (150,000)",
        features: ["Research & Planning", "Interview Setup", "B-roll Footage", "Professional Audio", "Post-production", "Festival Submission"]
      }
    ]
  },
  {
    category: "Photography & Visual Arts",
    icon: <Camera className="w-8 h-8" />,
    color: "from-indigo-500 to-blue-600",
    services: [
      {
        name: "Portrait & Headshot Photography",
        price: "KES 1,500 - 3,000",
        description: "Professional portraits that capture personality",
        priceBreakdown: "Basic session (1,500) | Premium with retouching (2,500) | Full package with prints (3,000)",
        features: ["Studio & Outdoor Sessions", "Professional Retouching", "Multiple Outfits", "High-res Delivery", "LinkedIn Optimization", "Personal Branding"]
      },
      {
        name: "Wedding & Event Photography",
        price: "KES 15,000 - 60,000",
        description: "Timeless memories captured with artistic flair",
        priceBreakdown: "Half-day coverage (15,000) | Full-day event (35,000) | Premium with album (60,000)",
        features: ["Candid & Posed Shots", "Fast Turnaround", "Online Gallery", "Print-ready Files", "Engagement Sessions", "Photo Albums"]
      },
      {
        name: "Commercial & Product Photography",
        price: "KES 8,000 - 40,000",
        description: "Professional imagery for business and e-commerce",
        priceBreakdown: "Basic product shots (8,000) | E-commerce package (20,000) | Full brand shoot (40,000)",
        features: ["White Background", "Multiple Angles", "Lifestyle Shots", "E-commerce Ready", "Brand Photography", "Advertising Images"]
      },
      {
        name: "Architecture & Real Estate",
        price: "KES 12,000 - 50,000",
        description: "Stunning property and architectural photography",
        priceBreakdown: "Basic property (12,000) | Premium with drone (30,000) | Full marketing package (50,000)",
        features: ["HDR Photography", "Drone Aerials", "Virtual Tours", "Twilight Shots", "Interior Design", "Property Marketing"]
      }
    ]
  },
  {
    category: "Creative Design & Branding",
    icon: <Palette className="w-8 h-8" />,
    color: "from-teal-500 to-cyan-600",
    services: [
      {
        name: "Brand Identity & Logo Design",
        price: "KES 2,000 - 4,000",
        description: "Complete brand identity that sets you apart",
        priceBreakdown: "Logo only (2,000) | Logo + business cards (3,000) | Full brand package (4,000)",
        features: ["Logo Design", "Brand Guidelines", "Business Cards", "Social Media Kit", "Brand Strategy", "Color Palette"]
      },
      {
        name: "UI/UX Design",
        price: "KES 15,000 - 25,000",
        description: "User-centered design for digital products",
        priceBreakdown: "Basic mockups (15,000) | Interactive prototypes (20,000) | Full design system (25,000)",
        features: ["User Research", "Wireframing", "Prototyping", "User Testing", "Design Systems", "Accessibility"]
      },
      {
        name: "Graphic Design & Marketing Materials",
        price: "KES 1,000 - 2,000",
        description: "Eye-catching designs for all your marketing needs",
        priceBreakdown: "Single design (1,000) | Package of 5 designs (1,500) | Complete marketing suite (2,000)",
        features: ["Flyers & Brochures", "Social Media Graphics", "Poster Design", "Infographics", "Packaging Design", "Print Design"]
      }
    ]
  }
];

export function Services() {
  const [activePackage, setActivePackage] = useState(1);
  const [bookingForm, setBookingForm] = useState<{
    isOpen: boolean;
    serviceType?: any;
    serviceName?: string;
    servicePrice?: string;
  }>({
    isOpen: false
  });

  const openBookingForm = (serviceType: any, serviceName?: string, servicePrice?: string) => {
    setBookingForm({
      isOpen: true,
      serviceType,
      serviceName,
      servicePrice
    });
  };

  const closeBookingForm = () => {
    setBookingForm({ isOpen: false });
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10" />
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--cookie-monster-blue)]/5 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--cookie-monster-blue)]/10 px-6 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[var(--cookie-monster-blue)]" />
            <span className="text-[var(--cookie-monster-blue)] font-medium">Services & Packages</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 animate-text-gradient"
          >
            Transform Your Vision Into Reality
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From stunning websites to captivating visuals, I offer comprehensive digital solutions 
            tailored to elevate your brand and engage your audience.
          </motion.p>
        </motion.div>

        {/* Services Tabs */}
        <Tabs defaultValue="websites" className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 max-w-3xl mx-auto h-auto p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20">
              <TabsTrigger 
                value="websites" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-[var(--cookie-monster-blue)] data-[state=active]:text-white transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                Websites
              </TabsTrigger>
              <TabsTrigger 
                value="mobile" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-[var(--cookie-monster-blue)] data-[state=active]:text-white transition-all duration-300"
              >
                <Smartphone className="w-4 h-4" />
                Mobile Apps
              </TabsTrigger>
              <TabsTrigger 
                value="other" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-[var(--cookie-monster-blue)] data-[state=active]:text-white transition-all duration-300"
              >
                <Layers className="w-4 h-4" />
                Media Services
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Website Packages */}
          <TabsContent value="websites" className="space-y-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {websitePackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setActivePackage(index)}
                  className="relative"
                >
                  <Card className={`h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 ${
                    pkg.popular 
                      ? 'border-[var(--cookie-monster-blue)] shadow-xl shadow-[var(--cookie-monster-blue)]/20 scale-105' 
                      : activePackage === index 
                        ? 'border-[var(--cookie-monster-blue)]/50 shadow-lg' 
                        : 'hover:border-[var(--cookie-monster-blue)]/30'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[var(--cookie-monster-blue)] text-white px-6 py-1 text-sm font-medium">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8">
                      <motion.div
                        className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${pkg.color} p-4 mb-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-white">
                          {pkg.icon}
                        </div>
                      </motion.div>
                      
                      <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-[var(--cookie-monster-blue)]">{pkg.price}</p>
                        <p className="text-sm text-muted-foreground">Delivery: {pkg.duration}</p>
                      </div>
                      <CardDescription className="text-base">{pkg.bestFor}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3"
                          >
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="font-medium mb-2">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${pkg.color} hover:shadow-lg transition-all duration-300 animate-button-hover`}
                        size="lg"
                        onClick={() => openBookingForm(
                          pkg.name === "Basic" ? "website-basic" : 
                          pkg.name === "Premium" ? "website-premium" : "website-enterprise",
                          pkg.name + " Website Package",
                          pkg.price
                        )}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Mobile Development */}
          <TabsContent value="mobile" className="space-y-12">
            <ReactNativeShowcase />
          </TabsContent>

          {/* Other Services */}
          <TabsContent value="other" className="space-y-12">
            <div className="grid gap-12">
              {otherServices.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold">{category.category}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 animate-card-hover group">
                          <CardHeader>
                            <CardTitle className="text-lg group-hover:text-[var(--cookie-monster-blue)] transition-colors">
                              {service.name}
                            </CardTitle>
                            <p className="text-2xl font-bold text-[var(--cookie-monster-blue)]">
                              {service.price}
                            </p>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {service.priceBreakdown && (
                              <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                                <strong>Pricing:</strong> {service.priceBreakdown}
                              </div>
                            )}
                            
                            <Button 
                              className="w-full mt-4 animate-button-hover"
                              variant="outline"
                              onClick={() => openBookingForm(
                                category.category.includes("Photography") ? "photography" : 
                                category.category.includes("Design") ? "design" : "videography",
                                service.name,
                                service.price
                              )}
                            >
                              Book Now
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-[var(--cookie-monster-blue)] to-blue-600 text-white border-none shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Zap className="w-12 h-12 mx-auto mb-4" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-lg mb-6 opacity-90">
                Let's discuss your vision and create something extraordinary together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="animate-button-hover"
                  onClick={() => openBookingForm("consultation", "Free Consultation", "Free")}
                >
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[var(--cookie-monster-blue)] animate-button-hover"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Service Booking Form */}
      <ServiceBookingForm
        isOpen={bookingForm.isOpen}
        onClose={closeBookingForm}
        serviceType={bookingForm.serviceType}
        serviceName={bookingForm.serviceName}
        servicePrice={bookingForm.servicePrice}
      />
    </section>
  );
}