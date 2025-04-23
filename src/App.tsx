import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  createRoutesFromElements
} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PreFooter } from './components/PreFooter';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { CateringPage } from './pages/CateringPage';
import { ContactPage } from './pages/ContactPage';
import { CorporateEventsPage } from './pages/catering/CorporateEventsPage';
import { PrivatePartiesPage } from './pages/catering/PrivatePartiesPage';
import { WeddingsPage } from './pages/catering/WeddingsPage';
import MusicPage from './pages/MusicPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AllDigitalReleasesPage from './pages/AllDigitalReleasesPage';
import { ThankYou } from './pages/ThankYou';
import { ScrollToTop } from './components/ScrollToTop';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-black min-h-screen">
    <Navigation />
    {children}
    <PreFooter />
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/music" element={<MusicPage />} />
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/menu" element={<MainLayout><MenuPage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/catering" element={<MainLayout><CateringPage /></MainLayout>} />
        <Route path="/catering/corporate" element={<MainLayout><CorporateEventsPage /></MainLayout>} />
        <Route path="/catering/private" element={<MainLayout><PrivatePartiesPage /></MainLayout>} />
        <Route path="/catering/weddings" element={<MainLayout><WeddingsPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/thank-you" element={<MainLayout><ThankYou /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><TermsAndConditions /></MainLayout>} />
        <Route 
          path="/store/all-digital-releases" 
          element={<MainLayout><AllDigitalReleasesPage /></MainLayout>} 
        />
      </Routes>
    </Router>
  );
};

export default App;
