import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

export const SocialConnect: React.FC = () => {
  return (
    <div className="bg-zinc-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Connect With Us</h2>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FacebookIcon size={32} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <InstagramIcon size={32} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <TwitterIcon size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};