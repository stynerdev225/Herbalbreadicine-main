import React, { useState, useRef, useEffect } from 'react';
import { Play, Download, Share2, Check, Facebook, Twitter, Instagram, Youtube, Link as LinkIcon, Disc } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface Album {
  title: string;
  artist: string;
  cover: string;
  year: string;
  type: string;
  tracks: {
    title: string;
    duration: string;
  }[];
}

const AllDigitalReleasesPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharePopupId, setSharePopupId] = useState<string | null>(null);
  const { isSubscribed } = useAuthStore();
  const sharePopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sharePopupRef.current && !sharePopupRef.current.contains(event.target as Node)) {
        setSharePopupId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyUrl = async (albumTitle: string, trackTitle?: string) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const id = trackTitle ? `${albumTitle}-${trackTitle}` : albumTitle;
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (albumTitle: string, trackTitle?: string) => {
    const id = trackTitle ? `${albumTitle}-${trackTitle}` : albumTitle;
    setSharePopupId(sharePopupId === id ? null : id);
  };

  const handleSocialShare = (platform: string, albumTitle: string, trackTitle?: string) => {
    const shareUrl = window.location.href;
    const shareTitle = trackTitle ? `${trackTitle} from ${albumTitle}` : albumTitle;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      instagram: `https://instagram.com`, // Instagram doesn't support direct sharing
      youtube: `https://youtube.com`
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    setSharePopupId(null);
  };

  const handleDownload = async (albumTitle: string, trackTitle?: string) => {
    if (!isSubscribed) {
      alert('Please subscribe to download');
      return;
    }
    console.log('Downloading:', trackTitle || albumTitle);
  };

  const albums: Album[] = [
    {
      title: "Digital Dreams Vol. 1",
      artist: "Various Artists",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "Digital Album",
      tracks: [
        { title: "Digital Dawn", duration: "3:45" },
        { title: "Electronic Sunset", duration: "4:20" },
        { title: "Binary Beats", duration: "3:55" },
      ]
    },
    {
      title: "Neon Nights",
      artist: "DJ Phantom",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "EP",
      tracks: [
        { title: "Midnight Drive", duration: "5:30" },
        { title: "City Lights", duration: "4:15" },
        { title: "Urban Dreams", duration: "6:00" },
        { title: "Neon Rain", duration: "4:45" }
      ]
    },
    {
      title: "Cosmic Journey",
      artist: "Stellar Sound",
      cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "Album",
      tracks: [
        { title: "Galactic Sunrise", duration: "4:30" },
        { title: "Stardust Dreams", duration: "5:15" },
        { title: "Nebula Dance", duration: "4:45" },
        { title: "Solar Winds", duration: "6:20" }
      ]
    },
    {
      title: "Underground Beats",
      artist: "Bass Collective",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "Mixtape",
      tracks: [
        { title: "Deep Bass", duration: "4:00" },
        { title: "Rhythm & Soul", duration: "3:45" },
        { title: "Urban Groove", duration: "5:30" },
        { title: "Street Vibes", duration: "4:15" }
      ]
    },
    {
      title: "Synthwave Dreams",
      artist: "Retro Waves",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "Album",
      tracks: [
        { title: "80s Revival", duration: "4:20" },
        { title: "Neon Memories", duration: "5:00" },
        { title: "Digital Love", duration: "3:55" },
        { title: "Retro Future", duration: "4:30" }
      ]
    },
    {
      title: "Acoustic Sessions",
      artist: "The String Theory",
      cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&auto=format&fit=crop&q=60",
      year: "2024",
      type: "Live Album",
      tracks: [
        { title: "Wooden Heart", duration: "4:10" },
        { title: "Simple Melody", duration: "3:45" },
        { title: "Pure Strings", duration: "5:20" },
        { title: "Natural Harmony", duration: "4:30" }
      ]
    }
  ];

  const vintageRecords = [
    {
      title: "MARIACHI SOUL",
      artist: "Francisco Herrera",
      year: "1995",
      image: "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&w=800&q=80",
      type: "Vinyl"
    },
    {
      title: "GUITARRA NIGHTS",
      artist: "Francisco Herrera",
      year: "1998",
      image: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?auto=format&fit=crop&w=800&q=80",
      type: "Vinyl"
    },
    {
      title: "LATIN FUSION",
      artist: "Francisco Herrera",
      year: "2001",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      type: "Vinyl"
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-48 pb-16">
      {/* Vintage Collection Section First */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-8">
            <div className="text-yellow-400">
              <Disc size={80} />
            </div>
            <h2 className="text-7xl font-black text-white">VINTAGE COLLECTION</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {vintageRecords.map((record) => (
            <div key={record.title} className="group">
              <div className="aspect-square rounded-full overflow-hidden mb-8 transform rotate-0 group-hover:rotate-180 transition-transform duration-1000">
                <img
                  src={record.image}
                  alt={record.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{record.title}</h3>
                <p className="text-gray-400 mb-1">{record.artist}</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-yellow-400 font-bold">{record.year}</span>
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span className="text-yellow-400 font-bold">{record.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-yellow-400/20 my-32"></div>

      {/* All Digital Releases Section */}
      <div className="container mx-auto px-4 all-digital-releases-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-8">
            <div className="text-yellow-400">
              <Disc size={80} />
            </div>
            <h2 className="text-7xl font-black text-white">ALL DIGITAL RELEASES</h2>
          </div>
          <div className="flex gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold">
              Latest
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full font-bold">
              Popular
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {albums.map((album) => (
            <div
              key={album.title}
              className="bg-zinc-900/50 rounded-xl p-6 border border-yellow-400/20"
            >
              <div className="flex gap-6">
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{album.title}</h2>
                      <p className="text-gray-400">{album.artist}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-yellow-400">{album.year}</span>
                        <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                        <span className="text-yellow-400">{album.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full text-black">
                        <Play size={20} />
                      </button>
                      <button
                        onClick={() => handleDownload(album.title)}
                        className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full text-white"
                      >
                        <Download size={20} />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => handleShare(album.title)}
                          className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full text-white"
                        >
                          <Share2 size={20} />
                        </button>
                        {sharePopupId === album.title && (
                          <div 
                            ref={sharePopupRef}
                            className="absolute right-0 mt-2 p-2 bg-zinc-800 rounded-lg shadow-xl z-50 min-w-[200px]"
                          >
                            <button
                              onClick={() => handleCopyUrl(album.title)}
                              className="w-full flex items-center gap-3 p-3 text-white hover:bg-zinc-700 transition-colors rounded-t-lg"
                            >
                              {copiedId === album.title ? (
                                <>
                                  <Check size={18} />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <LinkIcon size={18} />
                                  <span>Copy URL</span>
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleDownload(album.title)}
                              className="w-full flex items-center gap-3 p-3 text-white hover:bg-zinc-700 transition-colors"
                            >
                              <Download size={18} />
                              <span>Download</span>
                            </button>
                            
                            <div className="px-3 py-2 text-xs text-gray-400 border-t border-zinc-700">
                              Share on Social Media
                            </div>
                            
                            <div className="p-2 flex gap-2 border-t border-zinc-700">
                              <button
                                onClick={() => handleSocialShare('facebook', album.title)}
                                className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                              >
                                <Facebook size={20} />
                              </button>
                              <button
                                onClick={() => handleSocialShare('twitter', album.title)}
                                className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                              >
                                <Twitter size={20} />
                              </button>
                              <button
                                onClick={() => handleSocialShare('instagram', album.title)}
                                className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                              >
                                <Instagram size={20} />
                              </button>
                              <button
                                onClick={() => handleSocialShare('youtube', album.title)}
                                className="p-2 text-white hover:text-red-500 hover:scale-110 transition-all duration-300"
                              >
                                <Youtube size={20} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    {album.tracks.map((track, index) => (
                      <div
                        key={track.title}
                        className="flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-yellow-400/50 w-8">{index + 1}</span>
                          <span className="text-white">{track.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-400">{track.duration}</span>
                          <button
                            onClick={() => handleDownload(album.title, track.title)}
                            className="text-gray-400 hover:text-yellow-400"
                          >
                            <Download size={16} />
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => handleShare(album.title, track.title)}
                              className="text-gray-400 hover:text-yellow-400"
                            >
                              <Share2 size={16} />
                            </button>
                            {sharePopupId === `${album.title}-${track.title}` && (
                              <div 
                                ref={sharePopupRef}
                                className="absolute right-0 mt-2 p-2 bg-zinc-800 rounded-lg shadow-xl z-50 min-w-[200px]"
                              >
                                <button
                                  onClick={() => handleCopyUrl(album.title, track.title)}
                                  className="w-full flex items-center gap-3 p-3 text-white hover:bg-zinc-700 transition-colors rounded-t-lg"
                                >
                                  {copiedId === `${album.title}-${track.title}` ? (
                                    <>
                                      <Check size={18} />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <LinkIcon size={18} />
                                      <span>Copy URL</span>
                                    </>
                                  )}
                                </button>
                                
                                <button
                                  onClick={() => handleDownload(album.title, track.title)}
                                  className="w-full flex items-center gap-3 p-3 text-white hover:bg-zinc-700 transition-colors"
                                >
                                  <Download size={18} />
                                  <span>Download</span>
                                </button>
                                
                                <div className="px-3 py-2 text-xs text-gray-400 border-t border-zinc-700">
                                  Share on Social Media
                                </div>
                                
                                <div className="p-2 flex gap-2 border-t border-zinc-700">
                                  <button
                                    onClick={() => handleSocialShare('facebook', album.title, track.title)}
                                    className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                                  >
                                    <Facebook size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleSocialShare('twitter', album.title, track.title)}
                                    className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                                  >
                                    <Twitter size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleSocialShare('instagram', album.title, track.title)}
                                    className="p-2 text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                                  >
                                    <Instagram size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleSocialShare('youtube', album.title, track.title)}
                                    className="p-2 text-white hover:text-red-500 hover:scale-110 transition-all duration-300"
                                  >
                                    <Youtube size={20} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDigitalReleasesPage;
