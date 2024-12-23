import { create } from 'zustand';
import { AuthType } from '@/types';

interface AuthState {
  auth: AuthType | null; 
  setAuth: (auth: AuthType) => void; 
  clearAuth: () => void; 
}

const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }), 
  clearAuth: () => set({ auth: null }),
}));

export default useAuthStore;
