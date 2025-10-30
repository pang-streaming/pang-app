import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
	mode: ThemeMode;
	toggleTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
        (set) => ({
            mode: "system",
            toggleTheme: () =>
                set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" })),
			setTheme: (theme) => set({ mode: theme })
		}),
        { 
            name: "theme-storage",
            storage: createJSONStorage(() => {
                const isWeb = Platform.OS === 'web';
                const webStorage: StateStorage = {
                    getItem: async (name) => {
                        if (typeof window === 'undefined') return null;
                        return window.localStorage.getItem(name);
                    },
                    setItem: async (name, value) => {
                        if (typeof window === 'undefined') return;
                        window.localStorage.setItem(name, value);
                    },
                    removeItem: async (name) => {
                        if (typeof window === 'undefined') return;
                        window.localStorage.removeItem(name);
                    },
                };

                const secureStorage: StateStorage = {
                    getItem: async (name) => {
                        try { return (await SecureStore.getItemAsync(name)) ?? null; } catch { return null; }
                    },
                    setItem: async (name, value) => {
                        try { await SecureStore.setItemAsync(name, value); } catch {}
                    },
                    removeItem: async (name) => {
                        try { await SecureStore.deleteItemAsync(name); } catch {}
                    },
                };

                return isWeb ? webStorage : secureStorage;
            })
        }
	)
);


