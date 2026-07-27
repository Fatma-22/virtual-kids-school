import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { Sparkles, Clock, Users, BookOpen, ArrowLeft, CheckCircle, Flame, Puzzle, Bot, Code2, Layers } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, openBookingModal, openCourseDetailModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'جميع البرامج', icon: Sparkles },
    { id: 'scratch', label: 'Scratch للأطفال', icon: Puzzle },
    { id: 'ai', label: 'الذكاء الاصطناعي (AI)', icon: Bot },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  const getCategoryLabel = (cat: Course['category']) => {
    switch(cat) {
      case 'scratch': return 'Scratch للأطفال';
      case 'ai': return 'الذكاء الاصطناعي (AI)';
      case 'programming': return 'البرمجة والتطوير';
      default: return 'دورة متخصصة';
    }
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-tr from-cyan-50/60 via-white/70 to-pink-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-cyan-100 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <BookOpen className="w-4 h-4 text-cyan-600" />
            <span>برامج أكاديمية Virtual Kids School</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            دورات أونلاين تفاعلية مصممة للأطفال
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            اختر المسار المناسب لشغف طفلك وعمره: Scratch أو الذكاء الاصطناعي (AI for Kids).
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg shadow-cyan-200 scale-105'
                    : 'bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white border border-cyan-100 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-600'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: Course) => (
            <div
              key={course.id}
              className="p-6 rounded-[32px] bg-white/70 backdrop-blur-xl border border-cyan-100/80 shadow-xl hover:shadow-2xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6 bg-cyan-50 border border-cyan-100/70 shadow-inner">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badge Overlay */}
                  {course.badge && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md">
                      <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{course.badge}</span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    {getCategoryLabel(course.category)}
                  </div>
                </div>

                {/* Meta Specs (Age & Duration) */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border border-white/60 px-2.5 py-1 rounded-xl shadow-xs">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{course.ageGroup}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border border-white/60 px-2.5 py-1 rounded-xl shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium mb-4">
                  {course.shortDescription}
                </p>

                {/* Levels Badges if available */}
                {course.levels && course.levels.length > 0 && (
                  <div className="mb-4">
                      <span className="text-[11px] font-bold text-cyan-700 flex items-center gap-1 mb-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>المستويات المتاحة:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.levels.map((lvl, idx) => (
                        <span key={idx} className="text-[10px] font-extrabold bg-cyan-50 text-cyan-700 border border-cyan-200/80 px-2.5 py-1 rounded-lg">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Bullet List */}
                <div className="space-y-1.5 mb-6 bg-white/40 backdrop-blur-sm p-3.5 rounded-2xl border border-white/60">
                  {course.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-white/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => openCourseDetailModal(course)}
                  className="px-3 py-2 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1 cursor-pointer"
                >
                  <span>تفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openBookingModal(course)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-cyan-200 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  احجز الآن
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
