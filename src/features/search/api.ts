import api from "@/api/api";
import { SearchResponse } from "./type";



export const searchAll = async (keyword: string) => {
    const res = await api.get<SearchResponse>(`/search/${keyword}`);
    console.log("통합 검색 API 응답:", res.data);
    return res.data;
  };

