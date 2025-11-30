import api from "@/api/api";
import { IStreamDataResponse, LastVideoResponse } from "./type";
import { CategoryLiveResponse } from "../stream/type";


export const fetchLives = async (): Promise<IStreamDataResponse[]> => {
        const res = await api.get("/stream");
        console.log(res.data);
        return res.data.data || [];
};


export const getStreamData = async (streamId:string): Promise<IStreamDataResponse> => {
    const res = await api.get(`/stream/${streamId}`);
    return res.data.data || [];
};

export const fetchRecentVideo = async () => {
    const res = await api.get("/video/recent");
    return res.data.data || [];
}



export const fetchLastVideo = async (): Promise<LastVideoResponse> => {
    const res = await api.get('/video');
    return res.data;
}


export const fetchVideoByUsername = async (username: string): Promise<LastVideoResponse> => {
    const res = await api.get('/video/streamer/recorded', {
        params: { username }
    });
    console.log("fetchLastVideoByUsername 응답:", res.data);
    return res.data;
}

export const fetchFollowingVideo = async (): Promise<LastVideoResponse> => {
    const res = await api.get(`/stream/ended/following`);
    return res.data;
}

export const fetchCategoryVideos = async (categoryId: string): Promise<CategoryLiveResponse> => {
    const res = await api.get(`/video/category/${categoryId}`);
    console.log("fetchCategoryVideos 응답:", res.data);
    return res.data;
  };