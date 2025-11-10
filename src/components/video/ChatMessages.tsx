import { useRef, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import type { ThemeProps } from '@/theme/types';
import Text from '@/components/ui/Text';
import type { ChatMessage } from '@/types/chat';
import { Sparkles, Megaphone } from 'lucide-react-native';

interface ChatMessagesProps {
  messages: ChatMessage[];
  onScrollStateChange?: (isAtBottom: boolean) => void;
}

export default function ChatMessages({
  messages,
  onScrollStateChange,
}: ChatMessagesProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const checkIfAtBottom = (contentHeight: number, scrollViewHeight: number, scrollY: number) => {
    const threshold = 50; // 50px 여유를 둠
    return contentHeight - scrollViewHeight - scrollY <= threshold;
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const contentH = contentSize.height;
    const scrollH = layoutMeasurement.height;
    
    setContentHeight(contentH);
    setScrollViewHeight(scrollH);
    
    const atBottom = checkIfAtBottom(contentH, scrollH, scrollY);
    setIsAtBottom(atBottom);
    
    if (onScrollStateChange) {
      onScrollStateChange(atBottom);
    }
  };

  useEffect(() => {
    if (messages.length > 0 && isAtBottom) {
      // 약간의 딜레이를 두어 레이아웃이 완료된 후 스크롤
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isAtBottom]);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <MessagesContainer
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onContentSizeChange={(width: number, height: number) => {
        setContentHeight(height);
        if (isAtBottom) {
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      }}
      onLayout={(event: any) => {
        setScrollViewHeight(event.nativeEvent.layout.height);
      }}
    >
      {messages.length === 0 ? (
        <EmptyState>
          <Text size={14} weight="400" color="#777777" align="center">
            채팅 메시지가 없습니다
          </Text>
        </EmptyState>
      ) : (
        messages.map((msg) => {
          if (msg.type === 'subscription') {
            return (
              <SubscriptionNotification key={msg.id}>
                <SubscriptionContent>
                  <SubscriptionText>
                    <Text size={13} weight="400" color="#FFFFFF">
                      {msg.username} 님이
                    </Text>
                    <Text size={13} weight="400" color="#FF0055">
                      {' '}{msg.subscriptionMonths}개월동안 구독 중이에요
                    </Text>
                    <Text size={13} weight="400" color="#FFFFFF">
                      {' '}🎉
                    </Text>
                  </SubscriptionText>
                </SubscriptionContent>
                <SparklesIcon>
                  <Sparkles size={16} color="#FF0055" fill="#FF0055" />
                </SparklesIcon>
              </SubscriptionNotification>
            );
          }

          if (msg.type === 'filter-notice') {
            return (
              <FilterNotice key={msg.id}>
                <MegaphoneIcon>
                  <Megaphone size={16} color="#A3A3A3" />
                </MegaphoneIcon>
                <FilterNoticeText>
                  <Text size={12} weight="400" color="#A3A3A3">
                    {msg.message}
                  </Text>
                </FilterNoticeText>
              </FilterNotice>
            );
          }

          return (
            <MessageItem key={msg.id}>
              <MessageText color={msg.textColor || '#FFFFFF'}>
                {msg.message}
              </MessageText>
            </MessageItem>
          );
        })
      )}
    </MessagesContainer>
  );
}

const MessagesContainer = styled.ScrollView`
  flex: 1;
  padding: 12px 16px;
`

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`

const MessageItem = styled.View`
  margin-bottom: 8px;
  padding: 0;
`

const MessageText = styled(Text)<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }: { color?: string }) => color || '#FFFFFF'};
`

const SubscriptionNotification = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #000000;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
`

const SubscriptionContent = styled.View`
  flex: 1;
`

const SubscriptionText = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const SparklesIcon = styled.View`
  margin-left: 8px;
`

const FilterNotice = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  gap: 8px;
`

const MegaphoneIcon = styled.View`
  align-items: center;
  justify-content: center;
`

const FilterNoticeText = styled.View`
  flex: 1;
`

