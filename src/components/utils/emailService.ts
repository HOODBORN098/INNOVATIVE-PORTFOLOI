// Email service utility for sending form submissions directly to email
export interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  additionalServices: string[];
  preferredContact: string;
  urgency: string;
  serviceName: string;
  servicePrice: string;
  serviceFeatures: string[];
}

/**
 * Send email using mailto protocol (opens user's email client)
 */
export const sendEmailViaMailto = (formData: EmailFormData) => {
  const emailBody = `
New Service Booking Request

Service Details:
- Service: ${formData.serviceName}
- Price Range: ${formData.servicePrice}

Client Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company || 'Not provided'}

Project Details:
- Budget: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Priority: ${formData.urgency || 'Normal'}
- Preferred Contact: ${formData.preferredContact || 'Email'}

Project Description:
${formData.description}

Additional Services:
${formData.additionalServices.length > 0 ? formData.additionalServices.join(', ') : 'None selected'}

Service Features Included:
${formData.serviceFeatures.join(', ')}

---
This email was sent from your portfolio website booking form.
Portfolio: https://ericwambua.netlify.app
  `.trim();

  const subject = `New Service Inquiry - ${formData.serviceName} from ${formData.name}`;
  const mailtoUrl = `mailto:ericwambua098@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Open email client
  window.location.href = mailtoUrl;
  return true;
};

/**
 * Send email using EmailJS service (requires setup)
 * This is a backup method that can be configured with EmailJS
 */
export const sendEmailViaEmailJS = async (formData: EmailFormData) => {
  try {
    // This would require EmailJS setup and configuration
    // For now, we'll use the mailto method as primary
    const emailData = {
      to_email: 'ericwambua098@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      subject: `New Service Inquiry - ${formData.serviceName}`,
      message: `
Client: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not provided'}
Service: ${formData.serviceName}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}
Description: ${formData.description}
Additional Services: ${formData.additionalServices.join(', ')}
      `
    };

    // EmailJS implementation would go here
    // For now, fallback to mailto
    return sendEmailViaMailto(formData);
    
  } catch (error) {
    console.error('EmailJS failed, falling back to mailto:', error);
    return sendEmailViaMailto(formData);
  }
};

/**
 * Create a copy-pasteable email template for manual sending
 */
export const generateEmailTemplate = (formData: EmailFormData): string => {
  return `
To: ericwambua098@gmail.com
Subject: New Service Inquiry - ${formData.serviceName} from ${formData.name}

Body:
New Service Booking Request

Service Details:
- Service: ${formData.serviceName}
- Price Range: ${formData.servicePrice}

Client Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company || 'Not provided'}

Project Details:
- Budget: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Priority: ${formData.urgency || 'Normal'}
- Preferred Contact: ${formData.preferredContact || 'Email'}

Project Description:
${formData.description}

Additional Services:
${formData.additionalServices.length > 0 ? formData.additionalServices.join(', ') : 'None selected'}

Service Features Included:
${formData.serviceFeatures.join(', ')}
  `.trim();
};

/**
 * Create WhatsApp message template
 */
export const generateWhatsAppMessage = (formData: EmailFormData): string => {
  return `New Service Inquiry - ${formData.serviceName}

Client: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}

Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Flexible'}
Priority: ${formData.urgency || 'Normal'}

Description: ${formData.description}

${formData.additionalServices.length > 0 ? `Additional Services: ${formData.additionalServices.join(', ')}` : ''}

Preferred contact: ${formData.preferredContact}`;
};

/**
 * Send form submission via multiple channels for reliability
 */
export const sendFormSubmission = async (formData: EmailFormData) => {
  try {
    // Primary method: mailto
    sendEmailViaMailto(formData);
    
    // Backup method: WhatsApp
    const whatsappMessage = generateWhatsAppMessage(formData);
    const whatsappUrl = `https://wa.me/254112394362?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp as backup after a delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 3000);
    
    return {
      success: true,
      method: 'email',
      message: 'Email client opened successfully'
    };
    
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Fallback to WhatsApp only
    const whatsappMessage = generateWhatsAppMessage(formData);
    const whatsappUrl = `https://wa.me/254112394362?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    return {
      success: false,
      method: 'whatsapp',
      message: 'Email failed, opened WhatsApp instead'
    };
  }
};