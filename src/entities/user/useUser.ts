import { useQuery } from "@tanstack/react-query";
import { fetchOtherUserInfo } from "./api";

export const useUsernameToInfo = ({ username }: { username: string }) => {
    return useQuery({
      queryKey: ["otherUserInfo", username],
      queryFn: async () => await fetchOtherUserInfo({ username }),
      enabled: !!username, 
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };
