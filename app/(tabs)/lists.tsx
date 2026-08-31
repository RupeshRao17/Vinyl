import React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { TopAppBar } from '../../components/TopAppBar';
import { ListCollage } from '../../components/ListCollage';
import { lists, albums } from '../../data/mock';
import { colors, radius, spacing, typography } from '../../constants/theme';

export default function ListsScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <TopAppBar
        variant="home"
        onLeftPress={() => {}}
        onRightPress={() => router.push('/search')}
      />
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.pageHeaderRow}>
            <Text style={styles.pageTitle}>My Lists</Text>
            <Pressable style={styles.newButton} onPress={() => router.push('/create-list')}>
              <MaterialIcons name="add" size={18} color={colors.onPrimaryContainer} />
              <Text style={styles.newButtonText}>New List</Text>
            </Pressable>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item, index }) => {
          const coverUrls = item.albumIds
            .map((id) => albums.find((a) => a.id === id)?.coverUrl)
            .filter((u): u is string => !!u);
          return (
            <Animated.View entering={FadeInUp.duration(350).delay(index * 60)}>
              <Pressable style={styles.listCard} onPress={() => router.push(`/list/${item.id}`)}>
                <ListCollage coverUrls={coverUrls} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {!!item.description && (
                    <Text style={styles.listDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                  <Text style={styles.listCount}>{item.albumIds.length} albums</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color={colors.outline} />
              </Pressable>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  listContent: { padding: spacing.marginMobile, paddingBottom: 100 },
  pageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
    paddingBottom: spacing.sm,
  },
  pageTitle: { ...typography.headlineMd, color: colors.onSurface },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radius.default,
  },
  newButtonText: { ...typography.labelSm, color: colors.onPrimaryContainer },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
    padding: spacing.md,
  },
  listTitle: { ...typography.headlineMd, fontSize: 18, color: colors.onSurface },
  listDescription: { ...typography.bodyMd, fontSize: 14, color: colors.onSurfaceVariant, marginTop: 2 },
  listCount: { ...typography.dataMd, fontSize: 12, color: colors.secondary, marginTop: 6 },
});
