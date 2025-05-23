/**
 * Developed by Stiner.dev
 * Professional Web Developer
 * April 24, 2025
 * Contact: https://stiner.dev
 */
"use client"

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Youtube, Sparkles, Facebook, Twitter, Instagram } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Catering", path: "/catering" },
    { name: "Music", path: "/music" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = () => {
    setIsOpen(false); // Close mobile menu if open
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black shadow-xl" : "bg-black/90"}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group" onClick={handleNavClick}>
              <Sparkles className="w-8 h-8 text-yellow-400 group-hover:animate-pulse transition-all duration-300" />
              <span className="font-extrabold text-white text-2xl md:text-4xl tracking-tight group-hover:text-yellow-400 transition-colors duration-300 ml-2">
                Herbal Breadicine
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center with more space */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8 lg:px-20">
            {/* Navigation Links - Evenly Distributed */}
            <div className="flex justify-between items-center w-full max-w-3xl">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`relative px-3 py-2 text-xl font-bold transition-all duration-300 hover:-translate-y-1 ${location.pathname === item.path ? "text-yellow-400" : "text-white hover:text-yellow-400"
                    }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 transform transition-transform duration-300 ${location.pathname === item.path ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                      }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons - Far Right */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125"
              aria-label="Facebook"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125"
              aria-label="Twitter"
            >
              <Twitter className="w-7 h-7" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 hover:scale-150"
              aria-label="YouTube"
            >
              <Youtube className="w-8 h-8" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none transition-colors duration-300 p-2 menu-button"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Side Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 h-auto max-h-[80vh] rounded-bl-xl bg-black/95 shadow-xl backdrop-blur-sm w-[70%] max-w-[300px] transform transition-transform duration-300 ease-in-out z-50 md:hidden mobile-menu ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-16 flex items-center justify-end px-4 border-b border-gray-800">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-yellow-400 focus:outline-none transition-colors duration-300 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
            aria-label="Close menu"
          >
            <span className="font-medium text-sm mr-1">Close</span>
          </button>
        </div>
        <div className="px-4 py-2 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={`px-3 py-2 text-base font-medium transition-all duration-300 ${location.pathname === item.path
                    ? "text-yellow-400 border-l-2 border-yellow-400 pl-4"
                    : "text-white hover:text-yellow-400 hover:border-l-2 hover:border-yellow-400 hover:pl-4"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Icons in Mobile Menu */}
          <div className="flex items-center justify-between py-2 mt-2 border-t border-gray-800">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-white hover:text-yellow-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-white hover:text-yellow-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-white hover:text-yellow-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1" aria-label="YouTube">
              <Youtube className="w-6 h-6 text-white hover:text-red-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}

