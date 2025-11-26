import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyFollowing, fetchMyFollower, followingOtherUser, unfollowOtherUser } from "./api";
import type { FollowResponse } from "./type";

export const useMyFollowing = (username?: string) => {
  return useQuery<FollowResponse>({
    queryKey: ["myFollowing", username || "current"],
    queryFn: () => fetchMyFollowing(username),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useMyFollower = (username?: string) => {
  return useQuery<FollowResponse>({
    queryKey: ["myFollower", username],
    queryFn: () => fetchMyFollower(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, isFollowing }: { username: string; isFollowing: boolean }) => 
      isFollowing ? unfollowOtherUser(username) : followingOtherUser(username),
    onSuccess: async (_, variables) => {
      // otherUserInfo 쿼리를 강제로 refetch
      await queryClient.refetchQueries({ 
        queryKey: ["otherUserInfo", variables.username]
      });
      // 다른 관련 쿼리들도 무효화
      queryClient.invalidateQueries({ queryKey: ["myFollowing"] });
      queryClient.invalidateQueries({ queryKey: ["myFollower"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
    onError: (err) => {
      console.error("팔로우 처리 중 오류가 발생했습니다:", err);
    },
  });
};