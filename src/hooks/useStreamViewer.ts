import { useState, useEffect, useRef, useMemo } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import type { ChatMessage } from '@/types/chat';
import { useChat, type ChatItem } from '@/features/chat/use-chat';

interface UseStreamViewerOptions {
  showControlsWithAnimation: () => void;
  isFullscreen: boolean;
  streamId: string;
  username: string;
}

// ChatItem을 ChatMessage로 변환하는 함수
const convertChatItemToMessage = (item: ChatItem, index: number): ChatMessage => {
  const uniqueId = `${item.type || 'message'}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
  
  if (item.type === 'sponsor') {
    return {
      id: uniqueId,
      username: item.viewerName,
      message: item.chatting,
      timestamp: new Date(),
      type: 'normal',
      textColor: item.color,
    };
  }
  
  return {
    id: uniqueId,
    username: item.viewerName,
    message: item.chatting,
    timestamp: new Date(),
    type: 'normal',
    textColor: item.color,
  };
};

export function useStreamViewer({ showControlsWithAnimation, isFullscreen, streamId, username }: UseStreamViewerOptions) {
  console.log(username)
  const { chatList, sendMessage: sendChatMessage } = useChat(username || '');
  
  useEffect(() => {
    if (streamId) {
      console.log('🔌 useStreamViewer: streamId 전달됨', streamId);
    } else {
      console.warn('⚠️ useStreamViewer: streamId가 없습니다');
    }
  }, [streamId]);
  
  const [showBombModal, setShowBombModal] = useState(false);
  const [videoPlayerHeight, setVideoPlayerHeight] = useState(0);
  const [videoPlayerWidth, setVideoPlayerWidth] = useState(0);
  const [videoPlayerX, setVideoPlayerX] = useState(0);
  const [videoPlayerY, setVideoPlayerY] = useState(0);
  const showControlsRef = useRef(showControlsWithAnimation);
  
  const [viewerCount] = useState(17);
  const [streamingTime] = useState('02:01:07');
  const [followerCount] = useState(3);
  
  // ChatItem을 ChatMessage로 변환
  const chatMessages = useMemo<ChatMessage[]>(() => {
    return chatList.map((item, index) => convertChatItemToMessage(item, index));
  }, [chatList]);

  showControlsRef.current = showControlsWithAnimation;

  useEffect(() => {
    if (isFullscreen) {
      showControlsRef.current();
    }
  }, [isFullscreen]);

  const handleVideoPlayerLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setVideoPlayerHeight(height);
    setVideoPlayerWidth(width);
    setVideoPlayerX(x);
    setVideoPlayerY(y);
  };

  const handleFollow = () => {
    // 팔로우 로직
  };

  const handleSubscribe = () => {
    // 구독 로직
  };

  const handleSendMessage = async (message: string) => {
    await sendChatMessage(message);
  };

  return {
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
    handleFollow,
    handleSubscribe,
    handleSendMessage,
  };
}

