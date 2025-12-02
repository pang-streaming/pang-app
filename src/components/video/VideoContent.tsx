import { LayoutChangeEvent } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import VideoInfo from './VideoInfo';
import type { StyleProp, ViewStyle } from 'react-native';
import type { LiveStreamDetailData } from '@/entities/stream/type';

interface VideoContentProps {
  showVideoInfo: boolean;
  videoInfoStyle: StyleProp<ViewStyle>;
  videoInfoHeight: SharedValue<number>;
  originalHeightRef: React.MutableRefObject<number>;
  viewCount?: number;
  uploadDate?: string;
  followerCount: number;
  onFollow: () => void;
  onSubscribe: () => void;
  streamData?: LiveStreamDetailData;
  isFollowing?: boolean;
}

export default function VideoContent({
  showVideoInfo,
  videoInfoStyle,
  videoInfoHeight,
  originalHeightRef,
  viewCount = 0,
  uploadDate,
  followerCount,
  onFollow,
  onSubscribe,
  streamData,
  isFollowing,
}: VideoContentProps) {
  const handleVideoInfoLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (videoInfoHeight.value === 0) {
      videoInfoHeight.value = height;
      originalHeightRef.current = height;
    }
  };

  const title = streamData?.title || '';
  const streamerName = streamData?.nickname || '';
  const username = streamData?.username || '';
  const finalFollowerCount = streamData?.followers ?? followerCount;
  const profileImage = streamData?.profileImage ?? '';

  return (
    <ContentContainer>
      {showVideoInfo && (
        <VideoInfoContainer style={videoInfoStyle} onLayout={handleVideoInfoLayout}>
          <VideoInfo
            title={title}
            profileImage={profileImage}
            streamerName={streamerName}
            username={username}
            viewerCount={viewCount}
            streamingTime={uploadDate || ''}
            followerCount={finalFollowerCount}
            tags={['버추얼', 'talk']}
            isFollowing={isFollowing}
            onFollow={onFollow}
            onSubscribe={onSubscribe}
            isVideo={true}
          />
        </VideoInfoContainer>
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const VideoInfoContainer = styled(Animated.View)`
  width: 100%;
  overflow: hidden;
`;



