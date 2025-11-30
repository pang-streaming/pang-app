import LiveElem from "@/components/live/LiveElem";
import { useLives } from "@/entities/stream/useStream";
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { View } from "react-native";
import styled from "styled-components";
import { useRouter } from "expo-router";
import { useCategoryStore } from "@/stores/useCategoryStore";

export const RecommendLiveSection = () => {
  const { data, isLoading, isError } = useLives();
  const router = useRouter();
  const setSelectedCategory = useCategoryStore((s) => s.setSelectedCategory);

  const handleMorePress = () => {
    setSelectedCategory("실시간");
  };

  const displayData = data && data.length > 0 ? data.slice(0, 6) : [];

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Label>이 방송 어때요?</Label>
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
      ) : displayData.length > 0 ? (
        displayData.map((stream) => (
          <LiveElem key={stream.streamId} stream={stream} />
        ))
      ) : (
        <EmptyText>추천 라이브가 없습니다</EmptyText>
      )}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
  margin-bottom: 20px;
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
