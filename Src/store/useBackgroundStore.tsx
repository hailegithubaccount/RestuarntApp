import { create } from 'zustand';
import { storeData, getData } from '../utility/storage';

const defaultBackground = {
  uri: 'https://media.istockphoto.com/id/1623303770/photo/creative-background-image-is-blurred-evening-city-lights-and-light-snowfall.webp?b=1&s=612x612&w=0&k=20&c=--I6QisPR7yGmgujOI2co8U3FIK5tBv6xAjMup67ghc=',
};

interface BackgroundStore {
  background: any;
  setBackground: (image: any) => Promise<void>;
  clearBackground: () => Promise<void>;

}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
  background: defaultBackground, 

  setBackground: async (image) => {
    set({ background: image });
    await storeData('background', image);
  },

  clearBackground: async () => {
    set({ background: defaultBackground }); // ✅ reset to default
    await storeData('background', defaultBackground);
  },

 
}));


