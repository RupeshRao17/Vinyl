import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius, typography, spacing } from '../constants/theme';
import { ScalePressable } from './ScalePressable';

type Props = {
  coverUrl: string;
  rank?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AlbumCover({ coverUrl, rank, onPress, style }: Props) {
  return (
    <ScalePressable onPress={onPress} style={[styles.wrap, style]}>
      <Image source={{ uri: coverUrl }} style={styles.image} contentFit="cover" transition={200} />
      {rank !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{String(rank).padStart(2, '0')}</Text>
        </View>
      )}
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    aspectRatio: 1,
    borderRadius: radius.default,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  image: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: 'rgba(252,249,243,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.default,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  badgeText: { ...typography.dataMd, fontSize: 12, color: colors.primary, fontWeight: '600' },
});
