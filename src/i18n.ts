import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des fichiers de traduction
import fr from './locales/fr.json';
import en from './locales/en.json';
import yo from './locales/yo.json';
import es from './locales/es.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  yo: { translation: yo },
  es: { translation: es },
  de: { translation: de },
  zh: { translation: zh },
};

// Détection automatique de la langue préférée
const getInitialLanguage = () => {
  // 1. Vérifier la langue sauvegardée dans localStorage
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && resources[savedLanguage]) {
    return savedLanguage;
  }
  
  // 2. Vérifier la langue du navigateur
  const browserLang = navigator.language.split('-')[0];
  if (resources[browserLang]) {
    return browserLang;
  }
  
  // 3. Par défaut français
  return 'fr';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'fr',
    supportedLngs: Object.keys(resources),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
