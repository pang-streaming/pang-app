import { Modal, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { usePostDetail, useLikePost, useComment, useSendComment } from "@/features/community/hooks/usePostDetail";
import { DismissHeader } from "@/components/ui/DismissHeader";
import { Ionicons } from "@expo/vector-icons";
import { CommentSection } from "@/widgets/user-profile/community/comment-section";

interface Props {
  postId: number;
  onClose: () => void;
}

export const PostDetailModal = ({ postId, onClose }: Props) => {
  const { data: post, isLoading } = usePostDetail(postId);
  const { data: commentsData } = useComment(postId);
  const { mutate: likePost } = useLikePost();
  const { mutate: sendComment } = useSendComment();

  const handleLike = () => {
    likePost(postId);
  };

  if (isLoading) {
    return (
      <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
        <Container>
          <DismissHeader onPress={onClose}>게시글</DismissHeader>
          <LoadingContainer>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingContainer>
        </Container>
      </Modal>
    );
  }

  if (!post) {
    return (
      <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
        <Container>
          <DismissHeader onPress={onClose}>게시글</DismissHeader>
          <EmptyText>게시글을 불러올 수 없습니다.</EmptyText>
        </Container>
      </Modal>
    );
  }

  const comments = commentsData?.data || [];

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <Container>
        <DismissHeader onPress={onClose}>게시글</DismissHeader>
        <ScrollView>
          <Content>
            <PostHeader>
              <AuthorInfo>
                <AuthorName>{post.nickname}</AuthorName>
                <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
              </AuthorInfo>
            </PostHeader>

            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>

            {post.images && post.images.length > 0 && (
              <PostImages>
                {post.images.map((image, index) => (
                  <PostImage key={index} source={{ uri: image }} />
                ))}
              </PostImages>
            )}

            <PostActions>
              <LikeButton onPress={handleLike}>
                <Ionicons 
                  name={post.liked ? "heart" : "heart-outline"} 
                  size={20} 
                  color={post.liked ? "#FF0055" : "#A3A3A3"} 
                />
                <LikeCount>{post.likes}</LikeCount>
              </LikeButton>
            </PostActions>

            <Divider />

            <CommentSection 
              postId={postId}
              comments={comments}
              onSendComment={sendComment}
            />
          </Content>
        </ScrollView>
      </Container>
    </Modal>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

const Content = styled(View)`
  padding: 20px;
  gap: 16px;
`;

const PostHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled(View)`
  gap: 4px;
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
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const PostContent = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 22px;
`;

const PostImages = styled(View)`
  gap: 12px;
`;

const PostImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const PostActions = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const LikeButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const LikeCount = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 500;
`;

const Divider = styled(View)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.light};
  margin: 20px 0;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const EmptyText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 40px 20px;
`;

