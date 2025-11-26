import { create } from "zustand";

interface AuthRegisterStoreType {
	email: string;
    id: string;
    password: string;
    confirmPassword: string;
    year: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    allAgree: boolean;
    termAgree: boolean;
    privacyAgree: boolean;
    setEmail: (value: string) => void;
    setId: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setAllAgree: (value: boolean) => void;
    setTermAgree: (value: boolean) => void;
    setPrivacyAgree: (value: boolean) => void;
    reset: () => void;
}

export const useAuthRegisterStore = create<AuthRegisterStoreType>((set) => ({
    email: "",
    id: "",
    password: "",
    confirmPassword: "",
    year: "",
    gender: "MALE",
    allAgree: false,
    termAgree: false,
    privacyAgree: false,
    setEmail: (value: string) => set({ email: value }),
    setId: (value: string) => set({ id: value }),
    setPassword: (value: string) => set({ password: value }),
    setConfirmPassword: (value: string) => set({ confirmPassword: value }),
    setAllAgree: (value: boolean) => set({ allAgree: value, termAgree: value, privacyAgree: value }),
    setTermAgree: (value: boolean) => set((state) => {
        const termAgree = value;
        const allAgree = termAgree && state.privacyAgree;
        return { termAgree, allAgree };
    }),
    setPrivacyAgree: (value: boolean) => set((state) => {
        const privacyAgree = value;
        const allAgree = state.termAgree && privacyAgree;
        return { privacyAgree, allAgree };
    }),
    reset: () => set({
        email: "",
        id: "",
        password: "",
        confirmPassword: "",
        year: "",
        gender: "MALE",
        allAgree: false,
        termAgree: false,
        privacyAgree: false,
    }),
}));