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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { albums, lists } from '../data/mock';
import { colors, radius, spacing, typography } from '../constants/theme';
import type { Album } from '../types/models';

export default function CreateListModal() {
  const router = useRouter();
  const { editId } = useLocalSearchParams<{ editId?: string }>();
  const existing = editId ? lists.find((l) => l.id === editId) : undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [selectedAlbums, setSelectedAlbums] = useState<Album[]>(
    existing ? existing.albumIds.map((id) => albums.find((a) => a.id === id)!).filter(Boolean) : []
  );
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return albums
      .filter((a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q))
      .filter((a) => !selectedAlbums.some((s) => s.id === a.id))
      .slice(0, 5);
  }, [query, selectedAlbums]);

  const addAlbum = (album: Album) => {
    setSelectedAlbums((prev) => [...prev, album]);
    setQuery('');
  };

  const removeAlbum = (albumId: string) => {
    setSelectedAlbums((prev) => prev.filter((a) => a.id !== albumId));
  };

  const moveAlbum = (index: number, direction: -1 | 1) => {
    setSelectedAlbums((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const canSave = title.trim().length > 0 && selectedAlbums.length > 0;

  const handleSave = () => {
    // TODO: persist to your data layer (Supabase insert/update, etc.)
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.sheetHeader}>
        <View style={styles.grabber} />
        <View style={styles.sheetHeaderRow}>
          <Text style={styles.sheetTitle}>{existing ? 'Edit List' : 'New List'}</Text>
          <Pressable hitSlop={8} onPress={() => router.back()}>
            <MaterialIcons name="close" size={22} color={colors.secondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Songs of Summer 2026"
            placeholderTextColor={colors.secondary}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="What's this list about?"
            placeholderTextColor={colors.secondary}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Albums ({selectedAlbums.length})</Text>

          {selectedAlbums.map((album, index) => (
            <View key={album.id} style={styles.albumRow}>
              <Text style={styles.rankBadge}>{index + 1}</Text>
              <Image source={{ uri: album.coverUrl }} style={styles.albumCover} />
              <View style={{ flex: 1 }}>
                <Text style={styles.albumTitle} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={styles.albumArtist} numberOfLines={1}>
                  {album.artist}
                </Text>
              </View>
              <View style={styles.reorderButtons}>
                <Pressable
                  hitSlop={6}
                  disabled={index === 0}
                  onPress={() => moveAlbum(index, -1)}
                  style={styles.reorderButton}
                >
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color={index === 0 ? colors.outlineVariant : colors.onSurfaceVariant}
                  />
                </Pressable>
                <Pressable
                  hitSlop={6}
                  disabled={index === selectedAlbums.length - 1}
                  onPress={() => moveAlbum(index, 1)}
                  style={styles.reorderButton}
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color={index === selectedAlbums.length - 1 ? colors.outlineVariant : colors.onSurfaceVariant}
                  />
                </Pressable>
              </View>
              <Pressable hitSlop={8} onPress={() => removeAlbum(album.id)}>
                <MaterialIcons name="close" size={18} color={colors.secondary} />
              </Pressable>
            </View>
          ))}

          <View style={styles.searchWrap}>
            <MaterialIcons name="search" size={18} color={colors.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Add an album..."
              placeholderTextColor={colors.secondary}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {searchResults.map((album) => (
            <Pressable key={album.id} style={styles.resultRow} onPress={() => addAlbum(album)}>
              <Image source={{ uri: album.coverUrl }} style={styles.albumCover} />
              <View style={{ flex: 1 }}>
                <Text style={styles.albumTitle} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={styles.albumArtist} numberOfLines={1}>
                  {album.artist}
                </Text>
              </View>
              <MaterialIcons name="add-circle-outline" size={20} color={colors.primary} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.saveButton, !canSave && styles.saveButtonDisabled]} disabled={!canSave} onPress={handleSave}>
          <MaterialIcons name="save" size={18} color={colors.onPrimaryContainer} />
          <Text style={styles.saveButtonText}>{existing ? 'Save Changes' : 'Create List'}</Text>
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
  field: { gap: spacing.sm },
  fieldLabel: { ...typography.labelSm, color: colors.secondary, textTransform: 'uppercase' },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant + '80',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.surfaceContainerLow,
    ...typography.dataMd,
    color: colors.onSurface,
  },
  descriptionInput: { minHeight: 70, textAlignVertical: 'top' },
  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
  },
  rankBadge: { ...typography.dataMd, color: colors.primary, width: 18, textAlign: 'center' },
  albumCover: { width: 44, height: 44, borderRadius: radius.default, backgroundColor: colors.surfaceContainer },
  albumTitle: { ...typography.bodyMd, fontSize: 14, color: colors.onSurface },
  albumArtist: { ...typography.dataMd, fontSize: 12, color: colors.secondary },
  reorderButtons: { flexDirection: 'row' },
  reorderButton: { padding: 2 },
  searchWrap: { position: 'relative', justifyContent: 'center', marginTop: spacing.sm },
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
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
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
