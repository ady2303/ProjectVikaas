import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define types for translations
export interface TranslationKeys {
  carpentry: string;
  masonry: string;
  selectLanguage: string;
  carpentryDescription: string;
  masonryDescription: string;
  chooseOption: string;
}

type Resources = {
  [key: string]: {
    translation: TranslationKeys;
  };
};

const resources: Resources = {
  en: {
    translation: {
      carpentry: 'Carpentry',
      masonry: 'Masonry',
      selectLanguage: 'Select Language',
      chooseOption: 'What would you like to work on?',
      carpentryDescription: 'Select this for woodworking and furniture making',
      masonryDescription: 'Select this for brick, stone, and concrete work',
    },
  },
  hi: {
    translation: {
      carpentry: 'बढ़ईगीरी',
      masonry: 'राजमिस्त्री का काम',
      selectLanguage: 'भाषा चुनें',
      chooseOption: 'आप किस पर काम करना चाहेंगे?',
      carpentryDescription: 'लकड़ी का काम और फर्नीचर बनाने के लिए यह चुनें',
      masonryDescription: 'ईंट, पत्थर और कंक्रीट के काम के लिए यह चुनें',
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;