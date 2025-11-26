

export interface Follow {
    image: string,
    nickname: string,
    follower: number
    username: string,
}

export interface FollowResponse {
    status: string,
    message : string,
    data: Follow[];
    timestamp: string
}