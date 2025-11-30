
import {  fetchRecentVideo, fetchLives, fetchLastVideo, fetchVideoByUsername } from "./api";
import { useQuery } from "@tanstack/react-query";
import { IStreamDataResponse, VideoListProps, LastVideoResponse } from "./type";



export const useRecentVideos = () => {
  return useQuery<IStreamDataResponse[]>({
    queryKey: ['recentLives'],
    queryFn: fetchRecentVideo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  })
}




export const useAllLastVideo = () => {
  return useQuery<LastVideoResponse>({
    queryKey: ['allLastVideo'],
    queryFn: fetchLastVideo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  });
};

export const useVideoByUsername = (username?: string) => {
  return useQuery<LastVideoResponse>({
    queryKey: ['videoByUsername', username],
    queryFn: async () => await fetchVideoByUsername(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  });
};

