import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "../api";
import { PostListData } from "../types/post";

interface PostListQuery {
  page?: number;
  size?: number;
  sort?: string[];
  filter?: "ALL" | "OWNER_ONLY" | "NON_OWNER_ONLY";
}

export const usePostList = (
  communityId: number | null | undefined,
  query?: PostListQuery
) => {
  // communityId를 number로 변환
  const validCommunityId = typeof communityId === 'number' ? communityId : null;
  
  return useQuery<PostListData>({
    queryKey: ["postList", validCommunityId, query],
    queryFn: async () => {
      if (!validCommunityId) {
        throw new Error("communityId is required");
      }
      console.log("usePostList - fetching with communityId:", validCommunityId);
      return await fetchPostList(validCommunityId, query);
    },
    enabled: !!validCommunityId,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

