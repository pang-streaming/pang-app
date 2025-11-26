import { create } from "zustand";

export type Category = "탐색" | "카테고리" | "실시간" | "동영상" | "클립";

interface CategoryStore {
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
    selectedTabCategory: string;
    setSelectedTabCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    selectedCategory: "탐색",
    setSelectedCategory: (category: Category) => set({ selectedCategory: category }),
    selectedTabCategory: "전체",
    setSelectedTabCategory: (category: string) => set({ selectedTabCategory: category }),
}));

