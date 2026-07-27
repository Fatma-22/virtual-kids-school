import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, HeartHandshake, Award, Laptop } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteConfig } = useApp();

  const values = [
    {
      icon: Shield,
      title: "بيئة آمنة وتفاعلية",
      desc: "نضمن بيئة رقمية آمنة ومشجعة تحمي الطفل وتمنحه المساحة الكاملة للتعبير والابتكار."
    },
    {
      icon: HeartHandshake,
      title: "اهتمام بمستوى كل طفل",
      desc: "نتابع القدرات الفردية لكل طالب، ونوفر توجيهاً شاملاً يتناسب مع سرعته وشغفه."
    },
    {
      icon: Award,
      title: "معلمون ذوو خبرة",
      desc: "نمتلك طاقماً تعليمياً متخصصاً ومدرَّباً على أحدث أساليب التربية والتعليم التفاعلي للأطفال."
    },
    {
      icon: Laptop,
      title: "مناهج عصرية وممتعة",
      desc: "نحول العلم والبرمجة والذكاء الاصطناعي إلى ألعاب ومشاريع مشوقة يستمتع الطفل بتبسيطها وتطبيقها."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>رسالتنا وهدفنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            from نحن في <span className="text-pink-600">Virtual Kids School</span>؟
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {siteConfig.aboutText}
          </p>
        </div>

        {/* 4 Feature Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, index) => {
            const Icon = v.icon;
            return (
              <div
                key={index}
                className="bg-cyan-50/70 hover:bg-white p-8 rounded-3xl border border-cyan-100/80 hover:border-pink-200 shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-pink-500 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
};
