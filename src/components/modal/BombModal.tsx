import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Text from '@/components/ui/Text';
import ChatMessages from '@/components/video/ChatMessages';
import type { ChatMessage } from '@/types/chat';
import { useBombModalAnimation } from '@/hooks/useBombModal';

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

  const { panGesture, modalStyle, modalStartY } = useBombModalAnimation({
    visible,
    onClose,
    videoPlayerY,
    videoPlayerHeight,
  });

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
          <ChatContent>
            <ChatMessages messages={chatMessages} />
          </ChatContent>
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

