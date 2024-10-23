import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';

const useLocalization = () => {
  const { t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const addNewLanguage = (language: string) => {
    const languages = i18n.languages || [];
    if (!languages.includes(language)) {
      i18n.languages = [...languages, language];
      i18n.addResourceBundle(language, 'translation', {});
      if (typeof window !== 'undefined') {
        fetch(`${process.env.PUBLIC_URL || ''}/locales/${language}/translation.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
      }
    }
  };

  const editExistingLanguage = (oldLanguage: string, newLanguage: string) => {
    if (oldLanguage !== 'en') {
      const languages = i18n.languages || [];
      const updatedLanguages = languages.map(lang => lang === oldLanguage ? newLanguage : lang);
      if (i18n.services?.resourceStore?.data) {
        i18n.services.resourceStore.data[newLanguage] = i18n.services.resourceStore.data[oldLanguage];
        delete i18n.services.resourceStore.data[oldLanguage];
      }
      i18n.languages = updatedLanguages;
    }
  };

  const removeExistingLanguage = (language: string) => {
    if (language !== 'en') {
      const languages = i18n.languages || [];
      i18n.languages = languages.filter(lang => lang !== language);
      if (i18n.services?.resourceStore?.data) {
        delete i18n.services.resourceStore.data[language];
      }
    }
  };

  return {
    t,
    changeLanguage,
    currentLanguage: i18n.language,
    addNewLanguage,
    editExistingLanguage,
    removeExistingLanguage,
  };
};

export default useLocalization;
