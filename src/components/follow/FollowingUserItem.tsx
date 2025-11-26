import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import type { Follow } from '@/features/follow/type';

interface FollowingUserItemProps {
  user: Follow;
  onPress?: () => void;
}

export default function FollowingUserItem({ user, onPress }: FollowingUserItemProps) {
  return (
    <Container onPress={onPress}>
      <UserInfo>
        {user.image ? (
          <ProfileImage source={{ uri: user.image }} />
        ) : (
          <ProfileImagePlaceholder />
        )}
        <UserDetails>
          <Nickname>{user.nickname}</Nickname>
          <FollowerCount>팔로워 {user.follower.toLocaleString()}</FollowerCount>
        </UserDetails>
      </UserInfo>
    </Container>
  );
}

const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 12px 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.normal};
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const ProfileImagePlaceholder = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`;

const UserDetails = styled.View`
  flex: 1;
`;

const Nickname = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  margin-bottom: 2px;
`;

const FollowerCount = styled(Text)`
  font-size: 12px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;
