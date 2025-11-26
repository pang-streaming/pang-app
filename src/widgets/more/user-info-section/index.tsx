import { ThemeProps } from "@/theme/types";
import { Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Edit from '@/assets/edit.svg';
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api";

export const UserInfoSection = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const user = data?.data;

  if (isLoading) {
    return (
      <UserInfo>
        <LoadingContainer>
          <ActivityIndicator size="small" />
        </LoadingContainer>
      </UserInfo>
    );
  }

  return (
    <UserInfo>
      <ProfileImageContainer>
        {user?.profileImage ? (
          <ProfileImage source={{ uri: user.profileImage }} />
        ) : (
          <ProfileImagePlaceholder />
        )}
        <IconWrapper onPress={() => {
          router.push('/(more)/edit-profile');
        }}>
          <Edit width={16} height={16} />
        </IconWrapper>
      </ProfileImageContainer>
      <Name>{user?.nickname || "닉네임"}</Name>
      <Username>ID: {user?.username || "username"}</Username>
    </UserInfo>
  );
};

const UserInfo = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const LoadingContainer = styled.View`
  padding: 20px;
`;

const ProfileImageContainer = styled.View<ThemeProps>`
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
  position: relative;
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

const Username = styled(Text)<ThemeProps>`
  font-size: ${({ theme }: ThemeProps) => theme.font.medium};
  font-weight: 500;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

const Name = styled(Text)<ThemeProps>`
  font-size: ${({ theme }: ThemeProps) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const IconWrapper = styled(TouchableOpacity)<ThemeProps>`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.maximum};
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;