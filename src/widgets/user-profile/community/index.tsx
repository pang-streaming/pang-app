import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, Pressable } from "react-native";
import styled from "styled-components";
import { usePostList } from "@/features/community/hooks/usePostList";
import { useRouter } from "expo-router";
import { Post } from "@/features/community/types/post";
import { Ionicons } from "@expo/vector-icons";
import { WritePostModal } from "@/widgets/user-profile/community/write-modal";

interface Props {
  communityId: number;
}

export const UserProfileCommunity = ({ communityId }: Props) => {
  const router = useRouter();
  const [showWriteModal, setShowWriteModal] = useState(false);
  
  // communityId 확인 및 로깅
  console.log("UserProfileCommunity - communityId:", communityId, typeof communityId);
  
  const { data, isLoading, isError, error, refetch } = usePostList(communityId);

  // 에러 로깅
  useEffect(() => {
    if (isError && error) {
      console.error("게시글 불러오기 실패:", error);
      if (error instanceof Error) {
        console.error("에러 메시지:", error.message);
      }
      // AxiosError인 경우 서버 응답 정보 확인
      if ((error as any).response) {
        console.error("서버 응답 상태:", (error as any).response.status);
        console.error("서버 응답 데이터:", (error as any).response.data);
      }
    }
  }, [isError, error]);

  const handlePostPress = (postId: number) => {
    router.push(`/post-detail?postId=${postId}`);
  };

  const handleWriteSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      </Container>
    );
  }

  if (isError) {
    let errorMessage = '게시글을 불러오는데 실패했습니다.';
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.response?.status === 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (axiosError.response?.status === 404) {
        errorMessage = '커뮤니티를 찾을 수 없습니다.';
      } else if (axiosError.response?.status === 403) {
        errorMessage = '접근 권한이 없습니다.';
      } else if (axiosError.response?.status === 401) {
        errorMessage = '인증이 필요합니다.';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return (
      <Container>
        <EmptyContainer>
          <EmptyText>{errorMessage}</EmptyText>
          <RetryButton onPress={() => refetch()}>
            <RetryButtonText>다시 시도</RetryButtonText>
          </RetryButton>
        </EmptyContainer>
      </Container>
    );
  }

  const posts = data?.content || [];

  return (
    <Container>
      <WriteButton onPress={() => setShowWriteModal(true)}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <WriteButtonText>글쓰기</WriteButtonText>
      </WriteButton>

      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.length === 0 ? (
          <EmptyContainer>
            <EmptyText>게시글이 없습니다.</EmptyText>
          </EmptyContainer>
        ) : (
          <PostList>
            {posts.map((post: Post) => (
              <PostItem key={post.id} onPress={() => handlePostPress(post.id)}>
                <PostHeader>
                  <PostAuthor>
                    <AuthorName>{post.nickname}</AuthorName>
                    <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
                  </PostAuthor>
                </PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostContent numberOfLines={3}>{post.content}</PostContent>
                {post.images && post.images.length > 0 && (
                  <PostImages>
                    {post.images.slice(0, 3).map((image, index) => (
                      <PostImage key={index} source={{ uri: image }} />
                    ))}
                  </PostImages>
                )}
                <PostFooter>
                  <LikeButton>
                    <Ionicons 
                      name={post.liked ? "heart" : "heart-outline"} 
                      size={16} 
                      color={post.liked ? "#FF0055" : "#A3A3A3"} 
                    />
                    <LikeCount>{post.likes}</LikeCount>
                  </LikeButton>
                </PostFooter>
              </PostItem>
            ))}
          </PostList>
        )}
      </ScrollView>

      {showWriteModal && (
        <WritePostModal
          communityId={communityId}
          onClose={() => setShowWriteModal(false)}
          onSuccess={handleWriteSuccess}
        />
      )}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 20px;
`;

const WriteButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.borders.large};
  margin-bottom: 20px;
  gap: 8px;
`;

const WriteButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
  font-weight: 600;
`;

const PostList = styled(View)`
  gap: 16px;
`;

const PostItem = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.content.normal};
  padding: 16px;
  border-radius: ${({ theme }) => theme.borders.small};
  gap: 12px;
`;

const PostHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PostAuthor = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const AuthorName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const PostDate = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const PostTitle = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const PostContent = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  line-height: 20px;
`;

const PostImages = styled(View)`
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

const PostImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const PostFooter = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const LikeButton = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const LikeCount = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EmptyContainer = styled(View)`
  padding: 40px 20px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
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
  color: ${({ theme }) => theme.colors.background.normal};
`;

