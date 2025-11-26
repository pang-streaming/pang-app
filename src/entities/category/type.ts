
export type CategoryType =
  | "GAME"
  | "TRAVEL"
  | "EATING_SHOW"
  | "VIRTUAL"
  | "SPORTS"
  | "MUSIC"
  | "DRAWING"
  | "TALK"
  | "COOKING"
  | "CURRENT_AFFAIRS"
  | "STUDY"
  | "OTHERS";

export interface Category {
  id: number;
  name: string;
  chip: string[];
  type: CategoryType;
  postImage: string;
  streamCount: number;
}



export interface CategoryLive {
  streamId: string;
  title: string;
  url: string;
  username: string;
  nickname: string;
  profileImage: string;
  viewCount: number;
  thumbnail?: string;
}

export interface CategoryLiveResponse {
  status: string;
  message: string;
  data: CategoryLive[];
  timestamp: string;
}
