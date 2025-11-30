import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureDetector } from 'react-native-gesture-handler';
import type { ChatMessage } from '@/types/chat';
import { useBombModalAnimation, useBombModalTabs } from '@/hooks/useBombModal';
import * as S from './style';
import { BombModalChatSection } from '@/widgets/bomb-modal/chat-section';
import { BombVideoSection } from '@/widgets/bomb-modal/video-section';

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
  const [selectedTab, setSelectedTab] = useState<TabType>('chat');
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});

  const { panGesture, modalStyle, modalStartY } = useBombModalAnimation({
    visible,
    onClose,
    videoPlayerY,
    videoPlayerHeight,
  });

  const { indicatorStyle } = useBombModalTabs({
    selectedTab,
    tabLayouts,
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
    <S.ModalOverlay>
      <GestureDetector gesture={panGesture}>
        <S.ModalContainer 
          style={modalStyle} 
          bottomInset={insets.bottom} 
          videoPlayerWidth={videoPlayerWidth}
          videoPlayerX={videoPlayerX}
          videoPlayerTop={modalStartY}
        >
        <S.ModalHandle />
        
        <S.ContentArea>
          <S.Label>후원하기</S.Label>
          
          <S.TabBar>
            <S.TabsContainer>
              <S.TabButton
                onLayout={(e: LayoutChangeEvent) => handleTabLayout('chat', e)}
                onPress={() => setSelectedTab('chat')}
              >
                <S.TabText isActive={selectedTab === 'chat'}>채팅</S.TabText>
              </S.TabButton>
              <S.TabButton
                onLayout={(e: LayoutChangeEvent) => handleTabLayout('video', e)}
                onPress={() => setSelectedTab('video')}
              >
                <S.TabText isActive={selectedTab === 'video'}>영상</S.TabText>
              </S.TabButton>
              <S.AnimatedIndicator style={indicatorStyle} />
            </S.TabsContainer>
          </S.TabBar>

          <S.TabContent>
            {selectedTab === 'chat' && (
                <BombModalChatSection />
            )}
            {selectedTab === 'video' && (
              <BombVideoSection />
            )}
          </S.TabContent>
        </S.ContentArea>
        </S.ModalContainer>
      </GestureDetector>
    </S.ModalOverlay>
  );
}