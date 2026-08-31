import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TopAppBar } from '../../components/TopAppBar';
import { AlbumCover } from '../../components/AlbumCover';
import { StarRating } from '../../components/StarRating';
import { albums, activityFeed } from '../../data/mock';
import { colors, radius, spacing, typography } from '../../constants/theme';

const stats = [
  { label: 'Albums Logged', value: '1,248' },
  { label: 'Wantlist', value: '342' },
  { label: 'Avg Rating', value: '4.2 ★' },
  { label: 'Joined', value: "Oct '21" },
];

const heavyRotation = albums.slice(4, 8); // favorites shelf

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <TopAppBar variant="home" onLeftPress={() => {}} onRightPress={() => router.push('/search')} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile header */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvJUbQQaMJXfpxC7V-PNTLa4yhoIMrx04WMKi2xoGE1mF-gV8j44uI-ANQ1wmBVkBa3W2qsLN0U8OKqOhvRGq1HdmObsYSSc3Jnqh0LbNfLI3BsXlQ60lzOKdSIMP-j6m3H6fQg1FSY6cGbUbod1ISGZ81jfIgvnzPmCWk8od0VFH2c373OEGcVoX6br-0zWM4jcjPvEzouvoxXr21XGnjq7cUAgAuCNoE_doJQrAAIfKtuLNw0mV9',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Alex Mercer</Text>
          <Text style={styles.handle}>@vinyljunkie77</Text>
          <Text style={styles.bio}>
            "Spinning jazz on Sunday mornings. Looking for that elusive Blue Note original
            pressing."
          </Text>
          <View style={styles.profileActions}>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable style={styles.shareButton}>
              <MaterialIcons name="share" size={18} color={colors.onSurfaceVariant} />
            </Pressable>
          </View>
        </View>

        {/* Stats ledger */}
        <View style={styles.ledger}>
          <Text style={styles.ledgerHeader}>Archival Ledger</Text>
          {stats.map((stat, i) => (
            <View
              key={stat.label}
              style={[styles.ledgerRow, i < stats.length - 1 && styles.ledgerRowDivider]}
            >
              <Text style={styles.ledgerLabel}>{stat.label}</Text>
              <Text style={styles.ledgerValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Favorites shelf */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Heavy Rotation</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.shelfGrid}>
            {heavyRotation.map((album) => (
              <View key={album.id} style={styles.shelfItem}>
                <AlbumCover
                  coverUrl={album.coverUrl}
                  onPress={() => router.push(`/album/${album.id}`)}
                />
                <Text style={styles.shelfTitle} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={styles.shelfArtist} numberOfLines={1}>
                  {album.artist}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>
          {activityFeed.slice(0, 2).map((item) => (
            <Pressable
              key={item.id}
              style={styles.activityCard}
              onPress={() => router.push(`/album/${item.album.id}`)}
            >
              <Image source={{ uri: item.album.coverUrl }} style={styles.activityCover} />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.activityMeta}>
                  {item.action === 'logged' ? 'Logged' : 'Added to Wantlist'} •{' '}
                  {item.timeLabel}
                </Text>
                <Text style={styles.activityTitle}>{item.album.title}</Text>
                <Text style={styles.activityArtist}>{item.album.artist}</Text>
                {item.rating !== undefined && (
                  <StarRating rating={item.rating} size={14} />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.marginMobile, paddingBottom: 100, gap: spacing.lg },
  profileCard: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
  },
  avatar: { width: 112, height: 112, borderRadius: 56 },
  name: { ...typography.headlineMd, color: colors.onSurface },
  handle: { ...typography.dataMd, color: colors.onSurfaceVariant, marginTop: -8 },
  bio: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '80',
    paddingTop: spacing.md,
  },
  profileActions: { flexDirection: 'row', gap: spacing.sm, width: '100%' },
  editButton: {
    flex: 1,
    backgroundColor: colors.primaryContainer,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  editButtonText: { ...typography.labelSm, color: colors.onPrimaryContainer },
  shareButton: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.lg,
  },
  ledger: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  ledgerHeader: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ledgerRowDivider: { borderBottomWidth: 1, borderBottomColor: colors.outlineVariant + '80' },
  ledgerLabel: { ...typography.dataMd, color: colors.onSurfaceVariant },
  ledgerValue: { ...typography.dataMd, color: colors.onSurface, fontWeight: '700' },
  section: { gap: spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: spacing.xs,
  },
  sectionTitle: { ...typography.headlineMd, color: colors.onSurface },
  viewAll: { ...typography.labelSm, color: colors.primary, textTransform: 'uppercase' },
  shelfGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  shelfItem: { width: '47%' },
  shelfTitle: { ...typography.labelSm, color: colors.onSurface, marginTop: spacing.sm },
  shelfArtist: { ...typography.dataMd, fontSize: 12, color: colors.onSurfaceVariant },
  activityCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  activityCover: { width: 80, height: 80, borderRadius: radius.default, backgroundColor: colors.surfaceContainer },
  activityMeta: { ...typography.labelSm, color: colors.onSurfaceVariant, marginBottom: 2 },
  activityTitle: { ...typography.bodyLg, fontSize: 16, color: colors.onSurface },
  activityArtist: { ...typography.dataMd, color: colors.onSurfaceVariant, marginBottom: 4 },
});
