import { useState, useRef, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AUTO_HIDE_DELAY = 3000;
const ANIMATION_DURATION = 200;

export function useVideoControls() {
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsOpacity = useSharedValue(0);

  const hideControls = () => {
    controlsOpacity.value = withTiming(0, { duration: ANIMATION_DURATION });
    setTimeout(() => {
      setShowControls(false);
    }, ANIMATION_DURATION);
  };

  const showControlsWithAnimation = () => {
    setShowControls(true);
    controlsOpacity.value = withTiming(1, { duration: ANIMATION_DURATION });
    
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    
    hideControlsTimeoutRef.current = setTimeout(() => {
      hideControls();
    }, AUTO_HIDE_DELAY);
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      showControlsWithAnimation();
    }
  };

  const controlsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });

  useEffect(() => {
    // 초기 마운트 시 애니메이션과 함께 컨트롤 표시
    showControlsWithAnimation();
    
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  return {
    showControls,
    controlsAnimatedStyle,
    showControlsWithAnimation,
    toggleControls,
  };
}


