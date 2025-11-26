export interface SearchResponse {
    status: string;
    message: string;
    data: {
      streams: Stream[];
      users: User[];
      products: Product[];
    };
    timestamp: string;
  }
  
  export interface Stream {
    streamId: string;
    title: string;
    url: string;
    thumbnail: string;
    username: string;
    nickname: string;
    profileImage: string;
    viewCount: number;
  }
  
  export interface User {
    id: string;
    username: string;
    nickname: string;
    profileImage: string;
    bannerImage: string;
    description: string;
    follower: number;
    role: 'USER' | 'STREAMER' | 'ADMIN'; 
  }
  
  export interface Product {
    id: string;
    image: string;
    name: string;
    price: number;
    isLiked: boolean;
  }
  