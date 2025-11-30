import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components";
import { useWriteModal } from "@/features/community/hooks/useWriteModal";
import { Ionicons } from "@expo/vector-icons";
import { DismissHeader } from "@/components/ui/DismissHeader";

interface Props {
  communityId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const WritePostModal = ({ communityId, onClose, onSuccess }: Props) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    images,
    pickImage,
    removeImage,
    loading,
    uploadingImages,
    error,
    handleSubmit,
  } = useWriteModal({
    communityId,
    onSuccess,
    onClose,
  });

  const handlePickImage = async () => {
    try {
      await pickImage();
    } catch (err: any) {
      console.error("이미지 선택 중 오류:", err);
      const errorMessage = err?.message || String(err) || "알 수 없는 오류";
      
      if (errorMessage.includes("permission") || errorMessage.includes("권한")) {
        Alert.alert("권한 오류", "이미지 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.");
      } else {
        Alert.alert("오류", "이미지를 선택하는데 실패했습니다.\n다시 시도해주세요.");
      }
    }
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <Container>
        <DismissHeader>글쓰기</DismissHeader>
        <ScrollView>
          <Content>
            <InputLabel>제목</InputLabel>
            <TitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <InputLabel>내용</InputLabel>
            <ContentInput
              placeholder="내용을 입력하세요"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <InputLabel>이미지</InputLabel>
            <ImageSection>
              {images.map((uri, index) => (
                <ImageWrapper key={index}>
                  <PostImage source={{ uri }} />
                  <RemoveImageButton onPress={() => removeImage(index)}>
                    <Ionicons name="close-circle" size={24} color="#fff" />
                  </RemoveImageButton>
                </ImageWrapper>
              ))}
              {images.length < 5 && (
                <AddImageButton onPress={handlePickImage}>
                  <Ionicons name="add" size={24} color="#A3A3A3" />
                  <AddImageText>이미지 추가</AddImageText>
                </AddImageButton>
              )}
            </ImageSection>

            {error && <ErrorText>{error}</ErrorText>}

            <SubmitButton onPress={handleSubmit} disabled={loading || uploadingImages}>
              {loading || uploadingImages ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <SubmitButtonText>게시하기</SubmitButtonText>
              )}
            </SubmitButton>
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

const InputLabel = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const TitleInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.content.normal};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borders.small};
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 16px;
`;

const ContentInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.content.normal};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borders.small};
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
  min-height: 200px;
`;

const ImageSection = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const ImageWrapper = styled(View)`
  position: relative;
`;

const PostImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const RemoveImageButton = styled(TouchableOpacity)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
`;

const AddImageButton = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  border: 2px dashed ${({ theme }) => theme.colors.stroke.normal};
  border-radius: ${({ theme }) => theme.borders.small};
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const AddImageText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.status.negative};
  font-size: 12px;
`;

const SubmitButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.button.disabled : theme.colors.primary.normal};
  padding: 16px;
  border-radius: ${({ theme }) => theme.borders.large};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.background.normal};
  font-size: 16px;
  font-weight: 600;
`;

