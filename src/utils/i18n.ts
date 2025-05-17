import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../utils/en.json';
import vi from '../utils/vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'vi',
  lng: 'vi',
  interpolation: {
    escapeValue: false,
  },
});

export const setAppLanguage = async (lang: string) => {
  await AsyncStorage.setItem('appLanguage', lang);
  i18n.changeLanguage(lang);
};

export const initAppLanguage = async () => {
  const lang = await AsyncStorage.getItem('appLanguage');
  if (lang) {
    i18n.changeLanguage(lang);
  }
};

export default i18n;
