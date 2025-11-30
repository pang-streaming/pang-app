
export interface CommentResponse {
  status: string;
  message: string;
  data: Comment[];
  timestamp: string;
}

export interface Comment {
  id: number;
  content: string;
  user: {
    nickname: string;
    profileImageUrl: string;
  };
  createdAt: string;
  modifiedAt: string;
  parentId?: number | null;
  children?: Comment[];
  replies?: Comment[]; 
}
    