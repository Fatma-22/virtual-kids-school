import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowLeft, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { siteConfig, openBookingModal } = useApp();

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-tr from-cyan-100 via-white to-pink-100">
      {/* Background Glows */}
      <div className="absolute top-10 right-5 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-right">

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.25] tracking-tight mb-6">
              {siteConfig.heroTitle || "ابدأ رحلة طفلك البرمجية من المنزل مع أفضل المعلمين."}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-8 max-w-2xl">
              {siteConfig.heroSubtitle || "أكاديمية افتراضية متخصصة في تقديم دورات تفاعلية للأطفال من سن 6 إلى 15 سنة في Scratch والبرمجة والتفكير المنطقي بأساليب عصرية وممتعة."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => openBookingModal(null)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-cyan-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span>احجز درسًا مجانياً الآن</span>
              </button>

              <a
                href="#courses"
                className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-cyan-100 text-slate-800 font-bold text-base rounded-2xl hover:bg-white shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>استكشف الدورات</span>
                    <ArrowLeft className="w-4 h-4 text-cyan-600 group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Banner Image Container */}
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white/80 shadow-2xl bg-white/40 backdrop-blur-xl p-2">
                <div className="rounded-[24px] overflow-hidden relative">
                  <img
                    src={siteConfig.heroBannerImage}
                    alt="Virtual Kids School Students"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Rating Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <div>
                      <span className="block text-xs font-black text-slate-900">4.9 / 5.0</span>
                      <span className="block text-[10px] font-bold text-slate-600">تقييم أولياء الأمور</span>
                    </div>
                  </div>

                  {/* Floating Lesson Card Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>حصة تجريبية مجانية</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
