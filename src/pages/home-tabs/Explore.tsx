import TopVideoList from "@/components/explore/TopVideoList";
import { FollowingLivesSection } from "@/widgets/explore/following-lives";
import { RecommendLiveSection } from "@/widgets/explore/recommend-lives";
import { Image, View, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";


export default function Explore() {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // 모든 관련 쿼리 refetch
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['followingLives'] }),
        queryClient.refetchQueries({ queryKey: ['lives'] }),
      ]);
      // TopVideoList는 axios를 직접 사용하므로 컴포넌트를 다시 마운트해야 함
      // 이 경우는 컴포넌트 key를 변경하거나 별도 refetch 로직이 필요할 수 있음
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
      }
    >
      <Container>
        <TopVideoList itemWidthRatio={0.9} itemSpacing={-1} />
        <FollowingLivesSection />
        <RecommendLiveSection />
      </Container>
    </ScrollView>
  );
}

const Container = styled(View)`
  width: 100%;
  /* padding: 0 16px; */
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Icon = styled(Image)`
`;