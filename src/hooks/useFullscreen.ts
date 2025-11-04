import { useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useFullscreen(onEnterFullscreen?: () => void) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      onEnterFullscreen?.();
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    return () => {
      if (!isFullscreen) {
        ScreenOrientation.unlockAsync();
      }
    };
  }, [isFullscreen, onEnterFullscreen]);

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

