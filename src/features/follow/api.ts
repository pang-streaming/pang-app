

import api from "../../api/api";
import type { FollowResponse } from "./type";


export const fetchMyFollowing = async (username?: string): Promise<FollowResponse> => {
    if (username) {
        const res = await api.get("/follow/following", {params : { username }})
        return res.data;
    } else {
        // 현재 사용자의 팔로잉 목록 가져오기 (토큰에서 사용자 인식)
        const res = await api.get("/follow/following")
        return res.data;
    }
}

export const fetchMyFollower = async (username: string): Promise<FollowResponse> => {
    const res = await api.get("/follow/follower", {params : { username }})
    return res.data;
}

export const toggleFollow = async (username: string) => {
    console.log("팔로우 토글 요청 - username:", username);
    try {
        const res = await api.post(`/follow?username=${username}`);
        console.log("팔로우 토글 API 응답:", res.data);
        return res.data;
    } catch (error) {
        console.error("팔로우 토글 API 오류:", error);
        try {
            const res = await api.post("/follow", { username });
            console.log("팔로우 토글 API 응답 (body 방식):", res.data);
            return res.data;
        } catch (retryError) {
            console.error("팔로우 토글 API 재시도 오류:", retryError);
            throw retryError;
        }
    }
}

export const followingOtherUser = toggleFollow;
export const unfollowOtherUser = toggleFollow;
