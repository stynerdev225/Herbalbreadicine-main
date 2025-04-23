"use client"
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-red-400/50 text-white p-4 mt-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <button className="bg-black border border-red-400 rounded-full p-1 hover:bg-red-900/20">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-64 p-2 pl-10 text-sm rounded-full bg-black border border-red-400 text-white focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-red-400/50" 
            placeholder="Search for songs, artists..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 
