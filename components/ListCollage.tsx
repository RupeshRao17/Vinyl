import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius } from '../constants/theme';

export function ListCollage({ coverUrls }: { coverUrls: string[] }) {
  const covers = coverUrls.slice(0, 4);
  return (
    <View style={styles.grid}>
      {covers.map((uri, i) => (
        <Image key={i} source={{ uri }} style={styles.tile} contentFit="cover" />
      ))}
      {/* Pad with empty tiles so a 1-3 album list still fills the square */}
      {Array.from({ length: Math.max(0, 4 - covers.length) }).map((_, i) => (
        <View key={`empty-${i}`} style={[styles.tile, styles.emptyTile]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: 72,
    height: 72,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: radius.default,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  tile: { width: '50%', height: '50%' },
  emptyTile: { backgroundColor: colors.surfaceContainer },
});
