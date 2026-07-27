import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, CheckCircle, Sparkles, User, Users, Baby, Calendar, Phone, Mail, Clock, MessageSquare, ArrowLeft, Laptop } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { activeModal, selectedCourse, courses, closeModals, addBooking, siteConfig, showToast } = useApp();

  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState('');
  const [deviceType, setDeviceType] = useState('لابتوب (Laptop)');
  const [studyMode, setStudyMode] = useState('ضمن مجموعة (Group)');
  const [preferredTime, setPreferredTime] = useState('مسائي (بعد المدرسة)');
  const [notes, setNotes] = useState('');

  const [isSuccessState, setIsSuccessState] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (selectedCourse) {
      setCourseId(selectedCourse.id);
    } else if (courses.length > 0) {
      setCourseId(courses[0].id);
    }
  }, [selectedCourse, courses]);

  if (activeModal !== 'booking') return null;

  const currentCourse = courses.find(c => c.id === courseId) || selectedCourse || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parentName.trim() || !childName.trim() || !childAge.trim() || !phone.trim()) {
      showToast('يرجى ملء كافة الحقول الأساسية المطلوب (*)');
      return;
    }

    // Save booking to App State & LocalStorage
    addBooking({
      parentName: parentName.trim(),
      childName: childName.trim(),
      childAge: childAge.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      courseId: currentCourse?.id || 'general',
      courseTitle: currentCourse?.title || 'دورة غير محددة',
      deviceType,
      studyMode,
      preferredTime,
      notes: notes.trim() || undefined,
    });

    setIsSuccessState(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-cyan-100 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black">حجز حصة تجريبية مجانية</h3>
              <p className="text-xs text-cyan-50 font-bold">Virtual Kids School - تعليم التكنولوجيا للأطفال</p>
            </div>
          </div>

          <button
            onClick={closeModals}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          
          {isSuccessState ? (
            /* Direct Success Confirmation State */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-100 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">تم تسليم طلب الحجز بنجاح! 🎉</h4>
                <p className="text-slate-700 text-base font-medium max-w-md mx-auto leading-relaxed">
                  أهلاً بك أ/ <span className="font-extrabold text-cyan-600">{parentName}</span>. تم تسجيل بيانات البطل الصغير (<span className="font-extrabold text-cyan-600">{childName}</span>) في برنامج (<span className="font-extrabold text-cyan-600">{currentCourse?.title}</span>).
                </p>
              </div>

              {/* Success Info Box */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-right space-y-2 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>ما هي الخطوة القادمة؟</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                  سيتواصل مع حضراتكم فريق المتابعة عبر الواتساب على الرقم (<span className="font-bold dir-ltr inline-block">{phone}</span>) لتحديد موعد الحصة التجريبية المجانية وإرسال رابط القاعة التفاعلية.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={closeModals}
                  className="px-10 py-3.5 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-cyan-200 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  ممتاز، شكراً لكم!
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Selected Course Banner */}
              <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentCourse?.image}
                    alt={currentCourse?.title}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block text-[11px] font-bold text-cyan-600">الدورة المختارة:</span>
                    <span className="block text-base font-black text-slate-900">{currentCourse?.title}</span>
                    <span className="block text-[11px] font-bold text-slate-500">العمر: {currentCourse?.ageGroup} | المدة: {currentCourse?.duration}</span>
                  </div>
                </div>

                {courses.length > 1 && (
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="text-xs font-bold bg-white text-slate-800 border border-cyan-200 rounded-xl px-3 py-2 outline-none cursor-pointer shadow-xs"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-600" />
                    <span>اسم ولي الأمر الكامل *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="مثال: أحمد محمود علي"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                {/* Child Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-cyan-600" />
                    <span>اسم الطفل ثلاثي *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="مثال: عمر أحمد محمود"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                {/* Child Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                    <span>عمر الطفل (من 6 سنوات) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="مثال: 8 سنوات"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>رقم الواتساب / الهاتف للتواصل *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01012345678"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                {/* Device Type Owned */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-cyan-600" />
                    <span>الجهاز المتاح للطفل للحضور والبرمجة *</span>
                  </label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium bg-white"
                  >
                    <option value="لابتوب (Laptop)">لابتوب (Laptop)</option>
                    <option value="كمبيوتر مكتبي (Desktop)">كمبيوتر مكتبي (Desktop PC)</option>
                    <option value="تابلت / آيباد (Tablet / iPad)">تابلت / آيباد (Tablet / iPad)</option>
                    <option value="هاتف ذكي (Smartphone)">هاتف ذكي (Smartphone)</option>
                    <option value="لا يوجد جهاز حالياً">لا يوجد جهاز حالياً</option>
                  </select>
                </div>

                {/* Study Mode (Private vs Group) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    <span>نظام الدراسة المطلوب *</span>
                  </label>
                  <select
                    value={studyMode}
                    onChange={(e) => setStudyMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium bg-white"
                  >
                    <option value="كورس فردي (Private 1-on-1)">كورس فردي (خاص - Private 1-on-1)</option>
                    <option value="ضمن مجموعة (Group)">ضمن مجموعة تفاعلية (Group)</option>
                  </select>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    <span>البريد الإلكتروني (اختياري)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                  />
                </div>

                {/* Preferred Timings */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>المواعيد المناسبة</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium bg-white"
                  >
                    <option value="مسائي (بعد المدرسة)">مسائي (بعد أوقات المدرسة)</option>
                    <option value="صباحي">صباحي (مبكر)</option>
                    <option value="عطلة نهاية الأسبوع (الجمعة والسبت)">عطلة نهاية الأسبوع (الجمعة والسبت)</option>
                    <option value="مرن حسب توفر المجموعة">مرن حسب توفر المجموعة</option>
                  </select>
                </div>

              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-600" />
                  <span>ملاحظات إضافية عن الطفل (اختياري)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="هل للطفل خبرة سابقة في المجال؟ أو أي تفاصيل يفضل أن يعرفها المعلم..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-900 text-sm font-medium"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-black text-base rounded-2xl shadow-xl shadow-cyan-200 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>تأكيد وإرسال طلب الحجز المجاني</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <p className="text-[11px] text-slate-500 text-center font-semibold mt-2.5">
                  🔒 بياناتك آمنة وسنقوم بالتواصل معك فوراً لتأكيد موعد الحصة التجريبية.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
