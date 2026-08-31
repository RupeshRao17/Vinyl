import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StarRating } from '../components/StarRating';
import { albums } from '../data/mock';
import { colors, radius, spacing, typography } from '../constants/theme';
import type { Album } from '../types/models';

export default function AddLogModal() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Album | null>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return albums.slice(0, 5);
    const q = query.toLowerCase();
    return albums.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSave = () => {
    // Wire this up to your data layer (e.g. Supabase insert) before shipping.
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Sheet header */}
      <View style={styles.sheetHeader}>
        <View style={styles.grabber} />
        <View style={styles.sheetHeaderRow}>
          <Text style={styles.sheetTitle}>Log Album</Text>
          <Pressable hitSlop={8} onPress={() => router.back()}>
            <MaterialIcons name="close" size={22} color={colors.secondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Search */}
        <View style={styles.searchWrap}>
          <MaterialIcons
            name="search"
            size={20}
            color={colors.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for an album..."
            placeholderTextColor={colors.secondary}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setSelected(null);
            }}
          />
        </View>

        {/* Results */}
        <View style={{ gap: spacing.sm }}>
          {results.map((album) => {
            const isSelected = selected?.id === album.id;
            return (
              <Pressable
                key={album.id}
                onPress={() => setSelected(album)}
                style={[styles.resultRow, isSelected && styles.resultRowSelected]}
              >
                <Image source={{ uri: album.coverUrl }} style={styles.resultCover} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {album.title}
                  </Text>
                  <Text style={styles.resultMeta} numberOfLines={1}>
                    {album.artist}
                    {album.year ? ` • ${album.year}` : ''}
                  </Text>
                </View>
                {isSelected && (
                  <MaterialIcons name="check-circle" size={22} color={colors.primary} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Rating + review, only once an album is picked */}
        {selected && (
          <View style={styles.ratingSection}>
            <View style={styles.ratingBlock}>
              <Text style={styles.fieldLabel}>Rating</Text>
              <StarRating rating={rating} interactive onChange={setRating} size={30} />
            </View>
            <View style={{ gap: spacing.sm }}>
              <Text style={styles.fieldLabel}>Review Notes</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Type your thoughts here..."
                placeholderTextColor={colors.secondary}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Fixed save action */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.saveButton, !selected && styles.saveButtonDisabled]}
          disabled={!selected}
          onPress={handleSave}
        >
          <MaterialIcons name="save" size={18} color={colors.onPrimaryContainer} />
          <Text style={styles.saveButtonText}>Save Log</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  sheetHeader: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
  },
  grabber: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetTitle: { ...typography.headlineMd, color: colors.onSurface },
  content: { padding: spacing.marginMobile, gap: spacing.lg, paddingBottom: 120 },
  searchWrap: { position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: 16, zIndex: 1 },
  searchInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.xl,
    paddingVertical: 12,
    paddingLeft: 44,
    paddingRight: spacing.md,
    ...typography.dataMd,
    color: colors.onSurface,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: 12,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  resultRowSelected: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.outline,
  },
  resultCover: { width: 64, height: 64, borderRadius: radius.default, backgroundColor: colors.surfaceContainer },
  resultTitle: { ...typography.headlineMd, fontSize: 17, color: colors.onSurface },
  resultMeta: { ...typography.dataMd, color: colors.secondary, marginTop: 2 },
  ratingSection: {
    gap: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '4d',
  },
  ratingBlock: { alignItems: 'center', gap: spacing.sm },
  fieldLabel: {
    ...typography.labelSm,
    color: colors.secondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  reviewInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.xl,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    ...typography.dataMd,
    color: colors.onSurface,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.marginMobile,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '4d',
  },
  saveButton: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryContainer,
    paddingVertical: 14,
    borderRadius: radius.xl,
  },
  saveButtonDisabled: { opacity: 0.5 },
  saveButtonText: { ...typography.headlineMd, fontSize: 16, color: colors.onPrimaryContainer },
});
