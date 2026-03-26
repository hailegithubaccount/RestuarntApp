/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { storeData } from '../utility/storage';
import am from '../Translation/am.json';
import en from '../Translation/en.json';

interface TranslationStore {
  currentLanguage: string;
  translation: any;
  setCurrentLanguage: (language: string) => Promise<void>;
}

export const useTranslationStore = create<TranslationStore>(set => ({
  currentLanguage: 'en',
  translation: en,
  setCurrentLanguage: async (language: string) => {
    try {
      await storeData('currentLanguage', { language });
      set({ currentLanguage: language });
      if (language === 'am') {
        set({ translation: am, currentLanguage: language });
      } else if (language === 'en') {
        set({ translation: en, currentLanguage: language });
      }
    } catch (error) {
      console.error('Error setting language:', error);
    }
  },
}));
