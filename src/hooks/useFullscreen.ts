import { useState, useEffect, useRef } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useFullscreen(onEnterFullscreen?: () => void) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const onEnterFullscreenRef = useRef(onEnterFullscreen);
  onEnterFullscreenRef.current = onEnterFullscreen;

  useEffect(() => {
    if (isFullscreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      onEnterFullscreenRef.current?.();
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    return () => {
      if (!isFullscreen) {
        ScreenOrientation.unlockAsync();
      }
    };
  }, [isFullscreen]);

  const enterFullscreen = () => {
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}

