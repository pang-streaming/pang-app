import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { useVideoControls } from '@/hooks/useVideoControls';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useVideoPlayerControls } from '@/hooks/useVideoPlayerControls';
import { useSwipeDownGesture } from '@/hooks/useSwipeDownGesture';
import { router } from 'expo-router';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import VideoPlayer from '@/components/video/VideoPlayer';
import VideoInfo from '@/components/video/VideoInfo';
import ChatBox from '@/components/video/ChatBox';
import BombModal from '@/components/modal/BombModal';
import type { ChatMessage } from '@/types/chat';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function StreamViewer() {
  const {
    showControls,
    controlsAnimatedStyle,
    showControlsWithAnimation,
    toggleControls,
  } = useVideoControls();

  const showControlsRef = useRef(showControlsWithAnimation);
  showControlsRef.current = showControlsWithAnimation;

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const { player } = useVideoPlayerControls({
    source: videoSource,
    onPlayPause: showControlsWithAnimation,
  });

  const swipeDownGesture = useSwipeDownGesture(exitFullscreen);

  const [showVideoInfo, setShowVideoInfo] = useState(true);
  const videoInfoOpacity = useSharedValue(0);
  const videoInfoHeight = useSharedValue(0);
  const videoInfoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const originalHeightRef = useRef<number>(0);
  const [showBombModal, setShowBombModal] = useState(false);
  const [videoPlayerHeight, setVideoPlayerHeight] = useState(0);
  const [videoPlayerWidth, setVideoPlayerWidth] = useState(0);
  const [videoPlayerX, setVideoPlayerX] = useState(0);
  const [videoPlayerY, setVideoPlayerY] = useState(0);

  const videoInfoStyle = useAnimatedStyle(() => {
    return {
      opacity: videoInfoOpacity.value,
      height: videoInfoHeight.value === 0 ? undefined : videoInfoHeight.value,
    };
  });

  const showVideoInfoWithAnimation = useCallback(() => {
    setShowVideoInfo(true);
    videoInfoOpacity.value = withTiming(1, { duration: 500 });
    if (originalHeightRef.current > 0) {
      // 원래 높이가 저장되어 있으면 복원
      videoInfoHeight.value = withTiming(originalHeightRef.current, { duration: 500 });
    }
  }, [videoInfoOpacity, videoInfoHeight]);

  const hideVideoInfoWithAnimation = useCallback(() => {
    // 현재 높이를 저장
    if (videoInfoHeight.value > 0) {
      originalHeightRef.current = videoInfoHeight.value;
    }
    videoInfoOpacity.value = withTiming(0, { duration: 500 });
    videoInfoHeight.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(setShowVideoInfo)(false);
    });
  }, [videoInfoOpacity, videoInfoHeight]);

  const [viewerCount] = useState(17);
  const [streamingTime] = useState('02:01:07');
  const [followerCount] = useState(3);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'sub1',
      username: '대듀08',
      message: '',
      timestamp: new Date(),
      type: 'subscription',
      subscriptionMonths: 37,
    },
    {
      id: '1',
      username: '감귤상은',
      message: '감귤상은 하이',
      timestamp: new Date(),
      type: 'normal',
    },
    {
      id: '2',
      username: '엔레고러브',
      message: '오빠안녕',
      timestamp: new Date(),
      type: 'normal',
    },
    {
      id: 'filter1',
      username: '시스템',
      message: '쾌적한 시청 환경을 위해 일부 메시지는 필터링 됩니다. 클린 라이브 채팅 문화를 만들기에 동참해 주세요!',
      timestamp: new Date(),
      type: 'filter-notice',
    },
    {
      id: '3',
      username: '감귤',
      message: '감귤 하이',
      timestamp: new Date(),
      type: 'normal',
    },
    {
      id: '4',
      username: '대구에듀',
      message: '대구에듀 하이',
      timestamp: new Date(),
      type: 'normal',
      textColor: '#4A9EFF',
    },
  ]);

  const handleFullscreen = () => {
    enterFullscreen();
    showControlsWithAnimation();
  };

  const handleFollow = () => {
    // 팔로우 로직
  };

  const handleSubscribe = () => {
    // 구독 로직
  };

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: '나',
      message,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  useEffect(() => {
    if (isFullscreen) {
      showControlsRef.current();
    }
  }, [isFullscreen]);

  useEffect(() => {
    // 컨트롤이 활성화되면 비디오 정보도 다시 표시
    if (showControls && !isFullscreen) {
      showVideoInfoWithAnimation();
      
      // 기존 타이머가 있으면 클리어
      if (videoInfoTimerRef.current) {
        clearTimeout(videoInfoTimerRef.current);
      }
      
      // 3초 후 VideoInfo 숨기기
      videoInfoTimerRef.current = setTimeout(() => {
        hideVideoInfoWithAnimation();
      }, 3000);
    }

    return () => {
      if (videoInfoTimerRef.current) {
        clearTimeout(videoInfoTimerRef.current);
      }
    };
  }, [showControls, isFullscreen, showVideoInfoWithAnimation, hideVideoInfoWithAnimation]);

  useEffect(() => {
    // 초기 마운트 시 비디오 정보를 애니메이션과 함께 표시
    showVideoInfoWithAnimation();
    
    // 3초 후 VideoInfo 숨기기
    videoInfoTimerRef.current = setTimeout(() => {
      hideVideoInfoWithAnimation();
    }, 3000);

    return () => {
      if (videoInfoTimerRef.current) {
        clearTimeout(videoInfoTimerRef.current);
      }
    };
  }, [showVideoInfoWithAnimation, hideVideoInfoWithAnimation]);

  return (
    <Container>
      <VideoPlayerContainer
        onLayout={(event: LayoutChangeEvent) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setVideoPlayerHeight(height);
          setVideoPlayerWidth(width);
          setVideoPlayerX(x);
          setVideoPlayerY(y);
        }}
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
        <ContentContainer>
          {showVideoInfo && (
            <VideoInfoContainer
              style={videoInfoStyle}
              onLayout={(event: LayoutChangeEvent) => {
                const height = event.nativeEvent.layout.height;
                if (videoInfoHeight.value === 0) {
                  videoInfoHeight.value = height;
                  originalHeightRef.current = height;
                }
              }}
            >
              <VideoInfo
                title="기찬이와 마인크래프트~"
                streamerName="먼지"
                viewerCount={viewerCount}
                streamingTime={streamingTime}
                followerCount={followerCount}
                tags={['버추얼', 'talk']}
                onFollow={handleFollow}
                onSubscribe={handleSubscribe}
              />
            </VideoInfoContainer>
          )}
          <AnimatedChatBoxContainer>
            <ChatBox
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onBombPress={() => setShowBombModal(true)}
            />
          </AnimatedChatBoxContainer>
        </ContentContainer>
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

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const VideoPlayerContainer = styled.View`
  width: 100%;
`;

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