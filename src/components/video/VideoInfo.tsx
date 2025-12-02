import { Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Text from '@/components/ui/Text';
import { useRouter } from 'expo-router';

interface VideoInfoProps {
  title?: string;
  streamerName?: string;
  username?: string;
  viewerCount?: number;
  profileImage?: string;
  streamingTime?: string;
  followerCount?: number;
  tags?: string[];
  isFollowing?: boolean;
  onFollow?: () => void;
  onSubscribe?: () => void;
  isVideo?: boolean; // 동영상인지 라이브인지 구분
}

export default function VideoInfo({
  title,
  streamerName,
  username,
  viewerCount,
  streamingTime = '02:01:07',
  profileImage,
  followerCount,
  tags = ['버추얼', 'talk'],
  isFollowing = false,
  onFollow,
  onSubscribe,
  isVideo = false,
}: VideoInfoProps) {
  const formatTime = (time: string) => {
    return time;
  };

  const followingStatus = Boolean(isFollowing);

  const router = useRouter();

  return (
    <Container>
      <TitleSection>
        <Text size={16} weight="600" color="#FFFFFF">
          {title}
        </Text>
      </TitleSection>

      {tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>
              <Text size={12} weight="500" color="#FFFFFF">
                {tag}
              </Text>
            </Tag>
          ))}
        </TagsContainer>
      )}

      <StatsContainer>
        {isVideo ? (
          <>
            <Text size={12} weight="400" color="#A3A3A3">
              조회수 {viewerCount?.toLocaleString() || 0}
            </Text>
            {streamingTime && (
              <Text size={12} weight="400" color="#A3A3A3">
                {streamingTime}
              </Text>
            )}
          </>
        ) : (
          <>
            <Text size={12} weight="400" color="#A3A3A3">
              {viewerCount}명 시청 중
            </Text>
            <Text size={12} weight="400" color="#A3A3A3">
              {formatTime(streamingTime)} 스트리밍 중
            </Text>
          </>
        )}
      </StatsContainer>

      <StreamerSection>
        <StreamerInfo onPress={() => {
          router.back();
          if (username) {
            router.push(`/user-profile?username=${username}`)
          }
        }}>
          <AvatarContainer>
            <AvatarBorder>
              {profileImage ? (
                <Avatar source={{ uri: profileImage }} />
              ) : (
                <AvatarPlaceholder />
              )}
            </AvatarBorder>
          </AvatarContainer>
          <StreamerDetails>
            <Text size={14} weight="600" color="#FFFFFF">
              {streamerName}
            </Text>
            <Text size={12} weight="400" color="#A3A3A3">
              팔로워 {followerCount}
            </Text>
          </StreamerDetails>
        </StreamerInfo>
        <ActionButtons>
          <FollowButton onPress={onFollow} isFollowing={followingStatus}>
            <Text size={12} weight="700" color="#FFFFFF">
              {followingStatus ? '언팔로우' : '팔로우'}
            </Text>
          </FollowButton>
          <SubscribeButton onPress={onSubscribe}>
            <Text size={12} weight="700" color="#FFFFFF">
              구독
            </Text>
          </SubscribeButton>
        </ActionButtons>
      </StreamerSection>
    </Container>
  );
}

const Container = styled.View`
  padding: 16px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.normal};
`

const TitleSection = styled.View`
  margin-bottom: 12px;
`

const TagsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
`

const Tag = styled.View`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`

const StatsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`

const StreamerSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StreamerInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

const AvatarContainer = styled.View`
  margin-right: 12px;
`

const AvatarBorder = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 24px;
  border-width: 2px;
  border-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  padding: 2px;
  align-items: center;
  justify-content: center;
`

const Avatar = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 22px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  overflow: hidden;
`

const AvatarPlaceholder = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 22px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`

const StreamerDetails = styled.View`
  flex: 1;
`

const ActionButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const FollowButton = styled(TouchableOpacity)<{ isFollowing?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme, isFollowing }: ThemeProps & { isFollowing?: boolean }) => 
    isFollowing ? theme.colors.content.normal : theme.colors.primary.normal};
`

const SubscribeButton = styled(Pressable)`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
`

