import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-tr from-cyan-50 via-white to-pink-50 font-['Cairo','Tajawal',sans-serif] text-slate-800 antialiased selection:bg-pink-500 selection:text-white dir-rtl">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <CoursesSection />
          <WhyUsSection />
          <HowItWorksSection />
          <FaqSection />
        </main>
        <Footer />

        {/* Modals & Notifications */}
        <BookingModal />
        <CourseDetailModal />
        <Toast />
      </div>
    </AppProvider>
  );
}

