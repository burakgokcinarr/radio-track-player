import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import { getLocales } from 'expo-localization';
import { en, tr } from './lang'
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng:  getLocales()[0].languageCode,       // getLocales()[0].languageCode => bu kod debug mod haricinde eklenmelidir.
  fallbackLng: 'en',
  resources: {
    en: en,
    tr: tr
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;