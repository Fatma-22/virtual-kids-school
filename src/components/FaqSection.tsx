import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, siteConfig } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-pink-50/30 via-white/40 to-cyan-50/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-100 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-cyan-600" />
            <span>إجابات واستفسارات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            الأسئلة الشائعة
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            كل ما تريد معرفته عن دورات Scratch والبرمجة للأطفال، نظام الدراسة وطرق التواصل.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? 'border-cyan-200 bg-white/80 shadow-lg'
                    : 'border-cyan-100/70 bg-white/60 hover:bg-white shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-right p-6 flex items-center justify-between gap-4 font-bold text-lg text-slate-900 cursor-pointer"
                >
                  <span className="flex-1">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white rotate-180' : 'bg-white/80 border border-cyan-100 text-slate-700'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-700 text-base leading-relaxed font-medium border-t border-cyan-100/70 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-8 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <h4 className="text-lg font-extrabold text-slate-900">لديك سؤال آخر لم تجد إجابته هنا؟</h4>
            <p className="text-sm font-medium text-slate-600">فريقنا متواجد دائمًا للإجابة على جميع استفساراتك مباشرة عبر الواتساب.</p>
          </div>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('مرحباً أود الاستفسار عن دورات البرمجة وScratch في Virtual Kids School')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center gap-2 shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تحدث مع فريق الدعم</span>
          </a>
        </div>

      </div>
    </section>
  );
};
