import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

type Props = {
  /** 0–5, supports .5 increments for display. */
  rating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  /** When true, tapping a star sets a whole-number rating via onChange. */
  interactive?: boolean;
  onChange?: (rating: number) => void;
};

export function StarRating({
  rating,
  size = 18,
  color = colors.primaryContainer,
  emptyColor = colors.outlineVariant,
  interactive = false,
  onChange,
}: Props) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const diff = rating - (starIndex - 1);
        const iconName: 'star' | 'star-half' | 'star-border' =
          diff >= 1 ? 'star' : diff >= 0.5 ? 'star-half' : 'star-border';
        const icon = (
          <MaterialIcons
            name={iconName}
            size={size}
            color={iconName === 'star-border' ? emptyColor : color}
          />
        );

        if (!interactive) {
          return (
            <View key={starIndex} style={styles.star}>
              {icon}
            </View>
          );
        }

        return (
          <Pressable
            key={starIndex}
            hitSlop={8}
            onPress={() => onChange?.(starIndex)}
            style={styles.starPressable}
          >
            {icon}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  star: { marginRight: 2 },
  starPressable: { marginRight: 2, padding: 4 },
});
