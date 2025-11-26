import api from "@/api/api";

export interface LoginResponse {
    status: string;
    message: string;
    data: {
      accessToken: string;
      refreshToken?: string;
    };
  }
  
  export const loginUser = async (id: string, password: string): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", { id, password });
    return res.data;
  };
  
  export const logoutUser = async () => {
    try {
      const SecureStore = await import("expo-secure-store");
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };
  