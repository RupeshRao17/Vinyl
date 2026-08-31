import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { StarRating } from './StarRating';
import { ScalePressable } from './ScalePressable';
import { colors, radius, spacing, typography } from '../constants/theme';
import type { DiaryEntry } from '../types/models';

type Props = {
  entry: DiaryEntry;
  onPress?: () => void;
};

export function DiaryEntryCard({ entry, onPress }: Props) {
  return (
    <ScalePressable onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: entry.album.coverUrl }}
        style={styles.cover}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.details}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {entry.album.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {entry.album.artist}
          </Text>
        </View>
        <View style={styles.ratingBlock}>
          <StarRating rating={entry.rating} size={16} />
          {!!entry.review && (
            <Text style={styles.review} numberOfLines={3}>
              "{entry.review}"
            </Text>
          )}
        </View>
      </View>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.default,
    padding: spacing.md,
  },
  cover: {
    width: 96,
    height: 96,
    borderRadius: radius.default,
    backgroundColor: colors.surfaceContainer,
  },
  details: { flex: 1, justifyContent: 'space-between' },
  title: { ...typography.headlineMd, fontSize: 18, color: colors.onSurface },
  artist: { ...typography.bodyMd, color: colors.secondary, marginTop: 2 },
  ratingBlock: { marginTop: spacing.sm },
  review: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    marginTop: spacing.xs,
    lineHeight: 19,
  },
});
