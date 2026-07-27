/// <reference types="vite/client" />

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_BOOKING_WEBHOOK_URL?: string;
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_GOOGLE_SHEETS_CSV_URL?: string;
  readonly VITE_GOOGLE_SHEETS_SITE_CONFIG_URL?: string;
  readonly VITE_GOOGLE_SHEETS_COURSES_URL?: string;
  readonly VITE_GOOGLE_SHEETS_FAQS_URL?: string;
  readonly VITE_GOOGLE_SHEETS_TESTIMONIALS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
