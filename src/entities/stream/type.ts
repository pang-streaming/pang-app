export interface LiveStreamListData {
    streamId: string;
    title: string;
    url:string;
    username: string;
    nickname: string;
    profileImage: string;
} 

export interface LiveStreamDetailData {
    streamId: string;
    title: string,
    url:string;
    userId: string;
    username:string;
    nickname:string;
    
    profileImage:string;
    followers: number;
} 