import { create } from 'zustand';

interface AuthStore {
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isSubscribed: false,
  setSubscribed: (value) => set({ isSubscribed: value }),
}));