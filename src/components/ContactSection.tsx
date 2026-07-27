import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Phone, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('يرجى كتابة الاسم ورقم الهاتف على الأقل');
      return;
    }
    setSubmitted(true);
    showToast('تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا قريباً.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Phone className="w-4 h-4 text-cyan-600" />
            <span>نحن في خدمتك دائماً</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            تواصل معنا
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            يسعدنا استقبال استفساراتكم واقتراحاتكم في أي وقت، ومساعدتكم في اختيار المسار الأنسب لطفلكم.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 mb-2">أرسل لنا استفسارك مباشرة</h3>
          <p className="text-slate-600 text-sm font-medium mb-6">
            قم بتعبئة الخانات التالية وسيتواصل معك فريق الاستشارات التعليمية في أقرب وقت.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center py-12">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-emerald-900 mb-2">شكراً لتواصلك معنا!</h4>
              <p className="text-emerald-700 text-sm font-medium">
                تم استلام رسالتك بنجاح، وسنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك بالكامل"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 text-sm font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010xxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  البريد الإلكتروني (اختياري)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 text-sm font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  موضوع الرسالة
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="استفسار عن دورة معينة / المواعيد / الملاحظات"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 text-sm font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نص الرسالة
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب استفسارك هنا..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-900 text-sm font-medium transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
