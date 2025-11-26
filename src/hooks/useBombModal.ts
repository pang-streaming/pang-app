import { useEffect } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  clamp,
} from 'react-native-reanimated';

type TabType = 'chat' | 'video' | 'mission';

interface UseBombModalProps {
  visible: boolean;
  onClose: () => void;
  videoPlayerY: number;
  videoPlayerHeight: number;
}

interface UseBombModalTabsProps {
  selectedTab: TabType;
  tabLayouts: { [key: string]: { x: number; width: number } };
}

export function useBombModalAnimation({
  visible,
  onClose,
  videoPlayerY,
  videoPlayerHeight,
}: UseBombModalProps) {
  const screenHeight = Dimensions.get('window').height;
  const modalStartY = videoPlayerY + videoPlayerHeight;
  const modalHeight = screenHeight - modalStartY;
  const translateY = useSharedValue(modalHeight);
  const startY = useSharedValue(0);

  const closeModal = () => {
    onClose();
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newTranslateY = startY.value + event.translationY;
      translateY.value = clamp(newTranslateY, 0, modalHeight);
    })
    .onEnd((event) => {
      const shouldClose =
        event.translationY > modalHeight * 0.3 || event.velocityY > 500;

      if (shouldClose) {
        translateY.value = withTiming(modalHeight, { duration: 300 }, () => {
          runOnJS(closeModal)();
        });
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 30,
        stiffness: 200,
        mass: 1.2,
      });
    } else {
      translateY.value = modalHeight;
    }
  }, [visible, modalHeight]);

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return {
    panGesture,
    modalStyle,
    modalStartY,
    modalHeight,
  };
}

export function useBombModalTabs({ selectedTab, tabLayouts }: UseBombModalTabsProps) {
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    if (tabLayouts[selectedTab]) {
      const { x, width } = tabLayouts[selectedTab];
      indicatorX.value = withSpring(x, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
      indicatorWidth.value = withSpring(width, {
        damping: 18,
        stiffness: 300,
        mass: 0.5,
      });
    }
  }, [selectedTab, tabLayouts]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorWidth.value,
    };
  });

  return {
    indicatorStyle,
  };
}

