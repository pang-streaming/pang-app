import { Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { View } from "react-native";
import styled from "styled-components";
import { FollowingLiveElem } from "./following-live-elem";
import { useFollowingLives } from "@/entities/stream/useStream";
import { useMemo } from "react";
import { IStreamDataResponse } from "@/entities/video/type";
import { useRouter } from "expo-router";
import { useCategoryStore } from "@/stores/useCategoryStore";

export const FollowingLivesSection = () => {
  const { data, isLoading, isError } = useFollowingLives();
  const router = useRouter();
  const setSelectedTabCategory = useCategoryStore((s) => s.setSelectedTabCategory);
  

  // 실제 데이터가 없으면 더미 데이터 사용
  

  const handleMorePress = () => {
    setSelectedTabCategory("라이브");
    router.push("/(tabs)/follow");
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Label>팔로잉 중인 채널 라이브</Label>
        <TouchableOpacity onPress={handleMorePress}>
          <More>더보기</More>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="small" />
        </LoadingContainer>
      ) : isError ? (
        <EmptyText>데이터를 불러올 수 없습니다</EmptyText>
      ) : (
        data && data.length === 0 ? (<EmptyText>팔로잉 중인 채널의 라이브 방송이 없습니다</EmptyText>) : (
        <FollowingLiveScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 20 }}
        >
          {data?.map((d) => (
            <FollowingLiveElem
              key={d.streamId}
              streamId={d.streamId}
              streamerName={d.nickname}
              profileImage={d.profileImage}
              thumbnail={d.thumbnail}
              title={d.title}
            />
          ))}
          
        </FollowingLiveScrollView>
      ))}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
  padding: 0 5%;
  margin-bottom: 20px;
  gap: 10px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;
const More = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const FollowingLiveScrollView = styled(ScrollView)`
  flex-direction: row;
`;

const LoadingContainer = styled(View)`
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled(Text)`
width: 100%;
text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  padding: 20px;
`;
