import { useEffect, useState } from "react";
import { fetchMyInfo } from "@/entities/user/api";
import { User } from "@/entities/user/type";
import { useQuery } from "@tanstack/react-query";

export default function useProvider () {
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data?.data) return;
    setUser(data.data);
    if (data.data.gender === null) {
      setIsModalOpen(true);
    }
  }, [data?.data]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    user,
    isModalOpen,
    closeModal,
  };
};
