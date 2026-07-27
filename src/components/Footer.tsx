import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Heart, MessageCircle, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig } = useApp();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-cyan-50/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 rounded-[28px] border border-white/80 bg-white/70 p-8 shadow-sm backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-pink-500 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-black text-slate-900">
                {siteConfig.siteName || "Virtual Kids School"}
              </span>
            </div>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-600">
              أكاديمية تعليمية متخصصة أونلاين لتقديم دورات تفاعلية وممتعة للأطفال في Scratch والذكاء الاصطناعي داخل بيئة آمنة ومشجعة.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/20111991431`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-semibold">01011991431</span>
              </a>
              <a
                href={`https://wa.me/20111991431`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition-colors hover:bg-cyan-600 hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="mb-4 border-r-2 border-cyan-500 pr-3 text-base font-bold text-slate-900">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#hero" className="transition-colors hover:text-cyan-600">الرئيسية</a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-cyan-600">من نحن</a>
              </li>
              <li>
                <a href="#courses" className="transition-colors hover:text-cyan-600">الدورات المتاحة</a>
              </li>
              <li>
                <a href="#why-us" className="transition-colors hover:text-cyan-600">لماذا تختارنا؟</a>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="mb-4 border-r-2 border-cyan-500 pr-3 text-base font-bold text-slate-900">
              الدعم والمساعدة
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-cyan-600">خطوات التسجيل</a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-cyan-600">الأسئلة الشائعة</a>
              </li>
            </ul>
          </div>

          {/* Courses List */}
          <div>
            <h4 className="mb-4 border-r-2 border-cyan-500 pr-3 text-base font-bold text-slate-900">
              أبرز دوراتنا
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>Scratch للأطفال</li>
              <li>الذكاء الاصطناعي للأطفال</li>
              <li>مشاريع تفاعلية ومبتكرة</li>
              <li>تعلم مبني على اللعب والتجربة</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-center text-xs text-slate-500 sm:flex-row">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} - <strong className="text-slate-700">Virtual Kids School</strong>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <span>تم التطوير بحب ورعاية للأطفال</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
