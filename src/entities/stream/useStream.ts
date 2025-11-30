import { useQuery } from "@tanstack/react-query"
import { IStreamDataResponse } from "../video/type"
import { fetchFollowingLives, fetchLiveByUsername, fetchLiveStreamDetail } from "./api"
import { fetchLives } from "../video/api"
import { useEffect, useState } from "react"
import { LiveStreamDetailData } from "./type"


export const useFollowingLives = () => {
    return useQuery<IStreamDataResponse[]>({
      queryKey: ['followingLives'],
      queryFn: fetchFollowingLives,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false
    })
  }

  export const useLives = () => {
    return useQuery<IStreamDataResponse[]>({
      queryKey: ['lives'],
      queryFn: fetchLives,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false
    })
  }

  export function useStreamDetail(streamId?: string) {
    const [streamData, setStreamData] = useState<LiveStreamDetailData | undefined>();
  
    useEffect(() => {
      if (!streamId) return;
      const fetchLiveStreamData = async () => {
        try {
          const res = await fetchLiveStreamDetail(streamId);
          const data = res.data.data;
          setStreamData(data);
          console.log('✅ 방송 불러오기 성공:', {
            streamId,
            title: data?.title,
            username: data?.username,
            url: data?.url,
          });
        } catch (err) {
          console.error("❌ 스트림 불러오는중 실패", err);
        }
      };
      fetchLiveStreamData();
    }, [streamId]);
  
    return { streamData };
  }

  export const useLiveByUsername = (username?: string) => {
    return useQuery<IStreamDataResponse[]>({
      queryKey: ['liveByUsername', username],
      queryFn: async () => await fetchLiveByUsername(username!),
      enabled: !!username,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false
    });
  };
  

  