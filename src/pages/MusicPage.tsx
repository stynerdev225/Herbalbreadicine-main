import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import RecordSection from '../components/RecordSection';
import { VintageRecords } from '../components/VintageRecords';
import { PreFooter } from '../components/PreFooter';
import { Footer } from '../components/Footer';
import { Disc } from 'lucide-react';

const MusicPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
            <div className="flex items-center gap-8">
            </div>
          </div>
        </div>
        <RecordSection />
        <VintageRecords />
        <div className="text-center mt-16">
          <Link
            to="/store/all-digital-releases"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition"
          >
            View All Albums
          </Link>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default MusicPage;
