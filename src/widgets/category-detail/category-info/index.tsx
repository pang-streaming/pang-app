import { SubmitButton } from "@/ui/SubmitButton";
import { Text, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground } from "react-native";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCategoryLives, useCategoryVideos } from "@/entities/category/useCategory";
import { CategoryLive } from "@/entities/stream/type";
import { useRouter } from "expo-router";

interface CategoryInfoProps {
  categoryId?: string;
  categoryName?: string;
  categoryImage?: string;
  onRefetchReady?: (refetchLives: () => Promise<any>, refetchVideos: () => Promise<any>) => void;
}

export const CategoryInfo = ({ categoryId, categoryName, categoryImage, onRefetchReady }: CategoryInfoProps) => {
  const [selectedTab, setSelectedTab] = useState<'live' | 'video'>('live');
  const router = useRouter();
  
  const { 
    data: livesData, 
    isLoading: livesLoading, 
    isError: livesError,
    error: livesErrorData,
    refetch: refetchLives
  } = useCategoryLives(categoryId);
  
  const { 
    data: videosData, 
    isLoading: videosLoading, 
    isError: videosError,
    error: videosErrorData,
    refetch: refetchVideos
  } = useCategoryVideos(categoryId);

  useEffect(() => {
    if (onRefetchReady && refetchLives && refetchVideos) {
      onRefetchReady(refetchLives, refetchVideos);
    }
  }, [onRefetchReady, refetchLives, refetchVideos]);

  // 에러 로깅
  if (livesError) {
    console.error('Category Lives Error:', livesErrorData);
  }
  if (videosError) {
    console.error('Category Videos Error:', videosErrorData);
  }

  // 에러 메시지 생성
  const getErrorMessage = () => {
    if (!error) return '데이터를 불러오는 중 오류가 발생했습니다';
    
    const axiosError = error as any;
    if (axiosError?.response?.status === 500) {
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
    if (axiosError?.response?.status === 404) {
      return '요청한 데이터를 찾을 수 없습니다.';
    }
    if (axiosError?.response?.status === 403) {
      return '접근 권한이 없습니다.';
    }
    if (axiosError?.response?.status === 401) {
      return '인증이 필요합니다.';
    }
    if (axiosError?.message) {
      return `오류: ${axiosError.message}`;
    }
    return '데이터를 불러오는 중 오류가 발생했습니다';
  };

  const lives = livesData?.data || [];
  const videos = videosData?.data || [];
  const items = selectedTab === 'live' ? lives : videos;
  const isLoading = selectedTab === 'live' ? livesLoading : videosLoading;
  const isError = selectedTab === 'live' ? livesError : videosError;
  const error = selectedTab === 'live' ? livesErrorData : videosErrorData;
  const refetch = selectedTab === 'live' ? refetchLives : refetchVideos;

  const handleRetry = () => {
    refetch();
  };

  const handleItemPress = (item: CategoryLive) => {
    // 동영상 탭일 때만 type=video 추가
    const typeParam = selectedTab === 'video' ? '&type=video' : '';
    router.push(`/stream-viewer?streamId=${item.streamId}${typeParam}`);
  };

  return (
    <Container>
      <CategoryInfoRow>
        {categoryImage ? (
          <CategoryThumbnail source={{ uri: categoryImage }} resizeMode="cover" />
        ) : (
          <Thumbnail />
        )}
        <LabelColumn>
          <Label>{categoryName || '카테고리'}</Label>
          <SubLabel>라이브 {lives.length}개</SubLabel>
        </LabelColumn>
      </CategoryInfoRow>
      <SubmitButton>팔로우</SubmitButton>
      
      <TabContainer>
        <TabButton 
          active={selectedTab === 'live'} 
          onPress={() => setSelectedTab('live')}
        >
          <TabText active={selectedTab === 'live'}>라이브</TabText>
        </TabButton>
        <TabButton 
          active={selectedTab === 'video'} 
          onPress={() => setSelectedTab('video')}
        >
          <TabText active={selectedTab === 'video'}>동영상</TabText>
        </TabButton>
      </TabContainer>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      ) : isError ? (
        <EmptyContainer>
          <EmptyText>{getErrorMessage()}</EmptyText>
          <RetryButton onPress={handleRetry}>
            <RetryButtonText>다시 시도</RetryButtonText>
          </RetryButton>
        </EmptyContainer>
      ) : items.length === 0 ? (
        <EmptyContainer>
          <EmptyText>콘텐츠가 없습니다</EmptyText>
        </EmptyContainer>
      ) : (
        <ListContainer>
          {items.map((item: CategoryLive) => (
            <ListItem key={item.streamId} onPress={() => handleItemPress(item)}>
              <ThumbnailImage 
                source={{ uri: item.thumbnail || item.url }} 
                resizeMode="cover"
              />
              <ItemInfo>
                <ItemTitle numberOfLines={1}>{item.title}</ItemTitle>
                <ItemMeta>
                  <ItemUsername>{item.nickname || item.username}</ItemUsername>
                  {selectedTab === 'live' && (
                    <ItemViewCount>👁 {item.viewCount || 0}</ItemViewCount>
                  )}
                </ItemMeta>
              </ItemInfo>
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const CategoryInfoRow = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

const Thumbnail = styled(View)`
  width: 83px;
  aspect-ratio: 41 / 56;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const CategoryThumbnail = styled(ImageBackground)`
  width: 83px;
  aspect-ratio: 41 / 56;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.content.normal};
  overflow: hidden;
`;

const LabelColumn = styled(View)`
  flex-direction: column;
  padding-top: 3px;
`;

const Label = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const SubLabel = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const TabContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

const TabButton = styled(TouchableOpacity)<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, active }) => 
    active ? theme.colors.primary.normal : 'transparent'};
`;

const TabText = styled(Text)<{ active: boolean }>`
  font-size: 14px;
  font-weight: ${({ active }) => active ? '700' : '500'};
  color: ${({ theme, active }) => 
    active ? theme.colors.text.normal : theme.colors.text.subtitle};
`;

const ListContainer = styled(View)`
  width: 100%;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`;

const ListItem = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  gap: 12px;
  padding: 8px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const ThumbnailImage = styled(Image)`
  width: 120px;
  height: 68px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const ItemInfo = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
`;

const ItemTitle = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 8px;
`;

const ItemMeta = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ItemUsername = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const ItemViewCount = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const LoadingContainer = styled(View)`
  width: 100%;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

const EmptyContainer = styled(View)`
  width: 100%;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin-bottom: 12px;
`;

const RetryButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.primary.normal};
  margin-top: 8px;
`;

const RetryButtonText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;
