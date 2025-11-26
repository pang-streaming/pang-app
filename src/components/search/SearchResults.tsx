import { View, ScrollView, Pressable, Image, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";
import Text from "../ui/Text";
import { SearchResponse } from "@/features/search/type";
import { useRouter } from "expo-router";
import ThumbnailIcon from "@/assets/thumbnail.svg";

interface SearchResultsProps {
  data: SearchResponse | undefined;
  isLoading: boolean;
  onClose: () => void;
}

export default function SearchResults({ data, isLoading, onClose }: SearchResultsProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <ResultsContainer>
        <LoadingContainer>
          <ActivityIndicator size="small" color="#fff" />
        </LoadingContainer>
      </ResultsContainer>
    );
  }

  if (!data || !data.data) {
    return null;
  }

  const { streams, users, products } = data.data;

  const hasResults = streams.length > 0 || users.length > 0 || products.length > 0;

  if (!hasResults) {
    return (
      <ResultsContainer>
        <EmptyContainer>
          <Text size={14} color="#666">검색 결과가 없습니다.</Text>
        </EmptyContainer>
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer>
        <ScrollView
  style={{ maxHeight: '100%' }}
  contentContainerStyle={{ paddingBottom: 20 }}
  showsVerticalScrollIndicator={false}
>
        

        {users.length > 0 && (
          <Section>
            <SectionTitle>사용자</SectionTitle>
            {users.map((user) => (
              <ResultItem
                key={user.id}
                onPress={() => {
                  onClose();
                  router.push(`/user-profile?username=${user.username}`);
                }}
              >
                <ProfileImage 
                  source={user.profileImage 
                    ? { uri: user.profileImage } 
                    : require('@/assets/null-profile.png')
                  } 
                />
                <ResultInfo>
                  <ResultTitle>{user.nickname}</ResultTitle>
                  <ResultSubtitle>@{user.username} · 팔로워 {user.follower}</ResultSubtitle>
                </ResultInfo>
              </ResultItem>
            ))}
          </Section>
        )}

{streams.length > 0 && (
          <Section>
            <SectionTitle>스트림</SectionTitle>
            {streams.map((stream) => {
              console.log('[SearchResults] Stream thumbnail:', {
                streamId: stream.streamId,
                thumbnail: stream.thumbnail,
                thumbnailType: typeof stream.thumbnail,
                thumbnailValue: stream.thumbnail,
                fullStream: stream
              });
              
              return (
                <ResultItem
                  key={stream.streamId}
                  onPress={() => {
                    onClose();
                    router.push(`/stream-viewer?streamId=${stream.streamId}`);
                  }}
                >
                  {stream.thumbnail ? (
                    <Thumbnail source={{ uri: stream.thumbnail }} />
                  ) : (
                    <ThumbnailPlaceholder>
                      <ThumbnailIcon width={60} height={34} />
                    </ThumbnailPlaceholder>
                  )}
                <ResultInfo>
                  <ResultTitle>{stream.title}</ResultTitle>
                  <ResultSubtitle>{stream.nickname} · 조회수 {stream.viewCount}</ResultSubtitle>
                </ResultInfo>
              </ResultItem>
              );
            })}
          </Section>
        )}

        {products.length > 0 && (
          <Section>
            <SectionTitle>상품</SectionTitle>
            {products.map((product) => (
              <ResultItem
                key={product.id}
                onPress={() => {
                  onClose();
                  // TODO: 상품 상세 페이지로 이동
                }}
              >
                {product.image && (
                  <ProductImage source={{ uri: product.image }} />
                )}
                <ResultInfo>
                  <ResultTitle>{product.name}</ResultTitle>
                  <ResultSubtitle>{product.price.toLocaleString()}원</ResultSubtitle>
                </ResultInfo>
              </ResultItem>
            ))}
          </Section>
        )}
      </ScrollView>
    </ResultsContainer>
  );
}

const ResultsContainer = styled.View`
margin-top: 10px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  border-top-width: 1px;
  border-top-color: ${({ theme }: ThemeProps) => theme.colors.border.light};
  z-index: 1000;
`;

const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const EmptyContainer = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Section = styled.View`
  padding: 12px 0;
`;

const SectionTitle = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  padding: 8px 16px;
  text-transform: uppercase;
`;

const ResultItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
`;

const Thumbnail = styled.Image`
  width: 60px;
  height: 34px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const ThumbnailPlaceholder = styled.View`
  width: 60px;
  height: 34px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const ProductImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const ResultInfo = styled.View`
  flex: 1;
  gap: 4px;
`;

const ResultTitle = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const ResultSubtitle = styled(Text)`
  font-size: 12px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

