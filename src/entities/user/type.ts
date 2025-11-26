export type Gender = "MALE" | "FEMALE" | "OTHER";
export type Role = "USER" | "ADMIN" | "STREAMER"; 

export interface User {
  id: string;             
  username: string;
  email: string;
  nickname: string;
  age: string;           
  gender: Gender;
  profileImage: string;
  bannerImage: string;
  isAdult: boolean;
  role: Role;
  isAlarm: boolean;
  description: string;
  cash: number;
}

export interface UserResponse {
  status: string;
  message: string;
  data: User;
  timestamp: string;    
}



// 다른유저

export interface OtherUser {

    nickname : string
    profileImage? : string
    bannerImag? : string
    description? : string
    communityId : number
    followerCount : number
    isFollowed : boolean
}


export interface OtherUserResponse {
    status: string;
    message: string;
    data: OtherUser;
    timestamp: string
}

