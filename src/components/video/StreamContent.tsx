import { LayoutChangeEvent } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';
import VideoInfo from './VideoInfo';
import ChatBox from './ChatBox';
import type { ChatMessage } from '@/types/chat';
import type { StyleProp, ViewStyle } from 'react-native';
import type { LiveStreamDetailData } from '@/entities/stream/type';

interface StreamContentProps {
  showVideoInfo: boolean;
  videoInfoStyle: StyleProp<ViewStyle>;
  videoInfoHeight: SharedValue<number>;
  originalHeightRef: React.MutableRefObject<number>;
  viewerCount: number;
  streamingTime: string;
  followerCount: number;
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onBombPress: () => void;
  onFollow: () => void;
  onSubscribe: () => void;
  streamData?: LiveStreamDetailData;
  isFollowing?: boolean;
}

export default function StreamContent({
  showVideoInfo,
  videoInfoStyle,
  videoInfoHeight,
  originalHeightRef,
  viewerCount,
  streamingTime,
  followerCount,
  chatMessages,
  onSendMessage,
  onBombPress,
  onFollow,
  onSubscribe,
  streamData,
  isFollowing,
}: StreamContentProps) {
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
            viewerCount={viewerCount}
            streamingTime={streamingTime}
            followerCount={finalFollowerCount}
            tags={['버추얼', 'talk']}
            isFollowing={isFollowing}
            onFollow={onFollow}
            onSubscribe={onSubscribe}
          />
        </VideoInfoContainer>
      )}
      <AnimatedChatBoxContainer>
        <ChatBox
          messages={chatMessages}
          onSendMessage={onSendMessage}
          onBombPress={onBombPress}
        />
      </AnimatedChatBoxContainer>
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

const AnimatedChatBoxContainer = styled(Animated.View)`
  flex: 1;
  width: 100%;
`;

