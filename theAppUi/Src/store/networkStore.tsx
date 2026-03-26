import { create } from 'zustand';

export const useNetworkStore = create((set) => ({
  setConnectedStatus: async (status) => {
    set({ connectedStatus: status });
  },
  connectedStatus: true, // first ;pad
}));
