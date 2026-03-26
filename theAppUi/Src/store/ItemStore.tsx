import { create } from 'zustand';
import { storeData, getData, removeData } from '../utility/storage';

interface ItemStore {
  item: any;
  setItem: (item: any) => Promise<void>;
  clearItem: () => Promise<void>;
}

export const useItemStore = create<ItemStore>(set => ({
  item: undefined,

  setItem: async item => {
    set({ item });
    await storeData('item', item);
  },

  clearItem: async () => {
    set({ item: undefined });
    await removeData('item');
  },
}));
