import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { TopAppBar } from '../../components/TopAppBar';
import { StarRating } from '../../components/StarRating';
import { albums, friends } from '../../data/mock';
import { colors, radius, spacing, typography } from '../../constants/theme';

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const album = albums.find((a) => a.id === id) ?? albums[0];

  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.screen}>
      <TopAppBar variant="detail" onLeftPress={() => router.back()} onRightPress={() => {}} />
      <ScrollView>
        {/* Hero with approximated "spotlight" glow behind the art.
            NOTE: a real build would extract this color from the cover art
            (e.g. via a color-quantization lib) instead of using a fixed tint. */}
        <View style={styles.hero}>
          <Animated.View
            entering={FadeIn.duration(600).delay(200)}
            style={styles.spotlightGlow}
            pointerEvents="none"
          />
          <Animated.View entering={ZoomIn.duration(400)} style={styles.coverFrame}>
            <Image source={{ uri: album.coverUrl }} style={styles.cover} contentFit="cover" />
          </Animated.View>
        </View>

        {/* Info */}
        <Animated.View entering={FadeIn.duration(400).delay(150)} style={styles.infoSection}>
          <Text style={styles.title}>{album.title}</Text>
          <Text style={styles.artist}>{album.artist}</Text>

          <View style={styles.tagRow}>
            {album.year && <Tag label={String(album.year)} />}
            {album.genre && <Tag label={album.genre} />}
            {album.durationLabel && <Tag label={album.durationLabel} />}
          </View>

          <View style={styles.actionBar}>
            <Pressable style={styles.logButton}>
              <MaterialIcons name="add-circle" size={18} color={colors.onPrimaryContainer} />
              <Text style={styles.logButtonText}>LOG</Text>
            </Pressable>
            <View style={styles.starPicker}>
              <StarRating rating={rating} interactive onChange={setRating} size={22} />
            </View>
          </View>
        </Animated.View>

        {/* Friends + notes */}
        <View style={styles.detailsGrid}>
          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Friends Logged</Text>
            <View style={styles.avatarStack}>
              {friends.map((friend, i) => (
                <View key={friend.id} style={[styles.avatarChip, { marginLeft: i === 0 ? 0 : -12 }]}>
                  <Text style={styles.avatarChipText}>{friend.initials ?? friend.name[0]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Your Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Type your thoughts here..."
              placeholderTextColor={colors.outline}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* Tracklist */}
        {!!album.tracklist?.length && (
          <View style={styles.trackSection}>
            <Text style={styles.trackSectionHeader}>Side A</Text>
            {album.tracklist.map((track, i) => (
              <View key={track.id} style={styles.trackRow}>
                <Text style={styles.trackTitle}>
                  {i + 1}. {track.title}
                </Text>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

const HERO_TINT = colors.primaryContainer; // stand-in for extracted art color

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  hero: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainerLow,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
    overflow: 'hidden',
  },
  spotlightGlow: {
    position: 'absolute',
    width: '160%',
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: HERO_TINT,
    opacity: 0.15,
  },
  coverFrame: {
    width: '85%',
    maxWidth: 320,
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.default,
    padding: 8,
  },
  cover: { flex: 1, borderRadius: 2 },
  infoSection: {
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
  },
  title: { ...typography.displayLgMobile, fontSize: 28, color: colors.onSurface, textAlign: 'center' },
  artist: { ...typography.headlineMd, fontSize: 18, color: colors.onSurfaceVariant, marginTop: 4 },
  tagRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  tag: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.default,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.surface,
  },
  tagText: { ...typography.labelSm, color: colors.secondary },
  actionBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.default,
  },
  logButtonText: { ...typography.labelSm, color: colors.onPrimaryContainer },
  starPicker: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.default,
    padding: 2,
    backgroundColor: colors.surface,
  },
  detailsGrid: { padding: spacing.marginMobile, gap: spacing.lg },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.default,
    padding: spacing.md,
  },
  panelHeader: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  avatarStack: { flexDirection: 'row' },
  avatarChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  avatarChipText: { ...typography.labelSm, color: colors.onSecondaryContainer, fontWeight: '700' },
  notesInput: { ...typography.dataMd, color: colors.onSurface, minHeight: 80, textAlignVertical: 'top' },
  trackSection: { padding: spacing.marginMobile, paddingBottom: 100 },
  trackSectionHeader: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  trackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '1a',
  },
  trackTitle: { ...typography.bodyMd, color: colors.onSurface },
  trackDuration: { ...typography.dataMd, color: colors.secondary },
});
