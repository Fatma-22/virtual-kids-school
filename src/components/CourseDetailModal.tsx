import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, Clock, Calendar, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const { activeModal, selectedCourse, closeModals, openBookingModal } = useApp();

  if (activeModal !== 'courseDetail' || !selectedCourse) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header Image Banner */}
        <div className="relative h-64 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={closeModals}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 right-6 left-6 text-white">
            <span className="inline-block bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-md mb-2">
              {selectedCourse.badge || "دورة معتمدة للأطفال"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-1">
              {selectedCourse.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-500">الفئة العمرية</span>
                <span className="block text-sm font-extrabold text-slate-900">{selectedCourse.ageGroup}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-500">مدة الدورة</span>
                <span className="block text-sm font-extrabold text-slate-900">{selectedCourse.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-500">عدد الحصص</span>
                <span className="block text-sm font-extrabold text-slate-900">{selectedCourse.sessionsCount}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-600" />
              <span>نبذة عن الدورة</span>
            </h3>
            <p className="text-slate-700 text-base leading-relaxed font-medium">
              {selectedCourse.fullDescription}
            </p>
          </div>

          {/* Skills Learned */}
          {selectedCourse.skillsLearned && selectedCourse.skillsLearned.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-600" />
                <span>المهارات التي سيكتسبها الطفل</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourse.skillsLearned.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-cyan-50/60 border border-cyan-100 text-slate-800 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features / Outline */}
          {selectedCourse.features && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <span>مميزات ومحاور الدورة</span>
              </h3>
              <ul className="space-y-2">
                {selectedCourse.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="block text-xs font-bold text-slate-500">حصة تجريبية مجانية</span>
            <span className="block text-sm font-black text-slate-900">الأماكن محدودة لضمان الجودة والتفاعل</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={closeModals}
              className="px-5 py-3 text-slate-700 font-bold text-sm hover:bg-slate-200 rounded-xl transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={() => {
                closeModals();
                openBookingModal(selectedCourse);
              }}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              احجز مكان طفلك الآن
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
