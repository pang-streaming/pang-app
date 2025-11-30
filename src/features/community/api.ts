import api from "@/api/api";
import { PostListData, PostResponse } from "./types/post";


export const fetchPostDetail = async (postId: number): Promise<PostResponse> => {
  const res = await api.get("/post", {
    params: { postId }, 
  });
  return res.data;
};

export const uploadPost = async ({title, content, communityId, images} : {title: string, content: string, communityId: number, images?: string[]}) => {
  const res = await api.post("/post", {
    title: title,
    content: content,
    communityId: communityId,
    images: images
  });
  return res.data;
};

export const uploadImage = async (formData: FormData) => {
    const res = await api.post("/post/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

export const likePost = async (postId: number) => {
  const res = await api.post(`/post/like/${postId}`);
  return res.data;
};


interface PostListQuery {
  page?: number;
  size?: number;
  sort?: string[];
  filter?: "ALL" | "OWNER_ONLY" | "NON_OWNER_ONLY";
}

export const fetchPostList = async (
  communityId: number,
  query?: PostListQuery
): Promise<PostListData> => {
  try {
    // filter가 undefined이거나 "ALL"이면 파라미터에서 제외
    const params: any = {};
    
    if (query) {
      if (query.page !== undefined) {
        params.page = query.page;
      }
      if (query.size !== undefined) {
        params.size = query.size;
      }
      if (query.sort && query.sort.length > 0) {
        params.sort = query.sort;
      }
      if (query.filter && query.filter !== "ALL") {
        params.filter = query.filter;
      }
    }

    const res = await api.get(`/post/${communityId}`, {
      params,
    });

    console.log("fetchPostList 응답:", res.data);
    return res.data.data;
  } catch (error: any) {
    console.error("fetchPostList 오류:", error);
    console.error("communityId:", communityId);
    console.error("query:", query);
    
    // 서버 응답 상세 정보 로깅
    if (error.response) {
      console.error("서버 응답 상태:", error.response.status);
      console.error("서버 응답 데이터:", error.response.data);
      console.error("서버 응답 헤더:", error.response.headers);
    } else if (error.request) {
      console.error("요청은 보냈지만 응답을 받지 못함:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
    
    throw error;
  }
};

  
  

//---------------댓글--------------------

export const fetchComments = async (postId: number) => {
  const res = await api.get(`/post/comment/${postId}`);
  console.log("fetchComments 응답:", res.data);
  console.log("댓글 데이터:", res.data.data);
  return res.data;
}


export interface CommentRequest {
  postId: number;
  content: string;
  parentId?: number; 
}

export const sendComment = async ({ postId, content, parentId }: CommentRequest) => {
  const requestBody: any = {
    postId,
    content,
  };
  
  if (parentId !== undefined) {
    requestBody.parentId = parentId;
  }
  
  const res = await api.post('/post/comment', requestBody);
  return res.data;
};