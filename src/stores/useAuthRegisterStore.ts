import { create } from "zustand";

interface AuthRegisterStoreType {
	email: string;
    password: string;
    confirmPassword: string;
    year: string
    gender:  "MALE" | "FEMALE" | "OTHER"
    allAgree: boolean;
    termAgree: boolean;
    privacyAgree: boolean;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setAllAgree: (value: boolean) => void;
    setTermAgree: (value: boolean) => void;
    setPrivacyAgree: (value: boolean) => void;
}

export const useAuthRegisterStore = create<AuthRegisterStoreType>((set) => ({
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
    gender: "MALE",
    allAgree: false,
    termAgree: false,
    privacyAgree: false,
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
}));