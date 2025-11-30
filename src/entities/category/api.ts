import api from "@/api/api"
import { Category, CategoryLiveResponse } from './type'


export const fetchCategory = async (): Promise<Category[]> => {
    const res =  await api.get("/categories");
    const data = res.data?.data ?? res.data;
    return Array.isArray(data) ? data : [];
}

export const fetchFilteredCategory = async () => {
    const res = await api.get('/filtered/categories');
    return res.data;
}


export const fetchCategoryLives = async (categoryId: string): Promise<CategoryLiveResponse> => {
    const res = await api.get(`/stream/category/${categoryId}`);
    console.log("fetchCategoryLives 응답:", res.data);
    return res.data;
  };
  
  export const fetchCategoryVideos = async (categoryId: string): Promise<CategoryLiveResponse> => {
    try {
      const res = await api.get(`/video/category/${categoryId}`);
      console.log("fetchCategoryVideos 응답:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("fetchCategoryVideos 에러:", error);
      if (error?.response?.status === 500) {
        console.error("서버 오류 (500): /video/category/", categoryId);
      }
      throw error;
    }
  };
  