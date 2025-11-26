import api from "@/api/api";

interface RegisterPayload {
    email: string;
    id: string;
    password: string;
  }
  
  export const registerUser = async (payload: RegisterPayload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  };