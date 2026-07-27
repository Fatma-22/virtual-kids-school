import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Edit3, ExternalLink, ClipboardCheck, PhoneCall, Rocket, ArrowLeft } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { openBookingModal } = useApp();

  const steps = [
    {
      stepNum: "1",
      icon: BookOpen,
      title: "اختيار الدورة",
      desc: "تصفح الدورات المتاحة واختيار الدورة المناسبة لعمر واهتمامات طفلك."
    },
    {
      stepNum: "2",
      icon: Edit3,
      title: "تعبئة نموذج الحجز",
      desc: "إدخال بيانات ولي الأمر والطفل ونظام الدراسة المفضل في نموذج الحجز المباشر."
    },
    {
      stepNum: "3",
      icon: ClipboardCheck,
      title: "تأكيد واستلام الطلب",
      desc: "يتم حفظ وتسليم طلبك فوراً في الأكاديمية وبدء معالجته وتحديد المواعيد المناسبة."
    },
    {
      stepNum: "4",
      icon: PhoneCall,
      title: "التواصل مع ولي الأمر",
      desc: "نتواصل معك عبر الواتساب لتأكيد موعد الحصة التجريبية المجانية وإرسال تفاصيل القاعة."
    },
    {
      stepNum: "5",
      icon: Rocket,
      title: "بدء الدراسة والتطبيق",
      desc: "انضمام الطفل للحصة التفاعلية أونلاين وبدء رحلة العلم والإبداع مباشرة!"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-cyan-600 via-pink-500 to-amber-400 text-white relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 text-cyan-50 border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-cyan-100" />
            <span>خطوات بسيطة وسريعة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            كيف تبدأ رحلة طفلك معنا؟
          </h2>
          <p className="text-slate-300 text-lg font-medium">
            خطوات سهلة وميسرة تبدأ بتعبئة نموذج الحجز المباشر وتنتهي بانطلاق أولى حصص طفلك التفاعلية.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={index}
                className="bg-white/15 backdrop-blur-xl p-8 rounded-[32px] border border-white/20 hover:border-cyan-100 hover:bg-white/20 transition-all duration-300 relative group shadow-xl"
              >
                {/* Step Number Circle */}
                <div className="absolute top-6 left-6 text-4xl font-black text-white/35 group-hover:text-cyan-100 transition-colors opacity-60">
                  0{s.stepNum}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/20 text-cyan-50 group-hover:bg-white/30 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 border border-white/30 shadow-md">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom Banner */}
        <div className="text-center bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/20 backdrop-blur-md">
          <div className="text-right">
            <h3 className="text-2xl font-black text-white mb-1">
              جاهز لمنح طفلك البداية البرمجية المثالية؟
            </h3>
            <p className="text-cyan-50 text-sm font-medium">
              احجز حصتك التجريبية المجانية الآن وتابع شغف وتطور طفلك في Scratch والذكاء الاصطناعي (AI for Kids).
            </p>
          </div>

          <button
            onClick={() => openBookingModal(null)}
            className="px-8 py-4 bg-white text-cyan-700 font-extrabold text-base rounded-2xl shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2 group cursor-pointer"
          >
            <span>احجز الآن في دقيقة واحدة</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
