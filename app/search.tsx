import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { albums } from '../data/mock';
import { colors, radius, spacing, typography } from '../constants/theme';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return albums;
    const q = query.toLowerCase();
    return albums.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurfaceVariant} />
        </Pressable>
        <View style={styles.searchWrap}>
          <MaterialIcons name="search" size={18} color={colors.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search albums, artists..."
            placeholderTextColor={colors.secondary}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No matches for "{query}"</Text>}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.duration(250).delay(Math.min(index, 8) * 30)}>
            <Pressable style={styles.resultRow} onPress={() => router.push(`/album/${item.id}`)}>
              <Image source={{ uri: item.coverUrl }} style={styles.cover} contentFit="cover" />
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {item.artist}
                  {item.year ? ` • ${item.year}` : ''}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.outline} />
            </Pressable>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
  },
  backButton: { padding: spacing.xs },
  searchWrap: { flex: 1, position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: 12, zIndex: 1 },
  searchInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.xl,
    paddingVertical: 10,
    paddingLeft: 36,
    paddingRight: spacing.md,
    ...typography.dataMd,
    color: colors.onSurface,
  },
  listContent: { padding: spacing.marginMobile, paddingBottom: 100, gap: spacing.sm },
  emptyText: { ...typography.bodyMd, color: colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.xl },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  cover: { width: 56, height: 56, borderRadius: radius.default, backgroundColor: colors.surfaceContainer },
  title: { ...typography.bodyMd, fontSize: 15, color: colors.onSurface },
  artist: { ...typography.dataMd, fontSize: 12, color: colors.secondary, marginTop: 2 },
});
