import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en.json';
import translationHI from './locales/hi.json';
import translationUR from './locales/ur.json';
import translationPA from './locales/pa.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  ur: { translation: translationUR },
  pa: { translation: translationPA },
};

i18n
  .use(LanguageDetector) // Detects user's language preference
  .use(initReactI18next)  // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',    // Default language
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
