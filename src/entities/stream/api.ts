import api from "@/api/api"
import { IStreamDataResponse } from "../video/type";

export const fetchLiveStreamDetail = async (streamId: string) => {
    return await api.get(`/stream/${streamId}`)
}


export const fetchFollowingLives = async (): Promise<IStreamDataResponse[]> => {
    const res = await api.get('/stream/following');
    return res.data.data || res.data || [];
}


