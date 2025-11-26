
import { fetchLiveByUsername, fetchRecentVideo, fetchLives, fetchAllLastVideo } from "./api";
import { useQuery } from "@tanstack/react-query";
import { IStreamDataResponse, VideoListProps, LastVideoResponse } from "./type";


export const useLives = () => {
  return useQuery<IStreamDataResponse[]>({
    queryKey: ['lives'],
    queryFn: fetchLives,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  })
}

export const useRecentLives = () => {
  return useQuery<IStreamDataResponse[]>({
    queryKey: ['recentLives'],
    queryFn: fetchRecentVideo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  })
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

export const useAllLastVideo = () => {
  return useQuery<LastVideoResponse>({
    queryKey: ['allLastVideo'],
    queryFn: fetchAllLastVideo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  });
};



// export const useVideoList = () => {
//   const [liveVideos, setLiveVideos] = useState<VideoItem[]>([]);
//   const [recentVideos, setRecentVideos] = useState<VideoItem[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadVideos = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const res = await fetchVideos();
//         setLiveVideos(res);
//         console.log("불러온 비디오", res);
//       } catch (e) {
//         console.error("비디오 가져오기 실패", e);
//         setError("비디오를 불러오는데 실패했습니다.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const loadRecentVideo = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const res = await fetchRecentVideo();
//         setRecentVideos(res);
//         console.log("불러온 최근 시청 비디오", res);
//       } catch (e) {
//         console.error("비디오 가져오기 실패", e);
//         setError("최근 시청한 비디오를 불러오는데 실패했습니다.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadVideos();
//     loadRecentVideo();
//   }, []);

//   return {
//     liveVideos,
//     isLoading,
//     error,
//     refetch: () => {
//       const loadVideos = async () => {
//         try {
//           setIsLoading(true);
//           setError(null);
//           const res = await fetchVideos();
//           setLiveVideos(res);
//           console.log("불러온 비디오", res);
//         } catch (e) {
//           console.error("비디오 가져오기 실패", e);
//           setError("비디오를 불러오는데 실패했습니다.");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       const loadRecentVideo = async () => {
//         try {
//           setIsLoading(true);
//           setError(null);
//           const res = await fetchRecentVideo();
//           setRecentVideos(res);
//           console.log("불러온 최근 시청 비디오", res);
//         } catch (e) {
//           console.error("비디오 가져오기 실패", e);
//           setError("최근 시청한 비디오를 불러오는데 실패했습니다.");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//       loadVideos();
//       loadRecentVideo();
//     }
//   };
// };;



