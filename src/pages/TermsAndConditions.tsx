import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 text-gray-300">
            <p className="text-yellow-400 font-semibold mb-2">Last Updated: March 15, 2024</p>
            <p className="mb-4">
              Please read these Terms and Conditions carefully before using the Herbalbreadicine website and services.
            </p>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>By accessing our website or using our catering services, you agree to be bound by these Terms and Conditions.</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Catering Services</h2>
              <div className="text-gray-300 space-y-3">
                <p>Our catering services are subject to the following terms:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Minimum notice period of 48 hours for bookings</li>
                  <li>Deposit requirements vary by event size</li>
                  <li>Cancellation policies apply based on notice period</li>
                  <li>Final guest count must be confirmed 24 hours before event</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Dietary Requirements</h2>
              <div className="text-gray-300 space-y-3">
                <p>We accommodate dietary restrictions with advance notice:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All allergies must be disclosed during booking</li>
                  <li>Vegetarian and vegan options available</li>
                  <li>Gluten-free alternatives can be provided</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Payment Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>Our payment terms include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>50% deposit required for booking confirmation</li>
                  <li>Final payment due 24 hours before event</li>
                  <li>Accepted payment methods: credit card, bank transfer</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Contact Us</h2>
              <div className="text-gray-300 space-y-3">
                <p>For questions about these Terms & Conditions, please contact us at:</p>
                <p className="font-medium text-white">legal@herbalbreadicine.com</p>
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

export default TermsAndConditions; 
