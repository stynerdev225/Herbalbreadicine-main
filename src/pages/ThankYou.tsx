import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ThankYou = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Thank You for Reaching Out!
          </h1>
          <p className="text-xl text-gray-300">
            Your message has been successfully sent to our magical kitchen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-zinc-900/50 border border-yellow-900/30 rounded-2xl p-6 md:p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Clock className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">What Happens Next?</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/10 rounded-full p-2 mt-1">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">Quick Response Time</h3>
                <p className="text-gray-300">
                  Chef Jacob personally reviews all inquiries within 24-48 hours to ensure your needs are fully understood.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/10 rounded-full p-2 mt-1">
                <ChefHat className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">Personalized Consultation</h3>
                <p className="text-gray-300">
                  You'll receive a detailed response addressing your specific needs and questions about our artisanal breads and herbal offerings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/10 rounded-full p-2 mt-1">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">Next Steps</h3>
                <p className="text-gray-300">
                  We'll discuss your preferences, dietary requirements, and how we can best serve you with our unique blend of traditional baking and herbal medicine.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-zinc-900/50 border border-yellow-900/30 rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <ChefHat className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Meet Chef Jacob</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80"
                alt="Chef Jacob"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="text-gray-300 space-y-4">
              <p>
                Jacob's journey began with a simple belief: that food should be both healing and delicious. Drawing from ancient wisdom and modern organic farming practices, he founded Herbalbreadicine to create a unique fusion of traditional baking and herbal medicine.
              </p>
              <p>
                With over two decades of experience in organic farming and herbalism, Jacob has developed signature recipes that not only tantalize the taste buds but also nourish the body and soul.
              </p>
              <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                <Sparkles className="w-5 h-5" />
                <span>Master Herbalist & Certified in Traditional Herbal Medicine</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors duration-300"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
