import api from "@/api/api";
import { OtherUserResponse, UserResponse } from "./type";

export const fetchMyInfo = async (): Promise<UserResponse> => {
  const res = await api.get("/user/me");
  const data = await res.data;
  console.log("내 정보 : ", data);
  return data;
};



export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file); 

  const res = await api.post("/post/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateMyInfo = async (
  nickname?: string,
  age?: string,
  gender?: string,
  profileImage?: string,
  bannerImage?: string,
  description?: string
): Promise<UserResponse> => {
  const data = {
    nickname,
    age,
    gender,
    profileImage,
    bannerImage,
    description,
  };
  const res = await api.patch("/user", data);
  return res.data;
};

export const deleteUser = async () => {
  return (await api.delete("/user")).data;
};



export const fetchOtherUserInfo = async ({ username }: {username: string}): Promise<OtherUserResponse> => {
  const res = await api.get(`/user/${username}`);
  return res.data;
};

