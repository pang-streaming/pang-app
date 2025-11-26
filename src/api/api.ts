import axios from "axios";
import * as SecureStore from "expo-secure-store";

export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

const getBaseURL = (): string => {
  if (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  let configValue: string | undefined;
  try {
    const Config = require("react-native-config");
    const configObj = Config.default || Config;
    if (configObj && typeof configObj === "object") {
      configValue = configObj.VITE_API_URL;
      if (configValue) {
        return configValue;
      }
    }
  } catch (error) {
    console.warn('[API] react-native-config를 사용할 수 없습니다. EXPO_PUBLIC_API_URL을 사용하세요.');
  }
  
  return "http://localhost:8080";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: false,
  paramsSerializer: {
    serialize: (params) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query.append(key, JSON.stringify(value));
        } else {
          query.append(key, String(value));
        }
      });
      
      return query.toString();
    },
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("accessToken");
    console.log('[API 인터셉터] 요청 URL:', config.url, '토큰:', token ? '있음' : '없음');
    if (
      token &&
      config.url &&
      !config.url.includes("/auth/register") &&
      !config.url.includes("/auth/login")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn('[API 인터셉터] 토큰을 가져오는 중 오류:', error);
  }
  return config;
});

export default api;

export const searchAll = async (keyword: string) => {
  const res = await api.get(`/search/${keyword}`);
  console.log("통합 검색 API 응답:", res.data);
  return res.data;
};
