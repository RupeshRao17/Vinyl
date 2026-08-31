import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * Wrap any card/cover in this instead of a plain Pressable to get a soft
 * scale-down-on-press effect — small detail, but it's what makes tapping
 * through covers feel tactile rather than flat.
 */
export function ScalePressable({ onPress, style, children }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.96, { damping: 18, stiffness: 300 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 18, stiffness: 300 });
    })
    .onEnd(() => {
      if (onPress) onPress();
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
}
