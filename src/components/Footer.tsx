"use client"

import { FacebookIcon, InstagramIcon, TwitterIcon, ArrowUp, Sparkles, Mail, Wheat } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { CookieSettings } from "./CookieSettings"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleLinkClick = () => {
    // Add small delay to ensure navigation happens first
    setTimeout(scrollToTop, 100)
  }

  return (
    <>
      <footer className="bg-black py-20 border-t border-gray-200 relative overflow-hidden text-white">
        {/* Artistic hand-drawn mountain background */}
        <div className="absolute inset-0 w-full h-full">
          <svg
            className="w-full h-full absolute bottom-0"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* First mountain range - furthest back */}
            <path
              d="M0,320 L0,180 C20,185 40,190 60,185 C80,180 100,165 120,170 C140,175 160,200 180,195 C200,190 220,155 240,150 C260,145 280,170 300,175 C320,180 340,165 360,160 C380,155 400,160 420,165 C440,170 460,175 480,170 C500,165 520,150 540,145 C560,140 580,145 600,150 C620,155 640,160 660,155 C680,150 700,135 720,130 C740,125 760,130 780,135 C800,140 820,145 840,140 C860,135 880,120 900,115 C920,110 940,115 960,120 C980,125 1000,130 1020,125 C1040,120 1060,105 1080,100 C1100,95 1120,100 1140,105 C1160,110 1180,115 1200,110 C1220,105 1240,90 1260,85 C1280,80 1300,85 1320,90 C1340,95 1360,100 1380,95 C1400,90 1420,75 1430,70 L1440,65 L1440,320 Z"
              fill="#000000"
              className="opacity-10"
              style={{ filter: "url(#sketchy1)" }}
            />

            {/* Second mountain range - middle */}
            <path
              d="M0,320 L0,220 C20,225 40,230 60,225 C80,220 100,205 120,210 C140,215 160,240 180,235 C200,230 220,195 240,190 C260,185 280,210 300,215 C320,220 340,205 360,200 C380,195 400,200 420,205 C440,210 460,215 480,210 C500,205 520,190 540,185 C560,180 580,185 600,190 C620,195 640,200 660,195 C680,190 700,175 720,170 C740,165 760,170 780,175 C800,180 820,185 840,180 C860,175 880,160 900,155 C920,150 940,155 960,160 C980,165 1000,170 1020,165 C1040,160 1060,145 1080,140 C1100,135 1120,140 1140,145 C1160,150 1180,155 1200,150 C1220,145 1240,130 1260,125 C1280,120 1300,125 1320,130 C1340,135 1360,140 1380,135 C1400,130 1420,115 1430,110 L1440,105 L1440,320 Z"
              fill="#000000"
              className="opacity-15"
              style={{ filter: "url(#sketchy2)" }}
            />

            {/* Third mountain range - closest */}
            <path
              d="M0,320 L0,260 C20,265 40,270 60,265 C80,260 100,245 120,250 C140,255 160,280 180,275 C200,270 220,235 240,230 C260,225 280,250 300,255 C320,260 340,245 360,240 C380,235 400,240 420,245 C440,250 460,255 480,250 C500,245 520,230 540,225 C560,220 580,225 600,230 C620,235 640,240 660,235 C680,230 700,215 720,210 C740,205 760,210 780,215 C800,220 820,225 840,220 C860,215 880,200 900,195 C920,190 940,195 960,200 C980,205 1000,210 1020,205 C1040,200 1060,185 1080,180 C1100,175 1120,180 1140,185 C1160,190 1180,195 1200,190 C1220,185 1240,170 1260,165 C1280,160 1300,165 1320,170 C1340,175 1360,180 1380,175 C1400,170 1420,155 1430,150 L1440,145 L1440,320 Z"
              fill="#000000"
              className="opacity-20"
              style={{ filter: "url(#sketchy3)" }}
            />

            {/* Filters for sketchy effect */}
            <defs>
              <filter id="sketchy1" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="1" />
                <feDisplacementMap in="SourceGraphic" scale="15" />
              </filter>
              <filter id="sketchy2" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="2" />
                <feDisplacementMap in="SourceGraphic" scale="10" />
              </filter>
              <filter id="sketchy3" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="8" />
              </filter>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section with extra large brand name */}
          <div className="mb-16">
            <h2 className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white mb-8 relative">
              HERBALBREADICINE
              <span className="absolute -top-4 -right-4 text-yellow-500">
                <Sparkles className="w-8 h-8" />
              </span>
            </h2>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-white">
              <span className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">#ORGANIC</span>
              <span className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">#ARTISANAL</span>
              <span className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">#TRADITIONAL</span>
              <span className="hover:text-yellow-500 cursor-pointer transition-colors duration-300">#MAGICAL</span>
            </div>
          </div>

          {/* Middle section with navigation, hours, and newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="space-y-5">
              {[
                { num: "01", name: "About", path: "/about" },
                { num: "02", name: "Menu", path: "/menu" },
                { num: "03", name: "Catering", path: "/catering" },
                { num: "04", name: "Music", path: "/music" },
                { num: "05", name: "Contact", path: "/contact" },
              ].map((item) => (
                <div key={item.name} className="flex items-center group">
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 mr-3 text-xs border border-white rounded-full text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {item.num}
                    </span>
                    <Link
                      to={item.path}
                      className="text-xl font-medium text-white group-hover:text-yellow-500 transition-colors duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-12">
                <h3 className="text-sm font-medium text-white mb-4">HOURS</h3>
                <ul className="space-y-3 text-lg text-white">
                  <li>Monday - Friday: 7am - 8pm</li>
                  <li>Saturday: 8am - 9pm</li>
                  <li>Sunday: 8am - 6pm</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-4">SOCIAL</h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-white hover:text-yellow-500 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <FacebookIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-500 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-500 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div>
              <h3 className="text-sm font-medium text-white mb-4">NEWSLETTER</h3>
              <p className="mb-4 text-white">Stay updated with our latest offerings and seasonal specials.</p>

              {subscribed ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                  <div className="flex border-b border-white focus-within:border-yellow-500 transition-colors duration-300">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-grow bg-transparent py-2 focus:outline-none text-white"
                      required
                    />
                    <button type="submit" className="p-2 text-white hover:text-yellow-500 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">We respect your privacy. Unsubscribe at any time.</p>
                </form>
              )}
            </div>
          </div>

          {/* Bottom section with large tagline and copyright */}
          <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row justify-between items-start">
            <p className="text-3xl md:text-5xl font-medium max-w-3xl mb-8 md:mb-0 leading-tight text-white">
              Building delicious, organic, and memorable catering experiences.
            </p>
            <div className="flex flex-col items-end">
              <p className="text-sm text-white mb-4">
                &copy; {currentYear} Herbalbreadicine.
                <br />
                All rights reserved.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Legal Links Section */}
          <div className="mt-12 pt-6 border-t border-gray-800/30 flex flex-col md:flex-row justify-center items-center text-xs text-gray-500 space-y-2 md:space-y-0">
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="hover:text-yellow-400 transition-colors"
                onClick={handleLinkClick}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-yellow-400 transition-colors"
                onClick={handleLinkClick}
              >
                Terms & Conditions
              </Link>
              <button 
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setIsCookieSettingsOpen(true)}
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-[15%] opacity-40 animate-float-slow">
          <Wheat className="w-20 h-20 text-yellow-500" />
        </div>
        <div className="absolute top-1/3 right-[20%] opacity-40 animate-float-medium">
          <Sparkles className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="absolute bottom-1/4 left-[30%] opacity-40 animate-float-fast">
          <Mail className="w-14 h-14 text-yellow-500" />
        </div>
      </footer>
      <CookieSettings 
        isOpen={isCookieSettingsOpen}
        onClose={() => setIsCookieSettingsOpen(false)}
      />
    </>
  );
};

