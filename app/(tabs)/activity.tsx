import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TopAppBar } from '../../components/TopAppBar';
import { StarRating } from '../../components/StarRating';
import { activityFeed } from '../../data/mock';
import { colors, radius, spacing, typography } from '../../constants/theme';
import type { ActivityItem } from '../../types/models';

function Avatar({ friend }: { friend: ActivityItem['user'] }) {
  if (friend.avatarUrl) {
    return <Image source={{ uri: friend.avatarUrl }} style={styles.avatarImage} />;
  }
  return (
    <View style={styles.avatarFallback}>
      <Text style={styles.avatarInitials}>{friend.initials ?? friend.name[0]}</Text>
    </View>
  );
}

export default function ActivityScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <TopAppBar variant="home" onLeftPress={() => {}} onRightPress={() => router.push('/search')} />
      <FlatList
        data={activityFeed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.pageTitle}>Activity</Text>}
        ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Avatar friend={item.user} />
            <View style={styles.body}>
              <View style={styles.rowBetween}>
                <Text style={styles.actionLine} numberOfLines={1}>
                  <Text style={styles.userName}>{item.user.name}</Text>{' '}
                  {item.action === 'logged' ? 'logged an album' : 'added to wantlist'}
                </Text>
                <Text style={styles.timeLabel}>{item.timeLabel}</Text>
              </View>

              <Pressable onPress={() => router.push(`/album/${item.album.id}`)} style={styles.albumRow}>
                <Image source={{ uri: item.album.coverUrl }} style={styles.albumCover} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.albumTitle} numberOfLines={1}>
                    {item.album.title}
                  </Text>
                  <Text style={styles.albumMeta} numberOfLines={1}>
                    {item.album.artist}
                    {item.album.year ? ` • ${item.album.year}` : ''}
                  </Text>
                  {item.rating !== undefined && (
                    <StarRating rating={item.rating} size={14} />
                  )}
                </View>
              </Pressable>

              {!!item.review && <Text style={styles.review}>{item.review}</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  listContent: { padding: spacing.marginMobile, paddingBottom: 100 },
  pageTitle: { ...typography.headlineMd, color: colors.onSurface, marginBottom: spacing.md },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: 8,
    padding: spacing.md,
  },
  avatarImage: { width: 48, height: 48, borderRadius: 24 },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { ...typography.dataMd, fontWeight: '700', color: colors.onSurfaceVariant },
  body: { flex: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  actionLine: { ...typography.labelSm, color: colors.secondary, flexShrink: 1 },
  userName: { fontWeight: '700', color: colors.onSurface },
  timeLabel: { ...typography.dataMd, fontSize: 12, color: colors.secondary },
  albumRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '4d',
    borderRadius: radius.default,
  },
  albumCover: { width: 64, height: 64, borderRadius: radius.default, backgroundColor: colors.surfaceContainer },
  albumTitle: { ...typography.bodyMd, fontWeight: '600', color: colors.onSurface },
  albumMeta: { ...typography.dataMd, fontSize: 13, color: colors.secondary, marginBottom: 4 },
  review: { ...typography.bodyMd, fontSize: 15, color: colors.onSurfaceVariant, marginTop: spacing.sm },
});
