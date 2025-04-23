import React from 'react';
import { X } from 'lucide-react';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieSettings: React.FC<CookieSettingsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    // Here you would typically save the cookie preferences
    console.log('Cookie preferences saved');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cookie Settings</h2>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm">Required for the website to function properly</p>
              <div className="bg-gray-700 px-3 py-1 rounded text-xs">Always Active</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm">Help us improve our website by collecting anonymous usage data</p>
              <label className="flex items-center">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Marketing Cookies</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm">Used to deliver personalized advertisements</p>
              <label className="flex items-center">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};