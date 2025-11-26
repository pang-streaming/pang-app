import api from "@/api/api";
import { IStreamDataResponse, LastVideoResponse } from "./type";


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


export const fetchLiveByUsername = async (username: string): Promise<IStreamDataResponse[]> => {
    const res = await api.get('/video/streamer', { params: { username } });
    const data = res.data.data || res.data;
    return Array.isArray(data) ? data : (data ? [data] : []);
  };
  



export const fetchAllLastVideo = async (): Promise<LastVideoResponse> => {
    const res = await api.get('/video');
    return res.data;
}

  