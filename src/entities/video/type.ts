// export interface VideoItem {
// 	streamId: string;
// 	title: string;
// 	url: string;
// 	username: string;
// 	nickname: string;
// 	profileImage?: string;
// }

export interface VideoListProps {
	videos: IStreamDataResponse[];
	maxColumns?: number;
}

export interface IStreamDataResponse {  
  streamId: string;
  title: string;
  url: string;
  userId: string;
  username: string;
  nickname: string;
  profileImage: string;
  followers: number;
  thumbnail? : string;
  viewCount: number;
}




export interface LastVideo {
  streamId: string;
  title: string;
  url: string;
  username: string;
  nickname: string;
  profileImage: string;
  viewCount: number;
  thumbnail?: string;
}


export interface LastVideoResponse {
  status: string; 
  message: string;
  data: LastVideo[];
  timestamp: string;
}



export interface LastVideoListProps {
videos: LastVideo[];
maxColumns?: number;
}
