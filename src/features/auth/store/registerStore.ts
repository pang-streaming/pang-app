import { create } from "zustand";

interface RegisterState {
  step: number;
  email: string;
  password: string;
  id: string;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setId: (id: string) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  email: "",
  password: "",
  id: "",
  setStep: (step) => set({ step }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setId: (id) => set({ id }),
  reset: () =>
    set({
      step: 1,
      email: "",
      password: "",
      id: "",
    }),
}));
