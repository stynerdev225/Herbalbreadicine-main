import React, { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 text-gray-300">
            <p className="text-yellow-400 font-semibold mb-2">Last Updated: March 15, 2024</p>
            <p className="mb-4">
              Welcome to Herbalbreadicine. We are committed to protecting your privacy and providing you with a secure experience.
            </p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Information We Collect</h2>
              <div className="text-gray-300 space-y-3">
                <p>We collect several types of information from our website users:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email, phone) when you make inquiries or bookings</li>
                  <li>Dietary preferences and restrictions for catering services</li>
                  <li>Event details for catering bookings</li>
                  <li>Usage data such as pages visited and time spent on our website</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-300 space-y-3">
                <p>We use the collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your catering orders and requests</li>
                  <li>Communicate about your bookings and services</li>
                  <li>Send you relevant updates about our menu and services</li>
                  <li>Improve our website and services</li>
                  <li>Ensure food safety and accommodate dietary requirements</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Data Protection</h2>
              <div className="text-gray-300 space-y-3">
                <p>We implement appropriate security measures to protect your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure storage of personal and payment information</li>
                  <li>Limited access to personal data by authorized personnel only</li>
                  <li>Regular security assessments and updates</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Contact Us</h2>
              <div className="text-gray-300 space-y-3">
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <p className="font-medium text-white">privacy@herbalbreadicine.com</p>
                <p>Herbalbreadicine<br />123 Culinary Avenue<br />Nashville, TN 37203<br />United States</p>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 
