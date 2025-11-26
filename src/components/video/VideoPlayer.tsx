import { Pressable, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import { VideoView, VideoPlayer as ExpoVideoPlayer } from 'expo-video';
import Text from '@/components/ui/Text';
import Dismiss from '@/components/icons/Dismiss';
import type { StyleProp, ViewStyle } from 'react-native';

interface VideoPlayerProps {
  player: ExpoVideoPlayer;
  showControls: boolean;
  controlsAnimatedStyle: StyleProp<ViewStyle>;
  toggleControls: () => void;
  isFullscreen: boolean;
  onExitFullscreen: () => void;
  onEnterFullscreen: () => void;
  onClose?: () => void;
  swipeDownGesture?: any;
}

export default function VideoPlayer({
  player,
  showControls,
  controlsAnimatedStyle,
  toggleControls,
  isFullscreen,
  onExitFullscreen,
  onEnterFullscreen,
  onClose,
  swipeDownGesture,
}: VideoPlayerProps) {
  const insets = useSafeAreaInsets();

  // 플레이어가 초기화되지 않았으면 렌더링하지 않음
  if (!player) {
    return null;
  }

  // 플레이어가 안전하게 접근 가능한지 확인
  try {
    // 플레이어 객체가 유효한지 확인 (에러가 발생하지 않으면 유효)
    if (typeof player !== 'object') {
      return null;
    }
  } catch (error) {
    console.warn('Player not ready:', error);
    return null;
  }

  if (isFullscreen) {
    return (
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
                  <CloseButton onPress={onExitFullscreen}>
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
                  <FullscreenButton onPress={onExitFullscreen}>
                    <Text size={20} color="#FFFFFF">⛶</Text>
                  </FullscreenButton>
                </BottomControls>
              </>
            )}
          </FullscreenVideoContainer>
        </FullscreenContainer>
      </GestureDetector>
    );
  }

  return (
    <SafeAreaView edges={['top']}>
      <VideoContainer>
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
              <CloseButton onPress={onClose}>
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
              <FullscreenButton onPress={onEnterFullscreen}>
                <Text size={20} color="#FFFFFF">⛶</Text>
              </FullscreenButton>
            </BottomControls>
          </>
        )}
      </VideoContainer>
    </SafeAreaView>
  );
}

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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const FullscreenVideoContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
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
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border-radius: 4px;
`

