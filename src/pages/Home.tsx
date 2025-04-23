import React from 'react';
import { Hero } from '../components/Hero';
import { RecordSection } from '../components/RecordSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <RecordSection />
    </div>
  );
};

export default Home;