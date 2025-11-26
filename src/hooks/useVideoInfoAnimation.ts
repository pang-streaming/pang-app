import { useState, useRef, useCallback, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export function useVideoInfoAnimation(showControls: boolean, isFullscreen: boolean) {
  const [showVideoInfo, setShowVideoInfo] = useState(true);
  const videoInfoOpacity = useSharedValue(0);
  const videoInfoHeight = useSharedValue(0);
  const videoInfoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const originalHeightRef = useRef<number>(0);

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
      videoInfoHeight.value = withTiming(originalHeightRef.current, { duration: 500 });
    }
  }, [videoInfoOpacity, videoInfoHeight]);

  const hideVideoInfoWithAnimation = useCallback(() => {
    if (videoInfoHeight.value > 0) {
      originalHeightRef.current = videoInfoHeight.value;
    }
    videoInfoOpacity.value = withTiming(0, { duration: 500 });
    videoInfoHeight.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(setShowVideoInfo)(false);
    });
  }, [videoInfoOpacity, videoInfoHeight]);

  // 컨트롤이 활성화되면 비디오 정보도 다시 표시
  useEffect(() => {
    if (showControls && !isFullscreen) {
      showVideoInfoWithAnimation();
      
      if (videoInfoTimerRef.current) {
        clearTimeout(videoInfoTimerRef.current);
      }
      
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

  // 초기 마운트 시 비디오 정보를 애니메이션과 함께 표시
  useEffect(() => {
    showVideoInfoWithAnimation();
    
    videoInfoTimerRef.current = setTimeout(() => {
      hideVideoInfoWithAnimation();
    }, 3000);

    return () => {
      if (videoInfoTimerRef.current) {
        clearTimeout(videoInfoTimerRef.current);
      }
    };
  }, [showVideoInfoWithAnimation, hideVideoInfoWithAnimation]);

  return {
    showVideoInfo,
    videoInfoStyle,
    videoInfoHeight,
    originalHeightRef,
  };
}

