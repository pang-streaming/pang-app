import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, fetchPostDetail, likePost, sendComment } from "../api";
import { Post, PostListData } from "../types/post";
import { CommentResponse } from "../types/comment";

export const usePostDetail = (postId: number) => {
  return useQuery<Post>({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const res = await fetchPostDetail(postId);
      return res.data;
    },
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["postDetail", postId] });
      await queryClient.cancelQueries({ queryKey: ["postList"] });

      const previousPost = queryClient.getQueryData<Post>(["postDetail", postId]);
      const previousPostList = queryClient.getQueryData<PostListData>(["postList"]);

      if (previousPost) {
        queryClient.setQueryData<Post>(["postDetail", postId], {
          ...previousPost,
          liked: !previousPost.liked,
          likes: previousPost.liked ? previousPost.likes - 1 : previousPost.likes + 1,
        });
      }

      if (previousPostList) {
        const updatedPostList = {
          ...previousPostList,
          content: previousPostList.content.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  liked: !post.liked, 
                  likes: post.liked ? post.likes - 1 : post.likes + 1 
                }
              : post
          )
        };
        queryClient.setQueryData<PostListData>(["postList"], updatedPostList);
      }

      return { previousPost, previousPostList };
    },
    onError: (err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData<Post>(["postDetail", postId], context.previousPost);
      }
      if (context?.previousPostList) {
        queryClient.setQueryData<PostListData>(["postList"], context.previousPostList);
      }
      console.error("좋아요 처리 중 오류가 발생했습니다:", err);
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });
};


export const useComment = (postId: number) => {
  return useQuery<CommentResponse>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await fetchComments(postId);
      console.log("useComment - fetchComments 응답:", response);
      return response;
    },
    enabled: !!postId,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};


export const useSendComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
    },
    onError: (error) => {
      console.error("댓글 전송 실패", error);
    },
  });
};
