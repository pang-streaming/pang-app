import AuthTextField from "@/components/auth/AuthTextField";
import User from "@/components/icons/User";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChevronLeft from "@/assets/chevron-left.svg";
import Camera from '@/assets/camera.svg';
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { useEdit } from "@/features/edit-profile/useEdit";
import type { ThemeProps } from "@/theme/types";

export default function EditProfileScreen() {
  const router = useRouter();
  const {
    nickname,
    setNickname,
    profileImageUrl,
    setProfileImageUrl,
    isSaving,
    isLoading,
    isUploading,
    handleComplete,
    handleImageUpload,
  } = useEdit();

  if (isLoading) {
    return (
      <SafeArea edges={["top", "left", "right"]}>
        <LoadingContainer>
          <ActivityIndicator size="large" />
        </LoadingContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea edges={["top", "left", "right"]}>
      <Header>
        <IconButton onPress={() => router.back()}>
          <ChevronLeft width={24} height={24} />
        </IconButton>
        <HeaderTitle>프로필 수정</HeaderTitle>
        <CompleteButton onPress={handleComplete} disabled={isSaving}>
          <CompleteButtonText>{isSaving ? "저장 중..." : "완료"}</CompleteButtonText>
        </CompleteButton>
      </Header>

      <Content>
        <ProfileImageContainer>
          {profileImageUrl ? (
            <ProfileImage source={{ uri: profileImageUrl }} />
          ) : (
            <ProfileImagePlaceholder />
          )}
          <IconWrapper onPress={handleImageUpload} disabled={isUploading}>
            {isUploading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Camera width={20} height={20} />
            )}
          </IconWrapper>
        </ProfileImageContainer>
        <AuthTextField
          icon={<User />}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChangeText={setNickname}
          autoCapitalize="none"
        />
        <Note>
          프로필 이름, 스트리밍 채널명으로 사용됩니다.{'\n'}
          변경 시, 30일 내에 다시 변경할 수 없습니다.
        </Note>
      </Content>
    </SafeArea>
  );
}

const SafeArea = styled(SafeAreaView)<ThemeProps>`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Header = styled.View`
  height: 65px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 20px;
`;

const HeaderTitle = styled(Text)<ThemeProps>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const IconButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
  padding: 8px;
`;

const CompleteButton = styled(TouchableOpacity)<{ disabled?: boolean } & ThemeProps>`
  position: absolute;
  right: 20px;
  padding: 8px;
  opacity: ${({ disabled }: { disabled?: boolean }) => disabled ? 0.5 : 1};
`;

const CompleteButtonText = styled(Text)<ThemeProps>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
`;

const ProfileImageContainer = styled.View<ThemeProps>`
  width: 90px;
  height: 90px;
  justify-content: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
  align-items: center;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
`;

const ProfileImage = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
`;

const ProfileImagePlaceholder = styled.View<ThemeProps>`
  width: 90px;
  height: 90px;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const Note = styled(Text)<ThemeProps>`
  font-size: 12px;
  width: 100%;
  margin-top: 10px;
  line-height: 18px;
  font-weight: 400;
  color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
`;

const IconWrapper = styled(TouchableOpacity)<{ disabled?: boolean } & ThemeProps>`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
  background-color: ${({ theme }: ThemeProps) => theme.colors.stroke.normal};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }: { disabled?: boolean }) => disabled ? 0.5 : 1};
`;