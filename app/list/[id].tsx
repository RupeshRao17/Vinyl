import React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { TopAppBar } from '../../components/TopAppBar';
import { AlbumCover } from '../../components/AlbumCover';
import { lists, albums } from '../../data/mock';
import { colors, spacing, typography } from '../../constants/theme';

const COLUMNS = 3;

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const list = lists.find((l) => l.id === id) ?? lists[0];
  const rankedAlbums = list.albumIds
    .map((albumId) => albums.find((a) => a.id === albumId))
    .filter((a): a is (typeof albums)[number] => !!a);

  return (
    <View style={styles.screen}>
      <TopAppBar
        variant="detail"
        onLeftPress={() => router.back()}
        onRightPress={() => router.push(`/create-list?editId=${list.id}`)}
        rightIcon="edit"
      />
      <FlatList
        data={rankedAlbums}
        keyExtractor={(item) => item.id}
        numColumns={COLUMNS}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ gap: spacing.sm }}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>{list.title}</Text>
            {!!list.description && <Text style={styles.pageSubtitle}>{list.description}</Text>}
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.duration(300).delay(index * 40)} style={styles.gridItem}>
            <AlbumCover
              coverUrl={item.coverUrl}
              rank={index + 1}
              onPress={() => router.push(`/album/${item.id}`)}
            />
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  listContent: { padding: spacing.marginMobile, paddingBottom: 100 },
  pageHeader: {
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
    paddingBottom: spacing.sm,
  },
  pageTitle: { ...typography.headlineMd, color: colors.onSurface },
  pageSubtitle: { ...typography.bodyMd, color: colors.onSurfaceVariant, marginTop: 4 },
  gridItem: { flex: 1 / COLUMNS },
});
