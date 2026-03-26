import { create } from 'zustand';
import { storeData, getData } from '../utility/storage';

interface TableNumberStore {
  tableNumber: any;
  setTableNumber: (number: any) => Promise<void>;
  clearTableNumber: () => Promise<void>;
 
}

export const useTableNumberStore = create<TableNumberStore>((set) => ({
  tableNumber: null,

  // Set and persist the table number
  setTableNumber: async (number) => {
    set({ tableNumber: number });
    await storeData('tableNumber', number);
  },

  // Clear both the state and persisted storage
  clearTableNumber: async () => {
    set({ tableNumber: null });
    await storeData('tableNumber', null);
  },

 
}));
