import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const isClient = typeof window !== 'undefined';

const updateLanguages = (languages: string[]) => {
  if (isClient) {
    localStorage.setItem('languages', JSON.stringify(languages));
    i18n.services.languageDetector.cacheUserLanguage(languages[0]);
  }
};

const getLanguages = (): string[] => {
  if (isClient) {
    const storedLanguages = localStorage.getItem('languages');
    return storedLanguages ? JSON.parse(storedLanguages) : ['en'];
  }
  return ['en'];
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: getLanguages(),
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: isClient ? ['localStorage', 'cookie'] : [],
    },
    backend: {
      loadPath: `${process.env.PUBLIC_URL || ''}/locales/{{lng}}/translation.json`,
    },
  });

const addLanguage = (language: string) => {
  const languages = getLanguages();
  if (!languages.includes(language)) {
    languages.push(language);
    updateLanguages(languages);
    i18n.reloadResources(language);
  }
};

const removeLanguage = (language: string) => {
  if (language !== 'en') {
    const languages = getLanguages().filter(lang => lang !== language);
    updateLanguages(languages);
    i18n.removeResourceBundle(language, 'translation');
  }
};

const editLanguage = (oldLanguage: string, newLanguage: string) => {
  if (oldLanguage !== 'en') {
    const languages = getLanguages().map(lang => lang === oldLanguage ? newLanguage : lang);
    updateLanguages(languages);
    i18n.removeResourceBundle(oldLanguage, 'translation');
    i18n.reloadResources(newLanguage, 'translation');
  }
};

export { i18n as default, addLanguage, removeLanguage, editLanguage, getLanguages };
