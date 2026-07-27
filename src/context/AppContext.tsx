import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, FAQ, Testimonial, SiteConfig, Booking } from '../types';
import { INITIAL_SITE_CONFIG, INITIAL_COURSES, INITIAL_FAQS, INITIAL_TESTIMONIALS } from '../data/initialData';
import { fetchGoogleSheetsContent, submitBookingToGoogleSheet } from '../data/googleSheets';

interface AppContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  faqs: FAQ[];
  addFaq: (faq: Omit<FAQ, 'id'>) => void;
  updateFaq: (id: string, updated: Partial<FAQ>) => void;
  deleteFaq: (id: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  bookings: Booking[];
  addBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  clearAllBookings: () => void;
  resetToDefaultData: () => void;
  
  // Modals state
  activeModal: 'booking' | 'courseDetail' | 'admin' | null;
  selectedCourse: Course | null;
  openBookingModal: (course?: Course | null) => void;
  openCourseDetailModal: (course: Course) => void;
  openAdminModal: () => void;
  closeModals: () => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'avs_site_config',
  COURSES: 'avs_courses',
  FAQS: 'avs_faqs',
  TESTIMONIALS: 'avs_testimonials',
  BOOKINGS: 'avs_bookings',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        let updated = false;
        if (!parsed.heroBannerImage || parsed.heroBannerImage !== INITIAL_SITE_CONFIG.heroBannerImage) {
          parsed.heroBannerImage = INITIAL_SITE_CONFIG.heroBannerImage;
          updated = true;
        }
        if (!parsed.siteName || parsed.siteName.includes('Aswan') || parsed.siteName.includes('أسوان')) {
          parsed.siteName = INITIAL_SITE_CONFIG.siteName;
          updated = true;
        }
        if (parsed.heroSubtitle?.includes('الفرنسية') || parsed.heroSubtitle?.includes('القرآن') || parsed.aboutText?.includes('الفرنسية') || parsed.aboutText?.includes('القرآن') || parsed.aboutText?.includes('أسوان') || parsed.aboutText?.includes('Aswan')) {
          parsed.heroSubtitle = INITIAL_SITE_CONFIG.heroSubtitle;
          parsed.heroTitle = INITIAL_SITE_CONFIG.heroTitle;
          parsed.aboutText = INITIAL_SITE_CONFIG.aboutText;
          updated = true;
        }
        if (updated) {
          localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(parsed));
        }
        return { ...INITIAL_SITE_CONFIG, ...parsed };
      }
      return INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        const valid = parsed.filter((c: any) => 
          c.category !== 'languages' && 
          c.category !== 'quran' && 
          c.category !== 'programming' &&
          c.id !== 'french-kids' && 
          c.id !== 'quran-kids' &&
          c.id !== 'coding-fundamentals' &&
          c.id !== 'python-coding'
        ).map((c: any) => {
          if (c.id === 'scratch-kids') {
            return { ...c, duration: '8 أسابيع' };
          }
          return c;
        });
        // Ensure initial courses like scratch-kids and ai-for-kids exist
        const missingInitial = INITIAL_COURSES.filter(ic => !valid.some((c: any) => c.id === ic.id));
        const combined = [...valid, ...missingInitial];
        if (combined.length > 0) {
          localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(combined));
          return combined;
        }
      }
      return INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeModal, setActiveModal] = useState<'booking' | 'courseDetail' | 'admin' | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRemoteDataLoaded, setIsRemoteDataLoaded] = useState(false);

  useEffect(() => {
    const loadRemoteData = async () => {
      try {
        const remoteData = await fetchGoogleSheetsContent();
        if (remoteData) {
          setSiteConfig(prev => ({ ...prev, ...remoteData.siteConfig }));
          setCourses(remoteData.courses);
          setFaqs(remoteData.faqs);
          setTestimonials(remoteData.testimonials);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsRemoteDataLoaded(true);
      }
    };

    loadRemoteData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error(e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    if (!isRemoteDataLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig, courses, faqs, testimonials, isRemoteDataLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...newConfig }));
    showToast("تم تحديث إعدادات الموقع بنجاح!");
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast("تم إضافة الدورة الجديدة بنجاح!");
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    showToast("تم تعديل بيانات الدورة!");
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast("تم حذف الدورة!");
  };

  const addFaq = (faqData: Omit<FAQ, 'id'>) => {
    const newFaq: FAQ = {
      ...faqData,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
    showToast("تم إضافة السؤال الشائع بنجاح!");
  };

  const updateFaq = (id: string, updated: Partial<FAQ>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    showToast("تم تحديث السؤال!");
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast("تم حذف السؤال!");
  };

  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testData,
      id: `test-${Date.now()}`
    };
    setTestimonials(prev => [newTest, ...prev]);
    showToast("تم إضافة التقييم بنجاح!");
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast("تم حذف التقييم!");
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);

    void submitBookingToGoogleSheet(newBooking, siteConfig).then(result => {
      if (!result.ok) {
        console.warn('Booking was saved locally but not synced to Google Sheets.', result);
      }
    });

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast("تم تحديث حالة الحجز!");
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast("تم حذف الحجز من السجل!");
  };

  const clearAllBookings = () => {
    setBookings([]);
    showToast("تم إفراغ قائمة الحجوزات!");
  };

  const resetToDefaultData = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setCourses(INITIAL_COURSES);
    setFaqs(INITIAL_FAQS);
    setTestimonials(INITIAL_TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    showToast("تم إعادة ضبط البيانات الافتراضية بنجاح!");
  };

  const openBookingModal = (course?: Course | null) => {
    setSelectedCourse(course || courses[0] || null);
    setActiveModal('booking');
  };

  const openCourseDetailModal = (course: Course) => {
    setSelectedCourse(course);
    setActiveModal('courseDetail');
  };

  const openAdminModal = () => {
    setActiveModal('admin');
  };

  const closeModals = () => {
    setActiveModal(null);
    setSelectedCourse(null);
  };

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        clearAllBookings,
        resetToDefaultData,
        activeModal,
        selectedCourse,
        openBookingModal,
        openCourseDetailModal,
        openAdminModal,
        closeModals,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
