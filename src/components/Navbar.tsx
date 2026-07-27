import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Menu, X, GraduationCap, Phone, BookOpen, HelpCircle, Users, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteConfig, openBookingModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero', icon: Sparkles },
    { label: 'من نحن', href: '#about', icon: Users },
    { label: 'الدورات', href: '#courses', icon: GraduationCap },
    { label: 'لماذا تختارنا', href: '#why-us', icon: Layers },
    { label: 'كيف تبدأ؟', href: '#how-it-works', icon: BookOpen },
    { label: 'الأسئلة الشائعة', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-cyan-100/70 py-3'
          : 'bg-white/60 backdrop-blur-md border-b border-cyan-100/70 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-cyan-200 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">
                {siteConfig.siteName || "Virtual Kids School"}
              </span>
              <span className="text-xs font-bold text-cyan-600 mt-1 block">
                Virtual Kids School
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-bold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/80 rounded-full transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openBookingModal(null)}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-cyan-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>احجز درسًا مجانياً</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-base font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/80 rounded-xl transition-all"
                >
                  <Icon className="w-5 h-5 text-cyan-600" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold text-center rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>احجز درسًا الآن</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
