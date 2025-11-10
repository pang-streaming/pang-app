import { Pressable, LayoutChangeEvent, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  clamp,
  Easing,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Text from '@/components/ui/Text';
import ChatMessages from '@/components/video/ChatMessages';
import type { ChatMessage } from '@/types/chat';

type TabType = 'chat' | 'video' | 'mission';

interface BombModalProps {
  visible: boolean;
  onClose: () => void;
  videoPlayerWidth?: number;
  videoPlayerX?: number;
  videoPlayerY?: number;
  videoPlayerHeight?: number;
  chatMessages?: ChatMessage[];
}

export default function BombModal({ 
  visible, 
  onClose, 
  videoPlayerWidth = 0,
  videoPlayerX = 0,
  videoPlayerY = 0,
  videoPlayerHeight = 0,
  chatMessages = [],
}: BombModalProps) {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  const modalStartY = videoPlayerY + videoPlayerHeight;
  const modalHeight = screenHeight - modalStartY;
  const translateY = useSharedValue(modalHeight);
  const startY = useSharedValue(0);
  const [selectedTab, setSelectedTab] = useState<TabType>('chat');
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const closeModal = () => {
    onClose();
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      // 아래로만 드래그 가능 (양수 값만)
      const newTranslateY = startY.value + event.translationY;
      translateY.value = clamp(newTranslateY, 0, modalHeight);
    })
    .onEnd((event) => {
      const shouldClose = 
        event.translationY > modalHeight * 0.3 || // 30% 이상 드래그
        event.velocityY > 500; // 빠른 속도로 드래그

      if (shouldClose) {
        translateY.value = withTiming(modalHeight, { duration: 300 }, () => {
          runOnJS(closeModal)();
        });
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 30,
        stiffness: 200,
        mass: 1.2,
      });
    } else {
      translateY.value = modalHeight;
    }
  }, [visible, modalHeight]);

  useEffect(() => {
    if (tabLayouts[selectedTab]) {
      const { x, width } = tabLayouts[selectedTab];
      indicatorX.value = withSpring(x, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
      indicatorWidth.value = withSpring(width, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
    }
  }, [selectedTab, tabLayouts]);

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorWidth.value,
    };
  });

  const handleTabLayout = (tab: TabType, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({
      ...prev,
      [tab]: { x, width },
    }));
  };

  if (!visible || videoPlayerWidth === 0 || videoPlayerHeight === 0) return null;

  return (
    <ModalOverlay>
      <GestureDetector gesture={panGesture}>
        <ModalContainer 
          style={modalStyle} 
          bottomInset={insets.bottom} 
          videoPlayerWidth={videoPlayerWidth}
          videoPlayerX={videoPlayerX}
          videoPlayerTop={modalStartY}
        >
        <ModalHandle />
        
        <ContentArea>
          {selectedTab === 'chat' && (
            <ChatContent>
              <ChatMessages messages={chatMessages} />
            </ChatContent>
          )}
          {selectedTab === 'video' && (
            <EmptyContent>
              <Text size={14} color="#777777" align="center">
                영상 콘텐츠
              </Text>
            </EmptyContent>
          )}
          {selectedTab === 'mission' && (
            <EmptyContent>
              <Text size={14} color="#777777" align="center">
                미션 콘텐츠
              </Text>
            </EmptyContent>
          )}
        </ContentArea>
        </ModalContainer>
      </GestureDetector>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const ModalContainer = styled(Animated.View)<{ 
  bottomInset: number; 
  videoPlayerWidth: number;
  videoPlayerX: number;
  videoPlayerTop: number;
}>`
  position: absolute;
  top: ${({ videoPlayerTop }: { videoPlayerTop: number }) => videoPlayerTop}px;
  left: ${({ videoPlayerX }: { videoPlayerX: number }) => videoPlayerX}px;
  width: ${({ videoPlayerWidth }: { videoPlayerWidth: number }) => videoPlayerWidth}px;
  bottom: 0;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
  flex-direction: column;
`;

const ModalHandle = styled.View`
  width: 40px;
  height: 4px;
  background-color: #777777;
  border-radius: 2px;
  align-self: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const TabBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #222324;
  background-color: #262626;
  position: relative;
  min-height: 48px;
`;

const SponsorButton = styled(Pressable)`
  position: absolute;
  left: 16px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const TabsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
`;

const TabButton = styled(Pressable)<{ isActive?: boolean }>`
  padding: 8px 4px;
  position: relative;
`;

const TabText = styled(Text)<{ isActive?: boolean }>`
  color: ${({ theme, isActive }: ThemeProps & { isActive?: boolean }) => 
    isActive ? theme.colors.primary.normal : '#FFFFFF'};
  font-size: 14px;
  font-weight: ${({ isActive }: { isActive?: boolean }) => isActive ? '600' : '400'};
`;

const AnimatedIndicator = styled(Animated.View)`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  border-radius: 1.5px;
`;

const ContentArea = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const ChatContent = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const EmptyContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

