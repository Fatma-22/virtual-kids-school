import React from 'react';
import { Award, Video, LineChart, Calendar, Sparkles, FileText } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: "مدرسون متخصصون في البرمجة",
      desc: "طاقم تعليمي خبرة واسعة في تبسيط البرمجة وScratch للأطفال بأساليب تربوية مشجعة وصابرة."
    },
    {
      icon: Video,
      title: "حصص تفاعلية مباشرة",
      desc: "حصص أونلاين حية تسمح بالتطبيق العملي المباشر وكتابة الكود خطوة بخطوة مع المعلم والزملاء."
    },
    {
      icon: LineChart,
      title: "متابعة مستمرة مع ولي الأمر",
      desc: "تواصل دقيق ومستمر لإطلاعك أولاً بأول على استجابة وتطور طفلك في حل المشكلات البرمجية."
    },
    {
      icon: Calendar,
      title: "مواعيد مرنة تناسب الجميع",
      desc: "جداول متنوعة في الفترات الصباحية والمسائية وفي عطلات نهاية الأسبوع."
    },
    {
      icon: Sparkles,
      title: "بيئة تعليمية ممتعة ومحفزة",
      desc: "تطبيقات وألعاب تفاعلية تجعل الطفل ينتظر موعد حصة Scratch والبرمجة بشغف."
    },
    {
      icon: FileText,
      title: "مشاريع تخرج وإنجازات",
      desc: "مشاريع ألعاب برمجية وتطبيقات حقيقية يبتكرها الطالب بنفسه ويعرضها بفخر."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-pink-50/40 via-white/50 to-cyan-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>مميزات الأكاديمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            لماذا تختار <span className="text-pink-600">Virtual Kids School</span>؟
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            نوفر تجربة تعليمية متكاملة في البرمجة تجمع بين متعة الابتكار والالتزام بأعلى المعايير.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, index) => {
            const Icon = r.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-[32px] bg-white/70 backdrop-blur-xl border border-cyan-100/80 shadow-xl hover:shadow-2xl hover:bg-white hover:border-pink-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-pink-500 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 shadow-md">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
