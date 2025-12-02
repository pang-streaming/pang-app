import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { useVideoControls } from '@/hooks/useVideoControls';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useVideoPlayerControls } from '@/hooks/useVideoPlayerControls';
import { useSwipeDownGesture } from '@/hooks/useSwipeDownGesture';
import { useVideoInfoAnimation } from '@/hooks/useVideoInfoAnimation';
import { useStreamViewer } from '@/hooks/useStreamViewer';
import { router, useLocalSearchParams } from 'expo-router';
import VideoPlayer from '@/components/video/VideoPlayer';
import StreamContent from '@/components/video/StreamContent';
import VideoContent from '@/components/video/VideoContent';
import { useStreamDetail } from '@/entities/stream/useStream';
import { useFollowUser } from '@/features/follow/useFollow';
import { useUsernameToInfo } from '@/entities/user/useUser';
import { Alert, ActivityIndicator, View, Text } from 'react-native';
import { useMemo, useEffect } from 'react';
import BombModal from '@/components/modal/bomb-modal/index';

const FALLBACK_VIDEO_SOURCE =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function StreamViewer() {
  const { streamId, type } = useLocalSearchParams<{ streamId: string; type?: string }>();
  const { streamData } = useStreamDetail(streamId);
  
  const isVideo = type === 'video';
  const {
    showControls,
    controlsAnimatedStyle,
    showControlsWithAnimation,
    toggleControls,
  } = useVideoControls();

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  useEffect(() => {
    if (streamData) {
      console.log('✅ StreamViewer: 방송 데이터 로드 완료', {
        streamId: streamData.streamId,
        title: streamData.title,
        username: streamData.username,
        url: streamData.url,
        followers: streamData.followers,
      });
    }
  }, [streamData]);

  const videoSource = useMemo(() => {
    if (streamData?.url && streamData.url.trim() !== '') {
      return streamData.url;
    }
    return FALLBACK_VIDEO_SOURCE;
  }, [streamData?.url]);

  const { player, error: playerError } = useVideoPlayerControls({
    source: videoSource || '',
    onPlayPause: showControlsWithAnimation,
    isLive: !isVideo,
  });

  const swipeDownGesture = useSwipeDownGesture(exitFullscreen);

  const {
    showVideoInfo,
    videoInfoStyle,
    videoInfoHeight,
    originalHeightRef,
  } = useVideoInfoAnimation(showControls, isFullscreen);

  const { data: otherUserData } = useUsernameToInfo({ 
    username: streamData?.username || '' 
  });
  const { mutate: followMutate } = useFollowUser();

  const isFollowing = otherUserData?.data?.isFollowed ?? false;

  const toggleFollow = () => {
    if (!streamData?.username) {
      Alert.alert('오류', '사용자 정보를 불러올 수 없습니다.');
      return;
    }

    followMutate(
      {
        username: streamData.username,
        isFollowing,
      },
      {
        onError: (error) => {
          console.error('팔로우 실패:', error);
          Alert.alert('오류', '팔로우 요청에 실패했습니다.');
        },
      }
    );
  };
  const {
    showBombModal,
    setShowBombModal,
    videoPlayerHeight,
    videoPlayerWidth,
    videoPlayerX,
    videoPlayerY,
    viewerCount,
    streamingTime,
    followerCount,
    chatMessages,
    handleVideoPlayerLayout,
    handleSubscribe,
    handleSendMessage,
  } = useStreamViewer({ 
    showControlsWithAnimation, 
    isFullscreen,
    streamId: streamId || streamData?.streamId || '',
    username: streamData?.username ?? 'user'
  });

  const videoViewCount = isVideo ? 0 : viewerCount; 
  const videoUploadDate = isVideo ? '' : streamingTime; 

  const handleFullscreen = () => {
    enterFullscreen();
    showControlsWithAnimation();
  };

  if (!streamData || !videoSource) {
    return (
      <Container isFullscreen={false}>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      </Container>
    );
  }

  if (playerError) {
    return (
      <Container isFullscreen={false}>
        <ErrorContainer>
          <ErrorText>비디오를 불러올 수 없습니다.</ErrorText>
          <ErrorText style={{ marginTop: 8, fontSize: 12 }}>
            {playerError}
          </ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container isFullscreen={isFullscreen}>
      <VideoPlayerContainer 
        isFullscreen={isFullscreen}
        onLayout={handleVideoPlayerLayout}
      >
        <VideoPlayer
          player={player}
          showControls={showControls}
          controlsAnimatedStyle={controlsAnimatedStyle}
          toggleControls={toggleControls}
          isFullscreen={isFullscreen}
          onExitFullscreen={exitFullscreen}
          onEnterFullscreen={handleFullscreen}
          onClose={() => router.back()}
          swipeDownGesture={swipeDownGesture}
        />
      </VideoPlayerContainer>
      
      {!isFullscreen && (
        <>
          {isVideo ? (
            <VideoContent
              showVideoInfo={showVideoInfo}
              videoInfoStyle={videoInfoStyle}
              videoInfoHeight={videoInfoHeight}
              originalHeightRef={originalHeightRef}
              viewCount={videoViewCount}
              uploadDate={videoUploadDate}
              followerCount={followerCount}
              onFollow={toggleFollow}
              onSubscribe={handleSubscribe}
              streamData={streamData}
              isFollowing={isFollowing}
            />
          ) : (
            <StreamContent
              showVideoInfo={showVideoInfo}
              videoInfoStyle={videoInfoStyle}
              videoInfoHeight={videoInfoHeight}
              originalHeightRef={originalHeightRef}
              viewerCount={viewerCount}
              streamingTime={streamingTime}
              followerCount={followerCount}
              chatMessages={chatMessages}
              onSendMessage={handleSendMessage}
              onBombPress={() => setShowBombModal(true)}
              onFollow={toggleFollow}
              onSubscribe={handleSubscribe}
              streamData={streamData}
              isFollowing={isFollowing}
            />
          )}
        </>
      )}
      
      {!isVideo && (
        <BombModal
          visible={showBombModal}
          onClose={() => setShowBombModal(false)}
          videoPlayerWidth={videoPlayerWidth}
          videoPlayerX={videoPlayerX}
          videoPlayerY={videoPlayerY}
          videoPlayerHeight={videoPlayerHeight}
          chatMessages={chatMessages}
        />
      )}
    </Container>
  );
}

const Container = styled.View<{ isFullscreen?: boolean }>`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme, isFullscreen }: ThemeProps & { isFullscreen?: boolean }) => 
    isFullscreen ? '#000000' : theme.colors.background.normal};
  ${({ isFullscreen }: { isFullscreen?: boolean }) => isFullscreen && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  `}
`;

const VideoPlayerContainer = styled.View<{ isFullscreen?: boolean }>`
  width: 100%;
  ${({ isFullscreen }: { isFullscreen?: boolean }) => isFullscreen && `
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  font-size: 16px;
  text-align: center;
`;