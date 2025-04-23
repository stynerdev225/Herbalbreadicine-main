import React, { useState } from 'react';
import { Send, Phone, MapPin, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;

// Only initialize SendGrid if we have a valid API key
if (apiKey && apiKey.startsWith('SG.')) {
  sgMail.setApiKey(apiKey);
} else {
  console.warn('Valid SendGrid API key not found. Contact form will not send emails.');
}

export const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      if (!apiKey || !apiKey.startsWith('SG.')) {
        throw new Error('SendGrid API key is not properly configured');
      }

      const msg = {
        to: 'catering@herbalbreadicine.com',
        from: 'noreply@herbalbreadicine.com',
        replyTo: formData.email,
        subject: `New Contact Form Message from ${formData.name}`,
        text: `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `
      };

      await sgMail.send(msg);
      setFormData({ name: '', email: '', message: '' });
      navigate('/thank-you');
    } catch (error: any) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact us directly at catering@herbalbreadicine.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-black text-white mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            CONTACT OUR MAGICAL KITCHEN
          </h2>
          <p className="text-gray-300 text-2xl font-medium">
            Let's create something magical together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src="/images/contactpage.png" // Replace with the actual path to your image.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80"
                alt="Our Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                    <Mail className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-gray-100">catering@herbalbreadicine.com</span>
                </div>
                <div className="flex items-center space-x-4 -mt-2">
                  <div className="bg-yellow-400/10 p-3 rounded-full backdrop-blur-sm">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-gray-100">Canticle Farm Oakland CA 94601</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-sm border-2 border-white p-8 rounded-lg space-y-6 shadow-lg"
          >
            <div>
              <label htmlFor="name" className="block text-yellow-400 mb-2 text-xl font-bold">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-black/40 text-white rounded-lg border-2 border-white focus:ring-2 focus:ring-white focus:outline-none focus:border-white placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-yellow-400 mb-2 text-xl font-bold">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-black/40 text-white rounded-lg border-2 border-white focus:ring-2 focus:ring-white focus:outline-none focus:border-white placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-yellow-400 mb-2 text-xl font-bold">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={4}
                className="w-full px-4 py-3 bg-black/40 text-white rounded-lg border-2 border-white focus:ring-2 focus:ring-white focus:outline-none focus:border-white placeholder-gray-500"
                required
              ></textarea>
            </div>
            {status.message && (
              <div className={`p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {status.message}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
