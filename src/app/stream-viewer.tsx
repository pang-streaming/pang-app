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
import BombModal from '@/components/modal/BombModal';
import { useStreamDetail } from '@/entities/stream/useStream';
import { useFollowUser } from '@/features/follow/useFollow';
import { useUsernameToInfo } from '@/entities/user/useUser';
import { Alert } from 'react-native';
import { useEffect } from 'react';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function StreamViewer() {
  const { streamId } = useLocalSearchParams<{ streamId: string }>();
  const { streamData } = useStreamDetail(streamId);
  const {
    showControls,
    controlsAnimatedStyle,
    showControlsWithAnimation,
    toggleControls,
  } = useVideoControls();

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const { player } = useVideoPlayerControls({
    source: videoSource,
    onPlayPause: showControlsWithAnimation,
  });

  const swipeDownGesture = useSwipeDownGesture(exitFullscreen);

  const {
    showVideoInfo,
    videoInfoStyle,
    videoInfoHeight,
    originalHeightRef,
  } = useVideoInfoAnimation(showControls, isFullscreen);

  // 팔로우 기능 - otherUserInfo의 isFollowed 값으로 상태 관리
  const { data: otherUserData } = useUsernameToInfo({ 
    username: streamData?.username || '' 
  });
  const { mutate: followMutate } = useFollowUser();

  // otherUserInfo에서 가져온 isFollowed 값으로 팔로우 상태 판단
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
  } = useStreamViewer({ showControlsWithAnimation, isFullscreen });

  const handleFullscreen = () => {
    enterFullscreen();
    showControlsWithAnimation();
  };

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
      
      <BombModal
        visible={showBombModal}
        onClose={() => setShowBombModal(false)}
        videoPlayerWidth={videoPlayerWidth}
        videoPlayerX={videoPlayerX}
        videoPlayerY={videoPlayerY}
        videoPlayerHeight={videoPlayerHeight}
        chatMessages={chatMessages}
      />
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