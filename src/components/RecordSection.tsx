/**
 * Developed by Stiner.dev
 * Professional Web Developer
 * April 24, 2025
 * Contact: https://stiner.dev
 */
import React, { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Disc, Share2, Clock, Download, Check } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface Track {
  title: string;
  duration: string;
  id: string;
}

interface Album {
  title: string;
  year: string;
  id: string;
  tracks: Track[];
}

const albums: Album[] = [
  {
    title: "Urban Symphony",
    year: "2024",
    id: "urban-symphony-2024",
    tracks: [
      { id: "city-lights", title: "City Lights", duration: "3:45" },
      { id: "midnight-flow", title: "Midnight Flow", duration: "4:12" },
      { id: "street-poetry", title: "Street Poetry", duration: "3:58" },
      { id: "urban-dreams", title: "Urban Dreams", duration: "4:22" }
    ]
  },
  {
    title: "Street Poetry",
    year: "2023",
    id: "street-poetry-2023",
    tracks: [
      { id: "concrete-stories", title: "Concrete Stories", duration: "4:02" },
      { id: "night-rhythms", title: "Night Rhythms", duration: "3:56" },
      { id: "urban-tales", title: "Urban Tales", duration: "4:15" },
      { id: "city-beat", title: "City Beat", duration: "3:48" }
    ]
  }
];

const records = [
  {
    title: "MARIACHI SOUL",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?auto=format&fit=crop&w=800&q=80",
    type: "Album"
  },
  {
    title: "GUITARRA NIGHTS",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?auto=format&fit=crop&w=800&q=80",
    type: "Single"
  },
  {
    title: "LATIN FUSION",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    type: "EP"
  },
  {
    title: "MARIACHI DREAMS",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    type: "Album"
  },
  {
    title: "SPANISH GUITAR",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    type: "Single"
  },
  {
    title: "ACOUSTIC SOUL",
    artist: "Francisco Herrera",
    image: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=800&q=80",
    type: "Album"
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

const RecordSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isSubscribed } = useAuthStore();
  const digitalReleasesRef = useRef<HTMLDivElement>(null);
  const classicsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleShare = async (album: Album, track?: Track) => {
    const shareTitle = track ? `${track.title} from ${album.title}` : album.title;
    const id = track ? `${album.title}-${track.title}` : album.title;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async (album: Album, track?: Track) => {
    if (!isSubscribed) {
      alert('Please subscribe to download');
      return;
    }
    // Implement download logic here
    console.log('Downloading:', track ? track.title : album.title);
  };

  return (
    <>
      <div className="bg-zinc-100 py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
            <div className="flex items-center gap-8">
              <div className="text-zinc-300">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20ZM12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7ZM12,15C10.34,15 9,13.66 9,12C9,10.34 10.34,9 12,9C13.66,9 15,10.34 15,12C15,13.66 13.66,15 12,15Z" />
                </svg>
              </div>
              <h2 className="text-7xl font-black text-black">LATEST RELEASED</h2>
            </div>
            <Link
              to="/store/all-digital-releases"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold transition"
            >
              VIEW ALL ALBUM
              <Play size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {records.map((record) => (
              <div key={record.title} className="group relative bg-white p-6 rounded-3xl">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src={record.image}
                    alt={record.title}
                    className="w-full h-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">{record.title}</h3>
                    <p className="text-gray-600">{record.artist}</p>
                  </div>
                  <span className="text-sm font-bold text-black bg-yellow-400 px-3 py-1 rounded-full">
                    {record.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={digitalReleasesRef} className="bg-black py-32">
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

          <div className="text-center mt-12">
            <Link
              to="/store/all-digital-releases"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition"
            >
              Explore All Classics
              <Play size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div ref={classicsRef} className="bg-black py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 mb-12">
            <div className="text-yellow-400">
              <Disc size={80} />
            </div>
            <h2 className="text-7xl font-black text-white">DISCOGRAPHY</h2>
          </div>

          <div className="space-y-16">
            {albums.map((album) => (
              <div key={album.title} className="bg-zinc-900/50 rounded-xl p-8 border-[3px] border-white/60">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative">
                    <h2 className="text-5xl font-black text-white tracking-tight relative inline-block">
                      {album.title}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform -skew-x-12"></div>
                    </h2>
                    <p className="text-gray-400 text-xl font-medium tracking-wide mt-4">{album.year}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-full text-black">
                      <Play size={24} />
                    </button>
                    <button
                      onClick={() => handleDownload(album)}
                      className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full transition text-white"
                    >
                      <Download size={24} />
                    </button>
                    <button
                      onClick={() => handleShare(album)}
                      className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full transition text-white"
                    >
                      {copiedId === album.title ? <Check size={24} /> : <Share2 size={24} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {album.tracks.map((track, index) => (
                    <div
                      key={track.title}
                      className="flex items-center justify-between p-4 hover:bg-zinc-800/50 rounded-lg transition border-[3px] border-white/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400">
                          <span className="font-bold text-black">{index + 1}</span>
                        </div>
                        <span className="font-medium text-white">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleDownload(album, track)}
                          className="text-gray-400 hover:text-yellow-400 transition"
                        >
                          <Download size={20} />
                        </button>
                        <button
                          onClick={() => handleShare(album, track)}
                          className="text-gray-400 hover:text-yellow-400 transition"
                        >
                          {copiedId === `${album.title}-${track.title}` ? (
                            <Check size={20} />
                          ) : (
                            <Share2 size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordSection;
