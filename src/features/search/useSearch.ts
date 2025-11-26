import { useQuery } from "@tanstack/react-query";
import { searchAll } from "./api";
import { SearchResponse } from "./type";

export const useSearch = (keyword: string) => {
  return useQuery<SearchResponse>({
    queryKey: ['search', keyword],
    queryFn: () => searchAll(keyword),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

