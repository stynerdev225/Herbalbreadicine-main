"use client"
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  
  // Function to play a playlist and update the record player
  const playPlaylist = (playlistName: string) => {
    // In a real app, this would connect to a music service
    console.log(`Playing ${playlistName}`);
    
    // Update URL with the playlist name as a parameter
    navigate(`/music?playlist=${encodeURIComponent(playlistName)}`);
    
    // We could also use a global state manager like Redux or Context API
    // to update the currently playing track across components
    
    // For now, let's use localStorage to demo the functionality
    localStorage.setItem('currentPlaylist', playlistName);
    
    // Dispatch a custom event that MusicPage can listen for
    const event = new CustomEvent('playlistChanged', { 
      detail: { playlist: playlistName } 
    });
    window.dispatchEvent(event);
  };

  return (
    <aside className="w-64 hidden md:block bg-black border-r border-yellow-900/30 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Creative Mush Western</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Jacob's Playlists</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => playPlaylist('Country Classics')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Country Classics
            </button>
          </li>
          <li>
            <button 
              onClick={() => playPlaylist('Rodeo Anthems')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Rodeo Anthems
            </button>
          </li>
          <li>
            <button 
              onClick={() => playPlaylist('Cowboy Ballads')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Cowboy Ballads
            </button>
          </li>
          <li>
            <button 
              onClick={() => playPlaylist('Ranch House Party')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Ranch House Party
            </button>
          </li>
          <li>
            <button 
              onClick={() => playPlaylist('Wild West')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Wild West
            </button>
          </li>
          <li>
            <button 
              onClick={() => playPlaylist('Frontier Sounds')} 
              className="w-full text-left flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Frontier Sounds
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;