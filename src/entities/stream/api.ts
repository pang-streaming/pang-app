import api from "@/api/api"
import { IStreamDataResponse } from "../video/type";
import { CategoryLiveResponse } from "./type";

export const fetchLiveStreamDetail = async (streamId: string) => {
    return await api.get(`/stream/${streamId}`)
}


export const fetchFollowingLives = async (): Promise<IStreamDataResponse[]> => {
    const res = await api.get('/stream/following');
    return res.data.data || res.data || [];
}




export const fetchCategoryLives = async (categoryId: string): Promise<CategoryLiveResponse> => {
    const res = await api.get(`/stream/category/${categoryId}`);
    console.log("fetchCategoryLives 응답:", res.data);
    return res.data;
  };
  

export const fetchLiveByUsername = async (username: string): Promise<IStreamDataResponse[]> => {
  const res = await api.get('/video/streamer', { params: { username } });
  const data = res.data.data || res.data;
  return Array.isArray(data) ? data : (data ? [data] : []);
};