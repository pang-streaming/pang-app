import { useState, useEffect, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import type { ChatMessage } from '@/types/chat';

interface UseStreamViewerOptions {
  showControlsWithAnimation: () => void;
  isFullscreen: boolean;
}

export function useStreamViewer({ showControlsWithAnimation, isFullscreen }: UseStreamViewerOptions) {
  const [showBombModal, setShowBombModal] = useState(false);
  const [videoPlayerHeight, setVideoPlayerHeight] = useState(0);
  const [videoPlayerWidth, setVideoPlayerWidth] = useState(0);
  const [videoPlayerX, setVideoPlayerX] = useState(0);
  const [videoPlayerY, setVideoPlayerY] = useState(0);
  const showControlsRef = useRef(showControlsWithAnimation);
  
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

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: '나',
      message,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
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

