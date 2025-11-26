import { useCallback, useState } from "react";
import { Category, CategoryLiveResponse } from "./type";
import { fetchCategory, fetchCategoryLives, fetchCategoryVideos } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
    return useQuery<Category[]>({
        queryKey: ['category'],
        queryFn: async  () => {
            const res = await fetchCategory();
            return res;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false
    })
}

export const useCategoryLives = (categoryId?: string) => {
    return useQuery<CategoryLiveResponse>({
        queryKey: ['categoryLives', categoryId],
        queryFn: async () => {
            const res = await fetchCategoryLives(categoryId!);
            return res;
        },
        enabled: !!categoryId,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false
    })
}


export const useCategoryVideos = (categoryId?: string) => {
    return useQuery<CategoryLiveResponse>({
        queryKey: ['categoryVideos', categoryId],
        queryFn: async () => {
            const res = await fetchCategoryVideos(categoryId!);
            return res;
        },
        enabled: !!categoryId,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false
    })
}