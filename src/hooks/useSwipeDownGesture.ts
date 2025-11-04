import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const SWIPE_THRESHOLD = 50;

export function useSwipeDownGesture(onSwipeDown: () => void) {
  const gesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY > SWIPE_THRESHOLD) {
      runOnJS(onSwipeDown)();
    }
  });

  return gesture;
}


