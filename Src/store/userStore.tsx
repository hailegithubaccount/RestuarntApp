import {create} from 'zustand';
import {removeData, storeData} from '../utility/storage';



interface UserStore {
  user: any;
  err: boolean;
  logout: () => Promise<void>;
  setUser: (user: any) => Promise<void>;
  setError: (err: boolean) => void;
}

export const useUserStore = create<UserStore>(set => ({
  logout: async () => {
    set({user: undefined});
    // set({fetching: false});
    await removeData('user');
  },
  setUser: async (user: any) => {
    set({user});
    await storeData('user',user);
  },
  setError: (err: any) => set({err}),
  user: undefined,
  err: false,
}));
