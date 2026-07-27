import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section className="py-20 bg-gradient-to-tr from-cyan-50/40 via-white/50 to-pink-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
            <span>قصص نجاح وثقة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            ماذا يقول أولياء الأمور عنا؟
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            آراء حقيقية من أمهات وآباء شاركناهم فرحة تطور أطفالهم وابتكاراتهم في Scratch والبرمجة.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote Mark Icon */}
              <Quote className="w-10 h-10 text-cyan-200/70 absolute top-6 left-6 group-hover:text-cyan-300 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-slate-700 text-base leading-relaxed font-medium mb-6 relative z-10">
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/50 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.parentName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">
                    {t.parentName}
                  </h4>
                  <p className="text-xs font-semibold text-cyan-600 mt-0.5">
                    {t.childInfo}
                  </p>
                  <span className="inline-block mt-1 text-[10px] bg-white/60 text-slate-700 border border-white/60 px-2 py-0.5 rounded-md font-bold">
                    دورة: {t.courseName}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
