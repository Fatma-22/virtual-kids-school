import { Booking, Course, FAQ, SiteConfig, Testimonial } from '../types';
import { INITIAL_SITE_CONFIG, INITIAL_COURSES, INITIAL_FAQS, INITIAL_TESTIMONIALS } from './initialData';

interface GoogleSheetsContent {
  siteConfig: SiteConfig;
  courses: Course[];
  faqs: FAQ[];
  testimonials: Testimonial[];
}

const parseBoolean = (value?: string) => {
  const normalized = (value || '').toLowerCase().trim();
  if (['true', 'yes', 'y', '1', 'on'].includes(normalized)) return true;
  if (['false', 'no', 'n', '0', 'off'].includes(normalized)) return false;
  return undefined;
};

const parseList = (value?: string) => {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      // fall through to split logic
    }
  }

  return trimmed
    .split(/\||\n|;/)
    .map(item => item.trim())
    .filter(Boolean);
};

const normalizeUrl = (url?: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.includes('/export?')) return trimmed;
  if (trimmed.includes('/pubhtml')) return trimmed.replace('/pubhtml', '/export?format=csv');
  if (trimmed.includes('/edit')) {
    return trimmed.replace(/\/edit.*$/, '/export?format=csv&gid=0');
  }
  if (trimmed.includes('/spreadsheets/d/')) {
    return `${trimmed.replace(/\/$/, '')}/export?format=csv&gid=0`;
  }
  return trimmed;
};

const parseCsv = (csv: string) => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1;
      }
      currentRow.push(currentValue);
      if (currentRow.some(cell => cell.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentValue = '';
      continue;
    }

    currentValue += char;
  }

  if (currentValue.length > 0 || currentRow.length > 0) {
    currentRow.push(currentValue);
    if (currentRow.some(cell => cell.trim() !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
};

const parseRows = (csv: string) => {
  const rows = parseCsv(csv);
  if (rows.length === 0) return [];

  const headers = rows[0].map(header => header.trim().toLowerCase());
  return rows.slice(1).map(row => {
    const item: Record<string, string> = {};
    headers.forEach((header, index) => {
      item[header] = row[index] ?? '';
    });
    return item;
  });
};

const buildSiteConfig = (rows: Record<string, string>[]) => {
  const first = rows.find(row => Object.keys(row).some(key => ['siteName', 'heroTitle', 'heroSubtitle', 'aboutText'].includes(key))) || rows[0];
  if (!first) return INITIAL_SITE_CONFIG;

  return {
    ...INITIAL_SITE_CONFIG,
    siteName: first.sitename || first.site_name || first.siteName || INITIAL_SITE_CONFIG.siteName,
    googleFormUrl: first.googleformurl || first.googleFormUrl || first.google_form_url || INITIAL_SITE_CONFIG.googleFormUrl,
    whatsappNumber: first.whatsappnumber || first.whatsappNumber || first.whatsapp_number || INITIAL_SITE_CONFIG.whatsappNumber,
    email: first.email || INITIAL_SITE_CONFIG.email,
    facebookUrl: first.facebookurl || first.facebookUrl || first.facebook_url || INITIAL_SITE_CONFIG.facebookUrl,
    instagramUrl: first.instagramurl || first.instagramUrl || first.instagram_url || INITIAL_SITE_CONFIG.instagramUrl,
    heroTitle: first.herotitle || first.heroTitle || first.hero_title || INITIAL_SITE_CONFIG.heroTitle,
    heroSubtitle: first.herosubtitle || first.heroSubtitle || first.hero_subtitle || INITIAL_SITE_CONFIG.heroSubtitle,
    aboutText: first.abouttext || first.aboutText || first.about_text || INITIAL_SITE_CONFIG.aboutText,
    heroBannerImage: first.herobannerimage || first.heroBannerImage || first.hero_banner_image || INITIAL_SITE_CONFIG.heroBannerImage,
  } as SiteConfig;
};

const buildCourses = (rows: Record<string, string>[]) => {
  if (!rows.length) return INITIAL_COURSES;

  return rows
    .filter(row => row.title || row.shortdescription || row.fulldescription)
    .map(row => {
      const category = (row.category || row.type || 'other').toLowerCase();
      const popular = parseBoolean(row.popular || row.ispopular || row.isPopular);
      const features = parseList(row.features || row.featurelist || row.feature_list);
      const skillsLearned = parseList(row.skillslearned || row.skillsLearned || row.skills_learned || row.skills);
      const levels = parseList(row.levels || row.level_list);
      const stage = row.stage || row.schoolstage || row.schoolStage || row.grade || row.level || '';
      const language = row.language || row.lang || row.languageofinstruction || row.instructionlanguage || '';

      return {
        id: `sheet-course-${Math.random().toString(36).slice(2, 8)}`,
        title: row.title || 'دورة جديدة',
        category: (category === 'ai' ? 'ai' : category === 'scratch' ? 'scratch' : category === 'programming' ? 'programming' : category === 'ict' ? 'ict' : 'other') as Course['category'],
        shortDescription: row.shortdescription || row.shortDescription || row.short_description || '',
        fullDescription: row.fulldescription || row.fullDescription || row.full_description || '',
        image: row.image || INITIAL_COURSES[0]?.image || '',
        ageGroup: row.agegroup || row.ageGroup || row.age_group || 'غير محدد',
        duration: row.duration || 'غير محدد',
        sessionsCount: row.sessionscount || row.sessionsCount || row.sessions_count || 'غير محدد',
        stage: stage || undefined,
        language: language || undefined,
        badge: row.badge || '',
        popular: popular ?? false,
        levels: levels.length ? levels : undefined,
        features,
        skillsLearned,
      } as Course;
    });
};

const buildFaqs = (rows: Record<string, string>[]) => {
  if (!rows.length) return INITIAL_FAQS;

  return rows
    .filter(row => row.question || row.answer)
    .map((row, index) => ({
      id: `sheet-faq-${index + 1}`,
      question: row.question || row.title || 'سؤال جديد',
      answer: row.answer || row.text || 'إجابة جديدة',
    })) as FAQ[];
};

const buildTestimonials = (rows: Record<string, string>[]) => {
  if (!rows.length) return INITIAL_TESTIMONIALS;

  return rows
    .filter(row => row.parentname || row.text)
    .map((row, index) => ({
      id: `sheet-testimonial-${index + 1}`,
      parentName: row.parentname || row.parentName || 'ولي أمر',
      childInfo: row.childinfo || row.childInfo || row.child_info || '',
      rating: Number(row.rating || 5) || 5,
      text: row.text || row.feedback || 'تقييم جديد',
      courseName: row.coursename || row.courseName || row.course_name || 'دورة عامة',
      avatar: row.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    })) as Testimonial[];
};

const fetchCsv = async (url: string) => {
  const response = await fetch(url, { headers: { Accept: 'text/csv,text/plain' } });
  if (!response.ok) {
    throw new Error(`فشل تحميل البيانات من Google Sheets: ${response.status}`);
  }
  return response.text();
};

export const submitBookingToGoogleSheet = async (booking: Booking, siteConfig?: Partial<SiteConfig>) => {
  const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL?.trim() || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return { ok: false, reason: 'missing-webhook' };
  }

  const payload = JSON.stringify({
    timestamp: booking.createdAt,
    bookingId: booking.id,
    parentName: booking.parentName,
    childName: booking.childName,
    childAge: booking.childAge,
    phone: booking.phone,
    email: booking.email || '',
    courseId: booking.courseId,
    courseTitle: booking.courseTitle,
    deviceType: booking.deviceType || '',
    studyMode: booking.studyMode || '',
    preferredTime: booking.preferredTime,
    schoolStage: booking.schoolStage || '',
    schoolName: booking.schoolName || '',
    courseLanguage: booking.courseLanguage || '',
    notes: booking.notes || '',
    status: booking.status,
    siteName: siteConfig?.siteName || INITIAL_SITE_CONFIG.siteName,
  });

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const sent = navigator.sendBeacon(webhookUrl, payload);
      return { ok: sent, reason: sent ? 'beacon-sent' : 'beacon-failed' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: payload,
      keepalive: true,
      mode: 'no-cors',
    });

    return { ok: true, status: response.type === 'opaque' ? 0 : response.status };
  } catch (error) {
    console.error(error);
    return { ok: false, reason: 'request-failed' };
  }
};

export const fetchGoogleSheetsContent = async (): Promise<GoogleSheetsContent | null> => {
  const generalUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL?.trim();
  const siteConfigUrl = import.meta.env.VITE_GOOGLE_SHEETS_SITE_CONFIG_URL?.trim();
  const coursesUrl = import.meta.env.VITE_GOOGLE_SHEETS_COURSES_URL?.trim();
  const faqsUrl = import.meta.env.VITE_GOOGLE_SHEETS_FAQS_URL?.trim();
  const testimonialsUrl = import.meta.env.VITE_GOOGLE_SHEETS_TESTIMONIALS_URL?.trim();

  const hasAnyConfig = Boolean(generalUrl || siteConfigUrl || coursesUrl || faqsUrl || testimonialsUrl);
  if (!hasAnyConfig) return null;

  try {
    const siteConfigRows = siteConfigUrl ? parseRows(await fetchCsv(normalizeUrl(siteConfigUrl))) : [];
    const courseRows = coursesUrl ? parseRows(await fetchCsv(normalizeUrl(coursesUrl))) : [];
    const faqRows = faqsUrl ? parseRows(await fetchCsv(normalizeUrl(faqsUrl))) : [];
    const testimonialRows = testimonialsUrl ? parseRows(await fetchCsv(normalizeUrl(testimonialsUrl))) : [];

    if (generalUrl) {
      const generalRows = parseRows(await fetchCsv(normalizeUrl(generalUrl)));
      const sectionedRows = generalRows.filter(row => row.section || row.type || row.sheet);
      if (sectionedRows.length > 0) {
        const grouped = sectionedRows.reduce<Record<string, Record<string, string>[]>>((acc, row) => {
          const key = (row.section || row.type || row.sheet || '').toLowerCase();
          if (!acc[key]) acc[key] = [];
          acc[key].push(row);
          return acc;
        }, {});

        return {
          siteConfig: buildSiteConfig(grouped.siteconfig || grouped.site_config || grouped.config || []),
          courses: buildCourses(grouped.courses || []),
          faqs: buildFaqs(grouped.faqs || grouped.questions || []),
          testimonials: buildTestimonials(grouped.testimonials || grouped.reviews || []),
        };
      }

      const inferredSiteConfig = buildSiteConfig(generalRows.filter(row => Object.keys(row).some(key => ['siteName', 'heroTitle', 'heroSubtitle', 'aboutText'].includes(key))));
      const inferredCourses = buildCourses(generalRows.filter(row => Object.keys(row).some(key => ['title', 'shortdescription', 'fulldescription'].includes(key))));
      const inferredFaqs = buildFaqs(generalRows.filter(row => Object.keys(row).some(key => ['question', 'answer'].includes(key))));
      const inferredTestimonials = buildTestimonials(generalRows.filter(row => Object.keys(row).some(key => ['parentname', 'text', 'rating'].includes(key))));

      return {
        siteConfig: inferredSiteConfig,
        courses: inferredCourses,
        faqs: inferredFaqs,
        testimonials: inferredTestimonials,
      };
    }

    return {
      siteConfig: buildSiteConfig(siteConfigRows),
      courses: buildCourses(courseRows),
      faqs: buildFaqs(faqRows),
      testimonials: buildTestimonials(testimonialRows),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
