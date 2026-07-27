import { Course, FAQ, Testimonial, SiteConfig } from '../types';

import heroBannerImg from '../assets/images/hero_kids_coding_1785080320273.jpg';
import scratchImg from '../assets/images/scratch_course_1785074867854.jpg';
import codingImg from '../assets/images/coding_course_1785074879572.jpg';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: "Virtual Kids School",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-virtual-kids-school/viewform",
  whatsappNumber: "201000000000",
  email: "info@virtualkidsschool.com",
  facebookUrl: "https://facebook.com/VirtualKidsSchool",
  instagramUrl: "https://instagram.com/VirtualKidsSchool",
  heroTitle: "نصنع جيل المستقبل بالتكنولوجيا والابتكار.",
  heroSubtitle: "أكاديمية افتراضية متخصصة في تقديم تعليم مباشر أونلاين للأطفال من سن 6 إلى 16 سنة في Scratch والذكاء الاصطناعي (AI for Kids) مع نخبة من المعلمين المتخصصين.",
  aboutText: "Virtual Kids School هي أكاديمية تعليمية رائدة تهدف إلى بناء أجيال مبتكرة ومبدعة من الأطفال من سن 6 إلى 16 سنة. نجمع بين مهارات المستقبل في Scratch والذكاء الاصطناعي (Machine Learning & Chatbots) مع التفكير المنطقي والتطبيقي من داخل المنزل وبأعلى المعايير.",
  heroBannerImage: heroBannerImg,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "scratch-kids",
    title: "Scratch للأطفال",
    category: "scratch",
    shortDescription: "تعلم البرمجة بطريقة ممتعة وتفاعلية عبر مكعبات السحب والإفلات لتصميم الألعاب والقصص (3 مستويات).",
    fullDescription: "دورة Scratch للأطفال صُممت خصيصاً لتأسيس الطفل في مفاهيم البرمجة بدون الحاجة لكتابة كود معقد. ويتدرب الطفل عبر 3 مستويات متدرجة (Beginner - Intermediate - Advanced) يتعلم فيها كيفية ابتكار ألعابه الخاصة، تصميم قصص تفاعلية، وتحويل أفكاره الإبداعية إلى مشاريع حقيقية مع زملائه.",
    image: scratchImg,
    ageGroup: "6 - 11 سنة",
    duration: "8 أسابيع",
    sessionsCount: "12 حصة تفاعلية",
    badge: "الأكثر طلباً للأطفال",
    popular: true,
    levels: ["Beginner (مبتدئ)", "Intermediate (متوسط)", "Advanced (متقدم)"],
    features: [
      "ثلاثة مستويات متدرجة (Beginner, Intermediate, Advanced)",
      "تعلم البرمجة بمكعبات السحب والإفلات السهلة",
      "تصميم الألعاب والقصص المصورة التفاعلية",
      "مشروع تخرج مبتكر بنهاية كل مستوى"
    ],
    skillsLearned: [
      "التفكير المنطقي والخوارزمي",
      "حل المشكلات بتسلسل هندسي",
      "تصميم الألعاب ثنائية الأبعاد",
      "مهارات العرض والتعبير الإبداعي"
    ]
  },
  {
    id: "ai-for-kids",
    title: "الذكاء الاصطناعي للأطفال (AI for Kids)",
    category: "ai",
    shortDescription: "استكشاف عالم الذكاء الاصطناعي وتطبيقات Machine Learning وبناء ألعاب وتطبيقات ذكية وشات بوت.",
    fullDescription: "دورة مستقبلية وممتعة يتعرف فيها الطفل على أساسيات الذكاء الاصطناعي (AI) وتعلم الآلة (Machine Learning for Kids). يتدرب الطفل على بناء مشاريع تفاعلية تجمع بين Scratch والذكاء الاصطناعي، والتعرف الآلي على الصور والأصوات، وإنشاء Chatbot بسيط، مع التركيز التام على الاستخدام الآمن والأخلاقي للتكنولوجيا.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    ageGroup: "8 - 15 سنة",
    duration: "8 أسابيع",
    sessionsCount: "16 حصة تفاعلية",
    badge: "تكنولوجيا المستقبل",
    popular: true,
    levels: ["مقدمة في AI", "Machine Learning", "تطبيقات وشات بوت"],
    features: [
      "مقدمة مبسطة وممتعة في الذكاء الاصطناعي",
      "Machine Learning for Kids بأسلوب تفاعلي",
      "دمج Scratch مع تقنيات AI الحديثة",
      "التعرف على الصور والأصوات وإنشاء Chatbot ذكي",
      "التوعية بالاستخدام الآمن والمسؤول للذكاء الاصطناعي"
    ],
    skillsLearned: [
      "فهم كيفية عمل نماذج الذكاء الاصطناعي",
      "تدريب نماذج التعرف على الصور والصوت",
      "ابتكار مشاريع ذكية تفاعلية",
      "التفكير النقدي والأخلاقي تجاه التكنولوجيا"
    ]
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "ما الأعمار المناسبة للدورات المتاحة بالأكاديمية؟",
    answer: "تستهدف Virtual Kids School الأطفال والناشئين من سن 6 إلى 16 سنة. وتُقسم المجموعات حسب السن والمستوى لضمان أقصى استفادة وتجربة تفاعلية مريحة."
  },
  {
    id: "faq-2",
    question: "كيف يتم التسجيل واختيار موعد الحصة؟",
    answer: "عند الضغط على (احجز درسًا الآن) وتعبئة النموذج المباشر ببيانات طفلك، يصل طلبك فوراً لإدارة الأكاديمية ونقوم بالتواصل معكم عبر الواتساب لتحدِيد الموعد المناسب وتأكيد حجز الحصة التجريبية المجانية."
  },
  {
    id: "faq-3",
    question: "هل توجد حصة تجريبية مجانية للطفل؟",
    answer: "نعم بالتأكيد! نوفر حصة تجريبية مجانية لكل طالب للتعرف على المعلم، تجربة القاعة التفاعلية، وتقييم مستواه واختيار المسار والأجواء المناسبة لشغفه."
  },
  {
    id: "faq-4",
    question: "هل يتم الدفع إلكترونياً داخل الموقع؟",
    answer: "لا يتم الدفع أو إدخال أي بطاقات داخل الموقع مباشرة. يتم تأكيد الحجز والتواصل معكم بعد تعبئة نموذج الحجز للاتفاق على مواعيد الحصة وطريقة الاشتراك الميسرة المناسبة لكم (فودافون كاش، إنستا باي، تحويلات بنكية)."
  },
  {
    id: "faq-5",
    question: "كيف يتابع ولي الأمر مستوى أداء طفله؟",
    answer: "يصل ولي الأمر تقارير دورية عقب الحصص والأسبوعية تتضمن أداء الطفل، المهارات البرمجية ومشاريع الذكاء الاصطناعي التي أتقنها، مع دعم ومتابعة مباشرة عبر الواتساب."
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    parentName: "أ. أمينة المحمدي",
    childInfo: "والدة الطفل يوسف (8 سنوات)",
    rating: 5,
    text: "تجربة رائعة مع Virtual Kids School! يوسف كان خجولاً ولكن مع معلم Scratch أصبح يصمم ألعابه الخاصة وينتظر الحصة بلهفة كل أسبوع.",
    courseName: "Scratch للأطفال",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "test-2",
    parentName: "مهندس/ أحمد حسن",
    childInfo: "والد الطفلة مريم (10 سنوات)",
    rating: 5,
    text: "دورة الذكاء الاصطناعي للأطفال كانت مفاجأة ممتازة! مريم تعلمت كيف تدرب الآلة على التعرف على الصور وابتكرت شات بوت بسيط بنفسها.",
    courseName: "الذكاء الاصطناعي (AI for Kids)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "test-3",
    parentName: "د. هبة الشريف",
    childInfo: "والدة الطفل ياسين (12 سنة)",
    rating: 5,
    text: "ياسين يدرس الذكاء الاصطناعي للأطفال بالأكاديمية. المتابعة مع أسرنا ممتازة جدا والمعلمون صبورون ومتمكنون بشكل باهر. شكراً فريق Virtual Kids School!",
    courseName: "الذكاء الاصطناعي (AI for Kids)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  }
];


