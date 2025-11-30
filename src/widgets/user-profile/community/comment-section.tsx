import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import styled, { useTheme } from "styled-components";
import { Comment } from "@/features/community/types/comment";
import { CommentRequest } from "@/features/community/api";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  postId: number;
  comments: Comment[];
  onSendComment: (data: CommentRequest) => void;
}

export const CommentSection = ({ postId, comments, onSendComment }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    onSendComment({
      postId,
      content: commentText.trim(),
      parentId: replyingTo || undefined,
    });

    setCommentText("");
    setReplyingTo(null);
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isReply = depth > 0;
    
    return (
      <CommentItem key={comment.id} isReply={isReply}>
        <CommentHeader>
          <ProfileImage 
            source={comment.user.profileImageUrl 
              ? { uri: comment.user.profileImageUrl }
              : require('@/assets/null-profile.png')
            } 
          />
          <CommentInfo>
            <CommentAuthor>{comment.user.nickname}</CommentAuthor>
            <CommentDate>{new Date(comment.createdAt).toLocaleDateString()}</CommentDate>
          </CommentInfo>
        </CommentHeader>
        <CommentContent>{comment.content}</CommentContent>
        {!isReply && (
          <ReplyButton onPress={() => handleReply(comment.id)}>
            <ReplyButtonText>답글</ReplyButtonText>
          </ReplyButton>
        )}
        {comment.children && comment.children.length > 0 && (
          <RepliesContainer>
            {comment.children.map((child) => renderComment(child, depth + 1))}
          </RepliesContainer>
        )}
      </CommentItem>
    );
  };

  const topLevelComments = comments.filter((comment) => !comment.parentId);
  const theme = useTheme()

  return (
    <Container>
      <SectionTitle>댓글 {comments.length}</SectionTitle>

      <CommentsList>
        {topLevelComments.length === 0 ? (
          <EmptyComments>댓글이 없습니다.</EmptyComments>
        ) : (
          topLevelComments.map((comment) => renderComment(comment))
        )}
      </CommentsList>

      {replyingTo && (
        <ReplyIndicator>
          <Text style={{ color: '#A3A3A3', fontSize: 12 }}>
            답글을 작성하는 중...
          </Text>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <Ionicons name="close" size={16} color="#A3A3A3" />
          </TouchableOpacity>
        </ReplyIndicator>
      )}

      <CommentInputContainer>
        <CommentInput
          placeholder={replyingTo ? "답글을 입력하세요" : "댓글을 입력하세요"}
          placeholderTextColor={theme.colors.text.placeholder}
          value={commentText}
          onChangeText={setCommentText}
          multiline
          maxLength={500}
        />
        <SendButton onPress={handleSubmit} disabled={!commentText.trim()}>
          <Ionicons 
            name="send" 
            size={20} 
            color={commentText.trim() ? "#fff" : "#A3A3A3"} 
          />
        </SendButton>
      </CommentInputContainer>
    </Container>
  );
};

const Container = styled(View)`
  gap: 16px;
  padding-bottom: 20px;
`;

const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CommentsList = styled(View)`
  gap: 16px;
`;

const CommentItem = styled(View)<{ isReply?: boolean }>`
  padding-left: ${({ isReply }) => isReply ? '40px' : '0'};
  gap: 8px;
`;

const CommentHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const CommentInfo = styled(View)`
  gap: 2px;
`;

const CommentAuthor = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CommentDate = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const CommentContent = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 20px;
  margin-left: 40px;
`;

const ReplyButton = styled(TouchableOpacity)`
  margin-left: 40px;
  padding: 4px 8px;
`;

const ReplyButtonText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.normal};
`;

const RepliesContainer = styled(View)`
  margin-top: 8px;
  gap: 12px;
`;

const ReplyIndicator = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.content.normal};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borders.small};
`;

const CommentInputContainer = styled(View)`
  flex-direction: row;
  height: 56px;
  gap: 8px;
  align-items: center;
  padding: 0 12px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.small};
`;

const CommentInput = styled(TextInput)`
  flex: 1;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
`;

const SendButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  padding: 8px;
`;

const EmptyComments = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 20px 0;
`;

