import { Pressable, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { VideoView } from 'expo-video';
import Text from '@/components/ui/Text';
import Dismiss from '@/components/icons/Dismiss';
import { useVideoControls } from '@/hooks/useVideoControls';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useVideoPlayerControls } from '@/hooks/useVideoPlayerControls';
import { useSwipeDownGesture } from '@/hooks/useSwipeDownGesture';
import { router } from 'expo-router';
import { useEffect } from 'react';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function StreamViewer() {
  const insets = useSafeAreaInsets();
  
  const {
    showControls,
    controlsAnimatedStyle,
    showControlsWithAnimation,
    toggleControls,
  } = useVideoControls();

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(
    showControlsWithAnimation
  );

  const { player, isPlaying, handlePlayPause } = useVideoPlayerControls({
    source: videoSource,
    onPlayPause: showControlsWithAnimation,
  });

  const swipeDownGesture = useSwipeDownGesture(exitFullscreen);

  const handleFullscreen = () => {
    enterFullscreen();
    showControlsWithAnimation();
  };

  useEffect(() => {
    if (isFullscreen) {
      showControlsWithAnimation();
    }
  }, [isFullscreen]);

  return (
    <Container>
      {isFullscreen ? (
        <GestureDetector gesture={swipeDownGesture}>
          <FullscreenContainer>
            <FullscreenVideoContainer>
              <Pressable 
                style={{ width: '100%', height: '100%' }}
                onPress={toggleControls}
              >
                <VideoView 
                  style={{ width: '100%', height: '100%' }} 
                  player={player} 
                  allowsPictureInPicture={false}
                  nativeControls={false}
                  contentFit="contain"
                />
              </Pressable>
                {showControls && (
                  <>
                    <TopGradient style={controlsAnimatedStyle}>
                      <LinearGradient
                        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </TopGradient>
                    <BottomGradient style={controlsAnimatedStyle}>
                      <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </BottomGradient>
                    <TopControls style={controlsAnimatedStyle} topInset={insets.top}>
                      <CloseButton onPress={exitFullscreen}>
                        <Dismiss color="#FFFFFF" />
                      </CloseButton>
                      <TopRightButtons>
                        <IconButton>
                          <Text size={20} color="#FFFFFF">↗</Text>
                        </IconButton>
                        <IconButton>
                          <Text size={20} color="#FFFFFF">⋯</Text>
                        </IconButton>
                      </TopRightButtons>
                    </TopControls>
                    <BottomControls style={controlsAnimatedStyle} bottomInset={insets.bottom}>
                      <LiveIconContainer>
                        <LiveIcon />
                        <Text size={12} weight="600" color="#FFFFFF">
                          LIVE
                        </Text>
                      </LiveIconContainer>
                      <FullscreenButton onPress={exitFullscreen}>
                        <Text size={20} color="#FFFFFF">⛶</Text>
                      </FullscreenButton>
                    </BottomControls>
                  </>
                )}
            </FullscreenVideoContainer>
          </FullscreenContainer>
        </GestureDetector>
      ) : (
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <VideoContainer>
            <Pressable 
              style={{ width: '100%', height: '100%' }}
              onPress={toggleControls}
            >
              <VideoView 
                style={{ width: '100%', height: '100%' }} 
                player={player} 
                allowsPictureInPicture 
                nativeControls={false}
                contentFit="contain"
                allowsFullscreen={false}
              />
            </Pressable>
            {showControls && (
              <>
                <TopGradient style={controlsAnimatedStyle}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                    style={{ width: '100%', height: '100%' }}
                  />
                </TopGradient>
                <BottomGradient style={controlsAnimatedStyle}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                    style={{ width: '100%', height: '100%' }}
                  />
                </BottomGradient>
                <TopControls style={controlsAnimatedStyle}>
                  <CloseButton onPress={() => router.back()}>
                    <Dismiss color="#FFFFFF" />
                  </CloseButton>
                  <TopRightButtons>
                    <IconButton>
                      <Text size={20} color="#FFFFFF">↗</Text>
                    </IconButton>
                    <View style={{ width: 12 }} />
                    <IconButton>
                      <Text size={20} color="#FFFFFF">⋯</Text>
                    </IconButton>
                  </TopRightButtons>
                </TopControls>
                <BottomControls style={controlsAnimatedStyle}>
                  <LiveIconContainer>
                    <LiveIcon />
                    <Text size={12} weight="600" color="#FFFFFF">
                      LIVE
                    </Text>
                  </LiveIconContainer>
                  <FullscreenButton onPress={handleFullscreen}>
                    <Text size={20} color="#FFFFFF">⛶</Text>
                  </FullscreenButton>
                </BottomControls>
              </>
            )}
          </VideoContainer>
        </SafeAreaView>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`

const VideoContainer = styled.View`
  width: 100%;
  aspect-ratio: 16/9;
  align-items: center;
  justify-content: center;
  position: relative;
`

const TopGradient = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 5;
  pointer-events: none;
`

const BottomGradient = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 5;
  pointer-events: none;
`

const TopControls = styled(Animated.View)<{ topInset?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-top: ${({ topInset = 0 }) => topInset + 10}px;
  z-index: 10;
`

const BottomControls = styled(Animated.View)<{ bottomInset?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: ${({ bottomInset = 0 }) => bottomInset + 10}px;
  z-index: 10;
`

const CloseButton = styled(Pressable)`
  padding: 8px;
  align-items: center;
  justify-content: center;
`

const TopRightButtons = styled.View`
  flex-direction: row;
  align-items: center;
`

const IconButton = styled(Pressable)`
  padding: 8px;
  align-items: center;
  justify-content: center;
`

const FullscreenButton = styled(Pressable)`
  padding: 8px;
  align-items: center;
  justify-content: center;
`

const FullscreenContainer = styled.View`
  flex: 1;
  background-color: #000000;
  width: 100%;
  height: 100%;
  position: relative;
`

const FullscreenVideoContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`


const LiveIcon = styled.View`
  width: 8px;
  height: 8px;
  
  background-color: #FF0055;
  border-radius: 50%;
`

const LiveIconContainer = styled.View`
  background-color: rgba(18,18,18,0.9);
  padding: 2px 4px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border-radius: 4px;
`