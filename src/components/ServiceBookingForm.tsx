import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  DollarSign,
  CheckCircle,
  Sparkles,
  Send,
  X,
  Copy
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { sendFormSubmission, generateEmailTemplate, type EmailFormData } from "./utils/emailService";

type ServiceType = 
  | "website-basic" 
  | "website-premium" 
  | "website-enterprise"
  | "mobile-app"
  | "videography"
  | "photography"
  | "design"
  | "consultation";

interface ServiceBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: ServiceType;
  serviceName?: string;
  servicePrice?: string;
}

const serviceDetails = {
  "website-basic": {
    name: "Basic Website Package",
    price: "KES 15,000",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO"],
    timeline: "1-2 weeks"
  },
  "website-premium": {
    name: "Premium Website Package", 
    price: "KES 35,000",
    features: ["Up to 10 pages", "Interactive components", "CMS", "E-commerce"],
    timeline: "2-3 weeks"
  },
  "website-enterprise": {
    name: "Enterprise Website Package",
    price: "KES 75,000+",
    features: ["Unlimited pages", "Custom applications", "Database integration", "Admin dashboard"],
    timeline: "4-6 weeks"
  },
  "mobile-app": {
    name: "Mobile App Development",
    price: "KES 50,000 - 150,000",
    features: ["Cross-platform", "Native performance", "Push notifications", "Offline support"],
    timeline: "4-8 weeks"
  },
  "videography": {
    name: "Videography Services",
    price: "KES 15,000 - 100,000",
    features: ["4K recording", "Professional editing", "Color grading", "Multiple formats"],
    timeline: "1-3 weeks"
  },
  "photography": {
    name: "Photography Services", 
    price: "KES 1,500 - 60,000",
    features: ["Professional equipment", "High-res images", "Retouching", "Multiple formats"],
    timeline: "1-2 weeks"
  },
  "design": {
    name: "Design Services",
    price: "KES 1,000 - 25,000", 
    features: ["Brand identity", "UI/UX design", "Print materials", "Digital assets"],
    timeline: "1-4 weeks"
  },
  "consultation": {
    name: "Free Consultation",
    price: "Free",
    features: ["Project assessment", "Technology recommendations", "Timeline planning", "Cost estimation"],
    timeline: "30-60 minutes"
  }
};

export function ServiceBookingForm({ isOpen, onClose, serviceType = "consultation", serviceName, servicePrice }: ServiceBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: serviceType,
    budget: "",
    timeline: "",
    description: "",
    additionalServices: [] as string[],
    preferredContact: "email",
    urgency: "normal"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const service = serviceDetails[serviceType] || serviceDetails.consultation;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email data
      const emailData: EmailFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        description: formData.description,
        additionalServices: formData.additionalServices,
        preferredContact: formData.preferredContact,
        urgency: formData.urgency,
        serviceName: service.name,
        servicePrice: service.price,
        serviceFeatures: service.features
      };

      // Send form submission using email service
      const result = await sendFormSubmission(emailData);
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      
      if (result.success) {
        toast.success("Email opened! Please send the email to complete your booking request.");
      } else {
        toast.success("WhatsApp opened! Your inquiry has been prepared for sending.");
      }
      
    } catch (error) {
      toast.error("Failed to process your request. Please try the manual options below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailDirectly = () => {
    const emailData: EmailFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      description: formData.description,
      additionalServices: formData.additionalServices,
      preferredContact: formData.preferredContact,
      urgency: formData.urgency,
      serviceName: service.name,
      servicePrice: service.price,
      serviceFeatures: service.features
    };

    sendFormSubmission(emailData);
  };

  const copyEmailTemplate = () => {
    const emailData: EmailFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      description: formData.description,
      additionalServices: formData.additionalServices,
      preferredContact: formData.preferredContact,
      urgency: formData.urgency,
      serviceName: service.name,
      servicePrice: service.price,
      serviceFeatures: service.features
    };

    const template = generateEmailTemplate(emailData);
    navigator.clipboard.writeText(template).then(() => {
      toast.success("Email template copied to clipboard! You can paste it into any email client.");
    }).catch(() => {
      toast.error("Failed to copy template. Please use the other submission methods.");
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: serviceType,
      budget: "",
      timeline: "",
      description: "",
      additionalServices: [],
      preferredContact: "email",
      urgency: "normal"
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-[var(--cookie-monster-blue)]" />
            {submitted ? "Thank You!" : `Book ${service.name}`}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {submitted 
              ? "Your booking request has been submitted successfully. I'll contact you soon!"
              : "Fill out the form below and I'll get back to you within 24 hours with a detailed proposal."
            }
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8"
            >
              <Card className="text-center border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                    Email Ready to Send!
                  </h3>
                  
                  <p className="text-green-600 dark:text-green-300 mb-6">
                    Your email client should have opened with a pre-filled message. Please send the email to complete your booking request. I'll respond within 24 hours!
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2">Multiple ways to reach me:</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>• Send the pre-filled email that opened</div>
                        <div>• Copy the email template and send manually</div>
                        <div>• Contact me via WhatsApp for instant response</div>
                        <div>• I'll respond within 24 hours with a detailed proposal</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline"
                        onClick={sendEmailDirectly}
                        className="w-full"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Open Email Again
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={copyEmailTemplate}
                        className="w-full"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Email Template
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const whatsappUrl = `https://wa.me/254112394362?text=Hi Eric, I just submitted a booking form for ${service.name}. Can we discuss this further?`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="w-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button 
                        onClick={handleClose}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Service Summary */}
              <Card className="border-[var(--cookie-monster-blue)]/20 bg-[var(--cookie-monster-blue)]/5">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                    <span className="font-medium text-[var(--cookie-monster-blue)]">{service.price}</span>
                    <span>• Timeline: {service.timeline}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+254 xxx xxx xxx"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Project Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under KES 10,000</SelectItem>
                          <SelectItem value="10k-25k">KES 10,000 - 25,000</SelectItem>
                          <SelectItem value="25k-50k">KES 25,000 - 50,000</SelectItem>
                          <SelectItem value="50k-100k">KES 50,000 - 100,000</SelectItem>
                          <SelectItem value="100k-plus">KES 100,000+</SelectItem>
                          <SelectItem value="discuss">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                          <SelectItem value="1-week">Within 1 week</SelectItem>
                          <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-months">Within 2 months</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="contact-method">Preferred Contact Method</Label>
                      <Select onValueChange={(value) => handleInputChange("preferredContact", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How should I contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="video-call">Video Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="urgency">Project Priority</Label>
                      <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How urgent is this project?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Take your time</SelectItem>
                          <SelectItem value="normal">Normal - Standard timeline</SelectItem>
                          <SelectItem value="high">High - Important deadline</SelectItem>
                          <SelectItem value="urgent">Urgent - Critical timeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Please describe your project in detail. Include any specific requirements, features you need, design preferences, target audience, etc."
                  rows={4}
                  required
                />
              </div>

              {/* Additional Services */}
              <div>
                <Label>Additional Services (Optional)</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {[
                    "Logo Design",
                    "SEO Optimization", 
                    "Social Media Setup",
                    "Content Writing",
                    "Photography",
                    "Video Production",
                    "Maintenance Plan",
                    "Training Session"
                  ].map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.additionalServices.includes(service)}
                        onCheckedChange={(checked) => handleServiceToggle(service, !!checked)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.description}
                  className="flex-1 bg-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/90"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}